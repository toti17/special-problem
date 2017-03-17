<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use DB;

class SearchController extends Controller
{
	public function autocomplete(){
		$term = Input::get('term');
		$results = [];
		$material_query = DB::table('material')
			->select('title')->where('title', 'LIKE', '%' . $term . '%')->get();
			
		foreach($material_query as $query){
			$results[] = ['title' => $query->title];
		}
		// $results = [];
		return $results[0];
	}
}
