@extends('dashboard')
@section('material')

<div class='col-lg-12'>
	<h4 id="welcome-message">Hello, {{Auth::user()->firstname}} {{Auth::user()->middlename}} {{Auth::user()->lastname}}</h4>
	<button class='btn btn-danger backup pull-right'>Backup &nbsp;<span class='glyphicon glyphicon-floppy-disk'></span></button>
</div>

<input type='hidden' value="{{Auth::user()->type}}" id='user-type'>

<div class="col-xs-12 col-md-6 alert  alert-success success-status user-status"><span class='success-message'>Successfully backed up database!</span>
</div>

<div class='col-lg-12'>
	<div class='col-lg-6 home-table-div'>
		<table class='table'>
			<thead>
				<tr>
					<th class='table-caption'>Materials</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Vertical Files</td>
					<td>{{$vertical_count}}</td>
				</tr>
				<tr>
					<td>Books</td>
					<td>{{$book_count}}</td>
				</tr>
				<tr>
					<td>Thesis</td>
					<td>{{$thesis_count}}</td>
				</tr>			
				<tr>
					<td>Periodicals</td>
					<td>{{$periodical_count}}</td>
				</tr>
				<tr>
					<td>Photographs</td>
					<td>{{$picture_count}}</td>
				</tr>			
				<tr>
					<td>Multimedia</td>
					<td>{{$multimedia_count}}</td>
				</tr>
				<tr>
					<td>Total</td>
					<td>{{$material_count}}</td>
				</tr>						
			</tbody>
		</table>	
	</div>

	<div class='col-lg-6 home-table-div'>
		<table class='table'>
			<thead>
				<tr>
					<th class='table-caption'>Inventories</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Artifacts</td>
					<td>{{$artifact_count}}</td>
				</tr>
				<tr>
					<td>Textiles</td>
					<td>{{$textile_count}}</td>
				</tr>				
				<tr>
					<td>Farming tools</td>
					<td>{{$farming_count}}</td>
				</tr>
				<tr>
					<td>Fishing Tools</td>
					<td>{{$fishing_count}}</td>
				</tr>
				<tr>
					<td>Total</td>
					<td>{{$inventory_count}}</td>
				</tr>							
			</tbody>
		</table>	
	</div>
</div>


<div class='col-lg-12'>
	<div class='col-lg-6 home-table-div'>
		<table class='table'>
			<thead>
				<tr>
					<th class='table-caption'>Borrowed Materials</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Checked Out</td>
					<td>{{$check_count}}</td>
				</tr>
				<tr>
					<td>Pending</td>
					<td>{{$pending_count}}</td>
				</tr>							
			</tbody>
		</table>	
	</div>

	<div class='col-lg-6 home-table-div'>
		<table class='table'>
			<thead>
				<tr>
					<th class='table-caption'>Accounts</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Confirmed Accounts</td>
					<td>{{$confirmed_count}}</td>
				</tr>
				<tr>
					<td>Unconfirmed Accounts</td>
					<td>{{$unconfirmed_count}}</td>
				</tr>							
			</tbody>
		</table>	
	</div>
</div>
@endsection