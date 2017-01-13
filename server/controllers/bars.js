'use strict';

var Yelp = require('yelp');
module.exports = (options) => {
    let yelp = new Yelp(options);
    let api = {
        getBarsByArea: function(location) {
            // See http://www.yelp.com/developers/documentation/v2/search_api
            yelp.search({ term: 'bar', location: location })
                .then(function (data) {
                console.log(data);
            })
            .catch(function (err) {
                console.error(err);
            });
        }
    }
    return api;
};