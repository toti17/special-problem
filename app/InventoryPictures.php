<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InventoryPictures extends Model
{
	public $timestamps = false;

	public function inventory()
	{
		return $this->belongsTo(Inventory::class, 'acqNumber');
	}
}
