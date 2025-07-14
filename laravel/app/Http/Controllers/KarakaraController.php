<?php

namespace App\Http\Controllers;

use App\Models\Karakara;

class KarakaraController extends Controller
{
    // カラカラ指数一覧を取得
    public function index()
    {
        return response()->json(Karakara::orderBy('id')->get());
    }
}
