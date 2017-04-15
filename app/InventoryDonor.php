<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InventoryDonor extends Model
{
	protected $primaryKey = 'donor_id';
	protected $fillable = ['donor_name_id','donor_date'];
	public $timestamps = false;

	public function inventory()
	{
		return $this->hasMany(Inventory::class, 'donor_id');
	}
	public function donor_name()
	{
		return $this->belongsTo(Donor_Name::class, 'donor_name_id');
	}
}
