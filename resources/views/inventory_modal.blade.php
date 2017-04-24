<div class='modal fade' id='inventory-modal' role='dialog' data-keyboard='false' data-backdrop='static'>
	<div class='modal-dialog' role='document'>
		<div class='modal-content inventory-content'>
			@if($errors->any())
			   @foreach ($errors->all() as $error)
			      <div>{{ $error }}</div>
			  @endforeach
			@endif
			<form class="inventory-form" role="form" method="POST" action="{{ url('/add/inventory') }}" enctype='multipart/form-data'>
				{{ csrf_field() }}
				<div class='modal-header'>
					<button type='button' class='close inventory-close' aria-label='Close'>
						<span aria-hidden='true'>&times;</span>
					</button>
					<button type='button' class='close edit-close hidden' aria-label='Close'>
						<span aria-hidden='true'>&times;</span>
					</button>					
					<h4 class='modal-title'>Add Inventory</h4>
				</div>
				<div class='modal-body'>
					<div>
						<h4>Details</h4>
						@if(Auth::user()->type == "admin" || Auth::user()->type == "staff")
						<button type='button' class='btn btn-default pull-right hidden edit-button' id='inventory-edit-button'>Edit</button>
						<button type='button' class='btn btn-default pull-right hidden edit-button hidden' id='inventory-cancel-edit-button'>Cancel Edit</button>
						@elseif(Auth::user()->type == 'user')
						<div class='tool-tip' data-toggle="tooltip" data-placement="top">
							<button type='button' class='btn btn-default pull-right hidden borrow-button' id='borrow-button'>Borrow</button>
						</div>
						@endif
					</div>
					<div class='table-responsive details-div edit-table hidden'>
						<table class='table table-bordered table-striped tables table-details'>
							<thead>
								<tr>
									<th>Category</th>
									<th>Accession Number</th>
									<th>Object</th>
									<th>Location</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class='td-category'></td>
									<td class='td-acq'></td>
									<td class='td-obj'></td>
									<td class='td-location'></td>
								</tr>
							</tbody>
						</table>
					</div>					
					<div class="form-group">
						<div class='inputfields'>
							<div class="input-group">
								<span class="input-group-addon label-title">Category</span>
								<select id='category' class='form-control' name='category'>
									<option value='' selected disabled hidden>Choose Category</option>
									<option value ='Artifacts'>Artifacts</option>
									<option value ='Textiles'>Textiles</option>
									<option value ='Farming Tools'>Farming Tools</option>
									<option value ='Fishing Tools'>Fishing Tools</option>
								</select>
							</div>

							<span class="select-help help-block hidden">
								<strong></strong>
							</span>

							<div class='input-group'>
								<span class="input-group-addon label-title">Accession Number</span>
								<input type='text' id='acqNumber' class='form-control' placeholder='B12345' name='acqNumber' value="{{ old('acqNumber') }}" />
							</div>

							<span class="acqNumber-help help-block {{$errors->has('acqNumber') ? '' :  'hidden' }}">
								<strong>@if ($errors->has('acqNumber')) {{ $errors->first('acqNumber') }} @endif</strong>
							</span>

							<div class='input-group'>
								<span class='input-group-addon label-title'>Object</span>
								<input type='text' id='object' class='form-control' placeholder='Sword' name='object' value="{{ old('object') }}" />
							</div>

							<span class="object-help help-block {{$errors->has('object') ? '' :  'hidden' }}">
								<strong>@if ($errors->has('object')) {{ $errors->first('object') }} @endif</strong>
							</span>

							<div class='input-group'>
								<span class='input-group-addon label-title'>Location </span>
								<input type='text' id='location' class='form-control' placeholder='Book shelf' name='location' value="{{ old('location') }}" />
							</div>

							<span class="location-help help-block hidden">
								<strong></strong>
							</span>
												
						</div>

						<div class='table-responsive englishName-table edit-table hidden'>
							<h4>English Names</h4>
							<table class='table table-bordered table-striped tables'>
								<tbody class='table-englishName deleteRows'>

								</tbody>
							</table>
						</div>

						<div class='english-name-new inputfields'>
							<div class='input-group'>
								<span class='input-group-addon label-title'>English Name</span>
								<input type='text' id='engName' class='form-control' placeholder='Veil' name='engName'/>
								<input type='hidden' name='engNames' id='engNames'/>				
								<div class='input-group-btn'>
									<button type='button' class='btn btn-secondary' id='add-engName'>
										<span class='glyphicon glyphicon-plus'></span>
									</button>
								</div>						
							</div>
							<span class="engName-help help-block hidden">
								<strong></strong>
							</span>						
						</div>
						<span class='english-name inputfields'></span>

						<div class='table-responsive venName-table edit-table hidden'>
							<h4>Venacular Names</h4>
							<table class='table table-bordered table-striped tables'>
								<tbody class='table-venName deleteRows'>

								</tbody>
							</table>
						</div>						

						<div class='venacular-name-new inputfields'>
							<div class='input-group'>
								<span class='input-group-addon label-title'>Venacular Name</span>
								<input type='text' id='venName' class='form-control' placeholder='Bandana' name='venName'/>
								<input type='hidden' name='venNames' id='venNames'/>	
								<div class='input-group-btn'>
									<button type='button' class='btn btn-secondary' id='add-venName'>
										<span class='glyphicon glyphicon-plus'></span>
									</button>
								</div>	
							</div>
							<span class="venName-help help-block hidden">
								<strong></strong>
							</span>						
						</div>
						<span class='venacular-name inputfields'></span>	
											
					</div>

					<h4 class='owner-header'>Owner</h4>

					<div class='table-responsive'>
						<table class='table table-bordered table-striped tables owner-table edit-table hidden'>
							<thead>
								<th>Full Name</th>
								<th>Nickname</th>
								<th>Locality</th>
							</thead>
							<tbody class='table-owner deleteRows'>

							</tbody>
						</table>
					</div>

					<div class="form-group owner inputfields">
						<span class='firstnames'>
							<div class='input-group'>
								<span class='input-group-addon label-title'>First Name</span>
								<input type='text' id='owner-firstname' class='form-control' placeholder='Ihra' name='owner-firstname'/>
							</div>
							<span class="owner-firstname-help help-block hidden">
								<strong></strong>
							</span>
						</span>

						<span class='middlenames'>
							<div class='input-group'>
								<span class='input-group-addon label-title'>Middle Name</span>
								<input type='text' id='owner-middlename' class='form-control' placeholder='Alonso' name='owner-middlename'/>
							</div>
							<span class="owner-middlename-help help-block hidden">
								<strong></strong>
							</span>
						</span>

						<span class='lastnames'>
						<div class='input-group'>
							<span class='input-group-addon label-title'>Last Name</span>
							<input type='text' id='owner-lastname' class='form-control' placeholder='Realonda' name='owner-lastname'/>
						</div>	
						<span class="owner-lastname-help help-block hidden">
							<strong></strong>
						</span>
						</span>

						<span class='nicknames'>
						<div class='input-group'>
							<span class='input-group-addon label-title'>Nickname</span>
							<input type='text' id='owner-nickname' class='form-control' placeholder='Realonda' name='owner-nickname'/>
						</div>	
						<span class="owner-nickname-help help-block hidden">
							<strong></strong>
						</span>
						</span>

						<span class='localities'>
						<div class='input-group'>
							<span class='input-group-addon label-title'>Locality</span>
							<input type='text' id='local' class='form-control' placeholder='Mandurriao, Iloilo City' name='local'/>
						</div>	
						<span class="local-help help-block hidden">
							<strong></strong>
						</span>
						</span>						
					</div>			

					<h4>Physical Description</h4>
					<div class='table-responsive measure-div edit-table hidden'>
						<table class='table table-bordered table-striped tables table-measure'>
							<thead>
								<tr>
									<th>Length</th>
									<th>Width</th>
									<th>Unit</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class='td-length'></td>
									<td class='td-width'></td>
									<td class='td-unit'></td>
								</tr>
							</tbody>
						</table>
					</div>					
					<div class='input-group form-group measurement-radio inputfields'>
						<label class='radio-inline'>
							<input type='radio' class='measurement' id='meter' name='unit' value="m" />Meter
						</label>
						<label class='radio-inline'>
							<input type='radio' class='measurement' id='centimeter' name='unit' value="cm" />Centimeter
						</label>
						<label class='radio-inline'>
							<input type='radio' class='measurement' id='millimeter' name='unit' value="mm" />Millimeter
						</label>
						<span class="measure-status-help help-block {{$errors->has('unit') ? '' :  'hidden' }}">
							<strong></strong>
						</span>											
					</div>
					<div class='inputfields'>
						<div class='input-group'>
							<span class='input-group-addon label-title'>Length</span>
							<input type='number' step='any' id='length' class='form-control' placeholder='10' name='length' value="{{ old('length') }}" />						
						</div>

						<span class="length-help help-block {{$errors->has('length') ? '' :  'hidden' }}">
							<strong>@if ($errors->has('length')) {{ $errors->first('length') }} @endif</strong>
						</span>

						<div class='input-group'>
							<span class='input-group-addon label-title'>Width</span>
							<input type='number' step='any' id='width' class='form-control' placeholder='10' name='width' value="{{ old('width') }}" />						
						</div>

						<span class="width-help help-block {{$errors->has('width') ? '' :  'hidden' }}">
							<strong>@if ($errors->has('width')) {{ $errors->first('width') }} @endif</strong>
						</span>						
					</div>
					<div class='input-group'>
						<span class='input-group-addon label-title'>Condition</span>
						<textarea id='condition' class='form-control' placeholder='A mountain view.' name='condition' rows='4' value="{{ old('condition') }}"></textarea>					
					</div>

					<span class="condition-help help-block {{$errors->has('condition') ? '' :  'hidden' }}">
						<strong>@if ($errors->has('condition')) {{ $errors->first('condition') }} @endif</strong>
					</span>

					<div class='table-responsive materials-table edit-table hidden'>
						<h4>Materials</h4>
						<table class='table table-bordered table-striped tables'>
							<tbody class='table-materials deleteRows'>

							</tbody>
						</table>
					</div>				
					
					<div class='material-new inputfields'>
					<div class='input-group'>
						<span class='input-group-addon label-title'>Material</span>
						<input type='text' id='material' class='form-control' placeholder='wood' name='material' value="{{ old('material') }}" />
						<input type='hidden' name='materials' id='materials'/>				
						<div class='input-group-btn'>
							<button type='button' class='btn btn-secondary' id='add-materials'>
								<span class='glyphicon glyphicon-plus'></span>
							</button>
						</div>						
					</div>
					<span class="material-help help-block hidden">
						<strong></strong>
					</span>						
					</div>
					<span class='materials inputfields'></span>																				

					<div class='table-responsive colors-table edit-table hidden'>
						<h4>Colors</h4>
						<table class='table table-bordered table-striped tables'>
							<tbody class='table-colors deleteRows'>

							</tbody>
						</table>
					</div>	

					<div class='color-new inputfields'>
					<div class='input-group'>
						<span class='input-group-addon label-title'>Color</span>
						<input type='text' id='color' class='form-control' placeholder='blue' name='color' value="{{ old('color') }}" />
						<input type='hidden' name='colors' id='colors'/>	
						<div class='input-group-btn'>
							<button type='button' class='btn btn-secondary' id='add-color'>
								<span class='glyphicon glyphicon-plus'></span>
							</button>
						</div>						
					</div>
					<span class="color-help help-block hidden">
						<strong></strong>
					</span>						
					</div>
					<span class='colorss inputfields'></span>

					<div class='table-responsive decorations-table edit-table hidden'>
						<h4>Decorations</h4>
						<table class='table table-bordered table-striped tables'>
							<tbody class='table-decorations deleteRows'>

							</tbody>
						</table>
					</div>	

					<div class='decoration-new inputfields'>
					<div class='input-group'>
						<span class='input-group-addon label-title'>Special Decorations</span>
						<input type='text' id='decoration' class='form-control' placeholder='scratches' name='decoration' value="{{ old('decoration') }}" />
						<input type='hidden' name='decorations' id='decorations'/>	
						<div class='input-group-btn'>
							<button type='button' class='btn btn-secondary' id='add-decoration'>
								<span class='glyphicon glyphicon-plus'></span>
							</button>
						</div>						
					</div>
					<span class="decoration-help help-block hidden">
						<strong></strong>
					</span>						
					</div>
					<span class='decorationsss inputfields'></span>

					<div class='table-responsive marks-table edit-table hidden'>
						<h4>Marks</h4>
						<table class='table table-bordered table-striped tables'>
							<tbody class='table-marks deleteRows'>

							</tbody>
						</table>
					</div>	

					<div class='mark-new inputfields'>
					<div class='input-group'>
						<span class='input-group-addon label-title'>Special Marks</span>
						<input type='text' id='mark' class='form-control' placeholder='carving' name='mark' value="{{ old('mark') }}" />
						<input type='hidden' name='marks' id='marks'/>				
						<div class='input-group-btn'>
							<button type='button' class='btn btn-secondary' id='add-mark'>
								<span class='glyphicon glyphicon-plus'></span>
							</button>
						</div>						
					</div>
					<span class="mark-help help-block hidden">
						<strong></strong>
					</span>						
					</div>
					<span class='marksss inputfields'></span>													

					@if(Auth::user()->type != "user")
					<div class='acquisition-field inputfields'>
					<h4>Acquisition</h4>
					<div class='form-group acquisition-radio'>
						<div class='input-group'>
							<label class='radio-inline'>
								<input type='radio' class='inventory-acquisition-mode donated' name='acquisition-mode' value="{{ old('acquisition-mode') }}" />Donated
							</label>
							<label class='radio-inline'>
								<input type='radio' class='inventory-acquisition-mode purchased' name='acquisition-mode' value="{{ old('acquisition-mode') }}" />Purchased
							</label>
						</div>

						<span class="inventory-acquisition-mode-help help-block hidden">
							<strong></strong>
						</span>						
					</div>
					</div>
					<div class='table-responsive donors-div hidden'>
						<h4>Donor Details</h4>
						<table class='table table-bordered table-striped tables table-donors'>
							<thead>
								<tr>
									<th>Donor</th>
									<th>Year donated</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class='td-donor'></td>
									<td class='td-date'></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class='form-group donated-div inputfields hidden'>
						<h4>Donor Details</h4>
						<div class='input-group'>
							<span class='input-group-addon label-title'>First Name</span>
							<input type='text' id='donor-firstname' class='form-control' placeholder='Francis' name='donor-firstname' value="{{ old('donor-firstname') }}" />						
						</div>
						<span class="donor-first-name-help help-block hidden">
							<strong></strong>
						</span>					
						<div class='input-group'>
							<span class='input-group-addon label-title'>Middle Name</span>
							<input type='text' id='donor-middlename' class='form-control' placeholder='Wundt' name='donor-middlename' value="{{ old('donor-middlename') }}" />						
						</div>
						<span class="donor-middle-name-help help-block hidden">
							<strong></strong>
						</span>					
						<div class='input-group'>
							<span class='input-group-addon label-title'>Last Name</span>
							<input type='text' id='donor-lastname' class='form-control' placeholder='Wertheimer' name='donor-lastname' value="{{ old('donor-lastname') }}" />						
						</div>	
						<span class="donor-last-name-help help-block hidden">
							<strong></strong>
						</span>					
						<div class='input-group'>
							<span class='input-group-addon label-title'>Date</span>
							<input type='date' id='donated-date' class='form-control' placeholder='2003' name='donated-date' value="{{ old('donated-date') }}" />
						</div>
						<span class="donor-date-help help-block hidden">
							<strong></strong>
						</span>																		
					</div>

					<div class='table-responsive purchases-div hidden'>
						<h4>Purchased Details</h4>
						<table class='table table-bordered table-striped tables table-purchases'>
							<thead>
								<tr>
									<th>Amount</th>
									<th>Address</th>
									<th>Date</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class='td-amount'></td>
									<td class='td-pur-address'></td>
									<td class='td-pur-date'></td>
								</tr>
							</tbody>
						</table>
					</div>

					<div class='form-group purchased-div inputfields hidden'>
						<h4>Purchased Details</h4>
						<div class='input-group'>
							<span class='input-group-addon label-title'>Amount</span>
							<input type='text' id='amount' class='form-control' placeholder='1000' name='amount' value="{{ old('amount') }}" />	
							<span class='input-group-addon'>&#8369;</span>				
						</div>
						@if ($errors->has('amount'))
						    <span class="help-block">
						        <strong>{{ $errors->first('amount') }}</strong>
						    </span>
						@endif						
						<span class="amount-help help-block hidden">
							<strong></strong>
						</span>										
						<div class='input-group'>
							<span class='input-group-addon label-title'>Address</span>
							<input type='text' id='address' class='form-control' placeholder='National Book Store' name='address' value="{{ old('address') }}" />						
						</div>	
						<span class="purchased-address-help help-block hidden">
							<strong></strong>
						</span>
						<div class='input-group'>
							<span class='input-group-addon label-title'>Date</span>
							<input type='date' id='purchased-date' class='form-control' placeholder='2010' name='purchased-date' value="{{ old('purchased-date') }}" />						
						</div>	
						<span class="purchased-date-help help-block hidden">
							<strong></strong>
						</span>												
					</div>
					<h4 id='image-header'>Image Upload</h4>
					<div class='form-group image-group inputfields'>
						<div class="input-group">
                					<label class="input-group-btn">
                    					<span class="btn btn-success">Browse&hellip; <input type="file" name='pic' id='image-upload' style="display: none;"/></span>
                    					<input type='hidden' name='picname' id='picname'/>
                					</label>
                					<input type="text" class="form-control file-name" value='Click the browse button to select pictures...' readonly>
                					<label class="input-group-btn">
                    					<span class="btn btn-danger remove-picture">Remove</span>
                					</label>                				
            				</div>
					</div>
					<div class='image-preview'></div>
					@endif			
				</div>
				<div class='modal-footer'>
					<div class='material-buttons'>
						<button type='button' class='btn btn-default view-invent-button-close inventory-close hidden' aria-label='Close'>Close</button>
						<button type='reset' id='inventory-reset' class='inventory-reset btn btn-danger invent-button'>Reset</button>
						<button type='submit' id='inventory-submit' class='btn btn-success invent-button'>Add</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<div class='modal fade extension-modal' role='dialog' data-keyboard='false' data-backdrop='static'>
	<div class='modal-dialog'>
		<div class='modal-content'>
			<div class="modal-body">
			  	<p class='invalid-format'></p>
			</div>
			<div class="modal-footer">
				<button type="button" data-dismiss="modal" id='extension-close' class="btn btn-default">Close</button>
			</div>
		</div>
	</div>
</div>

<div class='modal fade' id='delete-confirm-modal' role='dialog' data-keyboard='false' data-backdrop='static'>
	<div class='modal-dialog'>
		<div class='modal-content'>
			<div class='modal-header'>
				<h3>Delete Inventory</h3>
			</div>
			<div class="modal-body">
			  	<p class='p-delete-invent'></p>
			</div>
			<div class="modal-footer">
				<button type="button" data-dismiss="modal" class="btn btn-default" id='delete-close'>Close</button>
				<button type="button" class="btn btn-danger" id='inventory-confirm-delete'>Delete</button>
			</div>
		</div>
	</div>
</div>

<div class='modal fade' id='cancel-confirm-modal' role='dialog' data-keyboard='false' data-backdrop='static'>
	<div class='modal-dialog'>
		<div class='modal-content'>
			<div class='modal-header'>
				<h3>Cancel Edit Inventory</h3>
			</div>
			<div class="modal-body">
			  	<p>Please click the ok button to cancel editing inventory.</p>
			</div>
			<div class="modal-footer">
				<button type="button" data-dismiss="modal" class="btn btn-default" id='cancel-close'>Cancel</button>
				<button type="button" class="btn btn-danger confirm-modal" id='inventory-confirm-cancel'>Ok</button>
			</div>
		</div>
	</div>
</div>

<div class='modal fade' id='cancel-add-modal' role='dialog' data-keyboard='false' data-backdrop='static'>
	<div class='modal-dialog'>
		<div class='modal-content'>
			<div class='modal-header'>
				<h3>Cancel Add Inventory</h3>
			</div>
			<div class="modal-body">
			  	<p>Please click the ok button to cancel adding inventory.</p>
			</div>
			<div class="modal-footer">
				<button type="button" data-dismiss="modal" class="btn btn-default" id='cancel-add-close'>Cancel</button>
				<button type="button" class="btn btn-danger confirm-modal" id='cancel-add-confirm'>Ok</button>
			</div>
		</div>
	</div>
</div>

<div class='modal fade' id='confirm-add-modal' role='dialog' data-keyboard='false' data-backdrop='static'>
	<div class='modal-dialog modal-lg'>
		<div class='modal-content'>
			<div class='modal-header'>
				<h3>Confirm Inventory</h3>
			</div>
			<div class="modal-body">
				<div class='row'>
					<div class='col-md-6'>
						<h4 class='text-center'>Details</h4>
						<p>Category: <span class='con-category'></span></p>
						<p>Accession Number: <span class='con-acq'></span></p>
						<p>Location: <span class='con-location'></span></p>
						<p>English Names: <span class='con-eng'></span></p>
						<p>Venacular Names: <span class='con-ven'></span></p>					
					</div>
					<div class='col-md-6'>
						<h4 class='text-center'>Owner</h4>
						<p>Full Name: <span class='con-fullname'></span></p>
						<p>Nickname: <span class='con-nickname'></span></p>
						<p>Locality: <span class='con-local'></span></p>
					</div>	
				</div>
				<div class='row'>
					<div class='col-md-6'>
						<h4 class='text-center'>Physical Descriptions</h4>
						<p>Length: <span class='con-length'></span></p>
						<p>Width: <span class='con-width'></span></p>
						<p>Condition: <span class='con-condition'></span></p>
						<p>Materials: <span class='con-material'></span></p>
						<p>Colors: <span class='con-color'></span></p>
						<p>Decorations: <span class='con-decoration'></span></p>
						<p>Marks: <span class='con-mark'></span></p>					
					</div>	
					<div class='col-md-6'>
						<h4 class='text-center'>Acquisition</h4>
						<span class='confirm-donors hidden'>
							<p>Donor: <span class='con-donor'></span></p>
							<p>Date Donated: <span class='con-date-donated'></span></p>
						</span>
						<span class='confirm-purchased hidden'>
							<p>Amount: <span class='con-amount'></span></p>
							<p>Date Purchased: <span class='con-pur-date'></span></p>
							<p>Purchased Address: <span class='con-pur-address'></span></p>
						</span>
					</div>	
				</div>
				<div class='row'>
					<div class='col-md-12'>
						<h4 class='image-confirm-upload text-center'>Image Upload</h4>
						<div class='image-preview'></div>
					</div>
				</div>																			  	
			</div>
			<div class="modal-footer">
				<button type="button" data-dismiss="modal" class="btn btn-default" id='confirm-cancel'>Cancel</button>
				<button type="button" class="btn btn-success" id='confirm-submit'>Add</button>
			</div>
		</div>
	</div>
</div>