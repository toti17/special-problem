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

	if($('.material-items').children().length == 0){
		$('#no-materials').toggle(true);
	}
	else{
		$('#no-materials').toggle(false);
	}
	if($('.confirmed-users').children().length == 0){
		$('#no-confirmed-users').toggle(true);
	}
	else{
		$('#no-confirmed-users').toggle(false);
	}

	// add material script

	$('#add-material-button').click(function(){
		$('.search-type').html('Accession Number ' + "<span class='caret'></span>");
		$('.type-dropdown').removeClass('hidden');
		$('.borrowed-dropdown').addClass('hidden');
		$('.material-form').attr('action', 'http://localhost:8000/add/material');
		$('.modal-title').text('Add Material');
		$('#material-submit').text("Add");
		$('.table-donors').addClass('hidden');
		$('photograph').addClass('hidden');
		$('.cancel-edit').addClass('hidden');
		$('.tags-header').removeClass('hidden');
		$('.tag').removeClass('hidden');
		$('.author-photographer-director').removeClass('hidden');
		$('.co-author').removeClass('hidden');
		$('#add-producer-button').removeClass('hidden');
		$('#add-co-author-button').removeClass('hidden');
		$('.publisher-field').removeClass('hidden');
		$('.acquisition-field').removeClass('hidden');
		$('.publish-radio').removeClass('hidden');
		$('.acquisition-radio').removeClass('hidden');
		$('#edit-button').addClass('hidden');
		$('.tables').addClass('hidden');
		$('.view-button-close').addClass('hidden');
		$('#material-reset').removeClass('hidden');
		$('#material-submit').removeClass('hidden');
		$('.donated-div').addClass('hidden');
		$('.purchased-div').addClass('hidden');			
		$('input').each(function(){
			$(this).prop('disabled', false);	
			if($(this).attr('name') == '_token' || $(this).attr('name') == 'size-type'
			|| $(this).attr('name') == 'duration-type' || $(this).attr('name') == 'material-acqNumber' || $(this).attr('name') == 'pic'){
			}
			else{
				$(this).prop('checked', false);
				$(this).val('');
				$('select').prop('selectedIndex', 0);
			}
		});
		$('select').prop('disabled', false);		
	});

	$('#material-modal').on('show.bs.modal', function (){
		$('#add-material-button').prop('disabled', true);
	});

	$('#material-modal').on('hide.bs.modal', function (){
		$('#add-material-button').prop('disabled', false);
	});

	var selectValue = "";
	$('#category').click(function(){
		$('input').each(function(){
			if($(this).attr('name') == '_token' || $(this).attr('name') == 'size-type' || $(this).attr('name') == 'duration-type' || $(this).attr('name') == 'material-acqNumber'){
			}
			else{
				num = 1;
				prodNum = 1;
				tagNum = 1;			
			}
		});

		// removing authors
		for(i=1;i<=authorCounter;i++){
			$('.delete-author').trigger('click');
		}
		// removing tags		
		for(j=1;j<=tagCounter;j++){
			$('.remove-tag').trigger('click');
		}
		for(i=1;i<prodCounter;i++){
			$('.delete-prod').trigger('click');
		}

		selectValue = $('select').val();
		
		if(selectValue == 'Thesis'){
			$('.thesis').removeClass('hidden');
		}
		else{			
			$('.thesis').addClass('hidden');
		}

		if(selectValue == 'Photographs'){
			$('.multimedia').addClass('hidden');
			$('.photograph').removeClass('hidden');
			$('.add-co-author').addClass('hidden');
			$('.author-photographer-director').text('Photographer');
			$('.photograph').removeClass('hidden');
			$('.add-co-author').addClass('hidden');
			$('.add-producer').addClass('hidden');

		}
		else if(selectValue == 'Compact Discs' || selectValue == 'Digital Versatile Discs' 
		|| selectValue == 'Video Home Systems' || selectValue == 'Cassette Tapes'){
			$('.multimedia').removeClass('hidden');
			$('.author-photographer-director').text('Directors');
			$('.add-producer').removeClass('hidden');
			$('#add-co-author-button').text('Add Director');
			$('.multimedia').removeClass('hidden');
			$('.photograph').addClass('hidden');
			$('.add-co-author').removeClass('hidden');			
			$('.author-photographer-director').text('Director');
		}
		else{
			$('.add-producer').addClass('hidden');
			$('.photograph').addClass('hidden');
			$('.multimedia').addClass('hidden');
			$('.add-co-author').removeClass('hidden');
			$('.author-photographer-director').text('Authors');
			$('#add-co-author-button').text('Add Author');
		}
	});

	var pubStatus = "";
	$('.publish-status').click(function(){
		pubStatus = $.trim($(this).parent().text());
		if($.trim($(this).parent().text()) == "Published"){
			$(this).val('published');
			$('.published-div').removeClass('hidden');
		}
		else{
			$('.published-div').addClass('hidden');
			$(this).val('unpublished');
		}
	});

	var acquisitionMode = "";
	$('.acquisition-mode').click(function (){
		acquisitionMode = $.trim($(this).parent().text());
		if(acquisitionMode == "Purchased"){
			$(this).val('purchased');
			$('.donated-div').addClass('hidden');
			$('.purchased-div').removeClass('hidden');
		}
		else if(acquisitionMode == 'Donated'){
			$(this).val('donated');
			$('.donated-div').removeClass('hidden');
			$('.purchased-div').addClass('hidden');				
		}
	});

	$(".duration-dropdown").on('click', 'li a', function(){
		$('.duration-type').html($(this).text() + ' <span class="caret"></span>');
		$('#duration-type').val($(this).text());
	});

	$(".size-dropdown").on('click', 'li a', function(){
		$('.size-type').html($(this).text() + ' <span class="caret"></span>');
		$('#size-type').val($(this).text());
	});

	$('#material-reset').click(function(){
		num = 1;
		prodNum = 1;
		tagNum = 1;
		pubStatus = "";
		acquisitionMode = "";
		$('.material-form').trigger('reset');
		$('.purchased-div').addClass('hidden');
		$('.donated-div').addClass('hidden');
		$('.published-div').addClass('hidden');
		$('.help-block').addClass('hidden');
		$('.thesis').addClass('hidden');
		$('.author-photographer-director').text('Author');
		$('#add-co-author-button').text('Add Co Author');
		$('.add-producer').addClass('hidden');
		$('.photograph').addClass('hidden');
		$('.multimedia').addClass('hidden');
		// removing authors
		for(i=1;i<=authorCounter;i++){
			$('.delete-author').trigger('click');
		}
		// removing producers
		for(i=1;i<prodCounter;i++){
			$('.delete-prod').trigger('click');
		}
		// removing tags		
		for(j=1;j<=tagCounter;j++){
			$('.remove-tag').trigger('click');			
		}
	});

	var authorCounter = 0;
	$('#add-co-author-button').click(function(){
		authorCounter++;
	});

	var prodCounter = 0;
	$('#add-producer-button').click(function(){
		prodCounter++;
	});

	var tagCounter = 0;
	$('#add-tag').click(function(){
		tagCounter++;
	});

	var accessionCheck = null;

	$('#material-submit').click(function(){
		var YearPattern = new RegExp(/^(\d{4})$/);
		var errorCounter = 0;
		var category = selectValue;
		if(category == ""){
			$('.select-help').removeClass('hidden');
			$('.select-help strong').text('The category field is required.');
			errorCounter++;
		}

		var acqNumber = $('#acqNumber').val();
		acqNumber = $.trim(acqNumber);

		if(acqNumber == ""){
			$('.acqNumber-help').removeClass('hidden');
			$('.acqNumber-help strong').text('The acession number is required.');
			errorCounter++;
		}
		else if(acqNumber.length > 50){
			$('.acqNumber-help').removeClass('hidden');
			$('.acqNumber-help strong').text('The accession number should not exceed 50 characters.');
			errorCounter++;
		}



		var title = $('#title').val();
		title = $.trim(title);
		if(title == ""){
			$('.title-help').removeClass('hidden');
			$('.title-help strong').text('The title field is required.');
			errorCounter++;
		}
		else if(title.length > 50){
			$('.title-help').removeClass('hidden');
			$('.title-help strong').text('The title field should not exceed 50 characters.');
			errorCounter++;	
		}
		else{
			$('.title-help').addClass('hidden');
		}

		if(category == 'Thesis'){
			var school = $('#school').val();
				school = $.trim(school);

				if(school == ''){
					$('.school-help').removeClass('hidden');
					$('.school-help strong').text('The school field is required.');
					errorCounter++;
				}
				else if(school.length > 50){
					$('.school-help').removeClass('hidden');
					$('.school-help strong').text('The school field should not exceed 50 characters.');
					errorCounter++;			
				}
				else{
					$('.school-help').addClass('hidden');
				}

				var course = $('#course').val();
				course = $.trim(course);

				if(course == ''){
					$('.course-help').removeClass('hidden');
					$('.course-help strong').text('The course field is required.');
					errorCounter++;
				}
				else if(course.length > 50){
					$('.course-help').removeClass('hidden');
					$('.course-help strong').text('The course field should not exceed 50 characters.');
					errorCounter++;			
				}
				else{
					$('.course-help').addClass('hidden');
				}
		}

		nameArray=[];
		authorArray=[];

		var name = '';
		if(category != 'Compact Discs' && category != 'Digital Versatile Discs' && category != 'Video Home Systems' && category != 'Cassette Tapes'){
			name = 'author';
		}
		else{
			name = 'director';
			var hour =$('#hours').val();
			var minute = $('#minutes').val();
			var second = $('#seconds').val();
			var minutePattern = new RegExp(/^(\d)*$/,'g');
			var hourPattern = new RegExp(/^(\d)*$/,'g');
			var secondPattern = new RegExp(/^(\d)*$/,'g');
			var minuteValue = minutePattern.test(minute);		
			var hourValue = hourPattern.test(hour);
			var secondValue = secondPattern.test(second);

		producerArray=[];
		nameArray=[];
		$('.prod').each(function(){
			if($(this).children('.prod-firstnames').children().children('input').val() == ''){
				$(this).children('.prod-firstnames').children('span').removeClass('hidden');
				$(this).children('.prod-firstnames').children('span').children('strong').text('The first name of the producer is required.');
				errorCounter++;
			}
			else if($(this).children('.prod-firstnames').children().children('input').val() >= 50){
				$(this).children('.prod-firstnames').children('span').removeClass('hidden');
				$(this).children('.prod-firstnames').children('span').children('strong').text('The first name of the producer should not exceed 50 characters.');
			}
			else{
				$(this).children('.prod-firstnames').children('span').addClass('hidden');
				nameArray.push($(this).children('.prod-firstnames').children().children('input').val());
			}
			if($(this).children('.prod-middlenames').children().children('input').val() == ''){
				$(this).children('.prod-middlenames').children('span').removeClass('hidden');
				$(this).children('.prod-middlenames').children('span').children('strong').text('The middle name of the producer is required.');
				errorCounter++;				
			}
			else if($(this).children('.prod-middlenames').children().children('input').val() >= 50){
				$(this).children('.prod-middlenames').children('span').removeClass('hidden');
				$(this).children('.prod-middlenames').children('span').children('strong').text('The middle name of the producer should not exceed 50 characters.');
				errorCounter++;
			}
			else{
				$(this).children('.prod-middlenames').children('span').addClass('hidden');
				nameArray.push($(this).children('.prod-middlenames').children().children('input').val());
			}
			if($(this).children('.prod-lastnames').children().children('input').val() == ''){
				$(this).children('.prod-lastnames').children('span').removeClass('hidden');
				$(this).children('.prod-lastnames').children('span').children('strong').text('The last name of the producer is required.');
				errorCounter++;				
			}
			else if($(this).children('.prod-lastnames').children().children('input').val() >= 50){
				$(this).children('.prod-lastnames').children('span').removeClass('hidden');
				$(this).children('.prod-lastnames').children('span').children('strong').text('The last name of the producer should not exceed 50 characters.');
				errorCounter++;
			}
			else{
				$(this).children('.prod-lastnames').children('span').addClass('hidden');
				nameArray.push($(this).children('.prod-lastnames').children().children('input').val());
			}			
		});
		producerArray.push(nameArray);
		nameArray=[];
		$('#producers').val(producerArray);

			if(hour=='' && minute =='' && second == ''){
				$('.duration-help').removeClass('hidden');
				$('.duration-help strong').text('The duration field is required.');
				errorCounter++;			
			}
			else{
				$('.duration-help').addClass('hidden');
			}

			if(hour == ''){
				hour = 0;
			}
			else if(hourValue == false){
				$('.hour-help').removeClass('hidden');
				$('.hour-help strong').text('The hour field is in incorrect format.');
				errorCounter++;		
			}
			else if(hour.length >4){
				$('.hour-help').removeClass('hidden');
				$('.hour-help strong').text('The hour field should not exceed 4 characters.');
				errorCounter++;
			}
			else{
				$('.hour-help').addClass('hidden');
			}

			if(minute == ''){
				minute = 0;
				$('#minutes').val(minute);
			}
			else if(minuteValue == false){
				$('.minute-help').removeClass('hidden');
				$('.minute-help strong').text('The minute field is in incorrect format.');
				errorCounter++;			
			}
			else if(minute.length >4){
				$('.minute-help').removeClass('hidden');
				$('.minute-help strong').text('The minute field should not exceed 4 characters.');
				errorCounter++;			
			}
			else{
				$('.minute-help').addClass('hidden');
			}

			if(second == ''){
				second = 0;
				$('#seconds').val(second);
			}
			else if(secondValue == false){
				$('.second-help').removeClass('hidden');
				$('.second-help strong').text('The second field is in incorrect format.');
				errorCounter++;			
			}
			else if(second.length >4){
				$('.second-help').removeClass('hidden');
				$('.second-help strong').text('The second field should not exceed 4 characters.');
				errorCounter++;			
			}
			else{
				$('.second-help').addClass('hidden');
			}		

			hour = parseInt(hour);
			minute = parseInt(minute);
			second = parseInt(second);
			if(hourValue == true && minuteValue == true && secondValue == true){
				if(second>=60){
					tempSecond = second % 60;
					$('#seconds').val(tempSecond);
					tempMin = ~~(second / 60);
					minute += tempMin;
					$('#minutes').val(minute);
				}
				if(minute>=60){
					tempMinute = minute % 60;
					$('#minutes').val(tempMinute);
					tempHour = ~~(minute / 60);
					hour += tempHour;
					$('#hours').val(hour);
				}
			}			
		}
		if(category == 'Photographs'){
			name = 'photographer';
			var size = $('#size').val();
			size = $.trim(size);
			sizePattern = new RegExp(/^(\d)+$/, "g");
			sizeValue = sizePattern.test(size);

			if(sizeValue == false){
				$('.size-help').removeClass('hidden');
				$('.size-help strong').text('The format of size field is incorrect.');
				errorCounter++;				
			}
			else if(sizeValue.length > 40){
				$('.size-help').removeClass('hidden');
				$('.size-help strong').text('The size field should not exceed 40 characters.');
				errorCounter++;			
			}
			else{
				$('.size-help').addClass('hidden');
			}

			var photographYear = $('#year').val();
			photographYear = $.trim(photographYear);
			photographYearValue = YearPattern.test(photographYear);
			if(photographYear == ''){
				$('.year-help').removeClass('hidden');
				$('.year-help strong').text('The year field is required.');
				errorCounter++;			
			}
			else if(photographYearValue == false){
				$('.year-help').removeClass('hidden');
				$('.year-help strong').text('The format of year field is incorrect.');
				errorCounter++;
			}			
		}
		$('.co-author').each(function(){
				if($(this).children('.firstnames').children().children("input").val() == ""){
					$(this).children('.firstnames').children('span').removeClass('hidden');
					$(this).children('.firstnames').children('span').children('strong').text('The first name of the ' + name  +' is required.');
					errorCounter++;
				}
				else if($(this).children('.firstnames').children().children("input").val().length >=50){
					$(this).children('.firstnames').children('span').removeClass('hidden');
					$(this).children('.firstnames').children('span').removeClass('hidden');
					$(this).children('.firstnames').children('span').children('strong').text('The first name field should not exceed 50 characters.');
					errorCounter++;								
				}
				else{
					$(this).children('.firstnames').children('span').addClass('hidden');
					nameArray.push($(this).children('.firstnames').children().children("input").val());
				}
				if($(this).children('.middlenames').children().children("input").val() == ""){
					$(this).children('.middlenames').children('span').removeClass('hidden');
					$(this).children('.middlenames').children('span').children('strong').text('The middle name of the ' + name  +' is required.');
					errorCounter++;
				}
				else if($(this).children('.middlenames').children().children("input").val().length >=50){
					$(this).children('.middlenames').children('span').removeClass('hidden');
					$(this).children('.middlenames').children('span').removeClass('hidden');
					$(this).children('.middlenames').children('span').children('strong').text('The middle name field should not exceed 50 characters.');
					errorCounter++;			
				}
				else{
					$(this).children('.middlenames').children('span').addClass('hidden');
					nameArray.push($(this).children('.middlenames').children().children("input").val());
				}
				if($(this).children('.lastnames').children().children("input").val() == ""){
					$(this).children('.lastnames').children('span').removeClass('hidden');
					$(this).children('.lastnames').children('span').children('strong').text('The last name of the ' + name  +' is required.');
					errorCounter++;
				}
				else if($(this).children('.lastnames').children().children("input").val().length >=50){
					$(this).children('.lastnames').children('span').removeClass('hidden');
					$(this).children('.lastnames').children('span').children('strong').text('The last name field should not exceed 50 characters.');
					errorCounter++;
				}
				else{
					$(this).children('.lastnames').children('span').addClass('hidden');
					nameArray.push($(this).children('.lastnames').children().children("input").val());
				}					
		});
		
		tagArray=[];
		$('#authors').val(nameArray);
		$('.tag').each(function(){
			if($(this).children().children('input').val() == ''){
			}
			else{
				tagArray.push($(this).children().children('input').val());
			}
			if($(this).children().children('input').val().length >= 50){
				$(this).children('span').removeClass('hidden');
				$(this).children('span').children('strong').text('The tag field should not exceed 50 characters.');
				errorCounter++;
			}
			else{
				$(this).children('span').addClass('hidden');
			}
		});
		$('#tags').val(tagArray);
		if(pubStatus.length == 0){
			$('.publish-status-help strong').text('The publish field is required.');
			$('.publish-status-help').removeClass('hidden');
			errorCounter++;
		}
		else{
			$('.publish-status-help').addClass('hidden');
			if(pubStatus == 'Published'){
				if($('#publisher').val() == ""){
					$('.pub-help strong').text('The publisher field is required.');
					$('.pub-help').removeClass('hidden');
					errorCounter++;
				}
				else if($('#publisher').val().length > 50){
					$('.pub-help strong').text('The publisher field should not exceed 50 characters.');
					$('.pub-help').removeClass('hidden');
					errorCounter++;					
				}
				else{
					$('.pub-help').addClass('hidden');
				}
				publishedYearValue = YearPattern.test($('#published-year').val());
				if($('#published-year').val() == ""){
					$('.year-help strong').text('The year field is required.');
					$('.year-help').removeClass('hidden');
					errorCounter++;
				}
				else if(publishedYearValue == false){
					$('.year-help strong').text('The year field should only be four digits.');
					$('.year-help').removeClass('hidden');
					errorCounter++					
				}
				else{
					$('.year-help').addClass('hidden');
				}

				if($('#place').val() == ""){
					$('.place-help strong').text('The place field is required.');
					$('.place-help').removeClass('hidden');
					errorCounter++;
				}
				else{
					$('.place-help').addClass('hidden');
				}
			}
			else if(pubStatus == 'Unpublished'){
				$('#published-year').val('');
			}
		}
				

		if(acquisitionMode.length == 0){
			$('.acquisition-mode-help strong').text('The mode of acquisition field is required.');
			$('.acquisition-mode-help').removeClass('hidden');
			errorCounter++;
		}
		else{
			$('.acquisition-mode-help').addClass('hidden');
			if(acquisitionMode == 'Donated'){
				$('#amount').val('');
				$('#purchased-year').val('');
				$('#address').val('');

				if($('#donor-firstname').val() == ""){
					$('.donor-first-name-help strong').text('The first name field is required.');
					$('.donor-first-name-help').removeClass('hidden');
					errorCounter++;
				}
				else if($('#donor-firstname').val().length >50){
					$('.donor-first-name-help strong').text('The first name field should not exceed 50 characters.');
					$('.donor-first-name-help').removeClass('hidden');
					errorCounter++;					
				}
				else{
					$('.donor-first-name-help').addClass('hidden');
				}
				if($('#donor-middlename').val() == ""){
					$('.donor-middle-name-help strong').text('The middle name field is required.');
					$('.donor-middle-name-help').removeClass('hidden');
					errorCounter++;		
				}
				else if($('#donor-middlename').val().length >50){
					$('.donor-middle-name-help strong').text('The middle name field should not exceed 50 characters.');
					$('.donor-middle-name-help').removeClass('hidden');
					errorCounter++;					
				}				
				else{
					$('.donor-middle-name-help').addClass('hidden');
				}
				if($('#donor-lastname').val() == ""){
					$('.donor-last-name-help strong').text('The last name field is required.');
					$('.donor-last-name-help').removeClass('hidden');
					errorCounter++;
				}
				else if($('#donor-lastname').val().length >50){
					$('.donor-last-name-help strong').text('The last name field should not exceed 50 characters.');
					$('.donor-last-name-help').removeClass('hidden');
					errorCounter++;					
				}					
				else{
					$('.donor-last-name-help').addClass('hidden');
				}
				donatedYearValue = YearPattern.test($('#donated-year').val());
				if($('#donated-year').val() == ""){
					$('.donor-year-help strong').text('The year field is required.');
					$('.donor-year-help').removeClass('hidden');
					errorCounter++;
				}
				else if(donatedYearValue == false){
					$('.donor-year-help strong').text('The year field should only be four digits.');
					$('.donor-year-help').removeClass('hidden');
					errorCounter++;					
				}
				else{
					$('.donor-year-help').addClass('hidden');
				}
			}
			else if(acquisitionMode == 'Purchased'){
				$('#donor-firstname').val('');
				$('#donor-middlename').val('');
				$('#donor-lastname').val('');
				$('#donated-year').val('');
				amountPattern = new RegExp(/^[\d,]*(\.\d*)?$/,"g");
				amountValue = amountPattern.test($('#amount').val());				
				if($('#amount').val() ==""){
					$('.amount-help strong').text('The amount field is required.');
					$('.amount-help').removeClass('hidden');
					errorCounter++;				
				}
				else if(amountValue == false){
					$('.amount-help strong').text('Incorrect format for amount.');
					$('.amount-help').removeClass('hidden');
					errorCounter++;					
				}
				else  if(amountValue.length > 40){
					$('.amount-help strong').text('The amount field should not exceed 40 characters.');
					$('.amount-help').removeClass('hidden');
					errorCounter++;					
				}
				else{
					$('.amount-help').addClass('hidden');
				}

				purchasedYearValue = YearPattern.test($('#purchased-year').val());				
				if($('#purchased-year').val() ==""){
					$('.purchased-year-help strong').text('The year field is required.');
					$('.purchased-year-help').removeClass('hidden');
					errorCounter++;					
				}
				else if(purchasedYearValue == false){
					$('.purchased-year-help strong').text('The year field should be 4 digits.');
					$('.purchased-year-help').removeClass('hidden');
					errorCounter++;					
				}
				else{
					$('.purchased-year-help').addClass('hidden');
				}
				if($('#address').val() ==""){
					$('.purchased-address-help strong').text('The address field is required.');
					$('.purchased-address-help').removeClass('hidden');
					errorCounter++;					
				}
				else{
					$('.purchased-address-help').addClass('hidden');
				}								
			}
		}

			var change = true;
			if($('#material-submit').text() != 'Save changes'){
				change = false;
			}
			function checkAcq(){
				return $.ajax({
					type: 'GET',
					url: 'material/check/' + acqNumber + '/' + aqoh + '/' + change,
					success: function(data){
						accessionCheck = data.accessionNumber;
						change = data.params;
						if(accessionCheck == null){
							$('.acqNumber-help').addClass('hidden');
							errorCounter++;
						}
						else{
							$('.acqNumber-help').removeClass('hidden');
							$('.acqNumber-help strong').text('The accession number ' + acqNumber + ' already exists.');					
							errorCounter++;
						}
					}
				});			
			}
			if(errorCounter == 0){
				checkAcq().done(function(r){
					$("body").css("cursor", "default");
					if(r.accessionNumber != null){
						return false;
					}
					else{
						$('#material-submit').text('Adding');
						$('#material-reset').prop('disabled', true);
						$('#material-submit').prop('disabled', true);
						$("body").css("cursor", "wait");
						$('.material-form').submit();
					}
				}).
				fail(function(x){
					return false;
				});	
			}
			else{
				return false;
			}
			return false;				



	});

	var num = 1;
	var headType = "Author";
	$('#add-co-author-button').click(function(){
		if(selectValue == 'Compact Discs' || selectValue == 'Digital Versatile Discs' 
		|| selectValue == 'Video Home Systems' || selectValue == 'Cassette Tapes'){
			headType = 'Director';
		}
		else{
			headType = 'Co Author';
		}
		var newAuthor = $(document.createElement('div')).attr('class', 'form-group co-author');
		newAuthor.after().html(
			"<span class='firstnames'>" +
			"<div class='input-group'>"+
				"<span class='input-group-addon label-title'>First Name</span>" +
				"<input type='text' id='author-firstname' class='form-control' placeholder='Jose' name='author-firstname'/>" +
			"</div>" +
			"<span class='author-firstname-help help-block hidden'>" +
				"<strong></strong>" +
			"</span>" +
			"</span>" +
			"<span class='middlenames'>" +
			"<div class='input-group'>"+
				"<span class='input-group-addon label-title'>Middle Name</span>" +
				"<input type='text' id='author-middlename' class='form-control' placeholder='Salazar' name='author-middlename'/>" +
			"</div>" +
			"<span class='author-middlename-help help-block hidden'>" +
				"<strong></strong>" +
			"</span>" +
			"</span>" +
			"<span class='lastnames'>" +
			"<div class='input-group'>"+
				"<span class='input-group-addon label-title'>Last Name</span>" +
				"<input type='text' id='author-lastname' class='form-control' placeholder='Rizal' name='author-lastname'/>" +
			"</div>" +
			"<span class='author-lastname-help help-block hidden'>" +
				"<strong></strong>" +
			"</span>" +
			"</span>" +
			"<button type='button' class='btn btn-danger co-author-button delete-author'>Delete " + headType + "</button>"
		);
		$('.add-co-author').append(newAuthor);
		num++;
	});

	var tagNum = 1;
	$('#add-tag').click(function(){
		var newTag = $(document.createElement('div')).attr('class', 'tag');
		newTag.after().html(
			"<div class='input-group'>"  +
			"<span class='input-group-addon label-title'>Tag</span>" +
			"<input type='text' id='tag' class='form-control' placeholder='Computer Science' name='tag'/>" +				
			"<span class='input-group-btn'>" +
				"<button type='button' class='btn btn-secondary remove-tag'>" +
					"<span class='glyphicon glyphicon-minus'></span>" +
				"</button>" +
			"</span>" +
			"</div>" +
			"<span class='tag-help help-block hidden'>" +"<strong></strong>" +"</span>"			
		);
		$('.tags').append(newTag);
		tagNum++;
	});

	var prodNum = 1;
	$('body').on('click', '#add-producer-button', function(){
		var newProducer = $(document.createElement('div')).attr('class', 'form-group prod');
		newProducer.after().html(
			"<span class='prod-firstnames'>" +
			"<div class='input-group'>"+
				"<span class='input-group-addon label-title'>First Name</span>" +
				"<input type='text' id='prod-firstname' class='form-control' placeholder='Jose' name='prod-firstname'/>" +
			"</div>" +
			"<span class='prod-firstname-help help-block hidden'>" +
				"<strong></strong>" +
			"</span>" +
			"</span>" +
			"<span class='prod-middlenames'>" +
			"<div class='input-group'>"+
				"<span class='input-group-addon label-title'>Middle Name</span>" +
				"<input type='text' id='prod-middlename' class='form-control' placeholder='Salazar' name='prod-middlename'/>" +
			"</div>" +
			"<span class='prod-middlename-help help-block hidden'>" +
				"<strong></strong>" +
			"</span>" +
			"</span>" +
			"<span class='prod-lastnames'>" +
			"<div class='input-group'>"+
				"<span class='input-group-addon label-title'>Last Name</span>" +
				"<input type='text' id='prod-lastname' class='form-control' placeholder='Rizal' name='prod-lastname'/>" +
			"</div>" +
			"<span class='prod-lastname-help help-block hidden'>" +
				"<strong></strong>" +
			"</span>" +
			"</span>" +
			"<button type='button' class='btn btn-danger co-author-button delete-prod'>Delete Producer</button>"			
		);
		$('.prod-head').after().append(newProducer);
		prodNum++;	
	});

	$('body').on('click', '.delete-author', function(){
		$(this).parent().remove();
		num--;
	});

	$('body').on('click', '.remove-tag', function(){
		$(this).parent().parent().parent().remove();
		tagNum--;
	});

	$('body').on('click', '.delete-prod', function(){
		$(this).parent().remove();
		prodNum--;
	});

	//  end of add material script

	// edit script

	$('.material-close').click(function(){
		$('#material-submit').text('Add');
		$('.add-producer').addClass('hidden');
		$('#material-reset').trigger('click');	
		for(i=0;i<tableAuthorCounter;i++){
			$('.table-authors').children().remove();
		}
		for(i=0;i<tableTagsCounter;i++){
			$('.table-tags').children().remove();
		}
		for(i=0;i<tableProducerCounter;i++){
			$('.table-producers').children().remove();
		}
		$('.tags-header').removeClass('hidden');
		$('.cancel-edit').trigger('click');
		$('.search').prop('disabled', false);
	});

	$('.view-button-close').click(function(){
		$('.material-close').trigger('click');
	});

	var tableAuthorCounter = 0;
	var tableTagsCounter = 0;
	var tableProducerCounter= 0;
	var category ='';
	var acqNumber ='';
	var title = '';
	var tagsArray = [];
	var authorsArray = [];
	var publisher_name ='';
	var publisher_year= '';
	var publisher_place = '';
	var amount = '';
	var purchased_year = '';
	var address = '';
	var donor_firstname ='';
	var donor_middlename ='';
	var donor_lastname ='';		
	var donor_year ='';
	var course ='';
	var school ='';
	var photo_firstname = '';
	var photo_middlename = '';
	var photo_lastname = '';
	var photo_size ='';
	var photo_type ='MB';
	var photo_description = '';
	var duration ='';
	var durationArray = [];
	var directorsArray = [];
	var producersArray = [];
	var length = 0;
	var arrays = [];
	var aqoh = 0;

	function addViewCount(acqNumber){
		return $.ajax({
			headers:{
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			type: 'post',
			url: '/dashboard/addViewCount/' + acqNumber
		});
	}

	$('body').on('click', '.material-view-button', function(){
		$('.modal-title').text('View Material');
		$('.view-button-close').removeClass('hidden');
		$('#material-reset').addClass('hidden');
		$('#material-submit').addClass('hidden');
		$('.co-author').addClass('hidden');
		$('#add-co-author-button').addClass('hidden');
		$('.acquisition-radio').addClass('hidden');
		$('.tables').removeClass('hidden');
		$('.tag').addClass('hidden');
		$('#edit-button').removeClass('hidden');
		var material_id = $(this).find('input').val();
		$("body").css("cursor", "wait");
		$.ajax({
			async: true,			
			headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			
			type: "GET",
			
			url: 'material/' + material_id,
			success: function (data) {

			addViewCount(data.acqNumber);

			function checkBorrowed(){
				return $.ajax({
					type: 'GET',
					url: '/dashboard/check/borrowed/' + material_id,
					success: function(data){
					}
				});				
			}
			if($('#user-type').val() == 'student'){
				checkBorrowed().done(function(r){
					if(r.acq_count == 1){
						$('.tool-tip').tooltip('hide')
						          .attr('data-original-title', 'You have already borrowed this material.')
						          .tooltip('fixTitle');
					}
					if(r.user_borrowed_count >= 3){
						$('.tool-tip').tooltip('hide')
						          .attr('data-original-title', 'You can only borrow up to three materials.')
						          .tooltip('fixTitle');			
					}
					if(r.user_borrowed_count < 3 && r.acq_count == 0){
						$('.borrow-button').prop('disabled', false);
						$('.tool-tip').tooltip('hide')
						          .attr('data-original-title', '')
						          .tooltip('fixTitle');				
					}
					else{
						$('.borrow-button').prop('disabled', true);				
					}
				});				
			}
			$("body").css("cursor", "default");
			category = data.category;
			acqNumber = data.acqNumber;
			aqoh = data.acqNumber;
			course = data.course;
			school = data.school;
			title = data.title;
			$('.material-acqNumber').text(title);
			$('#category').val(category);
			selectValue= $('#category').val(category);
			$('#acqNumber').val(acqNumber);
			$('.borrow-button').val(acqNumber);
			$('#title').val(title);
			authorsArray = data.authors;
			directorsArray = data.directors;
			producersArray = data.producers;
			tagsArray = data.tags;
			if(category == 'Thesis'){
				$('.thesis').removeClass('hidden');
				$('#school').val(school);
				$('#course').val(course);
			}
			else{
				$('.thesis').addClass('hidden');
			}

			if(category == 'Compact Discs' || category == 'Cassette Tapes' || category == 'Digital Versatile Discs' || category == 'Video Home Systems'){
				if(producersArray.length != 0){
					$('.add-producer').removeClass('hidden');
				}
				else{
					$('.add-producer').addClass('hidden');
				}
				$('.multimedia').removeClass('hidden');
				$('#add-producer-button').addClass('hidden');
				duration = data.duration;
				durationArray = duration.split(':');
				$('#hours').val(durationArray[0]);
				$('#minutes').val(durationArray[1]);
				$('#seconds').val(durationArray[2]);
				$('.author-photographer-director').text('Directors');
				for(i=0, j=0;i<(producersArray.length/3);i++, j+=3){
					var newProd = $(document.createElement('tr'));
					newProd.after().html(
						"<td>" + producersArray[j] + " " + producersArray[j+1] + " " + producersArray[j+2] + "</td>"
					);
					$('.table-producers').append(newProd);
					tableProducerCounter++;	
				}
			}
			else{
				$('.add-producer').addClass('hidden');
			}
			if(authorsArray.length==0){
				length = directorsArray.length;
				arrays = directorsArray;
			}
			else{
				length = authorsArray.length;
				arrays = authorsArray;
			}
			for(i=0, j=0;i<(length/3);i++, j+=3){
				var newAuthor = $(document.createElement('tr'));
				newAuthor.after().html(
					"<td>" + arrays[j] + " " + arrays[j+1] + " " + arrays[j+2] + "</td>"
				);
				$('.table-authors').append(newAuthor);
				tableAuthorCounter++;	
			}
			if(tagsArray.length == 0){
				$('.tags-header').addClass('hidden');
			}
			for(i=0;i<tagsArray.length;i++){
				var newTag = $(document.createElement('tr'));
				newTag.after().html(
					"<td>" + tagsArray[i] + "</td>"
				);
				$('.table-tags').append(newTag);
				tableTagsCounter++;
			}
			if(data.publisher_name == ''){
				$('.borrow-button').addClass('hidden');
				$('.publisher-field').addClass('hidden');
				publisher_name = '';
				publisher_year = '';
				publisher_place = '';
			}
			else{
				$('.borrow-button').removeClass('hidden');
				publisher_name = data.publisher_name;
				publisher_year = data.publisher_year;
				publisher_place = data.publisher_place;
				$('.publisher-field').removeClass('hidden');
				$('.published-div').removeClass('hidden');
				$('.publish-radio').addClass('hidden');
				$('#publisher').val(publisher_name);
				$('#published-year').val(publisher_year);
				$('#place').val(publisher_place);
			}
			if(data.donor_year == ''){
				amount = data.purchased_amount;
				purchased_year = data.purchased_year;
				address = data.purchased_address;
				donor_firstname='';
				donor_middlename='';
				donor_lastname='';								
				donor_year='';
				$('.purchased-div').removeClass('hidden');
				$('.table-donors').addClass('hidden');
				$('.purchased-div').removeClass('hidden');
				$('#amount').val(data.purchased_amount);
				$('#purchased-year').val(purchased_year);
				$('#address').val(address);
			}
			else{
				amount ='';
				purchased_year = '';
				address = '';				
				donor_firstname = data.donor_firstname;
				donor_middlename = data.donor_middlename;
				donor_lastname = data.donor_lastname;
				donor_year = data.donor_year;
				$('#donor-firstname').val(donor_firstname);
				$('#donor-middlename').val(donor_middlename);
				$('#donor-lastname').val(donor_lastname);
				$('#donated-year').val(donor_year);
				$('.purchased-div').addClass('hidden');
				$('.table-donors').removeClass('hidden');				
				$('.td-donor').text(donor_firstname + ' ' + donor_middlename + ' ' + donor_lastname);
				$('.td-year').text(donor_year);
			}
			if(category=='Photographs'){
				$('.photograph').removeClass('hidden');
				photo_firstname = data.photo_firstname;
				photo_middlename = data.photo_middlename;
				photo_lastname = data.photo_lastname;
				photo_size = data.photo_size;
				photo_description = data.photo_description;
				photo_type = data.photo_type;
				photo_year = data.photo_year;

				$('.author-photographer-director').text('Photographer');
				var newPhotographer = $(document.createElement('tr'));
				newPhotographer.after().html(
					"<td>" + photo_firstname + " " + photo_middlename + " " + photo_lastname + "</td>"
				);
				$('.table-authors').append(newPhotographer);
				tableAuthorCounter++;
				$('#size').val(photo_size);
				$('#year').val(photo_year);
				$('.size-type').prop('disabled', true);
				$('.size-type').append().html(photo_type + " <span class='caret'></span>");
				$('#description').prop('disabled', true);
				$('#description').val(photo_description);
			}
			else{
				$('.photograph').addClass('hidden');
			}
			$('input').each(function(){
			if($(this).attr('name') == '_token' || $(this).attr('name') == 'material-acqNumber'){
			}
			else{
				$(this).prop('disabled', true);
			}		
			});
			$('select').prop('disabled', true);
			},
			
			error: function (data) {
			}			
		});
	});

	$('#edit-button').click(function(){
		num=1;
		tagNum=1;
		$('#description').prop('disabled', false);
		$('.cancel-edit').removeClass('hidden');
		$('#edit-button').addClass('hidden');
		$('.author-table').addClass('hidden');
		$('.table-donors').addClass('hidden');
		$('.table-tags').addClass('hidden');
		$('select').prop('disabled', false);
		$('#add-co-author-button').removeClass('hidden');
		$('.view-button-close').addClass('hidden');		
		$('#material-submit').removeClass('hidden');
		$('#material-reset').removeClass('hidden');
		$('.view-button-close').addClass('hidden');
		$('.tag').removeClass('hidden');
		$('.co-author').removeClass('hidden');
		$('.publisher-field').removeClass('hidden');
		$('.publish-radio').removeClass('hidden');
		$('.acquisition-field').removeClass('hidden');
		$('.acquisition-radio').removeClass('hidden');
		$('.size-type').prop('disabled', false);
		$('input').each(function(){
			$(this).prop('disabled', false);
		});

		$('#material-submit').text('Save changes');

		$('.material-form').attr('action', 'http://localhost:8000/edit/material/' + acqNumber);

		if(category == 'Compact Discs' || category == 'Cassette Tapes' || category == 'Digital Versatile Discs' || category == 'Video Home Systems'){
			$('#add-producer-button').removeClass('hidden');
			$('.producer-table').addClass('hidden');
			for(i=0, j=0;i<(producersArray.length)/3;i++, j+=3){
				if(i != (producersArray.length/3)){
					$('#add-producer-button').trigger('click');
				}
			}
			i = 0;
			$('.prod').each(function(){
				$(this).children('.prod-firstnames').children('.input-group').children('input').val(producersArray[i]);
				$(this).children('.prod-middlenames').children('.input-group').children('input').val(producersArray[i+1]);
				$(this).children('.prod-lastnames').children('.input-group').children('input').val(producersArray[i+2]);
			});
		}
		for(i=0, j=0;i<(length)/3;i++, j+=3){
			if(i != (length/3)-1){
				$('#add-co-author-button').trigger('click');
			}
		}
		i=0;

		$('.co-author').each(function(){
			$(this).children('.firstnames').children('.input-group').children('input').val(arrays[i]);
			$(this).children('.middlenames').children('.input-group').children('input').val(arrays[i+1]);
			$(this).children('.lastnames').children('.input-group').children('input').val(arrays[i+2]);
			i+=3;
		});

		if(category == 'Photographs'){
			$('.co-author').each(function(){
				$(this).children('.firstnames').children('.input-group').children('input').val(photo_firstname);
				$(this).children('.middlenames').children('.input-group').children('input').val(photo_middlename);
				$(this).children('.lastnames').children('.input-group').children('input').val(photo_lastname);
			});
		}

		for(i=1;i<tagsArray.length;i++){
			$('#add-tag').trigger('click');
		}

		i=0;
		$('.tag').each(function(){
			$(this).children('.input-group').children('input').val(tagsArray[i]);
			i++;
		});

		if(publisher_year != ''){
			$('.published').trigger('click');
		}
		else{
			$('.unpublished').trigger('click');
		}
		if(donor_year != ''){
			$('.donated').trigger('click');
			$('.donated-div').removeClass('hidden');
			$('#donor-firstname').val(donor_firstname);
			$('#donor-middlename').val(donor_middlename);
			$('#donor-lastname').val(donor_lastname);
			$('#donated-year').val(donor_year);			
		}
		else{
			$('.purchased').trigger('click');
			$('.purchased-div').removeClass('hidden');
			$('#amount').val(amount);
			$('#purchased-year').val(purchased_year);
			$('#address').val(address);		
		}	
	});

	$('.cancel-edit').click(function(){
		$('#material-submit').text('Add');
		if(category == 'Compact Discs' || category == 'Cassette Tapes' || category == 'Digital Versatile Discs' || category == 'Video Home Systems'){
			$('.author-photographer-director').text('Directors');
			$('.add-producer').removeClass('hidden');
			$('.producer-table').removeClass('hidden');
		}
		else if(category == 'Photographers'){
			$('.author-photographer-director').text('Photographer');
		}
		else{
			$('.author-photographer-director').text('Authors');
		}
		$('#add-producer-button').addClass('hidden');
		$('#description').prop('disabled', true);
		$('.size-type').prop('disabled', true);
		$('input').each(function(){
			if($(this).attr('name') == '_token' || $(this).attr('name') == 'material-acqNumber' || $(this).attr('name') == 'pic'){
			}
			else{
				$(this).prop('disabled', true);
			}
		});
		for(i=1;i<=authorCounter;i++){
			$('.delete-author').trigger('click');
		}
		for(i=1;i<=prodCounter;i++){
			$('.delete-prod').trigger('click');
		}		
		for(i=1;i<=tagCounter;i++){
			$('.remove-tag').trigger('click');
		}
		if(category != 'Thesis'){
			$('.thesis').addClass('hidden');
		}
		else{
			$('.thesis').removeClass('hidden');
		}
		if(category != 'Photographs'){
			$('.photograph').addClass('hidden');
		}
		else{
			$('.photograph').removeClass('hidden');
		}
		if(donor_year != ''){
			$('.table-donors').removeClass('hidden');
			$('.purchased-div').addClass('hidden');
		}
		else{
			$('.table-donors').addClass('hidden');
			$('.purchased-div').removeClass('hidden');
		}
		if(publisher_name != ''){
			$('.publisher-field').removeClass('hidden');
		}
		else{
			$('.publisher-field').addClass('hidden');
		}
		if(tagsArray.length != 0){
			$('.table-tags').removeClass('hidden');
		}
		$('.size-type').prop('disabled', true);
		$('.size-type').append().html(photo_type + " <span class='caret'></span>");		
		$('#material-reset').addClass('hidden');
		$('#material-submit').addClass('hidden');
		$('.view-button-close').removeClass('hidden');
		$('.donated-div').addClass('hidden');
		$('.acquisition-field').addClass('hidden');
		$('.acquisition-radio').addClass('hidden');
		$('.acquisition-field').addClass('hidden');		
		$('.publish-radio').addClass('hidden');		
		$('.co-author').addClass('hidden');
		$('.tag').addClass('hidden');
		$('#add-co-author-button').addClass('hidden');	
		$('.author-table').removeClass('hidden');
		$('select').prop('disabled', true);
		$('.cancel-edit').addClass('hidden');
		$('#edit-button').removeClass('hidden');
		$('#category').val(category);
		$('#acqNumber').val(acqNumber);
		$('#title').val(title);
		$('#school').val(school);
		$('#course').val(course);
		$('#hours').val(durationArray[0]);
		$('#minutes').val(durationArray[1]);
		$('#seconds').val(durationArray[2]);	
	});
	// end of edit script

	// delete script
	$('body').on('click', '.delete-button', function(){
		$('.delete-button').prop('disabled', true);
		$("body").css("cursor", "wait");
		material_id = $(this).val();
		function deleteMaterials(){
			return $.ajax({

				headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				
				type: "DELETE",
				
				url: 'material/delete/' + material_id,
				
				success: function (data) {
				},
				
				error: function (data) {
				}
			});
		}
		deleteMaterials().done(function(r){
			$("." + material_id).remove();
			$("body").css("cursor", "default");
			$('.delete-button').prop('disabled', false);			
			$('.success-close').trigger('click');
			if($('.material-items').children().length == 0){
				$('#no-materials').toggle(true);
			}
			else{
				$('#no-materials').toggle(false);
			}			
		}).
		fail(function(x){
		});		
	});

	// end of delete script

	// staff search material script

	$('.search-material-button').click(function(){
		$('.search').val('');
		$('.search-type').html('Title ' + "<span class='caret'></span>");
		$('.search-type').val('Title');
		searchType = 'Title';
		showMaterial(searchType);		
		$('.type-dropdown').removeClass('hidden');
		$('.borrowed-dropdown').addClass('hidden');	
		$('.material-table').removeClass('hidden');
		$('.confirm-material-table').addClass('hidden');
	});

	// end of staff search material script

	// borrow materials script

	if($('.borrowed-button').attr('disabled') !== undefined){
		$('.borrowed-div').tooltip('show')
		          .attr('data-original-title', 'Please confirm your account at the staff to borrow materials.')
		          .tooltip('fixTitle');		
	}

	$('.borrow-button').click(function(){
		$(this).prop('disabled', true);
		$('.tool-tip').tooltip('hide')
		          .attr('data-original-title', 'You have already borrowed this material.')
		          .tooltip('fixTitle');
		id = $('.borrow-button').val();
		$.ajax({
			type: 'GET',
			url: '/dashboard/borrow/' + id,
			success: function(data){
			}
		});
	});

	$('.borrowed-button').click(function(){	
		function getBorrowedMaterials(){
			return $.ajax({
				type: 'GET',
				url: '/dashboard/borrowedmaterials',
				success: function(data){
					titleArray = [];
					statusArray=[];
					for(i=0;i<data.materials.length;i++){
						var newMaterial = $(document.createElement('tr'));
						if(data.materials[i].pivot.status == 'checked out'){
							newMaterial.after().html(
								"<td>" + data.materials[i].title + "</td>" +
								"<td>" + data.materials[i].pivot.status + "</td>" +
								"<td class='pull-right'></td>"
							);						
						}
						else{
							newMaterial.after().html(
								"<td>" + data.materials[i].title + "</td>" +
								"<td>" + data.materials[i].pivot.status + "</td>" +
								"<td class='pull-right'>" +
								"<button class='btn btn-xs btn-danger student-remove-borrowed-button' value='" + data.materials[i].acqNumber   +   "'>" +
								 "<span class='glyphicon glyphicon-remove'></span>" +
								"</button>" +
								"</td>"
							);							
						}

						$('.borrowed-materials-tbody').append(newMaterial);
					}
				}
			});
		}
		getBorrowedMaterials().done(function(){
			if($('.borrowed-materials-tbody').children().length == 0){
				$('#no-borrowed-materials').toggle(true);
			}
			else{
				$('#no-borrowed-materials').toggle(false);		
			}
		});
	});

	$('.remove-borrowed-button').click(function(){
		var x = $(this);
		username = $(this).parent().parent().children('td:nth-child(1)').text();
		acqNumber = $(this).val();
		function deleteBorrowedMaterials(){
			return $.ajax({
				type: 'GET',
				url: '/dashboard/material/staffDelete/' + acqNumber + '/' + username,
				success: function(data){
				}
			});
		}
		deleteBorrowedMaterials().done(function(){
			x.parent().parent().remove();
			if($('.borrowed-materials-tbody').children().length == 0){
				$('#no-borrowed-materials').toggle(true);
			}
			else{
				$('#no-borrowed-materials').toggle(false);		
			}						
		});
	});

	function retrieveBorrowedUsers(){
		return $.ajax({
			type: 'get',
			url: '/dashboard/retrieveBorrowedUsers'
		});
	}

	function createBorrowedUsersTable(index, max, data){
		for(i=0;i<data.length;i++){
			usernameArray.push(data[i].username);
		}					
		for(i=0;i<usernameArray.length;i++){
			$('.' + usernameArray[i]).remove();
		}
		for(i=index;i<max;i++){
			if(data[i].status == 'borrowed'){
				disabled = 'disabled';
			}
			else{
				disabled = '';
			}
			if(data[i].status == 'borrowed' || data[i].status == 'checked out'){
				confirmDisabled = 'disabled';
			}
			else{
				confirmDisabled = '';
			}
			unconfirmButton = "<button class='btn btn-xs btn-default unconfirm-borrowed-button' value='" + data[i].acqNumber  + "'"  + disabled +  
			">Unconfirm</button>";
			confirmButton = "<button type='button' class='btn btn-xs btn-default confirm-borrowed-button' value='" + data[i].acqNumber + "'" + confirmDisabled + 
			">Confirm</button";
			var newMaterial = $(document.createElement('tr')).attr('class', data[i].username);
			newMaterial.after().html(
				"<td class='text-left'>" + data[i].username + "</td>" +
				"<td class='text-left'>" + data[i].acqNumber + "</td>" +
				"<td class='text-left'>" + data[i].borrowed_datetime + "</td>" +
				"<td>" +
				"<button type='button' class='btn btn-xs btn-danger remove-borrowed-button' value='" + data[i].acqNumber + "'>Remove</button> " + 
					unconfirmButton + " "+
					confirmButton +
				"</td>"
			);
			$('.borrowed-materials-tbody').append(newMaterial);
		}		
	}

	function displayBorrowedUsers(){
		retrieveBorrowedUsers().done(function(data){
			results = data;
	            var totalPages = data.length;
	            var minPage = 5;
	            var total = 0;
	            var max = 0;
	        	var index = 0;
			var defaultOpts = {
				totalPages: 1
			};				
			if(data.length <= minPage){
				totalPages = 1;
			}
			else{
				totalPages = Math.ceil(data.length/minPage);
			}				
			$('#borrowed-pagination').twbsPagination(defaultOpts);		            
	            $('#borrowed-pagination').twbsPagination('destroy');
	            $('#borrowed-pagination').twbsPagination($.extend({}, defaultOpts, {
	                	startPage: 1,
	                	totalPages: totalPages,
				onPageClick: function(event, page){
					for(i=0;i<data.length;i++){
						usernameArray.push(data[i].acqNumber);
					}
					total = page * minPage;
					index = Math.abs(total-minPage);
					max = data.length - index;
					if(max <= 5){
						max = data.length;
					}
					else{
						max = index + minPage;
					}
					for(i=0;i<data.length;i++){
						usernameArray.push(data[i].username);
					}					
					for(i=0;i<usernameArray.length;i++){
						$('.' + usernameArray[i]).remove();
					}
					createBorrowedUsersTable(index, max, data);									
	                	}
	            }));
		}).fail(function(){
			$('#no-borrowed-materials').toggle(true);
		});
	}
	$('.confirm-materials-button').click(function(){
		displayBorrowedUsers();
		$('.search').val('');
		$('#no-borrowed-materials').toggle(false);
		$('.search-type').html('Username ' + "<span class='caret'></span>");
		searchType = 'borrowedUsername';
		showMaterial(searchType);	
		$('.search-type').val('borrowedUsername');
		$('.type-dropdown').addClass('hidden');
		$('.borrowed-dropdown').removeClass('hidden');
		$('.material-table').addClass('hidden');
		$('.confirm-material-table').removeClass('hidden');
	});

	$('body').on('click', '.student-remove-borrowed-button', function(){
		x = $(this);
		function removeBorrowed(value){
			id = value;
			return $.ajax({
				type: 'GET',
				url: '/dashboard/delete/borrowed/' + id,
				success: function(data){
				}

			});
		}
		removeBorrowed($(this).val()).done(function(r){
			x.parent().parent().remove();
			if($('.borrowed-materials-tbody').children().length == 0){
				$('#no-borrowed-materials').toggle(true);
			}
			else{
				$('#no-borrowed-materials').toggle(false);		
			}			
		});
	});

	function addBorrowCount(acqNumber){
		$.ajax({
			headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			type: 'post',
			url: '/dashboard/addBorrowCount/' + acqNumber
		})
	}

	$('body').on('click', '.confirm-borrowed-button', function(){
		x = $(this);
		function confirmMaterials(value){
			id = value.val();
			username = value.parent().parent().children('td:nth-child(1)').text();
			return $.ajax({
				type: 'GET',
				url: '/dashboard/confirm/borrowedmaterials/' + id + '/' + username,
				success: function(data){
				},
			});
		}
		confirmMaterials($(this)).done(function(){
			addBorrowCount(x.val());
			x.parent().parent().parent().children().each(function(){
				if($(this).children('td:nth-child(2)').text() == x.val()){
					$(this).children('td:nth-child(4)').children('button:nth-child(2)').prop('disabled', true);
					$(this).children('td:nth-child(4)').children('button:nth-child(3)').prop('disabled', true);
				}
			});
			x.parent().children('button:nth-child(2)').prop('disabled', false);
		});
	});

	function deleteBorrowCount(acqNumber){
		$.ajax({
			headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			type: 'post',
			url: '/dashboard/deleteBorrowCount/' + acqNumber
		})
	}

	$('body').on('click', '.unconfirm-borrowed-button', function(){
		x = $(this);
		function unconfirmMaterials(value){
			id = value.val();
			username = value.parent().parent().children('td:nth-child(1)').text();			
			return $.ajax({
				type: 'GET',
				url: '/dashboard/unconfirm/borrowedmaterials/' + id + '/' + username,
				success: function(data){
				}
			});
		}
		unconfirmMaterials($(this)).done(function(){
			deleteBorrowCount(x.val());
			x.parent().parent().parent().children().each(function(){
				if($(this).children('td:nth-child(2)').text() == x.val()){
					$(this).children('td:nth-child(4)').children('button:nth-child(2)').prop('disabled', false);
					$(this).children('td:nth-child(4)').children('button:nth-child(3)').prop('disabled', false);					
				}
			});
		});
	});

	$('.borrowed-close').click(function(){
		$('.borrowed-materials-tbody').children().remove();
	});
	// end of borrow materials script

	// search and sort script

	var sortType = 'materials';
	$('#sort-materials').click(function(){
		if($(this).attr('disabled')){
			return false;
		}
		$('.search').val('');
		sortType = 'materials';		
		showMaterial(searchType);
	});

	$('#sort-most-viewed').click(function(){
		if($(this).attr('disabled')){
			return false;
		}
		$('.search').val('');
		sortType = 'view';		
		showMaterial(searchType);
	});

	$('#sort-most-borrowed').click(function(){
		if($(this).attr('disabled')){
			return false;
		}		
		$('.search').val('');
		sortType = 'borrow';
		showMaterial(searchType);
	});

	function retrieveTitle(sortType){
		return $.ajax({
			type: 'get',
			url: '/dashboard/retrieveTitle/' + sortType
		});
	}

	function retrieveAuthor(){
		return $.ajax({
			type: 'get',
			url: '/dashboard/retrieveAuthor'
		});
	}

	function retrieveTag(){
		return $.ajax({
			type: 'get',
			url: '/dashboard/retrieveTag'
		});
	}

	function retrievePhotographer(){
		return $.ajax({
			type: 'get',
			url: '/dashboard/retrievePhotographer'
		});
	}

	function retrieveDirector(){
		return $.ajax({
			type: 'get',
			url: '/dashboard/retrieveDirector'
		});
	}

	function retrieveProducer(){
		return $.ajax({
			type: 'get',
			url: '/dashboard/retrieveProducer'
		});
	}

	function retrieveDonor(){
		return $.ajax({
			type: 'get',
			url: '/dashboard/retrieveDonor'
		});
	}

	function retrievePublisher(){
		return $.ajax({
			type: 'get',
			url: '/dashboard/retrievePublisher'
		});
	}

	$('.material-table').find('table').tablesorter();

	var resultsData = '';
	function showMaterial(searchType){
		$('.search').prop('disabled', false);
		$('.search-type').prop('disabled', false);		
		$('body').css({"cursor": "wait"});		
		$('.acq-th').addClass('hidden');
		$('.type-th').addClass('hidden');
		$('.action-th').addClass('hidden');
		$('.noResults').remove();
		$('#no-materials').addClass('hidden');
		$('.search-pagination').removeClass('hidden');		
		if(searchType == 'Title' || searchType == 'Accession Number'){
			$('.action-th').removeClass('hidden');
			$('.acq-th').removeClass('hidden');
			$('.type-th').removeClass('hidden');			
			x = retrieveTitle(sortType);
		}
		else if(searchType == 'Tag'){
			$('.author-th').removeClass('hidden');
			$('.materials-table').addClass('hidden');
			$('.authors-table').removeClass('hidden');			
			x = retrieveTag();
		}
		else if(searchType == 'Author'){
			$('.author-th').removeClass('hidden');			
			$('.materials-table').addClass('hidden');
			$('.authors-table').removeClass('hidden');
			x = retrieveAuthor();
		}
		else if(searchType == 'Photographer'){
			$('.author-th').removeClass('hidden');			
			$('.materials-table').addClass('hidden');
			$('.authors-table').removeClass('hidden');			
			x = retrievePhotographer();
		}
		else if(searchType == 'Director'){
			$('.author-th').removeClass('hidden');			
			$('.materials-table').addClass('hidden');
			$('.authors-table').removeClass('hidden');			
			x = retrieveDirector();			
		}
		else if(searchType == 'Producer'){
			$('.author-th').removeClass('hidden');			
			$('.materials-table').addClass('hidden');
			$('.authors-table').removeClass('hidden');			
			x = retrieveProducer();
		}
		else if (searchType == 'Donor'){
			$('.author-th').removeClass('hidden');			
			$('.materials-table').addClass('hidden');
			$('.authors-table').removeClass('hidden');			
			x = retrieveDonor();
		}
		else if(searchType == 'Publisher'){
			$('.author-th').removeClass('hidden');			
			$('.materials-table').addClass('hidden');
			$('.authors-table').removeClass('hidden');			
			x = retrievePublisher();
		}
		else if(searchType == 'Username' || searchType == 'Fullname' || searchType == 'Institution'){
			$('body').css({"cursor": "default"});
		}
		else if(searchType == 'borrowedUsername' || searchType == 'borrowedAccession' || searchType == 'dateTime'){
			x = retrieveBorrowedUsers();
		}
		if(searchType != 'Username' && searchType != 'Fullname' && searchType != 'Institution'){
			x.done(function(data){
				console.log(data);
				resultsData = data;
				$('body').css({"cursor": "default"});
				var dataLength = data.length;
				var dataMat = data;
				if(searchType == 'Title' || searchType == 'Accession Number'){
					dataMat = data.accession;
					dataLength = data.accession.length;
					if(data.accession.length == 0){
						$('.acq-th').addClass('hidden');
						$('.title-th').addClass('hidden');
						$('.type-th').addClass('hidden');
						$('.action-th').addClass('hidden');							
						newMaterial = $(document.createElement('tr')).attr('class', 'noResults');
						newMaterial.after().html(
							"<td class='text-left'>No results found.</td>"
						);
						$('.search').prop('disabled', true);
						$('.search-type').prop('disabled', true);
						$('.material-items').append(newMaterial);						
					}
				}
				else if(searchType == 'Author' || searchType == 'Photographer' || searchType == 'Tag'
					|| searchType == 'Director' || searchType == 'Producer' || searchType == 'Publisher' || searchType == 'Donor'){
					if(data.length == 0){
						$('.author-th').addClass('hidden');
						$('.acq-th').addClass('hidden');
						$('.title-th').addClass('hidden');
						$('.type-th').addClass('hidden');
						$('.action-th').addClass('hidden');							
						newMaterial = $(document.createElement('tr')).attr('class', 'noResults');
						newMaterial.after().html(
							"<td class='text-left'>No results found.</td>"
						);
						$('.search').prop('disabled', true);
						$('.search-type').prop('disabled', true);
						$('.material-items').append(newMaterial);						
					}
				}
				var results = data;
		            var totalPages = dataLength;
		            var minPage = 5;
		            var total = 0;
		            var max = 0;
		        	var index = 0;
				var defaultOpts = {
					totalPages: 1
				};
				if(dataLength <= minPage){
					totalPages = 1;
				}
				else{
					totalPages = Math.ceil(dataLength/minPage);
				}			
				$('#pagination-demo').twbsPagination(defaultOpts);		            
		            	$('#pagination-demo').twbsPagination('destroy');
		            	$('#pagination-demo').twbsPagination($.extend({}, defaultOpts, {
		                	startPage: 1,
		                	totalPages: totalPages,
		                	onPageClick: function(event, page){
						$('.material-table').find('table').trigger('update');
						$('.authors-table').trigger('update');		                		
						materialLength = Object.keys(dataMat).length;
						total = page * minPage;
						index = Math.abs(total-minPage);
						max = materialLength - index;
						if(max <= 5){
							max = Object.keys(dataMat).length;
						}
						else{
							max = index + minPage;
						}
						if(searchType == 'Title' || searchType == 'Accession Number'){
							for(i=0;i<materialLength;i++){
									acqNumberArray.push(data.accession[i].acqNumber);
									titleArray.push(data.accession[i].title);
							}								
						}
						else if(searchType == 'Author'){
							for(i=0;i<materialLength;i++){
									acqNumberArray.push(data[i].author_id);
							}						
						}
						else if(searchType == 'Tag'){
							for(i=0;i<materialLength;i++){
									acqNumberArray.push(data[i].tags_id);
							}						
						}
						else if(searchType == 'Photographer'){
							for(i=0;i<materialLength;i++){
									acqNumberArray.push(data[i].photographer_id);
							}		
						}
						else if(searchType == 'Director'){
							for(i=0;i<materialLength;i++){
									acqNumberArray.push(data[i].director_id);
							}		
						}	
						else if(searchType == 'Producer'){
							for(i=0;i<materialLength;i++){
									acqNumberArray.push(data[i].producer_id);
							}						
						}
						else if(searchType == 'Donor'){
							for(i=0;i<materialLength;i++){
									acqNumberArray.push(data[i].donor_name_id);
							}							
						}
						else if(searchType == 'Publisher'){
							for(i=0;i<materialLength;i++){
									acqNumberArray.push(data[i].publisher_name_id);
							}		
						}
						else if(searchType == 'borrowedUsername' || searchType == 'borrowedAccession' || searchType == 'dateTime'){
							for(i=0;i<materialLength;i++){
									acqNumberArray.push(data[i].username);
							}								
						}
						for(i=0;i<acqNumberArray.length;i++){
							$('.' + acqNumberArray[i]).remove();
						}								                		
			                	for(i=index;i<max;i++){
							if($('.user-type').val() == 'student'){
								actionButton = '';
							}
							else{
								if(searchType == 'Title' || searchType == 'Accession Number'){
									actionButton = "<td class='text-right action-buttons'>" + 
														"<button type='button' class='btn btn-xs btn-danger delete-button' value='" + data.accession[i].acqNumber + "'>" +
														"<span class='glyphicon glyphicon-remove'></span>" +
														"</button>" +
														"</td>";								
								}

							}
							if(searchType == 'Title' || searchType == 'Accession Number'){
				                		var newTitle = $(document.createElement('tr')).attr('class', data.accession[i].acqNumber);
								newTitle.after().html(
									"<td class='material-view-button text-left' data-toggle='modal' data-target='#material-modal'>" + data.accession[i].acqNumber + 
									"<input type='hidden' value='" + data.accession[i].acqNumber +"'/>" +
									"</td>" +
									"<td class='material-view-button text-left' data-toggle='modal' data-target='#material-modal'>" + data.accession[i].title +
									"<input type='hidden' value='" + data.accession[i].acqNumber +"'/>" +									
									"</td>" +
									"<td class='material-view-button text-left' data-toggle='modal' data-target='#material-modal'>" + data.type[i] +
									"<input type='hidden' value='" + data.accession[i].acqNumber +"'/>" +									
									"</td>" +	
									actionButton				
								);
								$('.material-items').append(newTitle);	  
							}
							else if(searchType == 'Author' || searchType == 'Photographer' || searchType == 'Director' || searchType == 'Producer' || searchType == 'Donor'){

								if(searchType == 'Author'){
									id = data[i].author_id;
								}
								else if(searchType == 'Photographer'){
									id = data[i].photographer_id;
								}
								else if(searchType == 'Director'){
									id = data[i].director_id;
								}
								else if(searchType == 'Producer'){
									id = data[i].producer_id;
								}
								else if(searchType == 'Donor'){
									id = data[i].donor_name_id;
								}
								var newAuthor = $(document.createElement('tr')).attr('class', id);
								newAuthor.after().html(
									"<td class='authors-written text-left'>" + data[i].firstname + " " + data[i].middlename + " " + data[i].lastname + 
									"<input type='hidden' value='" + id +"'/>" +
									"</td>"
								);
								$('.author-items').append(newAuthor);
							}
							else if(searchType == 'Publisher'){
								var newMaterial = $(document.createElement('tr')).attr('class', data[i].publisher_name_id);
								newMaterial.after().html(
									"<td class='authors-written text-left'>" + data[i].publisher_name +
									"<input type='hidden' value='" + data[i].publisher_name_id +"'/>" +
									"</td>"
								);
								$('.author-items').append(newMaterial);							
							}
							else if(searchType == 'Tag'){
								var newTag = $(document.createElement('tr')).attr('class', data[i].tags_id);
								newTag.after().html(
									"<td class='authors-written text-left'>" + data[i].tag_name +
									"<input type='hidden' value='" + data[i].tags_id +"'/>" +
									"</td>"
								);
								$('.author-items').append(newTag);							
							}
							else if(searchType == 'borrowedUsername' || searchType == 'borrowedAccession' || searchType == 'dateTime'){
								if(data[i].status == 'borrowed'){
									disabled = 'disabled';
								}
								else{
									disabled = '';
								}
								if(data[i].status == 'borrowed' || data[i].status == 'checked out'){
									confirmDisabled = 'disabled';
								}
								else{
									confirmDisabled = '';
								}
								unconfirmButton = "<button class='btn btn-xs btn-default unconfirm-borrowed-button' value='" + data[i].acqNumber  + "'"  + disabled +  
								">Unconfirm</button>";
								confirmButton = "<button type='button' class='btn btn-xs btn-default confirm-borrowed-button' value='" + data[i].acqNumber + "'" + confirmDisabled + 
								">Confirm</button";
								var newMaterial = $(document.createElement('tr')).attr('class', data[i].username);
								newMaterial.after().html(
									"<td class='text-left'>" + data[i].username + "</td>" +
									"<td class='text-left'>" + data[i].acqNumber + "</td>" +
									"<td class='text-left'>" + data[i].borrowed_datetime + "</td>" +
									"<td>" +
									"<button type='button' class='btn btn-xs btn-danger remove-borrowed-button' value='" + data[i].acqNumber + "'>Remove</button> " + 
										unconfirmButton + " "+
										confirmButton +
									"</td>"
								);
								$('.borrowed-materials-tbody').append(newMaterial);								
							}
			                	}
			            }
				}));
			}).fail(function(){
				$('#no-materials').removeClass('hidden');
			});
		}
	}

	var searchType = $('.search-type').val();
	if(searchType == 'Title'){
		showMaterial(searchType);
	}


	$('.sort-dropdown').on('click', 'li a', function(){
		$('.sort-type').html($(this).text() + " <span class='caret'></span>");
		$('.sort-type').val($(this).text());
		sortSearch = $.trim($(this).text());
		x.done(function(data){
			$('.wait').removeClass('material-wait');
			$('.noResults').remove();
			$('.acq-th').addClass('hidden');
			$('.search-pagination').removeClass('hidden');
			$('.acq-th').removeClass('hidden');
			$('.material-items').children().toggle(false);
			$('.confirmed-users').children().toggle(false);
			var results = data;
			dataLength = data.length;
	            var totalPages = data.length;
	            var minPage = 5;
	            var total = 0;
	            var max = 0;
	        	var index = 0;
			var defaultOpts = {
				totalPages: 1
			};				
			if(dataLength <= minPage){
				totalPages = 1;
			}
			else{
				totalPages = Math.ceil(dataLength/minPage);
			}
			pagination = '#pagination-demo';			
			$(pagination).twbsPagination(defaultOpts);		            
	            $(pagination).twbsPagination('destroy');
	            $(pagination).twbsPagination($.extend({}, defaultOpts, {
	                	startPage: 1,
	                	totalPages: totalPages,
				onPageClick: function(event, page){
					$('.material-table').find('table').trigger('update');
					dataMat = data;
					materialLength = Object.keys(dataMat).length;
					total = page * minPage;
					index = Math.abs(total-minPage);
					max = materialLength - index;
					if(max <= 5){
						max = Object.keys(dataMat).length;
					}
					else{
						max = index + minPage;
					}
	                	}
	            }));
		});		
	});

	if($('.search-type').val() == 'Title' || $('.search-type').val() == 'Accession Number'){
		$('.sort-type').prop('disabled', false);
	}
	else{
		$('.sort-type').prop('disabled', true);
	}

	$('.type-dropdown').on('click', 'li a', function(){
		$('.search-type').html($(this).text() + ' <span class="caret"></span>');
		$('.search-type').val($(this).text());
		searchType = $.trim($('.search-type').val());
		if($('.search').val().length != 0){
			$('.search').trigger('keyup');
		}
		else{		
			showMaterial(searchType);
		}
		if(searchType == 'Title' || searchType == 'Accession Number'){
			$('.sort-type').prop('disabled', false);
			$('.authors-table').addClass('hidden');
			$('.materials-table').removeClass('hidden');			
			$('.author-info').addClass('hidden');
			if($('.search').val().length != 0){
				$('.search').trigger('keyup');
			}
			$('.title-th').html('Title' + "&nbsp;&nbsp;<i class='fa fa-sort' aria-hidden='true'></i>");
		}
		else if(searchType == 'Author'){
			$('.sort-type').prop('disabled', true);
			$('.materials-table').addClass('hidden');
			$('.authors-table').removeClass('hidden');
			$('.author-th').html('Author' + "&nbsp;&nbsp;<i class='fa fa-sort' aria-hidden='true'></i>");
			$('.author-info').removeClass('hidden');
			$('.author-info i').text("Click the author's name to view the list of materials he/she has written.");
		}
		else if(searchType == 'Donor'){
			$('.sort-type').prop('disabled', true);
			$('.materials-table').addClass('hidden');
			$('.authors-table').removeClass('hidden');			
			$('.author-info').removeClass('hidden');
			$('.author-info i').text("Click the donor's name to view the list of materials he/she has written.");			
			$('.author-th').html('Donor' + "&nbsp;&nbsp;<i class='fa fa-sort' aria-hidden='true'></i>");
		}
		else if(searchType == 'Photographer'){
			$('.sort-type').prop('disabled', true);
			$('.materials-table').addClass('hidden');
			$('.authors-table').removeClass('hidden');			
			$('.author-info').removeClass('hidden');
			$('.author-info i').text("Click the photographer's name to view the list of materials he/she has written.");			
			$('.author-th').html('Photographer' + "&nbsp;&nbsp;<i class='fa fa-sort' aria-hidden='true'></i>");
		}
		else if(searchType == 'Director'){
			$('.sort-type').prop('disabled', true);
			$('.materials-table').addClass('hidden');
			$('.authors-table').removeClass('hidden');			
			$('.author-info').removeClass('hidden');
			$('.author-info i').text("Click the director's name to view the list of materials he/she has written.");			
			$('.author-th').html('Director' + "&nbsp;&nbsp;<i class='fa fa-sort' aria-hidden='true'></i>");
		}
		else if(searchType == 'Producer'){
			$('.sort-type').prop('disabled', true);
			$('.materials-table').addClass('hidden');
			$('.authors-table').removeClass('hidden');			
			$('.author-info i').text("Click the producer's name to view the list of materials he/she has written.");			
			$('.author-info').removeClass('hidden');
			$('.author-th').html('Producer' + "&nbsp;&nbsp;<i class='fa fa-sort' aria-hidden='true'></i>");
		}
		else if(searchType == 'Publisher'){
			$('.sort-type').prop('disabled', true);
			$('.materials-table').addClass('hidden');
			$('.authors-table').removeClass('hidden');			
			$('.author-info i').text("Click the publisher's name to view the list of materials they have written.");			
			$('.author-info').removeClass('hidden');			
			$('.author-th').html('Publisher' + "&nbsp;&nbsp;<i class='fa fa-sort' aria-hidden='true'></i>");
		}
		else if(searchType == 'Tag'){
			$('.sort-type').prop('disabled', true);
			$('.materials-table').addClass('hidden');
			$('.authors-table').removeClass('hidden');
			$('.author-info').removeClass('hidden');
			$('.author-info i').text("Click the tag's name to view the list of materials that have been tagged.");
			$('.author-th').html('Tag' + "&nbsp;&nbsp;<i class='fa fa-sort' aria-hidden='true'></i>");
		}
	});

	$('.borrowed-dropdown').on('click', 'li a', function(){
		if($('.search').val().length != 0){
			$('.search').trigger('keyup');
		}
		else{
			showMaterial(searchType);
		}		
		$('.search-type').html($(this).text() + ' <span class="caret"></span>');
		searchType = $.trim($(this).text());
		if(searchType == 'Username'){
			$('.search-type').val('borrowedUsername');
			searchType = 'borrowedUsername';
		}
		else if(searchType == 'Accession Number'){
			$('.search-type').val('borrowedAccession');
			searchType = 'borrowedAccession';			
		}
		else if(searchType == 'Date and Time'){
			$('.search-type').val('dateTime');
			searchType = 'dateTime';			
		}
	});

	function createTable(index, max, data){
		for(i=index;i<max;i++){
			if($('.user-type').val() == 'student'){
				actionButton = '';
			}
			else{
				actionButton = "<td class='text-right action-buttons'>" + 
									"<button type='button' class='btn btn-xs btn-danger delete-button' value='" + data.material[i].acqNumber + "'>" +
									"<span class='glyphicon glyphicon-remove'></span>" +
									"</button>" +
									"</td>";
			}
			var newMaterial = $(document.createElement('tr')).attr('class', data.material[i].acqNumber);
			newMaterial.after().html(
				"<td class='material-view-button text-left' data-toggle='modal' data-target='#material-modal'>" + data.material[i].acqNumber + 
				"<input type='hidden' value='" + data.material[i].acqNumber +"'/>" +
				"</td>" +
				"<td class='material-view-button text-left' data-toggle='modal' data-target='#material-modal'>" + data.material[i].title +
				"<input type='hidden' value='" + data.material[i].acqNumber +"'/>" +									
				"</td>" +
				"<td class='material-view-button text-left' data-toggle='modal' data-target='#material-modal'>" + data.type[i] +
				"<input type='hidden' value='" + data.material[i].acqNumber +"'/>" +									
				"</td>" +									
				actionButton
			);
			$('.material-items').append(newMaterial);
		}
	}

	function createAuthorsTable(index, max, data){
		for(i=index;i<max;i++){
			var newMaterial = $(document.createElement('tr')).attr('class', data.id[i]);
			newMaterial.after().html(
				"<td class='authors-written text-left'>" + data.firstname[i] + " " + data.middlename[i] + " " + data.lastname[i] + 
				"<input type='hidden' value='" + data.id[i] +"'/>" +
				"</td>"
			);
			$('.author-items').append(newMaterial);
		}		
	}

	function createPublisherTable(index, max, data){
		for(i=index;i<max;i++){
			var newMaterial = $(document.createElement('tr')).attr('class', data[i].publisher_name_id);
			newMaterial.after().html(
				"<td class='authors-written text-left'>" + data[i].publisher_name +
				"<input type='hidden' value='" + data[i].publisher_name_id +"'/>" +
				"</td>"
			);
			$('.author-items').append(newMaterial);
		}			
	}

	function createTagTable(index, max, data){
		for(i=index;i<max;i++){
			var newMaterial = $(document.createElement('tr')).attr('class', data.id[i]);
			newMaterial.after().html(
				"<td class='authors-written text-left'>" + data.tag[i] +
				"<input type='hidden' value='" + data.id[i] +"'/>" +
				"</td>"
			);
			$('.author-items').append(newMaterial);
		}			
	}
	
	var delay = (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
	})();

	var acqNumberArray = [];
	var titleArray  =[];
	var results = [];

	$('.search').keypress(function(){
		$('#sort-materials').attr('disabled', true);
		$('#sort-most-viewed').attr('disabled', true);
		$('#sort-most-borrowed').attr('disabled', true);
	});

	$('.search').keyup(function(event){
		$('#sort-materials').attr('disabled', true);
		$('#sort-most-viewed').attr('disabled', true);
		$('#sort-most-borrowed').attr('disabled', true);		
	    	var x = $(this);   	
		delay(function(){			
			$('.wait').addClass('material-wait');
			function results(x){
				return $.ajax({
					type: 'get',
					url: 'search/' + $('.search-type').val() + '/' + $('.search').val(),
					success: function(data){
					},
					error: function(XMLHttpRequest, textStatus, errorThrown){

					},
				});
			}
			results($(this)).done(function(data){		
				$('#sort-materials').attr('disabled', false);
				$('#sort-most-viewed').attr('disabled', false);
				$('#sort-most-borrowed').attr('disabled', false);		
				$('.wait').removeClass('material-wait');
				$('.noResults').remove();
				$('.acq-th').addClass('hidden');
				$('.search-pagination').removeClass('hidden');
				$('.acq-th').removeClass('hidden');
				$('.material-items').children().toggle(false);
				$('.confirmed-users').children().toggle(false);
				if(searchType == 'Accession Number' || searchType == 'Title'){
					dataLength = data.material.length;
				}
				else if(searchType == 'Author' || searchType == 'Photographer' ||searchType == 'Director' || searchType == 'Producer' || searchType == 'Donor'){
					dataLength = data.firstname.length;
				}
				else if(searchType == 'Publisher' || searchType == 'borrowedUsername' || searchType == 'borrowedAccession' || searchType == 'dateTime'){
					dataLength = data.length;
				}
				else if(searchType == 'Tag'){
					dataLength = data.tag.length;
				}
				else if(searchType == 'Username' || searchType == 'Fullname' || searchType == 'Institution'){
					dataLength = Object.keys(data).length;
				}
				var results = data;
		            var totalPages = dataLength;
		            var minPage = 5;
		            var total = 0;
		            var max = 0;
		        	var index = 0;
				var defaultOpts = {
					totalPages: 1
				};				
				if(dataLength <= minPage){
					totalPages = 1;
				}
				else{
					totalPages = Math.ceil(dataLength/minPage);
				}
				if(searchType == 'borrowedUsername' || searchType == 'borrowedAccession' || searchType == 'dateTime'){
					pagination = '#borrowed-pagination';
				}
				else{
					pagination = '#pagination-demo';
				}				
				$(pagination).twbsPagination(defaultOpts);		            
		            $(pagination).twbsPagination('destroy');
		            $(pagination).twbsPagination($.extend({}, defaultOpts, {
		                	startPage: 1,
		                	totalPages: totalPages,
					onPageClick: function(event, page){
						$('.material-table').find('table').trigger('update');
						$('.authors-table').trigger('update');						
						if(searchType == 'Accession Number' || searchType == 'Title'){
							dataMat = data.material;
						}
						else if(searchType == 'Author' || searchType == 'Director' || searchType == 'Producer' || searchType == 'Photographer' || searchType == 'Donor'){
							dataMat = data.firstname;
						}
						else if(searchType == 'Username' || searchType == 'Publisher' 
						|| searchType == 'Fullname' || searchType == 'Institution' 
						|| searchType == 'borrowedUsername' || searchType == 'borrowedAccession' || searchType == 'dateTime'){
							dataMat = data;
						}
						else if(searchType == 'Tag'){
							dataMat = data.tag;
						}
						materialLength = Object.keys(dataMat).length;
						total = page * minPage;
						index = Math.abs(total-minPage);
						max = materialLength - index;
						if(max <= 5){
							max = Object.keys(dataMat).length;
						}
						else{
							max = index + minPage;
						}			
						if(searchType == 'Accession Number' || searchType == 'Title'){
							dataMat = data.material;
							$('.author-th').addClass('hidden');
							$('.acq-th').removeClass('hidden');
							$('.title-th').removeClass('hidden');
							$('.type-th').removeClass('hidden');
							$('.action-th').removeClass('hidden');							
							for(i=0;i<materialLength;i++){
								acqNumberArray.push(data.material[i].acqNumber);
								titleArray.push(data.material[i].title);
							}							
							for(i=0;i<acqNumberArray.length;i++){
								$('.' + acqNumberArray[i]).remove();
							}
							createTable(index, max, data);							
						}
						else if(searchType == 'Author' || searchType == 'Director' || searchType == 'Producer' || searchType == 'Photographer' || searchType == 'Donor'){
							$('.author-th').removeClass('hidden');
							$('.acq-th').addClass('hidden');
							$('.title-th').addClass('hidden');
							$('.type-th').addClass('hidden');
							$('.action-th').addClass('hidden');									
							if(data.firstname.length == 0){								
								newMaterial = $(document.createElement('tr')).attr('class', 'noResults');
								newMaterial.after().html(
									"<td class='text-left'>No results found.</td>"
								);
								$('.material-items').append(newMaterial);						
							}
							dataMat = data.firstname;

							for(i=0;i<materialLength;i++){
								acqNumberArray.push(data.id[i]);
							}							
							for(i=0;i<acqNumberArray.length;i++){
								$('.' + acqNumberArray[i]).remove();
							}
							createAuthorsTable(index, max, data);					
						}
						else if(searchType == 'Publisher'){
							$('.author-th').removeClass('hidden');
							$('.acq-th').addClass('hidden');
							$('.title-th').addClass('hidden');
							$('.type-th').addClass('hidden');
							$('.action-th').addClass('hidden');
							if(data.length == 0){								
								newMaterial = $(document.createElement('tr')).attr('class', 'noResults');
								newMaterial.after().html(
									"<td class='text-left'>No results found.</td>"
								);
								$('.material-items').append(newMaterial);						
							}							
							for(i=0;i<materialLength;i++){
								acqNumberArray.push(data[i].publisher_name_id);
							}				
							for(i=0;i<acqNumberArray.length;i++){
								$('.' + acqNumberArray[i]).remove();
							}
							createPublisherTable(index, max, data);													
						}
						else if(searchType == 'Tag'){
							$('.author-th').removeClass('hidden');
							$('.acq-th').addClass('hidden');
							$('.title-th').addClass('hidden');
							$('.type-th').addClass('hidden');
							$('.action-th').addClass('hidden');
							for(i=0;i<materialLength;i++){
								acqNumberArray.push(data.id[i]);
							}				
							for(i=0;i<acqNumberArray.length;i++){
								$('.' + acqNumberArray[i]).remove();
							}
							createTagTable(index, max, data);		
						}										
						else if(searchType =='Username' || searchType == 'Fullname' || searchType == 'Institution'){
							for(i=0;i<Object.keys(data).length;i++){
								usernameArray.push(data[i].username);
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
								var newUser = $(document.createElement('tr')).attr('class', data[i].username);
								newUser.after().html(
									"<td class='text-left'>" + data[i].username + "</td>" +
									"<td class='text-left'>" + data[i].firstname + ' ' + data[i].middlename + ' ' + data[i].lastname + "</td>" +
									"<td class='text-left'>" + data[i].institution + "</td>" +
									"<td class='confirm-buttons'>" +
									"<input type='hidden' value ='" + data[i].username + "'/>" +
									"<button type='button' class='user-confirm-button " + unconfirmedBtn +  "'>unconfirmed</button>" +
									" <button type='button' class='user-confirm-button " + confirmedBtn + "'>confirmed</button>" +
									"</td>"
								);
								$('.confirmed-users').append(newUser);
							}							
						}
						else if(searchType == 'borrowedUsername' || searchType == 'borrowedAccession' || searchType == 'dateTime'){
							createBorrowedUsersTable(index, max, data);				
						}
		                	}
		            }
		      ));
			if(dataLength == 0){
				$('.author-th').addClass('hidden');
				$('.title-th').addClass('hidden');
				$('.type-th').addClass('hidden');
				$('.action-th').addClass('hidden');	
				$('.acq-th').addClass('hidden');		
				newMaterial = $(document.createElement('tr')).attr('class', 'noResults');
				newMaterial.after().html(
					"<td class='text-left'>No results found.</td>"
				);				
				if(searchType == 'Title' || searchType == 'Accession Number'){
					for(i=0;i<acqNumberArray.length;i++){
						$('.' + acqNumberArray[i]).remove();
					}
					$('.material-items').append(newMaterial);					
				}
				else if(searchType == 'borrowedUsername' || searchType == 'borrowedAccession' || searchType == 'dateTime'){
					$('.borrowed-materials-tbody').append(newMaterial);
				}
				else if(searchType == 'Author' || searchType == 'Photographer' || searchType == 'Donor' 
					|| searchType == 'Producer' || searchType == 'Director' || searchType == 'Publisher' || searchType == 'Tag'){
					newMaterial = $(document.createElement('tr')).attr('class', 'noResults');
					newMaterial.after().html(
						"<td class='text-left'>No results found.</td>"
					);						
					$('.author-items').append(newMaterial);
				}
				else{
					$('.confirmed-users').append(newMaterial);
				}
				$('.search-pagination').addClass('hidden');					
			}
			}).fail(function(){
				$('#sort-materials').attr('disabled', false);
				$('#sort-most-viewed').attr('disabled', false);
				$('#sort-most-borrowed').attr('disabled', false);					
				if(x.val().length == 0){
					$('.wait').removeClass('material-wait');
					$('.search').css({"background-color": "white"});
					$('.search-pagination').removeClass('hidden');
					$('.acq-th').addClass('hidden');
					$('.type-th').addClass('hidden');
					$('.title-th').removeClass('hidden');
					$('.action-th').removeClass('hidden');
					$('.title-th').toggle(true);
					for(i=0;i<acqNumberArray.length;i++){
						$('.' + acqNumberArray[i]).remove();
					}
					if(searchType == 'Username' || searchType == 'Fullname' || searchType == 'Institution'){
						$('.confirmed-users').children().toggle(true);
						$('.search-pagination').removeClass('hidden');
						displayUsers();
						for(i=0;i<usernameArray.length;i++){
							$('.' + usernameArray[i]).remove();													
						}
					}
					else{
						showMaterial(searchType);
					}
					$('.noResults').remove();			
				}
			})
		}, 500);
	});

	$('body').on('click', '.authors-written', function(){
		$('.materials-table').removeClass('hidden');
		$('.authors-table').addClass('hidden');		
		$('.search').val($(this).text());
		$('.title-th').html('Title'+ "&nbsp;&nbsp;<i class='fa fa-sort' aria-hidden='true'></i>");
		$('.search').css({"background-color": "#f5f5f5"});
		searchType = $('.search-type').val();
		function getMaterials(id){
			return $.ajax({
				type: 'GET',
				url: '/dashboard/retrieveMaterials/' + id + '/' + searchType + '/' + sortType ,
				success: function(data){
				},
			});
		}

		getMaterials($(this).find('input').val()).done(function(data){
			var dataLength = data.material.length;	
			var results = data;
	            var totalPages = dataLength;
	            var minPage = 5;
	            var total = 0;
	            var max = 0;
	        	var index = 0;
			var defaultOpts = {
				totalPages: 1
			};				
			if(dataLength <= minPage){
				totalPages = 1;
			}
			else{
				totalPages = Math.ceil(dataLength/minPage);
			}
			$('#pagination-demo').twbsPagination(defaultOpts);		            
	            $('#pagination-demo').twbsPagination('destroy');
	            $('#pagination-demo').twbsPagination($.extend({}, defaultOpts, {
	                	startPage: 1,
	                	totalPages: totalPages,
				onPageClick: function(event, page){
					dataMat = data.material;
					materialLength = Object.keys(dataMat).length;
					total = page * minPage;
					index = Math.abs(total-minPage);
					max = materialLength - index;
					if(max <= 5){
						max = Object.keys(dataMat).length;
					}
					else{
						max = index + minPage;
					}
					$('.author-th').addClass('hidden');
					$('.acq-th').removeClass('hidden');
					$('.title-th').removeClass('hidden');
					$('.type-th').removeClass('hidden');
					$('.action-th').removeClass('hidden');				
					for(i=0;i<materialLength;i++){
						acqNumberArray.push(data.material[i].acqNumber);
						titleArray.push(data.material[i].title);
					}							
					for(i=0;i<acqNumberArray.length;i++){
						$('.' + acqNumberArray[i]).remove();
					}
					for(i=index;i<max;i++){
						if($('.user-type').val() == 'student'){
							actionButton = '';
						}
						else{
							actionButton = "<td class='text-right action-buttons'>" + 
												"<button type='button' class='btn btn-xs btn-danger delete-button' value='" + data.material[i].acqNumber + "'>" +
												"<span class='glyphicon glyphicon-remove'></span>" +
												"</button>" +
												"</td>";
						}						
						var newMaterial = $(document.createElement('tr')).attr('class', data.material[i].acqNumber);
						newMaterial.after().html(
							"<td class='material-view-button text-left' data-toggle='modal' data-target='#material-modal'>" + data.material[i].acqNumber + 
							"<input type='hidden' value='" + data.material[i].acqNumber +"'/>" +
							"</td>" +
							"<td class='material-view-button text-left' data-toggle='modal' data-target='#material-modal'>" + data.material[i].title +
							"<input type='hidden' value='" + data.material[i].acqNumber +"'/>" +									
							"</td>" +
							"<td class='material-view-button text-left' data-toggle='modal' data-target='#material-modal'>" + data.type[i] +
							"<input type='hidden' value='" + data.material[i].acqNumber +"'/>" +									
							"</td>" +								
							actionButton
						);
						$('.material-items').append(newMaterial);
					}
	                	}
	            }))
			if(data.material.length == 0){
				$('.acq-th').addClass('hidden');
				$('.title-th').addClass('hidden');
				$('.type-th').addClass('hidden');
				$('.action-th').addClass('hidden');
				$('.search').prop('disabled', false);
				$('.search').css({"background-color": "white"});
				newMaterial = $(document.createElement('tr')).attr('class', 'noResults');
				newMaterial.after().html(
					"<td class='text-left'>No results found.</td>"
				);
				$('.material-items').append(newMaterial);						
			}
		}).fail(function(){
			newMaterial = $(document.createElement('tr')).attr('class', 'noResults');
			newMaterial.after().html(
				"<td class='text-left'>No results found.</td>"
			);
			$('.material-items').append(newMaterial);				
		})
	});

	// end of search and sort script

});