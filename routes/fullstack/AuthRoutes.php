<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Middleware\CustomRedirectIfAuthenticated;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/LoginPage',);
})->middleware([CustomRedirectIfAuthenticated::class])->name('fe.auth.login');

Route::post('/login', [AuthenticationController::class, 'login']);
Route::post('/logout', [AuthenticationController::class, 'logout']);
