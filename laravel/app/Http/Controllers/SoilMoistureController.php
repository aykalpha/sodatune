<?php

namespace App\Http\Controllers;

use App\Models\SoilMoisture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SoilMoistureAlert;

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
        $validated = $request->validate([
            'measured_at' => 'required|date',
            'moisture' => 'required|integer|min:0|max:255',
            'karakara_id' => 'required|exists:karakaras,id',
            'notified' => 'sometimes|boolean',
        ]);

        $soilMoisture = SoilMoisture::create([
            'measured_at' => $validated['measured_at'],
            'moisture' => $validated['moisture'],
            'karakara_id' => $validated['karakara_id'],
            'notified' => $validated['notified'],
        ]);

        // メール通知
        // TODO:定数化
        // TODO:送信先のユーザーの取得
        if ($soilMoisture->karakara_id === 1) {
            Mail::to('example@example.com')->send(new SoilMoistureAlert($soilMoisture));
        }

        // 通知フラグの変更
        $soilMoisture->update(['notified' => true]);

        return response()->json($soilMoisture);
    }
}
