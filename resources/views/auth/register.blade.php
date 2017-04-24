@extends('layout')

@section('content')
<div class="container register-container">
    <div class="row">
        <div class="panel panel-default center-block register-panel">
            <div id="panel" class="panel-heading register-heading text-center">
                <div id="up-register" class="col-xs-6 col-md-6 up-color pill-register">UP</div>
                <div id="non-up-register" class="col-xs-6 col-md-6 pill-register">NON UP</div>
            </div>
            <div class="panel-body">
                <form class="form-horizontal" id="users-form" role="form" method="POST" action="{{ url('/student/register') }}">
                    {{ csrf_field() }}
                    <div class="form-group">
                        <label for="firstname" class="col-md-5 control-label">First Name</label>

                        <div class="col-md-6">
                            <input id="firstname" type="text" class="form-control" name="firstname" value="{{ old('firstname') }}" placeholder='Harry James' required autofocus>
                                <span class="firstname-help help-block hidden">
                                    <strong>{{ $errors->first('firstname') }}</strong>
                                </span>                                
                        </div>
                    </div>

                    <div class="form-group{{ $errors->has('middlename') ? ' has-error' : '' }}">
                        <label for="middlename" class="col-md-5 control-label">Middle Name</label>

                        <div class="col-md-6">
                            <input id="middlename" type="text" class="form-control" name="middlename" placeholder="Severus" value="{{ old('middlename') }}" required autofocus>
                                <span class="middlename-help help-block hidden">
                                    <strong>{{ $errors->first('middlename') }}</strong>
                                </span>
                        </div>
                    </div>

                    <div class="form-group{{ $errors->has('lastname') ? ' has-error' : '' }}">
                        <label for="lastname" class="col-md-5 control-label">Last Name</label>

                        <div class="col-md-6">
                            <input id="lastname" type="text" class="form-control" name="lastname" placeholder="Potter" value="{{ old('lastname') }}" required autofocus>
                                <span class="lastname-help help-block hidden">
                                    <strong>{{ $errors->first('lastname') }}</strong>
                                </span>
                        </div>
                    </div>                                                

                    <div class="form-group{{ $errors->has('username') ? ' has-error' : '' }}">
                        <label for="username" class="col-md-5 control-label">Student/Faculty Number</label>

                        <div class="col-md-6">
                            <input id="username" type="number" class="form-control" name="username" placeholder="199012345" value="{{ old('username') }}" required autofocus>
                                <span class="username-help help-block {{ $errors->has('username') ? ' has-error' : 'hidden' }}">
                                    <strong>{{ $errors->first('username') }}</strong>
                                </span>
                                @if(session('error'))
                                    <span class="help-block">
                                        <strong>{{ session('error') }}</strong>
                                    </span>
                                @endif                                                     
                        </div>
                    </div>

                    <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                        <label for="email" class="col-md-5 control-label">Email</label>

                        <div class="col-md-6">
                            <input id="email" type="email" class="form-control" name="email" placeholder="harrypotter@worldofmagic.com" value="{{ old('email') }}" required autofocus>
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


                    <div class="form-group{{ $errors->has('institution') ? ' has-error' : '' }}">
                        <label for="institution" class="col-md-5 control-label">Institution</label>

                        <div class="col-md-6">
                            <input id="institution" class="institution form-control" type="text" name="institution" placeholder="ISAT-U" value="University of the Philippines Visayas" readonly="readonly">
                            <input id="type" type="hidden" class="form-control" name="type" value="user">
                            <input id="status" type="hidden" class="form-control" name="status" value="confirmed">
                                <span class="institution-help help-block hidden">
                                    <strong>{{ $errors->first('institution') }}</strong>
                                </span>
                        </div>
                    </div>                    
                        
                    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                        <label for="password" class="col-md-5 control-label">Password</label>

                        <div class="col-md-6">
                            <input id="password" type="password" class="form-control" name="password" required>
                                <span class="password-help help-block hidden">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="password-confirm" class="col-md-5 control-label">Confirm Password</label>

                        <div class="col-md-6">
                            <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                                <span class="confirm-password-help help-block hidden">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>                            
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-md-8 col-md-offset-3">
                            <button class="btn btn-primary register-button">
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
                <p>Institution: <span id='con-institution'></span></p>
            </div>
            <div class="modal-footer">
                <button type="button" data-dismiss="modal" class="btn btn-default" id='cancel-user-close'>Cancel</button>
                <button type="button" class="btn btn-success confirm-modal" id='add-user-confirm'>Submit</button>
            </div>
        </div>
    </div>
</div>
@endsection