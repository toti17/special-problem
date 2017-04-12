<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class English_Name extends Model
{
	protected $primaryKey = 'english_name_id';
	protected $table = 'english_names';
	protected $fillable = ['english_name'];
	public $timestamps = false;

	public function inventory()
	{
		return $this->belongsToMany(Inventory::class, 'inventory_english_name', 'english_name_id', 'acqNumber');
	}
}