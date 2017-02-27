<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MaterialType extends Model
{
    protected $table = 'material_types';
    public $incrementing = false;
    
    public function material(){
    	return $this->hasOne(Material::class);
    }
}
