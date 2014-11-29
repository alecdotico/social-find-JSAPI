var request = require('request');

var scrapers = [
	require('./scrapers/twitter'),
	require('./scrapers/facebook')
];

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
		var idx = 0;
		var addData = function(data) {
			result.push(data);
			idx ++;
			if (idx < scrapers.length) {
				scraper_request(scrapers[idx]);
			} else {
				callback(JSON.stringify(result));
			}
		};

		var scraper_request = function(curr_scraper) {
			console.log("Fetching " + curr_scraper.base_url(config.name));
			request(curr_scraper.base_url(config.name), function (error, res, chunk) {
				var data = {};
				if (!error && res.statusCode == 200) {
					data = curr_scraper.parse(chunk, config.name);
				} else {
					data[curr_scraper.network] = 'no user found';
				}
				addData(data);
			});
		};

		scraper_request(scrapers[0]);





	}
};
