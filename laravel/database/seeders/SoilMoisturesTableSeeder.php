<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SoilMoisturesTableSeeder extends Seeder
{
    public function run()
    {
        $karakaras = DB::table('karakaras')->get();
        foreach ($karakaras as $karakara) {
            DB::table('soil_moistures')->insert([
                [
                    'measured_at' => Carbon::now()->subHours(rand(1, 24)),
                    'moisture' => rand($karakara->min_moisture, $karakara->max_moisture),
                    'karakara_id' => $karakara->id,
                    'notified' => false,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'measured_at' => Carbon::now()->subHours(rand(25, 48)),
                    'moisture' => rand($karakara->min_moisture, $karakara->max_moisture),
                    'karakara_id' => $karakara->id,
                    'notified' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }
    }
}
