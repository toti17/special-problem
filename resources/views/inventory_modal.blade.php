<div class='modal fade' id='inventory-modal' role='dialog' data-keyboard='false' data-backdrop='static'>
	<div class='modal-dialog' role='document'>
		<div class='modal-content inventory-content'>
			@if($errors->any())
			   @foreach ($errors->all() as $error)
			      <div>{{ $error }}</div>
			  @endforeach
			@endif
			<form class="material-form" role="form" method="POST" action="{{ url('/add/inventory') }}" enctype='multipart/form-data'>
				{{ csrf_field() }}
				<input type='hidden' value='available' name='material-status'/>
				<div class='modal-header'>
					<button type='button' class='close material-close' data-dismiss='modal' aria-label='Close'>
						<span aria-hidden='true'>&times;</span>
					</button>
					<h4 class='modal-title'>Add Inventory</h4>
				</div>
				<div class='modal-body'>
					<div id="dialog" class='hidden' title="Basic dialog">
						<p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the 'x' icon.</p>
					</div>
					<div>
						<h4>Details</h4>
						@if(Auth::user()->type == "admin" || Auth::user()->type == "staff")
						<button type='button' class='btn btn-default pull-right hidden edit-button' id='edit-button'>Edit</button>
						@elseif(Auth::user()->type == 'student')
						<div class='tool-tip' data-toggle="tooltip" data-placement="top">
							<button type='button' class='btn btn-default pull-right hidden borrow-button' id='borrow-button'>Borrow</button>
						</div>
						@endif
						<button type='button' class='btn btn-default pull-right cancel-edit hidden edit-button'>Cancel Edit</button>
					</div>
					<div class="form-group">
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

						<div class='english-name-new'>
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
						<span class='english-name'></span>	

						<div class='venacular-name-new'>
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
						<span class='venacular-name'></span>	
											
					</div>

					<h4 class='owner-header'>Owner</h4>

					<table class='table table-bordered table-striped tables owner-table hidden'>
						<tbody class='table-owner'>

						</tbody>		
					</table>

					<div class="form-group owner">
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
					<div class='input-group form-group measurement-radio'>
						<label class='radio-inline'>
							<input type='radio' class='measurement' name='unit' value="m" />Meter
						</label>
						<label class='radio-inline'>
							<input type='radio' class='measurement' name='unit' value="cm" />Centimeter
						</label>
						<label class='radio-inline'>
							<input type='radio' class='measurement' name='unit' value="mm" />Millimeter
						</label>
						<span class="measure-status-help help-block {{$errors->has('unit') ? '' :  'hidden' }}">
							<strong></strong>
						</span>											
					</div>	
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

					<div class='input-group'>
						<span class='input-group-addon label-title'>Condition</span>
						<textarea id='condition' class='form-control' placeholder='A mountain view.' name='condition' rows='4' value="{{ old('condition') }}"></textarea>					
					</div>

					<span class="condition-help help-block {{$errors->has('condition') ? '' :  'hidden' }}">
						<strong>@if ($errors->has('condition')) {{ $errors->first('condition') }} @endif</strong>
					</span>

					<table class='table table-bordered table-striped tables hidden'>
						<tbody class='table-materials'>
							
						</tbody>
					</table>					
					
					<div class='material-new'>
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
					<span class='materials'></span>															

					<div class='color-new'>
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
					<span class='colorss'></span>

					<div class='decoration-new'>
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
					<span class='decorationsss'></span>

					<div class='mark-new'>
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
					<span class='marksss'></span>													

					@if(Auth::user()->type != "student")
					<div class='acquisition-field'>
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
					<table class='table table-bordered table-striped tables table-donors hidden'>
						<thead>
							<tr>
								<th>Donor</th>
								<th>Year donated</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class='td-donor'></td>
								<td class='td-year'></td>
							</tr>
						</tbody>
					</table>
					<div class='form-group donated-div hidden'>
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

					<div class='form-group purchased-div hidden'>
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
					<h4>Image Upload</h4>
					<div class='form-group image-group'>
						<div class="input-group">
                					<label class="input-group-btn">
                    					<span class="btn btn-success">Browse&hellip; <input type="file" name='pic' id='image-upload' style="display: none;"/></span>
                					</label>
                					<input type="text" class="form-control file-name" value='Click the browse button to select pictures...' readonly>
                					<label class="input-group-btn">
                    					<span class="btn btn-danger remove-picture">Remove</span>
                					</label>                				
            				</div>
					</div>
					<div id='image-preview'></div>
					@endif			
				</div>
				<div class='modal-footer'>
					<div class='material-buttons'>
						<button type='button' class='btn btn-default view-button-close hidden' data-dismiss='modal' aria-label='Close'>Close</button>
						<button type='reset' id='material-reset' class='inventory-reset btn btn-danger'>Reset</button>
						<button type='submit' id='inventory-submit' class='btn btn-success'>Add</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<div class='modal fade extension-modal' id='static' role='dialog' data-keyboard='false' data-backdrop='static'>
	<div class='modal-dialog'>
		<div class='modal-content'>
			<div class="modal-body">
			  	<p>Please choose an image format. (e.g. JPEG, JPG, PNG, GIF)</p>
			</div>
			<div class="modal-footer">
				<button type="button" data-dismiss="modal" id='extension-close' class="btn btn-default">Close</button>
			</div>
		</div>
	</div>
</div>