'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (config) {
	const cwd = config.cwd,
	      dest = config.dest,
	      isProd = config.isProd,
	      src = config.src;


	const htmlWebpackConfig = values => {
		let url = values.url,
		    title = values.title;

		return Object.assign(values, {
			filename: (0, _path.resolve)(dest, url.substring(1), 'index.html'),
			template: `!!ejs-loader!${config.template || (0, _path.resolve)(__dirname, '../../resources/template.html')}`,
			minify: isProd && {
				collapseWhitespace: true,
				removeScriptTypeAttributes: true,
				removeRedundantAttributes: true,
				removeStyleLinkTypeAttributes: true,
				removeComments: true
			},
			favicon: (0, _fs.existsSync)((0, _path.resolve)(src, 'assets/favicon.ico')) ? 'assets/favicon.ico' : (0, _path.resolve)(__dirname, '../../resources/favicon.ico'),
			manifest: config.manifest,
			inject: true,
			compile: true,
			preload: config.preload === true,
			title: title || config.title || config.manifest.name || config.manifest.short_name || (config.pkg.name || '').replace(/^@[a-z]\//, '') || 'Preact App',
			excludeAssets: [/(bundle|polyfills)(\..*)?\.js$/],
			config,
			ssr(params) {
				return config.prerender ? (0, _prerender2.default)({ cwd, dest, src }, _extends({}, params, { url })) : '';
			}
		});
	};

	const pages = (0, _webpackBaseConfig.readJson)((0, _path.resolve)(cwd, config.prerenderUrls || '')) || [{ url: '/' }];

	return pages.map(htmlWebpackConfig).map(conf => new _htmlWebpackPlugin2.default(conf)).concat([new _htmlWebpackExcludeAssetsPlugin2.default(), new _scriptExtHtmlWebpackPlugin2.default({
		defaultAttribute: 'defer'
	})]);
};

var _path = require('path');

var _fs = require('fs');

var _htmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

var _htmlWebpackExcludeAssetsPlugin2 = _interopRequireDefault(_htmlWebpackExcludeAssetsPlugin);

var _scriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

var _scriptExtHtmlWebpackPlugin2 = _interopRequireDefault(_scriptExtHtmlWebpackPlugin);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _webpackBaseConfig = require('./webpack-base-config');

var _prerender = require('./prerender');

var _prerender2 = _interopRequireDefault(_prerender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }