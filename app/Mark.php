<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mark extends Model
{
	protected $primaryKey = 'mark_id';
	protected $fillable = ['mark_name'];
	public $timestamps = false;

	public function inventory()
	{
		return $this->belongsToMany(Inventory::class, 'inventory_marks', 'mark_id', 'acqNumber');
	}
}