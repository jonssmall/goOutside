'use strict';

var Yelp = require('yelp');
var Users = require('../models/users.js');

module.exports = (options) => {
    let yelp = new Yelp(options);
    let api = {
        searchByArea: function(req, res) {
            // See http://www.yelp.com/developers/documentation/v2/search_api
            yelp.search({ term: 'bar', location: req.params.location })
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).send("Server error - check logs");
            });
        }
    }
    return api;
};