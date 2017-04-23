<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $table = 'material';
    protected $primaryKey = 'acqNumber';
    protected $fillable = ['acqNumber', 'title', 'status', 'material_type_id', 'publisher_id', 'donor_id', 'location_id', 'description', 'copy_count'];
    public $incrementing = false;

    public function borrow()
    {
        return $this->belongsToMany(User::class, 'borrowed', 'acqNumber', 'username');
    }
    public function modify()
    {
        return $this->belongsToMany(User::class, 'modified', 'acqNumber', 'username')->withTimestamps();
    }
    public function author()
    {
    	return $this->belongsToMany(Author::class, 'written', 'acqNumber', 'author_id');
    }
    public function tags()
    {
        return $this->belongsToMany(Tags::class, 'material_tags', 'acqNumber', 'tags_id');
    }    
    public function director()
    {
        return $this->belongsToMany(Director::class, 'directed', 'acqNumber', 'director_id');
    }
    public function producer()
    {
        return $this->belongsToMany(Producer::class, 'produced', 'acqNumber', 'producer_id');
    }
    public function publisher()
    {
        return $this->belongsTo(Publisher::class);
    }
    public function donor()
    {
        return $this->belongsTo(Donor::class);
    }
    public function material_type()
    {
        return $this->belongsTo(MaterialType::class, 'material_type_id');
    }
    public function purchased_details()
    {
        return $this->hasOne(Purchase_Detail::class, 'acqNumber');
    }
    public function location()
    {
        return $this->belongsTo(Location::class);
    }
    public function thesis()
    {
        return $this->hasOne(Thesis::class, 'acqNumber');
    }
    public function photo()
    {
        return $this->hasOne(Photo::class, 'acqNumber');
    }
    public function multimedia()
    {
        return $this->hasOne(Multimedia::class, 'acqNumber');
    }
    public function material_copy()
    {
        return $this->hasMany(MaterialCopy::class, 'acqNumber');
    }
}