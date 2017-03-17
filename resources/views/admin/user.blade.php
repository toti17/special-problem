@extends('dashboard')
@section('user')

<div class="row">
    <button id="student-button" type="button" class="btn btn-default">Add Student Number</button>
    <button id="user-button" type="button" class="btn btn-default">Add User</button>
    <button id='confirm-account-button' type='button' class='btn btn-default'>Confirm Accounts</button>
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

<div class="col-md-12 student-form @if(!(session('studentnumberStatus'))) hidden @endif ">
    <form class="form-horizontal" role="form" method="POST" action="{{ url('/add/studentnumber') }}">
        {{ csrf_field() }}
        <div class="form-group">
            <label for="studentnumber" class="col-md-3 control-label">Student Number</label>
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


<div class='col-md-12 confirm-account-div hidden'>
    <table class="table table-condensed table-hover">
        <thead>
            <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Institution</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($users as $user)
            <tr>
                <td>{{ $user->username }}</td>
                <td>{{ $user->firstname }} {{ $user->middlename }} {{ $user->lastname }}</td>
                <td>{{ $user->institution }}</td>
                <td class='confirm-buttons'>
                    <input type='hidden' value="{{ $user->username }}"/>
                    <button type='button' class="user-confirm-button btn @if($user->status == 'unconfirmed') btn-danger @else btn-default @endif">
                        unconfirmed
                    </button>
                    <button type='button' class="user-confirm-button btn @if($user->status == 'confirmed') btn-success @else btn-default @endif">
                        confirmed
                    </button>
                </td>
            </tr>
            @endforeach
        </tbody> 
    </table>
    <div class='pages'>
        {{ $users->links() }}
    </div>    
</div>

@if(session('status'))
<div class="col-md-6 col-md-offset-3  alert alert-success user-panel">
   {{ session('status') }}
    <button type="button" class="close" aria-label="Close" data-dismiss='alert'>
        <span aria-hidden="true">&times;</span>
    </button>
</div>
@endif

<form id="user-form" class="form-horizontal col-md-12 @if(session('studentnumberStatus'))  hidden @endif " role="form" method="POST" action="{{ url('/student/register') }}">
    {{ csrf_field() }}
    <div class="form-group{{ $errors->has('firstname') ? ' has-error' : '' }}">
        <label for="firstname" class="col-md-3 control-label">First Name</label>

        <div class="col-md-6">
            <input id="firstname" type="text" placeholder="Charles Francis" class="form-control" name="firstname" value="{{ old('firstname') }}" required autofocus>

            @if ($errors->has('firstname'))
                <span class="help-block">
                    <strong>{{ $errors->first('firstname') }}</strong>
                </span>
            @endif
        </div>
    </div>

    <div class="form-group{{ $errors->has('middlename') ? ' has-error' : '' }}">
        <label for="middlename" class="col-md-3 control-label">Middle Name</label>
        <div class="col-md-6">
            <input id="middlename" placeholder="Sarroza" type="text" class="form-control" name="middlename" value="{{ old('middlename') }}" required autofocus>

            @if ($errors->has('middlename'))
                <span class="help-block">
                    <strong>{{ $errors->first('middlename') }}</strong>
                </span>
            @endif
        </div>
    </div>

    <div class="form-group{{ $errors->has('lastname') ? ' has-error' : '' }}">
        <label for="lastname" class="col-md-3 control-label">Last Name</label>

        <div class="col-md-6">
            <input id="lastname" placeholder="Aposaga" type="text" class="form-control" name="lastname" value="{{ old('lastname') }}" required autofocus>

            @if ($errors->has('lastname'))
                <span class="help-block">
                    <strong>{{ $errors->first('lastname') }}</strong>
                </span>
            @endif
        </div>
    </div>                                                

    <div class="form-group{{ $errors->has('type') ? ' has-error' : '' }}">
         <label for="type" class="col-md-3 control-label">Type</label>
        <div class="col-md-6">
            <input type='hidden' id='type' name='type'/>
            <select id="role" class="form-control" name="role" required>
                <option selected disabled value="">Select type</option>
                <option>UP</option>
                <option>NON-UP</option>
                <option>STAFF</option>
            </select>
            @if ($errors->has('type'))
                <span class="help-block">
                    <strong>{{ $errors->first('type') }}</strong>
                </span>
            @endif
        </div>
    </div>

    <div class="form-group{{ $errors->has('username') ? ' has-error' : '' }} studentnumber-div hidden">
        <label id="label-username" for="username" class="col-md-3 control-label @if(session('error')) error-label @endif ">Student Number</label>

        <div class="col-md-6">
            <input id="username" type="number" class="form-control @if(session('error'))error-input @endif" name="username" value="{{ old('username') }}" required autofocus>
            @if ($errors->has('username'))
                <span class="help-block">
                    <strong>{{ $errors->first('username') }}</strong>
                </span>
            @endif                            
            @if(session('error'))
                <span class="error-block">
                    <strong>{{ session('error') }}</strong>
                </span>
            @endif
        </div>
    </div>

    <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
        <label for="email" class="col-md-3 control-label">Email</label>

        <div class="col-md-6">
            <input id="email" placeholder="charlesaposaga@gmail.com" type="email" class="form-control" name="email" value="{{ old('email') }}" required autofocus>
            @if ($errors->has('email'))
                <span class="help-block">
                    <strong>{{ $errors->first('email') }}</strong>
                </span>
            @endif                            
            @if(session('email'))
                <span class="help-block">
                    <strong>{{ session('email') }}</strong>
                </span>
            @endif
        </div>
    </div>

    <div class="form-group{{ $errors->has('institution') ? ' has-error' : '' }} institution-div hidden">
        <label for="institution" class="col-md-3 control-label">Institution</label>

        <div class="col-md-6">
            <input id="institution" class="form-control" type="text" name="institution" value="{{ old('institution') }}" required autofocus>
            <input id="status" type="hidden" class="form-control" name="status" value="confirmed">
            @if ($errors->has('institution'))
                <span class="help-block">
                    <strong>{{ $errors->first('institution') }}</strong>
                </span>
            @endif
        </div>
    </div>                    
        
    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
        <label for="password" class="col-md-3 control-label">Password</label>

        <div class="col-md-6">
            <input id="password" type="password" class="form-control" name="password" required>

            @if ($errors->has('password'))
                <span class="help-block">
                    <strong>{{ $errors->first('password') }}</strong>
                </span>
            @endif
        </div>
    </div>

    <div class="form-group">
        <label for="password-confirm" class="col-md-3 control-label">Confirm Password</label>

        <div class="col-md-6">
            <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
        </div>
    </div>

    <div class="form-group last-group">
        <div class="col-md-9">
            <button type="submit" class="btn btn-primary register-btn">
                Register
            </button>
            <button id="reset" type="button" class="btn btn-danger reset-btn">
                Reset
            </button>                            
        </div>
    </div>        
</form> 


@endsection