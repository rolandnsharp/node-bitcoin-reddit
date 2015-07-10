var $ = require('jquery');

module.exports = function(form) {
	$(form).submit(function(event) {
		// Stop the browser from submitting the form.
		event.preventDefault();

		// Submit the form using AJAX.
		$.ajax({
		    type: 'POST',
		    url: $(form).attr('action'),
		    data: $(form).serializeArray()
		}).done(function(data) {

			console.log(data)
			if(data.success)
				window.location.href = '/'
			else
				alert(data.message)
		});
	});
}