<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InventoryPictures extends Model
{
	protected $fillable = ['name', 'extension', 'acqNumber'];
	public $timestamps = false;

	public function inventory()
	{
		return $this->belongsTo(Inventory::class, 'acqNumber');
	}
}
