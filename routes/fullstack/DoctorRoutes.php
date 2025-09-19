

<?php

use App\Http\Controllers\VisitController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/doctor/dashboard', function () {
    return Inertia::render('doctor/dashboard/DoctorDashboardPage');
})->name('fe.doctor.dashboard');

Route::get('/doctor/visit', function () {
    return Inertia::render('doctor/visit/DoctorVisitPage');
})->name('fe.doctor.visit');
