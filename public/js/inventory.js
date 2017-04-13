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
			if($.inArray(extension, ['png','jpg','jpeg']) == -1) {
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
		nickname = $.trim($('#owner-nickname').val());
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

		if(nickname == ''){
			$('.owner-nickname-help').removeClass('hidden');
			$('.owner-nickname-help strong').text('The nickname field is required.');
			errorCounter++;
		}
		else if(nickname.length > 50){
			$('.owner-nickname-help').removeClass('hidden');
			$('.owner-nickname-help strong').text('The nickname field should not exceed 50 characters.');
			errorCounter++;
		}
		else{
			$('.owner-nickname-help').addClass('hidden');
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
				console.log($('#colors').val());
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

	function createPagination(data){
		var totalPages = data.inventory.length;
		var minPage = 5;
		var total = 0;
		var max =0;
		var index =0;
		var defaultOpts = {
			totalPages: 1
		};
		if(data.inventory.length <= minPage){
			totalPages = 1;
		}
		else{
			totalPages = Math.ceil(data.inventory.length/minPage);
		}
		$('#pagination-demo').twbsPagination(defaultOpts);
		$('#pagination-demo').twbsPagination('destroy');
		$('#pagination-demo').twbsPagination($.extend({}, defaultOpts, {
			startPage: 1,
			totalPages: totalPages,
			onPageClick: function(event, page){
				$('.inventories-table').trigger('update');
				inventoryLength = data.inventory.length;
				total = page * minPage;
				index = Math.abs(total-minPage);
				max = data.inventory.length - index;
				if(max <= 5){
					max = data.inventory.length;
				}
				else{
					max = index + minPage;
				}
				for(i=0;i<inventoryLength;i++){
					$('.' + data.inventory[i].acqNumber).remove();
				}
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
		}));
	}

	if($('.inventory-search-type').val() == 'Object'){
		showInventory().done(function(data){
			console.log(data.inventory.length);
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
		$('#condition').prop('disabled', true);
		$('.td-category').html(data.category);
		$('.td-acq').html(data.accession.acqNumber);
		$('.td-obj').html(data.object);
		$('.td-length').html(data.length);
		$('.td-width').html(data.width);
		if(data.unit == 'm'){
			$('.td-unit').html('meter');
		}
		else if(data.unit == 'cm'){
			$('.td-unit').html('centimeter');
		}
		else if(data.unit == 'mm'){
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



	$('body').on('click', '.inventory-view-button', function(){
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
			showData(data);
			createTables(data);
			showTables();
			$('#inventory-modal').modal('show');
			if(data.picture != ''){
				url = "url(" + data.picture + ")";
				$('#image-preview').css({
					'background-image': url,
					'background-repeat': 'no-repeat',
					'background-size': 'contain',
					'background-position': 'center center',
					'width': '100%',
					'height': '400px'
				});
			}
		});
	});

	$('#add-inventory-button').click(function(){
		$('.modal-title').text('Add Inventory');		
		$('.invent-button').removeClass('hidden');
		$('.view-invent-button-close').addClass('hidden');
	});

	$('.inventory-close').click(function(){
		$('#edit-button').addClass('hidden');
		$('#condition').prop('disabled', false);
		hideTables();
		deleteRows();		
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

	function deleteInventory(acqNumber){
		return $.ajax({
			headers:{
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},			
			type: 'post',
			url: '/delete/inventory/' + acqNumber,
		});	
	}

	$('#inventory-confirm-delete').click(function(){
		x = $(this);
		x.text('Deleting...');
		x.prop('disabled', true);
		$('#delete-close').prop('disabled', true);
		$('body').css('cursor', 'wait');	
		deleteInventory(x.val()).done(function(){
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
		});
	});
});