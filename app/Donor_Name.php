<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Donor_Name extends Model
{
    protected $table ="donor_name";
    protected $primaryKey = "donor_name_id";
    protected $fillable = ['firstname', 'middlename', 'lastname'];
    public $timestamps = false;

    public function donor()
    {
    	return $this->hasMany(Donor::class, 'donor_name_id');
    }
    public function inventory_donor()
    {
    	return $this->hasMany(InventoryDonor::class, 'donor_name_id');
    }
}