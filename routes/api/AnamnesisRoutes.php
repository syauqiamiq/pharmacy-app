<?php

use App\Http\Controllers\Api\V1\AnamnesisController;
use Illuminate\Support\Facades\Route;

Route::apiResource('anamnesis', AnamnesisController::class);

// File upload and delete routes
Route::post('anamnesis/{id}/upload-files', [AnamnesisController::class, 'uploadFiles'])->name('api.anamnesis.uploadFiles');
Route::delete('anamnesis/attachment/{attachmentId}', [AnamnesisController::class, 'deleteFile'])->name('api.anamnesis.deleteFile');