<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // 開発環境用
        $this->call([
            // UsersTableSeeder::class,
        ]);
    }
}
