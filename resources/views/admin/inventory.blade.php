@extends('dashboard')
@section('material')

<div class='col-lg-12'>
	<button id="add-inventory-button" type="button" class="btn btn-default" data-toggle='modal' data-target='#inventory-modal'>Add Inventory &nbsp;<span class='glyphicon glyphicon-plus'></button>
</div>

<div class="col-md-6 alert  alert-success success-status @if(session('status')) has-inventory-status @endif">
@if(session('status'))

   {{ session('status') }}
@endif   
    <button type="button" class="close add-success" aria-label="Close" data-dismiss='alert'>
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="col-md-6 alert  alert-danger delete-status hidden"> 
    <button type="button" class="close delete-success" aria-label="Close" data-dismiss='alert'>
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<input type='hidden' value="{{Auth::user()->type}}" id='user-type'>

<div class='col-md-7 col-md-offset-2 search-div'>
	<div class='input-group'>
		<div class='input-group-btn'>
			<div class='dropdown'>
				<button class='btn btn-primary dropdown-toggle inventory-search-type' type='button' data-toggle='dropdown' value='Object'>Accession Number
					<span class='caret'></span>
				</button>
				<ul class='dropdown-menu inventory-type-dropdown'>
					<li><a href="#">Accession Number</a></li>
					<li><a href="#">Object</a></li>			
					<li role="separator" class="divider"></li>
					<li><a href="#">Owner</a></li>
					<li><a href="#">Donor</a></li>									
				</ul>
			</div>
		</div>			
		<input type='text' class = 'form-control inventory-search' placeholder='Search here...'/>
	</div>
	<span class='author-info hidden'><i>Click the name to view the list of inventories he/she has owned or donated.</i></span>
</div>
<div class='table-responsive col-md-9 col-md-offset-1 inventory-div'>
	<table class="table table-condensed table-hover wait inventories-table tablesorter">
		<thead>
			<tr>
				<th class='text-left acq-th'>Accession Number&nbsp;&nbsp;<i class="fa fa-sort" aria-hidden="true"></i></th>
				<th class='text-left obj-th'>Object&nbsp;&nbsp;<i class="fa fa-sort" aria-hidden="true"></i></th>
				<th class='text-left type-th'>Type&nbsp;&nbsp;<i class="fa fa-sort" aria-hidden="true"></i></th>	
				<th class='text-right action-th'>Action</th>
			</tr>
			<tr id='no-inventories' class='hidden'>
				<td>No results found.</td>
			</tr>
		</thead>
		<tbody class='text-center inventory-items'>

		</tbody>
	</table>

	<table class="table table-condensed table-hover wait owners-table tablesorter hidden">
		<thead>
			<tr>
				<th class='text-left owner-th'>Owner&nbsp;&nbsp;<i class="fa fa-sort" aria-hidden="true"></i></th>
			</tr>
			<tr id='no-donors' class='hidden'>
				<td>No results found.</td>
			</tr>			
		</thead>
		<tbody class='text-center owner-items'>

		</tbody>
	</table>
</div>

<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
	<div class='search-pagination inventory-search-pagination'>
		<ul id="pagination-demo" class="pagination-sm"></ul>
	</div>	
</div>


@include('inventory_modal')

@endsection