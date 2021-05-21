# 环境变量

> 在开发过程中，我们会有多个开发环境要切换，包括：开发、联调、测试、预上线、上线等，使用环境变量可以大大降低切换环境资源的成本。

## 官方默认支持的环境变量

create react app 默认支持以下几种：

* `.env`: Default.
* `.env.local`: Local overrides. This file is loaded for all environments except test.
* `.env.development`, `.env.test`, `.env.production`: Environment-specific settings.
* `.env.development.local`, `.env.test.local`, `.env.production.local`: Local overrides of environment-specific settings.

因此，在使用场景并不多的情况下，直接按照官方文档的介绍使用即可。

## 更多场景

在实际开发过程中，我们会遇到更多的环境变量的使用场景，因此可以使用env-cmd或者dot-env-cli 来解决这些问题。以下以env-cmd为例。

### env-cmd

首先可以全局安装或者局部安装的模式使用，为了保证所有人都可以正常使用，优先使用局部安装的模式。

```bash
$ npm install env-cmd
```

1. 创建一个新的环境变量文件，官方支持.env、json、js、rc等类型，这里使用.env的方式创建：.env.preview 作为预览环境的环境变量。
2. 配置环境变量内容 REACT_APP_API_URL=http://api-preview.example.com
3. 修改package.json的scripts：

```json
"scripts": {
    "start": "craco start",
    "start:pre": "./node_modules/.bin/env-cmd -f .env.preview craco start",
}
```

> 局部安装的env-cmd命令要使用指向目录的方式，否则会无效。[相关讨论地址#115](https://github.com/toddbluhm/env-cmd/issues/115)

现在即可使用预览环境的环境变量了

```bash
$ npm run start:pre
```

## 相关链接

* [toddbluhm/env-cmd](https://github.com/toddbluhm/env-cmd) 工具包地址
* [Customizing Environment Variables for Arbitrary Build Environments](https://create-react-app.dev/docs/deployment#customizing-environment-variables-for-arbitrary-build-environments) 官方介绍文档
