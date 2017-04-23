<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePurchasedDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchased_details', function (Blueprint $table) {
            $table->increments('purchased_details_id');
            $table->string('amount');
            $table->integer('address_id');
            $table->integer('year');
            $table->string('acqNumber')->nullable();
            $table->string('copy_acqNumber')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('purchased_details');
    }
}
