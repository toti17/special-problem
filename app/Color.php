<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
	protected $primaryKey = 'color_id';
	protected $fillable = ['color_name'];
	public $timestamps = false;

	public function inventory()
	{
		return $this->belongsToMany(Inventory::class, 'inventory_color', 'color_id', 'acqNumber');
	}
}
