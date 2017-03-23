<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use DB;
use App\Material;
class SearchController extends Controller
{
	public function autocomplete($type, $term){
		if($type == 'Accession Number'){
			// $material = Material::findOrFail($term);
			$material = DB::table('material')->select('acqNumber')->where('acqNumber', 'LIKE',  '%' . $term . '%')->get();
		}
		// $results = [];
		// $material_query = DB::table('material')
		// 	->select('title')->where('title', 'LIKE', '%' . $term . '%')->get();
		// $material_query_count = DB::table('material')
		// 	->select('title')->where('title', 'LIKE', '%' . $term . '%')->get()->count();
		// 	if($material_query_count != 0){
		// 		foreach($material_query as $query){
		// 			$results[] = ['title' => $query->title];
		// 		}				
		// 	}
		// 	else{
		// 		$results = 'No results.';
		// 	}

		return $material;
	}
}