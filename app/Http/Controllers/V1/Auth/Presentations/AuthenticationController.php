<?php

namespace App\Http\Controllers\V1\Auth\Presentations;

use App\Http\Controllers\Controller;
use App\Http\Controllers\V1\Auth\Dto\Requests\LoginRequest;
use App\Http\Controllers\V1\Auth\Services\AuthenticationService;
use App\Traits\ApiFormatter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthenticationController extends Controller
{
    use ApiFormatter;


    private $authenticationService;

    public function __construct(AuthenticationService $authenticationService)
    {
        $this->authenticationService = $authenticationService;
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $result = $this->authenticationService->login($credentials, $request);

        if (!$result['success']) {
            // Jika gagal, redirect back dengan error
            return redirect()->back()
                ->withErrors(['email' => $result['message']])
                ->withInput();
        }

        // Jika sukses, redirect ke route bernama 'frontend.test-page'
        return redirect()->route('frontend.test-page');
    }
}
