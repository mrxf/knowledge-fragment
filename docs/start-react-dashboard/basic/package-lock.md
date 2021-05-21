# package-lock.json文件

> 在 `npm install`时候生成的一份文件，用以记录当前状态下实际安装的各个npm package的**包来源**和**版本号**。

这样，协作开发的人员，在执行安装命令时`npm install`，可以保证与当前install时的包一致。

在之前介绍中，我们了解到可以使用`registry=https://registry.npm.taobao.org/` 来配置包下载源，那么如果package-lock.json文件，与我们配置的`registry`不一致的情况下，会优先使用哪个呢？

我们做一个如下测试：


## 首先第一次安装包


```bash
npm i lodash --registry=https://registry.npm.taobao.org/
```
会发现`package-lock.json`文件，将resolved写为taobao.org的镜像

```json
{
  "dependencies": {
    "lodash": {
      "version": "4.17.20",
      "resolved": "https://registry.npm.taobao.org/lodash/download/lodash-4.17.20.tgz?cache=0&sync_timestamp=1597336147792&other_urls=https%3A%2F%2Fregistry.npm.taobao.org%2Flodash%2Fdownload%2Flodash-4.17.20.tgz",
      "integrity": "sha1-tEqbYpe8tpjxxRo1RaKzs2jVnFI="
    }
  }
}


```
### 测试删除package-lock.json文件再安装

删除lock文件以及`node_modules`文件夹，使用一个无法连通的的registry地址执行安装命令，会发现，无法正确安装。

![](https://cdn.thisjs.com/blog_images/20201223111358.png)

### 测试使用不同registry的情况下安装

不删除`package-lock.json`文件，继续使用无法连通的registry配置地址，依旧可以安装成功。

![](https://cdn.thisjs.com/blog_images/20201223110431.png)

同时`package-lock.json`文件没有更新resolved信息。

> **注意：** 在只删除`package-lock.json`，而不删除`node_modules`文件夹的情况下，会发现，使用无法连通的registry依旧可以安装成功。

查看`node_modules`文件夹中包的package.json文件，可以看到，有对应的下载地址配置信息。

```json
{
  "_resolved": "https://registry.npm.taobao.org/lodash/download/lodash-4.17.20.tgz?cache=0&sync_timestamp=1597336147792&other_urls=https%3A%2F%2Fregistry.npm.taobao.org%2Flodash%2Fdownload%2Flodash-4.17.20.tgz"
}
```
依旧可以正确的从原来的地址中下载成功。

### 测试结论

* 在有`package-lock.json`锁定文件的时候，包来源优先使用lock文件，不受registry的影响。

* 如果目前的包有错误，重新安装包的时候，可以同时删除lock文件和`node_modules`文件夹，因为`node_modules`文件夹也会记录包下载地址。

## 那么版本号呢？

如果我们修改了package.json中的版本号，再执行install，会是什么样的情况呢？

可以参阅该文章：[npm install package-lock.json 的更新策略
](https://juejin.cn/post/6844903903193104398)

### 不同 npm 版本下 npm i 的规则


* npm 5.0.x 版本：不管 package.json 中依赖是否有更新，npm i 都会根据 package-lock.json 下载。针对这种安装策略，有人提出了这个 issue -  #16866 ，然后就演变成了 5.1.0 版本后的规则。


* 5.1.0 版本后：当 package.json 中的依赖项有新版本时，npm install 会无视 package-lock.json 去下载新版本的依赖项并且更新 package-lock.json。针对这种安装策略，又有人提出了一个 issue - #17979 ，参考 npm 贡献者 iarna 的评论，得出 5.4.2 版本后的规则。


* 5.4.2 版本后：


  1. 如果只有一个 package.json 文件，运行 npm i 会根据它生成一个 package-lock.json 文件。


  2. 如果 package.json 的 semver-range version 和 package-lock.json 中版本兼容，即使此时 package.json 中有新的版本，执行 npm i 也还是会根据 package-lock.json 下载


  3. 如果手动修改了 package.json 的 version ranges，且和 package-lock.json 中版本不兼容，那么执行 npm i 时 package-lock.json 将会更新到兼容 package.json 的版本
