<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invent_Material extends Model
{
	protected $primaryKey = 'material_id';
	protected $table = 'invent_materials';
	protected $fillable = ['material_name'];
	public $timestamps = false;

	public function inventory()
	{
		return $this->belongsToMany(Inventory::class, 'inventory_material', 'material_id', 'acqNumber');
	}
}
