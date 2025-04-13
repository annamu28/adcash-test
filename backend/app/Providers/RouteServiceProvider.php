<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function () {
            Log::info('Starting route registration');

            // Register web routes
            Log::info('Registering web routes from: ' . base_path('routes/web.php'));
            Route::middleware('web')
                ->group(base_path('routes/web.php'));

            // Register API routes
            Log::info('Registering API routes from: ' . base_path('routes/api.php'));
            Route::middleware('api')
                ->group(function () {
                    Log::info('Loading API routes file');
                    require base_path('routes/api.php');
                    Log::info('API routes file loaded');
                });

            // Log all registered routes
            $routes = collect(Route::getRoutes()->getRoutesByName())
                ->map(function ($route) {
                    return [
                        'uri' => $route->uri(),
                        'methods' => $route->methods(),
                        'name' => $route->getName(),
                    ];
                })
                ->toArray();

            Log::info('All registered routes:', ['routes' => $routes]);
            Log::info('Total routes registered: ' . count($routes));
        });
    }
} 