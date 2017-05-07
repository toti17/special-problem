$(document).ready(function (){

	$('body').on('change', '#image-upload', function() {
		$('.remove-picture').trigger('click');
		var iSize = ($(this)[0].files[0].size / 1024);
		var sizeType = '';
     		if (iSize / 1024 > 1){
        		if (((iSize / 1024) / 1024) > 1){
		            iSize = (Math.round(((iSize / 1024) / 1024) * 100) / 100);
		            console.log(iSize + 'gb');
		            sizeType = 'gb';
        		}
			else{
			    iSize = (Math.round((iSize / 1024) * 100) / 100);
			    console.log(iSize + 'mb');
			    sizeType = 'mb';
			}
     		}
	     else{
		      iSize = (Math.round(iSize * 100) / 100);
		      console.log(iSize + 'kb');
		      sizeType = 'kb';
	     }		
		var input = $(this),
			numFiles = input.get(0).files ? input.get(0).files.length : 1,
	        	label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
	    	input.trigger('fileselect', [numFiles, label, iSize, sizeType]);
	});

	$(':file').on('fileselect', function(event, numFiles, label, iSize, sizeType){
		var sizeAllow = true;
		if(sizeType == 'gb'){
			fadeModal();
			sizeAllow = false;
			$('#image-upload').val('');
			$('.invalid-format').text('The file size is huge. Please select a file with a size below or equal to 7 MB');
			$('.extension-modal').modal('show');
		}
		else if(sizeType == 'mb'){
			if(iSize > 7){
				fadeModal();
				sizeAllow = false;
				$('.invalid-format').text('The file size is huge. Please select a file with a size below or equal to 7 MB');
				$('#image-upload').val('');
				$('.extension-modal').modal('show');
			}			
		}
		var extension = label.substr( (label.lastIndexOf('.') +1) ).toLowerCase();
		if(label != ''){
			if($.inArray(extension, ['png','jpg','jpeg']) == -1) {
				$('#image-upload').val('');
				$('.invalid-format').text('Please choose an image format. (e.g. JPEG, JPG, PNG)');
				$('.extension-modal').modal('show');
				fadeModal();
			}
			else{
				if(sizeAllow == true){
					$('.file-name').val(label);
					$('.image-preview').css({"width": '100%'});
					$('.image-preview').css({"height": '400px'});					
				}
			}
		}
	});

	$('#extension-close').click(function(){
		showModal();
	});

	$( '.extension-modal' ).on( 'hidden.bs.modal' , function(){
		$('body').addClass('modal-open');
	});

	$.uploadPreview({
		input_field: "#image-upload",   // Default: .image-upload
		preview_box: ".image-preview",  // Default: .image-preview
		label_field: "#image-label",    // Default: .image-label
		label_default: "Choose File",   // Default: Choose File
		label_selected: "Change File",  // Default: Change File
		no_label: false                 // Default: false
	});

	$('.remove-picture').click(function(){
		$('.file-name').val('Click the browse button to select pictures...');
		$('.image-preview').removeAttr('style');
	})

	var englishNameNum = 1;
	$('#add-engName').click(function(){
		var newEnglishName = $(document.createElement('div')).attr('class', 'english-name-new');
		newEnglishName.after().html(
			"<div class='input-group'>"  +
				"<span class='input-group-addon label-title'>English Name</span>" +
				"<input type='text' id='engName' class='form-control' placeholder='Veil' name='engName'/>" +				
				"<span class='input-group-btn'>" +
					"<button type='button' class='btn btn-secondary remove-engName'>" +
						"<span class='glyphicon glyphicon-minus'></span>" +
					"</button>" +
				"</span>" +
			"</div>" +
			"<span class='engName-help help-block hidden'>" +"<strong></strong>" +"</span>"			
		);
		$('.english-name').append(newEnglishName);
		englishNameNum++;
	});

	var venacularNameNum = 1;
	$('#add-venName').click(function(){
		var newVenacularName = $(document.createElement('div')).attr('class', 'venacular-name-new');
		newVenacularName.after().html(
			"<div class='input-group'>"  +
				"<span class='input-group-addon label-title'>Venacular Name</span>" +
				"<input type='text' id='venName' class='form-control' placeholder='Bandana' name='engNvenNameame'/>" +				
				"<span class='input-group-btn'>" +
					"<button type='button' class='btn btn-secondary remove-venName'>" +
						"<span class='glyphicon glyphicon-minus'></span>" +
					"</button>" +
				"</span>" +
			"</div>" +
			"<span class='venName-help help-block hidden'>" +"<strong></strong>" +"</span>"			
		);
		$('.venacular-name').append(newVenacularName);
		venacularNameNum++;
	});

	var materialNum = 1;
	$('#add-materials').click(function(){
		var newMaterial = $(document.createElement('div')).attr('class', 'material-new');
		newMaterial.after().html(
			"<div class='input-group'>"  +
				"<span class='input-group-addon label-title'>Material</span>" +
				"<input type='text' id='material' class='form-control' placeholder='wood' name='material'/>" +				
				"<span class='input-group-btn'>" +
					"<button type='button' class='btn btn-secondary remove-material'>" +
						"<span class='glyphicon glyphicon-minus'></span>" +
					"</button>" +
				"</span>" +
			"</div>" +
			"<span class='material-help help-block hidden'>" +"<strong></strong>" +"</span>"			
		);
		$('.materials').append(newMaterial);
		materialNum++;
	});

	var colorNum = 1;
	$('#add-color').click(function(){
		var newColor = $(document.createElement('div')).attr('class', 'color-new');
		newColor.after().html(
			"<div class='input-group'>"  +
				"<span class='input-group-addon label-title'>Color</span>" +
				"<input type='text' id='tag' class='form-control' placeholder='black' name='black'/>" +				
				"<span class='input-group-btn'>" +
					"<button type='button' class='btn btn-secondary remove-color'>" +
						"<span class='glyphicon glyphicon-minus'></span>" +
					"</button>" +
				"</span>" +
			"</div>" +
			"<span class='color-help help-block hidden'>" +"<strong></strong>" +"</span>"			
		);
		$('.colorss').append(newColor);
		colorNum++;
	});

	var decorationNum = 1;
	$('#add-decoration').click(function(){
		var newDecoration = $(document.createElement('div')).attr('class', 'decoration-new');
		newDecoration.after().html(
			"<div class='input-group'>"  +
				"<span class='input-group-addon label-title'>Special Decorations</span>" +
				"<input type='text' id='decoration' class='form-control' placeholder='scratches' name='decoration'/>" +				
				"<span class='input-group-btn'>" +
					"<button type='button' class='btn btn-secondary remove-decoration'>" +
						"<span class='glyphicon glyphicon-minus'></span>" +
					"</button>" +
				"</span>" +
			"</div>" +
			"<span class='decoration-help help-block hidden'>" +"<strong></strong>" +"</span>"			
		);
		$('.decorationsss').append(newDecoration);
		decorationNum++;
	});

	var markNum = 1;
	$('#add-mark').click(function(){
		var newMark = $(document.createElement('div')).attr('class', 'mark-new');
		newMark.after().html(
			"<div class='input-group'>"  +
				"<span class='input-group-addon label-title'>Special Marks</span>" +
				"<input type='text' id='mark' class='form-control' placeholder='carving' name='mark'/>" +				
				"<span class='input-group-btn'>" +
					"<button type='button' class='btn btn-secondary remove-mark'>" +
						"<span class='glyphicon glyphicon-minus'></span>" +
					"</button>" +
				"</span>" +
			"</div>" +
			"<span class='mark-help help-block hidden'>" +"<strong></strong>" +"</span>"			
		);
		$('.marksss').append(newMark);
		markNum++;
	});

	$('body').on('click', '.remove-engName', function(){
		$(this).parent().parent().parent().remove();
		englishNameNum--;
	});

	$('body').on('click', '.remove-venName', function(){
		$(this).parent().parent().parent().remove();
		venacularNameNum--;
	});

	$('body').on('click', '.remove-material', function(){
		$(this).parent().parent().parent().remove();
		materialNum--;
	});

	$('body').on('click', '.remove-color', function(){
		$(this).parent().parent().parent().remove();
		colorNum--;
	});

	$('body').on('click', '.remove-decoration', function(){
		$(this).parent().parent().parent().remove();
		decorationNum--;
	});

	$('body').on('click', '.remove-mark', function(){
		$(this).parent().parent().parent().remove();
		markNum--;
	});

	var measureStatus = '';
	var acquisitionStatus = '';

	$('.measurement').click(function(){
		measureStatus = $.trim($(this).parent().text());
	});

	$('.inventory-acquisition-mode').click(function(){
		acquisitionStatus = $.trim($(this).parent().text());
		if(acquisitionStatus == "Purchased"){
			$('#donor-firstname').val('');
			$('#donor-middlename').val('');
			$('#donor-lastname').val('');
			$('#donated-date').val('');			
			$(this).val('purchased');
			$('.donated-div').addClass('hidden');
			$('.purchased-div').removeClass('hidden');
		}
		else if(acquisitionStatus == 'Donated'){
			$('#amount').val('');
			$('#purchased-date').val('');
			$('#address').val('');			
			$(this).val('donated');
			$('.donated-div').removeClass('hidden');
			$('.purchased-div').addClass('hidden');				
		}
	});

	var editChange = false;
	var acqNumber = '';
	var origAcqNumber = 0;

	function checkAccession(acqNumber, origAcqNumber, change){
		return $.ajax({
			type: 'get',
			url: 'material/check/' + acqNumber + '/' + origAcqNumber + '/' + change,
			success: function(data){
				if(data.accessionNumber == 0){
					$('.acqNumber-help').addClass('hidden');
				}
				else{
					console.log('nagsulod di');
					$('.acqNumber-help').removeClass('hidden');
					$('.acqNumber-help strong').text('The accession number ' + acqNumber + ' already exists.');					
					errorCounter++;
				}
			}
		});
	}

	$('#inventory-submit').click(function(event){
		errorCounter = 0;
		category = $('#category').val();
		acq = $.trim($('#acqNumber').val());
		object = $.trim($('#object').val());
		firstName = $.trim($('#owner-firstname').val());
		middleName = $.trim($('#owner-middlename').val());
		lastName = $.trim($('#owner-lastname').val());
		nickname = $.trim($('#owner-nickname').val());
		locality = $.trim($('#local').val());
		storage = $.trim($('#location').val());
		length = $.trim($('#length').val());
		width = $.trim($('#width').val());
		condition = $.trim($('#condition').val());
		datePattern = new RegExp(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/);
		donatedDate = $('#donated-date').val();
		purchasedDate = $('#purchased-date').val();
		engNameArray = [];
		venNameArray = [];
		matArray = [];
		colorArray = [];
		decorArray = [];
		markArray = [];
		unit = '';
		console.log(measureStatus);
		if(measureStatus == 'Meter'){
			unit = 'm';
		}
		else if(measureStatus == 'Centimeter'){
			unit = 'cm';
		}
		else if(measureStatus == 'Millimeter'){
			unit = 'mm';
		}

		$('.con-category').text(category);
		$('.con-acq').text(acq);
		$('.con-fullname').text(firstName + ' ' + middleName + ' ' + lastName);
		$('.con-nickname').text(nickname);
		$('.con-local').text(locality);
		$('.con-length').text(length + ' ' + unit);
		$('.con-width').text(width + ' ' + unit);
		$('.con-condition').text(condition);

		if($('#category').val() == null){
			$('.select-help').removeClass('hidden');
			$('.select-help').addClass('error');
			$('.select-help strong').text('The category field is required.');
			errorCounter++;
		}
		else{
			$('.select-help').removeClass('error');
			$('.select-help').addClass('hidden');
		}
		if(acq == ''){
			$('.acqNumber-help').addClass('error');
			$('.acqNumber-help').removeClass('hidden');
			$('.acqNumber-help strong').text('The accession field is required.');
			errorCounter++;
		}
		else if(acq.length > 100){
			$('.acqNumber-help').addClass('error');
			$('.acqNumber-help').removeClass('hidden');
			$('.acqNumber-help strong').text('The accession field should not exceed 100 characters.');
			errorCounter++;
		}
		else{
			$('.acqNumber-help').removeClass('error');
			$('.acqNumber-help').addClass('hidden');
		}

		if(object == ''){
			$('.object-help').addClass('error');
			$('.object-help').removeClass('hidden');
			$('.object-help strong').text('The object field is required.');
			errorCounter++;
		}
		else if(object.length > 100){
			$('.object-help').addClass('error');
			$('.object-help').removeClass('hidden');
			$('.object-help strong').text('The object field should not exceed 100 characters.');
			errorCounter++;
		}
		else{
			$('.object-help').removeClass('error');
			$('.object-help').addClass('hidden');
		}

		if(storage == ''){
			$('.location-help').addClass('error');
			$('.location-help').removeClass('hidden');
			$('.location-help strong').text('The location field is required.');
			errorCounter++;
		}
		else if(object.length > 100){
			$('.location-help').addClass('error');
			$('.location-help').removeClass('hidden');
			$('.location-help strong').text('The location field should not exceed 100 characters.');
			errorCounter++;
		}
		else{
			$('.location-help').removeClass('error');
			$('.location-help').addClass('hidden');
		}

		$('.con-location').text(storage);

		$('.english-name-new').each(function(){
			engName = $.trim($(this).children().children('input').val());
			if(engName != ''){
				engNameArray.push(engName);
			}
			else if(engName.length > 100){
				$(this).children('span').addClass('error');
				$(this).children('span').removeClass('hidden');
				$(this).children('span').children('strong').text('The english name field should not exceed 100 characters.');
				errorCounter++;
			}
			else{
				$(this).children('span').removeClass('error');
				$(this).children('span').addClass('hidden');
			}
			$('#engNames').val(engNameArray);
		});

		engNames = '';
		for(i=0;i<engNameArray.length;i++){
			engNames += engNameArray[i];
			engNames += ', ';
		}
		engNames = engNames.replace(/,\s*$/, "");
		$('.con-eng').text(engNames);

		$('.venacular-name-new').each(function(){
			venName = $.trim($(this).children().children('input').val());

			if(venName != ''){
				venNameArray.push(venName);
			}
			else if(venName.length > 100){
				$(this).children('span').addClass('error');
				$(this).children('span').removeClass('hidden');
				$(this).children('span').children('strong').text('The venacular name field should not exceed 100 characters.');
				errorCounter++;
			}
			else{
				$(this).children('span').removeClass('error');
				$(this).children('span').addClass('hidden');
			}
			$('#venNames').val(venNameArray);
		});

		venNames = '';
		for(i=0;i<venNameArray.length;i++){
			venNames += venNameArray[i];
			venNames += ', ';
		}
		venNames = venNames.replace(/,\s*$/, "");
		$('.con-ven').text(venNames);		

		if(firstName == ''){
			$('.owner-firstname-help').addClass('error');
			$('.owner-firstname-help').removeClass('hidden');
			$('.owner-firstname-help strong').text('The first name field is required.');
			errorCounter++;
		}
		else if(firstName.length > 100){
			$('.owner-firstname-help').addClass('error');
			$('.owner-firstname-help').removeClass('hidden');
			$('.owner-firstname-help strong').text('The first name field should not exceed 100 characters.');
			errorCounter++;
		}
		else{
			$('.owner-firstname-help').removeClass('error');
			$('.owner-firstname-help').addClass('hidden');
		}

		if(middleName == ''){
			$('.owner-middlename-help').addClass('error');
			$('.owner-middlename-help').removeClass('hidden');
			$('.owner-middlename-help strong').text('The middle name field is required.');
			errorCounter++;
		}
		else if(middleName.length > 100){
			$('.owner-middlename-help').addClass('error');
			$('.owner-middlename-help').removeClass('hidden');
			$('.owner-middlename-help strong').text('The middle name field should not exceed 100 characters.');
			errorCounter++;
		}
		else{
			$('.owner-middlename-help').removeClass('error');
			$('.owner-middlename-help').addClass('hidden');
		}

		if(lastName == ''){
			$('.owner-lastname-help').addClass('error');
			$('.owner-lastname-help').removeClass('hidden');
			$('.owner-lastname-help strong').text('The last name field is required.');
			errorCounter++;
		}
		else if(lastName.length > 100){
			$('.owner-lastname-help').addClass('error');
			$('.owner-lastname-help').removeClass('hidden');
			$('.owner-lastname-help').removeClass('hidden');
			$('.owner-lastname-help strong').text('The last name field should not exceed 100 characters.');
			errorCounter++;
		}
		else{
			$('.owner-lastname-help').removeClass('error');
			$('.owner-lastname-help').addClass('hidden');
		}

		if(nickname == ''){
			$('.owner-nickname-help').addClass('error');
			$('.owner-nickname-help').removeClass('hidden');
			$('.owner-nickname-help strong').text('The nickname field is required.');
			errorCounter++;
		}
		else if(nickname.length > 100){
			$('.owner-nickname-help').addClass('error');
			$('.owner-nickname-help').removeClass('hidden');
			$('.owner-nickname-help strong').text('The nickname field should not exceed 100 characters.');
			errorCounter++;
		}
		else{
			$('.owner-nickname-help').removeClass('error');
			$('.owner-nickname-help').addClass('hidden');
		}

		if(locality == ''){
			$('.local-help').addClass('error');
			$('.local-help').removeClass('hidden');
			$('.local-help strong').text('The locality field is required.');
			errorCounter++;
		}
		else if(lastName.length > 100){
			$('.local-help').addClass('error');
			$('.local-help').removeClass('hidden');
			$('.local-help strong').text('The locality field should not exceed 100 characters.');
			errorCounter++;
		}
		else{
			$('.local-help').removeClass('error');
			$('.local-help').addClass('hidden');
		}

		if(measureStatus.length == 0){
			$('.measure-status-help').addClass('error');
			$('.measure-status-help').removeClass('hidden');
			$('.measure-status-help strong').text('The unit field is required.');
			errorCounter++;
		}
		else{
			$('.measure-status-help').removeClass('error');
			$('.measure-status-help').addClass('hidden');
		}

		if(length == ''){
			$('.length-help').addClass('error');
			$('.length-help').removeClass('hidden');
			$('.length-help strong').text('The length field is required.');
			errorCounter++;
		}
		else if(length.length > 100){
			$('.length-help').addClass('error');
			$('.length-help').removeClass('hidden');
			$('.length-help strong').text('The length field should not exceed 100 characters.');
			errorCounter++;
		}
		else if(length <= 0){
			$('.length-help').addClass('error');
			$('.length-help').removeClass('hidden');
			$('.length-help strong').text('The length field should have a positive number.');
			errorCounter++;
		}
		else{
			$('.length-help').removeClass('error');
			$('.length-help').addClass('hidden');
		}

		if(width == ''){
			$('.width-help').addClass('error');
			$('.width-help').removeClass('hidden');
			$('.width-help strong').text('The width field is required.');
			errorCounter++;
		}
		else if(width.length > 100){
			$('.width-help').addClass('error');
			$('.width-help').removeClass('hidden');
			$('.width-help strong').text('The width field should not exceed 100 characters.');
			errorCounter++;
		}
		else if(width <= 0){
			$('.width-help').addClass('error');
			$('.width-help').removeClass('hidden');
			$('.width-help strong').text('The width field should have a positive number.');
			errorCounter++;	
		}		
		else{
			$('.width-help').removeClass('error');
			$('.width-help').addClass('hidden');
		}

		if(condition == ''){
			$('.condition-help').addClass('error');
			$('.condition-help').removeClass('hidden');
			$('.condition-help strong').text('The condition field is required.');
			errorCounter++;
		}
		else if(condition.length > 500){
			$('.condition-help').addClass('error');
			$('.condition-help').removeClass('hidden');
			$('.condition-help strong').text('The condition field should not exceed 500 characters.');
			errorCounter++;
		}
		else{
			$('.condition-help').removeClass('error');
			$('.condition-help').addClass('hidden');
		}		

		$('.material-new').each(function(){
			material = $.trim($(this).children().children('input').val());

			if(material != ''){
				matArray.push(material);
			}
			else if(material.length > 100){
				$(this).children('span').addClass('error');
				$(this).children('span').removeClass('hidden');
				$(this).children('span').children('strong').text('The material field should not exceed 100 characters.');
				errorCounter++;
			}
			else{
				$(this).children('span').removeClass('error');
				$(this).children('span').addClass('hidden');
			}
			$('#materials').val(matArray);
		});

		materials = '';
		for(i=0;i<matArray.length;i++){
			materials += matArray[i];
			materials += ', ';
		}
		materials = materials.replace(/,\s*$/, "");
		$('.con-material').text(materials);		

		$('.color-new').each(function(){
			color = $.trim($(this).children().children('input').val());

			if(color != ''){
				colorArray.push(color);
			}
			else if(color.length > 100){
				$(this).children('span').removeClass('hidden');
				$(this).children('span').addClass('error');
				$(this).children('span').children('strong').text('The color field should not exceed 100 characters.');
				errorCounter++;
			}
			else{
				$(this).children('span').removeClass('error');
				$(this).children('span').addClass('hidden');
			}
			$('#colors').val(colorArray);
		});

		colors = '';
		for(i=0;i<colorArray.length;i++){
			colors += colorArray[i];
			colors += ', ';
		}
		colors = colors.replace(/,\s*$/, "");
		$('.con-color').text(colors);			

		$('.decoration-new').each(function(){
			decoration = $.trim($(this).children().children('input').val());

			if(decoration != ''){
				decorArray.push(decoration);
			}
			else if(decoration.length > 100){
				$(this).children('span').removeClass('hidden');
				$(this).children('span').addClass('error');
				$(this).children('span').children('strong').text('The decoration field should not exceed 100 characters.');
				errorCounter++;
			}
			else{
				$(this).children('span').removeClass('error');
				$(this).children('span').addClass('hidden');
			}
			$('#decorations').val(decorArray);
		});

		decorations = '';
		for(i=0;i<decorArray.length;i++){
			decorations += decorArray[i];
			decorations += ', ';
		}
		decorations = decorations.replace(/,\s*$/, "");
		$('.con-decoration').text(decorations);	

		$('.mark-new').each(function(){
			mark = $.trim($(this).children().children('input').val());

			if(mark != ''){
				markArray.push(mark);
			}
			else if(mark.length > 100){
				$(this).children('span').addClass('error');
				$(this).children('span').removeClass('hidden');
				$(this).children('span').children('strong').text('The special marks field should not exceed 100 characters.');
				errorCounter++;
			}
			else{
				$(this).children('span').removeClass('error');
				$(this).children('span').addClass('hidden');
			}
			$('#marks').val(markArray);
		});

		marks = '';
		for(i=0;i<markArray.length;i++){
			marks += markArray[i];
			marks += ', ';
		}
		marks = marks.replace(/,\s*$/, "");
		$('.con-mark').text(marks);

		if(acquisitionStatus.length == 0){
			$('.inventory-acquisition-mode-help').addClass('error');
			$('.inventory-acquisition-mode-help').removeClass('hidden');
			$('.inventory-acquisition-mode-help strong').text('The acquisition field is required.');
			errorCounter++;
		}
		else{
			$('.inventory-acquisition-mode-help').removeClass('error');
			$('.inventory-acquisition-mode-help').addClass('hidden');
		}

		if(acquisitionStatus == 'Donated'){
			if($('#donor-firstname').val() == ""){
				$('.donor-first-name-help strong').text('The first name field is required.');
				$('.donor-first-name-help').removeClass('hidden');
				$('.donor-first-name-help').addClass('error');
				errorCounter++;
			}
			else if($('#donor-firstname').val().length >50){
				$('.donor-first-name-help strong').text('The first name field should not exceed 100 characters.');
				$('.donor-first-name-help').removeClass('hidden');
				$('.donor-first-name-help').addClass('error');
				errorCounter++;					
			}
			else{
				$('.donor-first-name-help').removeClass('error');
				$('.donor-first-name-help').addClass('hidden');
			}
			// if($('#donor-middlename').val() == ""){
			// 	$('.donor-middle-name-help strong').text('The middle name field is required.');
			// 	$('.donor-middle-name-help').removeClass('hidden');
			// 	$('.donor-middle-name-help').addClass('error');
			// 	errorCounter++;
			// }
			if($('#donor-middlename').val().length >50){
				$('.donor-middle-name-help strong').text('The middle name field should not exceed 100 characters.');
				$('.donor-middle-name-help').removeClass('hidden');
				$('.donor-middle-name-help').addClass('error');
				errorCounter++;					
			}				
			else{
				$('.donor-middle-name-help').removeClass('error');
				$('.donor-middle-name-help').addClass('hidden');
			}
			if($('#donor-lastname').val() == ""){
				$('.donor-last-name-help strong').text('The last name field is required.');
				$('.donor-last-name-help').removeClass('hidden');
				$('.donor-last-name-help').addClass('error');
				errorCounter++;
			}
			else if($('#donor-lastname').val().length >50){
				$('.donor-last-name-help strong').text('The last name field should not exceed 100 characters.');
				$('.donor-last-name-help').removeClass('hidden');
				$('.donor-last-name-help').addClass('error');
				errorCounter++;					
			}					
			else{
				$('.donor-last-name-help').removeClass('error');
				$('.donor-last-name-help').addClass('hidden');
			}

			dateTest = datePattern.test(donatedDate);

			if(dateTest == false){
				$('.donor-date-help strong').text('The date field is invalid.');
				$('.donor-date-help').removeClass('hidden');
				$('.donor-date-help').addClass('error');
				errorCounter++;					
			}
			else{
				$('.donor-date-help').removeClass('error');
				$('.donor-date-help').addClass('hidden');
			}

			donor_fullname = $('#donor-firstname').val() + ' ' + $('#donor-middlename').val() + ' ' + $('#donor-lastname').val();
			$('.confirm-purchased').addClass('hidden');
			$('.confirm-donors').removeClass('hidden');
			$('.con-donor').text(donor_fullname);
			$('.con-date-donated').text(donatedDate);
		}

		else if(acquisitionStatus == 'Purchased'){
			amountPattern = new RegExp(/^[\d,]*(\.\d*)?$/,"g");
			amountValue = amountPattern.test($('#amount').val());				
			if($('#amount').val() ==""){
				$('.amount-help strong').text('The amount field is required.');
				$('.amount-help').removeClass('hidden');
				$('.amount-help').addClass('error');
				errorCounter++;				
			}
			else if(amountValue == false){
				$('.amount-help').addClass('error');
				$('.amount-help strong').text('Incorrect format for amount.');
				$('.amount-help').removeClass('hidden');
				errorCounter++;					
			}
			else  if($('#amount').val().length > 20){
				$('.amount-help').addClass('error');
				$('.amount-help strong').text('The amount field should not exceed 20 digits.');
				$('.amount-help').removeClass('hidden');
				errorCounter++;					
			}
			else{
				$('.amount-help').removeClass('error');
				$('.amount-help').addClass('hidden');
			}

			if($('#address').val() ==""){
				$('.purchased-address-help strong').text('The address field is required.');
				$('.purchased-address-help').removeClass('hidden');
				$('.purchased-address-help').addClass('error');
				errorCounter++;					
			}
			else{
				$('.purchased-address-help').removeClass('error');
				$('.purchased-address-help').addClass('hidden');
			}

			dateTest = datePattern.test(purchasedDate);

			if(dateTest == false){
				$('.purchased-date-help strong').text('The date field is invalid.');
				$('.purchased-date-help').removeClass('hidden');
				$('.purchased-date-help').addClass('error');
				errorCounter++;					
			}
			else{
				$('.purchased-date-help').removeClass('error');
				$('.purchased-date-help').addClass('hidden');
			}
			$('.confirm-donors').addClass('hidden');
			$('.confirm-purchased').removeClass('hidden');
			$('.con-amount').html($('#amount').val() + ' ' + '&#8369;');
			$('.con-pur-date').text(purchasedDate);
			$('.con-pur-address').text($('#address').val());
		}

		if(errorCounter==0){
			checkAccession($('#acqNumber').val(), origAcqNumber, editChange).done(function(data){
				if(data.accessionNumber != 0){
					event.preventDefault();
				}
				else{
					if($('.file-name').val() == 'Click the browse button to select pictures...'){
						$('.image-confirm-upload').addClass('hidden');
						$('.image-group').addClass('hidden');
					}
					else{
						$('.image-confirm-upload').removeClass('hidden');
						$('.image-group').removeClass('hidden');
					}
					hideModal();
					$('#confirm-add-modal').modal('show');
				}
			});			
		}
		else{
			$('#inventory-modal').animate({
			    scrollTop: ($('.error').offset().top)
			},500);
			$(".modal-body").effect( "shake", { direction: "left", times: 3, distance: 10}, 500 );	
			return false;
			event.preventDefault();
		}

		return false;
	});

	$('#confirm-cancel').click(function(){
		$('.confirm-donors').addClass('hidden');
		$('.confirm-purchased').addClass('hidden');		
		showModal();
	});

	function retrieveInventory(acqNumber){
		return $.ajax({
			type: 'get',
			url: '/dashboard/retrieve/inventory/' + acqNumber,
		})
	}

	function showInventory(){
		return $.ajax({
			type: 'get',
			url: '/dashboard/show/inventory',
		});
	}

	var inventoryArray = [];

	$('.inventories-table').tablesorter();
	$('.owners-table').tablesorter();

	function createPagination(data){
		console.log(data.inventory.length);
		$('.inventory-items').children().remove();
		$('.owner-items').children().remove();
		$('#no-inventories').addClass('hidden');
		$('#no-donors').addClass('hidden');
		var dataLength = 0;
		if(data.inventory.length == 0){
			$('.inventory-search').prop('disabled', true);
			$('.inventory-search-type').prop('disabled', true);
		}
		if(data.owner != undefined){
			$('.owners-table').removeClass('hidden');
			dataLength = data.owner.length;
		}
		else if(data.inventory != undefined){
			$('.inventories-table').removeClass('hidden');
			dataLength = data.inventory.length;
		}
		else if(data.donor != undefined){
			$('.owners-table').removeClass('hidden');
			dataLength = data.donor.length;
		}
		var totalPages = dataLength;
		var minPage = 10;
		var total = 0;
		var max =0;
		var index =0;
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
				$('.inventory-items').children().remove();
				$('.owner-items').children().remove();
				$('.owners-table').trigger('update');
				$('.inventories-table').trigger('update');
				total = page * minPage;
				index = Math.abs(total-minPage);
				max = dataLength - index;
				if(max <= minPage){
					max = dataLength;
				}
				else{
					max = index + minPage;
				}

				if(data.inventory != undefined){	
					if(data.inventory.length == 0){
						$('#no-inventories').removeClass('hidden');
					}
					else{
						for(i=index;i<max;i++){
							var newInventory = $(document.createElement('tr')).attr('class', data.inventory[i].acqNumber);
							newInventory.after().html(
								"<td class='inventory-view-button text-left'>" + data.inventory[i].acqNumber + 
								"<input type='hidden' value='" + data.inventory[i].acqNumber +"'/>" +
								"</td>" +
								"<td class='inventory-view-button text-left'>" + data.inventory[i].object + 
								"<input type='hidden' value='" + data.inventory[i].acqNumber +"'/>" +
								"</td>" +
								"<td class='inventory-view-button text-left'>" + data.type[i] + 
								"<input type='hidden' value='" + data.inventory[i].acqNumber +"'/>" +
								"</td>" +
								"<td class='text-right action-buttons'>" + 
								"<button type='button' class='btn btn-xs btn-danger inventory-delete-button' value='" + data.inventory[i].acqNumber + "'>" +
								"<span class='glyphicon glyphicon-remove'></span>" +
								"</button>" +
								"</td>"			
							);
							$('.inventory-items').append(newInventory);	  
						}
					}
				}

				else if(data.owner != undefined){
					$('.owner-items').children().remove();
					if(data.owner.length != 0){
						for(i=index;i<max;i++){
							var newOwner = $(document.createElement('tr')).attr('class', data.owner[i].owner_id);
							newOwner.after().html(
								"<td class='inventory-owner text-left'>" + 
								data.owner[i].firstname + " " + data.owner[i].middlename + " " + data.owner[i].lastname +
								"<input type='hidden' value='" + data.owner[i].owner_id + "'/>" +
								"</td>"
							);
							$('.owner-items').append(newOwner);
						}						
					}
					else{
						$('#no-donors').removeClass('hidden');
					}
				}

				else if(data.donor != undefined){
					$('.owner-items').children().remove();
					$('.owners-table').trigger('update');
					if(data.donor.length != 0){
						for(i=index;i<max;i++){
							var newOwner = $(document.createElement('tr')).attr('class', data.donor[i].donor_name_id);
							newOwner.after().html(
								"<td class='inventory-owner text-left'>" + 
								data.donor[i].firstname + " " + data.donor[i].middlename + " " + data.donor[i].lastname +
								"<input type='hidden' value='" + data.donor[i].donor_name_id + "'/>" +
								"</td>"
							);
							$('.owner-items').append(newOwner);
						}						
					}
					else{
						$('#no-donors').removeClass('hidden');
					}
				}
			}
		}));
	}


	if($('.inventory-search-type').val() == 'Object'){
		showInventory().done(function(data){
			if(data.inventory.length == 0){
				$('#no-inventories').removeClass('hidden');
				$('.search-pagination').addClass('hidden');
			}
			else{
				$('.search-pagination').removeClass('hidden');
			}
			createPagination(data);
		});
	}

	function createTables(data){
		for(i=0;i<data.english_name.length;i++){
			newEnglishName = $(document.createElement('tr'));
			newEnglishName.after().html(
				"<td>" + data.english_name[i] + "</td>" 
			);
			$('.table-englishName').append(newEnglishName);
		}
		for(i=0;i<data.venacular_name.length;i++){
			newVenacularName = $(document.createElement('tr'));
			newVenacularName.after().html(
				"<td>" + data.venacular_name[i] + "</td>" 
			);
			$('.table-venName').append(newVenacularName);
		}
		newOwner = $(document.createElement('tr'));
		newOwner.after().html(
			"<td>" + data.owner_firstname + " " + data.owner_middlename + " " + data.owner_lastname + "</td>" +
			"<td>" + data.owner_nickname + "</td>" +
			"<td>" + data.locality + "</td>"
		);
		$('.table-owner').append(newOwner);

		for(i=0;i<data.material.length;i++){
			newMaterial = $(document.createElement('tr'));
			newMaterial.after().html(
				"<td>" + data.material[i] + "</td>"				
			);
			$('.table-materials').append(newMaterial);
		}

		for(i=0;i<data.color.length;i++){
			newColor = $(document.createElement('tr'));
			newColor.after().html(
				"<td>" + data.color[i] + "</td>"				
			);
			$('.table-colors').append(newColor);
		}

		for(i=0;i<data.decoration.length;i++){
			newDecoration = $(document.createElement('tr'));
			newDecoration.after().html(
				"<td>" + data.decoration[i] + "</td>"
			);
			$('.table-decorations').append(newDecoration);
		}

		for(i=0;i<data.mark.length;i++){
			newMark = $(document.createElement('tr'));
			newMark.after().html(
				"<td>" + data.mark[i] + "</td>"
			);
			$('.table-marks').append(newMark);
		}
	}

	function deleteRows(){
		$('.deleteRows').children().remove();
		$('.td-donor').html('');
	}

	function showTables(){
		hideInputFields();
		$('.edit-table').removeClass('hidden');
		if($('.td-donor').text().length != 0){
			$('.donors-div').removeClass('hidden');
		}
		else{
			$('.purchases-div').removeClass('hidden');
		}
	}

	function hideInputFields(){
		$('.inputfields').addClass('hidden');
	}

	function showInputFields(){
		$('.inputfields').removeClass('hidden');
	}

	function hideTables(){
		showInputFields();
		$('.edit-table').addClass('hidden');
		if($('.td-donor').text().length != 0){
			$('.donors-div').addClass('hidden');
		}
		else{
			$('.purchases-div').addClass('hidden');
		}		
	}

	function showData(data){
		console.log(data);
		$('.username').text(data.username);
		$('#picname').val(data.picture_name);
		origAcqNumber = data.accession.acqNumber;
		$('#condition').prop('disabled', true);
		$('.td-category').html(data.category);
		$('.td-acq').html(data.accession.acqNumber);
		$('.td-obj').html(data.object);
		$('.td-location').html(data.location);
		$('.td-length').html(data.length);
		$('.td-width').html(data.width);
		if(data.unit == 'm'){
			measureStatus = 'Meter';
			$('.td-unit').html('meter');
		}
		else if(data.unit == 'cm'){
			measureStatus = 'Centimeter';
			$('.td-unit').html('centimeter');
		}
		else if(data.unit == 'mm'){
			measureStatus = 'Millimeter';
			$('.td-unit').html('millimeter');
		}
		$('#condition').val(data.condition);
		if(data.donor_firstname.length != 0){
			$('.td-donor').html(data.donor_firstname + " " + data.donor_middlename + " " + data.donor_lastname);
			$('.td-date').html(data.donor_date);
		}
		else{
			$('.td-amount').html(data.amount);
			$('.td-pur-address').html(data.purchased_address);
			$('.td-pur-date').html(data.purchased_date);
		}
	}	

	$('#category').click(function(){
		if($(this).val() == 'Artifacts' || $(this).val() == 'Textiles' || $(this).val() == 'Farming Tools' || $(this).val() == 'Fishing Tools'){
			$('.image-div').removeClass('hidden');
			$('#image-header').removeClass('hidden');
			$('.image-group').removeClass('hidden');
			$('.image-preview').removeClass('hidden');			
		}
	})

	var inventoryData = '';

	$('body').on('click', '.inventory-view-button', function(){
		$('.modified').removeClass('hidden');
		$('#inventory-edit-button').removeClass('hidden');
		$('.modal-title').text('View Inventory');
		$('.invent-button').addClass('hidden');
		$('.view-invent-button-close').removeClass('hidden');
		$('#edit-button').removeClass('hidden');
		acqNumber = $(this).find('input').val();
		$('body').css('cursor', 'wait');
		$('.inventory-view-button').css({'pointer-events': 'none'});
		retrieveInventory(acqNumber).done(function(data){
			$('body').css('cursor', 'default');
			$('.inventory-view-button').css({'pointer-events': 'auto'});
			console.log(data);
			inventoryData = data;
			showData(data);
			createTables(data);
			showTables();
			$('#inventory-modal').modal('show');
			if(data.english_name.length == 0){
				$('.englishName-table').addClass('hidden');
			}
			else{
				$('.englishName-table').removeClass('hidden');
			}
			if(data.venacular_name.length == 0){
				$('.venName-table').addClass('hidden');
			}
			else{
				$('.venName-table').removeClass('hidden');
			}
			if(data.material.length == 0){
				$('.materials-table').addClass('hidden');
			}
			else{
				$('.materials-table').removeClass('hidden');
			}
			if(data.color.length == 0){
				$('.colors-table').addClass('hidden');
			}
			else{
				$('.colors-table').removeClass('hidden');
			}
			if(data.decoration.length == 0){
				$('.decorations-table').addClass('hidden');
			}
			else{
				$('.decorations-table').removeClass('hidden');
			}
			if(data.mark.length == 0){
				$('.marks-table').addClass('hidden');
			}
			else{
				$('.marks-table').removeClass('hidden');
			}			
			if(data.picture != ''){
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
				$('#image-header').addClass('hidden');
			}
		});
	});

	var editCounter = false;
	var addCounter = false;
	$('#add-inventory-button').click(function(){
		$('#confirm-submit').text('Add');
		$('.modified').addClass('hidden');
		$('.image-div').removeClass('hidden');
		$('#image-header').removeClass('hidden');
		$('.image-group').removeClass('hidden');
		$('.image-preview').removeClass('hidden');		
		addCounter = true;
		editChange = false;
		$('.modal-title').text('Add Inventory');
		$('#inventory-edit-button').addClass('hidden');
		$('.invent-button').removeClass('hidden');
		$('.view-invent-button-close').removeClass('hidden');
		$('.view-invent-button-close').addClass('pull-left');
		$(this).prop('disabled', true);
		$('#inventory-modal').modal('show');
	});



	function fadeModal(){
		$('#inventory-modal').animate({
			opacity: 0.9
		}, 400 );
	}

	function hideModal(){
		$('#inventory-modal').animate({
			opacity: 0
		}, 400 );		
	}

	function showModal(){
		$('#inventory-modal').animate({
			opacity: 1
		}, 400 );		
	}

	$('#cancel-add-confirm').click(function(){
		$('#cancel-add-modal').modal('hide');
		showModal();
		exitInventoryModal();
		addCounter = false;
	});

	$('#cancel-add-close').click(function(){
		showModal();
	});

	$('#cancel-add-modal').on('hidden.bs.modal', function(){
		$('body').addClass('modal-open');
	});

	function exitInventoryModal(){
		$('#inventory-modal').modal('hide');
		$('#edit-button').addClass('hidden');
		hideTables();
		deleteRows();		
	}

	$('.inventory-close').click(function(){
		if(addCounter == true){
			fadeModal();
			$('#cancel-add-modal').modal('show');
		}
		else{
			exitInventoryModal();
		}
	});

	$('.edit-close').click(function(){
		editCounter = false;
		$('#cancel-confirm-modal').modal('show');
	});

	$('#cancel-close').click(function(){
		$('.modified').removeClass('hidden');
		showModal();
		$('#inventory-cancel-edit-button').removeClass('hidden');
	});

	$('#inventory-confirm-cancel').click(function(){
		if(editCounter == false){
			$('.edit-close').addClass('hidden');
			$('.inventory-close').removeClass('hidden');
			$('#inventory-modal').modal('hide');
		}
		$('#cancel-confirm-modal').modal('hide');
		goBackView();
	});

	$('#inventory-cancel-edit-button').click(function(){
		$(this).addClass('hidden');
		editCounter = true;
		fadeModal();		
		$('#cancel-confirm-modal').modal('show');
	});

	$('#inventory-edit-button').click(function(){
		$('#confirm-submit').text('Save Changes');
		$('.modified').addClass('hidden');
		editCounter = true;
		hideTables();
		putBackData(inventoryData);
		$(this).addClass('hidden');
		showEditButtons();
	});

	function goBackView(){
		showTables();
		$('#inventory-reset').trigger('click');
		$('#inventory-cancel-edit-button').addClass('hidden');
		hideEditButtons();
	}

	$('#inventory-reset').click(function(){
		measureStatus = '';
		acquisitionStatus = '';
		$('.file-name').val('Click the browse button to select pictures...');
		$('.image-preview').removeAttr('style');	

		for(i=0;i<englishNameNum;i++){
			$('.remove-engName').trigger('click');
		}
		for(i=0;i<venacularNameNum;i++){
			$('.remove-venName').trigger('click');
		}
		for(i=0;i<materialNum;i++){
			$('.remove-material').trigger('click');
		}
		for(i=0;i<colorNum;i++){
			$('.remove-color').trigger('click');
		}
		for(i=0;i<decorationNum;i++){
			$('.remove-decoration').trigger('click');
		}
		for(i=0;i<markNum;i++){
			$('.remove-mark').trigger('click');
		}							
	});

	$('body').on('click', '.inventory-delete-button', function(){
		acq = $(this).val();
		object = $(this).parent().parent().children('td:first-child').text();
		$('.delete-status').html(
			"Successfully deleted object '" + object + "'!" +
			"<button type='button' class='close success-close' aria-label='Close' data-dismiss='alert'>" +
        		"<span aria-hidden='true'>&times;</span>" +
    			"</button>"
		);
		$('.p-delete-invent').text("Please click the delete button to confirm deletion of object '" + object + "'.");
		$('#delete-confirm-modal').modal('show');
		$('#inventory-confirm-delete').val(acq);
	});

	function deleteInventory(acqNumber, edit){
		return $.ajax({
			headers:{
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},			
			type: 'post',
			url: '/delete/inventory/' + acqNumber + '/' + edit + '/' + 'none',
		});	
	}

	if($('.success-status').hasClass('has-inventory-status') == true){
		$('.success-status').fadeIn().delay(2000).fadeOut();
	}

	$('#inventory-confirm-delete').click(function(){
		x = $(this);
		x.text('Deleting...');
		x.prop('disabled', true);
		$('#delete-close').prop('disabled', true);
		$('body').css('cursor', 'wait');	
		deleteInventory(x.val(), false).done(function(){
			$('.delete-status').fadeIn().delay(2000).fadeOut();
			x.text('Delete');
			$('body').css('cursor', 'default');
			x.prop('disabled', false);
			$('#delete-close').prop('disabled', false);				
			$('.add-success').trigger('click');
			$('.delete-status').removeClass('hidden');
			$('#delete-confirm-modal').modal('hide');
			$('.inventory-items').children('tr.' + x.val()).remove();
			if($('.inventory-items').children().length == 0){
				$('#no-inventories').removeClass('hidden');
			}
			showInventory().done(function(data){
				createPagination(data);
			});
		});
	});

	function putBackData(data){
		$('#category').val(data.category);
		$('#acqNumber').val(data.accession.acqNumber);
		$('#object').val(data.object);
		$('#location').val(data.location);
		$('#owner-firstname').val(data.owner_firstname);
		$('#owner-middlename').val(data.owner_middlename);
		$('#owner-lastname').val(data.owner_lastname);
		$('#owner-nickname').val(data.owner_nickname);
		$('#local').val(data.locality);
		$('#length').val(data.length);
		$('#width').val(data.width);		
		$('.measurement').each(function(){
			if($(this).val() == data.unit){
				$(this).prop('checked', true);
			}
		});
		for(i=1;i<data.english_name.length;i++){
			$('#add-engName').trigger('click');
		}
		for(i=1;i<data.venacular_name.length;i++){
			$('#add-venName').trigger('click');
		}
		for(i=1;i<data.material.length;i++){
			$('#add-materials').trigger('click');
		}
		for(i=1;i<data.color.length;i++){
			$('#add-color').trigger('click');
		}
		for(i=1;i<data.decoration.length;i++){
			$('#add-decoration').trigger('click');
		}
		for(i=1;i<data.mark.length;i++){
			$('#add-mark').trigger('click');
		}					
		i=0;
		$('.english-name-new').each(function(){
			$(this).children('.input-group').children('input').val(data.english_name[i]);
			i++;
		});
		i=0;
		$('.venacular-name-new').each(function(){
			$(this).children('.input-group').children('input').val(data.venacular_name[i]);
			i++;
		});
		i=0;
		$('.material-new').each(function(){
			$(this).children('.input-group').children('input').val(data.material[i]);
			i++;
		});
		i=0;
		$('.color-new').each(function(){
			$(this).children('.input-group').children('input').val(data.color[i]);
			i++;
		});	
		i=0;
		$('.decoration-new').each(function(){
			$(this).children('.input-group').children('input').val(data.decoration[i]);
			i++;
		});
		i=0;
		$('.mark-new').each(function(){
			$(this).children('.input-group').children('input').val(data.mark[i]);
			i++;
		});
		if(data.donor_firstname.length != 0){
			$('.donated').trigger('click');
			$('#donor-firstname').val(data.donor_firstname);
			$('#donor-middlename').val(data.donor_middlename);
			$('#donor-lastname').val(data.donor_lastname);
			$('#donated-date').val(data.donor_date);
		}
		else{
			$('.purchased').trigger('click');
			$('#amount').val(data.amount);
			$('#address').val(data.purchased_address);
			$('#purchased-date').val(data.purchased_date);
		}
		if(data.picture_name.length != 0){
			$('.file-name').val(data.picture_name);
		}
	}

	function showEditButtons(){
		$('.inventory-close').addClass('hidden');
		$('.edit-close').removeClass('hidden');		
		$('.invent-button').removeClass('hidden');
		$('#inventory-cancel-edit-button').removeClass('hidden');
		$('#condition').prop('disabled', false);
		$('.view-invent-button-close').addClass('pull-left');
		$('#inventory-submit').text('Save Changes');
		$('.inventory-form').attr('action', 'http://localhost:8000/edit/inventory/' + acqNumber);
		editChange = true;
	}

	function hideEditButtons(){
		$('.inventory-close').removeClass('hidden');
		$('.edit-close').addClass('hidden');		
		$('#inventory-edit-button').removeClass('hidden');
		$('.invent-button').addClass('hidden');
		$('.view-invent-button-close').addClass('pull-right');
		$('#condition').prop('disabled', true);
		$('#inventory-submit').text('Add');
		$('.inventory-form').attr('action', 'http://localhost:8000/add/inventory');
	}

	$('#confirm-submit').click(function(){
		$('#confirm-submit').text('Adding...');
		$('#confirm-cancel').prop('disabled', true);
		$('#confirm-submit').prop('disabled', true);
		$("body").css("cursor", "wait");
		$('.inventory-form').submit();
	});

	$( '#cancel-confirm-modal' ).on( 'hidden.bs.modal' , function(){
		$('body').addClass('modal-open');
		showModal();		
	});

	$( '#confirm-add-modal' ).on( 'hidden.bs.modal' , function(){
		$('body').addClass('modal-open');
	});

	$( '#inventory-modal' ).on( 'hidden.bs.modal' , function(){
		hideTables();
		deleteRows();
		$('#condition').prop('disabled', false);
		$('#inventory-reset').trigger('click');		
		$('#add-inventory-button').prop('disabled', false);
	});

	var searchType = 'Accession Number';

	$('.inventory-type-dropdown').on('click', 'li a', function(){
		$('.inventory-search-type').html($(this).text() + " <span class='caret'></span>");
		$('.inventory-search-type').val($(this).text());
		searchType = $.trim($(this).text());
		displayTypeData(searchType);
	});

	function getAccession(){
		return $.ajax({
			type: 'get',
			url: '/inventory/accession'
		});
	}

	function getOwners(){
		return $.ajax({
			type: 'get',
			url: '/inventory/owners'
		});
	}

	function getDonors(){
		return $.ajax({
			type: 'get',
			url: '/inventory/donors'
		});
	}

	function displayTypeData(searchType){
		if(searchType == 'Accession Number' || searchType == 'Object'){
			$('.author-info').addClass('hidden');
			$('.inventories-table').removeClass('hidden');
			$('.owners-table').addClass('hidden');
			getAccession().done(function(data){
				createPagination(data);
			});
		}
		else if(searchType == 'Owner'){
			$('.author-info').removeClass('hidden');
			$('.inventories-table').addClass('hidden');
			$('.owners-table').removeClass('hidden');	
			getOwners().done(function(data){
				createPagination(data);
			});
		}	
		else if(searchType == 'Donor'){
			$('.author-info').removeClass('hidden');
			$('.inventories-table').addClass('hidden');
			$('.owners-table').removeClass('hidden');				
			getDonors().done(function(data){
				createPagination(data);
			})
		}
	}

	var delay = (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
	})();

	function retrieveResults(query){
		return $.ajax({
			type: 'get',
			url: '/search/inventory/' + searchType + '/' + query,
		});
	}

	$('.inventory-search').keypress(function(){
		$('.inventories-table').css('pointer-events', 'none');
		$('.owners-table').css('pointer-events', 'none');
	});

	$('.inventory-search').keyup(function(){
		var query = $(this).val();
		delay(function(){
			$('.inventories-table').css('pointer-events', 'auto');
			$('.owners-table').css('pointer-events', 'auto');			
			retrieveResults(query).done(function(data){
				createPagination(data);
			}).fail(function(){
				if(searchType == 'Accession Number' || searchType == 'Object'){
					$('.owners-table').addClass('hidden');
					showInventory().done(function(data){
						createPagination(data);
					});
				}
				else if(searchType == 'Owner'){
					$('.inventories-table').addClass('hidden');
					getOwners().done(function(data){
						createPagination(data);
					});
				}
				else if(searchType == 'Donor'){
					$('.inventories-table').addClass('hidden');
					getDonors().done(function(data){
						createPagination(data);
					});
				}
			});
		}, 500);
	});

	function retrieveCreated(id, searchType){
		return $.ajax({
			type: 'get',
			url: '/inventory/retrieveCreated/' + id + '/' + searchType
		})
	}
	$('body').on('click', '.inventory-owner', function(){
		$('.owners-table').addClass('hidden');
		id = $(this).find('input').val();
		console.log(id);
		retrieveCreated(id, searchType).done(function(data){
			createPagination(data);
		});
	});
});