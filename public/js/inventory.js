$(document).ready(function (){

	$(document).on('change', ':file', function() {
		var input = $(this),
			numFiles = input.get(0).files ? input.get(0).files.length : 1,
	        	label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
	    	input.trigger('fileselect', [numFiles, label]);
	});

	$(':file').on('fileselect', function(event, numFiles, label){
		var extension = label.substr( (label.lastIndexOf('.') +1) ).toLowerCase();
		if(label != ''){
			if($.inArray(extension, ['gif','png','jpg','jpeg']) == -1) {
				$('.extension-modal').modal('toggle');
				$('.inventory-content').animate({
					opacity: 0
				}, 400 );
				return false;
			}
			$('.file-name').val(label);
			$('#image-preview').css({"width": '100%'});
			$('#image-preview').css({"height": '400px'});
		}
	});

	$('#extension-close').click(function(){
		$('.inventory-content').animate({
			opacity: 1
		}, 400 );
	});

	$( '.extension-modal' ).on( 'hidden.bs.modal' , function(){
		$('body').addClass('modal-open');
	});

	$.uploadPreview({
		input_field: "#image-upload",   // Default: .image-upload
		preview_box: "#image-preview",  // Default: .image-preview
		label_field: "#image-label",    // Default: .image-label
		label_default: "Choose File",   // Default: Choose File
		label_selected: "Change File",  // Default: Change File
		no_label: false                 // Default: false
	});

	$('.remove-picture').click(function(){
		$('.file-name').val('Click the browse button to select pictures...');
		$('#image-preview').removeAttr('style');
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
		decorationNum++;
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

	$('#inventory-submit').click(function(event){
		errorCounter = 0;
		acq = $.trim($('#acqNumber').val());
		object = $.trim($('#object').val());
		firstName = $.trim($('#owner-firstname').val());
		middleName = $.trim($('#owner-middlename').val());
		lastName = $.trim($('#owner-lastname').val());
		locality = $.trim($('#local').val());
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

		if($('#category').val() == null){
			$('.select-help').removeClass('hidden');
			$('.select-help strong').text('The category field is required.');
			errorCounter++;
		}
		else{
			$('.select-help').addClass('hidden');
		}

		if(acq == ''){
			$('.acqNumber-help').removeClass('hidden');
			$('.acqNumber-help strong').text('The accession field is required.');
			errorCounter++;
		}
		else if(acq.length > 50){
			$('.acqNumber-help').removeClass('hidden');
			$('.acqNumber-help strong').text('The accession field should not exceed 50 characters.');
			errorCounter++;
		}
		else{
			$('.acqNumber-help').addClass('hidden');
		}

		if(object == ''){
			$('.object-help').removeClass('hidden');
			$('.object-help strong').text('The object field is required.');
			errorCounter++;
		}
		else if(object.length > 50){
			$('.object-help').removeClass('hidden');
			$('.object-help strong').text('The object field should not exceed 50 characters.');
			errorCounter++;
		}
		else{
			$('.object-help').addClass('hidden');
		}

		$('.english-name-new').each(function(){
			engName = $.trim($(this).children().children('input').val());

			if(engName != ''){
				engNameArray.push(engName);
			}
			else if(engName.length > 50){
				$(this).children('span').removeClass('hidden');
				$(this).children('span').children('strong').text('The english name field should not exceed 50 characters.');
				errorCounter++;
			}
			else{
				$(this).children('span').addClass('hidden');
			}

			if(engNameArray.length == 0){
				$('.engName-help strong').text('The english name field should have at least one description.');
				$('.engName-help').removeClass('hidden');
				errorCounter++;
				for(i=1;i<=englishNameNum;i++){
					$('.remove-engName').trigger('click');
				}				
			}
			else{
				$('#engNames').val(engNameArray);
				$('.engName-help').addClass('hidden');
			}
		});

		$('.venacular-name-new').each(function(){
			venName = $.trim($(this).children().children('input').val());

			if(venName != ''){
				venNameArray.push(venName);
			}
			else if(venName.length > 50){
				$(this).children('span').removeClass('hidden');
				$(this).children('span').children('strong').text('The venacular name field should not exceed 50 characters.');
				errorCounter++;
			}
			else{
				$(this).children('span').addClass('hidden');
			}

			if(venNameArray.length == 0){
				$('.venName-help strong').text('The venacular name field should have at least one description.');
				$('.venName-help').removeClass('hidden');
				errorCounter++;
				for(i=1;i<=venacularNameNum;i++){
					$('.remove-venName').trigger('click');
				}				
			}
			else{
				$('#venNames').val(venNameArray);
				$('.venName-help').addClass('hidden');
			}
		});		

		if(firstName == ''){
			$('.owner-firstname-help').removeClass('hidden');
			$('.owner-firstname-help strong').text('The first name field is required.');
			errorCounter++;
		}
		else if(firstName.length > 50){
			$('.owner-firstname-help').removeClass('hidden');
			$('.owner-firstname-help strong').text('The first name field should not exceed 50 characters.');
			errorCounter++;
		}
		else{
			$('.owner-firstname-help').addClass('hidden');
		}

		if(middleName == ''){
			$('.owner-middlename-help').removeClass('hidden');
			$('.owner-middlename-help strong').text('The middle name field is required.');
			errorCounter++;
		}
		else if(middleName.length > 50){
			$('.owner-middlename-help').removeClass('hidden');
			$('.owner-middlename-help strong').text('The middle name field should not exceed 50 characters.');
			errorCounter++;
		}
		else{
			$('.owner-middlename-help').addClass('hidden');
		}

		if(lastName == ''){
			$('.owner-lastname-help').removeClass('hidden');
			$('.owner-lastname-help strong').text('The last name field is required.');
			errorCounter++;
		}
		else if(lastName.length > 50){
			$('.owner-lastname-help').removeClass('hidden');
			$('.owner-lastname-help strong').text('The last name field should not exceed 50 characters.');
			errorCounter++;
		}
		else{
			$('.owner-lastname-help').addClass('hidden');
		}

		if(locality == ''){
			$('.local-help').removeClass('hidden');
			$('.local-help strong').text('The locality field is required.');
			errorCounter++;
		}
		else if(lastName.length > 50){
			$('.local-help').removeClass('hidden');
			$('.local-help strong').text('The locality field should not exceed 50 characters.');
			errorCounter++;
		}
		else{
			$('.local-help').addClass('hidden');
		}

		if(measureStatus.length == 0){
			$('.measure-status-help').removeClass('hidden');
			$('.measure-status-help strong').text('The unit field is required.');
			errorCounter++;
		}
		else{
			$('.measure-status-help').addClass('hidden');
		}

		if(length == ''){
			$('.length-help').removeClass('hidden');
			$('.length-help strong').text('The length field is required.');
			errorCounter++;
		}
		else if(length.length > 50){
			$('.length-help').removeClass('hidden');
			$('.length-help strong').text('The length field should not exceed 50 characters.');
			errorCounter++;
		}
		else if(length <= 0){
			$('.length-help').removeClass('hidden');
			$('.length-help strong').text('The length field should have a positive number.');
			errorCounter++;
		}
		else{
			$('.length-help').addClass('hidden');
		}

		if(width == ''){
			$('.width-help').removeClass('hidden');
			$('.width-help strong').text('The width field is required.');
			errorCounter++;
		}
		else if(width.length > 50){
			$('.width-help').removeClass('hidden');
			$('.width-help strong').text('The width field should not exceed 50 characters.');
			errorCounter++;
		}
		else if(width <= 0){
			$('.width-help').removeClass('hidden');
			$('.width-help strong').text('The width field should have a positive number.');
			errorCounter++;	
		}		
		else{
			$('.width-help').addClass('hidden');
		}

		if(condition == ''){
			$('.condition-help').removeClass('hidden');
			$('.condition-help strong').text('The condition field is required.');
			errorCounter++;
		}
		else if(condition.length > 50){
			$('.condition-help').removeClass('hidden');
			$('.condition-help strong').text('The condition field should not exceed 50 characters.');
			errorCounter++;
		}
		else{
			$('.condition-help').addClass('hidden');
		}		

		$('.material-new').each(function(){
			material = $.trim($(this).children().children('input').val());

			if(material != ''){
				matArray.push(material);
			}
			else if(material.length > 50){
				$(this).children('span').removeClass('hidden');
				$(this).children('span').children('strong').text('The material field should not exceed 50 characters.');
				errorCounter++;
			}
			else{
				$(this).children('span').addClass('hidden');
			}

			if(matArray.length == 0){
				$('.material-help strong').text('The material field should have at least one description.');
				$('.material-help').removeClass('hidden');
				errorCounter++;
				for(i=1;i<=materialNum;i++){
					$('.remove-material').trigger('click');
				}				
			}
			else{
				$('#materials').val(matArray);
				$('.material-help').addClass('hidden');
			}
		});

		$('.color-new').each(function(){
			color = $.trim($(this).children().children('input').val());

			if(color != ''){
				colorArray.push(color);
			}
			else if(color.length > 50){
				$(this).children('span').removeClass('hidden');
				$(this).children('span').children('strong').text('The color field should not exceed 50 characters.');
				errorCounter++;
			}
			else{
				$(this).children('span').addClass('hidden');
			}

			if(colorArray.length == 0){
				$('.color-help strong').text('The color field should have at least one description.');
				$('.color-help').removeClass('hidden');
				errorCounter++;
				for(i=1;i<=colorNum;i++){
					$('.remove-color').trigger('click');
				}				
			}
			else{
				$('#colors').val(colorArray);
				$('.color-help').addClass('hidden');
			}
		});

		$('.decoration-new').each(function(){
			decoration = $.trim($(this).children().children('input').val());

			if(decoration != ''){
				decorArray.push(decoration);
			}
			else if(decoration.length > 50){
				$(this).children('span').removeClass('hidden');
				$(this).children('span').children('strong').text('The decoration field should not exceed 50 characters.');
				errorCounter++;
			}
			else{
				$(this).children('span').addClass('hidden');
			}

			if(decorArray.length == 0){
				$('.decoration-help strong').text('The decoration field should have at least one description.');
				$('.decoration-help').removeClass('hidden');
				errorCounter++;
				for(i=1;i<=decorationNum;i++){
					$('.remove-decoration').trigger('click');
				}				
			}
			else{
				$('#decorations').val(decorArray);
				$('.decoration-help').addClass('hidden');
			}
		});

		$('.mark-new').each(function(){
			mark = $.trim($(this).children().children('input').val());

			if(mark != ''){
				markArray.push(mark);
			}
			else if(mark.length > 50){
				$(this).children('span').removeClass('hidden');
				$(this).children('span').children('strong').text('The special marks field should not exceed 50 characters.');
				errorCounter++;
			}
			else{
				$(this).children('span').addClass('hidden');
			}

			if(markArray.length == 0){
				$('.mark-help strong').text('The special marks field should have at least one description.');
				$('.mark-help').removeClass('hidden');
				errorCounter++;
				for(i=1;i<=markNum;i++){
					$('.remove-mark').trigger('click');
				}				
			}
			else{
				$('#marks').val(markArray);
				$('.mark-help').addClass('hidden');
			}
		});

		if(acquisitionStatus.length == 0){
			$('.inventory-acquisition-mode-help').removeClass('hidden');
			$('.inventory-acquisition-mode-help strong').text('The acquisition field is required.');
			errorCounter++;
		}
		else{
			$('.inventory-acquisition-mode-help').addClass('hidden');
		}

		if(acquisitionStatus == 'Donated'){
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

			dateTest = datePattern.test(donatedDate);

			if(dateTest == false){
				$('.donor-date-help strong').text('The date field is invalid.');
				$('.donor-date-help').removeClass('hidden');
				errorCounter++;					
			}
			else{
				$('.donor-date-help').addClass('hidden');
			}
		}
		else if(acquisitionStatus == 'Purchased'){
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

			if($('#address').val() ==""){
				$('.purchased-address-help strong').text('The address field is required.');
				$('.purchased-address-help').removeClass('hidden');
				errorCounter++;					
			}
			else{
				$('.purchased-address-help').addClass('hidden');
			}

			dateTest = datePattern.test(purchasedDate);

			if(dateTest == false){
				$('.purchased-date-help strong').text('The date field is invalid.');
				$('.purchased-date-help').removeClass('hidden');
				errorCounter++;					
			}
			else{
				$('.purchased-date-help').addClass('hidden');
			}				
		}

		if(errorCounter != 0){
			event.preventDefault();
		}

	});

	$('.inventory-reset').click(function(){
		measureStatus = '';
		acquisitionStatus = '';
		$('.file-name').val('Click the browse button to select pictures...');
		$('#image-preview').removeAttr('style');		
	});

	function showInventory(){
		return $.ajax({
			type: 'get',
			url: '/dashboard/show/inventory',
		});
	}

	showInventory().done(function(){

	}).fail(function(){

	});
});