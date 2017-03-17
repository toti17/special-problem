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

    public function student()
    {
        return $this->hasOne(Student::class,'username');
    }
    public function material()
    {
        return $this->belongsToMany(Material::class, 'borrowed', 'username', 'acqNumber');
    }
    public function staff()
    {
        return $this->hasOne(Staff::class, 'username');
    }
    public function school()
    {
        return $this->hasOne(School::class, 'school_id');
    }
}