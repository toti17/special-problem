<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $table ="address";
    protected $primaryKey = "address_id";
    protected $fillable = ['address_name'];
    public $timestamps = false;

    public function publisher()
    {
    	return $this->hasMany(Publisher::class);
    }
    public function purchased_details()
    {
    	return $this->hasMany(Purchased_Detail::class);
    }
}