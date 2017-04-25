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
    }
    public function checkBorrowed($acqNumber){
        $username = Auth::user();
        $borrow_count = 0;
        $checked_out_materials = DB::table('borrowed')->where('username', $username->username)->where('status', 'checked out')->get();
        foreach($checked_out_materials as $checked){
            if($checked->acqNumber == $acqNumber){
                $borrow_count ++;
                break;
            }
            else{
                $copies = DB::table('material_copies')->where('acqNumber', $acqNumber)->get();
                foreach($copies as $copy){
                    if($checked->acqNumber == $copy->copy_acqNumber){
                        $borrow_count ++;
                        break;
                    }
                }
            }
        }

        $check_acq = $borrow_count;

        $user_borrowed_count = DB::table('borrowed')->where('username', $username->username)->get()->count();

       return response()->json([
    	'acq_count' => $check_acq,
    	'user_borrowed_count' =>$user_borrowed_count,
       ]);
    }
    public function borrowedmaterials(){
        $username = Auth::user();
        $borrowed_materials = DB::table('borrowed')->where('username', $username->username)->get();
        return response()->json([
            'materials' => $borrowed_materials
        ]);
    }
    
    public function delete($acqNumber){
        DB::table('borrowed')->where('acqNumber', $acqNumber)->delete();
    }
    public function staffDelete($acqNumber){
        DB::table('borrowed')->where('acqNumber', $acqNumber)->delete();
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