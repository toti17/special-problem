$(document).ready(function (){

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
	var usernameArray = [];

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

	function fadeModal(){
		$('#material-modal').animate({
			opacity: 0.9
		}, 400 );
	}

	function showModal(){
		$('#material-modal').animate({
			opacity: 1
		}, 400 );		
	}

	function hideModal(){
		$('#material-modal').animate({
			opacity: 0
		}, 400 );		
	}

	var addCounter = false;

	$('#add-material-button').click(function(){
		$('.tags-div').addClass('hidden');
		$('.material-close').removeClass('hidden');
		$('.edit-close').addClass('hidden');
		$('#confirm-submit').text("Add");
		$('.modified').addClass('hidden');
		$('.donors').addClass('hidden');
		$('.purchases').addClass('hidden');
		$('.acquisition-div').removeClass("hidden");
		$('.view-close').addClass('hidden');
		$('#description-field').parent().removeClass('hidden');
		addCounter = true;
		$('.search-type').html('Accession Number ' + "<span class='caret'></span>");
		$('.type-dropdown').removeClass('hidden');
		$('.borrowed-dropdown').addClass('hidden');
		var base_url = '<?php echo base_url();?>';
		$('.material-form').attr('action', window.location.origin + "/add/material/" + false);
		$('.modal-title').text('Add Material');
		$('#material-submit').text("Add");
		$('photograph').addClass('hidden');
		$('.cancel-edit').addClass('hidden');
		$('.tag').removeClass('hidden');
		$('.author-photographer-director').removeClass('hidden');
		$('.co-author').removeClass('hidden');
		$('#add-producer-button').removeClass('hidden');
		$('.add-co-author').removeClass('hidden');
		$('.publisher-field').removeClass('hidden');
		$('.acquisition-field').removeClass('hidden');
		$('.publish-radio').removeClass('hidden');
		$('.acquisition-radio').removeClass('hidden');
		$('#edit-button').addClass('hidden');
		$('.tables').addClass('hidden');
		$('#material-reset').removeClass('hidden');
		$('#material-submit').removeClass('hidden');			
		$('#title').prop('disabled', false);
		$('#description').prop('disabled', false);		
		$('input').each(function(){
			$(this).prop('disabled', false);
			if($(this).attr('name') == '_token' || $(this).attr('name') == 'size-type'  || $(this).attr('type') == 'hidden'
			|| $(this).attr('name') == 'duration-type' || $(this).attr('name') == 'material-acqNumber' || $(this).attr('name') == 'pic'
			|| $(this).attr('class') == 'form-control file-name'
			){
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

	$('#edit-confirm-modal').on('hidden.bs.modal', function (){
		$('body').addClass('modal-open');
	});

	$('#material-modal').on('hidden.bs.modal', function (){
		 exitMaterialModal();
		$('#add-material-button').prop('disabled', false);
	});

	var selectValue = "";
	// $(document).on('click', '.category', function(){
	$('#category').click(function(){
		$('.file-name').val('Click the browse button to select pictures...');
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
			$('#description-field').text('Abstract');
			$('.thesis').removeClass('hidden');
		}
		else{
			$('#description-field').text('Description');
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
		}
		else{
			$('.add-producer').addClass('hidden');
			$('.photograph').addClass('hidden');
			$('.multimedia').addClass('hidden');
			$('.add-co-author').removeClass('hidden');
			$('.author-photographer-director').text('Authors');
			$('#add-co-author-button').text('Add Author');
		}

		if(selectValue == 'Photographs'){
			$('.image-div').removeClass('hidden');
			$('#image-header').removeClass('hidden');
			$('.image-group').removeClass('hidden');
			$('.image-preview').removeClass('hidden');
		}
		else{
			$('.image-div').addClass('hidden');
			$('#image-header').addClass('hidden');
			$('.image-group').addClass('hidden');
			$('.image-preview').addClass('hidden');			
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
			$('.published-span').addClass('hidden');
			$('#published-year').val('');
			$('#publisher').val('');
			$('#place').val('');
			$('.pub-help').removeClass('error');
			$('.pub-help strong').text('');
			$('.pub-help').addClass('hidden');
			$('.pub-year-help').removeClass('error');
			$('.pub-year-help').addClass('hidden');
			$('.pub-year-help strong').text('');
			$('.place-help').removeClass('error');
			$('.place-help').addClass('hidden');
			$('.place-help strong').text('');			
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
		for(i=0;i<donorNum;i++){
			$('.delete-donor').trigger('click');
		}
		for(i=0;i<purchasedNum;i++){
			$('.delete-purchased-details').trigger('click');
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
		x = $(this);
		var YearPattern = new RegExp(/^(\d{4})$/);
		var acqPattern = new RegExp(/\-\d*$/);
		var errorCounter = 0;
		var category = selectValue;
		if(category == "" || category == 'Choose Category' || category == null){
			$('.select-help').addClass('error');
			$('.select-help').removeClass('hidden');
			$('.select-help strong').text('The category field is required.');
			errorCounter++;
		}
		else{
			$('.select-help').addClass('hidden');
			$('.select-help').removeClass('error');
		}


		$('.con-category').text(category);

		var acqNumber = $('#acqNumber').val();
		acqNumber = $.trim(acqNumber);


		console.log(acqPattern.test(acqNumber));

		if(acqNumber == ""){
			$('.acqNumber-help').addClass('error');
			$('.acqNumber-help').removeClass('hidden');
			$('.acqNumber-help strong').text('The acession number is required.');
			errorCounter++;
		}
		else if(/\s/.test(acqNumber) == true){
			$('.acqNumber-help').addClass('error');
			$('.acqNumber-help').removeClass('hidden');
			$('.acqNumber-help strong').text('Spaces are not allowed. Please input a valid accession number. (e.g. Book-001)');
			errorCounter++;			
		}
		else if(acqPattern.test(acqNumber) == false){
			$('.acqNumber-help').addClass('error');
			$('.acqNumber-help').removeClass('hidden');
			$('.acqNumber-help strong').text('Accession number must end with a dash followed by numbers. (e.g. Book-001)');
			errorCounter++;			
		}
		else if(acqNumber.length > 100){
			$('.acqNumber-help').addClass('error');
			$('.acqNumber-help').removeClass('hidden');
			$('.acqNumber-help strong').text('The accession number should not exceed 100 characters.');
			errorCounter++;
		}
		else{
			$('#acqNumber').val($('#acqNumber').val().toUpperCase());
			$('.acqNumber-help').removeClass('error');
			$('.acqNumber-help').addClass('hidden');
		}

		$('.con-acq').text(acqNumber);

		var title = $('#title').val();
		title = $.trim(title);
		if(title == ""){
			$('.title-help').addClass('error');
			$('.title-help').removeClass('hidden');
			$('.title-help strong').text('The title field is required.');
			errorCounter++;
		}
		else if(title.length > 2000){
			$('.title-help').addClass('error');
			$('.title-help').removeClass('hidden');
			$('.title-help strong').text('The title field should not exceed 2000 characters.');
			errorCounter++;	
		}
		else{
			$('.title-help').removeClass('error');
			$('.title-help').addClass('hidden');
		}

		var location = $('#location').val();
		location = $.trim(location);
		$('#location').val(location);
		if(location == ""){
			$('.location-help').addClass('error');
			$('.location-help').removeClass('hidden');
			$('.location-help strong').text('The location field is required.');
			errorCounter++;
		}
		else if(location.length > 100){
			$('.location-help').addClass('error');
			$('.location-help').removeClass('hidden');
			$('.location-help strong').text('The location field should not exceed 100 characters.');
			errorCounter++;	
		}
		else{
			$('.location-help').removeClass('error');
			$('.location-help').addClass('hidden');
		}

		$('.con-location').text(location);

		var description = $('#description').val();
		description = $.trim(description);
		$('#description').val(description);

		if(description.length > 3000){
			$('.description-help').addClass('error');
			$('.description-help').removeClass('hidden');
			$('.description-help strong').text('The description field should not exceed 3000 characters.');
			errorCounter++;	
		}
		else{
			$('.description-help').removeClass('error');
			$('.description-help').addClass('hidden');
		}

		if(description.length != 0){
			$('.description-div').removeClass('hidden');
			$('.con-description').text(description);
		}
		else{
			$('.description-div').addClass('hidden');
		}

		$('.con-title').text(title);

		if(category == 'Thesis'){
			$('.con-thesis').removeClass('hidden');
			var school = $('#school').val();
				school = $.trim(school);

				if(school == ''){
					$('.school-help').addClass('error');
					$('.school-help').removeClass('hidden');
					$('.school-help strong').text('The school field is required.');
					errorCounter++;
				}
				else if(school.length > 100){
					$('.school-help').addClass('error');
					$('.school-help').removeClass('hidden');
					$('.school-help strong').text('The school field should not exceed 100 characters.');
					errorCounter++;			
				}
				else{
					$('.school-help').removeClass('error');
					$('.school-help').addClass('hidden');
				}

				$('.con-school').text(school);

				var course = $('#course').val();
				course = $.trim(course);

				if(course == ''){
					$('.course-help').addClass('error');
					$('.course-help').removeClass('hidden');
					$('.course-help strong').text('The course field is required.');
					errorCounter++;
				}
				else if(course.length > 100){
					$('.course-help').addClass('error');
					$('.course-help').removeClass('hidden');
					$('.course-help strong').text('The course field should not exceed 100 characters.');
					errorCounter++;			
				}
				else{
					$('.course-help').removeClass('error');
					$('.course-help').addClass('hidden');
				}

				$('.con-course').text(course);
		}
		else{
			$('.con-thesis').addClass('hidden');
		}

		nameArray=[];
		authorArray=[];

		var name = '';
		if(category != 'Compact Discs' && category != 'Digital Versatile Discs' && category != 'Video Home Systems' && category != 'Cassette Tapes'){
			name = 'author';
			$('.multimedia-div').addClass('col-md-6').removeClass('col-md-4');
			$('.prod-div').addClass('hidden');
			$('.con-multimedia').addClass('hidden');
			$('.person').text('Authors');
		}
		else{
			$('.person').text('Directors');
			$('.con-multimedia').removeClass('hidden');
			$('.multimedia-div').removeClass('col-md-6').addClass('col-md-4');
			$('.prod-div').removeClass('hidden');	
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
					$(this).children('.prod-firstnames').children('span').addClass('error');
					$(this).children('.prod-firstnames').children('span').removeClass('hidden');
					$(this).children('.prod-firstnames').children('span').children('strong').text('The first name of the producer is required.');
					errorCounter++;
				}
				else if($(this).children('.prod-firstnames').children().children('input').val() >= 100){
					$(this).children('.prod-firstnames').children('span').addClass('error');
					$(this).children('.prod-firstnames').children('span').removeClass('hidden');
					$(this).children('.prod-firstnames').children('span').children('strong').text('The first name of the producer should not exceed 100 characters.');
				}
				else{
					$(this).children('.prod-firstnames').children('span').removeClass('error');
					$(this).children('.prod-firstnames').children('span').addClass('hidden');
					nameArray.push($(this).children('.prod-firstnames').children().children('input').val());
				}
				if($(this).children('.prod-middlenames').children().children('input').val() == ''){
					$(this).children('.prod-middlenames').children('span').addClass('error');
					$(this).children('.prod-middlenames').children('span').removeClass('hidden');
					$(this).children('.prod-middlenames').children('span').children('strong').text('The middle name of the producer is required.');
					errorCounter++;				
				}
				else if($(this).children('.prod-middlenames').children().children('input').val() >= 100){
					$(this).children('.prod-middlenames').children('span').addClass('error');
					$(this).children('.prod-middlenames').children('span').removeClass('hidden');
					$(this).children('.prod-middlenames').children('span').children('strong').text('The middle name of the producer should not exceed 100 characters.');
					errorCounter++;
				}
				else{
					$(this).children('.prod-middlenames').children('span').removeClass('error');
					$(this).children('.prod-middlenames').children('span').addClass('hidden');
					nameArray.push($(this).children('.prod-middlenames').children().children('input').val());
				}
				if($(this).children('.prod-lastnames').children().children('input').val() == ''){
					$(this).children('.prod-lastnames').children('span').addClass('error');
					$(this).children('.prod-lastnames').children('span').removeClass('hidden');
					$(this).children('.prod-lastnames').children('span').children('strong').text('The last name of the producer is required.');
					errorCounter++;				
				}
				else if($(this).children('.prod-lastnames').children().children('input').val() >= 100){
					$(this).children('.prod-lastnames').children('span').addClass('error');
					$(this).children('.prod-lastnames').children('span').removeClass('hidden');
					$(this).children('.prod-lastnames').children('span').children('strong').text('The last name of the producer should not exceed 100 characters.');
					errorCounter++;
				}
				else{
					$(this).children('.prod-lastnames').children('span').removeClass('error');
					$(this).children('.prod-lastnames').children('span').addClass('hidden');
					nameArray.push($(this).children('.prod-lastnames').children().children('input').val());
				}			
			});

			if(nameArray.length == 0){
				$('.multimedia-div').removeClass('col-md-4').addClass('col-md-6');
				$('.prod-div').addClass('hidden');
			}
			else{
				producers = '';
				for(i=0;i<nameArray.length;i+=3){
					fullname = nameArray[i] + ' ' + nameArray[i+1] + ' ' + nameArray[i+2];
					producers += fullname;
					producers += ', ';
				}

				producers = producers.replace(/,\s*$/, "");
				$('.con-prod-fullname').text(producers);				
			}

			producerArray.push(nameArray);
			nameArray=[];
			$('#producers').val(producerArray);

			if(hour=='' && minute =='' && second == ''){
				$('.duration-help').addClass('error');
				$('.duration-help').removeClass('hidden');
				$('.duration-help strong').text('The duration field is required.');
				errorCounter++;			
			}
			else{
				$('.duration-help').removeClass('error');
				$('.duration-help').addClass('hidden');
			}

			if(hour == ''){
				hour = 0;
			}
			else if(hourValue == false){
				$('.hour-help').addClass('error');
				$('.hour-help').removeClass('hidden');
				$('.hour-help strong').text('The hour field is in incorrect format.');
				errorCounter++;		
			}
			else if(hour.length >4){
				$('.hour-help').addClass('error');
				$('.hour-help').removeClass('hidden');
				$('.hour-help strong').text('The hour field should not exceed 4 digits.');
				errorCounter++;
			}
			else{
				$('.hour-help').removeClass('error');
				$('.hour-help').addClass('hidden');
			}

			if(minute == ''){
				minute = 0;
				$('#minutes').val(minute);
			}
			else if(minuteValue == false){
				$('.minute-help').addClass('error');
				$('.minute-help').removeClass('hidden');
				$('.minute-help strong').text('The minute field is in incorrect format.');
				errorCounter++;			
			}
			else if(minute.length >4){
				$('.minute-help').addClass('error');
				$('.minute-help').removeClass('hidden');
				$('.minute-help strong').text('The minute field should not exceed 4 digits.');
				errorCounter++;			
			}
			else{
				$('.minute-help').removeClass('error');
				$('.minute-help').addClass('hidden');
			}

			if(second == ''){
				second = 0;
				$('#seconds').val(second);
			}
			else if(secondValue == false){
				$('.second-help').addClass('error');
				$('.second-help').removeClass('hidden');
				$('.second-help strong').text('The second field is in incorrect format.');
				errorCounter++;			
			}
			else if(second.length >4){
				$('.second-help').addClass('error');
				$('.second-help').removeClass('hidden');
				$('.second-help strong').text('The second field should not exceed 4 characters.');
				errorCounter++;			
			}
			else{
				$('.second-help').removeClass('error');
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
			$('.con-duration').text(hour + ':' + minute + ':' + second);
		}
		if(category == 'Photographs'){
			$('.con-photographs').removeClass('hidden');
			name = 'photographer';
			$('#size').val($.trim($('#size').val()));

			var size = $('#size').val();

			if(size == ""){
				$('.size-help').addClass('error');
				$('.size-help').removeClass('hidden');
				$('.size-help strong').text('The size field is required.');
				errorCounter++;				
			}
			else if(size.length > 50){
				$('.size-help').addClass('error');
				$('.size-help').removeClass('hidden');
				$('.size-help strong').text('The size field should not exceed 50 characters.');
				errorCounter++;			
			}
			else{
				$('.size-help').removeClass('error');
				$('.size-help').addClass('hidden');
			}

			$('.con-pic-size').text(size);

			var photographYear = $('#year').val();
			photographYear = $.trim(photographYear);
			photographYearValue = YearPattern.test(photographYear);
			if(photographYear == ''){
				$('.year-help').addClass('error');
				$('.year-help').removeClass('hidden');
				$('.year-help strong').text('The year field is required.');
				errorCounter++;			
			}
			else if(photographYearValue == false){
				$('.year-help').addClass('error');
				$('.year-help').removeClass('hidden');
				$('.year-help strong').text('The format of year field is incorrect.');
				errorCounter++;
			}
			else{
				$('.year-help').removeClass('error');
				$('.year-help').addClass('hidden');
			}
			$('.con-pic-year').text(photographYear);
		}
		else{
			$('.con-photographs').addClass('hidden');
		}

		$('.co-author').each(function(){
				if($.trim($(this).children('.firstnames').children().children("input").val()) == ""){
					$(this).children('.firstnames').children('span').addClass('error');
					$(this).children('.firstnames').children('span').removeClass('hidden');
					$(this).children('.firstnames').children('span').children('strong').text('The first name of the ' + name  +' is required.');
					errorCounter++;
				}
				else if($(this).children('.firstnames').children().children("input").val().length >=100){
					$(this).children('.firstnames').children('span').addClass('error');
					$(this).children('.firstnames').children('span').removeClass('hidden');
					$(this).children('.firstnames').children('span').children('strong').text('The first name field should not exceed 100 characters.');
					errorCounter++;								
				}
				else{
					$(this).children('.firstnames').children('span').removeClass('error');
					$(this).children('.firstnames').children('span').addClass('hidden');
					nameArray.push($(this).children('.firstnames').children().children("input").val());
				}
				if($.trim($(this).children('.middlenames').children().children("input").val()) == ""){
					$(this).children('.middlenames').children().children("input").val(" ");
					nameArray.push($(this).children('.middlenames').children().children("input").val());
				}
				else if($(this).children('.middlenames').children().children("input").val().length >=100){
					$(this).children('.middlenames').children('span').addClass('error');
					$(this).children('.middlenames').children('span').removeClass('hidden');
					$(this).children('.middlenames').children('span').children('strong').text('The middle name field should not exceed 100 characters.');
					errorCounter++;			
				}
				else{
					$(this).children('.middlenames').children('span').removeClass('error');
					$(this).children('.middlenames').children('span').addClass('hidden');
					nameArray.push($(this).children('.middlenames').children().children("input").val());
				}
				if($.trim($(this).children('.lastnames').children().children("input").val()) == ""){
					$(this).children('.lastnames').children('span').addClass('error');
					$(this).children('.lastnames').children('span').removeClass('hidden');
					$(this).children('.lastnames').children('span').children('strong').text('The last name of the ' + name  +' is required.');
					errorCounter++;
				}
				else if($(this).children('.lastnames').children().children("input").val().length >=100){
					$(this).children('.lastnames').children('span').addClass('error');
					$(this).children('.lastnames').children('span').removeClass('hidden');
					$(this).children('.lastnames').children('span').children('strong').text('The last name field should not exceed 100 characters.');
					errorCounter++;
				}
				else{
					$(this).children('.lastnames').children('span').removeClass('error');
					$(this).children('.lastnames').children('span').addClass('hidden');
					nameArray.push($(this).children('.lastnames').children().children("input").val());
				}					
		});

		authors = '';
		for(i=0;i<nameArray.length;i+=3){
			fullname = nameArray[i] + ' ' + nameArray[i+1] + ' ' + nameArray[i+2];
			authors += fullname;
			authors += ', ';
		}

		authors = authors.replace(/,\s*$/, "");
		$('.con-fullname').text(authors);
		
		if($('#category').val() == 'Photographs'){
			$('.person').text('Photographer');
		}
		else if($('#category').val() != 'Photographs' 
		&& $('#category').val() != 'Compact Discs' 
		&& $('#category').val() != 'Digital Versatile Discs' 
		&& $('#category').val() != 'Video Home Systems' 
		&& $('#category').val() != 'Cassette Tapes'){
			$('.person').text('Authors');
		}

		tagArray=[];
		$('#authors').val(nameArray);
		$('.tag').each(function(){
			if($.trim($(this).children().children('input').val()) == ''){
			}
			else{
				tagArray.push($(this).children().children('input').val());
			}
			if($(this).children().children('input').val().length >= 100){
				$(this).children('span').removeClass('hidden');
				$(this).children('span').addClass('error');
				$(this).children('span').children('strong').text('The tag field should not exceed 100 characters.');
				errorCounter++;
			}
			else{
				$(this).children('span').removeClass('error');
				$(this).children('span').addClass('hidden');
			}
		});

		if(tagArray.length == 0){
			$('.con-tags').addClass('hidden');
		}
		else{
			$('.con-tags').removeClass('hidden');
			tags = '';
			for(i=0;i<tagArray.length;i++){
				tags += tagArray[i];
				tags += ', ';
			}

			tags = tags.replace(/,\s*$/, "");
			$('.con-tag').text(tags);		
		}

		$('#tags').val(tagArray);
		if(pubStatus.length == 0){
			$('.publish-status-help strong').text('The publish field is required.');
			$('.publish-status-help').removeClass('hidden');
			$('.publish-status-help').addClass('error');
			errorCounter++;
		}
		else{
			$('.publish-status-help').removeClass('error');
			$('.publish-status-help').addClass('hidden');
			if(pubStatus == 'Published'){
				$('.published-span').removeClass('hidden');
				$('.con-pub-status').text(pubStatus);
				if($.trim($('#publisher').val()) == ""){
					$('.pub-help strong').text('The publisher field is required.');
					$('.pub-help').removeClass('hidden');
					$('.pub-help').addClass('error');
					errorCounter++;
				}
				else if($('#publisher').val().length > 100){
					$('.pub-help strong').text('The publisher field should not exceed 100 characters.');
					$('.pub-help').removeClass('hidden');
					$('.pub-help').addClass('error');
					errorCounter++;					
				}
				else{
					$('.pub-help').removeClass('error');
					$('.pub-help').addClass('hidden');
				}

				$('.con-pub-fullname').text($('#publisher').val());

				publishedYearValue = YearPattern.test($('#published-year').val());
				if($('#published-year').val() == ""){
					$('.pub-year-help strong').text('The year field is required.');
					$('.pub-year-help').removeClass('hidden');
					$('.pub-year-help').addClass('error');
					errorCounter++;
				}
				else if(publishedYearValue == false){
					$('.pub-year-help strong').text('The year field should only be four digits.');
					$('.pub-year-help').removeClass('hidden');
					$('.pub-year-help').addClass('error');
					errorCounter++					
				}
				else{
					$('.pub-year-help').removeClass('error');
					$('.pub-year-help').addClass('hidden');
				}

				$('.con-pub-year').text($('#published-year').val());

				if($.trim($('#place').val()) == ""){
					$('.place-help strong').text('The place field is required.');
					$('.place-help').removeClass('hidden');
					$('.place-help').addClass('error');
					errorCounter++;
				}
				else{
					$('.place-help').removeClass('error');
					$('.place-help').addClass('hidden');
				}

				$('.con-pub-place').text($('#place').val());
			}
			else if(pubStatus == 'Unpublished'){
			}
		}

		var copyPattern = new RegExp(/^\d+$/);

		donorCopiesArray = [];
		donorsArray = [];
		donorDatesArray = [];

		totalCopies = 0;


		if(donorNum != 0){
			$('.co-donor').each(function(){
				if($(this).children('.donor-copies').children().children("input").val() == ""){
					$(this).children('.donor-copies').children('span').addClass('error');
					$(this).children('.donor-copies').children('span').removeClass('hidden');
					$(this).children('.donor-copies').children('span').children('strong').text('The copy field is required.');
					errorCounter++;
				}
				else if(copyPattern.test($(this).children('.donor-copies').children().children("input").val()) == false){
					console.log('asdfa');
					$(this).children('.donor-copies').children('span').addClass('error');
					$(this).children('.donor-copies').children('span').removeClass('hidden');
					$(this).children('.donor-copies').children('span').children('strong').text('Please enter numbers without a decimal.');
					errorCounter++;								
				}
				else if($(this).children('.donor-copies').children().children("input").val() < 0){
					$(this).children('.donor-copies').children('span').addClass('error');
					$(this).children('.donor-copies').children('span').removeClass('hidden');
					$(this).children('.donor-copies').children('span').children('strong').text('Please enter a positive number.');
					errorCounter++;						
				}
				else{
					$(this).children('.donor-copies').children('span').removeClass('error');
					$(this).children('.donor-copies').children('span').addClass('hidden');
					donorCopiesArray.push($(this).children('.donor-copies').children().children("input").val());
					totalCopies += parseInt($(this).children('.donor-copies').children().children("input").val());
				}

				if($.trim($(this).children('.donor-firstnames').children().children("input").val()) == ""){
					$(this).children('.donor-firstnames').children('span').addClass('error');
					$(this).children('.donor-firstnames').children('span').removeClass('hidden');
					$(this).children('.donor-firstnames').children('span').children('strong').text('The first name field is required.');
					errorCounter++;
				}
				else if($(this).children('.donor-firstnames').children().children("input").val().length >=100){
					$(this).children('.donor-firstnames').children('span').addClass('error');
					$(this).children('.donor-firstnames').children('span').removeClass('hidden');
					$(this).children('.donor-firstnames').children('span').children('strong').text('The first name field should not exceed 100 characters.');
					errorCounter++;								
				}
				else{
					$(this).children('.donor-firstnames').children('span').removeClass('error');
					$(this).children('.donor-firstnames').children('span').addClass('hidden');
					donorsArray.push($(this).children('.donor-firstnames').children().children("input").val());
				}

				// if($.trim($(this).children('.donor-middlenames').children().children("input").val()) == ""){
				// 	$(this).children('.donor-middlenames').children('span').addClass('error');
				// 	$(this).children('.donor-middlenames').children('span').removeClass('hidden');
				// 	$(this).children('.donor-middlenames').children('span').children('strong').text('The middle name field is required.');
				// 	errorCounter++;
				// }
				if($(this).children('.donor-middlenames').children().children("input").val().length >=100){
					$(this).children('.donor-middlenames').children('span').addClass('error');
					$(this).children('.donor-middlenames').children('span').removeClass('hidden');
					$(this).children('.donor-middlenames').children('span').children('strong').text('The middle name field should not exceed 100 characters.');
					errorCounter++;								
				}
				else{
					$(this).children('.donor-middlenames').children('span').removeClass('error');
					$(this).children('.donor-middlenames').children('span').addClass('hidden');
					donorsArray.push($(this).children('.donor-middlenames').children().children("input").val());
				}

				if($.trim($(this).children('.donor-lastnames').children().children("input").val()) == ""){
					$(this).children('.donor-lastnames').children('span').addClass('error');
					$(this).children('.donor-lastnames').children('span').removeClass('hidden');
					$(this).children('.donor-lastnames').children('span').children('strong').text('The last name field is required.');
					errorCounter++;
				}
				else if($(this).children('.donor-lastnames').children().children("input").val().length >=100){
					$(this).children('.donor-lastnames').children('span').addClass('error');
					$(this).children('.donor-lastnames').children('span').removeClass('hidden');
					$(this).children('.donor-lastnames').children('span').children('strong').text('The last name field should not exceed 100 characters.');
					errorCounter++;								
				}
				else{
					$(this).children('.donor-lastnames').children('span').removeClass('error');
					$(this).children('.donor-lastnames').children('span').addClass('hidden');
					donorsArray.push($(this).children('.donor-lastnames').children().children("input").val());
				}

				datePattern = new RegExp(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/);

				dateTest = datePattern.test($(this).children('.donor-dates').children().children("input").val());

				if(dateTest == false){
					$(this).children('.donor-dates').children('span').addClass('error');
					$(this).children('.donor-dates').children('span').removeClass('hidden');
					$(this).children('.donor-dates').children('span').children('strong').text('The date field is invalid.');
					errorCounter++;
				}
				else{
					$(this).children('.donor-dates').children('span').removeClass('error');
					$(this).children('.donor-dates').children('span').addClass('hidden');
					donorDatesArray.push($(this).children('.donor-dates').children().children("input").val());
				}		
			});

			$('#donorCopies').val(donorCopiesArray);
			$('#donors').val(donorsArray);
			$('#donorDates').val(donorDatesArray);

			$('.confirm-donors').removeClass('hidden');

			index = 0;
			for(i=0;i<donorsArray.length;i+=3){
				fullname = donorsArray[i] + ' ' + donorsArray[i+1] + ' ' + donorsArray[i+2];
				newDonor = $(document.createElement('span'));
				newDonor.after().html(
					"<p>" + "Donor: " + fullname + "</p>" +
					"<p>" + "Date Donated: " + donorDatesArray[index] + "</p>" +
					"<p>" + "Number of Copies: " + donorCopiesArray[index] + "</p>" +
					"<hr/>"
				);
				$('.confirm-donors').append(newDonor);
				index++;
			}
		}
		else{
			$('.confirm-donors').addClass('hidden');
		}


		purchCopiesArray = [];
		purchAmountArray = [];
		purchDateArray = [];
		purchAddressArray = [];

		if(purchasedNum != 0){
			$('.co-purchased').each(function(){
				if($(this).children('.purchased-copies').children().children("input").val() == ""){
					$(this).children('.purchased-copies').children('span').addClass('error');
					$(this).children('.purchased-copies').children('span').removeClass('hidden');
					$(this).children('.purchased-copies').children('span').children('strong').text('The copy field is required.');
					errorCounter++;
				}
				else if (copyPattern.test($(this).children('.purchased-copies').children().children("input").val()) == false){
					$(this).children('.purchased-copies').children('span').addClass('error');
					$(this).children('.purchased-copies').children('span').removeClass('hidden');
					$(this).children('.purchased-copies').children('span').children('strong').text('Please enter numbers without a decimal.');
					errorCounter++;
				}
				else if($(this).children('.purchased-copies').children().children("input").val().length > 4){
					$(this).children('.purchased-copies').children('span').addClass('error');
					$(this).children('.purchased-copies').children('span').removeClass('hidden');
					$(this).children('.purchased-copies').children('span').children('strong').text('The copy field should not exceed 4 digits.');
					errorCounter++;				
				}
				else if($(this).children('.purchased-copies').children().children("input").val().length < 0){
					$(this).children('.purchased-copies').children('span').addClass('error');
					$(this).children('.purchased-copies').children('span').removeClass('hidden');
					$(this).children('.purchased-copies').children('span').children('strong').text('Please enter a positive number.');
					errorCounter++;				
				}				
				else{
					$(this).children('.purchased-copies').children('span').removeClass('error');
					$(this).children('.purchased-copies').children('span').addClass('hidden');
					purchCopiesArray.push($(this).children('.purchased-copies').children().children("input").val());
					totalCopies += parseInt($(this).children('.purchased-copies').children().children("input").val());
				}


				var amountPattern = new RegExp(/^[\d,]*(\.\d*)?$/,"g");
				var amountValue = amountPattern.test($(this).children('.purchased-amounts').children().children("input").val());

				if($(this).children('.purchased-amounts').children().children("input").val() == ""){
					$(this).children('.purchased-amounts').children('span').addClass('error');
					$(this).children('.purchased-amounts').children('span').removeClass('hidden');
					$(this).children('.purchased-amounts').children('span').children('strong').text('The amount field is required.');
					errorCounter++;				
				}
				else if(amountValue == false){
					$(this).children('.purchased-amounts').children('span').addClass('error');
					$(this).children('.purchased-amounts').children('span').removeClass('hidden');
					$(this).children('.purchased-amounts').children('span').children('strong').text('Incorrect format for amount.');
					errorCounter++;
				}
				else if($(this).children('.purchased-amounts').children().children("input").val().length > 20){
					$(this).children('.purchased-amounts').children('span').addClass('error');
					$(this).children('.purchased-amounts').children('span').removeClass('hidden');
					$(this).children('.purchased-amounts').children('span').children('strong').text('The amount field should not exceed 20 digits.');
					errorCounter++;			
				}
				else{
					$(this).children('.purchased-amounts').children('span').removeClass('error');
					$(this).children('.purchased-amounts').children('span').addClass('hidden');				
					purchAmountArray.push($(this).children('.purchased-amounts').children().children("input").val());
				}

				datePattern = new RegExp(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/);

				dateTest = datePattern.test($(this).children('.purchased-dates').children().children("input").val());

				if(dateTest == false){
					$(this).children('.purchased-dates').children('span').addClass('error');
					$(this).children('.purchased-dates').children('span').removeClass('hidden');
					$(this).children('.purchased-dates').children('span').children('strong').text('The date field is invalid.');
					errorCounter++;
				}
				else{
					$(this).children('.purchased-dates').children('span').removeClass('error');
					$(this).children('.purchased-dates').children('span').addClass('hidden');
					purchDateArray.push($(this).children('.purchased-dates').children().children("input").val());
				}

				if($.trim($(this).children('.purchased-addresses').children().children("input").val()) == ""){
					$(this).children('.purchased-addresses').children('span').addClass('error');
					$(this).children('.purchased-addresses').children('span').removeClass('hidden');
					$(this).children('.purchased-addresses').children('span').children('strong').text('The address field is required.');
					errorCounter++;
				}
				else if($(this).children('.purchased-addresses').children().children("input").val().length >=100){
					$(this).children('.purchased-addresses').children('span').addClass('error');
					$(this).children('.purchased-addresses').children('span').removeClass('hidden');
					$(this).children('.purchased-addresses').children('span').children('strong').text('The address field should not exceed 100 characters.');
					errorCounter++;								
				}
				else{
					$(this).children('.purchased-addresses').children('span').removeClass('error');
					$(this).children('.purchased-addresses').children('span').addClass('hidden');
					purchAddressArray.push($(this).children('.purchased-addresses').children().children("input").val());
				}					
			});
			$('#purchasedCopies').val(purchCopiesArray);
			$('#purchasedAmount').val(purchAmountArray);
			$('#purchasedDate').val(purchDateArray);
			$('#purchasedAddress').val(purchAddressArray);
			$('.confirm-purchased').removeClass('hidden');
		}
		else{
			$('.confirm-purchased').addClass('hidden');
		}

		for(i=0;i<purchCopiesArray.length;i++){
			newPurch = $(document.createElement('span'));
			newPurch.after().html(
				"<p>" + "Number of Copies: " + purchCopiesArray[i] + "</p>" +
				"<p>" + "Amount: " + purchAmountArray[i] + "</p>" +
				"<p>" + "Date Purchased: " + purchDateArray[i] + "</p>" +
				"<p>" + "Address: " + purchAddressArray[i] + "</p>" +
				"<hr/>"
			);
			$('.confirm-purchased').append(newPurch);
		}

		$('.con-count').text(totalCopies);

		$('#copies').val(totalCopies);

		if(donorNum == 0 && purchasedNum == 0){
			errorCounter++;
			$('.acquisition-details-help').removeClass('hidden');
			$('.acquisition-details-help').addClass('error');
			$('.acquisition-details-help strong').text('The acquisition details is required.');
		}
		else{
			$('.acquisition-details-help').addClass('hidden');
			$('.acquisition-details-help').removeClass('error');
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
					if(accessionCheck == 0){
						$('.acqNumber-help').addClass('hidden');
						$('.acqNumber-help').removeClass('error');
					}
					else{
						$('.acqNumber-help').addClass('error');
						$('.acqNumber-help').removeClass('hidden');
						$('.acqNumber-help strong').text('The accession number ' + acqNumber + ' already exists.');					
						errorCounter++;
					}
				}
			});			
		}
		if(errorCounter == 0){
			$('.material-close').prop('disabled', true);
			$('#material-reset').prop('disabled', true);
			$('#material-submit').prop('disabled', true);			
			$('#material-submit').css('cursor', 'wait');
			$('.modal-body').css('cursor', 'wait');
			$('body').css('cursor', 'wait');
			checkAcq().done(function(r){
				if(r.accessionNumber != 0){
					console.log('hahaha');
					$("body").css("cursor", "default");
					$('.modal-body').css('cursor', 'default');
					$('#material-submit').css('cursor', 'default');
					$('.material-close').prop('disabled', false);
					$('#material-reset').prop('disabled', false);
					$('#material-submit').prop('disabled', false);
					// $('#material-modal').animate({
					//    scrollTop: ($('.error').first().offset().top)
					// },500);
					// $(".modal-body").effect( "shake", { direction: "left", times: 3, distance: 10}, 500 );								
					// return false;
				}
				else{
					$('.modal-body').css('cursor', 'wait');
					$('body').css('cursor', 'wait');
					if($('.file-name').val() == 'Click the browse button to select pictures...' || $('.file-name').val() == ''){
						$('.image-div').addClass('hidden');
					}
					else{
						$('.image-div').removeClass('hidden');
					}
					hideModal();
					$('#confirm-add-modal').modal('show');
				}
			}).
			fail(function(x){
				return false;
			});	
		}
		else{
			console.log('hehehe');
			$('.confirm-donors').children().remove();
			$('.material-close').prop('disabled', false);
			$('#material-reset').prop('disabled', false);
			$('#material-submit').prop('disabled', false);				
			$('#material-modal').animate({
			   scrollTop: ($('.error').first().offset().top)
			});
			$(".modal-body").effect( "shake", { direction: "left", times: 3, distance: 10}, 500 );
			return false;
		}
		return false;
	});

	if($('.success-status').hasClass('has-status') == true){
		$('.success-status').fadeIn().delay(2000).fadeOut();
	}

	$('#confirm-add-modal').on('shown.bs.modal', function(){
		$('#material-submit').css('cursor', 'default');
		$('.modal-body').css('cursor', 'default');
		$('body').css('cursor', 'default');
	});

	$('#confirm-cancel').click(function(){
		$('.modal-body').css('cursor', 'default');
		$('body').css('cursor', 'default');
		$('.material-close').prop('disabled', false);
		$('#material-reset').prop('disabled', false);
		$('#material-submit').prop('disabled', false);
		$('.confirm-donors').children().remove();
		$('.confirm-purchased').children().remove();
		showModal();
	})

	$('#confirm-submit').click(function(){
		$('#confirm-cancel').prop('disabled', true);
		$('#confirm-submit').text('Adding');
		$('#confirm-submit').prop('disabled', true);
		$("body").css("cursor", "wait");
		$('.material-form').submit();
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
				"<span class='input-group-addon label-title'>First Name*</span>" +
				"<input type='text' id='author-firstname' class='form-control' placeholder='Jose' name='author-firstname'/>" +
			"</div>" +
			"<span class='author-firstname-help help-block hidden'>" +
				"<strong></strong>" +
			"</span>" +
			"</span>" +
			"<span class='middlenames'>" +
			"<div class='input-group'>"+
				"<span class='input-group-addon label-title'>Middle Name*</span>" +
				"<input type='text' id='author-middlename' class='form-control' placeholder='Salazar' name='author-middlename'/>" +
			"</div>" +
			"<span class='author-middlename-help help-block hidden'>" +
				"<strong></strong>" +
			"</span>" +
			"</span>" +
			"<span class='lastnames'>" +
			"<div class='input-group'>"+
				"<span class='input-group-addon label-title'>Last Name*</span>" +
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

	function exitMaterialModal(){
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
		$('.search').prop('disabled', false);
	}

	$('#add-close').click(function(){
		showModal();
	});

	$('#material-cancel-add').click(function(){
		showModal();
		$('.edit-close').trigger('click');
		addCounter = false;
		$('#add-confirm-modal').modal('hide');
		$('#material-modal').modal('hide');
	});

	$('.material-close').click(function(){
		fadeModal();
		if(addCounter == true){
			$('#add-confirm-modal').modal('show');
		}	
	});

	$('#add-confirm-modal').on('hidden.bs.modal', function(){
		$('body').addClass('modal-open');
	});	

	var tableAuthorCounter = 0;
	var tableTagsCounter = 0;
	var tableProducerCounter= 0;
	var category ='';
	var acqNumber ='';
	var title = '';
	var tagsArray = [];
	var donorFirstnamesArray = [];
	var donorMiddlenamesArray = [];
	var donorLastnamesArray = [];
	var donorCopiesArray = [];
	var donorDatesArray = [];
	var purchCopiesArray  = [];
	var purchAmountsArray = [];
	var purchDatesArray = [];
	var purchAddressesArray = [];
	var donorsLength = 0;
	var purchLength = 0;
	var authorsArray = [];
	var course ='';
	var school ='';
	var photo_firstname = '';
	var photo_middlename = '';
	var photo_lastname = '';
	var photo_size ='';
	var photo_type ='MB';
	var description = '';
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

	function checkBorrowed(material_id){
		return $.ajax({
			type: 'GET',
			url: '/dashboard/check/borrowed/' + material_id,
			success: function(data){
			}
		});				
	}

	function viewMaterial(material_id){
		return $.ajax({
			async: true,			
			headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			type: "GET",
			url: 'material/' + material_id,
			success: function (data) {
				$('.username').text(data.user);
				if($('#user-type').val() == 'user'){
					$('#acqNumber').parent().addClass('hidden');
				}
				console.log(data);
				donorsLength = data.donor_firstnames.length;
				purchLength = data.purch_copies.length;
				donorsArray = data.donors;
				donorFirstnamesArray = data.donor_firstnames;
				donorMiddlenamesArray = data.donor_middlenames;
				donorLastnamesArray = data.donor_lastnames;
				donorCopiesArray = data.donor_copies;
				donorDatesArray = data.donor_dates;
				purchCopiesArray  = data.purch_copies;
				purchAmountsArray = data.purch_amounts;
				purchDatesArray = data.purch_dates;
				purchAddressesArray = data.purch_addresses;
				$("body").css("cursor", "default");
				category = data.category;
				acqNumber = data.acqNumber;
				aqoh = data.acqNumber;
				course = data.course;
				school = data.school;
				title = data.title;
				description = data.description;
				console.log(data.description);
				if(data.description == null){
					$('#description-field').parent().addClass('hidden');
				}
				else{
					$('#description-field').parent().removeClass('hidden');
				}
				if(data.picture != ''){
					$('.image-preview').removeClass('hidden');
					$('#image-header').removeClass('hidden');
					url = "url(" + data.picture + ")";
					$('.image-preview').css({
						'background-image': url,
						'background-repeat': 'no-repeat',
						'background-size': 'contain',
						'background-position': 'center center',
						'width': '100%',
						'height': '400px'
					});
				}
				else{
					$('.image-group').addClass("hidden");
					$('#image-header').addClass('hidden');
				}
				$('#copy').val(data.copy);
				$('#description').val(data.description);
				$('#location').val(data.location);
				$('.material-acqNumber').text(title);
				$('#category').val(category);
				selectValue= data.category;
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
					$('.author-photographer-director').text('Directors');
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
					$('.author-photographer-director').text('Authors');
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
					$('.tags-div').addClass('hidden');
				}
				else{
					$('.tags-div').removeClass('hidden');
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

				$('.tbody-donors').children().remove();

				if(data.donor_copies.length != 0){
					$('.donors').removeClass('hidden');
					for(i=0;i<data.donor_copies.length;i++){
						newDonor = $(document.createElement('tr'));
						newDonor.after().html(
							"<td>" + donorFirstnamesArray[i] + " " + donorMiddlenamesArray[i] + " " + donorLastnamesArray[i]  + "</td>" +
							"<td>" + data.donor_copies[i] + "</td>" +
							"<td>" + data.donor_dates[i] + "</td>"
						);
						$('.tbody-donors').append(newDonor);
					}
				}
				else{
					$('.donors').addClass('hidden');
				}

				$('.tbody-purchases').children().remove();

				if(data.purch_addresses.length !=0){
					$('.purchases').removeClass('hidden');
					for(i=0;i<data.purch_addresses.length;i++){
						newPurch = $(document.createElement('tr'));
						newPurch.after().html(
							"<td>" + data.purch_amounts[i] + "</td>" +
							"<td>" + data.purch_copies[i] + "</td>" +
							"<td>" + data.purch_dates[i] + "</td>" +
							"<td>" + data.purch_addresses[i] + "</td>"
						);
						$('.tbody-purchases').append(newPurch);
					}
				}
				else{
					$('.purchases').addClass('hidden');
				}

				if(category=='Photographs'){
					$('.photograph').removeClass('hidden');
					photo_firstname = data.photo_firstname;
					photo_middlename = data.photo_middlename;
					photo_lastname = data.photo_lastname;
					photo_size = data.photo_size;
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
				}
				else{
					$('.photograph').addClass('hidden');
				}
				$('#title').prop('disabled', true);
				$('#description').prop('disabled', true);
				$('input').each(function(){
				if($(this).attr('name') == '_token' || $(this).attr('name') == 'material-acqNumber' || $(this).attr('value') == 'user' || $(this).attr('name') == 'picname' || $(this).attr('class') == 'form-control file-name'){
				}
				else{
					$(this).prop('disabled', true);
				}		
				});
				$('select').prop('disabled', true);
			}	
		});
	}

	$('body').on('click', '.material-view-button', function(){
		$('.modified').removeClass('hidden');
		$('.acquisition-div').addClass('hidden');
		$('.view-close').removeClass('hidden');
		$('.material-close').addClass('hidden');
		$('.edit-close').removeClass('hidden');
		$('.modal-title').text('View Material');
		$('#material-reset').addClass('hidden');
		$('#material-submit').addClass('hidden');
		$('.co-author').addClass('hidden');
		$('.add-co-author').addClass('hidden');
		$('.acquisition-field').addClass('hidden');
		$('.acquisition-radio').addClass('hidden');
		$('.tables').removeClass('hidden');
		$('.tag').addClass('hidden');
		$('#edit-button').removeClass('hidden');
		var material_id = $(this).find('input').val();
		x = $(this);
		x.css('cursor', 'wait');
		$('body').css('cursor', 'wait');
		$('tr').css('pointer-events', 'none');
		viewMaterial(material_id).done(function(data){	
			$('body').css('cursor', 'default');
			$('tr').css('pointer-events', 'auto');
			x.css('cursor', 'default');
			if(data.category == 'Thesis'){
				$('#description-field').text('Abstract');
			}
			else{
				$('#description-field').text('Description');
			}
			if(data.picname != ""){
				$('#picname').val(data.picname);
				$('.file-name').val(data.picname);
			}
			if($('#user-type').val() == 'user' && $('#status-type').val() != 'unconfirmed' && data.publisher_name != ""){
				checkBorrowed(material_id).done(function(r){
					console.log(r);
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
				addViewCount(data.acqNumber);
			}
			$('#material-modal').modal('show');
		});
	});

	$('.edit-close').click(function(){
		if(editCounter == true){
			$('#edit-confirm-modal').modal('show');
			editCounter = false;
		}
		else{
			$('#material-modal').modal('hide');
		}
	});

	$('#edit-confirm-cancel').click(function(){
		$('.modified').removeClass('hidden');
		$('#copy-button').css('margin-right', '10%');
		hideEditView();
		$('#edit-confirm-modal').modal('hide');
		if(editCounter == true){
			editCounter = false;
		}
		else{
			$('.material-close').removeClass('hidden');
			$('.edit-close').addClass('hidden');
			$('.cancel-edit').addClass('hidden');
			$('#edit-confirm-modal').modal('hide');
			$('#material-modal').modal('hide');
		}
	});

	var editCounter = false;

	$('#edit-button').click(function(){
		$('#confirm-submit').text("Save changes");
		$('.modified').addClass('hidden');
		$('.acquisition-div').removeClass('hidden');
		$('.donors').addClass('hidden');
		$('.purchases').addClass('hidden');
		$('.view-close').addClass('hidden');
		$('#copy-button').css('margin-right', '18%');
		$('#description-field').parent().removeClass('hidden');
		editCounter = true;
		num=1;
		tagNum=1;
		$('#title').prop('disabled', false);
		$('#description').prop('disabled', false);
		$('.cancel-edit').removeClass('hidden');
		$('#edit-button').addClass('hidden');
		$('.author-table').addClass('hidden');
		$('.table-tags').addClass('hidden');
		$('select').prop('disabled', false);
		$('.add-co-author').removeClass('hidden');		
		$('#material-submit').removeClass('hidden');
		$('#material-reset').removeClass('hidden');
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
		$('.material-form').attr('action', window.location.origin + "/edit/material/" + acqNumber);
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

		for(i=0;i<donorsLength;i++){
			$('#add-donor-button').trigger('click');
		}

		i=0;
		$('.co-donor').each(function(){
			$(this).children('.donor-copies').children('.input-group').children('input').val(donorCopiesArray[i]);
			$(this).children('.donor-firstnames').children('.input-group').children('input').val(donorFirstnamesArray[i]);
			$(this).children('.donor-middlenames').children('.input-group').children('input').val(donorMiddlenamesArray[i]);
			$(this).children('.donor-lastnames').children('.input-group').children('input').val(donorLastnamesArray[i]);
			$(this).children('.donor-dates').children('.input-group').children('input').val(donorDatesArray[i]);
			i++;
		});		

		for(i=0;i<purchLength;i++){
			$('#add-purchased-button').trigger('click');
		}

		i=0;
		$('.co-purchased').each(function(){
			$(this).children('.purchased-copies').children('.input-group').children('input').val(purchCopiesArray[i]);
			$(this).children('.purchased-amounts').children('.input-group').children('input').val(purchAmountsArray[i]);
			$(this).children('.purchased-dates').children('.input-group').children('input').val(purchDatesArray[i]);
			$(this).children('.purchased-addresses').children('.input-group').children('input').val(purchAddressesArray[i]);		
			i++;
		});

		if(category == 'Photographs'){
			$('.image-div').removeClass('hidden');
			$('.image-group').removeClass("hidden");
			$('.co-author').each(function(){
				$(this).children('.firstnames').children('.input-group').children('input').val(photo_firstname);
				$(this).children('.middlenames').children('.input-group').children('input').val(photo_middlename);
				$(this).children('.lastnames').children('.input-group').children('input').val(photo_lastname);
			});
		}
		else{
			$('.image-div').addClass('hidden');
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
	});

	function hideEditView(){
		if(description == null){
			$('#description-field').parent().addClass('hidden');
		}
		$('#material-submit').text('Add');
		if(category == 'Compact Discs' || category == 'Cassette Tapes' || category == 'Digital Versatile Discs' || category == 'Video Home Systems'){
			$('.author-photographer-director').text('Directors');
			$('.add-producer').removeClass('hidden');
			$('.producer-table').removeClass('hidden');
		}
		else if(category == 'Photographers'){
			$('.image-group').addClass("hidden");
			$('.author-photographer-director').text('Photographer');
		}
		else{
			$('.author-photographer-director').text('Authors');
		}
		$('#add-producer-button').addClass('hidden');
		$('#title').prop('disabled', true);
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
		for(i=0;i<donorsLength;i++){
			$('.delete-donor').trigger('click');
		}
		for(i=0;i<purchLength;i++){
			$('.delete-purchased-details').trigger('click');
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
		$('.acquisition-field').addClass('hidden');
		$('.acquisition-radio').addClass('hidden');
		$('.acquisition-field').addClass('hidden');		
		$('.publish-radio').addClass('hidden');		
		$('.co-author').addClass('hidden');
		$('.tag').addClass('hidden');
		$('.add-co-author').addClass('hidden');	
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
		$('.acquisition-div').addClass('hidden');
		$('.purchases').removeClass('hidden');
		$('.donors').removeClass('hidden');
		$('.view-close').removeClass('hidden');			
	}

	$('.cancel-edit').click(function(){
		$('#edit-confirm-modal').modal('show');
	});
	// end of edit script

	function deleteMaterials(material_id, edit, newAcqNumber){
		return $.ajax({
			headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			type: "POST",
			url: 'material/delete/' + material_id + '/' + edit + '/' + 'none/none/request',
			success: function(data){
				console.log(data);
			}
		});
	}

	$('#material-confirm-delete').click(function(){
		x = $(this);
		$("body").css("cursor", "wait");
		$('.modal-body').css('cursor', 'wait');
		$('#material-confirm-delete').text('Deleting');
		$(this).prop('disabled', true);
		$('#delete-close').prop('disabled', true);
		deleteMaterials($(this).val(), false).done(function(){
			$('#material-confirm-delete').prop('disabled', false);
			$('#delete-close').prop('disabled', false);
			$('#material-confirm-delete').text('Delete');
			$('.delete-status').fadeIn().delay(2000).fadeOut();
			$("body").css("cursor", "default");
			$('.delete-status').removeClass('hidden');
			$('.success-close').trigger('click');
			$('#delete-confirm-modal').modal('hide');
			$('.material-items').children('tr.' + x.val()).remove();
			if($('.material-items').children().length == 0){
				$('#no-materials').removeClass('hidden');
			}
			showMaterial(searchType);
		});
	});

	// delete script
	$('body').on('click', '.delete-button', function(){
		material_id = $(this).val();
		$('#material-confirm-delete').val(material_id);
		$('.p-delete-invent').text("Please click the delete button to confirm deletion of material '" + material_id + "'.");
		$('#delete-confirm-modal').modal('show');
		$('.delete-status').html(
			"Successfully deleted material '" + material_id + "'!" +
			"<button type='button' class='close delete-success' aria-label='Close' data-dismiss='alert'>" +
        		"<span aria-hidden='true'>&times;</span>" +
    			"</button>"
		);		
	});

	// end of delete script

	// staff search material script

	$('.search-material-button').click(function(){
		$('#pagination-demo').removeClass('hidden');
		$('#borrowed-pagination').addClass('hidden');
		$('.results-div').removeClass('hidden');
		$('.borrowed-results-div').addClass('hidden');
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
		$('.borrow-button-div').tooltip('show')
		          .attr('data-original-title', 'Please confirm your account at the staff to borrow materials.')
		          .tooltip('fixTitle');		          
	}

	function borrowAllow(id){
		return $.ajax({
			type: 'GET',
			url: '/dashboard/borrow/' + id + '/' + $('#title').val()
		});
	}

	$('.borrow-button').click(function(){
		$(this).prop('disabled', true);
		$('.tool-tip').tooltip('hide')
		          .attr('data-original-title', 'You have already borrowed this material.')
		          .tooltip('fixTitle');
		id = $('.borrow-button').val();
		borrowAllow(id).done(function(){
			$('.borrow-status').removeClass('alert-danger').addClass('alert-success');
			$('.borrow-status').fadeIn().delay(2000).fadeOut();
			$('.borrow-message').text("Material '" + $('#title').val() +"' is pending for borrowing.");
		});
	});

	function getBorrowedMaterials(){
		return $.ajax({
			type: 'GET',
			url: '/dashboard/borrowedmaterials',
			success: function(data){
				console.log(data);
				titleArray = [];
				statusArray=[];
				for(i=0;i<data.materials.length;i++){
					var newMaterial = $(document.createElement('tr'));
					if(data.materials[i].status == 'checked out'){
						newMaterial.after().html(
							"<td>" + data.materials[i].acqNumber + "</td>" +
							"<td>" + data.materials[i].title + "</td>" +
							"<td>" + data.materials[i].status + "</td>" +
							"<td class='pull-right'></td>"
						);						
					}
					else{
						newMaterial.after().html(
							"<td>" + " " + "</td>" +
							"<td>" + data.materials[i].title + "</td>" +
							"<td>" + data.materials[i].status + "</td>" +
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

	$('.borrowed-button').click(function(){	
		$(this).prop('disabled', true);
		getBorrowedMaterials().done(function(){
			if($('.borrowed-materials-tbody').children().length == 0){
				$('#no-borrowed-materials').toggle(true);
			}
			else{
				$('#no-borrowed-materials').toggle(false);		
			}
			$('#borrow-modal').modal('show');
		});
	});

	function deleteBorrowedMaterials(acqNumber){
		return $.ajax({
			headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},			
			type: 'post',
			url: '/dashboard/material/staffDelete/' + acqNumber,
			success: function(data){
			}
		});
	}

	$('body').on('click', '.remove-borrowed-button', function(){	
		username = $(this).parent().parent().children('td:nth-child(1)').text();
		acqNumber = $(this).val();
		$('.p-delete-invent').text("Please click the delete button to delete material '" + $(this).parent().parent().children("td:nth-child(3)").text() +"'.");
		$('#staff-borrowed-confirm-delete').val(username);
		$('#staff-delete-close').val(acqNumber);
		$('#delete-borrowed-confirm-modal').modal('show');
	});

	$('#staff-borrowed-confirm-delete').click(function(){
		$('#delete-borrowed-confirm-modal').modal('hide');
		acqNumber = $('#staff-delete-close').val();
		username = $('#staff-borrowed-confirm-delete').val();
		deleteBorrowedMaterials(acqNumber, username).done(function(){
			$('.borrowed-materials-tbody').children('tr.' + username).remove();
			$('.delete-borrowed-status').removeClass('alert-success').addClass('alert-danger');
			$('.delete-borrowed-status').text("Borrowed material '" + acqNumber + "' deleted successfully");
			$('.delete-borrowed-status').fadeIn().delay(2000).fadeOut();
			if($('.borrowed-materials-tbody').children().length == 0){
				$('#no-borrowed-materials').removeClass('hidden');
				$('#no-borrowed-materials').parent().children('tr:nth-child(1)').addClass('hidden');
			}
			else{
				$('#no-borrowed-materials').addClass('hidden');
				$('#no-borrowed-materials').parent().children('tr:nth-child(1)').removeClass('hidden');
			}						
		});
	});

	function retrieveBorrowedUsers(sortType){
		return $.ajax({
			type: 'get',
			url: '/dashboard/retrieveBorrowedUsers/' + sortType,
		});
	}

	function createBorrowedUsersTable(index, max, data){
		console.log(data.length);
		if(data.length == 0){
			$('#no-borrowed-materials').parent().children('tr:nth-child(1)').addClass('hidden');
			$('#no-borrowed-materials').removeClass('hidden');
		}
		else{
			$('#no-borrowed-materials').parent().children('tr:nth-child(1)').removeClass('hidden');
			$('#no-borrowed-materials').addClass('hidden');
		}
		for(i=0;i<data.length;i++){
			usernameArray.push(data[i].username);
		}					
		for(i=0;i<usernameArray.length;i++){
			$('.' + usernameArray[i]).remove();
		}
		for(i=index;i<max;i++){
			if(data[i].status == 'checked out'){
				disabled = '';
			}
			else{
				disabled = 'disabled';
			}
			if(data[i].status == 'checked out'){
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
			acqNumber = '';
			if(data[i].status == 'checked out'){
				acqNumber = data[i].acqNumber;
			}
			newMaterial.after().html(
				"<td class='text-left'>" + data[i].username + "</td>" +
				"<td class='text-left'>" + acqNumber + "</td>" +
				"<td class='text-left'>" + data[i].title + "</td>" +
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
		retrieveBorrowedUsers(borrowedSortType).done(function(data){
			console.log(data);
			results = data;
	            var totalPages = data.length;
	            var minPage = 10;
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
					if(max <= minPage){
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
			$('#no-borrowed-materials').removeClass('hidden');
		});
	}

	$('.confirm-materials-button').click(function(){
		$('.results-div').addClass('hidden');
		$('.borrowed-results-div').removeClass('hidden');
		displayBorrowedUsers();
		$('.search').val('');
		$('#no-borrowed-materials').addClass('hidden');
		$('.search-type').html('Username ' + "<span class='caret'></span>");
		searchType = 'borrowedUsername';
		$('.search-type').val('borrowedUsername');
		$('.type-dropdown').addClass('hidden');
		$('.borrowed-dropdown').removeClass('hidden');
		$('.material-table').addClass('hidden');
		$('.confirm-material-table').removeClass('hidden');
		$('#pagination-demo').addClass('hidden');
		$('#borrowed-pagination').removeClass('hidden');
	});

	function removeBorrowed(value){
		id = value;
		return $.ajax({
			type: 'GET',
			url: '/dashboard/delete/borrowed/' + id
		});
	}

	function fadeBorrowedModal(){
		$('#borrow-modal').animate({
			opacity: 0.9
		}, 400 );
	}

	function showBorrowedModal(){
		$('#borrow-modal').animate({
			opacity: 1
		}, 400 );		
	}

	var borrowedTitle = '';
	$('body').on('click', '.student-remove-borrowed-button', function(){
		borrowedTitle = $(this).parent().parent().children('td:nth-child(2)').text();
		$(this).prop('disabled', true);
		fadeBorrowedModal();
		$('.p-delete-invent').text("Please click the delete button to delete borrowed material '" + borrowedTitle  + "'.");
		$(this).parent().parent().addClass($(this).val());
		$('#borrowed-confirm-delete').val($(this).val());
		$('#delete-confirm-modal').modal('show');
	});

	$('#delete-close').click(function(){
		$('.student-remove-borrowed-button').prop('disabled', false);
		showBorrowedModal();
	})

	$('#borrowed-confirm-delete').click(function(){
		$(this).prop('disabled', true);
		$('#delete-close').prop('disabled', true);
		showBorrowedModal();
		x = $(this).val();
		removeBorrowed($(this).val()).done(function(r){
			$('#delete-close').prop('disabled', false);
			$('#borrowed-confirm-delete').prop('disabled', false);
			$('.borrow-status').removeClass('alert-success').addClass('alert-danger');
			$('.borrow-status').fadeIn().delay(2000).fadeOut();
			$('.borrow-message').text("Material '" + borrowedTitle +"' deleted successfully.");			
			$('.borrowed-materials-tbody').children('tr.' + x).remove();
			$('#delete-confirm-modal').modal('hide');
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
			url: '/dashboard/addBorrowCount/' + acqNumber,
			success: function(data){
				console.log(data);
			}
		})
	}

	function confirmMaterials(value){
		id = value.val();
		username = value.parent().parent().children('td:nth-child(1)').text();
		return $.ajax({
			headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},			
			type: 'post',
			url: '/dashboard/confirm/borrowedmaterials/' + id + '/' + username
		});
	}

	$('body').on('click', '.confirm-borrowed-button', function(){
		x = $(this);
		confirmMaterials($(this)).done(function(data){
			x.val(data.borrowed_acqNumber);
			x.parent().children('button:nth-child(1)').val(data.borrowed_acqNumber);
			x.parent().children('button:nth-child(2)').val(data.borrowed_acqNumber);
			console.log(data);
			if(data.error == 'full'){
				$('.confirm-borrowed-status').removeClass('alert-success').addClass('alert-danger');
				$('.confirm-borrowed-status').text("No copies left of material '" + x.val() + "'.");
			}
			else{
				$('.confirm-borrowed-status').removeClass('alert-danger').addClass('alert-success');
				addBorrowCount(x.val());
				x.parent().parent().children('td:nth-child(2)').text(data.borrowed_acqNumber);
				x.parent().children('button:nth-child(2)').prop('disabled', false);
				x.parent().children('button:nth-child(3)').prop('disabled', true);				
				$('.confirm-borrowed-status').text("Borrowed material '" + data.borrowed_acqNumber + "' confirmed successfully!");	
			}
			$('.confirm-borrowed-status').fadeIn().delay(2000).fadeOut();	
		});
	});

	function unconfirmMaterials(value){
		id = value.val();
		username = value.parent().parent().children('td:nth-child(1)').text();			
		return $.ajax({
			headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},			
			type: 'post',
			url: '/dashboard/unconfirm/borrowedmaterials/' + id + '/' + username
		});
	}

	$('body').on('click', '.unconfirm-borrowed-button', function(){
		x = $(this);
		unconfirmMaterials($(this)).done(function(data){
			x.val(data.borrowed_acqNumber);
			x.parent().children('button:nth-child(1)').val(data.borrowed_acqNumber);
			x.parent().children('button:nth-child(3)').val(data.borrowed_acqNumber);
			x.parent().parent().children('td:nth-child(2)').text('');
			$('.unconfirm-borrowed-status').text("Borrowed material '" + data.initial + "' unconfirmed successfully!");
			$('.unconfirm-borrowed-status').fadeIn().delay(2000).fadeOut();
			x.parent().children('button:nth-child(2)').prop('disabled', true);
			x.parent().children('button:nth-child(3)').prop('disabled', false);			
		});
	});

	$('.borrowed-close').click(function(){
		$(".borrowed-button").prop('disabled', false);
		$('.borrowed-materials-tbody').children().remove();
	});
	// end of borrow materials script
	// search and sort script

	$('.sort-buttons').each(function(){
		if($(this).hasClass('active')){
			$(this).removeClass('btn-default').addClass('btn-success active');
		}
	})

	$('.sort-buttons').click(function(){
		$('.sort-buttons').removeClass('btn-success active').addClass('btn-default');
		$(this).removeClass('btn-default').addClass('btn-success active');
	});

	$('.borrow-sort-buttons').each(function(){
		if($(this).hasClass('active')){
			$(this).removeClass('btn-default').addClass('btn-success active');
		}
	})

	$('.borrow-sort-buttons').click(function(){
		$('.borrow-sort-buttons').removeClass('btn-success active').addClass('btn-default');
		$(this).removeClass('btn-default').addClass('btn-success active');
	});	

	var sortType = 'materials';
	$('#sort-materials').click(function(){
		if($(this).hasClass('active') == true){
			console.log('haha');
			$('.search').val('');
			sortType = 'materials';		
			showMaterial(searchType);		
		}
	});

	$('#sort-most-viewed').click(function(){
		if($(this).hasClass('active') == true){
			$('.search').val('');
			sortType = 'view';		
			showMaterial(searchType);
		}
	});

	$('#sort-most-borrowed').click(function(){
		if($(this).hasClass('active') == true){
			$('.search').val('');
			sortType = 'borrow';
			showMaterial(searchType);
		}		
	});

	var borrowedSortType = 'allMaterials'
	$("#sort-all-materials").click(function(){
		if($(this).hasClass('active') != true){
			$('.search').val('');
			borrowedSortType = 'allMaterials';
			showMaterial(searchType);
		}
	});

	$("#sort-borrowed-materials").click(function(){
		if($(this).hasClass('active') != true){
			$('.search').val('');
			borrowedSortType = 'borrowedMaterials';
			showMaterial(searchType);
		}
	});

	$("#sort-pending-materials").click(function(){
		if($(this).hasClass('active') != true){
			$('.search').val('');
			borrowedSortType = 'pendingMaterials';
			showMaterial(searchType);
		}
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
			if($('#user-type').val() != 'user'){
				$('.action-th').removeClass('hidden');
			}
			
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
			x = retrieveBorrowedUsers(borrowedSortType);
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
						$('.material-items').append(newMaterial);				
					}
				}
				else if(searchType == 'borrowedUsername' || searchType == 'borrowedAccession' || searchType == 'dateTime'){
					if(data.length == 0){
						$('#no-borrowed-materials').parent().children('tr:nth-child(1)').addClass('hidden');
						$('#no-borrowed-materials').removeClass('hidden');
					}
					else{
						$('#no-borrowed-materials').parent().children('tr:nth-child(1)').removeClass('hidden');
						$('#no-borrowed-materials').addClass('hidden');
					}
				}
				else if(searchType == 'Author' || searchType == 'Photographer' || searchType == 'Tag'
					|| searchType == 'Director' || searchType == 'Producer' || searchType == 'Publisher' || searchType == 'Donor'){
					dataLength = data.length;
					if(searchType == 'Donor'){
						dataMat = data.donor;
						dataLength = data.donor.length;
						console.log(dataLength);
					}
					if(dataLength == 0){
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
						$('.author-items').append(newMaterial);						
					}
				}
				var results = data;
		            var totalPages = dataLength;
		            var minPage = 10;
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
						$('.materials-table').trigger('update');             		
						materialLength = Object.keys(dataMat).length;
						total = page * minPage;
						index = Math.abs(total-minPage);
						max = materialLength - index;
						if(max <= minPage){
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
									acqNumberArray.push(data.donor[i].donor_name_id);
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
						$('.borrowed-materials-tbody').children().remove();
			                	for(i=index;i<max;i++){
							if($('#user-type').val() == 'user'){
								actionButton = '';
								$('.action-th').addClass('hidden');
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
				                		if($('#user-type').val() == 'user'){
									newTitle.after().html(
										"<td class='material-view-button text-left'>" + data.accession[i].title +
										"<input type='hidden' value='" + data.accession[i].acqNumber +"'/>" +									
										"</td>" +
										"<td class='material-view-button text-left'>" + data.type[i] +
										"<input type='hidden' value='" + data.accession[i].acqNumber +"'/>" +									
										"</td>"
									);
				                		}
				                		else{
									newTitle.after().html(
										"<td class='material-view-button text-left'>" + data.accession[i].acqNumber + 
										"<input type='hidden' value='" + data.accession[i].acqNumber +"'/>" +
										"</td>" +
										"<td class='material-view-button text-left'>" + data.accession[i].title +
										"<input type='hidden' value='" + data.accession[i].acqNumber +"'/>" +									
										"</td>" +
										"<td class='material-view-button text-left'>" + data.type[i] +
										"<input type='hidden' value='" + data.accession[i].acqNumber +"'/>" +									
										"</td>" +	
										actionButton				
									);
								}
								$('.material-items').append(newTitle);	  
							}
							else if(searchType == 'Donor'){
								var newAuthor = $(document.createElement('tr')).attr('class', data.donor[i].donor_name_id);
								newAuthor.after().html(
									"<td class='authors-written text-left'>" + data.donor[i].firstname + " " + data.donor[i].middlename + " " + data.donor[i].lastname + 
									"<input type='hidden' value='" + data.donor[i].donor_name_id +"'/>" +
									"</td>"
								);
								$('.author-items').append(newAuthor);								
							}
							else if(searchType == 'Author' || searchType == 'Photographer' || searchType == 'Director' || searchType == 'Producer'){

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
								acqNumber = '';			
								if(data[i].status == 'checked out'){
									confirmDisabled = 'disabled';
									unconfirmDisabled = '';
									acqNumber = data[i].acqNumber;
								}
								else{
									unconfirmDisabled = 'disabled';
									confirmDisabled = '';
								}

								unconfirmButton = "<button class='btn btn-xs btn-default unconfirm-borrowed-button' value='" + data[i].acqNumber  + "'"  +  unconfirmDisabled +
								">Unconfirm</button>";
								confirmButton = "<button type='button' class='btn btn-xs btn-default confirm-borrowed-button' value='" + data[i].acqNumber + "'" + confirmDisabled + 
								">Confirm</button";
								var newMaterial = $(document.createElement('tr')).attr('class', data[i].username);
								newMaterial.after().html(
									"<td class='text-left'>" + data[i].username + "</td>" +
									"<td class='text-left'>" + acqNumber + "</td>" +
									"<td class='text-left'>" + data[i].title + "</td>" +
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
	            var minPage = 10;
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
					if(max <= minPage){
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
			if($('#user-type').val() == 'user'){
				actionButton = '';
				$('.action-th').addClass('hidden');			
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
				"<td class='material-view-button text-left'>" + data.material[i].acqNumber + 
				"<input type='hidden' value='" + data.material[i].acqNumber +"'/>" +
				"</td>" +
				"<td class='material-view-button text-left'>" + data.material[i].title +
				"<input type='hidden' value='" + data.material[i].acqNumber +"'/>" +									
				"</td>" +
				"<td class='material-view-button text-left'>" + data.type[i] +
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
		            var minPage = 10;
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
							console.log(Object.keys(dataMat).length);
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
						if(max <= minPage){
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
		$('body').css('cursor', 'wait');
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
			$('body').css('cursor', 'default');
			var dataLength = data.material.length;	
			var results = data;
	            var totalPages = dataLength;
	            var minPage = 10;
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
					if(max <= minPage){
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
						if($('#user-type').val() == 'user'){
							actionButton = '';
							$('.action-th').addClass('hidden');			
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
							"<td class='material-view-button text-left'>" + data.material[i].acqNumber + 
							"<input type='hidden' value='" + data.material[i].acqNumber +"'/>" +
							"</td>" +
							"<td class='material-view-button text-left'>" + data.material[i].title +
							"<input type='hidden' value='" + data.material[i].acqNumber +"'/>" +									
							"</td>" +
							"<td class='material-view-button text-left'>" + data.type[i] +
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

	// add additional copy script

	var donorNum = 0;
	$('#add-donor-button').click(function(){
		var newDonor = $(document.createElement("div")).attr('class', 'form-group co-donor');
		newDonor.after().html(
			"<span class='donor-copies'>" +
				"<div class='input-group'>" +
					"<span class='input-group-addon label-title'>Number of copies*</span>" +
					"<input type='number' min='0' class='donor-copies form-control' placeholder='0'/>" +
				"</div>" +
				"<span class='donor-copy-help help-block hidden'><strong></strong></span>" +
			"</span>" +
			"<span class='donor-firstnames'>" +
				"<div class='input-group'>" +
					"<span class='input-group-addon label-title'>First Name*</span>" +
					"<input type='text' class='donor-firstname form-control' placeholder='Francis'/>" +
				"</div>" +
				"<span class='donor-first-name-help help-block hidden'><strong></strong></span>" +
			"</span>" +
			"<span class='donor-middlenames'>" +
				"<div class='input-group'>" +
					"<span class='input-group-addon label-title'>Middle Name*</span>" +
					"<input type='text' class='donor-middlename form-control' placeholder='Wundt'/>" +
				"</div>" +
				"<span class='donor-middle-name-help help-block hidden'><strong></strong></span>" +
			"</span>" +
			"<span class='donor-lastnames'>" +
				"<div class='input-group'>" +
					"<span class='input-group-addon label-title'>Last Name*</span>" +
					"<input type='text' class='donor-lastname form-control' placeholder='Wertheimer'/>" +
				"</div>" +
				"<span class='donor-last-name-help help-block hidden'><strong></strong></span>" +
			"</span>" +
			"<span class='donor-dates'>" +
				"<div class='input-group'>" +
					"<span class='input-group-addon label-title'>Date*</span>" +
					"<input type='date' class='donated-date form-control' />" +
				"</div>" +
				"<span class='donor-date-help help-block hidden'><strong></strong></span>" +
			"</span>" +
			"<button type='button' class='btn btn-danger co-author-button delete-donor'>Delete Donor</button>"
		);
		$('.add-donor').append(newDonor);
		donorNum++;
	});

	var purchasedNum = 0;
	$('#add-purchased-button').click(function(){
		var newPurchased = $(document.createElement("div")).attr('class', 'form-group co-purchased');
		newPurchased.after().html(
			"<span class='purchased-copies'>" +
				"<div class='input-group'>" +
					"<span class='input-group-addon label-title'>Number of copies*</span>" +
					"<input type='number' class='purchased-copy form-control' placeholder='0'/>" +
				"</div>" +
				"<span class='purchased-copy-help help-block hidden'><strong></strong></span>" +
			"</span>" +
			"<span class='purchased-amounts'>" +
				"<div class='input-group'>" +
					"<span class='input-group-addon label-title'>Amount*</span>" +
					"<input type='number' min='0' class='purchased-amount form-control' placeholder='0'/>" +
					"<span class='input-group-addon'>&#8369;</span>" +
				"</div>" +
				"<span class='purchased-amount-help help-block hidden'><strong></strong></span>" +
			"</span>" +
			"<span class='purchased-dates'>" +
				"<div class='input-group'>" +
					"<span class='input-group-addon label-title'>Date*</span>" +
					"<input type='date' class='purchased-date form-control' />" +
				"</div>" +
				"<span class='purchased-date-help help-block hidden'><strong></strong></span>" +
			"</span>" +
			"<span class='purchased-addresses'>" +
				"<div class='input-group'>" +
					"<span class='input-group-addon label-title'>Address*</span>" +
					"<input type='text' class='purchased-address form-control' placeholder='Apollo St.'/>" +
				"</div>" +
				"<span class='purchased-address-help help-block hidden'><strong></strong></span>" +
			"</span>" +
			"<button type='button' class='btn btn-danger co-author-button delete-purchased-details'>Delete Purchased Details</button>"	
		);
		$('.add-purchased').append(newPurchased);
		purchasedNum++;
	});

	$('body').on('click', '.delete-donor', function(){
		$(this).parent().remove();
		donorNum--;
	});

	$('body').on('click', '.delete-purchased-details', function(){
		$(this).parent().remove();
		purchasedNum--;
	});

	// end of add additional copy script

});