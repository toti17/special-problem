<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Decoration extends Model
{
	protected $primaryKey = 'decoration_id';
	protected $fillable = ['decoration_name'];
	public $timestamps = false;

	public function inventory()
	{
		return $this->belongsToMany(Inventory::class, 'inventory_decoration', 'decoration_id', 'acqNumber');
	}
}
