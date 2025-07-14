<?php

namespace App\Http\Controllers;

use App\Models\Irrigation;

class IrrigationController extends Controller
{
    // 潅水一覧の取得
    public function index()
    {
        $irrigations = Irrigation::all();

        return response()->json(Irrigation::orderBy('irrigated_at')->get());
    }
}
