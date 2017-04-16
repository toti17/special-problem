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

<div class="col-md-6 alert  alert-danger delete-status hidden"> 
    <button type="button" class="close delete-success" aria-label="Close" data-dismiss='alert'>
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="col-md-6 alert  alert-danger delete-borrowed-status"><span class='borrowed-message'></span>
    <button type="button" class="close delete-borrowed-success" aria-label="Close" data-dismiss='alert'>
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="col-md-6 alert  alert-warning unconfirm-borrowed-status"><span class='unconfirm-message'></span>
    <button type="button" class="close unconfirm-borrowed-success" aria-label="Close" data-dismiss='alert'>
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="col-md-6 alert  alert-success confirm-borrowed-status"><span class='confirm-message'></span>
    <button type="button" class="close confirm-borrowed-success" aria-label="Close" data-dismiss='alert'>
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<input type='hidden' value="{{Auth::user()->type}}" id='user-type'>

<div class='col-md-7 col-md-offset-2 search-div'>
	<div class='input-group'>
		<div class='input-group-btn'>
			<div class='dropdown'>
				<button class='btn btn-default dropdown-toggle search-type' type='button' data-toggle='dropdown' value='Title'>Title
					<span class='caret'></span>
				</button>
				<ul class='dropdown-menu type-dropdown'>
					<li><a href="#">Title</a></li>					
					<li><a href="#">Accession Number</a></li>
					<li role="separator" class="divider"></li>
					<li><a href="#">Tag</a></li>
					<li><a href="#">Author</a></li>
					<li><a href="#">Photographer</a></li>
					<li><a href="#">Director</a></li>
					<li><a href="#">Producer</a></li>															
					<li><a href="#">Publisher</a></li>	
					<li><a href="#">Donor</a></li>													
				</ul>
				<ul class='dropdown-menu borrowed-dropdown hidden'>
					<li><a href="#">Username</a></li>
					<li><a href="#">Accession Number</a></li>
					<li><a href="#">Date and Time</a></li>							
				</ul>
			</div>
		</div>			
		<input type='text' class = 'form-control search'/>
	</div>
	<span class='author-info hidden'><i>Click the author's name to view the list of materials he/she has written.</i></span>
	<div class='text-center results-div'><p>Sort Results By</p>
		<div class='btn-group' data-toggle='buttons'>
			<label class="btn btn-default active" id="sort-materials">
			 	<input type="radio" name="sort-options" autocomplete="off" checked> All Materials
  			</label>
			<label class="btn btn-default" id="sort-most-viewed">
				<input type="radio" name="sort-options" autocomplete="off"> Most Viewed
			</label>
			<label class="btn btn-default" id="sort-most-borrowed">
				<input type="radio" name="sort-options" autocomplete="off"> Most Borrowed
			</label>  			
		</div>
	</div>
</div>

<div class='col-md-10 col-md-offset-1 confirm-material-table hidden'>
<table class='table table-hover table-striped wait'>
	<thead>
		<th>Username</th>
		<th>Accession Number</th>
		<th>Date and Time</th>
		<th>Action</th>
		<tr id='no-borrowed-materials'>
			<td>No borrowed materials...</td>
		</tr>		
	</thead>
	<tbody class='borrowed-materials-tbody'>
	</tbody>
</table>
	<div class='search-pagination borrowed-pagination'>
		<ul id="borrowed-pagination" class="pagination-sm"></ul>
	</div>	
</div>

<div class='col-md-9 col-md-offset-1 material-table'>
	<table class="table table-condensed table-hover wait materials-table tablesorter">
		<thead>
			<tr>
				<th class='text-left acq-th hidden'>Accession Number&nbsp;&nbsp;<i class="fa fa-sort" aria-hidden="true"></i></th>				
				<th class='text-left title-th'>Title&nbsp;&nbsp;<i class="fa fa-sort" aria-hidden="true"></i></th>
				<th class='text-left type-th hidden'>Type&nbsp;&nbsp;<i class="fa fa-sort" aria-hidden="true"></i></th>	
				<th class='text-right action-th'>Action</th>
			</tr>
			<tr id='no-materials'>
				<td>No results found.</td>
			</tr>
		</thead>
		<tbody class='text-center material-items'>

		</tbody>
	</table>
	<div class='search-pagination'>
		<ul id="pagination-demo" class="pagination-sm"></ul>
	</div>	

	<table class="table table-condensed table-hover wait tablesorter authors-table hidden">
		<thead>
			<tr>
				<th class='text-left author-th'>Author&nbsp;&nbsp;<i class="fa fa-sort" aria-hidden="true"></i></th>
			</tr>
		</thead>
		<tbody class='text-center author-items'>

		</tbody>
	</table>
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