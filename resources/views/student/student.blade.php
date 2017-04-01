@extends('layout')
@section('content')

<div class="container-fluid custom-container">
	<div class="col-md-12 @if(Auth::user()->status == 'unconfirmed') borrowed-div @else confirm-div @endif " data-toggle="tooltip" data-placement="top">
		<button 
			@if(Auth::user()->status == 'unconfirmed') disabled @endif type='button' 
			class='btn btn-default borrowed-button' data-toggle='modal' data-target='#borrow-modal'>Borrowed Materials
			@if($borrowed !=0)
			<span class="borrow-badge badge">
				{{$borrowed}}
			</span>
			@endif
		</button>
	</div>
	<div class="col-md-6 col-md-offset-3 main">
		<div class='input-group student-div' @if(Auth::user()->status == 'unconfirmed') style='margin-top: 60px' @endif >
			<div class='input-group'>
				<div class='input-group-btn'>
					<div class='dropdown'>
						<button class='btn btn-default dropdown-toggle search-type' type='button' data-toggle='dropdown' value='Title'>Title<span class='caret'></span></button>
						<ul class='dropdown-menu type-dropdown'>
							<li><a href="#">Title</a></li>					
							<li><a href="#">Accession Number</a></li>
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
		</div>
		<table class="table table-condensed table-hover">
			<thead>
				<tr>
					<th class='text-left acq-th hidden'>Accession Number</th>				
					<th class='text-left title-th'>Title</th>
					<th class='text-left type-th hidden'>Type</th>	
					<th class='text-left author-th hidden'>Author</th>
					<th class='text-right action-th'>Action</th>
				</tr>
				<tr id='no-materials'>
					<td>Please add materials...</td>
				</tr>
			</thead>
			<tbody class='text-center material-items'>

			</tbody>
		</table>
		<div class='search-pagination user-search-pagination'>
			<ul id="pagination-demo" class="pagination-sm"></ul>
		</div>		
	</div>	

	@include('borrowed_materials_modal')
	@include('material_modal')

</div>
@endsection