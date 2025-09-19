<?php

use Illuminate\Support\Facades\Route;



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
