<?php

namespace App\Http\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthenticationService
{

    public function login(array $credentials, $request): array
    {
        // Find User by Email
        $user = User::where('email', $credentials['email'])->first();
        // Check Password Match
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return [
                'success' => false,
                'message' => 'Email atau password salah.',
            ];
        }

        // Check User Active
        if (!$user->is_active) {
            return [
                'success' => false,
                'message' => 'Akun tidak aktif.',
            ];
        }

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

    public function logout($request)
    {
        Auth::logout();
    }
}
