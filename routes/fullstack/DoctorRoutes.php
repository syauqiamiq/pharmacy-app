

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

Route::get('/doctor/visit/{id}/anamnesis', function () {
    return Inertia::render('doctor/visit/DoctorVisitAnamnesisPage',[
        'visitId' => request()->id,
    ]);
})->name('fe.doctor.visit.anamnesis');
