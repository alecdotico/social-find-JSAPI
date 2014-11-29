Social username finder Javascript API
================
Finds in social networks a specific username


Why?
================
Before creating a new account you might find useful to check if that
user exists in any social networks.


How?
================
Requests routed to `/user/:name` crawls the different social networks
for a given username by DOM traversing with `cheerio`.
Then we assemble a **JSON output**

The server responds to any GET request (yes, also **CORS with client-side Javascript**)


Running local
================
`npm install`

`node index.js` or `foreman start`


To do
================
* Add new scrappers for providing access to searches or other products types
