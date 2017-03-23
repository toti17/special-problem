@extends('layout')
@section('content')

<div class="container-fluid custom-container">
	<div class="col-md-12 @if(Auth::user()->status == 'unconfirmed') borrowed-div @else confirm-div @endif " data-toggle="tooltip" data-placement="top">
		<button @if(Auth::user()->status == 'unconfirmed') disabled @endif type='button' class='btn btn-default borrowed-button' data-toggle='modal' data-target='#borrow-modal'>Borrowed Materials</button>
	</div>
	<div class="col-md-6 col-md-offset-3 main">
		<div class='input-group student-div' @if(Auth::user()->status == 'unconfirmed') style='margin-top: 60px' @endif >
			<input type='text' class = 'form-control search'/>
			<div class='input-group-btn'>
				<button type='button' class='btn btn-secondary'>
					<span class='glyphicon glyphicon-search'></span>
				</button>
			</div>	
		</div>		
		<table class="table table-condensed table-hover">
			<thead>
				<tr>
					<th class='text-left'>Title</th>
				</tr>
				<tr id='no-materials' >
					<td>Please add materials...</td>
				</tr>
			</thead>
			<tbody class='text-center material-items'>
				@foreach ($materials as $material)
				<div id='next-page'></div>
				<tr id="acq{{$material->acqNumber}}" >
					<td class='material-view-button text-left' type ='button' data-toggle='modal' data-target='#material-modal'>
						<input type='hidden' value="{{$material->acqNumber}}" name='material-acqNumber'/>
						{{ $material->title }}
					</td>
				</tr>
				@endforeach
			</tbody>
		</table>
		<div class='pages'>
			{{ $materials->links() }}
		</div>
	</div>	

	@include('borrowed_materials_modal')
	@include('material_modal')

</div>
@endsection