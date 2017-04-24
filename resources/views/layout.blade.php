<!DOCTYPE html>
<html>
	<head>
		<link rel="shortcut icon" type="image/x-icon" href="/images/cwvslogo.jpg" />
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<link href="/css/bootstrap.min.css" rel="stylesheet"  type="text/css">
		<link href="/css/font-awesome/css/font-awesome.css" rel="stylesheet">
		<link href="/css/bootstrap-social.css" rel="stylesheet">
		<link href="/css/jquery-ui.css" rel="stylesheet"  type="text/css">
		<link href="/css/style.css" rel="stylesheet"  type="text/css">
		<script src="/js/jquery-3.1.1.js"></script>
		<script src="/js/jquery-ui.js"></script>
		<script src="/js/bootstrap.min.js"></script>		
		<script src="/js/imagePreview.js"></script>
		<script src="/js/moment.js"></script>
		<script src="/js/jquery.twbsPagination.min.js"></script>
		<script src="/js/jquery.tablesorter.js"></script>
		<script src="/js/newscript.js"></script>	
		<script src="/js/material.js"></script>
		<script src='/js/inventory.js'></script>
		<noscript>
		    <style type="text/css">
		        .pagecontainer {display:none;}
		    </style>
		    <div class="noscriptmsg">
		    You don't have javascript enabled.  Good luck with that.
		    </div>
		</noscript>		
	</head>
	<body class ='pagecontainer'>
	<header class="container-fluid main-header">
		<img class="up-logo" src="/images/University of the Philippines Visayas.png"/>
		<h7 class="header-inline header-color">
		        CENTER FOR WEST VISAYAN STUDIES ARCHIVE & INVENTORY SYSTEM
		</h7>
	    <img class="up-logo cwvs-logo" src="/images/cwvslogo.jpg"/>
	</header>
	<nav class="navbar navbar-inverse custom-navbar">
	        <div class="navbar-header">
	            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#cwvs-navbar">
	                <span class="icon-bar"></span>
	                <span class="icon-bar"></span>
	                <span class="icon-bar"></span>                  
	            </button>
	        </div>
	        <nav class="collapse navbar-collapse" id="cwvs-navbar">
	            <ul class="nav navbar-nav hidden">
	                @if(Auth::check())
				@if(Auth::user()->type == "admin" || Auth::user()->type == "staff")
				<li>
					<a href="{{ url('/dashboard/home')}}">Home</a>
				</li>
				<li>
					<a href="{{ url('/dashboard/user')}}">User</a>
				</li>						
				<li>
					<a href="{{ url('/dashboard/material')}}">Material</a>
				</li>
				<li>
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
	                @else
	                <li>
	                	<a href="{{'/'}}">Home</a>
	                </li>
	                <li>
	                	<a href="{{ url('/about')}}">About</a>
	                </li>
	                <li class="pull-right login">
	                	<a href="{{ url('/login') }}">Sign in</a>
	                </li>    
	                <li class="pull-right login">
				<a href="{{ url('/student/register') }}">Sign up</a>
	                </li>
	                @endif		                
	                @if(Auth::check())	
	                @if(Auth::user()->type == "user")
				<li class='pull-right'>
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
				@endif         
	            </ul>
	        </nav>
	</nav>
	    	@yield('content')	    	
	</body>
</html>