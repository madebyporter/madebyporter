#!/usr/bin/env node
'use strict';
require('native-promise-only');
var pkgUp = require('pkg-up');
var chalk = require('chalk');
var que = require('./que.js');

module.exports = (function () {
	// first, get the project's package.json
	pkgUp().then(function (filepath) {
		console.log('installing dependencies from:', chalk.cyan(filepath));

		var pkg = require(filepath);

		que(pkg).then(function (status) {
			console.log(status);
			process.exit();
		}).catch(function (err) {
			console.log(err);
			process.exit();
		});
	});
})();
