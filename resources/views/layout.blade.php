<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<link href="/css/bootstrap.min.css" rel="stylesheet"  type="text/css">
		<link href="/css/jquery-ui.css" rel="stylesheet"  type="text/css">
		<link href="/css/style.css" rel="stylesheet"  type="text/css">
		<link href="/css/font-awesome/css/font-awesome.css" rel="stylesheet">
		<script src="/js/jquery-3.1.1.js"></script>
		<script src="/js/bootstrap.min.js"></script>
		<script src="/js/jquery-ui.js"></script>
		<script src="/js/imagePreview.js"></script>
		<script src="/js/moment.js"></script>
		<script src="/js/jquery.twbsPagination.min.js"></script>
		<script src="/js/jquery.tablesorter.js"></script>
		<script src="/js/newscript.js"></script>	
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
	</header>
	<nav class="navbar navbar-inverse custom-navbar">
	    <div class="container-fluid">
	        <div class="navbar-header">
	            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#cwvs-navbar">
	                <span class="icon-bar"></span>
	                <span class="icon-bar"></span>
	                <span class="icon-bar"></span>                  
	            </button>
	        </div>
	        <nav class="collapse navbar-collapse" id="cwvs-navbar">
	            <ul class="nav navbar-nav">
	                @if(Auth::check())	              	
	                @else
	                <li class="pull-right">
	                	<a href="{{ url('/login') }}">Sign in</a>
	                </li>     	                
	                <li class="pull-right">
				<a href="{{ url('/student/register') }}">Sign up</a>
	                </li>
	                @endif
	                @if(Auth::check())	
	                @if(Auth::user()->type == "student")
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
<!-- 	                <li>
	                    <a href="">Artifacts & Museum</a>
	                    <ul class="sub" id="sub-inventory">
	                        <li><a href="">Artifacts</a></li>
	                        <li><a href="">Fabrics</a></li>
	                        <li><a href="">Textile</a></li>
	                        <li><a href="">Farming Tools</a></li>
	                        <li><a href="">Fishing Tools</a></li>                                                
	                    </ul>                                                  
	                </li>      -->              
	            </ul>
	        </nav>
	    </div>
	</nav>
	    	@yield('content')
	</body>
</html>