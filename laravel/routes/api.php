<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KarakaraController;
use App\Http\Controllers\SoilMoistureController;
use App\Http\Controllers\IrrigationController;


Route::middleware('api')->group(function () {
    // 土壌水分量
    Route::get('/soil-moistures', [SoilMoistureController::class, 'index']);
    Route::post('/soil-moistures', [SoilMoistureController::class, 'store']);

    // 潅水
    Route::get('/irrigations', [IrrigationController::class, 'index']);
    Route::post('/irrigations', [IrrigationController::class, 'store']);
});
