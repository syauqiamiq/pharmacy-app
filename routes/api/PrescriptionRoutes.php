<?php

use App\Http\Controllers\Api\V1\PrescriptionController;
use Illuminate\Support\Facades\Route;

Route::get('/prescription/my', [PrescriptionController::class, 'findMyPrescriptions'])->name('api.prescription.findMyPrescriptions')
->middleware([
   'check-roles:Doctor',
]);
Route::get('/prescription/anamnesis/{anamnesisId}', [PrescriptionController::class, 'findPrescriptionsByAnamnesisId'])->name('api.prescription.findPrescriptionsByAnamnesisId')
->middleware([
    'check-roles:Doctor',
]);
Route::get('/prescription/{prescriptionId}/logs', [PrescriptionController::class, 'getPrescriptionLogByPrescriptionId'])->name('api.prescription.getPrescriptionLogByPrescriptionId')
->middleware([
    'check-roles:Doctor,Pharmacist,Admin',
]);

Route::apiResource('prescription', PrescriptionController::class)
->middlewareFor(['index'], [
    'check-roles:Pharmacist',
])
->middlewareFor(['store'], [
    'check-roles:Doctor',
])
->middlewareFor([ 'destroy'], [
    'check-roles:Admin',
])
->middlewareFor(['show','update'], [
    'check-roles:Doctor,Pharmacist,Admin',
]);