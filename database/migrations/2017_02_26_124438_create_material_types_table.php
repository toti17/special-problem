<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMaterialTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('material_types', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('type', [
                'Photocopied Articles', 'Research Reports', 'Conference Papers', 'Private Collections', 'Rare Collections', 'Thesis',
                'Serials', 'Newspapers', 'Journals', 'Magazines', 'Photographs', 'Compact Discs', 'Digital Versatile Discs', 'Video Home Systems', 'Cassette Tapes'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('material_types');
    }
}
