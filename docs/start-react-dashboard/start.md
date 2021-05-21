# 使用官方模板初始化

选择官方模板使用 TypeScript 的模板

```bash
$ npx create-react-app my-app --template typescript
```

> create-react-app TypeScript 模板地址为 [cra-template-typescript](https://github.com/facebook/create-react-app/tree/master/packages/cra-template-typescript) ， 可由此查看与 js 版本的区别

安装完成之后就可以直接运行了。

```
$ npm start
```

## FAQ

### npm start 后 TypeScript 提示 react 导出类型为 any 的报错

这是因为使用官方模板没有使用最新的`@types/react`导致的，可以直接更新到 latest 版本即可。

![](/img/start-dashboard/types-react.jpg)

```bash
$ npm i @types/react@latest @types/react-dom@latest typescript@latest
```

### npm start 可以正常运行项目，但是 vscode 提示，配置错误的问题。

出现以下错误主要是因为编辑器的 TypeScript 版本不是最新版或者与安装的不匹配导致的。

![](/img/start-dashboard/vscode-error.jpg)
![](/img/start-dashboard/vscode-error-2.jpg)

可以通过修改编辑器的 TypeScript 版本与 dev 版本同步来修复这个问题。(需要首先打开一个 ts 文件，才会出现该配置)

![](/img/start-dashboard/fix-ts-error.jpg)
