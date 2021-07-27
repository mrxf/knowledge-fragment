# 关于memoize



```js
const memoize = function (func) {
  const cache = {};
  return function (key) {
    if (!(key in cache)) {
      cache[key] = func(key);
    }
    return cache[key];
  };
};
```
