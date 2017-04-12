<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Owner extends Model
{
	protected $primaryKey = 'owner_id';
	protected $fillable = ['firstname', 'middlename', 'lastname'];
	public $timestamps = false;

	public function inventory()
	{
		return $this->hasMany(Inventory::class, 'owner_id');
	}
	public function address()
	{
		return $this->belongsTo(Address::class);
	}
}