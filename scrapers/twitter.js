var cheerio = require('cheerio');

module.exports = {

	base_url: function(name) {
		return 'https://twitter.com/' + name;
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
	network: 'Twitter',
	parse: function(data, username) {

		$ = cheerio.load(data);
		var user = {};
		var result = {};
		user['screen_name'] = $('.ProfileHeaderCard-name a').text();
		user['avatar'] = $('img.ProfileAvatar-image').attr('src');
		user['username'] = '@' + username;
		user['tweets'] = $('.ProfileNav-item--tweets .ProfileNav-value').text();
		user['following'] = $('.ProfileNav-item--following .ProfileNav-value').text();
		user['followers'] = $('.ProfileNav-item--followers .ProfileNav-value').text();
		user['favorites'] = $('.ProfileNav-item--favorites .ProfileNav-value').text();
		user['lists'] = $('.ProfileNav-item--lists .ProfileNav-value').text();
		user['bio'] = $('.ProfileHeaderCard-bio').text();
		user['location'] = $('.ProfileHeaderCard-locationText').text();
		user['joined_date'] = $('.ProfileHeaderCard-joinDateText').data('original-title');

		result[this.network] = user;
		return result;
	}
};
