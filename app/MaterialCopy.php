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
	public function purchased_detail()
	{
		return $this->hasOne(Purchase_Detail::class, 'copy_acqNumber');
	}
	public function donor()
	{
	return $this->belongsTo(Donor::class);
	}
}
