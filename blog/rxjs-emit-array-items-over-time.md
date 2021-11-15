---
slug: rxjs-emit-array-items-over-time
title: "[译]如何在rxjs中随时间吐出数组元素"
author: 张树源
author_title: 前端工程师
author_url: https://github.com/mrxf
author_image_url: https://cdn.thisjs.com/cloud-yun/2021/05/07/7uYVT8i2_12392733.jpeg
tags: [rxjs]
---

> 原文地址：https://newbedev.com/rxjs-emit-array-items-over-time

> 使用RxJS 6，有三种方式可以实现：

## 1. 使用 `concatMap`

```js
import { from, of, pipe } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

const array = [1, 2, 3, 4, 5];

from(array)
 .pipe(
   concatMap(val => of(val).pipe(delay(1000))),
 )
 .subscribe(console.log);
```

<!--truncate-->

## 2. 使用 `zip` 和 `interval`组合

```js
import { from, pipe, interval } from 'rxjs';
import { delay, zip} from 'rxjs/operators';

const array = [1, 2, 3, 4, 5];

from(array)
 .pipe(
   zip(interval(1000), (a, b) => a),
 )
 .subscribe(console.log);
```

## 将 `interval` 作为Observable源
```js
import { interval, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';

const array = [1, 2, 3, 4, 5];

interval(1000)
  .pipe(
    take(array.length),
    map(i => array[i])
  )
  .subscribe(console.log);
```
