# typescript 类型转换使用笔记

## 使用联合类型作为对象的key

有时候我们需要使用全部的联合类型，作为一个新对象可使用的key的值，这时候，可以这样。

```ts
type keys = "name" | "age" | "gender";
type User = {
  [key in keys]: string;
}
```

## 以其他interface的key作为新类型的key

一般来说，我们使用extends来实现，但是如果需要重写原来的类型，可以直接这样写。

```ts
interface User {
  name: string;
  age: number;
  gender: number;
}
type Student = {
  [key in keyof User]: string;
}
```

## 使用Interface的key作为联合类型

同时，我们可能会使用interface的key获得一个联合类型。

```ts
interface User {
  name: string;
  age: number;
  gender: number;
}
// 一般用于函数修改类型的值
type userKeys = keyof User;
```

应用场景举例：

为了保证传递的key一定是对象含有的值，因此可以使用该方法

```ts
const getUserInfo = (key: userKeys) => {
  return user[key];
}
```