@extends('layout')

@section('content')
<div class="container sign-in-container">
    <div class="row">
        <div class='register-panel center-block sign-in-panel'>
            <div class="panel panel-default center-block">
                <div class="panel-heading sign-in-heading">
                    <div class='col-xs-12 col-md-12 user-login user-active up-color'>
                        LOGIN
                    </div>
<!--                     <div class='col-xs-4 col-md-4 user-login staff-label'>
                        STAFF
                    </div>
                    <div class='col-xs-4 col-md-4 user-login'>
                        ADMIN
                    </div> -->                                       
                </div>
                <div class="panel-body login-body">
                    <form class="form-horizontal" role="form" method="POST" action="{{ url('/login') }}">
                        {{ csrf_field() }}
                        <div class="form-group{{ $errors->has('username') ? ' has-error' : '' }} @if(session('status')) has-error @endif">
                            <label for="username" class="col-md-4 control-label user-label">Username:</label>

                            <div class="col-md-6">
                                <input id="username" type="text" class="form-control" name="username" value="{{ old('username') }}" required autofocus>

                                @if ($errors->has('username'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('username') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <input type='hidden' name='role' id='role' value='STUDENT'/>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password" class="col-md-4 control-label">Password:</label>

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
                            <div class="col-md-7 col-md-offset-3">
                                <button type="submit" class="btn btn-primary login-button pull-right">
                                    Login
                                </button>

                                <a class="pull-right btn btn-link" href="{{ url('/password/reset') }}">
                                    Forgot Your Password?
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
