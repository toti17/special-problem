<div class='modal fade' id='material-modal' role='dialog' data-keyboard='false' data-backdrop='static'>
	<div class='modal-dialog' role='document'>
		<div class='modal-content'>
			@if($errors->any())
			   @foreach ($errors->all() as $error)
			      <div>{{ $error }}</div>
			  @endforeach
			@endif
			<form class="material-form" role="form" method="POST" action="{{ url('/add/material') }}" enctype='multipart/form-data'>
				
				{{ csrf_field() }}
				<input type='hidden' value="{{Auth::user()->type}}" id='user-type'>
				<div class='modal-header'>
					<button type='button' class='close material-close' aria-label='Close'>
						<span aria-hidden='true'>&times;</span>
					</button>
					<button type='button' class='close edit-close hidden' aria-label='Close'>
						<span aria-hidden='true'>&times;</span>
					</button>					
					<h4 class='modal-title'>Add Material</h4>
				</div>
				<div class='modal-body'>
					<div>
					<h4>Details</h4>
					@if(Auth::user()->type == "admin" || Auth::user()->type == "staff")
					<button type='button' class='btn btn-info pull-right hidden edit-button' id='edit-button'>Edit</button>
					<button type='button' class='btn btn-warning pull-right cancel-edit hidden edit-button'>Cancel Edit</button>
					@elseif(Auth::user()->type == 'user')
					<div class='borrow-button-div tool-tip' data-toggle="tooltip" data-placement="top">
						<button type='button' class='btn btn-primary pull-right hidden borrow-button' id='borrow-button' @if(Auth::user()->status == 'unconfirmed') disabled @endif 
						>Borrow</button>
					</div>
					@endif
					</div>
					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon label-title">Category*</span>
							<select id='category' class='form-control' name='category'>
								<optgroup label='Vertical Files'>
									<option value='' selected disabled hidden>Choose Category</option>
									<option value ='Photocopied Articles'>Photocopied Articles</option>
									<option value ='Conference Papers'>Conference Papers</option>
									<option value ='Research Reports'>Research Reports</option>
								</optgroup>
								<optgroup label='Books'>
									<option value ='Private Collections'>Private Collections</option>
									<option value ='Rare Collections'>Rare Collections</option>
								</optgroup>
								<optgroup label='Thesis'>
									<option value ='Thesis'>Thesis</option>
								</optgroup>
								<optgroup label='Periodicals'>
									<option value ='Serials'>Serials</option>
									<option value ='Newspapers'>Newspapers</option>
									<option value ='Journals'>Journals</option>
									<option value ='Magazines'>Magazines</option>
								</optgroup>
								<optgroup label='Multimedia'>
									<option value ='Photographs'>Photographs</option>
									<option value ='Compact Discs'>Compact Discs</option>
									<option value ='Digital Versatile Discs'>Digital Versatile Discs</option>
									<option value ='Video Home Systems'>Video Home Systems</option>
									<option value ='Cassette Tapes'>Cassette Tapes</option>
								</optgroup>
							</select>
						</div>

						<span class="select-help help-block hidden">
							<strong></strong>
						</span>

						<div class='input-group'>
							<span class="input-group-addon label-title">Accession Number*</span>
							<input type='text' id='acqNumber' class='form-control' placeholder='B12345' name='acqNumber' value="{{ old('acqNumber') }}" />
						</div>


						<span class="acqNumber-help help-block {{$errors->has('acqNumber') ? '' :  'hidden' }}">
							<strong>@if ($errors->has('acqNumber')) {{ $errors->first('acqNumber') }} @endif</strong>
						</span>

						<div class='input-group'>
							<span class='input-group-addon label-title'>Title*</span>
							<textarea type='text' id='title' class='form-control' placeholder='The Life of Rizal' name='title' value="{{ old('title') }}"></textarea>
						</div>

						<span class="title-help help-block {{$errors->has('title') ? '' :  'hidden' }}">
							<strong>@if ($errors->has('acqNumber')) {{ $errors->first('acqNumber') }} @endif</strong>
						</span>

						<div class="input-group">
							<span class='input-group-addon label-title'>Location*</span>
							<input type='text' id='location' class='form-control' placeholder='Book shelf' name='location' value="{{ old('location') }}" />
						</div>
						<span class="location-help help-block hidden">
							<strong></strong>
						</span>									

						<div class='input-group'>
							<span class='input-group-addon label-title' id='description-field'>Description</span>
							<textarea id='description' class='form-control' placeholder='A mountain view.' name='description' rows='4' value="{{ old('description') }}"></textarea>
						</div>
						<span class="description-help help-block {{$errors->has('description') ? '' :  'hidden' }}">
							<strong>@if ($errors->has('description')) {{ $errors->first('description') }} @endif</strong>
						</span>						

						<div class='thesis hidden'>
							<div class='input-group'>
								<span class='input-group-addon label-title'>School*</span>
								<input type='text' id='school' class='form-control' placeholder='Assumption' name='school' value="{{ old('school') }}" />
							</div>
							<span class="school-help help-block hidden">
								<strong></strong>
							</span>							
							<div class='input-group'>
								<span class='input-group-addon label-title'>Course*</span>
								<input type='text' id='course' class='form-control' placeholder='Computer Science' name='course' value="{{ old('course') }}" />
							</div>
							<span class="course-help help-block hidden">
								<strong></strong>
							</span>
						</div>

						<div class='photograph hidden'>
							<div class='input-group'>
								<span class='input-group-addon label-title'>Size*</span>
								<input type='text' id='size' class='form-control' placeholder='100 x 100' name='size' value="{{ old('size') }}" />
								<div class='input-group-btn'>
									<button type='button' class='btn btn-default dropdown-toggle size-type' data-toggle='dropdown'>
										cm <span class='caret'></span>
									</button>
									<ul class='dropdown-menu size-dropdown'>
										<li>
											<a href="#">cm</a>
										</li>
										<li>
											<a href="#">mm</a>
										</li>									
										<li>
											<a href="#">m</a>
										</li>
									</ul>
								</div>
								<input type='hidden' id='size-type' name='size-type' value='cm'/>
							</div>
							<span class="size-help help-block hidden">
								<strong></strong>
							</span>							
							<div class='input-group'>
								<span class='input-group-addon label-title'>Year*</span>
								<input type='number' id='year' class='form-control' placeholder='2017' name='year' value="{{ old('year') }}" />
							</div>
							<span class="year-help help-block {{$errors->has('year') ? '' :  'hidden' }}">
								<strong>@if ($errors->has('year')) {{ $errors->first('year') }} @endif</strong>
							</span>							
						</div>
						
						<div class='multimedia hidden'>
							<div class='input-group'>
								<span class='input-group-addon label-title'>Duration*</span>
								<input type='number' id='hours' class='form-control' placeholder='30' name='hours' value="{{ old('hours') }}" />
								<span class='input-group-addon'>hour/s</span>	
								<input type='number' id='minutes' class='form-control' placeholder='30' name='minutes' value="{{ old('minutes') }}" />
								<span class='input-group-addon'>minute/s</span>
								<input type='number' id='seconds' class='form-control' placeholder='30' name='seconds' value="{{ old('seconds') }}" />
								<span class='input-group-addon'>second/s</span>					
							</div>
							<span class="duration-help help-block hidden">
								<strong></strong>
							</span>
							<span class="hour-help help-block hidden">
								<strong></strong>
							</span>
							<span class="minute-help help-block hidden">
								<strong></strong>
							</span>
							<span class="second-help help-block hidden">
								<strong></strong>
							</span>																																					
						</div>
					</div>

					<h4 class='author-photographer-director'>Authors</h4>

					<div class='table-responsive'>
						<table class='table table-bordered table-striped tables author-table'>
							<tbody class='table-authors'>

							</tbody>		
						</table>
					</div>

					<div class="form-group co-author">
						<span class='firstnames'>
						<div class='input-group'>
							<span class='input-group-addon label-title'>First Name*</span>
							<input type='text' id='author-firstname' class='form-control' placeholder='Ihra' name='author-firstname' />
						</div>

						<span class="author-firstname-help0 help-block hidden">
							<strong></strong>
						</span>
						</span>
						<span class='middlenames'>
						<div class='input-group'>
							<span class='input-group-addon label-title'>Middle Name</span>
							<input type='text' id='author-middlename' class='form-control' placeholder='Alonso' name='author-middlename' />
						</div>

						<span class="author-middlename-help0 help-block hidden">
							<strong></strong>
						</span>
						</span>
						<span class='lastnames'>
						<div class='input-group'>
							<span class='input-group-addon label-title'>Last Name*</span>
							<input type='text' id='author-lastname' class='form-control' placeholder='Realonda' name='author-lastname' />
						</div>	
						<span class="author-lastname-help0 help-block hidden">
							<strong></strong>
						</span>
						</span>
						<input type='hidden' name='authors' id='authors'/>
					</div>

					<div class='form-group add-co-author'>
						<button type='button' class='btn btn-success co-author-button' id='add-co-author-button'>Add Co Author</button>
					</div>

					<div class='add-producer hidden'>
						<div class='form-group'>
							<button type='button' class='btn btn-success co-author-button' id='add-producer-button'>Add Producer</button>
						</div>
						<input type='hidden' name='producers' id='producers'/>
						<h4>Producers</h4>
						<div class='table-responsive'>
							<table class='table table-bordered table-striped tables producer-table'>
								<tbody class='table-producers'>
									
								</tbody>
							</table>
						</div>
						<div class='prod-head'></div>
					</div>

					<div class='tags-div hidden'>
						<h4 class='tags-header'>Tags</h4>
						
						<div class='table-responsive'>
							<table class='table table-bordered table-striped tables'>
								<tbody class='table-tags'>
									
								</tbody>
							</table>
						</div>	
					</div>
					
					<div class='form-group tag'>
						<h4>Tags</h4>
						<div class='input-group'>
							<span class='input-group-addon label-title'>Tag</span>
							<input type='text' id='tag' class='form-control' placeholder='Computer Science' name='tag' value="{{ old('tag') }}" />
							<input type='hidden' name='tags' id='tags'/>				
							<div class='input-group-btn'>
								<button type='button' class='btn btn-secondary' id='add-tag'>
									<span class='glyphicon glyphicon-plus'></span>
								</button>
							</div>						
						</div>
						<span class="tag-help help-block hidden">
							<strong></strong>
						</span>
						<span class='tags'></span>																
					</div>


					<div class='publisher-field'>
					<h4>Publisher</h4>

					<div class='form-group publish-radio'>
						<div class='input-group'>
							    <label class="radio-inline">
									<input type="radio" class='publish-status published' name="publish-status"/>Published
							    </label>
							    <label class="radio-inline">
									<input type="radio" class='publish-status unpublished' name="publish-status"/>Unpublished
							    </label>			    
						</div>
						<span class="publish-status-help help-block">
							<strong></strong>
						</span>
					</div>
					<div class="form-group published-div {{ old('publish-status') == 'published' ? '' : 'hidden' }}">
						<div class='input-group'>
							<span class='input-group-addon label-title'>Publisher*</span>
							<input type='text' id='publisher' class='form-control' placeholder='Ubisoft' name='publisher' value="{{ old('publisher') }}" />						
						</div>
						<span class="pub-help help-block hidden">
							<strong></strong>
						</span>						
						<div class='input-group'>
							<span class='input-group-addon label-title'>Year*</span>
							<input type='number' id='published-year' class='form-control' placeholder='2003' name='published-year' value="{{ old('published-year') }}" />						
						</div>
						<span class="pub-year-help help-block hidden">
							<strong></strong>
						</span>					
						<div class='input-group'>
							<span class='input-group-addon label-title'>Place*</span>
							<input type='text' id='place' class='form-control' placeholder='Iloilo, Philippines' name='place' value="{{ old('place') }}" />						
						</div>
						<span class="place-help help-block hidden">
							<strong></strong>
						</span>													
					</div>
					</div>
					@if(Auth::user()->type != "user")


					<div class='donors hidden'>
						<h4>Donors</h4>
						<div class='table-responsive'>
							<table class='table table-bordered table-striped tables table-donors'>
								<thead>
									<tr>
										<th>Donor</th>
										<th>Copies</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody class='tbody-donors'>
								</tbody>
							</table>						
						</div>
					</div>

					<div class='purchases hidden'>
						<h4>Purchases</h4>
						<div class='table-responsive'>
							<table class='table table-bordered table-striped tables table-purchases'>
								<thead>
									<tr>
										<th>Amount</th>
										<th>Copies</th>
										<th>Date</th>
										<th>Address</th>
									</tr>
								</thead>
								<tbody class='tbody-purchases'>
								</tbody>
							</table>						
						</div>
					</div>


					<div class='acquisition-div'>
						<div class='form-group'>
							<h4>Acquisition Details</h4>
						</div>

						<span class="acquisition-details-help help-block hidden">
							<strong></strong>
						</span>					

						<input type='hidden' name='copy' id='copies'/>

						<div class='form-group add-donor'>
							<button type='button' class='btn btn-success co-author-button' id='add-donor-button'>Add Donor/s</button>
							<input type='hidden' name='donorCopies' id='donorCopies'/>
							<input type='hidden' name='donors' id='donors'/>
							<input type='hidden' name='donorDates' id='donorDates'/>
						</div>	

						<div class='form-group add-purchased'>
							<button type='button' class='btn btn-success co-author-button' id='add-purchased-button'>Add Purchased Details</button>
							<input type='hidden' name='purchasedCopies' id='purchasedCopies'/>
							<input type='hidden' name='purchasedAmount' id='purchasedAmount'/>
							<input type='hidden' name='purchasedDate' id='purchasedDate'/>
							<input type='hidden' name='purchasedAddress' id='purchasedAddress'/>
						</div>	
					</div>

					<h4 id='image-header' class='hidden'>Image Upload</h4>
					<div class='form-group image-group hidden'>
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
					<div class='image-preview hidden'></div>					
					@endif
				</div>
				<div class='modal-footer'>
					@if(Auth::user()->type == 'admin' || Auth::user()->type == 'staff') <p class='pull-left modified'><i>Last modified by: <span class='username'></span></i></p>@endif
					<div class='clearfix'></div>					
					<div class='material-buttons'>
						<button type="button" data-dismiss="modal" class="view-close btn btn-info">Close</button>
						<button type='button' class="btn btn-default material-close @if (Auth::user()->type == 'user') pull-right @else pull-left @endif " aria-label='Close'>Close</button>
						<button type='reset' id='material-reset' class='btn btn-danger'>Reset</button>
						<button type='submit' id='material-submit' class='btn btn-success'>Add</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<div class='modal fade' id='edit-confirm-modal' role='dialog' data-keyboard='false' data-backdrop='static'>
	<div class='modal-dialog'>
		<div class='modal-content'>
			<div class='modal-header'>
				<h3>Cancel Edit Material</h3>
			</div>
			<div class="modal-body">
			  	<p>Please click the ok button to cancel editing material.</p>
			</div>
			<div class="modal-footer">
				<button type="button" data-dismiss="modal" class="btn btn-default" id='edit-confirm-close'>Cancel</button>
				<button type="button" class="btn btn-danger confirm-modal" id='edit-confirm-cancel'>Ok</button>
			</div>
		</div>
	</div>
</div>

<div class='modal fade' id='add-confirm-modal' role='dialog' data-keyboard='false' data-backdrop='static'>
	<div class='modal-dialog'>
		<div class='modal-content'>
			<div class='modal-header'>
				<h3>Cancel Add</h3>
			</div>
			<div class="modal-body">
			  	<p>Please click the ok button to cancel adding material.</p>
			</div>
			<div class="modal-footer">
				<button type="button" data-dismiss="modal" class="btn btn-default" id='add-close'>Cancel</button>
				<button type="button" class="btn btn-danger" id='material-cancel-add'>Ok</button>
			</div>
		</div>
	</div>
</div>

<div class='modal fade' id='delete-confirm-modal' role='dialog' data-keyboard='false' data-backdrop='static'>
	<div class='modal-dialog'>
		<div class='modal-content'>
			<div class='modal-header'>
				<h3>Delete Material</h3>
			</div>
			<div class="modal-body">
			  	<p class='p-delete-invent'></p>
			</div>
			<div class="modal-footer">
				<button type="button" data-dismiss="modal" class="btn btn-default" id='delete-close'>Cancel</button>
				<button type="button" class="btn btn-danger" id='material-confirm-delete'>Delete</button>
			</div>
		</div>
	</div>
</div>

<div class='modal fade' id='confirm-add-modal' role='dialog' data-keyboard='false' data-backdrop='static'>
	<div class='modal-dialog modal-lg'>
		<div class='modal-content'>
			<div class='modal-header'>
				<h3>Confirm Material</h3>
			</div>
			<div class="modal-body">
				<div class='row'>
					<div class='col-md-6'>
						<h4 class='text-center'>Details</h4>
						<hr/>
						<p>Category: <span class='con-category'></span></p>
						<p>Accession Number: <span class='con-acq'></span></p>
						<p>Title: <span class='con-title'></span></p>
						<p>Location: <span class='con-location'></span></p>
						<p>Total Copies : <span class='con-count'></span></p>
						<p class='description-div hidden'>Description: <span class='con-description'></span></p>
						<span class='con-thesis hidden'>
							<p>School: <span class='con-school'></span></p>
							<p>Course: <span class='con-course'></span></p>
						</span>
						<span class='con-photographs hidden'>
							<p>Size: <span class='con-pic-size'></span></p>
							<p>Year Taken: <span class='con-pic-year'></span></p>
						</span>
						<span class='con-multimedia hidden'>
							<p>Duration: <span class='con-duration'></span></p>
						</span>
					</div>
					<div class='col-md-6'>
						<h4 class='text-center person'>Authors</h4>
						<hr/>
						<p>Full Name: <span class='con-fullname'></span></p>
					</div>
					<div class='col-md-4 prod-div hidden'>
						<h4>Producers</h4>
						<hr/>
						<p>Full Name: <span class='con-prod-fullname'></span></p>
					</div>
				</div>
				<div class='row'>
					<div class='col-md-6'>
						<h4 class='text-center'>Publish Details</h4>
						<hr/>
						<p>Publish Status: <span class='con-pub-status'></span></p>	
						<span class='published-span hidden'>			
							<p>Publisher: <span class='con-pub-fullname'></span></p>
							<p>Year Published: <span class='con-pub-year'></span></p>
							<p>Place Published: <span class='con-pub-place'></span></p>
						</span>
					</div>
					<div class='col-md-6'>
						<span class='confirm-donors hidden'>
							<h4 class='text-center'>Donor/s</h4>
							<hr/>
						</span>
						<span class='confirm-purchased hidden'>
							<h4 class='text-center'>Purchase/s</h4>
							<hr/>
						</span>
					</div>							
				</div>
				<div class='row'>
					<div class='col-md-6 con-tags hidden'>
						<h4 class='text-center'>Tags</h4>
						<hr/>
						<p>Tags: <span class='con-tag'></span></p>				
					</div>
				</div>
				<div class='row image-div hidden'>
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

<div class='modal fade' id="report-modal" role='dialog' data-keyboard='false' data-backdrop='static'>
	<div class='modal-dialog modal-lg'>
		<div class='modal-content'>
			<div class='modal-header'>
				<button type='button' class='close' data-dismiss='modal' aria-label='Close'>
					<span aria-hidden='true'>&times;</span>
				</button>				
				<h3>Monthly Report</h3>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-lg-12">
						<div class="form-group month-form-group">
							<div class="input-group">
								<div class="input-group-btn">
									<div class="dropdown">
										<button class="btn btn-default dropdown-toggle" type="button" id="month" data-toggle="dropdown" value="month">MONTH <span class='caret'></span></button>
										<ul class="dropdown-menu month-dropdown">
											<li><a href="#">JANUARY</a></li>
											<li><a href="#">FEBRUARY</a></li>
											<li><a href="#">MARCH</a></li>
											<li><a href="#">APRIL</a></li>
											<li><a href="#">MAY</a></li>
											<li><a href="#">JUNE</a></li>
											<li><a href="#">JULY</a></li>
											<li><a href="#">AUGUST</a></li>
											<li><a href="#">SEPTEMBER</a></li>
											<li><a href="#">OCTOBER</a></li>
											<li><a href="#">NOVEMBER</a></li>
											<li><a href="#">DECEMBER</a></li>
										</ul>
									</div>
								</div>
								<input type="number" class="form-control year-generate-field" placeholder="2017"/>
								<span class="glyphicon glyphicon-remove form-control-feedback year-feedback hidden" aria-hidden="true"></span>
								<span class="input-group-btn">
									<button type="button" class="btn btn-success generate-button">Generate</button>
								</span>
							</div>
							<span id="helpBlock" class="help-block text-center hidden"><b>Invalid format of year field.</b></span>
						</div>
					</div>
					<div class="generate-details hidden">
						<div class='col-lg-6'>
							<br/>
							<h4 class="text-center">Most Borrowed</h4>
						</div>
						<div class='col-lg-6'>
							<br/>
							<h4 class="text-center">Most Viewed</h4>
						</div>
						<div class="row">
							<div class='col-lg-6'>
								<div class="table-responsive results-table">
									<table class='table table-bordered'>
										<tbody class='borrowed-materials'>

										</tbody>		
									</table>
								</div>
							</div>
							<div class='col-lg-6'>
								<div class="table-responsive results-table">
									<table class='table table-bordered table-striped'>
										<tbody class='viewed-materials'>

										</tbody>		
									</table>
								</div>								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>