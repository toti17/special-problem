@extends('dashboard')
@section('material')

<div class='col-lg-12'>
	<button id="add-material-button" type="button" class="btn btn-default" data-toggle='modal' data-target='#material-modal'>Add Material &nbsp;<span class='glyphicon glyphicon-plus'></span></button>
	<button type='button' class='btn btn-default search-material-button'>Search Materials &nbsp;<span class='glyphicon glyphicon-search'></span></button>
	<button class='btn btn-default confirm-materials-button'>Borrowed Materials &nbsp;<span class='glyphicon glyphicon-book'></span></button>
	<button class='btn btn-default generate-report'>Generate Report &nbsp;<span class='glyphicon glyphicon-file'></span></button>
</div>

<div class="col-md-6 alert  alert-success success-status @if(session('status')) has-status @endif">
@if(session('status'))

   {{ session('status') }}
@endif   
</div>

<div class="col-md-6 alert  alert-danger delete-status"> 
</div>

<div class="col-md-6 alert  alert-danger delete-borrowed-status"><span class='borrowed-message'></span>
</div>

<div class="col-md-6 alert  alert-warning unconfirm-borrowed-status"><span class='unconfirm-message'></span>
</div>

<div class="col-md-6 alert  alert-success confirm-borrowed-status"><span class='confirm-message'></span>
</div>

<input type='hidden' value="{{Auth::user()->type}}" id='user-type'>

<div class='col-md-7 col-md-offset-2 search-div'>
	<div class='input-group'>
		<div class='input-group-btn'>
			<div class='dropdown'>
				<button class='btn btn-primary dropdown-toggle search-type' type='button' data-toggle='dropdown' value='Title'>Title
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
		<input type='text' class = 'form-control search' placeholder='Search here...'/>
	</div>
	<span class='author-info hidden'><i>Click the author's name to view the list of materials he/she has written.</i></span>
	<div class='text-center results-div'><p>Sort Results By</p>
		<div class='btn-group' data-toggle='buttons'>
			<label class="btn btn-default sort-buttons active" id="sort-materials">
			 	<input type="radio" name="sort-options" autocomplete="off" checked> All Materials
  			</label>
			<label class="btn btn-default sort-buttons" id="sort-most-viewed">
				<input type="radio" name="sort-options" autocomplete="off"> Most Viewed
			</label>
			<label class="btn btn-default sort-buttons" id="sort-most-borrowed">
				<input type="radio" name="sort-options" autocomplete="off"> Most Borrowed
			</label>  			
		</div>
	</div>
	<div class='text-center borrowed-results-div hidden'><p>Sort Results By</p>
		<div class='btn-group' data-toggle='buttons'>
			<label class="btn btn-default active borrow-sort-buttons" id="sort-all-materials">
			 	<input type="radio" name="sort-borrowed-options" autocomplete="off" checked> All Materials
  			</label>
			<label class="btn btn-default borrow-sort-buttons" id="sort-borrowed-materials">
				<input type="radio" name="sort-borrowed-options" autocomplete="off"> Borrowed
			</label>
			<label class="btn btn-default borrow-sort-buttons" id="sort-pending-materials">
				<input type="radio" name="sort-borrowed-options" autocomplete="off"> Pending
			</label>  			
		</div>
	</div>	
</div>

<div class='table-responsive col-md-12 confirm-material-table hidden'>
	<table class='table table-hover table-striped wait'>
		<thead>
			<th>Username</th>
			<th>Accession Number</th>
			<th>Title</th>
			<th>Date and Time</th>
			<th>Action</th>
			<tr id='no-borrowed-materials'>
				<td>No borrowed materials...</td>
			</tr>		
		</thead>
		<tbody class='borrowed-materials-tbody'>
		</tbody>
	</table>
</div>
<div class='col-xs-12 col-md-12 col-lg-12'>
	<div class='search-pagination borrowed-pagination'>
		<ul id="borrowed-pagination" class="pagination-sm"></ul>
	</div>	
</div>

<div class='table-responsive col-md-12 material-table'>
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

<div class='col-xs-12 col-md-12 col-lg-12'>
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