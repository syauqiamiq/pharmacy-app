<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $test = 'TEST';
    // Fetch pokemon data from PokeAPI
    $pokemon = null;
    try {
        $response = file_get_contents('https://pokeapi.co/api/v2/pokemon/ditto');
        if ($response !== false) {
            $pokemon = json_decode($response, true);
        }
    } catch (Exception $e) {
        $pokemon = null;
    }
    
    $env = env('APP_ENV', 'production');
    return Inertia::render('auth/LoginPage', [
        'test' => $test,
        'pokemon' => $pokemon,
        'env' => $env,
    ]);
})->name('home');


