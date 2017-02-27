$(document).ready(function (){

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
		$('#user-form').removeClass('hidden');
		$('.student-form').addClass('hidden');
		$(".student-number-panel").addClass('hidden');
	});

	$('#student-button').click(function(){
		$('.student-form').removeClass('hidden');
		$('#user-form').addClass('hidden');
		$('.user-panel').addClass('hidden');
	});

	// end of sidebar script

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

	// add material script

	$('#add-material-button').click(function(){
		$('#material-submit').text("Add");
		$('.author-photographer-director').removeClass('hidden');
		$('.co-author0').removeClass('hidden');
		$('#add-co-author-button').removeClass('hidden');
		$('.publisher-field').removeClass('hidden');
		$('.publish-radio').removeClass('hidden');		
		$('#edit-button').addClass('hidden');
		$('input').each(function(){
			$(this).prop('disabled', false);
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
				$(this).val('');				
			}
		});

		$('input[name="publish-status"]').prop('checked', false);
		$('input[name="acquisition-mode"]').prop('checked', false);
		$('.published-div').addClass('hidden');
		$('.purchased-div').addClass('hidden');
		$('.donated-div').addClass('hidden');
		$('.help-block').addClass('hidden');

		// removing authors
		for(i=1;i<=authorCounter;i++){
			$('.co-author' + i).remove();
		}
		// removing tags		
		for(j=1;j<=tagCounter;j++){
			$('.tag' + j).remove();
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
			$('.author-photographer-director').text('Author');
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
		// $('input').each(function(){
		// 	if($(this).attr('name') == '_token'){
		// 	}
		// 	else{
		// 		// $(this).removeAttr('checked');
		// 		$(this).prop('checked', false);
		// 		$(this).val('');
		// 		// $(this).removeAttr('value');	
		// 	}
		// });
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
			$('.co-author' + i).remove();
		}
		// removing producers
		for(i=1;i<prodCounter;i++){
			$('.prod' + i).remove();
		}
		// removing tags		
		for(j=1;j<=tagCounter;j++){
			$('.tag' + j).remove();
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
		else{
			$('.acqNumber-help').addClass('hidden');
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
		producerArray=[];
		for(i=1; i<prodNum;i++){
			if($('#prod-firstname' + i).val() == ""){
				$('.prod-firstname-help' + i).removeClass('hidden');
				$('.prod-firstname-help' +i + ' strong').text('The first name of the producer is required.');
				errorCounter++;
			}
			else if($('#prod-firstname' + i).val().length > 50){
				$('.prod-firstname-help' + i).removeClass('hidden');
				$('.prod-firstname-help' +i + ' strong').text('The first name of the producer should not exceed 50 characters.');
				errorCounter++;				
			}
			else{
				$('.prod-firstname-help' + i).addClass('hidden');
				nameArray.push($('#prod-firstname' + i).val());
			}
			if($('#prod-middlename' + i).val() == ""){
				$('.prod-middlename-help' + i).removeClass('hidden');
				$('.prod-middlename-help' +i + ' strong').text('The middle name of the producer is required.');
				errorCounter++;
			}
			else if($('#prod-middlename' + i).val().length > 50){
				$('.prod-middlename-help' + i).removeClass('hidden');
				$('.prod-middlename-help' +i + ' strong').text('The middle name of the producer should not exceed 50 characters.');
				errorCounter++;
			}
			else{
				$('.prod-middlename-help' + i).addClass('hidden');
				nameArray.push($('#prod-middlename' + i).val());
			}
			
			if($('#prod-lastname' + i).val() == ""){
				$('.prod-lastname-help' + i).removeClass('hidden');
				$('.prod-lastname-help' +i + ' strong').text('The last name of the producer is required.');	
				errorCounter++;
			}
			else if($('#prod-lastname' + i).val().length > 50){
				$('.prod-lastname-help' + i).removeClass('hidden');
				$('.prod-lastname-help' +i + ' strong').text('The last name of the producer should not exceed 50 characters.');	
				errorCounter++;				
			}
			else{
				$('.prod-lastname-help' + i).addClass('hidden');
				nameArray.push($('#prod-lastname' + i).val());
			}
			producerArray.push(nameArray);
			nameArray=[];						
		}

		$('#producers').val(producerArray);

		nameArray=[];

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
		for(i=0;i<num;i++){
			if($('#author-firstname' + i).val() == ""){
				$('.author-firstname-help' + i).removeClass('hidden');
				$('.author-firstname-help' +i + ' strong').text('The first name of the ' + name  +' is required.');
				errorCounter++;
			}
			else if($('#author-firstname' + i).val().length > 50){
				$('.author-firstname-help' + i).removeClass('hidden');
				$('.author-firstname-help' +i + ' strong').text('The length of the first name should not exceed 50 characters.');
				errorCounter++;
			}
			else{
				$('.author-firstname-help' + i).addClass('hidden');
				nameArray.push($('#author-firstname' + i).val());
			}
			if($('#author-middlename' + i).val() == ""){
				$('.author-middlename-help' + i).removeClass('hidden');
				$('.author-middlename-help' +i + ' strong').text('The middle name of the ' + name + ' is required.');
				errorCounter++;
			}
			else if($('#author-middlename' + i).val().length > 50){
				$('.author-middlename-help' + i).removeClass('hidden');
				$('.author-middlename-help' +i + ' strong').text('The length of the middle name should not exceed 50 characters.');
				errorCounter++;				
			}			
			else{
				$('.author-middlename-help' + i).addClass('hidden');
				nameArray.push($('#author-middlename' + i).val());
			}
			
			if($('#author-lastname' + i).val() == ""){
				$('.author-lastname-help' + i).removeClass('hidden');
				$('.author-lastname-help' +i + ' strong').text('The last name of the ' + name + ' is required.');	
				errorCounter++;
			}
			else if($('#author-lastname' + i).val().length > 50){
				$('.author-lastname-help' + i).removeClass('hidden');
				$('.author-lastname-help' +i + ' strong').text('The length of the last name should not exceed 50 characters.');
				errorCounter++;				
			}			
			else{
				$('.author-lastname-help' + i).addClass('hidden');
				nameArray.push($('#author-lastname' + i).val());
			}
			authorArray.push(nameArray);
			nameArray=[];
		}

		$('#authors').val(authorArray);

		tagArray=[];
		for(i=0;i<tagNum;i++){
			if(!($('#tag' + i ).val() == "")){
				$('.tag-help' + i).addClass('hidden');
				tagArray.push($('#tag' + i).val());
			}
			if($('#tag' + i ).val().length >= 50){
				$('.tag-help' + i).removeClass('hidden');
				$('.tag-help' + i + ' strong').text('The tag field is required.');
				errorCounter++;
			}
			else{
				$('.tag-help' + i).addClass('hidden');
			}
		}

		$('#tags').val(tagArray);
		if(pubStatus.length == 0){
			$('.publish-status-help strong').text('The publish field is required.');
			$('.publish-status-help').removeClass('hidden');
			errorCounter++;
		}
		else{
			$('.publish-status-help').addClass('hidden');
			if($('.publish-status').val() == 'published'){
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
		}
				

		if(acquisitionMode.length == 0){
			$('.acquisition-mode-help strong').text('The mode of acquisition field is required.');
			$('.acquisition-mode-help').removeClass('hidden');
			errorCounter++;
		}
		else{
			$('.acquisition-mode-help').addClass('hidden');
			if(acquisitionMode == 'Donated'){
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


		if(errorCounter != 0){
			return false;
		}
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
		var newAuthor = $(document.createElement('div')).attr('class', 'form-group co-author'+ num);
		newAuthor.after().html(
			"<div class='input-group'>"+
				"<span class='input-group-addon label-title'>First Name</span>" +
				"<input type='text' id='author-firstname" + num  + "' class='form-control' placeholder='Jose' name='author-firstname" + num +  "'/>" +
			"</div>" +
			"<span class='author-firstname-help" + num +  " help-block hidden'>" +
				"<strong></strong>" +
			"</span>" +
			"<div class='input-group'>"+
				"<span class='input-group-addon label-title'>Middle Name</span>" +
				"<input type='text' id='author-middlename" + num  + "' class='form-control' placeholder='Salazar' name='author-middlename" + num +  "'/>" +
			"</div>" +
			"<span class='author-middlename-help" + num +  " help-block hidden'>" +
				"<strong></strong>" +
			"</span>" +
			"<div class='input-group'>"+
				"<span class='input-group-addon label-title'>Last Name</span>" +
				"<input type='text' id='author-lastname" + num  + "' class='form-control' placeholder='Rizal' name='author-lastname" + num +  "'/>" +
			"</div>" +
			"<span class='author-lastname-help" + num +  " help-block hidden'>" +
				"<strong></strong>" +
			"</span>" +
			"<button type='button' class='btn btn-danger co-author-button delete-author'>Delete " + headType + "</button>"
		);
		$('.add-co-author').append(newAuthor);
		num++;
	});

	var tagNum = 1;
	$('#add-tag').click(function(){
		var newTag = $(document.createElement('div')).attr('class', 'tag' + tagNum);
		newTag.after().html(
			"<div class='input-group'>"  +
			"<span class='input-group-addon label-title'>Tag</span>" +
			"<input type='text' id='tag" + tagNum + "' class='form-control' placeholder='Computer Science' name='tag'/>" +				
			"<span class='input-group-btn'>" +
				"<button type='button' class='btn btn-secondary remove-tag'>" +
					"<span class='glyphicon glyphicon-minus'></span>" +
				"</button>" +
			"</span>" +
			"</div>" +
			"<span class='tag-help" + tagNum +  " help-block hidden'>" +"<strong></strong>" +"</span>"			
		);
		$('.tag' + (tagNum-1)).after(newTag);
		tagNum++;
	});

	var prodNum = 1;
	$('body').on('click', '#add-producer-button', function(){
		var newProducer = $(document.createElement('div')).attr('class', 'form-group prod' + prodNum);
		newProducer.after().html(
			"<div class='input-group'>"+
				"<span class='input-group-addon label-title'>First Name</span>" +
				"<input type='text' id='prod-firstname" + prodNum  + "' class='form-control' placeholder='Jose' name='prod-firstname" + prodNum +  "'/>" +
			"</div>" +
			"<span class='prod-firstname-help" + prodNum +  " help-block hidden'>" +
				"<strong></strong>" +
			"</span>" +
			"<div class='input-group'>"+
				"<span class='input-group-addon label-title'>Middle Name</span>" +
				"<input type='text' id='prod-middlename" + prodNum  + "' class='form-control' placeholder='Salazar' name='prod-middlename" + prodNum +  "'/>" +
			"</div>" +
			"<span class='prod-middlename-help" + prodNum +  " help-block hidden'>" +
				"<strong></strong>" +
			"</span>" +
			"<div class='input-group'>"+
				"<span class='input-group-addon label-title'>Last Name</span>" +
				"<input type='text' id='prod-lastname" + prodNum  + "' class='form-control' placeholder='Rizal' name='prod-lastname" + prodNum +  "'/>" +
			"</div>" +
			"<span class='prod-lastname-help" + prodNum +  " help-block hidden'>" +
				"<strong></strong>" +
			"</span>" +
			"<button type='button' class='btn btn-danger co-author-button delete-prod'>Delete Producer</button>"			
		);
		$('.prod-head').append(newProducer);
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
		$('#material-reset').trigger('click');	
		for(i=0;i<tableAuthorCounter;i++){
			$('.table-authors').children().remove();
		}
		for(i=0;i<tableTagsCounter;i++){
			$('.table-tags').children().remove();
		}
	});

	var tableAuthorCounter = 0;
	var tableTagsCounter = 0;
	$('.material-view-button').click(function(){
		$('.co-author0').addClass('hidden');
		$('#add-co-author-button').addClass('hidden');
		$('.tag0').addClass('hidden');
		var material_id = $(this).find('input').val();
		$.get('material/' + material_id, function (data) {
			console.log(data);
			$('.material-acqNumber').text(data.title);
			$('#category').val(data.category);
			$('#acqNumber').val(data.acqNumber);
			$('#title').val(data.title);
			for(i=0, j=0;i<(data.authors.length/3);i++, j+=3){
				// if(i != (data.authors.length/3)-1){
				// 	$('#add-co-author-button').trigger('click');
				// }	
				var newAuthor = $(document.createElement('tr'));
				newAuthor.after().html(
					"<td>" + data.authors[j] + " " + data.authors[j+1] + " " + data.authors[j+2] + "</td>"
				);
				$('.table-authors').append(newAuthor);
				tableAuthorCounter++;
				// $('.table-authors').append()
				// $('#author-firstname' + i).val(data.authors[j]);
				// $('#author-firstname' + i).prop('disabled', true);
				// $('#author-middlename' + i).val(data.authors[j+1]);
				// $('#author-middlename' + i).prop('disabled', true);
				// $('#author-lastname' + i).val(data.authors[j+2]);	
				// $('#author-lastname' + i).prop('disabled', true);	
			}
			for(i=0;i<data.tags.length;i++){
				var newTag = $(document.createElement('tr'));
				newTag.after().html(
					"<td>" + data.tags[i] + "</td>"
				);
				$('.table-tags').append(newTag);
				tableTagsCounter++;
				asdfasfas
			}
			if(data.publisher_name == ''){
				$('.publisher-field').addClass('hidden');
			}
			else{
				$('.publisher-field').removeClass('hidden');
				$('.published-div').removeClass('hidden');
				$('.publish-radio').addClass('hidden');
				$('#publisher').val(data.publisher_name);
				$('#published-year').val(data.publisher_year);
				$('#place').val(data.publisher_place);
			}
		});

		$('input').each(function(){
			$(this).prop('disabled', true);
		});
		$('select').prop('disabled', true);
		$('button').each(function(){
			if($(this).attr('id') == 'edit-button'){
				$(this).removeClass('hidden');
			}
		});
	});

	// end of edit script
});