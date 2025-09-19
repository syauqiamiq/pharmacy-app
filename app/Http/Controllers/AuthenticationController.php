<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;


use App\Http\Requests\Auth\LoginRequest;
use App\Http\Services\Auth\AuthenticationService;
use App\Traits\ApiFormatter;
use Illuminate\Support\Facades\Request;

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
            return redirect()->back()
                ->withErrors(['message' => $result['message']])
                ->withInput();
        }


        return redirect()->route('fe.dashboard');
    }
    public function logout(Request $request)
    {
        $this->authenticationService->logout($request);
        return redirect()->route('fe.auth.login');
    }
}
