'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema({
    name: String,
	patrons: Number   
});

module.exports = mongoose.model('Bar', Bar);