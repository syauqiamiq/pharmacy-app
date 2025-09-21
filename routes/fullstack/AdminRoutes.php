

<?php

use App\Http\Controllers\VisitController;
use App\Models\Anamnesis;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/admin/dashboard', function () {
    return Inertia::render('admin/dashboard/AdminDashboardPage');
})->name('fe.admin.dashboard');

Route::get('/admin/visit', function () {
    return Inertia::render('admin/visit/AdminVisitPage');
})->name('fe.admin.visit');


Route::get('/admin/patient', function () {
    return Inertia::render('admin/patient/AdminPatientPage');
})->name('fe.admin.patient');