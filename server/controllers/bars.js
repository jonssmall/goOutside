'use strict';

var Yelp = require('yelp');
var Bars = require('../models/bars.js');

module.exports = (options) => {
    let yelp = new Yelp(options);
    let api = {
        searchByArea: (req, res) => {
            // See http://www.yelp.com/developers/documentation/v2/search_api
            yelp.search({ term: 'bar', location: req.params.location })
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Server error - check logs");
            });
        },
        //is it a ball of mud to stash this internal crud next to an API control?
        changePatrons: (location, amount) => {
            Bars.findOne({ 'Name': location }, (err, bar) => {
                if (err) throw err;
                if(bar) {
                    bar.patrons += amount;
                    bar.save(function(err) {
                        if (err) throw err;
                        res.send(bar);
                    });
                } else { //theoretically only possible of incrementing patrons
                    var newBar = new Bar();
                    newBar.name = location;
                    newBar.patrons = amount; //1		
					newBar.save(function (err) {
						if (err) throw err;
						res.send(newBar);
					});
                }
            });			    			
        },        
    };
    return api;
};