<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KarakaraController;

Route::middleware('api')->group(function () {

    // カラカラ指数
    Route::get('/karakaras', [KarakaraController::class, 'index']);
});
