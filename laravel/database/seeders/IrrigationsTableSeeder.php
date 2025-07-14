<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class IrrigationsTableSeeder extends Seeder
{
    public function run()
    {
        foreach (range(1, 3) as $userId) {
            DB::table('irrigations')->insert([
                'irrigated_at' => Carbon::now(),
                'user_id' => $userId,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
