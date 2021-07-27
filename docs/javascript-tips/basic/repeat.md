# repeat 字符串的重复输出

String.prototype.repeat() 是 ES6 新增的一个方法，我们本次希望用自己的方案实现。

## 循环追加

要实现字符串的 repeat，在不考虑性能的情况下，最简单的思路便是循环，for 循环也好，while 循环也好，循环到想要的次数即可。

```js
function repeat(str = "", times = 1) {
  let result = "";
  if (!str || times <= 1) {
    return str;
  }

  do {
    // 拼接字符串即可
    result += str;
    times--;
  } while (times);

  return result;
}
```

## 叠加方案（性能最佳）

我们可以看到，在重复次数很多的时候，比如**16 次**时，我们可以考虑使用叠加的方案：

```
1次 + 1次
2次 + 2次
4次 + 4次
8次 + 8次 = 16次
```

这样，仅需 4 次叠加，即可达到目的值。而对于奇数次，我们仅需要，二分向下取整，多加一次即可。例如 **5 次**，方案便是

```
1次 + 1次
2次 + 2次
4次 + 1次 = 5次
```

实现代码如下：

```js
function repeat(str = "", times = 1) {
  let result = "";
  if (!str || times < 0) {
    return str;
  }

  do {
    if (times % 2) {
      result += str;
    }
    times = Math.floor(times / 2);
    str += str;
  } while (times);

  return result;
}
```

> 以上方案是性能最佳的可实行方案，看到这里即可，剩下内容都是其他思考点。

## 递归

递归的方法，是最直接的思路，我们每次使用 1/2 的长度进行相加来实现，比如**16 次**，便是 `8次 + 8次`以此类推，**15 次**便是`7次 + 8次`以此类推，实现代码如下：

```js
function repeat(str = "", times = 1) {
  if (times <= 1) {
    return str;
  }
  return repeat(str, Math.floor(times / 2)) + repeat(str, Math.ceil(times / 2));
}
```

## 改进递归

上面递归的方案多次调用了 repeat，我们做简单的优化，来减少 repeat 的调用次数：

```js
function repeat(str = "", times = 1) {
  if (times <= 1) {
    return str;
  }
  const result = repeat(str, Math.floor(times / 2));
  if (times % 2) {
    return result + result + str;
  } else {
    return result + result;
  }
}
```

## JavaScript 数组实现

JavaScript 为我们提供了很方便的代码，我们直接使用会降低开发的时间：

```js
function repeat(str = "", times = 1) {
  return Array(times).fill(str).join("");
}
```
