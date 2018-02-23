var css = require('../src/assets/sass/global.scss'), 
		// images = require('../src/assets/sass/components/image.scss'),
		JqueryMatchHeight = require('jquery-match-height'),
		// enable this to use font awesome's default settings
		fontAwesome = require('font-awesome-sass-loader'),
		//  enable this to use custom settings for app per client
		/* TODO - remove this sha256 variable */
		SHA256 = require('crypto-js/sha256');

		

var app = (function () {
	class Block {
		constructor(index, timestamp, data, previousHash = '') {
			this.index = index;
			this.timestamp = timestamp;
			this.data = data;
			this.previousHash = previousHash;
			this.hash = this.calculateHash();
		}

		calculateHash() {
			return SHA256(this.index + this.timestamp + this.data + JSON.stringify(this.previousHash)).tostring();
		}
	}

	class BlockChain {
		constructor() {
			this.chain = [this.createGenesisBlock()];
		}

		createGenesisBlock() {
			return new Block (0, '24/2/2018', "Genesis Block", "0")
		}

		getLatestBlock() {
			return this.chain[this.chain.length - 1];
		}

		addNewBlock(newblock) {
			newblock.previousHash = this.getLatestBlock.hash();
			newblock.hash = this.calculateHash()
			this.chain.push(newblock); 
		}
	}

		let savjeeCoin = new BlockChain();
		savjeeCoin.addNewBlock(new Block(1, "10/07/2017", {amount:4}));
		savjeeCoin.addNewBlock(new Block(2, "12/07/2017", {amount:10}));
	
	console.log(JSON.stringify(savjeeCoin, null, 4));

	/*var 
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
	};	*/


}());

app.eventHandler();
// this script should be well commented