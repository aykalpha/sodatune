<?php

namespace App\Http\Controllers;

use App\Models\Karakara;

class KarakaraController extends Controller
{
    // カラカラ指数取得API
    public function index()
    {
        return response()->json(Karakara::orderBy('id')->get());
    }
}
