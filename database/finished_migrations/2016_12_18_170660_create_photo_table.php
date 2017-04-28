<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePhotoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('photo', function (Blueprint $table) {
            $table->increments('photo_id');
            $table->string('photographer_id');
            $table->string('acqNumber');
            $table->integer('year');
            $table->string('description')->nullable();
            $table->integer('size')->unsigned();
            $table->enum('size_type', ['KB', 'MB', 'GB']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('photo');
    }
}
