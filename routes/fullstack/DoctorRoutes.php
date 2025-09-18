

<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/doctor/dashboard', function () {
    return Inertia::render('doctor/dashboard/DashboardPage',);
})->name('fe.doctor.dashboard');

Route::get('/doctor/visit', function () {
    return Inertia::render('doctor/visit/VisitPage',);
})->name('fe.doctor.visit');
