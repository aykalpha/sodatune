<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KarakaraController;
use App\Http\Controllers\SoilMoistureController;
use App\Http\Controllers\IrrigationController;

Route::middleware('api')->group(function () {

    // カラカラ指数
    Route::get('/karakaras', [KarakaraController::class, 'index']);

    // 土壌水分量
    Route::get('/soil-moistures', [SoilMoistureController::class, 'index']);
    Route::get('/soil-moistures/latest', [SoilMoistureController::class, 'latest']);

    // 潅水
    Route::get('/irrigations', [IrrigationController::class, 'index']);
});
