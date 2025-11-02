<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateSoilMoisturesTable extends Migration
{
    public function up()
    {
        Schema::create('soil_moistures', function (Blueprint $table) {
            $table->id()->comment('土壌水分量ID');
            $table->timestamp('measured_at')->comment('測定日時');
            $table->unsignedTinyInteger('moisture')->comment('土壌水分量');
            $table->string('karakara_id')->comment('カラカラ指数ID');
            $table->boolean('notified')->default(false)->comment('通知済み');
            $table->timestamp('created_at')->nullable()->comment('作成日時');
            $table->timestamp('updated_at')->nullable()->comment('更新日時');
        });
        DB::statement("ALTER TABLE `soil_moistures` COMMENT = '土壌水分量'");
    }

    public function down()
    {
        Schema::dropIfExists('soil_moistures');
    }
};
