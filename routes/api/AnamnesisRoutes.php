<?php

use App\Http\Controllers\Api\V1\AnamnesisController;
use Illuminate\Support\Facades\Route;



// File upload and delete routes
Route::post('anamnesis/{id}/upload-files', [AnamnesisController::class, 'uploadFiles'])->name('api.anamnesis.uploadFiles')
->middleware('check-roles:Doctor');
Route::delete('anamnesis/attachment/{attachmentId}', [AnamnesisController::class, 'deleteFile'])->name('api.anamnesis.deleteFile')
->middleware('check-roles:Doctor');
Route::apiResource('anamnesis', AnamnesisController::class)
->middleware('check-roles:Doctor');