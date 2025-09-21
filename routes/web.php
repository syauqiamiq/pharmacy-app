<?php

use App\Http\Controllers\ErrorController;
use Illuminate\Support\Facades\Route;

// Error Pages Routes
Route::get('/404', [ErrorController::class, 'notFound'])->name('errors.404');
Route::get('/403', [ErrorController::class, 'forbidden'])->name('errors.403');

Route::group([
    'name' => "FullstackRoutes",
    'prefix' => null,
    "middleware" => []
], base_path('routes/fullstack/FullstackRoutes.php'));


Route::group([
    'name' => "ApiRoutes",
    'prefix' => "api/v1",
    "middleware" => []
], base_path('routes/api/ApiRoutes.php'));

// Fallback route - must be at the end to catch all undefined routes
Route::fallback([ErrorController::class, 'notFound'])->name('errors.fallback');
