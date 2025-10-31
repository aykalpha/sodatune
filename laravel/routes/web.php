<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;

// ログイン
Route::get('/auth/google/redirect', [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

// ログアウト
Route::get('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('http://localhost:3000/');
});

Route::get('/user-info', function () {
    if (Auth::check()) {
        return response()->json([
            'name' => Auth::user()->name,
            'email' => Auth::user()->email,
            'avatar' => Auth::user()->avatar, // ← これがSidebarの img に使われる！
        ]);
    } else {
        return response()->json(null, 401);
    }
});
