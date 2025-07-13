<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateKarakarasTable extends Migration
{
    public function up()
    {
        Schema::create('karakaras', function (Blueprint $table) {
            $table->id()->comment('カラカラ指数ID');
            $table->unsignedTinyInteger('min_moisture')->comment('土壌水分量(下限)');
            $table->unsignedTinyInteger('max_moisture')->comment('土壌水分量(上限)');
            $table->string('name')->comment('名称');
            $table->text('description')->comment('説明');
            $table->timestamp('created_at')->nullable()->comment('作成日時');
            $table->timestamp('updated_at')->nullable()->comment('更新日時');
        });
        DB::statement("ALTER TABLE `karakaras` COMMENT = 'カラカラ指数'");
    }

    public function down()
    {
        Schema::dropIfExists('karakaras');
    }
}
