<?php

use Illuminate\Support\Facades\Route;



Route::group([
    'name' => "FullstackRoutes",
    'prefix' => null,
    "middleware" => []
], base_path('routes/fullstack/FullstackRoutes.php'));
