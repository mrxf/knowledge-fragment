# 路由配置

## 安装

```bash
npm install @types/react-router-dom react-router-dom
```

安装完成之后，便可以开始使用路由进行切换页面了。参考[官方文档](https://reactrouter.com/web/guides/quick-start)指引，修改app.tsx文件，增加以下配置内容：

```tsx
<div className='App'>
  <nav>
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/userlist'>用户列表</Link>
      </li>
      <li>
        <Link to='/userinfo'>用户信息</Link>
      </li>
    </ul>
  </nav>
  <Switch>
    <Route path='/userlist'>
      <UserList />
    </Route>
    <Route path='/userinfo'>
      <UserInfo />
    </Route>
    <Route exact path='/'>
      <Home />
    </Route>
  </Switch>
</div>;
```

![](/img/start-dashboard/router-start.png)

打开页面即可，看到导航跳转的内容。这里，我们使用`Switch`路由，来保证每次只展示一个匹配到的路由。`Switch`的特点是，匹配到第一个符合的路由后，即停止匹配。

使用exact给path='/'的路由，在改配置中没有效果，具体区别，可以参照该文档。

> 将通配符路由放在最后，即是因为Swicth在匹配到第一个符合条件的，即停止匹配，以防止永远显示通配符路由。

## 嵌套路由

> 一个中后台项目的侧边栏和header可能会是相同的，因此可以嵌套一个二级路由

使用routeCompnentProps来获取match.path信息即可。

```tsx
<Switch>
    <Route exact path={ match.path } children={<Redirect to={`${ match.path }/userinfo`} />} />
    <Route path={`${match.path}/userinfo`}>
        <UserInfo />
    </Route>
    <Route path={`${match.path}/userlist`}>
        <UserList />
    </Route>
    <Route path={`${match.path}/**`}>
        <NotFound />
    </Route>
</Switch>
```

## 路由配置文件

但是，将路由配置都放在 app.tsx 中会让该文件变得难以理解。因此我们将该配置移到一个独立的文件中。

```
pages
├── home
├── routes.tsx    // 路由配置文件
└── users
```

新增路由配置内容，同时更新app.tsx，遍历生成路由。

```tsx
// routes.tsx
import React from "react";
import { Redirect, RouteProps } from "react-router-dom";
import Home from "./home/home";
import UserInfo from "./users/user-info";
import UserList from "./users/user-list";

export const routers: RouteProps[] = [
  {
    path: "/",
    exact: true,
    children: <Redirect to="/home" />,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/userlist",
    component: UserList,
  },
  {
    path: "/userinfo",
    component: UserInfo,
  },
];
```

```tsx
// app.tsx
<Switch>
  {routers.map((router) => (
    <Route {...router} key={router.path as string} />
  ))}
</Switch>
```
