# egg-got

[![NPM version][npm-image]][npm-url]

<!--
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]
-->

[npm-image]: https://img.shields.io/npm/v/egg-got.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-got
<!--
[travis-image]: https://img.shields.io/travis/eggjs/egg-got.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-got
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-got.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-got?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-got.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-got
[snyk-image]: https://snyk.io/test/npm/egg-got/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-got
[download-image]: https://img.shields.io/npm/dm/egg-got.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-got
-->

>
> ### Important:
>
> **still in develop, do not use in production.**
>

HTTP request library [got](https://github.com/sindresorhus/got) plugin for [eggjs](https://github.com/eggjs/egg).

## Install

```bash
$ npm i egg-got
```

## Usage

```js
// {app_root}/config/plugin.js
exports.got = {
  enable: true,
  package: 'egg-got',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.got = {
  // ...
};
```

If you want to save `got` log, please define a custom logger named `gotLogger`, this name you can rename in `got.logger.name`.

```js
// custom logger
exports.customLogger = {
  gotLogger: {
    // ...
  },
};
```

### Options:

You can use [got options](https://github.com/sindresorhus/got#options) in root property, but exclude `hooks`, you should `got.extend` it yourself.

#### `logger.name`

Type: `string`

The custom logger name.

#### `logger.formatter`

Type: `Function`

See [got hooks](https://github.com/sindresorhus/got#hooks) for more detail.

For example:

```js
/**
 * @param {Object} data
 * @param {string} data.type
 * @param {Object} data.options
 * @param {Object} data.response
 * @param {Object} data.error
 * ...
 */
function formatter(data) {
  switch (data.type) {
    case 'init': {
      const { options } = data;
      // ...
    }
    case 'beforeRetry': {
      const { options, error, retryCount } = data;
      // ...
    }
    case 'beforeError':
    case 'beforeRequest':
    case 'afterResponse':
    case 'beforeRedirect':
  }
}
```

## License

[MIT](LICENSE)
