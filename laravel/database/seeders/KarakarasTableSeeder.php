<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class KarakarasTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('karakaras')->insert([
            [
                'min_moisture' => 0,
                'max_moisture' => 19,
                'name' => 'カラカラ',
                'description' => '土壌水分量（0%～）：非常に乾燥しており、早急な潅水が必要です。',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'min_moisture' => 20,
                'max_moisture' => 49,
                'name' => 'ちょいカラ',
                'description' => '土壌水分量（20%～）：少し乾いています。必要に応じて潅水を検討してください。',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'min_moisture' => 50,
                'max_moisture' => 100,
                'name' => 'しっとり',
                'description' => '土壌水分量（50%～）：十分に水分があります。潅水は不要です。',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
