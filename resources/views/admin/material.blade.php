@extends('dashboard')
@section('material')



<div class='col-md-6'>
	<button id="add-material-button" type="button" class="btn btn-default" data-toggle='modal' data-target='#material-modal'>Add Material</button>
</div>

@if(session('status'))
<div class="col-md-6 alert alert-success">
   {{ session('status') }}
    <button type="button" class="close" aria-label="Close" data-dismiss='alert'>
        <span aria-hidden="true">&times;</span>
    </button>
</div>
@endif

@if($errors->any())
<script>
	$(function() {
	    $('#material-modal').modal('show');
	});
</script>
@endif

<div class='col-md-6 col-md-offset-3'>
	<table class="table table-condensed table-hover">
		<thead>
			<tr>
				<th class='text-left'>Title</th>
				<th class='text-right'>Action</th>
			</tr>
		</thead>
		<tbody class='text-center'>
			@foreach ($materials as $material)
			<tr>
				<td class='material-view-button text-left' type ='button' data-toggle='modal' data-target='#material-modal'>
					<input type='hidden' value="{{$material->acqNumber}}" name='material-acqNumber'/>
					{{ $material->title }}
				</td>
				<td class='text-right action-buttons'>
					<button type='button' class='btn btn-xs btn-warning edit-glyphicon'><span class='glyphicon glyphicon-edit'></span>
					<button type='button' class='btn btn-xs btn-danger'><span class='glyphicon glyphicon-remove'></span>
				</td>
			</tr>
			@endforeach
		</tbody>
	</table>
</div>

<div class='modal fade' id='material-modal' role='dialog' data-keyboard='false' data-backdrop='static'>
	<div class='modal-dialog' role='document'>
		<div class='modal-content'>
			<form class="material-form" role="form" method="POST" action="{{ url('/add/material') }}">
				{{ csrf_field() }}
				<input type='hidden' value='available' name='material-status'/>
				<div class='modal-header'>
					<button type='button' class='close material-close' data-dismiss='modal' aria-label='Close'>
						<span aria-hidden='true'>&times;</span>
					</button>
					<h4 class='modal-title'>Add Material</h4>
				</div>
				<div class='modal-body'>
					<div>
					<h4>Details</h4><button type='button' class='btn btn-default pull-right hidden' id='edit-button'>Edit</button>
					</div>
					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon label-title">Category</span>
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
							<span class="input-group-addon label-title">Accession Number</span>
							<input type='text' id='acqNumber' class='form-control' placeholder='B12345' name='acqNumber' value="{{ old('acqNumber') }}" />
						</div>


						<span class="acqNumber-help help-block {{$errors->has('acqNumber') ? '' :  'hidden' }}">
							<strong>@if ($errors->has('acqNumber')) {{ $errors->first('acqNumber') }} @endif</strong>
						</span>

						<div class='input-group'>
							<span class='input-group-addon label-title'>Title</span>
							<input type='text' id='title' class='form-control' placeholder='The Life of Rizal' name='title' value="{{ old('title') }}" />
						</div>

						<span class="title-help help-block {{$errors->has('title') ? '' :  'hidden' }}">
							<strong>@if ($errors->has('acqNumber')) {{ $errors->first('acqNumber') }} @endif</strong>
						</span>
						<div class='thesis hidden'>
							<div class='input-group'>
								<span class='input-group-addon label-title'>School</span>
								<input type='text' id='school' class='form-control' placeholder='Assumption' name='school' value="{{ old('school') }}" />
							</div>
							<span class="school-help help-block hidden">
								<strong></strong>
							</span>							
							<div class='input-group'>
								<span class='input-group-addon label-title'>Course</span>
								<input type='text' id='course' class='form-control' placeholder='Computer Science' name='course' value="{{ old('course') }}" />
							</div>
							<span class="course-help help-block hidden">
								<strong></strong>
							</span>
						</div>
						<div class='photograph hidden'>
							<div class='input-group'>
								<span class='input-group-addon label-title'>Size</span>
								<input type='text' id='size' class='form-control' placeholder='100' name='size' value="{{ old('size') }}" />
								<div class='input-group-btn'>
									<button type='button' class='btn btn-default dropdown-toggle size-type' data-toggle='dropdown'>
										MB <span class='caret'></span>
									</button>
									<ul class='dropdown-menu size-dropdown'>
										<li>
											<a href="#">KB</a>
										</li>
										<li>
											<a href="#">MB</a>
										</li>									
										<li>
											<a href="#">GB</a>
										</li>
									</ul>
								</div>
								<input type='hidden' id='size-type' name='size-type' value='MB'/>
							</div>
							<span class="size-help help-block hidden">
								<strong></strong>
							</span>							
							<div class='input-group'>
								<span class='input-group-addon label-title'>Year</span>
								<input type='number' id='year' class='form-control' placeholder='2017' name='year' value="{{ old('year') }}" />
							</div>
							<span class="year-help help-block {{$errors->has('year') ? '' :  'hidden' }}">
								<strong>@if ($errors->has('year')) {{ $errors->first('year') }} @endif</strong>
							</span>			
							<div class='input-group'>
								<span class='input-group-addon label-title'>Description</span>
								<textarea class='form-control' placeholder='A mountain view.' name='description' rows='4' value="{{ old('description') }}"></textarea>
							</div>
						</div>
						<div class='multimedia hidden'>
							<div class='input-group'>
								<span class='input-group-addon label-title'>Duration</span>
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

					<table class='table table-bordered table-striped tables'>
						<tbody class='table-authors'>

						</tbody>		
					</table>

					<div class="form-group co-author0">
						<div class='input-group'>
							<span class='input-group-addon label-title'>First Name</span>
							<input type='text' id='author-firstname0' class='form-control' placeholder='Jose' name='author-firstname0' />
						</div>

						<span class="author-firstname-help0 help-block hidden">
							<strong></strong>
						</span>			
						
						<div class='input-group'>
							<span class='input-group-addon label-title'>Middle Name</span>
							<input type='text' id='author-middlename0' class='form-control' placeholder='Alonso' name='author-middlename0' />
						</div>

						<span class="author-middlename-help0 help-block hidden">
							<strong></strong>
						</span>

						<div class='input-group'>
							<span class='input-group-addon label-title'>Last Name</span>
							<input type='text' id='author-lastname0' class='form-control' placeholder='Realonda' name='author-lastname0' />
						</div>	

						<input type='hidden' name='authors' id='authors'/>

						<span class="author-lastname-help0 help-block hidden">
							<strong></strong>
						</span>
					</div>

					<div class='form-group add-co-author'>
						<button type='button' class='btn btn-success co-author-button' id='add-co-author-button'>Add Co Author</button>
					</div>

					<div class='add-producer hidden'>
						<div class='form-group'>
							<button type='button' class='btn btn-success co-author-button' id='add-producer-button'>Add Producer</button>
						</div>
						<input type='hidden' name='producers' id='producers'/>
						<h4 class='prod-head'>Producer</h4>
					</div>
					<h4 class='tags-header'>Tags</h4>
					
					<table class='table table-bordered table-striped tables'>
						<tbody class='table-tags'>
							
						</tbody>
					</table>					
					
					<div class='form-group'>
						<div class='tag0'>
						<div class='input-group'>
							<span class='input-group-addon label-title'>Tag</span>
							<input type='text' id='tag0' class='form-control' placeholder='Computer Science' name='tag' value="{{ old('tag') }}" />
							<input type='hidden' name='tags' id='tags'/>				
							<div class='input-group-btn'>
								<button type='button' class='btn btn-secondary' id='add-tag'>
									<span class='glyphicon glyphicon-plus'></span>
								</button>
							</div>						
						</div>
						<span class="tag-help0 help-block hidden">
							<strong></strong>
						</span>						
						</div>																
					</div>


					<div class='publisher-field'>
					<h4>Publisher</h4>

					<div class='form-group publish-radio'>
						<div class='input-group'>
							    <label class="a radio-inline">
									<input type="radio" class='publish-status' name="publish-status"/>Published
							    </label>
							    <label class="radio-inline">
									<input type="radio" class='publish-status' name="publish-status"/>Unpublished
							    </label>			    
						</div>
						<span class="publish-status-help help-block">
							<strong></strong>
						</span>
					</div>

					<div class="form-group published-div {{ old('publish-status') == 'published' ? '' : 'hidden' }}">
						<div class='input-group'>
							<span class='input-group-addon label-title'>Publisher</span>
							<input type='text' id='publisher' class='form-control' placeholder='Ubisoft' name='publisher' value="{{ old('publisher') }}" />						
						</div>
						<span class="pub-help help-block hidden">
							<strong></strong>
						</span>						
						<div class='input-group'>
							<span class='input-group-addon label-title'>Year</span>
							<input type='number' id='published-year' class='form-control' placeholder='2003' name='published-year' value="{{ old('published-year') }}" />						
						</div>
						<span class="year-help help-block hidden">
							<strong></strong>
						</span>					
						<div class='input-group'>
							<span class='input-group-addon label-title'>Place</span>
							<input type='text' id='place' class='form-control' placeholder='Iloilo, Philippines' name='place' value="{{ old('place') }}" />						
						</div>
						<span class="place-help help-block hidden">
							<strong></strong>
						</span>													
					</div>
					</div>

					<h4>Acquisition</h4>

					<div class='form-group acquisition-radio'>
						<div class='input-group'>
							<label class='radio-inline'>
								<input type='radio' class='acquisition-mode' name='acquisition-mode' value="{{ old('acquisition-mode') }}" />Donated
							</label>
							<label class='radio-inline'>
								<input type='radio' class='acquisition-mode' name='acquisition-mode' value="{{ old('acquisition-mode') }}" />Purchased
							</label>
						</div>

						<span class="acquisition-mode-help help-block hidden">
							<strong></strong>
						</span>						
					</div>

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
							<span class='input-group-addon label-title'>Year</span>
							<input type='number' id='donated-year' class='form-control' placeholder='2003' name='donated-year' value="{{ old('donated-year') }}" />
						</div>
						<span class="donor-year-help help-block hidden">
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
							<span class='input-group-addon label-title'>Year</span>
							<input type='number' id='purchased-year' class='form-control' placeholder='2010' name='purchased-year' value="{{ old('purchased-year') }}" />						
						</div>	
						<span class="purchased-year-help help-block hidden">
							<strong></strong>
						</span>					
						<div class='input-group'>
							<span class='input-group-addon label-title'>Address</span>
							<input type='text' id='address' class='form-control' placeholder='National Book Store' name='address' value="{{ old('address') }}" />						
						</div>	
						<span class="purchased-address-help help-block hidden">
							<strong></strong>
						</span>							
					</div>

				</div>
				<div class='modal-footer'>
					<button type='reset' id='material-reset' class='btn btn-danger'>Reset</button>
					<button type='submit' id='material-submit' class='btn btn-success'>Add</button>
				</div>
			</form>
		</div>
	</div>
</div>

@endsection