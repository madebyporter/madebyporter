# npm-install-que [![Build Status](https://travis-ci.org/radiovisual/npm-install-que.svg?branch=master)](https://travis-ci.org/radiovisual/npm-install-que)

> Que up your project's dependencies, and automatically install them one-by-one.

Installing dependencies one at a time allows you to keep an eye on things in case something goes wrong. It also puts less
strain on your `npm install` for large, problematic installations. Sometimes npm hangs during the install, and you have to retry the
*entire* install all over again. :confused: To deal with this, I wrote this cli tool that attempts to install your dependencies one
at a time, and keeps track of the modules that failed. Doing this means that if you have to attempt a re-install, you only
have to re-install the modules that failed.

This started off as a quick experiment to see if it could help ease the pain of common npm hangs, so
[pull requests](https://github.com/radiovisual/npm-install-que/pulls) are welcome if you want to contribute.

## Install

```
$ npm install --global npm-install-que
```

## Usage

Instead of `npm install` to install your project dependencies, simply use:

```
$ npm-install-que
```

## Notes

`npm-install-que` will run just like `npm install`, giving you all the same npm output you are used to. The main difference,
of course, is that each of your project's dependencies are installed one at a time, and at the end of the install process, you will get a status report.

Please note that `npm-install-que` does not accept any parameters or arguments, so it's not a full replacement for the `npm install`
command. If you pass arguments to the `npm install` command, then you already have the ability to install dependencies one-at-a-time, so there is no need for this module
to support command line arguments.

**On Successful Installation:** You will see that each module installed without a problem:

![success screenshot](media/success-screenshot.png)

**On Failed Installations:** You will get a list of modules that failed, and a useful retry command to help you attempt a re-install:

![error screenshot](media/error-screenshot.png)

If multiple modules fail to install, then `npm-install-que` will `&&` together the `npm install` commands to let you retry
them one at a time. For example, if two packages failed, the retry command that will print at the end of the summary
will look something like:

```
npm install package-name && npm install other-package-name
```



## License

MIT © [Michael Wuergler](http://numetriclabs.com)
