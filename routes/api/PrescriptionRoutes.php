<?php

use App\Http\Controllers\Api\V1\PrescriptionController;
use Illuminate\Support\Facades\Route;

Route::get('/prescription/my', [PrescriptionController::class, 'findMyPrescriptions'])->name('api.prescription.findMyPrescriptions');
Route::get('/prescription/anamnesis/{anamnesisId}', [PrescriptionController::class, 'findPrescriptionsByAnamnesisId'])->name('api.prescription.findPrescriptionsByAnamnesisId');
Route::apiResource('prescription', PrescriptionController::class);