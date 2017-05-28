if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
	$('.admin-pic').css("transform", "rotate(-90deg)");
}

$(document).on('click', '.up-register', function(){
	$(this).removeClass('login-hover');
	if(!($(".up-register").hasClass("up-color"))){
		$(".up-register").addClass("up-color");
		$(".non-up-register").removeClass("up-color");
	}
	$('.help-block').remove();
	$("#institution").val("University of the Philippines Visayas");
	$("#institution").attr("readonly", "readonly");
	$("#institution").css({"cursor": "not-allowed"});
	$("#status").val("confirmed");
});

$(document).on('mouseover', '.up-register', function(){
	if($(this).hasClass('up-color') == false){
		$(this).css('color', 'white');
		$(this).addClass('login-hover');
	}
});

$(document).on('mouseleave', '.up-register', function(){
	$(this).css('color', 'black');
	if($(this).hasClass('up-color') == false){
		$(this).removeClass('login-hover');
	}
});

$(document).on('mouseover', '.non-up-register', function(){
	if($(this).hasClass('up-color') == false){
		$(this).css('color', 'white');
		$(this).addClass('login-hover');
	}
});

$(document).on('mouseleave', '.non-up-register', function(){
	$(this).css('color', 'black');
	if($(this).hasClass('up-color') == false){
		$(this).removeClass('login-hover');
	}
});

$(document).on('click', '.non-up-register', function(){
	$(this).removeClass('login-hover');
	if(!($(".non-up-register").hasClass("up-color"))){
		$(".non-up-register").addClass("up-color");
		$(".up-register").removeClass("up-color");
	}
	$("#institution").val("");
	$('.help-block').addClass('hidden');
	$("#institution").removeAttr("readonly");
	$("#institution").css({"cursor": "text"});
	$("#status").val("unconfirmed");
});

$(document).ready(function (){
	// shows navbar collapse for mobile

	$(".navbar-nav").removeClass('hidden');

	// end of shows navbar collapse for mobile

	// proceed to confirm accounts if html is a pagination link	
    setTimeout(function() {
    	if($(location).attr('href').indexOf('dashboard/user') != -1){
		if($('.user-type').val() == 'staff'){
			$('#confirm-account-button').trigger('click');
		}
    	}
	else if($(location).attr('href').indexOf('dashboard/material?borrowed') != -1){
		$('.confirm-materials-button').trigger('click');
	}
    }, 10);
	//  end of changing html

	$("[data-toggle=tooltip").tooltip();

	// login script

	var wasNeverSubmitted = true; 
	$('.login-button').click(function(){
		$(this).text('Signing in');
		$(this).prop('disabled', true);
		$('.login-body').children('form').submit();
	});

	// end of login script

	// register script
	
	if($('.student-success').hasClass('studentnumber-status') == true){
		$('.student-success').fadeIn().delay(2000).fadeOut();
	}

	if($('.user-panel').hasClass('user-success') == true){
		$('.user-panel').fadeIn().delay(2000).fadeOut();
	}	

	// has error
	if($('.studentnumber-div').children().children().length == 2){
		$('.studentnumber-div').removeClass('hidden');
	}

	if($('#role').val() == 'UP'){
		$('#institution').val("University of the Philippines Visayas");
		$('#institution-div').addClass("hidden");
	}

	$('#role').change(function(){
		if($('#role option:selected').val() == "UP"){
			$(".institution-div").addClass('hidden')
			$('#label-username').text("Student/Faculty Number");
			$('#institution').text("University of the Philippines Visayas");
			$('#institution').val("University of the Philippines Visayas");
			$('#status').val("confirmed");
			$('#type').val('user');
		}
		else if($('#role option:selected').val() == "NON-UP"){
			$(".institution-div").removeClass('hidden');
			$('#label-username').text("Student Number");
			$('#institution').val("");
			$('#type').val('user');
			$('#status').val("unconfirmed");
		}
		else if($('#role option:selected').val() == "STAFF"){
			$('#label-username').text("Employee Number");
			$(".institution-div").addClass('hidden');
			$('#institution').val("University of the Philippines Visayas");
			$('#status').val("confirmed");
			$('#type').val('staff');
		}
	})


	// for removing autocomplete color
	result="";

	function isValidEmailAddress(emailAddress) {
	    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
	    return pattern.test(emailAddress);
	};

	$('.register-button').click(function(event){
		$('.error-block').text('');
		$('.email-block').text('');
		$('.form-group').removeClass('has-error');
		errorCounter = 0;
		firstname = $.trim($('#firstname').val());
		middlename = $.trim($('#middlename').val());
		lastname = $.trim($('#lastname').val());
		username = $.trim($('#username').val());
		email = $.trim($('#email').val());
		institution = $.trim($('#institution').val());
		type = $.trim($('#type').val());
		password = $('#password').val();
		confirmPassword = $('#password-confirm').val();

		if(firstname.length == 0){
			$('.firstname-help').removeClass('hidden');
			$('.firstname-help strong').text('The first name field is required.');
			errorCounter++;
		}
		else if(firstname.length > 100){
			$('.firstname-help').removeClass('hidden');
			$('.firstname-help strong').text('The first name field should not exceed more than 100 characters.');
			errorCounter++;
		}
		else{
			$('.firstname-help').addClass('hidden');
		}

		if(middlename.length == 0){
			$('.middlename-help').removeClass('hidden');
			$('.middlename-help strong').text('The middle name field is required.');
			errorCounter++;
		}
		else if(middlename.length >100){
			$('.middlename-help').removeClass('hidden');
			$('.middlename-help strong').text('The middle name name field should not exceed more than 100 characters.');
			errorCounter++;
		}
		else{
			$('.middlename-help').addClass('hidden');
		}

		if(lastname.length == 0){
			$('.lastname-help').removeClass('hidden');
			$('.lastname-help strong').text('The last name field is required.');
			errorCounter++;
		}
		else if(lastname.length >100){
			$('.lastname-help').removeClass('hidden');
			$('.lastname-help strong').text('The last name field should not exceed more than 100 characters.');
			errorCounter++;			
		}
		else{
			$('.lastname-help').addClass('hidden');
		}

		if($('.non-up-register').hasClass('up-color') == false || $('#role').val() == 'UP'){
			if(username.length == 0){
				$('.username-help').removeClass('hidden');
				$('.username-help strong').text('The user name field is required.');
				errorCounter++;
			}
			else if(username % 1 != 0 || username < 0){
				$('.username-help').removeClass('hidden');
				$('.username-help strong').text('Invalid format. Please input the correct format e.g. (201312345).');
				errorCounter++;
			}
			else if(username.length > 9 || username.length < 9){
				$('.username-help').removeClass('hidden');
				$('.username-help strong').text('The user name field should be equal to 9 numbers.');
				errorCounter++;			
			}
			else{
				$('.username-help').addClass('hidden');
			}			
		}
		else{
			if(username.length == 0){
				$('.username-help').removeClass('hidden');
				$('.username-help strong').text('The user name field is required.');
				errorCounter++;
			}
			else if(username % 1 != 0 || username < 0){
				$('.username-help').removeClass('hidden');
				$('.username-help strong').text('Invalid format. Please input the correct format e.g. (201312345).');
				errorCounter++;
			}
			else if(username.length > 15 || username.length < 6){
				$('.username-help').removeClass('hidden');
				$('.username-help strong').text('The user name field should be greater than 6 but less than 15 numbers.');
				errorCounter++;			
			}
			else{
				$('.username-help').addClass('hidden');
			}			
		}


		if(email.length == 0){
			$('.email-help').removeClass('hidden');
			$('.email-help strong').text('The email field is required.');
			errorCounter++;				
		}
		else if(email.length > 100){
			$('.email-help').removeClass('hidden');
			$('.email-help strong').text('The email field should not exceed more than 100 characters.');
			errorCounter++;			
		}
		else if(!isValidEmailAddress(email)){
			$('.email-help').removeClass('hidden');
			$('.email-help strong').text('Invalid format. Please input the correct format. e.g. (up@gmail.com).');
			errorCounter++;
		}
		else{
			$('.email-help').addClass('hidden');
		}

		if($('.non-up-register').text() != 'UP' || $('#role option:selected').val() == "UP"){
			if(institution.length == 0){
				$('.institution-help').removeClass('hidden');
				$('.institution-help strong').text('The institution field is required.');
				errorCounter++;
			}
			else if(institution.length >100){
				$('.institution-help').removeClass('hidden');
				$('.institution-help strong').text('The institution field should not exceed more than 100 characters.');
				errorCounter++;			
			}
			else{
				$('.institution-help').addClass('hidden');
			}
		}
		if($('#usertype').val() == 'admin'){
			if($('#role').val() === null){
				$('.type-help strong').text('The type field is required.');
				$('.type-help').removeClass('hidden');
			}
			else{
				$('.type-help').addClass('hidden');
			}
		}

		if(password.length == 0){
			$('.password-help').removeClass('hidden');
			$('.password-help strong').text('The password field is required. Please input 6 characters.');
			errorCounter++;
		}	
		else if(password.length <6){
			$('.password-help').removeClass('hidden');
			$('.password-help strong').text('The password field should be greater than or equal to 6 characters.');
			errorCounter++;			
		}
		else{
			$('.password-help').addClass('hidden');
			if(password != confirmPassword){
				$('.confirm-password-help').removeClass('hidden');
				$('.confirm-password-help strong').text('The password does not match. Please input the correct password.');
				errorCounter++;
			}
			else{
				$('.confirm-password-help').addClass('hidden');
			}
		}


		if(errorCounter == 0){
			event.preventDefault();
			if($('#usertype').val() == 'admin'){
				$('#con-type').text($('#role').val());
			}
			$('#con-firstname').text($('#firstname').val());
			$('#con-middlename').text($('#middlename').val());
			$('#con-lastname').text($('#lastname').val());
			$('#con-studentNumber').text($('#username').val());
			$('#con-email').text($('#email').val());
			$('#con-institution').text($('#institution').val());
			$('#users-form').removeAttr('action');
			$('#confirm-user-modal').modal('show');
		}
		else{
			event.preventDefault();
		}
	});

	$('#add-user-confirm').click(function(){
		$(this).val('Submitting...');
		$('#cancel-user-close').prop('disabled', true);
		$(this).prop('disabled', true);
			if($('#usertype').val() == 'admin'){
				$('#user-form').submit();
			}
			else{
				$('#users-form').submit();
			}	
	});

	$("#reset").on("click", function(){
		$('.studentnumber-div').addClass('hidden');
		$('.institution-div').addClass('hidden');
		$("input:text").val("");
		$(".help-block").addClass('hidden');
		$(".form-control").css({"border-color": "#ccc"});
		$(".form-control").css({"background-color": "white !important"});
		$(".control-label").css({"color": "black"});
		$('input[type="text"]').removeAttr("value");
		$(".error-block").css({"display": "none"});
		$("#type option").prop('selected', function(){
			return this.defaultSelected;
		});
		if($("#status").val() == "unconfirmed"){
			$("#institution").attr("value", "");
		}
		else{
			$("#institution").val("University of the Philippines Visayas");
		}
		$("#password").val("");
		$("#password-confirm").val("");
		if(navigator.userAgent.toLowerCase().indexOf("chrome") >= 0 || navigator.userAgent.toLowerCase().indexOf("safari") >= 0){
			result = window.setInterval(function(){
			$('input:-webkit-autofill').each(function(){
			    var clone = $(this).clone(true, true);
			    $(this).after(clone).remove();
			});
		}, 1);
		}
	});

	$("input").focus(function(){
		clearInterval(result);
	});
	// end of register script

	// sidebar script

	$('#user-button').click(function(){
		$('.staff-search-div').addClass('hidden');
		$('#user-form').removeClass('hidden');
		$('.student-form').addClass('hidden');
		$('.confirm-account-div').addClass('hidden');
		$(".student-number-panel").addClass('hidden');
	});

	$('#student-button').click(function(){
		$('.user-close').trigger('click');
		$('.staff-search-div').addClass('hidden');
		$('.student-form').removeClass('hidden');
		$('#user-form').addClass('hidden');
		$('.confirm-account-div').addClass('hidden');
		$('.user-panel').addClass('hidden');
	});

	// end of sidebar script

	// confirm accounts script

	$('.users-table').tablesorter();

	var usernameArray = [];
	var fullnameArray = [];
	var institutionArray = [];

	function retrieveUsers(){
		return $.ajax({
			type: 'get',
			url: '/dashboard/users',
			success: function(data){
			}
		});
	}

	function displayUsers(){
		$('body').css('cursor', 'wait');
		retrieveUsers().done(function(data){
			$('body').css('cursor', 'default');
			$('.staff-search-div').removeClass('hidden');
			$(".student-number-panel").addClass('hidden');
			$('.student-form').addClass('hidden');
			$('#user-form').addClass('hidden');
			$('.confirm-account-div').removeClass('hidden');		
			if(data.length == 0){
				$('#no-confirmed-users').removeClass('hidden');
				$('.search').prop('disabled', true);
				$('.search-type').prop('disabled', true);
			}
			else{
				$('#no-confirmed-users').addClass('hidden');
				$('.search').prop('disabled', false);
				$('.search-type').prop('disabled', false);				
			}
			results = data;
	            var totalPages = Object.keys(data).length;
	            var minPage = 10;
	            var total = 0;
	            var max = 0;
	        	var index = 0;
			var defaultOpts = {
				totalPages: 1
			};				
			if(Object.keys(data).length <= minPage){
				totalPages = 1;
			}
			else{
				totalPages = Math.ceil(Object.keys(data).length/minPage);
			}				
			$('#pagination-demo').twbsPagination(defaultOpts);		            
	            $('#pagination-demo').twbsPagination('destroy');
	            $('#pagination-demo').twbsPagination($.extend({}, defaultOpts, {
	                	startPage: 1,
	                	totalPages: totalPages,
				onPageClick: function(event, page){
					$('.users-table').trigger('update');
					for(i=0;i<Object.keys(data).length;i++){
						usernameArray.push(data[i].username);
						fullnameArray.push(data[i].firstname + ' ' + data[i].middlename + ' ' + data[i].lastname);
						institutionArray.push(data[i].institution);
					}
					total = page * minPage;
					index = Math.abs(total-minPage);
					max = Object.keys(data).length - index;
					if(max <= minPage){
						max = Object.keys(data).length;
					}
					else{
						max = index + minPage;
					}
					for(i=0;i<usernameArray.length;i++){
						$('.' + usernameArray[i]).remove();
					}
					for(i=index;i<max;i++){
						if(data[i].status == 'unconfirmed'){
							unconfirmedBtn = 'btn btn-danger';
							confirmedBtn = 'btn btn-default';
						}
						else{
							unconfirmedBtn = 'btn btn-default';
							confirmedBtn = 'btn btn-success';
						}
						var newMaterial = $(document.createElement('tr')).attr('class', data[i].username);
						newMaterial.after().html(
							"<td class='text-left'>" + data[i].username + "</td>" +
							"<td class='text-left'>" + data[i].firstname + ' ' + data[i].middlename + ' ' + data[i].lastname + "</td>" +
							"<td class='text-left'>" + data[i].institution + "</td>" +
							"<td class='confirm-buttons'>" +
							"<input type='hidden' value ='" + data[i].username + "'/>" +
							"<button type='button' class='user-confirm-button " + unconfirmedBtn +  "'>unconfirmed</button>" +
							" <button type='button' class='user-confirm-button " + confirmedBtn + "'>confirmed</button>" +
							"</td>"
						);
						$('.confirmed-users').append(newMaterial);
					}											
	                	}
	            }));
		});
	}

	$('#confirm-account-button').click(function(){
		$('.user-close').trigger('click');
		displayUsers();
	});


	function confirm(confirmStatus, id){
		$("body").css("cursor", "wait");
		return $.ajax({
			type: 'GET',
			url: '/dashboard/user/confirm/' + id + '/' + confirmStatus,
			success: function(data){
				$("body").css("cursor", "default");
			}
		});
	}

	$('body').on('click', '.user-confirm-button', function(){

		var confirmStatus = $.trim($(this).text());
		var id = $(this).parent().children('input').val();
		if(confirmStatus == 'confirmed'){
			$('.user-status').removeClass('alert-danger').addClass('alert-success');
			$('.success-message').text("Username '" + id + "' confirmed successfully!");
			$(this).removeClass('btn-danger').addClass('btn-success');
			$(this).parent().children('.user-confirm-button').removeClass('btn-danger').addClass('btn-default');
		}
		else if(confirmStatus == 'unconfirmed'){
			$('.user-status').removeClass('alert-success').addClass('alert-danger');
			$('.success-message').text("Username '" + id + "' unconfirmed successfully!");
			$(this).parent().children('.user-confirm-button').removeClass('btn-success').addClass('btn-default');
			$(this).removeClass('btn-success').addClass('btn-danger');
		}
		confirm(confirmStatus, id).done(function(){
			$('.user-status').fadeIn().delay(2000).fadeOut();
		});
	});

	$('.confirm-success').click(function(){
		$('.user-status').addClass('hidden');
	});

	// endof confirm accounts script

	// add student number script

	var studentNumberArray = [];
	var i;
	jQuery(document).on('keydown', 'input#studentNumber', function(ev){
		if(ev.which === 13){
			if($("#studentNumber").val() != "" && $("#studentNumber").val().length == 9 && Number.isInteger(parseInt($("#studentNumber").val()))){
		    		if(jQuery.inArray($("#studentNumber").val(), studentNumberArray) == -1 ){
					$(".student-number").append("<div class='panel panel-default col-md-2 numbers'><div class='panel-heading'><h3 class='panel-title'>" + $("#studentNumber").val()  + "</h3><span class='pull-right clickable-number glyphicon glyphicon-remove'></span></div></div>");
					$(".student-number-panel").addClass("hidden");
		    			studentNumberArray.push($("#studentNumber").val());
		    			$("#studentNumber").val("");
		    		}
		    		else{
		    			$("#error-text").text("The student number " + $("#studentNumber").val() +  " already exists.");
		    			$(".student-number-panel").removeClass("hidden");
		    			
		    		}
			}
			else{
				$("#error-text").text("Invalid student number. (E.g. 201354053)");
				$(".student-number-panel").removeClass("hidden");
			}	
	      return false;
	    }
	});

	$("#add-student-number").click(function(){
		if($("#studentNumber").val() != "" && $("#studentNumber").val().length == 9 && Number.isInteger(parseInt($("#studentNumber").val()))){
	    		if(jQuery.inArray($("#studentNumber").val(), studentNumberArray) == -1 ){
				$(".student-number").append("<div class='panel panel-default col-md-2 numbers'><div class='panel-heading'><h3 class='panel-title'>" + $("#studentNumber").val()  + "</h3><span class='pull-right clickable-number glyphicon glyphicon-remove'></span></div></div>");
	    			studentNumberArray.push($("#studentNumber").val());
	    			$("#studentNumber").val("");
	    		}
	    		else{
	    			$("#error-text").text("The student number " + $("#studentNumber").val() +  " already exists.");
	    			$('.student-number-panel').fadeIn().delay(2000).fadeOut();
	    		}
		}
		else{
			$("#error-text").text("Invalid student number. (E.g. 201354053)");
			$('.student-number-panel').fadeIn().delay(2000).fadeOut();
		}
	});

	$('#studentNumber').keyup(function(e){
		if(e.which == 13){
			$('#add-student-number').trigger('click');
		}
	});

	$(document.body).on('click', '.clickable-number',function(){
		var index = jQuery.inArray($(this).parent().text(), studentNumberArray);
		if(index > -1){
			studentNumberArray.splice(index, 1);
		}
		$(this).parent().parent().detach();
	});

	$("#student-number-submit").click(function(){
		if(studentNumberArray.length == 0){
			$(".error-text").removeClass('hidden');
			$("#error-text").text("Enter a student number to submit form.");
			return false;
		}
		else{
			$("#final-student-number").val(studentNumberArray);
		}
	});

	// end of add student number script

	// facebook link

	$('#facebook-link').click(function(){
		window.open("https://www.facebook.com/cwvs.upv?ref=br_rs", '_blank');
	});

	// end of facebook link

	if($('#user-type').val() == 'staff' || $('#user-type').val() == 'admin' || $('.user-type').val() == 'staff' || $('.user-type').val() == 'admin'){
		if ($(window).width() < 768) {
			$('.navbar-nav').removeClass('hidden');
			$('.navbar-nav li').removeClass('hidden');
		}
		else if($(window).width() >= 768){
		  $('.navbar-nav li').addClass('hidden');
		}
	}

	$(window).on('resize', function(){
		var win = $(this);
		if($('#user-type').val() == 'staff' || $('#user-type').val() == 'admin' || $('.user-type').val() == 'staff' || $('.user-type').val() == 'admin'){
			if (win.width() < 768) {
				$('.navbar-nav').removeClass('hidden');
				$('.navbar-nav li').removeClass('hidden');
			}
			else if(win.width() >= 768){
			  $('.navbar-nav li').addClass('hidden');
			}			
		}
	});

});