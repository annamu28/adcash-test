<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        Log::info('Login attempt', $request->all());
        
        try {
            $validated = $request->validate([
                'email' => ['required', 'string', 'email'],
                'password' => ['required', 'string'],
            ]);
            
            Log::info('Validation passed', $validated);
            
            $user = User::where('email', $request->email)->first();
            
            if (!$user) {
                Log::info('Login failed: User not found', ['email' => $request->email]);
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }
            
            if (!Hash::check($request->password, $user->password)) {
                Log::info('Login failed: Invalid password', ['email' => $request->email]);
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }
            
            $token = $user->createToken('auth_token')->plainTextToken;
            
            Log::info('Login successful', ['user_id' => $user->id]);
            
            return response()->json([
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ]
            ]);
        } catch (ValidationException $e) {
            Log::error('Login validation error', [
                'errors' => $e->errors(),
                'email' => $request->email
            ]);
            throw $e;
        } catch (\Exception $e) {
            Log::error('Login error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'email' => $request->email
            ]);
            return response()->json([
                'message' => 'An error occurred during login.'
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        Log::info('Logout attempt', ['user_id' => $request->user()?->id]);
        
        try {
            // Revoke all tokens...
            $request->user()->tokens()->delete();
            
            Log::info('Logout successful', ['user_id' => $request->user()?->id]);
            
            return response()->json([
                'message' => 'Successfully logged out'
            ]);
        } catch (\Exception $e) {
            Log::error('Logout error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'user_id' => $request->user()?->id
            ]);
            return response()->json([
                'message' => 'An error occurred during logout.'
            ], 500);
        }
    }
} 