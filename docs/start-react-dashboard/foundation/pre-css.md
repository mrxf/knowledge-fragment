# css预编译工具

> 介绍常见的sass和less的引入

## Sass/Scss

sass官方已经在配置中内置sass-loader，所以直接安装即可使用。

```bash
$ npm install node-sass --save
```

> node-sass的二进制文件在国内安装较慢，推荐在.npmrc文件中，增加国内Taobao镜像。

```bash
# .npmrc文件
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

> **注意：** react-scripts@4.0.0 和最新版本的node-sass@5.0.0 无法兼容，因此可以选择降级一项

如果需要降级node-sass，可以直接如下操作：

```bash
# 移除旧版本
$ npm uninstall node-sass
# 安装5.0.0之前的最新版本
$ npm install node-sass@4.14.1
```

##  Less

CRA配置中，默认没有内置less-loader，因此需要自己配置webpack内容，通过[craco](https://github.com/gsoft-inc/craco)工具，可以帮助我们在不eject的情况下，增加webpack配置。

### 安装配置 craco

```bash
# 安装craco工具
npm install @craco/craco --save
```

配置`package.json` 文件

```json
"scripts": {
-   "start": "react-scripts start",
+   "start": "craco start",
-   "build": "react-scripts build",
+   "build": "craco build"
-   "test": "react-scripts test",
+   "test": "craco test"
}
```

增加配置文件

```
my-app
├── node_modules
├── craco.config.js  // 覆盖的配置文件
└── package.json
```

### 安装配置 craco-less

```
npm i --save craco-less
```

更新craco.config.js文件

```javascript
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [{ plugin: CracoLessPlugin }]
};
```

这个时候，即可修改css文件后缀为less即可正常使用了。

## CSS Module

react-scripts直接支持sass使用css module，直接使用即可。

接下来我们继续为其增加TypeScript代码提示，安装：

```bash
$ npm install -D typescript-plugin-css-modules
```
配置`tsconfig.json`，增加以下配置

```json
{
  "compilerOptions": {
    "plugins": [{ "name": "typescript-plugin-css-modules" }]
  }
}
```

这时候，在引入之后，就会有对应的样式名称提示了。

![](/img/start-dashboard/ts-css-module.png)

> **注意：** 如果没有更新提示，可以尝试重新import即可让TypeScript重新获取内容。

### less

基于上面的craco-less工具，我们增加对.module.less文件的支持。更新`craco.config.js`文件。

```js
// craco.config.js
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
    },
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule: function (lessRule, _context) {
          lessRule.test = /\.(module)\.(less)$/;
          lessRule.exclude = /node_modules/;

          return lessRule;
        },
        cssLoaderOptions: {
          modules: {
            localIdentName: "[local]_[hash:base64:5]",
          },
        },
      },
    },
  ],
};
```

这时候，仍需要增加对该类型文件的声明，来让TypeScript支持。在根目录下新增declaration.d.ts 声明文件（名字、位置都不重要）。

```ts
declare module "*.module.less" {
  const classes: { [className: string]: string };
  export default classes;
}
```
在tsconfig.json文件中引入该声明文件。

```json
{
  "include": ["src", "./declaration.d.ts"]
}
```

这时，即可正常使用了，但是如果需要增加TypeScript对less文件样式名的支持的话，同样可以通过安装`typescript-plugin-css-modules`来实现。

## 附录

* [craco安装与配置官方文档](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation)
* [craco-less 工具配置文档](https://github.com/DocSpring/craco-less)
* [mrmckeb/typescript-plugin-css-modules](https://github.com/mrmckeb/typescript-plugin-css-modules)
* [less css-module配置相关issue](https://github.com/DocSpring/craco-less/issues/45)
* [less css-module配置相关issue2](https://github.com/DocSpring/craco-less/issues/1)