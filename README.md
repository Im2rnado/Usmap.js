# Usmap.JS
[![npm version](https://img.shields.io/npm/v/usmap.svg)](https://npmjs.com/package/usmap)
[![npm downloads](https://img.shields.io/npm/dm/usmap.svg)](https://npmjs.com/package/usmap)
[![license](https://img.shields.io/npm/l/usmap.svg)](https://github.com/Im2rnado/Usmap.js/blob/master/LICENSE.MD)

An NPM Library to parse Usmap files

## Installation
```
npm i usmap
```

## Parsing
The main class is used to parse the Usmap file.

The there is an `options` param, where you can choose to debug or not.

## Example
```javascript
const Usmap = require("usmap");
const fs = require("fs");

const reader = new Usmap({ debug: true });

const start = Date.now();

const buf = fs.readFileSync("path to usmap.usmap");
const mappings = reader.parse(buf);

console.log(`Successfully parsed file in ${(Date.now() - start) / 1000}s (${mappings.count.enums} enums, ${mappings.count.schemas} schemas)`);
```

## Need help?
Check our discord server: https://discord.gg/HxGfuEx

## License
MIT License

Copyright (c) 2021 Im2rnado

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.