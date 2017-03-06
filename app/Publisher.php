<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Publisher extends Model
{
    protected $table = "publisher";
    protected $primaryKey = "publisher_id";
    protected $fillable = ['publisher_name_id', 'address_id', 'year'];
    public $timestamps = false;
    
    public function material()
    {
        return $this->hasMany(Material::class);
    }
    public function publisher_name()
    {
        return $this->belongsTo(Publisher_name::class);
    }
    public function address()
    {
        return $this->belongsTo(Address::class);
    }
}