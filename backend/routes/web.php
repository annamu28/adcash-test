<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CampaignController;

// Web routes
Route::middleware('web')->group(function () {
    Route::get('/', function () {
        return view('welcome');
    });

    // Get CSRF token
    Route::get('/csrf-token', function () {
        return response()->json(['token' => csrf_token()]);
    });
});

// API routes
Route::group([
    'prefix' => 'api',
    'middleware' => ['api'], // Remove web middleware
], function () {

    // Test route
    Route::get('test', function () {
        return response()->json(['message' => 'API is working!']);
    })->name('api.test');

    // Auth routes
    Route::post('register', [RegisterController::class, 'register'])->name('api.register');
    Route::post('login', [LoginController::class, 'login'])->name('api.login');
    Route::post('logout', [LoginController::class, 'logout'])->name('api.logout');

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        // Campaign routes
        Route::get('campaigns', [CampaignController::class, 'index'])->name('api.campaigns.index');
        Route::post('campaigns', [CampaignController::class, 'store'])->name('api.campaigns.store');
        Route::patch('campaigns/{id}/status', [CampaignController::class, 'updateStatus'])->name('api.campaigns.update-status');
    });
});
