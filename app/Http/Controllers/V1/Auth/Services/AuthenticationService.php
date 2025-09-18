<?php

namespace App\Http\Controllers\V1\Auth\Services;

use Illuminate\Support\Facades\Auth;

class AuthenticationService
{
    /**
     * Melakukan login user dan handle session untuk Inertia frontend.
     * @param array $credentials
     * @param \Illuminate\Http\Request $request
     * @return array [success => bool, message => string|null]
     */
    public function login(array $credentials, $request): array
    {
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return [
                'success' => true,
                'message' => null,
            ];
        }
        return [
            'success' => false,
            'message' => 'Email atau password salah.',
        ];
    }
}
