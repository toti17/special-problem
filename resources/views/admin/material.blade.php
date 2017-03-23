@extends('dashboard')
@section('material')

<div class='col-md-6'>
	<button id="add-material-button" type="button" class="btn btn-default" data-toggle='modal' data-target='#material-modal'>Add Material</button>
	<button type='button' class='btn btn-default search-material-button'>Search Materials</button>
	<button class='btn btn-default confirm-materials-button'>Borrowed Materials</button>
</div>

<div class="col-md-6 alert  alert-success success-status @if(session('status'))  @else hidden @endif">
@if(session('status'))

   {{ session('status') }}
@endif   
    <button type="button" class="close success-close" aria-label="Close" data-dismiss='alert'>
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class='col-md-7 col-md-offset-2 search-div'>
	<div class='input-group'>
		<div class='input-group-btn'>
			<div class='dropdown'>
				<button class='btn btn-default dropdown-toggle search-type' type='button' data-toggle='dropdown' value='Accession Number'>Accession Number <span class='caret'></span></button>
				<ul class='dropdown-menu type-dropdown'>
					<li><a href="#">Accession Number</a></li>
					<li><a href="#">Title</a></li>
					<li><a href="#">Author</a></li>
					<li><a href="#">Publisher</a></li>								
				</ul>
			</div>
		</div>			
		<input type='text' class = 'form-control search'/>
	</div>
</div>

<div class='col-md-10 col-md-offset-1 confirm-material-table hidden'>
<table class='table table-hover table-striped'>
	<thead>
		<th>Username</th>
		<th>Accession Number</th>
		<th>Date and Time</th>
		<th>Action</th>
		<tr id='no-borrowed-materials' >
			<td>No borrowed materials...</td>
		</tr>		
	</thead>
	<tbody class='borrowed-materials-tbody'>
		@foreach($borrowed_materials as $mat)
		<tr>
			<td>{{ $mat->username }}</td>
			<td>{{ $mat->acqNumber }}</td>
			<td>{{ $mat->borrowed_datetime }} </td>
			<td>
				<button type='button' class='btn btn-xs btn-danger remove-borrowed-button' value="{{$mat->acqNumber}}">Remove</button>
				<button type='button' class='btn btn-xs btn-default unconfirm-borrowed-button' value="{{$mat->acqNumber}}" @if($mat->status  == 'borrowed') disabled @endif >Unconfirm</button>
				<button type='button' class='btn btn-xs btn-default confirm-borrowed-button' value="{{$mat->acqNumber}}" @if($mat->status  == 'borrowed' || $mat->status  == 'checked out') disabled @endif >Confirm</button>
			</td>
		</tr>
		@endforeach
	</tbody>
</table>
	<div class='pages'>
		{{ $borrowed_materials->links() }}
	</div>
</div>

<div class='col-md-6 col-md-offset-3 material-table'>
	<table class="table table-condensed table-hover">
		<thead>
			<tr>
				<th class='text-left acq-th hidden'>Accession Number</th>				
				<th class='text-left title-th'>Title</th>				
				<th class='text-right'>Action</th>
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
				<td class='text-right action-buttons'>
					<button type='button' class='btn btn-xs btn-danger delete-button' value="{{$material->acqNumber}}"><span class='glyphicon glyphicon-remove'></span>
				</td>
			</tr>
			@endforeach
		</tbody>
	</table>
	<div class='pages'>
		{{ $materials->links() }}
	</div>
	<div class='search-pagination'>
		<ul id="pagination-demo" class="pagination-sm"></ul>
	</div>	
</div>

@if($errors->any())
<script>
	$(function() {
	    $('#material-modal').modal('show');
	});
</script>
@endif


@include('material_modal')
@include('borrowed_materials_modal')
@endsection