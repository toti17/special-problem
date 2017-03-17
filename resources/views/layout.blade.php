<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<link href="/css/bootstrap.min.css" rel="stylesheet"  type="text/css">
		<link href="/css/style.css" rel="stylesheet"  type="text/css">	
		<script src="/js/jquery-3.1.1.js"></script>
		<script src="/js/jquery-ui.js"></script>			
		<script src="/js/bootstrap.min.js"></script>
		<script src="/js/newscript.js"></script>	
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
	<header class="container-fluid header">
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
	            	<li>
					<!-- <a href="#">Home</a> -->
	            	</li>	            	       	
	            	@if(Auth::user()->type == "student")
	                	<li>
	                   	 <a>Vertical Files</a>
	                    	<ul class="sub" id="sub-vertical">
		                        <li>
		                            <a href="/collection/Photocopied_Articles">Photocopied Articles</a>
		                        </li>
		                        <li>
		                            <a href="/collection/Conference_Papers">Conference Papers</a>
		                        </li>
		                         <li>
		                            <a href="/collection/Research_Reports">Research Reports</a>
		                        </li>
		                    </ul>
	                	</li>                  
	                	<li>
	                  	<a>Books</a>
	                        <ul class="sub" id="sub-book">
                              	<li>
                                    	<a href="/collection/Private_Collections">Private Collections</a>
                                	</li>
                                	<li>
                                    	<a href="/collection/Rare_Collections">Rare Collections</a>
                                	</li>
	                        </ul>                    
	                </li>
	                <li>
	                    <a href="/collection/Thesis">Thesis</a>
	                </li>
	                <li>
	                    <a>Periodicals</a>
	                        <ul class="sub" id="sub-book">
	                                <li>
	                                    <a href="/collection/Serials">Serials</a>
	                                </li>
	                                <li>
	                                    <a href="/collection/Newspapers">Newspapers</a>
	                                </li>
	                                <li>
	                                    <a href="/collection/Journals">Journals</a>
	                                </li>
	                                <li>
	                                    <a href="/collection/Magazines">Magazines</a>
	                                </li>                                                                
	                        </ul>                    
	                </li>
	                <li>
	                    <a>Multimedia</a>
	                    <ul class="sub" id="sub-multimedia">                                           
	                            <li>
	                                <a href="/collection/CD">CD</a>
	                            </li>
	                            <li>
	                            <li>
	                                <a href="/collection/DVD">DVD</a>
	                            </li>
	                            <li>
	                                <a href="/collection/VHS">VHS</a>
	                            </li>                                  
	                            <li>                              
	                                <a href="/collection/Cassette_Tapes">Cassette tapes</a>
	                            </li>
	                            <li>
	                                <a href="/collection/Photographs">Photographs</a>                                     
	                            </li>                                                                              
	                    </ul>                                      
	                </li>
	                @endif
	                @endif
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
	<!--                 <li>
	                    <a href="">Artifacts & Museum</a>
	                    <ul class="sub" id="sub-inventory">
	                        <li><a href="">Artifacts</a></li>
	                        <li><a href="">Fabrics</a></li>
	                        <li><a href="">Textile</a></li>
	                        <li><a href="">Farming Tools</a></li>
	                        <li><a href="">Fishing Tools</a></li>                                                
	                    </ul>                                                  
	                </li>     -->               
	            </ul>
	        </nav>
	    </div>
	</nav>
		@if(Auth::check())
	    		@if(Auth::user()->status == "unconfirmed")
				<div class="alert alert-warning" role="alert">
					Please confirm your account by presenting your credentials to the staff in charge.
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
			@endif  
	    	@endif
	    	@yield('content')
	</body>
</html>