@extends('layout')
@section('content')
@if(Auth::user()->status == "confirmed" and Auth::user()->type != "admin")

	<button type="button" class="btn btn-success">BORROW</button>

@endif

@if(Auth::user()->type == "admin")
<div class="container-fluid custom-container">
	<div class="row">
		<div class="col-md-2 sidebar">
			<ul class="nav nav-sidebar">
				<li {{ (Request::is('dashboard/home') ? 'class=active' : '') }} >
					<a href="{{ url('/dashboard/home')}}">Home</a>
				</li>
				<li {{ (Request::is('dashboard/user') ? 'class=active' : '') }} >
					<a href="{{ url('/dashboard/user')}}">User</a>
				</li>						
				<li {{ (Request::is('dashboard/material') ? 'class=active' : '') }} >
					<a href="{{ url('/dashboard/material')}}">Material</a>
				</li>
				<li>
		                  <a href="{{ url('/logout') }}"
		                      onclick="event.preventDefault();
		                               document.getElementById('logout-form').submit();">
		                      Logout
		                  </a>

		                  <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
		                      {{ csrf_field() }}
		                  </form>
				</li>						
			</ul>
		</div>
	</div>
	<div class="col-md-10 col-md-offset-2 main">
		@yield('user')
		@yield('material')
	</div>
</div>
@endif
@endsection