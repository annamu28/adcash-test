<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CampaignController;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


// Test route
Route::get('test', function () {
    return response()->json(['message' => 'API is working!']);
})->name('api.test');

// Auth routes
Route::middleware(['api'])->group(function () {
    Route::post('register', [RegisterController::class, 'register'])->name('api.register');
    Route::post('login', [LoginController::class, 'login'])->name('api.login');
    
    Route::post('logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    })->name('api.logout');
});

// Protected routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/campaigns', [CampaignController::class, 'index'])->name('api.campaigns.index');
    Route::post('/campaigns', [CampaignController::class, 'store'])->name('api.campaigns.store');
    Route::patch('/campaigns/{id}/status', [CampaignController::class, 'updateStatus'])->name('api.campaigns.updateStatus');
}); 