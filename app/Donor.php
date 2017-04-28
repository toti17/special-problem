<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Donor extends Model
{
    protected $table ="donor";
    protected $primaryKey = "donor_id";
    protected $fillable = ['donor_name_id', 'date', 'copy'];
    public $timestamps = false;

    public function material()
    {
        return $this->belongsToMany(Material::class, 'material_donors', 'donor_id', 'acqNumber');
    }
    public function donor_name()
    {
        return $this->belongsTo(Donor_Name::class, 'donor_name_id');
    }
}
