<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/pharmacist/dashboard', function () {
    return Inertia::render('pharmacist/dashboard/PharmacistDashboardPage');
})->name('fe.pharmacist.dashboard');

Route::get('/pharmacist/prescription', function () {
    return Inertia::render('pharmacist/prescription/PharmacistPrescriptionPage');
})->name('fe.pharmacist.prescription');


Route::get('/pharmacist/prescription/{id}/detail', function () {
    return Inertia::render('pharmacist/prescription/PharmacistPrescriptionDetailPage', [
        'prescriptionId' => request()->id,
        'pharmacistId' => Auth::user()->pharmacist->id ?? null,
    ]);
})->name('fe.pharmacist.prescription.detail');