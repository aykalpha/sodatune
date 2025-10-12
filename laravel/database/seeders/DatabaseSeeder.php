<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // 開発環境用
        $this->call([
            KarakarasTableSeeder::class,
            UsersTableSeeder::class,
            SoilMoisturesTableSeeder::class,
            // IrrigationsTableSeeder::class,
        ]);
    }
}
