<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/dashboard', function () {
    return Inertia::render('dashboard/DashboardPage',);
})->name('fe.dashboard');
