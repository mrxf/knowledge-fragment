# 目录分配

> 永远不要停止移动文件到合适的目录

目前所需的功能并不多，所以暂时列出以下几个目录，如果有需要可以随时创建和移动，只有适合开发的才是最合适的。

![](/img/start-dashboard/set-menu.png);

解释一下src目录下的分配：

```
├── @types                // Typescript 声明文件
├── assets                // css等资源文件
├── components            // 公共组件
├── constants             // 静态变量/配置
├── index.css
├── index.tsx
├── layout                // 页面布局
│   ├── app
│   │   ├── App.less
│   │   ├── App.test.tsx
│   │   ├── App.tsx
│   │   └── logo.svg
│   ├── aside
│   └── header
├── pages                  // 项目的页面
├── react-app-env.d.ts
├── reportWebVitals.ts
├── setupTests.ts
└── utils                  // 工具库
```