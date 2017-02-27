<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $table ="author";
    protected $primaryKey = 'author_id';
    protected $fillable = ['firstname', 'middlename', 'lastname'];
    public $timestamps = false;

    public function material()
    {
    	return $this->belongsToMany(Material::class, 'written', 'author_id', 'acqNumber');
    }
}
