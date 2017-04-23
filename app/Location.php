<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
	protected $fillable = ['location_name'];
	public $timestamps = false;

	public function material()
	{
		return $this->hasMany(Material::class);
	}
	public function inventory()
	{
		return $this->hasMany(Inventory::class);
	}	
}
