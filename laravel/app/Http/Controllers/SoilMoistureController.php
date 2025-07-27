<?php

namespace App\Http\Controllers;

use App\Models\SoilMoisture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SoilMoistureAlert;
use App\Models\Karakara;

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

    // 土壌水分量を登録
    public function store(Request $request)
    {
        // 土壌水分量を取得
        $raw = (int)$request->input('measurement');
        $raw_min = 200;
        $raw_max = 450;
        $moisture = round(($raw_max - $raw) / ($raw_max - $raw_min) * 100);
        $moisture = max(0, min(100, $moisture));

        // 測定日時を設定
        $measured_at = now();

        // カラカラ指数を取得
        $karakara = Karakara::where('min_moisture', '<=', $moisture)
            ->where('max_moisture', '>=', $moisture)
            ->first();

        // 土壌水分量を登録
        $soilMoisture = SoilMoisture::create([
            'measured_at' => $measured_at,
            'moisture' => $moisture,
            'karakara_id' => $karakara->id,
            'notified' => false,
        ]);

        // メール通知
        if ($soilMoisture->karakara_id === 1) {
            Mail::to('example@example.com')->send(new SoilMoistureAlert($soilMoisture));
            $soilMoisture->update(['notified' => true]);
        }

        return response()->json($soilMoisture);
    }
}
