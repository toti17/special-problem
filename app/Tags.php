<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
	protected $table="tags";
	protected $primaryKey = "tags_id";
	protected $fillable = ['tag_name'];
	public $timestamps = false;

	public function material()
	{
		return $this->belongsToMany(Material::class, 'material_tags', 'tags_id', 'acqNumber');
	}
}