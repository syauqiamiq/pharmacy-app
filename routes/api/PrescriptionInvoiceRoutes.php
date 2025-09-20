<?php

use App\Http\Controllers\Api\V1\PrescriptionInvoiceController;
use Illuminate\Support\Facades\Route;

Route::apiResource('prescription-invoice', PrescriptionInvoiceController::class)
->middlewareFor(['index', 'show', 'update'], [
    'check-roles:Pharmacist,Admin',
])
->middlewareFor(['store'], [
    'check-roles:Pharmacist',
])
->middlewareFor(['destroy'], [
    'check-roles:Admin',
]);
