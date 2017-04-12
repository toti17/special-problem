<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Measurement extends Model
{
	protected $primaryKey = 'measurement_id';
	protected $fillable = ['length', 'width', 'unit', 'acqNumber'];
	public $timestamps = false;

	public function inventory()
	{
		return $this->belongsTo(Inventory::class, 'acqNumber');
	}
}
