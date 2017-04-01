<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use DB;
use App\MaterialType;
use App\Material;
use App\Author;
use App\Photographer;
use App\Donor_Name;
use App\Donor;
use App\Publisher;
use App\Publisher_Name;
use App\Director;
use App\Producer;
use App\Tags;

class SearchController extends Controller
{
	public function search($type, $term){
		if($type == 'Accession Number'){
			$material = DB::table('material')->where('acqNumber', 'LIKE',  '%' . $term . '%')->get();
			$type_array = [];
			foreach($material as $acq){
				$type = MaterialType::find($acq->material_type_id);
				$type = $type->type;
				array_push($type_array, $type);
			}
			return response()->json([
				'material' => $material,
				'type' => $type_array,
			]);
		}
		else if($type == 'Title'){
			$material = DB::table('material')->where('title', 'LIKE',  '%' . $term . '%')->get();
			$type_array = [];
			foreach($material as $acq){
				$type = MaterialType::find($acq->material_type_id);
				$type = $type->type;
				array_push($type_array, $type);
			}
			return response()->json([
				'material' => $material,
				'type' => $type_array,
			]);			
		}
		else if($type == 'Publisher'){
			$publisher_name = Publisher_Name::where('publisher_name', 'LIKE', '%' . $term . '%')->get();
			return $publisher_name;
		}
		else if($type == 'Tag'){
			$tag = Tags::where('tag_name', 'LIKE', '%' . $term . '%')->get();
			$tag_array = [];
			$id_array = [];
			foreach($tag as $ta){
				array_push($id_array, $ta->tags_id);
				array_push($tag_array, $ta->tag_name);
			}
			return response()->json([
				'id' => $id_array,
				'tag' => $tag_array,
			]);
		}
		else if($type == 'Author' || $type == 'Photographer' || $type == 'Director' || $type == 'Producer' || $type == 'Donor'){
			$author = explode(" ", $term);
			$author_firstname_array = [];
			$author_middlename_array = [];
			$author_lastname_array = [];
			$author_id_array = [];
			$author_type = '';
			$auth_id = '';
			if($type == 'Author'){
				$author_type = 'author';
			}			
			else if($type == 'Photographer'){
				$author_type = 'photographer';
			}
			else if($type == 'Director'){
				$author_type  = 'director';
			}
			else if($type == 'Producer'){
				$author_type = 'producer';
			}
			else if($type == 'Donor'){
				$author_type = 'donor_name';
			}

			for($i=0;$i<sizeof($author);$i++){
				$author_array = DB::table($author_type)->where('firstname', 'LIKE', '%' . $author[$i] . '%')
				->orWhere('middlename', 'LIKE', '%' . $author[$i] .'%')
				->orWhere('lastname', 'LIKE', '%' . $author[$i] .'%')->get();
			}

			if(count($author_array) > 0){
				foreach($author_array as $auth){
					if($type == 'Author'){
						$auth_id = $auth->author_id;
					}			
					else if($type == 'Photographer'){
						$auth_id = $auth->photographer_id;
					}
					else if($type == 'Director'){
						$auth_id = $auth->director_id;
					}
					else if($type == 'Producer'){
						$auth_id = $auth->producer_id;
					}
					else if($type == 'Donor'){
						$auth_id = $auth->donor_name_id;
					}
					array_push($author_id_array, $auth_id);
					array_push($author_firstname_array, $auth->firstname);
					array_push($author_middlename_array, $auth->middlename);
					array_push($author_lastname_array, $auth->lastname);
				}
			}

			return response()->json([
				'id' => $author_id_array,
				'firstname' => $author_firstname_array,
				'middlename' => $author_middlename_array,
				'lastname' => $author_lastname_array
			]);		
		}

		else if($type == 'Username'){
			$user = DB::table('users')->where([
				['username', 'LIKE', '%' . $term . '%'],
				['type', 'student']
			])->get();
			return $user;
		}
		else if($type == 'Fullname'){
			$fullname = explode(" ", $term);
			$fullname_array = [];
			for($i=0;$i<sizeof($fullname);$i++){
				$fullname_array = DB::table('users')->where('firstname', 'LIKE', '%' . $fullname[$i] . '%')
				->orWhere('middlename', 'LIKE', '%' . $fullname[$i] .'%')
				->orWhere('lastname', 'LIKE', '%' . $fullname[$i] .'%')->get();
			}
			return $fullname_array;
		}
	}

	public function retrieveTitle(){
		$type_array = [];
		$accession = Material::all();
		foreach($accession as $acq){
			$type = MaterialType::find($acq->material_type_id);
			$type = $type->type;
			array_push($type_array, $type);
		}
		return response()->json([
			'accession' => $accession,
			'type' => $type_array,
		]);		
	}

	public function retrieveAuthor(){
		$author = Author::all();
		return $author;
	}

	public function retrieveTag(){
		$tag = Tags::all();
		return $tag;
	}

	public function retrievePhotographer(){
		$photographer = Photographer::all();
		return $photographer;
	}

	public function retrieveDirector(){
		$director = Director::all();
		return $director;
	}

	public function retrieveProducer(){
		$producer = Producer::all();
		return $producer;
	}

	public function retrieveDonor(){
		$donor = Donor_Name::all();
		return $donor;
	}

	public function retrievePublisher(){
		$publisher = Publisher_Name::all();
		return $publisher;
	}

	public function retrieveMaterials($id, $type){
		if($type == 'Author'){
			$author = Author::find($id);
			$materials = $author->material;
		}
		else if($type == 'Tag'){
			$tag = Tags::find($id);
			$materials = $tag->material;
		}
		else if($type == 'Photographer'){
			$photographer = Photographer::find($id);
			$materials = $photographer->photo;
			$material_array = [];
			foreach($materials as $mat){
				$ma = Material::find($mat->acqNumber);
				array_push($material_array, $ma);
			}
			$materials = $material_array;
		}
		else if($type == 'Publisher'){
			$publisher_array = [];
			$material_array = [];
			$type_array = [];
			$publisher_name = Publisher_Name::find($id);
			$publisher = DB::table('publisher')->where('publisher_name_id', $publisher_name->publisher_name_id)->get();
			foreach($publisher as $pub){
				array_push($publisher_array, $pub->publisher_id);
			}
			foreach($publisher_array as $pub){
				$material = Material::where('publisher_id', $pub)->get();
				array_push($material_array, $material[0]);
			}
			$materials = $material_array;
		}
		else if($type == 'Donor'){
			$material_array = [];
			$mat_array = [];
			$donor_name = Donor_Name::find($id);
			foreach($donor_name->donor as $don){
				$material = Material::where('donor_id', $don->donor_id)->get();
				array_push($material_array, $material);				
			}
			for($i=0;$i<sizeof($material_array);$i++){
				array_push($mat_array, $material_array[$i][0]);
			}
			$materials = $mat_array;
		}
		else if($type == 'Director'){
			$director = Director::find($id);
			$materials = $director->material;
		}
		else if($type == 'Producer'){
			$producer = Producer::find($id);
			$materials = $producer->material;
		}

		$type_array = [];
		foreach($materials as $acq){
			$type = MaterialType::find($acq->material_type_id);
			$type = $type->type;
			array_push($type_array, $type);
		}

		return response()->json([
			'material' => $materials,
			'type' => $type_array,
		]);
	}
}