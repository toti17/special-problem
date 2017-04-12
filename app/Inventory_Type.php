<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inventory_Type extends Model
{
	protected $table = 'inventory_types';
	public $timestamps = false;

	public function inventory()
	{
		return $this->hasOne(Inventory::class, 'inventory_type_id');
	}
}
