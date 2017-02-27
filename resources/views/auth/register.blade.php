@extends('layout')

@section('content')
<div class="container register-container">
    <div class="row">
        <div class="panel panel-default center-block register-panel">
            <div id="panel" class="panel-heading register-heading text-center">
                <div id="up-register" class="col-md-6 up-color pill-register">UP STUDENT</div>
                <div id="non-up-register" class="col-md-6 pill-register">NON UP STUDENT</div>
            </div>
            <div class="panel-body">
                <form class="form-horizontal" role="form" method="POST" action="{{ url('/student/register') }}">
                    {{ csrf_field() }}
                    <div class="form-group">
                        <label for="firstname" class="col-md-4 control-label">First Name</label>

                        <div class="col-md-6">
                            <input id="firstname" type="text" class="form-control" name="firstname" value="{{ old('firstname') }}" required autofocus>

                            @if ($errors->has('firstname'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('firstname') }}</strong>
                                </span>
                            @endif
                        </div>
                    </div>

                    <div class="form-group{{ $errors->has('middlename') ? ' has-error' : '' }}">
                        <label for="middlename" class="col-md-4 control-label">Middle Name</label>

                        <div class="col-md-6">
                            <input id="middlename" type="text" class="form-control" name="middlename" value="{{ old('middlename') }}" required autofocus>

                            @if ($errors->has('middlename'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('middlename') }}</strong>
                                </span>
                            @endif
                        </div>
                    </div>

                    <div class="form-group{{ $errors->has('lastname') ? ' has-error' : '' }}">
                        <label for="lastname" class="col-md-4 control-label">Last Name</label>

                        <div class="col-md-6">
                            <input id="lastname" type="text" class="form-control" name="lastname" value="{{ old('lastname') }}" required autofocus>

                            @if ($errors->has('lastname'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('lastname') }}</strong>
                                </span>
                            @endif
                        </div>
                    </div>                                                

                    <div class="form-group{{ $errors->has('username') ? ' has-error' : '' }}">
                        <label for="username" class="col-md-4 control-label">Student Number</label>

                        <div class="col-md-6">
                            <input id="username" type="number" class="form-control" name="username" value="{{ old('username') }}" required autofocus>
                            @if ($errors->has('username'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('username') }}</strong>
                                </span>
                            @endif                            
                            @if(session('error'))
                                <span class="help-block">
                                    <strong>{{ session('error') }}</strong>
                                </span>
                            @endif
                        </div>
                    </div>

                    <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                        <label for="email" class="col-md-4 control-label">Email</label>

                        <div class="col-md-6">
                            <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required autofocus>
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


                    <div class="form-group{{ $errors->has('institution') ? ' has-error' : '' }}">
                        <label for="institution" class="col-md-4 control-label">Institution</label>

                        <div class="col-md-6">
                            <input id="institution" class="institution form-control" type="text" name="institution" value="University of the Philippines Visayas" readonly="readonly">
                            <input id="type" type="hidden" class="form-control" name="type" value="student">
                            <input id="status" type="hidden" class="form-control" name="status" value="confirmed">

                            @if ($errors->has('institution'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('institution') }}</strong>
                                </span>
                            @endif
                        </div>
                    </div>                    
                        
                    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                        <label for="password" class="col-md-4 control-label">Password</label>

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
                        <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>

                        <div class="col-md-6">
                            <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-md-6 col-md-offset-4">
                            <button type="submit" class="btn btn-primary register-btn">
                                Register
                            </button>
                            <button id="reset" type="button" class="btn btn-danger reset-btn">
                                Reset
                            </button>                            
                        </div>
                    </div>        
                </form>           
            </div>
        </div>
    </div>
</div>
@endsection
