@extends('layout')
@section('content')


<div class="container-fluid custom-container">
	<div class="row">
		<div class="col-md-2 sidebar">
			<ul class="nav nav-sidebar">
				@if(Auth::user()->type == "admin" || Auth::user()->type == "staff")
				<li {{ (Request::is('dashboard/home') ? 'class=active' : '') }} >
					<a href="{{ url('/dashboard/home')}}">Home</a>
				</li>
				<li {{ (Request::is('dashboard/user') ? 'class=active' : '') }} >
					<a href="{{ url('/dashboard/user')}}">User</a>
				</li>						
				<li {{ (Request::is('dashboard/material') ? 'class=active' : '') }} >
					<a href="{{ url('/dashboard/material')}}">Material</a>
				</li>
				<li {{ (Request::is('dashboard/inventory') ? 'class=active' : '') }} >
					<a href="{{ url('/dashboard/inventory')}}">Inventory</a>
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
				@endif		
			</ul>
		</div>
	</div>
	<div class="col-md-10 col-md-offset-2 main">
		@yield('user')
		@yield('material')
	</div>
</div>


@endsection