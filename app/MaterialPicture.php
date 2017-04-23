<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MaterialPicture extends Model
{
	protected $fillable = ['name', 'extension', 'photo_id'];
	public $timestamps = false;

	public function pictures()
	{
		return $this->belongsTo(Photo::class, 'photo_id');
	}
}
