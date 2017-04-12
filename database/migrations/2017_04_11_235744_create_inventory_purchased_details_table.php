<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInventoryPurchasedDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inventory_purchased_details', function (Blueprint $table) {
            $table->increments('inventory_purchased_details_id');
            $table->float('amount');
            $table->integer('address_id');
            $table->date('purchased_date');
            $table->string('acqNumber');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inventory_purchased_details');
    }
}
