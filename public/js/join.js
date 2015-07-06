// http://blog.teamtreehouse.com/create-ajax-contact-form

var $ = require('jquery');


$(function(){

	handleForm($('#form-signin'))
	handleForm($('#form-signup'))

	function handleForm(form) {
		$(form).submit(function(event) {
			// Stop the browser from submitting the form.
			event.preventDefault();

			// Submit the form using AJAX.
			$.ajax({
			    type: 'POST',
			    url: $(form).attr('action'),
			    data: $(form).serializeArray()
			}).done(function(data) {
				if(data.success)
					window.location.href = '/'
				else
					alert(data.message)
			});
		});
	}

}); 
