<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateIrrigationsTable extends Migration
{
    public function up()
    {
        Schema::create('irrigations', function (Blueprint $table) {
            $table->id()->comment('潅水ID');
            $table->timestamp('irrigated_at')->comment('潅水日時');
            $table->string('user_id')->comment('ユーザーID')->foreign('user_id')->references('id')->on('users');
            $table->timestamp('created_at')->nullable()->comment('作成日時');
            $table->timestamp('updated_at')->nullable()->comment('更新日時');
        });
        DB::statement("ALTER TABLE `irrigations` COMMENT = '潅水'");
    }

    public function down()
    {
        Schema::dropIfExists('irrigations');
    }
}
