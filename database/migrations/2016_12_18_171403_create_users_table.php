<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string('username')->primary();
            $table->string('email');
            $table->string('password');            
            $table->string('firstname');
            $table->string('middlename');
            $table->string('lastname');
            $table->string('institution');
            $table->enum('type', ['admin', 'staff', 'student']);
            $table->enum('status', ['confirmed', 'unconfirmed']);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
