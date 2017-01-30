'use strict';

var Yelp = require('yelp');
var Users = require('../models/users.js');

module.exports = (options) => {
    let yelp = new Yelp(options);    
    let api = {
        searchByArea: (req, res) => {
            // See http://www.yelp.com/developers/documentation/v2/search_api
            yelp.search({ term: 'bar', location: req.params.location })
            .then((data) => {
                var promises = data.businesses.map(function(bar) {
                    return new Promise(function(resolve, reject) {
                        Users.count({ 'location': bar.name }).exec((err, result) => {
                            if (err) return reject(err);                            
                            bar.patronCount = result;
                            resolve();
                        });    
                    });
                });
                Promise.all(promises)
                .then(function() { res.json(data); })
                .catch(console.error);                                
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Server error - check logs");
            });
        },
        setUserLocation: (req, res) => {
            Users.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'location': req.body.barName }, {new: true})
			.exec(function (err, result) {
					if (err) { throw err; }                    
					res.json(result);
				}
			);
        }
    }   
    return api;
};