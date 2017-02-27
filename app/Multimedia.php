<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Multimedia extends Model
{
    protected $table ="multimedia";
    protected $primaryKey = "multimedia_id";
    protected $fillable=['acqNumber', 'duration', 'duration_type'];
    public $timestamps = false;

    public function material()
    {
    	return $this->belongsTo(Material::class);
    }
}
