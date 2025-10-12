<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SoilMoisturesTableSeeder extends Seeder
{
    public function run()
    {
        $karakaras = DB::table('karakaras')
            ->select('id', 'min_moisture', 'max_moisture')
            ->get();

        for ($i = 0; $i < 5; $i++) {
            $karakara = $karakaras->random();

            $date = Carbon::now()
                ->subDays($i)
                ->setTime(12, 0, 0);

            DB::table('soil_moistures')->insert([
                'measured_at' => $date,
                'moisture'    => rand($karakara->min_moisture, $karakara->max_moisture),
                'karakara_id' => $karakara->id,
                'notified'    => $karakara->id === 1,
                'created_at'  => $date,
                'updated_at'  => $date,
            ]);
        }
    }
}
