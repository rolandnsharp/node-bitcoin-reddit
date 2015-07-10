var $ = require('jquery');

module.exports = function() {
	$('.vote-box').click(function(event) {

		event.preventDefault();

		$.ajax({
		    type: 'POST',
		    url: '/vote',
		    data: { postId: $(this).attr('id') }
		}).done(function(data) {
			if(data.success) {
				$('#'+data.postId+'>.vote-number').html(data.investment)
				$('#'+data.postId).next().children().eq(1).html('Investors '+data.investors.toString(0))
				//$('#balance').html(data.balance)
			} else {
				alert(data.message)
			}
		});
	});
}