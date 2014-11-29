var request = require('request');

var scrapers = [require('./scrapers/twitter')];

module.exports = {
	/**
	* Retrieves information with a given appID
	*
	* @param Object config
		* @prop String name
	* @param Function callback
		* @param Object data
	*/
	searchUser: function (config, callback) {
		var result = [];
		for (var idx in scrapers) {
			var scraper = scrapers[idx];
			console.log("Fetching " + scraper.base_url(config.name));
			request(scraper.base_url(config.name), function (error, res, chunk) {
				if (!error && res.statusCode == 200) {
					var data = scraper.parse(chunk, config.name);
					if (typeof callback == 'function') {
						result.push(data);
					}
				} else {
					var data = {};
					data[scraper.network] = 'no user found';
					result.push(data);
				}
				if (result.length == scrapers.length) {
					callback(JSON.stringify(result));
				}
			});
		}
	}
};
