<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // 本番環境用
        $this->call([
            KarakarasTableSeeder::class,
        ]);
        // 開発環境用
        $this->call([
            UsersTableSeeder::class,
            SoilMoisturesTableSeeder::class,
            IrrigationsTableSeeder::class,
        ]);
    }
}
