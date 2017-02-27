$(document).ready(function(){
	$(document).on('hidden.bs.modal', function () {
		$('body').addClass('modal-open');
	});

	if($("#warning-message").text() != ""){
		$(".alert-danger").css("visibility", "visible");
	}

	$("a").click(function(){
		$(".pageName").val($(this).attr("value"));
		$($(this).attr("name")).submit();
	});

	$("input[name=status]").click(function (){
		$(".invalid-status").text("");
		var status = $("input[name=status]:checked").val();
		// published
		if(status == 1){
			$(".pub-status").removeClass("hide");
			$(".invalid-publisher").removeClass("hide");
			$(".invalid-published-date").removeClass("hide");
			$(".invalid-published-place").removeClass("hide");						
		}
		//unpublished
		else if(status == 2){
			$(".pub-status").addClass("hide");
			$(".invalid-publisher").addClass("hide");
			$(".invalid-published-date").addClass("hide");
			$(".invalid-published-place").addClass("hide");
			$(".invalid-publisher").text("");
			$(".invalid-published-date").text("");	
			$(".invalid-published-place").text("");
		}	
	});

	$("input[name=acquisition]").click(function(){
		var acquisition= $("input[name=acquisition]:checked").val();
		if(acquisition == 1){
			$(".donor-name").removeClass("hide");
			$(".donor-year").removeClass("hide");
			$(".purchase-amount").addClass("hide");
			$(".purchase-year").addClass("hide");
			$(".purchase-address").addClass("hide");
			$(".invalid-amount").addClass("hide");	
			$(".invalid-purchased-year").addClass("hide");
			$(".invalid-purchased-address").addClass("hide");
			$("#acq-purchased").addClass("hide");
		}
		if(acquisition== 2){
			$(".invalid-donor").addClass("hide");
			$(".invalid-donor-year").addClass("hide");
			$(".donor-name").addClass("hide");
			$(".donor-year").addClass("hide");
			$(".purchase-amount").removeClass("hide");
			$(".purchase-year").removeClass("hide");
			$(".purchase-address").removeClass("hide");
			$(".invalid-amount").removeClass("hide");
			$(".invalid-purchased-year").removeClass("hide");
			$(".invalid-purchased-address").removeClass("hide");
			$(".invalid-amount").text("");
			$(".invalid-purchased-year").text("");
			$(".invalid-purchased-address").text("");	
		}
	});

	$("input[name=available]").click(function(){
		if($("input[name=available]").val() != undefined){
			$(".invalid-available").text("");
		}	
	});

	$("input[name=acquisition]").click(function (){
		if($("input[name=acquisition]").val() != undefined){
			$(".invalid-acquisition").text("");
		}
	});

	$(".select").click(function(){
		var category = $('.select').find(":selected").val();
		if(category == 6){
			$(".thesis-div").removeClass("hide");
			$(".course").removeClass("hide");
			$(".school").removeClass("hide");
			$(".invalid-course").removeClass("hide");
			$(".invalid-school").removeClass("hide");
		}
		else{
			$(".thesis-div").addClass("hide");			
			$(".course").addClass("hide");
			$(".school").addClass("hide");
			$(".invalid-course").addClass("hide");
			$(".invalid-school").addClass("hide");			
		}

		if(category >= 12){
			$(".invalid-time").removeClass("hide");
			$(".time-div").removeClass("hide");
			$(".time").removeClass("hide");
			$(".author").text("Director:");
			$(".co-author").text("Producer:");
			$(".label-name").text("Director:");
			$(".label-co-name").text("Producer:");
		}
		else{
			$(".invalid-time").addClass("hide");
			$(".time-div").addClass("hide");
			$(".time").addClass("hide");
			$(".author").text("Author:");
			$(".co-author").text("Co-Author:");
			$(".label-name").text("Author:");
			$(".label-co-name").text("Co-Author:");					
		}

		if(category == 11){
			$(".photo-div").removeClass("hide");
			$(".author").text("Photographer:");
			$(".co-authors").addClass("hide");
			$(".photo-date").removeClass("hide");
			$(".photo-size").removeClass("hide");
			$(".photo-desc").removeClass("hide");
			$(".invalid-taken").removeClass("hide");
			$(".invalid-size").removeClass("hide");
			$(".invalid-desc").removeClass("hide");
			$(".label-name").text("Photographer:");
			$(".co-author-div").addClass("hide");
		}
		else{
			$(".photo-div").addClass("hide");
			$(".co-author-div").removeClass("hide");
			$(".label-name").text("Author:");
			$(".co-authors").removeClass("hide");
			$(".photo-date").addClass("hide");
			$(".photo-size").addClass("hide");
			$(".photo-desc").addClass("hide");			
		}
		$(".invalid-category").text("");
		$(".invalid-reference").text("");
		$(".invalid-title").text("");
		$(".invalid-author-name").text("");
		$(".invalid-publisher").text("");
		$(".invalid-published-date").text("");
		$(".invalid-status").text("");
		$(".invalid-available").text("");
		$(".invalid-acquisition").text("");
		$(".invalid-donor").text("");
		$(".invalid-course").text("");
		$(".invalid-school").text("");
		$(".invalid-donor-year").text("");
		$(".invalid-amount").text("");
		$(".pub-status").addClass("hide");
		$(".invalid-taken").text("");
		$(".invalid-size").text("");
		$(".invalid-time").text("");
		$(".invalid-publisher").addClass("hide");
		$(".invalid-published-date").addClass("hide");
		$(".invalid-published-place").addClass("hide");
		$(".purchase-amount").addClass("hide");
		$(".purchase-address").addClass("hide");
		$(".purchase-year").addClass("hide");
		$(".donor-name").addClass("hide");
		$(".donor-year").addClass("hide");
		$(".invalid-amount").addClass("hide");
		$("input[name=acquisition]:checked").prop('checked', false);
		$("input[name=status]:checked").prop('checked', false);
	});

	var ctr = 2;
	$("#co-author-button1").click(function(){
		var selected =  $('.select').find(":selected").val();
		if(selected >= 12){
			categoryName = "Producer:";
		}
		else{
			categoryName = "Co-Author:"
		}
		var newDiv = $(document.createElement('div')).attr("class", "input-group form-input category co-author" + ctr);
		newDiv.after().html(
			"<span class='input-group-addon form-title co-author'>" + categoryName + "</span>" + 
			"<input type='text' class='form-control co" + ctr + "'placeholder='Pedro Paterno'/>" +
			"<span class='input-group-btn'>" +
			"<button type='button' class='btn btn-secondary remove' value="+ ctr  + ">" +
			"<span class='glyphicon glyphicon-minus'></span></button></span>");
		newDiv.appendTo(".co-authors");
		ctr++;
	});

	var tagCounter = 2;
	$("#tags-button").click(function(){
		var newTag = $(document.createElement('div')).attr("class", "input-group form-input tag tags" + tagCounter);
		newTag.after().html(
			"<span class='input-group-addon form-title'>Tag:</span>" + 
			"<input type='text' class='form-control tag" + tagCounter +  "'placeholder='History'/>" +
			"<span class='input-group-btn'>" +
			"<button type='button' class='btn btn-secondary removeTag' value=" + tagCounter  + ">" +
			"<span class='glyphicon glyphicon-minus'></span></button></span> ");
		newTag.appendTo(".tags");
		tagCounter++;
	});

	$(".select").click(function(){
		for(i=2;i<ctr;i++){
			$(".co-author"+i).remove();
			$(".tags" + i)
		}
		for(i=2;i<tagCounter;i++){
			$(".tags" + i).remove();
		}		
		ctr = 2;
		tagCounter = 2;
	});

	$("body").on('click', '.remove', function(){
		$(".co-author" + $(this).val()).remove();
		ctr--;
	});
	$("body").on('click', '.removeTag', function(){
		$(".tags" + $(this).val()).remove();
		tagCounter--;
	});
	if($("#warning-message").text() == "File Successfully added!"){
		$(".alert").removeClass("alert-danger").addClass("alert-success");
		$(".alert-success:hidden").show("fast");
	}
	else if($("#warning-message").text() == "File Successfully added!"){
		$(".alert").removeClass("alert-success").addClass("alert-danger");
		$(".alert-danger:hidden").show("fast");
	}

	$('#vertical-files').on('shown.bs.modal', function(){
		$(window).keydown(function(event){
			if(event.keyCode == 13){
				event.preventDefault();	
				return false;
				
			}
		});
		$("#next").click(function(){
			var selectName = $('.select').find(":selected").text();
			var  referenceNumber = $("#reference-number").val();
			var titleName = $("#title").val();
			var authorName = $("#author").val();
			var coauthorName = $("#co-author").val();
			var tags = $("#tags").val();
			var time= $("#time").val();
			var publisher = $("#publisher").val();
			var publishedDate = $("#published-date").val();
			var publishedPlace = $("#published-place").val();
			var status = $("input[name=status]:checked").val();
			var donorName = $("#donorName").val();
			var donorDate = $("#donorDate").val();
			var amount = $("#amount").val();
			var purchasedYear = $("#purchased-year").val();
			var purchasedAddress = $("#purchased-address").val();
			var acquisition = $("input[name=acquisition]:checked").val();
			var available = $("input[name=available]:checked").val();
			var course = $("#course").val();
			var school = $("#school").val();
			var size = $("#size").val();
			var photoDate =$("#date-taken").val();
			counter = 0;

			if(selectName == "Choose Category"){
				$(".invalid-category").text("Required Field.");
				counter++;
			}

			else{
				$(".invalid-category").text("");
				$("#category-confirm").text(selectName);
			}
			if(referenceNumber == ""){
				$(".invalid-reference").text("Required Field.");	
				counter++;		
			}
			else{
				$(".invalid-reference").text("");
				$("#reference-confirm").text(referenceNumber);

			}
			if(titleName == ""){
				$(".invalid-title").text("Required Field.");	
				counter++;
			}

			else{
				$(".invalid-title").text("");
				$("#title-confirm").text(titleName);	
			}

			if(selectName == "Photograph"){
				if(size == ""){
					$(".invalid-size").text("Required Field.");
					counter++;
				}
				else{
					$(".invalid-size").text("");
					$("#size-confirm").text(size);
				}
				if(photoDate == ""){
					$(".invalid-taken").text("Required Field.");
					counter++;
				}
				else{
					$(".invalid-taken").text("");
					$("#date-confirm").text(photoDate);
				}			
			}		

			if(selectName == "CD" || selectName == "DVD" || selectName == "VHS" || selectName =="Cassette Tapes"){
				if(time == ""){
					$(".invalid-time").text("Required Field.");
					counter++;
				}
				else{
					$(".invalid-time").text("");
					$("#time-confirm").text(time);
				}			
			}

			if(selectName == "Thesis"){
				if(course == ""){
					$(".invalid-course").text("Required Field.");
					counter++;
				}
				else{
					$(".invalid-course").text("");
					$("#course-confirm").text(course);
				}

				if(school == ""){
					$(".invalid-school").text("Required Field.");
					counter++;
				}
				else{
					$(".invalid-school").text("");
					$("#school-confirm").text(school);
				}	
			}	

			if(authorName == ""){
				$(".invalid-author-name").text("Required Field.");
				counter++;	
			}
			else{
				$(".invalid-author-name").text("");
				$("#author-confirm").text(authorName);	
			}
			if(coauthorName == ""){
			}
			else{
				$("#co-author-confirm").text(coauthorName);
			}		
			if(tags == ""){
			}
			else{
				$("#tags-confirm").text(tags);
			}

			if(acquisition === undefined){
				$(".invalid-acquisition").removeClass("hide");
				$(".invalid-acquisition").text("Required Field.");
				counter++;			
			}						
			if(status === undefined){	
				$(".invalid-pub").removeClass("hide");
				$(".invalid-status").text("Required Field.");
				counter++;
			}
			else if(status == 1){
				$("#status-confirm").text("Published");
				$("#publish-confirm-status").removeClass();
				if(publisher == ""){
					$(".invalid-publisher").text("Required Field.");
					counter++;
				}
				else{
					$(".invalid-publisher").text("");
					$("#publisher-confirm").text(publisher);	
				}		
				if(publishedDate == ""){
					$(".invalid-published-date").text("Required Field.");
					counter++;			
				}
				else{
					$(".invalid-published-date").text("");	
					$("#published-date-confirm").text(publishedDate);
				}			
				if(publishedPlace == ""){
					$(".invalid-published-place").text("Required Field");
					counter++;
				}
				else{
					$(".invalid-published-place").text("");
					$("#published-place-confirm").text(publishedPlace)
				}	
			}
			else if(status == 2){
				$("#status-confirm").text("Unpublished");
				$("#publish-confirm-status").addClass("hide");
			}
			else{

				$(".invalid-status").text("");
			}
			if(acquisition == 1){
				$("#acq-donate").removeClass("hide");
				$("#acq-confirm").text("Donated");
				if(donorName == ""){
					$(".invalid-donor").text("Required Field");
					$(".invalid-donor").removeClass("hide");
					counter++;
				}
				else{		
					$("#donor-name-confirm").text(donorName);
					$(".invalid-donor").addClass("hide");
				}
				if(donorDate == ""){
					$(".invalid-donor-year").text("Required Field");
					$(".invalid-donor-year").removeClass("hide");
					counter++;
				}
				else{
					$("#donor-year-confirm").text(donorDate);
					$(".invalid-donor-year").addClass("hide");
				}
			}	
			else if(acquisition == 2){
				$("#acq-donate").addClass("hide");
				$("#acq-purchased").removeClass("hide");
				$("#acq-confirm").text("Purchased");
				if(amount == ""){
					$(".invalid-amount").text("Required Field.");
					$(".invalid-amount").removeClass("hide");
					counter++;
				}
				else{
					$("#amount-confirm").text(amount);
				}
				if(purchasedYear == ""){
					$(".invalid-purchased-year").text("Required Field");
					$(".invalid-purchased-year").removeClass("hide");
				}
				else{
					$("#purchase-year-confirm").text(purchasedYear);
				}
				if(purchasedAddress == ""){
					$(".invalid-purchased-address").text("Required Field");
					$(".invalid-purchased-address").removeClass("hide");
				}
				else{
					$("#purchase-address-confirm").text(purchasedAddress);
				}
			}

			var coAuthors = [];
			var coNames = "";
			$("#co-author-confirm").text("");
			for(i=1; i<ctr; i++){
				if($(".co"+ i).val() == ""){
					continue;
				}
				coAuthors.push($(".co"+ i).val());
			}
			for(i=0;i<coAuthors.length;i++){
				coNames += coAuthors[i];
				if(i == (coAuthors.length-1)){
					break;
				}
				coNames += ", ";
			}
			$("#co-author-confirm").text(coNames);
			coNames = coNames.replace(", ", ",");
			$("#hiddenAuthor").val(coNames);

			var tagArray = [];
			var tagNames = "";
			$("#tags-confirm").text("");
			for(i=1; i<tagCounter; i++){
				if($(".tag" + i).val() == ""){
					continue;
				}
				tagArray.push($(".tag" + i).val());
			}
			for(i=0;i<tagArray.length;i++){
				tagNames += tagArray[i];
				if(i == (tagArray.length-1)){
					break;
				}
				tagNames += ", ";
			}
			$("#tags-confirm").text(tagNames);
			tagNames = tagNames.replace(", ", ",");
			$("#tag").val(tagNames);
			

			if(counter != 0){
				$("#strong-message").text("Error!");
				return false;
			}
			else{
				$('#vertical-files').hide();
				$("#strong-message").text("Success!");
				// return true;
			}
		
		});		
	});

	$("#back").click(function (){
		$("#vertical-files").show();
	});

	// $('#final-output').on('shown.bs.modal', function(){
	// 	$("#add").click(function(){
	// 		// alert("add");
	// 		$("form").submit();
	// 	});
	// 	// $("#target").focus();
	// 	// $("#target").keypress(function (event){
	// 	// 	if ( event.keyCode == 13 ) {
	// 	// 	     alert("adsf");
	// 	// 	     event.preventDefault();
	// 	// 	     return false;
	// 	// 	 }			
	// 	// });
	// 	// $(window).keydown(function(event){
	// 	// 	// if(event.keyCode == 13 ){
	// 	// 	// 	alert("bbb");
	// 	// 	// 	// event.preventDefault;
	// 	// 	// 	$( "#add" ).trigger( "click" );
	// 	// 	// 	// return false;	
	// 	// 	// }
	// 	// });
	// });

		// $(window).keydown(function(event){
		// 	if(event.keyCode == 13){
		// 		return true;
		// 	}
		// });

	$("#reset").click(function (){
		counter = 0;
		$(".invalid-category").text("");
		$(".invalid-reference").text("");
		$(".invalid-title").text("");
		$(".invalid-author-name").text("");
		$(".invalid-publisher").text("");
		$(".invalid-published-date").text("");
		$(".invalid-status").text("");
		$(".invalid-available").text("");
		$(".invalid-acquisition").text("");
		$(".invalid-donor").text("");
		$(".invalid-course").text("");
		$(".invalid-school").text("");
		$(".invalid-donor-year").text("");
		$(".invalid-amount").text("");
		$(".pub-status").addClass("hide");
		$(".invalid-taken").text("");
		$(".invalid-size").text("");
		$(".invalid-desc").text("");
		$(".invalid-time").text("");		
		$(".invalid-publisher").addClass("hide");
		$(".invalid-published-date").addClass("hide");
		$(".invalid-published-place").addClass("hide");
		$(".invalid-purchased-year").addClass("hide");
		$(".invalid-purchased-address").addClass("hide");
		$(".purchase-amount").addClass("hide");
		$(".purchase-year").addClass("hide");
		$(".purchase-address").addClass("hide");
		$(".donor-name").addClass("hide");
		$(".donor-year").addClass("hide");
		$(".invalid-amount").addClass("hide");
	});
});	