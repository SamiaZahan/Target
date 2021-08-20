$(function() {
	
	var filterDomainArray = [];
	var filterStatusArray = [];
	
	
	$(document).on('click','#filter-button',function(){
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.filter-container').slideUp(500);
		} else {
			$(this).addClass('active');
			$('.filter-container').slideDown(500);
		}
	});
	
	
	
	//Filter by domain
	$(document).on('click','div.filter-website-option',function(){
		if($(this).hasClass('selected')) {
			$(this).removeClass('selected');
			$.removeElementFromCollection(filterDomainArray, $(this).attr('data-id'));
		} else {
			$(this).addClass('selected');
			filterDomainArray.push($(this).attr('data-id'));
		}
				//show filtered
				$('.url-container .single-container').hide();
				jQuery.each(filterDomainArray, function() {
					if ( $('.url-container .single-container[data-id="'+this+'"]').length ) {
						 $('.url-container .single-container[data-id="'+this+'"]').show();
					}
				});
				jQuery.each(filterStatusArray, function() {
					if ( $('.url-container .single-container[data-status="'+this+'"]').length ) {
						 $('.url-container .single-container[data-status="'+this+'"]').show();
					}
				});
				if ((filterDomainArray.length == 0) && (filterStatusArray.length == 0)) {
					$('.url-container .single-container').show();
				}
	});
	
	
	
	//Filter by status
	$(document).on('click','div.filter-status-option',function(){
		if($(this).hasClass('selected')) {
			$(this).removeClass('selected');
			$.removeElementFromCollection(filterStatusArray, $(this).attr('data-id'));
		} else {
			$(this).addClass('selected');
			filterStatusArray.push($(this).attr('data-id'));
		}
				//show filtered
				$('.url-container .single-container').hide();
				jQuery.each(filterStatusArray, function() {
					if ( $('.url-container .single-container[data-status="'+this+'"]').length ) {
						 $('.url-container .single-container[data-status="'+this+'"]').show();
					}
				});
				jQuery.each(filterDomainArray, function() {
					if ( $('.url-container .single-container[data-id="'+this+'"]').length ) {
						 $('.url-container .single-container[data-id="'+this+'"]').show();
					}
				});
				if ((filterDomainArray.length == 0) && (filterStatusArray.length == 0)) {
					$('.url-container .single-container').show();
				}
	});
	
	
	
	
	
	
	//Delete link confirmation
	$(document).on('click','a.url-delete-button',function(e){
		var link = this;

		e.preventDefault();

		$("<div>Are you sure?</div>").dialog({
			buttons: {
				"Yes": function() {
					window.location = link.href;
				},
				"Cancel": function() {
					$(this).dialog("close");
				}
			},
			title: "Delete Link?"
		});
	});
	
	
	
	
	
	//Update Payment Method
	$(document).on('click','button.edit_payment_method',function(e){
		e.preventDefault();
		var routename = '';
		var institutename = '';
		var accountnumber = 'Account';
		$(this).parents('.single-container').addClass('active');
		$(this).parents('.single-container').prepend('<input type="hidden" name="method" value="'+$(this).parents('.single-container').attr('data-method')+'" />');
			if($(this).parents('.single-container').attr('data-method') == 'Xoom') {
				routename = 'Phone';
				institutename = 'Country';
				accountnumber = 'Full Address';
			} else if($(this).parents('.single-container').attr('data-method') == 'Bank') {
				routename = 'Route';
				institutename = 'Institute';
			} else if($(this).parents('.single-container').attr('data-method') == 'PayPal') {
				accountnumber = 'Email Address';
			} else if($(this).parents('.single-container').attr('data-method') == 'Interac E-Transfer') {
				accountnumber = 'Email Address';
			}
		if((typeof $(this).parents('.single-container').attr('data-route') !== typeof undefined) && ($(this).parents('.single-container').attr('data-route') !== false)) {
			$(this).parents('.single-container').children('.route').html('<input type="text" name="route" value="'+$(this).parents('.single-container').attr('data-route')+'" placeholder="'+routename+'" />');
		} else if (routename !== '') {
			$(this).parents('.single-container').children('.route').html('<input type="text" name="route" placeholder="'+routename+'" />');
		}
		if((typeof $(this).parents('.single-container').attr('data-institute') !== typeof undefined) && ($(this).parents('.single-container').attr('data-institute') !== false)) {
			$(this).parents('.single-container').children('.institute').html('<input type="text" name="institute" value="'+$(this).parents('.single-container').attr('data-institute')+'" placeholder="'+institutename+'" />');
		} else if (institutename !== '') {
			$(this).parents('.single-container').children('.institute').html('<input type="text" name="institute" placeholder="'+institutename+'" />');
		}
		if((typeof $(this).parents('.single-container').attr('data-account') !== typeof undefined) && ($(this).parents('.single-container').attr('data-account') !== false)) {
			$(this).parents('.single-container').children('.account-number').html('<input type="text" name="account_number" value="'+$(this).parents('.single-container').attr('data-account')+'" placeholder="'+accountnumber+'" />');
		} else {
			$(this).parents('.single-container').children('.account-number').html('<input type="text" name="account_number" placeholder="'+accountnumber+'" />');
		}
		$(this).removeClass('edit_payment_method');
		$(this).addClass('save_payment_method');
		$(this).text('Save');
	});
	
	
	
	
	//Username Availability
	$(document).on('click','.edit-account-container .availability-check',function(event){
		checkUsernameAvailability();
	});
	
	
	
	//Edit Account Tabs
	$(document).on('click','.tab-container>div',function(event){
		$('.field-container').hide();
		$('.tab-container>div').removeClass('active');
		$(this).addClass('active');
		$('.field-container[data-id='+$(this).attr('id')+']').show();
	});
	
	
	//Update Balance
	$(document).on('click','a#update_balance_sidebar',function(e){
		e.preventDefault();
		updateAjaxBalance();
	});
	
	
	
	//FAQ slide
	$(document).on('click','.faq-question .question',function(e){
		e.preventDefault();
		if($(this).parents('.faq-question').hasClass('active')) {
			$(this).parents('.faq-question').removeClass('active');
			$(this).parents('.faq-question').children('.answer').slideUp();
		} else {
			$(this).parents('.faq-question').addClass('active');
			$(this).parents('.faq-question').children('.answer').slideDown();
		}
	});
	
	
	//FAQ Button Load
	$(document).on('click','a.col-md.faq',function(e){
		e.preventDefault();
		$([document.documentElement, document.body]).animate({
			scrollTop: $('.faq-section-content').offset().top - 50
		}, 1000);
	});
	
	
	//Support ticket thumb upload
	$(document).on('click','button.support_thumb_upload_button',function(e){
		e.preventDefault();
		$('input.support_thumb_upload').trigger("click");
	});
	$(document).on('change','input.support_thumb_upload',function(event){
		image_to_blob(event, 'img.support_thumb_preview', 'input.img_blob');
		$('input.support_thumb_upload').val('');
	});
	
	
	
	
	
	//Copy Link 
	$(document).on('click','.copy_link',function(e){
		e.preventDefault();
		var $tempElement = $('<input>');
		var $textCopied = $('<span>');
        $('body').append($tempElement);
        $tempElement.val($(this).attr('href')).select();
        document.execCommand('Copy');
		var position = $(this).position();
        $tempElement.remove();
		$(this).parents('span').append($textCopied);
		$textCopied.addClass('copied_tip');
		$textCopied.text('Copied');
		$textCopied.position({
			my: "left+5 bottom+1",
			of: e,
			collision: "fit"
		});
		setTimeout(function(){
			$('span.copied_tip').remove();
		}, 1500);
	});
	
	$(document).on('click','.url-copy-button',function(e){
		e.preventDefault();
		var $tempElement = $('<input>');
		var $textCopied = $('<span>');
        $('body').append($tempElement);
        $tempElement.val($(this).parents('.copy_url_section').children('.url-copy-input').attr('value')).select();
        document.execCommand('Copy');
		var position = $(this).position();
        $tempElement.remove();
		$(this).append($textCopied);
		$textCopied.addClass('copied_tip');
		$textCopied.text('Copied');
		$textCopied.position({
			my: "left+5 bottom+1",
			of: e,
			collision: "fit"
		});
		$(this).css("background-color", "#11a508");
		setTimeout(function(){
			$('span.copied_tip').remove();
			$('.url-copy-button').css("background-color", "#333");
		}, 1500);
	});
	
	
	
	
	
	
	$(document).on('keypress','.username_field',function(event){
		var regex = new RegExp("^[a-zA-Z0-9]+$");
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
		   event.preventDefault();
		   return false;
		}
	});
	
	
	
	$(document).on('keypress','.password_field',function(event){
		setTimeout(function(){
			if ($('.password_field[name=password1]').val() != $('.password_field[name=password2]').val()) {
				$('span.password_match_reminder').show();
				$('form[data-id=register] input[type=submit]').css('background','#9e9e9e');
				$('form[data-id=register] input[type=submit]').css('cursor','no-drop');
				$('form[data-id=register] input[type=submit]').prop('disabled', true);;
			} else {
				$('span.password_match_reminder').hide();
				$('form[data-id=register] input[type=submit]').css('background','#3c72b9');
				$('form[data-id=register] input[type=submit]').css('cursor','pointer');
				$('form[data-id=register] input[type=submit]').prop('disabled', false);;
			}
		}, 500);
	});
});










	
	
	
	
	
	
	
	
	






//Support ticket thumb
	function image_to_blob(imagefiletag, target_img, target_field) {
		var file = imagefiletag.target.files[0];
		if(file.type.match(/image.*/)) {
			var reader = new FileReader();
			reader.onload = function (readerEvent) {
				var image = new Image();
				image.onload = function (imageEvent) {
					var canvas = document.createElement('canvas'),
						max_size = 1200,
						width = image.width,
						height = image.height;
					if (width > height) {
						if (width > max_size) {
							height *= max_size / width;
							width = max_size;
						}
					} else {
						if (height > max_size) {
							width *= max_size / height;
							height = max_size;
						}
					}
					canvas.width = width;
					canvas.height = height;
					canvas.getContext('2d').drawImage(image, 0, 0, width, height);
					var dataUrl = canvas.toDataURL('image/jpeg');
					$(target_img).attr('src', dataUrl);
					$(target_field).val(dataUrl);
				}
				image.src = readerEvent.target.result;
			}
			reader.readAsDataURL(file);
		}
	};







(function($, global, undefined) {
    $.removeElementFromCollection = function(collection,key) {
        // if the collections is an array
        if(collection instanceof Array) {
            // use jquery's `inArray` method because ie8 
            // doesn't support the `indexOf` method
            if($.inArray(key, collection) != -1) {
                collection.splice($.inArray(key, collection), 1);
            }
        }
        // it's an object
        else if(collection.hasOwnProperty(key)) {
            delete collection[key];
        }

        return collection;
    };
})(jQuery, window); 




//Check availability
function checkUsernameAvailability() {
	$.ajax({
           url: location.protocol + '//' + location.host + '/wp-admin/admin-ajax.php', // Try full url too
           data: {	username: $('.username_field').val(),
					action: 'ajax_retrieve_username_availability'
					},
           method: 'POST',  //  POST | GET
           dataType: 'html', // xml,json,script,html
           beforeSend: function() {
                 //$("#loaderIcon").show();
           },
           success:function(){
				 $('.availability-check').removeClass('available');
				 $('.availability-check').removeClass('not-available');
				 $('.availability-check').addClass('available');
				 if ($('form[data-id=register] input[type=submit]').length) {
					$('form[data-id=register] input[type=submit]').prop('disabled', false);
					$('form[data-id=register] input[type=submit]').css('background','#3c72b9');
					$('form[data-id=register] input[type=submit]').css('cursor','pointer');
				 }
           },
           error:function (){
				$('.availability-check').removeClass('available');
				$('.availability-check').removeClass('not-available');
				$('.availability-check').addClass('not-available');
				if ($('form[data-id=register] input[type=submit]').length) {
					$('form[data-id=register] input[type=submit]').prop('disabled', true);
					$('form[data-id=register] input[type=submit]').css('background','#9e9e9e');
					$('form[data-id=register] input[type=submit]').css('cursor','no-drop');
				 }
           }
   });
}



//Update balance
function updateAjaxBalance() {
	$.ajax({
           url: location.protocol + '//' + location.host + '/wp-admin/admin-ajax.php', // Try full url too
           data: {action: 'ajax_update_balance'},
           method: 'POST',  //  POST | GET
           dataType: 'html', // xml,json,script,html
           beforeSend: function() {
                 //$("#loaderIcon").show();
           },
           success:function(result){
				$('.sidebar_balance span.balance_span').text(result);
           }
   });
}