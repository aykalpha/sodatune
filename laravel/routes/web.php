<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;

// ログイン
Route::get('/auth/google/redirect', [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

// ログアウト
Route::get('/logout', function () {
    Auth::logout();                // Laravelのセッションを破棄
    request()->session()->invalidate(); 
    request()->session()->regenerateToken();
    return redirect('http://localhost:3000/login');
});

Route::middleware('auth')->get('/user-info', function () {
    return response()->json(Auth::user());
});
