<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Venacular_Name extends Model
{	
	protected $primaryKey = 'venacular_name_id';
	protected $table = 'venacular_names';
	protected $fillable = ['venacular_name'];
	public $timestamps = false;

	public function inventory()
	{
		return $this->belongsToMany(Inventory::class, 'inventory_venacular_name', 'venacular_name_id', 'acqNumber');
	}
}
