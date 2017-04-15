$(document).ready(function (){
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

	$('.user-login').click(function(){
		$('.has-error').removeClass('has-error');
		$('.help-block').remove();
		$('.user-login').removeClass('user-active');
		$('.user-login').removeClass('up-color');
		$(this).addClass('user-active');
		$(this).addClass('up-color');
		if($.trim($(this).text()) == 'ADMIN'){
			$('.user-label').text('Admin Number:');
			$('#role').val('admin');
		}
		else if($.trim($(this).text()) == 'STUDENT'){
			$('.user-label').text('Student Number:');
			$('#role').val('student');
		}
		else if($.trim($(this).text()) == 'STAFF'){
			$('.user-label').text('Employee Number:');
			$('#role').val('staff');
		}
	});

	var wasNeverSubmitted = true; 
	$('.login-button').click(function(){
		$(this).text('Signing in');
		$(this).prop('disabled', true);
		$('.login-body').children('form').submit();
	});

	// end of login script

	// register script
	
	$("#up-register").click(function(){
		if(!($("#up-register").hasClass("up-color"))){
			$("#up-register").addClass("up-color");
			$("#non-up-register").removeClass("up-color");
		}
		$('.help-block').remove();
		$("#institution").val("University of the Philippines Visayas");
		$("#institution").attr("readonly", "readonly");
		$("#institution").css({"cursor": "not-allowed"});
		$("#status").val("confirmed");
	});
	$("#non-up-register").click(function(){
		if(!($("#non-up-register").hasClass("up-color"))){
			$("#non-up-register").addClass("up-color");
			$("#up-register").removeClass("up-color");
		}
		$("#institution").val("");
		$('.help-block').remove();
		$("#institution").removeAttr("readonly");
		$("#institution").css({"cursor": "text"});
		$("#status").val("unconfirmed");
	});

	// has error
	if($('.studentnumber-div').children().children().length == 2){
		$('.studentnumber-div').removeClass('hidden');
	}
	if($('.institution-div').children().children().length == 3){
		$('.institution-div').removeClass('hidden');
	}

	$('#role').change(function(){
		if($('#role option:selected').val() == "UP"){
			$(".studentnumber-div").removeClass('hidden');
			$(".institution-div").addClass('hidden')
			$('#label-username').text("Student Number");
			$('#institution').val("University of the Philippines Visayas");
			$('#status').val("confirmed");
			$('#type').val('student');
		}
		else if($('#role option:selected').val() == "NON-UP"){
			$(".studentnumber-div").removeClass('hidden');
			$(".institution-div").removeClass('hidden');
			$('#label-username').text("Student Number");
			$('#institution').val("");
			$('#type').val('student');
			$('#status').val("unconfirmed");
		}
		else if($('#role option:selected').val() == "STAFF"){
			$(".studentnumber-div").removeClass('hidden');
			$('#label-username').text("Employee Number");
			$(".institution-div").addClass('hidden');
			$('#institution').val("University of the Philippines Visayas");
			$('#status').val("confirmed");
			$('#type').val('staff');
		}
	})


	// for removing autocomplete color
	result="";

	$("#reset").on("click", function(){
		$('.studentnumber-div').addClass('hidden');
		$('.institution-div').addClass('hidden');
		$("input:text").val("");
		$(".help-block").html("");
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
		$('.staff-search-div').addClass('hidden');
		$('.student-form').removeClass('hidden');
		$('#user-form').addClass('hidden');
		$('.confirm-account-div').addClass('hidden');
		$('.user-panel').addClass('hidden');
	});

	// end of sidebar script

	// confirm accounts script
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
		retrieveUsers().done(function(data){
			results = data;
	            var totalPages = Object.keys(data).length;
	            var minPage = 5;
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
					for(i=0;i<Object.keys(data).length;i++){
						usernameArray.push(data[i].username);
						fullnameArray.push(data[i].firstname + ' ' + data[i].middlename + ' ' + data[i].lastname);
						institutionArray.push(data[i].institution);
					}
					total = page * minPage;
					index = Math.abs(total-minPage);
					max = Object.keys(data).length - index;
					if(max <= 5){
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
		$('.staff-search-div').removeClass('hidden');
		$('#no-confirmed-users').toggle(false);
		$('.student-form').addClass('hidden');
		$('#user-form').addClass('hidden');
		$('.confirm-account-div').removeClass('hidden');
		displayUsers();
	});

	$('body').on('click', '.user-confirm-button', function(){
		var confirmStatus = $.trim($(this).text());
		var id = $(this).parent().children('input').val()
		if(confirmStatus == 'confirmed'){
			$(this).removeClass('btn-danger').addClass('btn-success');
			$(this).parent().children('.user-confirm-button').removeClass('btn-danger').addClass('btn-default');
		}
		else if(confirmStatus == 'unconfirmed'){
			$(this).parent().children('.user-confirm-button').removeClass('btn-success').addClass('btn-default');
			$(this).removeClass('btn-success').addClass('btn-danger');
		}

		function confirm(confirmStatus){
			$("body").css("cursor", "wait");
			return $.ajax({
				type: 'GET',
				url: '/dashboard/user/confirm/' + id + '/' + confirmStatus,
				success: function(data){
					$("body").css("cursor", "default");
				}
			});
		}
		confirm(confirmStatus);
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

});