<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Material;

class DeleteController extends Controller
{
   public function deleteMaterial(Material $acqNumber){
   	// if($acqNumber->donor_id != ''){
   	// 	return 'haha';
   	// 	$acqNumber->donor->donor_name->delete();
   	// 	$acqNumber->donor->delete();
   	// }
   	// else{
   	// 	$acqNumber->purchase_details->delete();
   	// }
   	// if($acqNumber->publisher_id != ''){
   	// 	return 'heeh'
   	// 	$acqNumber->publisher->publisher_name->delete();
   	// 	$acqNumber->publisher->address->delete();
   	// 	$acqNumber->publisher->delete();
   	// }
   	// foreach($acqNumber->author as $author){
   	// 	$author->delete();
   	// }
   	// $acqNumber->author()->detach();
   	// $acqNumber->purchase_details->delete();
   	// $task = $acqNumber->delete();
   	// return response()->json($task);
   }
}
