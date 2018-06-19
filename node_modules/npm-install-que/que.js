'use strict';

require('native-promise-only');
var objectAssign = require('object-assign');
var spawn = require('cross-spawn-async');
var chalk = require('chalk');

module.exports = function (pkg) {
	return new Promise(function (resolve, reject) {
		// track the packages that failed install
		var errors = [];

		// track the packages that installed successfully
		var success = [];

		var mdeps = pkg.dependencies || {};
		var ddeps = pkg.devDependencies || {};

		var deps = Object.keys(objectAssign(mdeps, ddeps));

		if (deps.length === 0) {
			reject('No dependencies found. Exiting.');
		}

		function que() {
			var p = deps.shift();
			if (p) {
				install(p);
			} else {
				// the que is empty, report and exit
				resolve(printStatus());
			}
		}

		function printStatus() {
			var message = '';
			var total = success.length + errors.length;
			var successRate = (success.length / total) * 100;
			var failRate = (errors.length / total) * 100;
			message += chalk.cyan('npm-install-que complete!') + '\n';

			success.forEach(function (name, i) {
				if (i === 0) {
					message += '\n' + chalk.green(successRate + '%') + ' installed successfully\n';
				}
				message += chalk.green('installed: ') + chalk.white(name) + ' ' + chalk.green('✔︎') + '\n';
			});

			errors.forEach(function (name, i) {
				if (i === 0) {
					message += '\n' + chalk.red(failRate + '%') + ' failed install\n';
				}
				message += chalk.red('failed: ') + chalk.white(name.name) + ' ' + chalk.red('x︎') + '\n';
			});

			if (errors.length > 0) {
				message += chalk.gray('\nRetry failed installs by running the following command:') + '\n';
				message += retryFailedMsg();
			}
			return message;
		}

		function retryFailedMsg() {
			var msg = '';
			errors.forEach(function (name, i, a) {
				msg += 'npm install ' + name.name;
				if (++i !== a.length) {
					msg += ' && ';
				}
			});
			return msg;
		}

		function install(pkgName) {
			var child = spawn('npm', ['install', pkgName], {stdio: 'inherit'});
			console.log(chalk.white('\ninstalling:'), chalk.cyan(pkgName));

			child.on('error', function (err) {
				errors.push({name: pkgName, err: err});
				que();
			});

			child.on('exit', function (exitCode) {
				if (exitCode === 0) {
					success.push(pkgName);
				} else {
					errors.push({name: pkgName, err: 'exitCode: ' + exitCode});
				}
				que();
			});
		}

		// get this [recursive] party started!
		que();
	});
};
