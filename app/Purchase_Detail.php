<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Purchase_Detail extends Model
{
	protected $table = "purchased_details";
	protected $primaryKey = "purchased_details_id";
	protected $fillable =['amount', 'address_id', 'year', 'acqNumber'];
	public $timestamps = false;

	public function material()
	{
		return $this->belongsTo(Material::class, 'acqNumber');
	}
	public function address(){
		return $this->belongsTo(Address::class);
	}
}
