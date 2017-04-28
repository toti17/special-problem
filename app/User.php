<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'firstname', 'middlename', 'lastname', 'type', 'email', 'institution', 'password', 'status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $primaryKey = "username";

    public function material()
    {
        return $this->belongsToMany(Material::class, 'borrowed', 'username', 'acqNumber')->withPivot('status');
    }
    public function inventory()
    {
        return $this->belongsToMany(Inventory::class, 'borrowed', 'username', 'acqNumber')->withPivot('status');   
    }
    public function modify()
    {
        return $this->belongsToMany(Material::class, 'modified', 'username', 'acqNumber')->withTimestamps();
    }
}