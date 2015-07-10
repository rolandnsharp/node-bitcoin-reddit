var $ = require('jquery');
var handleForm = require('./imports/handleForm.js');
var handleVote = require('./imports/handleVote.js');


$(function(){
	handleForm($('#form-signin'))
	handleForm($('#form-signup'))
	handleForm($('#form-submit'))
	handleForm($('#form-create'))

	handleVote()
});