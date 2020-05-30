# LocalStorageCache

## Contents

- [Demo](https://github.com/heihaozi/LocalStorageCache/)
- [Description](#description)
- [Usage](#usage)
- [Requirements](#requirements)
- [License](#license)

## Description

Use localStorage to implement expired cache.

## Usage

Include the JavaScript script in your HTML markup:

```html
<script src="js/lsc.js"></script>
```

In your application code, set the cache to localStorage by calling the **lsc.set** method with the key, value, and expiration time as parameters:

```javascript
lsc.set('DemoKey', 'DemoValue', 5);
```

Get the cached value from localStorage by calling the **lsc.get** method with the key as the parameter:

```javascript
var val = lsc.get('DemoKey');
```

## Requirements

The LocalStorageCache script has zero dependencies.

## License

The LocalStorageCache is released under the
[MIT license](https://opensource.org/licenses/MIT).
