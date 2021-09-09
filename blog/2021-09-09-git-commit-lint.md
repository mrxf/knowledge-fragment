---
slug: git-commit-lit
title: 规范git commit提交信息
author: 张树源
author_title: 前端工程师
author_url: https://github.com/mrxf
author_image_url: https://cdn.thisjs.com/cloud-yun/2021/05/07/7uYVT8i2_12392733.jpeg
tags: [git, lint]
---

![](https://cdn.thisjs.com/blog_images/20210909154033.png)

看到如上git提交信息的时候，可能每个人都会抓狂，因为你根本不知道这段代码提交什么内容，甚至不知道写commit的意义是什么。

<!--truncate-->

一个好的git提交记录可以让人更好的理解项目和代码，无论是整个项目的演进，还是某一段代码改动的原因，都可以通过提交记录查阅到。因此，清晰的git commit内容，则是必不可少的一部分。

## 基本规范

git commit的主要目的是为了向阅读者更好的表述改动信息，因此可以是一段精简的介绍，也可以是一篇详细的解决思路。例如：

* 修改了http模块，当服务器返回50x错误时，做出相应的错误提示
* 更新了readme，增加了Jenkins自动化部署的介绍信息
* 通过useReducer移除了useEffect依赖，修复了循环依赖导致重复请求的问题
* 修复了返回数据为空时报错问题，以及侧边栏点击无法关闭等问题

这样基本上就可以向阅读者传递了每个改动点的内容。但是以上提交内容，缺乏规范，可能每个人写的格式都不同，读起来就会比较吃力，因此需要合适的规范。

## Angular 规范介绍

Angular的[git commit规范指导](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)是被大众认可的一种规范。

### 格式

```
<type>([scope]): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

简单翻译一下如下：

```
<类型>([可选的作用域]): <描述>
# - 类型: feat, fix, docs, style, refactor, test, chore...
# - 作用域: 可以为空 (一个短语，表示代码库中的一个组件/部分)
# - 描述: 一个简短描述，关于本次提交的代码修改
<空行>
<详细描述>
<空行>
<注脚>
```

### 规范

按照此规范，之前的提交信息可以更新为：

* feat(http): 当服务器返回50x错误时，做出相应的错误提示
* docs(readme): 增加Jenkins自动化部署的介绍信息
* fix: 修复循环依赖导致重复请求的问题

  通过useReducer移除了useEffect依赖
* fix(user): 返回数据为空时报错问题
* fix(component): 侧边栏点击无法关闭

这里可以看到，我们将 **修复了返回数据为空时报错问题，以及侧边栏点击无法关闭等问题** 拆为了2个提交信息，这涉及到**原子性提交（atomic commits）**。

## 原子性提交

> 原子性提交就是要求我们当代码变动需要创建提交时，这个提交应该尽可能的小量，并且包含一个不可分割的特性（feature）、修复（fix）或优化（improved）。

### 优点

1. 利于别人CodeReview代码，增量查看，了解代码改动过程
2. 更容易回滚与Cherry Pick，减少副作用

### 实践

为了不将其他改动文件混入本次commit中，可以将每次改动的内容add到暂存，然后在改动完成之后，进行commit。

如果喜欢先统一开发完成，然后单独提交，可以通过以下方式实现：

1. 根据不同需求单独add 文件
2. 只提交部分变动代码

### git 提交部分变动内容

通过`git add －－patch`或者`git add -p`来启用交互式命令行，来只提交部分变动代码内容。会展示以下交互命令界面：

```diff
diff --git a/src/css/custom.css b/src/css/custom.css
index 24fc527..8f79ee9 100644
--- a/src/css/custom.css
+++ b/src/css/custom.css
@@ -40,6 +40,10 @@
   font-size: var(--ifm-h1-font-size) !important;
 }
 
+.age {
+  background-color: red;
+}
+
 .markdown > h2 {
   font-size: var(--ifm-h2-font-size);
 }
Stage this hunk [y,n,q,a,d,j,J,g,/,e,?]? 
```

输入以下命令来对当前区块进行操作：

```
y - 暂存此区块
n - 不暂存此区块
q - 退出；不暂存包括此块在内的剩余的区块
a - 暂存此块与此文件后面所有的区块
d - 不暂存此块与此文件后面所有的 区块
g - 选择并跳转至一个区块
/ - 搜索与给定正则表达示匹配的区块
j - 暂不决定，转至下一个未决定的区块
J - 暂不决定，转至一个区块
k - 暂不决定，转至上一个未决定的区块
K - 暂不决定，转至上一个区块
s - 将当前的区块分割成多个较小的区块
e - 手动编辑当前的区块
? - 输出帮助
```

:::tip

在使用该命令遇到问题时，可以尝试使用`git -c 'interactive.diffFilter=less' add -p`来实现 [#296](https://github.com/so-fancy/diff-so-fancy/issues/296)

:::

## 工具配置

### git commit 提示信息

git commit 默认的提示信息为增删的代码内容，我们可以通过配置，来增加一些提示信息，帮助我们记忆。新增一个.gitmessage文件。

```shell
vim ~/.gitmessage
```

加入以下内容：

```

# commit格式: <类型>([可选的作用域]): <描述>
# - 类型: feat, fix, docs, style, refactor, test, chore
# - 作用域: 可以为空 (一个短语，表示代码库中的一个组件/部分)
# - 描述: 一个简短描述，关于本次提交的代码修改
# 例如 feat(http): 新增对服务器错误的全局处理
#
```

修改全局git配置信息，添加模板地址

```shell
vim ~/.gitconfig
```

```shell
[commit]
  template = ~/.gitmessage
```

再次提交就可以展示提示了。

## 相关阅读

* [Commitizen - 一个交互式commit生成工具](http://commitizen.github.io/cz-cli/)
* [commitlint - 审查commit格式工具](https://commitlint.js.org/#/)
