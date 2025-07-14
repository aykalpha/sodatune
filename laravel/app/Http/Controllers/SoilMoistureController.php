<?php

namespace App\Http\Controllers;

use App\Models\SoilMoisture;

class SoilMoistureController extends Controller
{
    // 土壌水分量一覧を取得
    public function index()
    {
        return response()->json(SoilMoisture::orderBy('measured_at', 'desc')->get());
    }

    // 最新の土壌水分量を取得
    public function latest()
    {
        return response()->json(SoilMoisture::orderBy('measured_at', 'desc')->first());
    }
}
