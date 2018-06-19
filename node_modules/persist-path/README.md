# persist-path

[![NPM version](https://badge.fury.io/js/persist-path.svg)](http://badge.fury.io/js/persist-path)
[![Dependency Status](https://img.shields.io/gemnasium/hobbyquaker/persist-path.svg?maxAge=2592000)](https://gemnasium.com/github.com/hobbyquaker/persist-path)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![License][mit-badge]][mit-url]

> Get OS-specific path to store persistent data

## Usage

```npm install persist-path```

```Javascript
var ppath = require('persist-path')();
```

## OS-specific Paths

### Linux/BSD

If you supply an argument to the required function call this will be appended as .dot directory.

Example:
```Javascript
var ppath = require('persist-path')('myproject/settings');

console.log(ppath); // /home/<username>/.myproject/settings
```

### macOS

If you supply an argument to the required function call this will be appended on Library/Preferences in the Users home

Example:
```Javascript
var ppath = require('persist-path')('myproject/settings');

console.log(ppath); // /Users/<username>/Library/Preferences/myproject/settings
```

### Windows

If you supply an argument to the required function call this will be appended on Users %appdata% dir

# License

MIT (c) 2016 [Sebastian Raff](https://github.com/hobbyquaker)

[mit-badge]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat
[mit-url]: LICENSE

