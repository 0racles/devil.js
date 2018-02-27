var css = require('../src/assets/sass/global.scss'), 
		// images = require('../src/assets/sass/components/image.scss'),
		JqueryMatchHeight = require('jquery-match-height'),
		// enable this to use font awesome's default settings
		fontAwesome = require('font-awesome-sass-loader'),
		//  enable this to use custom settings for app per client
		/* TODO - remove this sha256 variable */
		SHA256 = require('crypto-js/sha256');

		
	var 
	form_input = document.getElementById('form_input'),
	form_btn = document.getElementById('form_btn'),
	middle_btn = document.getElementById('middle_btn'),
	clear_btn = document.getElementById('clear_btn'),
	
	set_local_storage = function () {
		localStorage.setItem('button', form_input.value);
	},

	clear_local_storage = function () {
		localStorage.removeItem();
	},

	populate_json_file = function () {
		var mybutton = JSON.parse(button);
		var myAlert = JSON.parse(alert);
		mybutton[0].border = localStorage.getItem('button');
		console.log(mybutton);
	};

	return {
		eventHandler : function () {
		form_btn.addEventListener('click', set_local_storage);
		middle_btn.addEventListener('click', populate_json_file);

		}
	};	



// this script should be well commented