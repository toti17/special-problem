<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MaterialCopy extends Model
{
	protected $table = 'material_copies';
	public $timestamps = false;
	public $incrementing = false;

	public function material()
	{
		return $this->belongsTo(Material::class, 'acqNumber');
	}
}
