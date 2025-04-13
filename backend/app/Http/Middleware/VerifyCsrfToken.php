<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
use Illuminate\Http\Request;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        // No routes should be excluded from CSRF verification
    ];

    /**
     * Determine if the request has a valid CSRF token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function tokensMatch($request)
    {
        // Log the request headers for debugging
        \Illuminate\Support\Facades\Log::info('CSRF Token Check', [
            'headers' => $request->headers->all(),
            'token' => $request->header('X-XSRF-TOKEN'),
            'session_token' => $request->session()->token(),
        ]);

        return parent::tokensMatch($request);
    }
} 