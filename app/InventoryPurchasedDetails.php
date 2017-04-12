<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InventoryPurchasedDetails extends Model
{
	protected $primaryKey = 'inventory_purchased_details_id';
	protected $fillable = ['amount', 'address_id', 'purchased_date', 'acqNumber'];
	public $timestamps = false;

	public function inventory()
	{
		return $this->belongsTo(Inventory::class, 'acqNumber');
	}
	public function address()
	{
		return $this->belongsTo(Address::class);
	}
}
