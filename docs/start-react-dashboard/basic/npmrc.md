# .npmrc

执行`npm`命令时，npm会从对应位置的.npmrc来获取对应的环境变量以及配置。

.npmrc配置位置有4个，可参阅[官方文档](https://docs.npmjs.com/cli/v6/configuring-npm/npmrc#files)，常用的为以下两种：

* 每个项目独有的配置 (/path/to/my/project/.npmrc)
* 每个用户独有的配置 (~/.npmrc)

每一个npm可用的配置信息，都可以写入到.npmrc文件中，来减少npm命令执行时多余的命令。比如常用的：`registry`

## 命令行命令方式

```bash
npm install --registry=https://registry.npm.taobao.org/
```

## 直接写入.npmrc文件中

```bash
registry=https://registry.npm.taobao.org/
```

这样另外一个优势是，如果写入到的是项目配置的.npmrc中，然后push到git仓库后，之后每个人、每个CI自动化机器在执行时，都会保持一致。

尤其是在使用内部私有服务器发布了一些特殊包的情况下，这样可以一直保持一致。

## 使用命令写入到用户配置

除了直接修改文件，npm可以帮助我们使用命令行来修改个人的配置文件。

```bash
npm config set registry https://registry.npm.taobao.org/
```

## 其他常见的.npmrc环境变量配置

可以根据项目所需要的包，酌情添加。

**node-sass** 二进制包下载地址镜像

```bash
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

**Electron** 二进制包下载地址

```bash
electron_mirror=https://npm.taobao.org/mirrors/electron/
```