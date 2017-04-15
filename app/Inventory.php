<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    protected $primaryKey = 'acqNumber';
    protected $fillable = ['acqNumber', 'object', 'english_name_id', 'venacular_name_id', 'condition', 'inventory_type_id'];
    public $incrementing = false;
	
    public function inventory_type()
    {
        return $this->belongsTo(Inventory_Type::class, 'inventory_type_id');
    }
    public function owner()
    {
        return $this->belongsTo(Owner::class, 'owner_id');
    }
    public function measurement()
    {
        return $this->hasOne(Measurement::class, 'acqNumber');
    }
    public function english_name()
    {
        return $this->belongsToMany(English_Name::class, 'inventory_english_name', 'acqNumber', 'english_name_id');
    }
    public function venacular_name()
    {
        return $this->belongsToMany(Venacular_Name::class, 'inventory_venacular_name', 'acqNumber', 'venacular_name_id');
    }
    public function materials()
    {
        return $this->belongsToMany(Invent_Material::class, 'inventory_material', 'acqNumber', 'material_id');
    }
    public function color()
    {
        return $this->belongsToMany(Color::class, 'inventory_color', 'acqNumber', 'color_id');
    }
    public function decoration()
    {
        return $this->belongsToMany(Decoration::class, 'inventory_decoration', 'acqNumber', 'decoration_id');
    }
    public function mark()
    {
        return $this->belongsToMany(Mark::class, 'inventory_marks', 'acqNumber', 'mark_id');
    }
    public function purchased_detail()
    {
        return $this->hasOne(InventoryPurchasedDetails::class, 'acqNumber');
    }
    public function picture()
    {
        return $this->hasOne(InventoryPictures::class, 'acqNumber');
    }
    public function donor()
    {
        return $this->belongsTo(InventoryDonor::class, 'donor_id');
    }
}