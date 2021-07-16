# 使用ustated-next搭配useToggle时的TS泛型声明

要想让TS正确的代码提示，直接使用`createContainer(useToggle);`是无法保证代码正确提示的。因此需要传递数据类型参数，告诉TypeScript正确的提示代码。

```ts
const Toggler = createContainer<[boolean, Actions], boolean>(useToggle);
```
这时候再使用，就会有正确的代码提示了。

```ts
const [state, { setLeft }] = Toggler.useContainer();
```