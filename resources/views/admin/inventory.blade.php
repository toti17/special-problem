@extends('dashboard')
@section('material')

<div class='col-md-6'>
	<button id="add-inventory-button" type="button" class="btn btn-default" data-toggle='modal' data-target='#inventory-modal'>Add Inventory</button>
</div>

<div class="col-md-6 alert  alert-success success-status @if(session('status'))  @else hidden @endif">
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
				<button class='btn btn-default dropdown-toggle inventory-search-type' type='button' data-toggle='dropdown' value='Object'>Object
					<span class='caret'></span>
				</button>
				<ul class='dropdown-menu inventory-type-dropdown'>
					<li><a href="#">Object</a></li>					
					<li><a href="#">English Name</a></li>
					<li><a href="#">Owner</a></li>
					<li><a href="#">Donor</a></li>
					<li><a href="#">Locality</a></li>											
				</ul>
			</div>
		</div>			
		<input type='text' class = 'form-control inventory-search'/>
	</div>
</div>

<div class='col-md-12 inventory-div'>
	<table class="table table-condensed table-hover wait inventories-table tablesorter">
		<thead>
			<tr>
				<th class='text-left object-th'>Object&nbsp;&nbsp;<i class="fa fa-sort" aria-hidden="true"></i></th>
				<th class='text-left venName-th'>Name of Owner&nbsp;&nbsp;<i class="fa fa-sort" aria-hidden="true"></i></th>
				<th class='text-left venName-th'>Type&nbsp;&nbsp;<i class="fa fa-sort" aria-hidden="true"></i></th>	
				<th class='text-right action-th'>Action</th>
			</tr>
			<tr id='no-inventories' class='hidden'>
				<td>Please add inventories...</td>
			</tr>
		</thead>
		<tbody class='text-center inventory-items'>

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


@include('inventory_modal')

@endsection