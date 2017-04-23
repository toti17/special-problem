@extends('dashboard')
@section('user')

<div class="row">
    @if(Auth::user()->type == "admin")
    <button id="student-button" type="button" class="btn btn-default">Add Student/Faculty Number</button>
    <button id="user-button" type="button" class="btn btn-default">Add User</button>
    @endif
     <button id='confirm-account-button' type='button' class="btn btn-default @if(Auth::user()->type =='staff') hidden @endif ">Confirm Accounts</button>
</div>

@if(session('studentnumberStatus'))
<div class="col-md-6 col-md-offset-3  alert alert-success student-number-panel">
   {{ session('studentnumberStatus') }}
    <button type="button" class="close" aria-label="Close" data-dismiss='alert'>
        <span aria-hidden="true">&times;</span>
    </button>
</div>
@endif

<div class="col-md-6 col-md-offset-3  alert alert-danger student-number-panel error-text hidden">
    <span id="error-text"></span>
    <button type="button" class="close" aria-label="Close" data-dismiss='alert'>
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="col-md-6 alert  alert-danger success-status user-status"><span class='success-message'></span>
    <button type="button" class="close confirm-success" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class='col-md-7 col-md-offset-2 @if(Auth::user()->type == "admin") staff-search-div hidden @else user-search-div @endif'>
    <div class='input-group'>
        <div class='input-group-btn'>
            <div class='dropdown'>
                <button class='btn btn-default dropdown-toggle search-type' type='button' data-toggle='dropdown' value='Username'>Username <span class='caret'></span></button>
                <ul class='dropdown-menu type-dropdown'>
                    <li><a href="#">Username</a></li>
                    <li><a href="#">Fullname</a></li>
                    <li><a href="#">Institution</a></li>          
                </ul>
            </div>
        </div>          
        <input type='text' class = 'form-control search'/>
    </div>
</div>

<div class="col-md-12 student-form @if(!(session('studentnumberStatus'))) hidden @endif ">
    <form class="form-horizontal" role="form" method="POST" action="{{ url('/add/studentnumber') }}">
        {{ csrf_field() }}
        <div class="form-group">
            <label for="studentnumber" class="col-md-3 control-label">Student/Faculty Number</label>
            <div class="col-md-6">
            <div class="input-group">
                 <input type="text" id="studentNumber" class="form-control" value="{{ old('studentumber') }}"/>
                 <input type="hidden" id="final-student-number" name='studentnumber'/>
                 <span class="input-group-btn">
                    <button id="add-student-number" type="button" class="btn btn-success">Add</button>
                 </span>
                 <span class="input-group-btn">
                    <button id="student-number-submit" type="submit" class="btn btn-primary">Submit</button>
                 </span>             
            </div>
            </div>
        </div>
    </form>

    <div class="student-number">

    </div>
</div>


<div class='col-md-12 confirm-account-div @if(Auth::user()->type == "admin") hidden @else staff-confirm-account-div @endif' >
    <input class='user-type' type='hidden' value="{{$user}}" />
    <table class="table table-condensed users-table table-hover wait">
        <thead>
            <tr>
                <th class='username-th'>Username&nbsp;&nbsp;<i class="fa fa-sort" aria-hidden="true"></th>
                <th class='fullname-th'>Full Name&nbsp;&nbsp;<i class="fa fa-sort" aria-hidden="true"></th>
                <th class='institution-th'>Institution&nbsp;&nbsp;<i class="fa fa-sort" aria-hidden="true"></th>
                <th>Status</th>                       
            </tr>
            <tr id='no-confirmed-users' class='hidden'>
                <td>No users...</td>
            </tr>
        </thead>
        <tbody class='confirmed-users'>
        </tbody> 
    </table>
    <div class='search-pagination user-pagination-div'>
        <ul id="pagination-demo" class="pagination-sm"></ul>
    </div>
</div>

@if(session('status'))
<div class="col-md-6 col-md-offset-3  alert alert-success user-panel">
   {{ session('status') }}
    <button type="button" class="user-close close" aria-label="Close" data-dismiss='alert'>
        <span aria-hidden="true">&times;</span>
    </button>
</div>
@endif

@if(Auth::user()->type == "admin")
<form id="user-form" class="form-horizontal col-md-12 @if(session('studentnumberStatus'))  hidden @endif " role="form" method="POST" action="{{ url('/student/register') }}">
    {{ csrf_field() }}
    <input type='hidden' id='usertype' value="{{Auth::user()->type}}"/>
    <div class="form-group{{ $errors->has('firstname') ? ' has-error' : '' }}">
        <label for="firstname" class="col-md-3 control-label">First Name</label>

        <div class="col-md-6">
            <input id="firstname" type="text" placeholder="Charles Francis" class="form-control" name="firstname" value="{{ old('firstname') }}" autofocus>
                <span class="firstname-help help-block hidden">
                    <strong></strong>
                </span>
        </div>
    </div>

    <div class="form-group{{ $errors->has('middlename') ? ' has-error' : '' }}">
        <label for="middlename" class="col-md-3 control-label">Middle Name</label>
        <div class="col-md-6">
            <input id="middlename" placeholder="Sarroza" type="text" class="form-control" name="middlename" value="{{ old('middlename') }}" autofocus>
                <span class="middlename-help help-block hidden">
                    <strong></strong>
                </span>
        </div>
    </div>

    <div class="form-group{{ $errors->has('lastname') ? ' has-error' : '' }}">
        <label for="lastname" class="col-md-3 control-label">Last Name</label>

        <div class="col-md-6">
            <input id="lastname" placeholder="Aposaga" type="text" class="form-control" name="lastname" value="{{ old('lastname') }}" autofocus>
                <span class="lastname-help help-block hidden">
                    <strong></strong>
                </span>
        </div>
    </div>                                                

    <div class="form-group{{ $errors->has('type') ? ' has-error' : '' }}">
         <label for="type" class="col-md-3 control-label">Type</label>
        <div class="col-md-6">
            <input type='hidden' id='type' name='type' value='user'/>
            <select id="role" class="form-control" name="role" required>
                <option selected>UP</option>
                <option>NON-UP</option>
                <option>STAFF</option>
            </select>
            <span class="type-help help-block hidden">
                <strong></strong>
            </span>            
        </div>
    </div>

    <div class="form-group{{ $errors->has('username') ? ' has-error' : '' }} studentnumber-div">
        <label id="label-username" for="username" class="col-md-3 control-label @if(session('error')) error-label @endif ">Student Number</label>

        <div class="col-md-6">
            <input id="username" type="number" placeholder="201354053" class="form-control @if(session('error'))error-input @endif" name="username" value="{{ old('username') }}" autofocus>
            <span class="username-help help-block hidden">
                <strong></strong>
            </span>
            @if ($errors->has('username'))
                <span class="error-block">
                    <strong>{{ $errors->first('username') }}</strong>
                </span>
            @endif
        </div>
    </div>

    <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
        <label for="email" class="col-md-3 control-label">Email</label>
        <div class="col-md-6">
            <input id="email" placeholder="charlesaposaga@gmail.com" type="email" class="form-control" name="email" value="{{ old('email') }}" autofocus>
            <span class="email-help help-block hidden">
                <strong>{{ $errors->first('email') }}</strong>
            </span>                           
            @if ($errors->has('email'))
                <span class="help-block">
                    <strong>{{ $errors->first('email') }}</strong>
                </span>
            @endif
        </div>
    </div>

    <div class="form-group{{ $errors->has('institution') ? ' has-error' : '' }} institution-div hidden">
        <label for="institution" class="col-md-3 control-label">Institution</label>
        <div class="col-md-6">
            <input id="institution" placeholder="ISAT-U" class="form-control" type="text" name="institution" value="{{ old('institution') }}" autofocus>
            <input id="status" type="hidden" class="form-control" name="status" value="confirmed">
            <span class="institution-help help-block hidden">
                <strong></strong>
            </span>
        </div>
    </div>                    
        
    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
        <label for="password" class="col-md-3 control-label">Password</label>

        <div class="col-md-6">
            <input id="password" type="password" class="form-control" name="password">
            <span class="password-help help-block hidden">
                <strong></strong>
            </span>
        </div>
    </div>

    <div class="form-group">
        <label for="password-confirm" class="col-md-3 control-label">Confirm Password</label>

        <div class="col-md-6">
            <input id="password-confirm" type="password" class="form-control" name="password_confirmation">
            <span class="confirm-password-help help-block hidden">
                <strong></strong>
            </span>            
        </div>
    </div>

    <div class="form-group last-group">
        <div class="col-md-9">
            <button type="submit" class="btn btn-primary register-button">
                Register
            </button>
            <button id="reset" type="button" class="btn btn-danger reset-btn">
                Reset
            </button>                            
        </div>
    </div>        
</form>

<div class='modal fade' id='confirm-user-modal' role='dialog' data-keyboard='false' data-backdrop='static'>
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <h3>Confirm Details</h3>
            </div>
            <div class="modal-body">
                <p>First Name: <span id='con-firstname'></span></p>
                <p>Middle Name: <span id='con-middlename'></span></p>
                <p>Last Name: <span id='con-lastname'></span></p>
                <p>Student Number: <span id='con-studentNumber'></span></p>
                <p>Email: <span id='con-email'></span></p>
                @if(Auth::user()->type == 'admin') <p>Type: <span id='con-type'></span></p> @endif
                <p>Institution: <span id='con-institution'></span></p>
            </div>
            <div class="modal-footer">
                <button type="button" data-dismiss="modal" class="btn btn-default" id='cancel-user-close'>Cancel</button>
                <button type="button" class="btn btn-success confirm-modal" id='add-user-confirm'>Submit</button>
            </div>
        </div>
    </div>
</div> 
@endif

@endsection