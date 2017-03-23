<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use DB;
use App\Material;
class SearchController extends Controller
{
	public function search($type, $term){
		if($type == 'Accession Number'){
			$material = DB::table('material')->where('acqNumber', 'LIKE',  '%' . $term . '%')->get();
			return $material;
		}
		else if($type == 'Username'){
			$user = DB::table('users')->where([
				['username', 'LIKE', '%' . $term . '%'],
				['type', 'student']
			])->get();
			return $user;
		}
	}
}