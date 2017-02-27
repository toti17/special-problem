<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Publisher_Name extends Model
{
    protected $table ="publisher_name";
    protected $primaryKey = "publisher_name_id";
    protected $fillable = ['publisher_name'];
    public $timestamps = false;

    public function publisher()
    {
    	return $this->hasMany(Publisher::class);
    }
}
