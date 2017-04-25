@extends('layout')
@section('content')

<div class="index-container">
	<div class="col-md-12">
		<div class='row'>
			<div id='carousel' class='carousel slide' data-ride='carousel'>
				<ol class='carousel-indicators'>
					<li data-target='#carousel' data-slide-to='0' class='active'></li>
					<li data-target='#carousel' data-slide-to='1'></li>
					<li data-target='#carousel' data-slide-to='2'></li>
					<li data-target='#carousel' data-slide-to='3'></li>
					<li data-target='#carousel' data-slide-to='4'></li>					
				</ol>
				<div class='carousel-inner' role='listbox'>
					
					<div class='item active'><div class="overlay"></div>
						<img class='carousel-img img img-responsive' src='/images/bookshelf.jpg' alt='books'/>				
					</div>
					<div class='item'><div class="overlay"></div>
						<img class='carousel-img img img-responsive' src='/images/newspaper1.jpg' alt='books'/>
					</div>
					<div class='item'><div class="overlay"></div>
						<img class='carousel-img img img-responsive' src='/images/books3.jpg' alt='books'/>
					</div>
					<div class='item'><div class="overlay"></div>
						<img class='carousel-img img img-responsive' src='/images/files1.jpg' alt='books'/>
					</div>				
					<div class='item'><div class="overlay"></div>
						<img class='carousel-img img img-responsive' src='/images/books2.jpg' alt='books'/>
					</div>												
				</div>
				<a class='left carousel-control' href='#carousel' role='button' data-slide='prev'>
					<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
					<span class="sr-only">Previous</span>
				</a>
				<a class='right carousel-control' href='#carousel' role='button' data-slide='next'>
					<span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>
					<span class='sr-only'>Next</span>
				</a>
			</div>
		</div>
		<div class='row'>
			<div class='col-md-10 col-md-offset-1 info'>
			<h2 class='text-center info-header'>
				A pioneering institution of the University of the Philippines Visayas, the Center for West Visayan Studies started as the Visayan Studies Program in 1975.
			</h2>
			<div class='info-desc'><em>"It answered the call to <b>preserve</b> and <b>disseminate</b> information on the rich historico-cultural legacy of the region."</em></div>
			</div>
		</div>
		<div class='row'>
			<div class='col-xs-12 col-md-12 footer-background'>
				<div class='col-xs-6 col-md-6 footer'>
					<label class='footer-p-size'>University of the Philippines Visayas</label><br/>
					<label class='footer-p-size'>Iloilo, Iloilo City</label>
				</div>
				<div class='col-xs-6 col-md-6 social-footer'>
					<a id='facebook-link' class='btn btn-social-icon btn-facebook pull-right'>
						<span class='fa fa-facebook'></span>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>


@endsection
