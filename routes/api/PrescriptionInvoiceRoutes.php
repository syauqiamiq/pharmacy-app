<?php

use App\Http\Controllers\Api\V1\PrescriptionInvoiceController;
use Illuminate\Support\Facades\Route;

Route::get('/prescription-invoice/my', [PrescriptionInvoiceController::class, 'findMyPrescriptionInvoices'])->name('api.prescription-invoice.findMyPrescriptionInvoices');
Route::apiResource('prescription-invoice', PrescriptionInvoiceController::class);
