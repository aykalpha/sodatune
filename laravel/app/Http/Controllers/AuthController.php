<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Googleログインページへリダイレクト
public function redirectToGoogle()
{
    return Socialite::driver('google')
        ->scopes(['openid', 'profile', 'email'])
        ->redirect();
}

    // Google認証後のコールバック
    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();
    
        $user = User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
            ]
        );

        Auth::login($user);

        // 認証後、Reactのトップページへリダイレクト
        return redirect('http://localhost:3000/');
    }
}
