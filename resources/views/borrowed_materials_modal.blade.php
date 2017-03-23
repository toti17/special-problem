<div class='modal fade' id='borrow-modal' role='dialog' data-keyboard='false' data-backdrop='static'>
	<div class='modal-dialog modal-lg' role='document'>
		<div class='modal-content'>
			<div class='modal-header'>
				<button type='button' class='close borrowed-close' data-dismiss='modal' aria-label='Close'>
					<span aria-hidden='true'>&times;</span>
				</button>
				<h4 class='modal-title'>Borrowed Materials</h4>
			</div>

			<div class='modal-body'>
				<table class='table table-hover table-striped tables'>
					<thead>
						@if(Auth::user()->type == "student")
						<th>Title</th>
						<th>Status</th>
						<th>Action</th>
						<tr id='no-borrowed-materials' >
							<td>No borrowed materials...</td>
						</tr>						
						@elseif(Auth::user()->type == "staff")
						<th>Username</th>
						<th>Fullname</th>
						<th>Material</th>
						<th>Title</th>
						<th>Action</th>
						@endif
					</thead>
					<tbody class='borrowed-materials-tbody'>
					</tbody>
				</table>
			</div>
			<div class='modal-footer'>
				<button type='button' class='btn btn-default borrowed-close' data-dismiss='modal' aria-label='Close'>Close</button>
			</div>
		</div>
	</div>
</div>