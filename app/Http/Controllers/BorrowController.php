<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Material;
use App\User;
use App\BorrowTransaction;
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

        $already_borrowed_count = DB::table('borrowed')->where('acqNumber', $acqNumber)->where('username', $username->username)->get()->count();

        $user_borrowed_count = DB::table('borrowed')->where('username', $username->username)->get()->count();

       return response()->json([
    	'acq_count' => $already_borrowed_count,
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

    public function confirmMaterials($acqNumber, $username, $date){
        BorrowTransaction::create([
            'acqNumber' => $acqNumber,
            'username' => $username,
            'date' => $date,
        ]);
             
        $error = 'none';
        $acq_check_borrow = DB::table('borrowed')->where('acqNumber', $acqNumber)->where('status', 'checked out')->get()->count();
        if($acq_check_borrow == 0){
            DB::table('borrowed')->where('acqNumber', $acqNumber)->where('username', $username)->update([
                'acqNumber' => $acqNumber,
                'status' => 'checked out'
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
                    DB::table('borrowed')->where('acqNumber', $acqNumber->acqNumber)->where('username', $username)->where('status', 'pending')->update([
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
        DB::table('borrow_transactions')->where('acqNumber', $acqNumber)->where('username', $username)->delete();
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

    public function generateReport($month, $year){
        $borrowed_array = [];
        $borrowed = DB::table('borrow_transactions')
        ->select('acqNumber', DB::raw('count(acqNumber) as c'))
        ->where(DB::raw('YEAR(Date)'), $year)
        ->where(DB::raw('MONTH(Date)'), $month)
        ->groupBy('acqNumber')
        ->havingRaw("c >= 1")
        ->orderBy('c', 'desc')
        ->limit(10)
        ->get();
        if(sizeof($borrowed) != 0){
            foreach($borrowed as $borrow){
                $material = Material::find($borrow->acqNumber);
                $title = $material->title;
                array_push($borrowed_array, $title);
            }
        }

        $viewed_array = [];
        $viewed = DB::table('view_transactions')
        ->select('acqNumber', DB::raw('count(acqNumber) as c'))
        ->where(DB::raw('YEAR(Date)'), $year)
        ->where(DB::raw('MONTH(Date)'), $month)
        ->groupBy('acqNumber')
        ->havingRaw("c >= 1")
        ->orderBy('c', 'desc')
        ->limit(10)
        ->get();
        if(sizeof($viewed) != 0){
            foreach($viewed as $view){
                $material = Material::find($view->acqNumber);
                $title = $material->title;
                array_push($viewed_array, $title);
            }
        }

        return response()->json([
            'borrowed' => $borrowed_array,
            'viewed' => $viewed_array
        ]);
    }
}