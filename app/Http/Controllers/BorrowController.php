<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Material;
use App\User;
use DB;
class BorrowController extends Controller
{
    public function borrow(Material $acqNumber, $title){
        $username = Auth::user()->username;
        $user = User::find($username);
        $date = date('Y-m-d H:i:s');
        DB::table('borrowed')->insert(
            [
                'username' => $username,
                'acqNumber' => $acqNumber->acqNumber,
                'status' => 'pending',
                'title' => $title,
                'borrowed_datetime' => $date
            ]
        );
        // $user->attach(' ', ['borrowed_datetime' => $date, 'status' => 'pending']);
        // $acqNumber->borrow()->attach($username, ['borrowed_datetime' => $date, 'status' => 'pending']);
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
        // $borrowed_materials = $username->material;
        $borrowed_materials = DB::table('borrowed')->where('username', $username->username)->get();
        return response()->json([
            'materials' => $borrowed_materials
        ]);
    }
    public function delete(Material $acqNumber){
        $username = Auth::user();
        $username->material()->detach($acqNumber->acqNumber);
    }
    public function staffDelete(Material $acqNumber, $username){
        $username = User::find($username);
        $username->material()->detach($acqNumber->acqNumber);
        DB::table('borrowed')->where('acqNumber', $acqNumber->acqNumber)->update(['status' => 'pending']);
    }
    public function confirmMaterials($acqNumber, $username){
        $error = 'none';
        $acq_check_borrow = DB::table('borrowed')->where('acqNumber', $acqNumber)->where('status', 'checked out')->get()->count();
        if($acq_check_borrow == 0){
            DB::table('borrowed')->where('username', $username)->update([
                'acqNumber' => $acqNumber,
                'status' => 'checked out',
            ]);
            $borrowed_acqNumber = $acqNumber;
        }
        else{
            $acqNumber = Material::find($acqNumber);
            $material_copies = $acqNumber->material_copy;
            $material_copies_count = count($material_copies);
            $borrow_count = 0;
            foreach($material_copies as $copies){
                $count = DB::table('borrowed')->where('acqNumber', $copies->copy_acqNumber)->get()->count();
                if($count == 0){
                    DB::table('borrowed')->where('username', $username)->update([
                        'acqNumber' => $copies->copy_acqNumber,
                        'status' => 'checked out',
                    ]);
                    $borrowed_acqNumber = $copies->copy_acqNumber;
                    break;
                }
                else{
                    $borrow_count++;
                }
            }
            if($material_copies_count == $borrow_count){
                $error = 'full';
                $borrowed_acqNumber = $acqNumber->acqNumber;
            }
        }

        return response()->json([
            'borrowed_acqNumber' => $borrowed_acqNumber,
            'error' => $error,
        ]);
    }
    public function unconfirmMaterials($acqNumber, $username){
        $initial = $acqNumber;
        $material = Material::find($acqNumber);
        if($material == ''){
            $material = DB::table('material_copies')->where('copy_acqNumber', $acqNumber)->take(1)->get();
            $acqNumber = $material[0]->acqNumber;
        }
        DB::table('borrowed')->select('username')->where('acqNumber', $initial)->update(['acqNumber' => $acqNumber,'status' => 'pending']);
        return response()->json([
            'initial' => $initial,
            'original_acq' => $acqNumber,
        ]);
    }
}