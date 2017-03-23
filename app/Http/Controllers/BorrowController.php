<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Material;
use App\User;
use DB;
class BorrowController extends Controller
{
    public function borrow(Material $acqNumber){
        $username = Auth::user()->username;
        $date = date('Y-m-d H:i:s');
        $acqNumber->borrow()->attach($username, ['borrowed_datetime' => $date, 'status' => 'pending']);
    }
    public function checkBorrowed(Material $acqNumber){
       $check_acq = DB::table('borrowed')->select('acqNumber')->where([
        ['acqNumber', $acqNumber->acqNumber],
        ['username', Auth::user()->username],
        ])->get()->count();
       $user_borrowed_count = Auth::user()->material->count();
       return response()->json([
    	'acq_count' => $check_acq,
    	'user_borrowed_count' =>$user_borrowed_count,
       ]);
    }
    public function borrowedmaterials(){
        $username = Auth::user();
        $borrowed_materials = $username->material;
        return response()->json([
            'materials' => $borrowed_materials,
        ]);
    }
    public function delete(Material $acqNumber){
        $username = Auth::user();
        $username->material()->detach($acqNumber->acqNumber);
    }
    public function staffDelete(Material $acqNumber, $username){
        $username = User::find($username);
        $username->material()->detach($acqNumber->acqNumber);
    }
    public function confirmMaterials(Material $acqNumber, $username){
        $users = DB::table('borrowed')->select('username')->where('acqNumber', $acqNumber->acqNumber)->get();
        foreach($users as $user){
            $acqNumber->borrow()->updateExistingPivot($user->username, array('status' => 'borrowed'));    
        }
        $acqNumber->borrow()->updateExistingPivot($username, array('status' => 'checked out'));
    }
    public function unconfirmMaterials(Material $acqNumber, $username){
        $users = DB::table('borrowed')->select('username')->where('acqNumber', $acqNumber->acqNumber)->get();
        foreach($users as $user){
            $acqNumber->borrow()->updateExistingPivot($user->username, array('status' => 'pending'));    
        }
    }
}