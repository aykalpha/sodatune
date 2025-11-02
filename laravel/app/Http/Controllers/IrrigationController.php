<?php

namespace App\Http\Controllers;

use App\Models\Irrigation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

class IrrigationController extends Controller
{
    // 潅水一覧の取得
    public function index()
    {
        return response()->json(Irrigation::with('user')->orderBy('irrigated_at', 'desc')->get());
    }

    // 潅水の登録
    public function store(Request $request)
    {
        // TODO:ログイン機能実装後に変更
        $userId = Auth::id();

        $irrigation = Irrigation::create([
            'irrigated_at' => Carbon::now(),
            'user_id' => $userId,
        ]);

        return response()->json($irrigation);
    }
}
