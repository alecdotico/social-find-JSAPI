var cheerio = require('cheerio');

module.exports = {

	base_url: function(name) {
		return 'http://graph.facebook.com/' + name;
	},
	/**
	* Parses the given html to scrap the desired metadata
	*
	* @param String data
	 * @param String username
	* @return Object
		@prop String network
	 		@prop Object user
	*/
	network: 'Facebook',
	parse: function(data, username) {
		var result = {};
		result[this.network] = JSON.parse(data);
		return result;
	}
};
