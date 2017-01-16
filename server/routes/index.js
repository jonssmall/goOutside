'use strict';

const path = process.cwd();
const barApi = require(path + '/server/controllers/bars.js');

module.exports = function (app, passport, yelpOptions) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	let bars = barApi(yelpOptions);

	//Express templating doesn't pass user state to React app, requires quasi-redundant state call
	app.route('/signedOn')
        .get(function(req, res) {
            res.send(req.isAuthenticated());
        })

	app.route('/')
		.get(function (req, res) {			
			res.sendFile(path + '/client/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			// res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});	

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/'
		}));
	
	app.route('/bars/:location')
		.get(bars.searchByArea);
};