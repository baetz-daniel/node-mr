## Information

Node-mr is a help package to ensure that all modules are loaded before a certain function can be executed.

## Example

-index.js

```javascript
const mr = require('node-mr');
const instance = mr.get('instance');
instance.listen(['moduleA','moduleB'], function (modules) {
	//do sth. with moduleA and moduleB if they exists
	modules.moduleA.test();
	modules.moduleB.test();
	
});
```
-moduleA.js

```javascript
const mr = require('node-mr');
const instance = mr.get('instance');

instance.add('moduleA', {
	test: function() {
		console.log('moduleA: test called');
	}
});
```

-moduleB.js

```javascript
const mr = require('node-mr');
const instance = mr.get('instance');

instance.add('moduleB', {
	test: function() {
		console.log('moduleB: test called');
	}
});
```

## Installing

```shell
npm install node-mr
```

## Usage

```javascript
const mr = require('node-mr');
const instance = mr.get([instanceName]);	//returns an existing instance or create a new one
* instanceName — `{string}` — the instance name.<br/>

instance.listen([requiredModules], [callback]);
* requiredModules — `{array}` — the required module names.<br/>
* callback — `{function}` — the callback called if all required modules exists.<br/>

instance.add([modulesName], [exports]);
* modulesName — `{string}` — add a module to the list.<br/>
* exports — `{object}` — module exports.<br/>

```
## Changelog

## License

Copyright (c) 2016-2017 Daniel Bätz <baetz.daniel@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or 
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

