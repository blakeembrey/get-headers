# Get Headers

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

> Retrieve all HTTP(s) headers as an object with original casing.

## Installation

```sh
npm install get-headers --save
```

## Usage

### Parse

```js
import { parse } from 'get-headers'

parse(xhr.getAllResponseHeaders()) //=> {}
```

### HTTP

```js
import { get } from 'http'
import { http } from 'get-headers'

get('http://example.com', (res) => {
  http(res) //=> {}
})
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/get-headers.svg?style=flat
[npm-url]: https://npmjs.org/package/get-headers
[downloads-image]: https://img.shields.io/npm/dm/get-headers.svg?style=flat
[downloads-url]: https://npmjs.org/package/get-headers
[travis-image]: https://img.shields.io/travis/blakeembrey/get-headers.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/get-headers
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/get-headers.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/get-headers?branch=master
