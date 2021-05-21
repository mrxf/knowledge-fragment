# 配置化菜单

> 菜单与路由的耦合度比较高，因此可以使用同一个文件生成

一个常见的菜单可能为以下两种情况

## 顶部导航
![](https://cdn.thisjs.com/blog_images/20201222105549.png)


## 侧边导航
![](https://cdn.thisjs.com/blog_images/20201222105656.png)

这两种导航效果，一般组件库都实现了**Menu**目录组件，基于此，我们便可以遍历配置文件，动态生成。

可以通过查看*Antd*目录配置文件所需的配置信息，来确定我们的**路由目录**配置文件需要提供哪些信息。

> **注意：** Antd中侧边布局与上下布局的Menu略有区别，我们先以**侧边布局**为例

```jsx
<Layout>
  <Sider
    width={200}
    collapsible
    collapsed={collapsed}
    onCollapse={setCollapsed}
  >
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
    >
      <Menu.Item key="nav1" icon={<UserSwitchOutlined />}>nav 1</Menu.Item>
      <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
        <Menu.Item key="5">option5</Menu.Item>
        <Menu.Item key="6">option6</Menu.Item>
        <Menu.Item key="7">option7</Menu.Item>
        <Menu.Item key="8">option8</Menu.Item>
      </SubMenu>
    </Menu>
  </Sider>
  <Layout>
    <Breadcrumb/>
    <Content />
  </Layout>
</Layout>
```

以上为一个基本的可以展开的侧边栏导航的内容，我们自上而下查看可配置的内容：

## `<Sider>`
* collapsible
* collapsed
* onCollapse

侧边栏收起状态，默认我们是允许侧边栏可收起/展开，因此需要有一组控制侧边栏展开与收起的按钮组。

我们可以省心一些，在当前组件中添加按钮组，将状态放在该组件中，然后使用useState来控制状态。效果如下。

![](https://cdn.thisjs.com/blog_images/20201222111308.png)

> **提示：** 如果你需要将控制按钮放在其他位置，比如`<Title />`中，那么可能需要使用全局状态管理。

## `<Menu>`

* mode 侧边导航栏固定值 **inline**
* defaultSelectedKeys
* defaultOpenKeys

下面两个参数主要处理，在页面第一次打开后，能够自动展开对应的侧边栏，以及选中正确的侧边栏。

> **注意：**我们可能会遇到path配置有参数的情况，比如 `user/:id`这样的路径匹配的问题。这个可以通过`path-to-regexp`包进行处理。

使用`defaultXXX`的值，是将控制权交给Menu组件的非受控组件的形式，这样只有在页面加载的时候，会进行初始化一次。之后**只有点击对应的侧边栏时**，才会更新展开的栏。但是有一种情况是，我们在应用内使用<Redirect />进行跳转等操作时，**不会触发侧边栏的展开与关闭**，因此该案例中，我们不能使用非受控组件，应该采用受控组件的形式。

```tsx
// 要使用react router中的history获取pathname值，否则不会更新
const { pathname } = history.location;
const [openKeys, setOpenKeys] = useState<string[]>([]); // 展开的列表

useEffect(() => {
  // 路径更新时，同时更新展开的二级目录
  const parentItem = getParentByPath(pathname, routeItems);
  const parentKeys = parentItem ? [parentItem.path] : [];
  // 更新展开时，将之前展开的路径也一并合并进来，防止出现只展开一个的情况
  // 使用去重的目的是，防止出现重复展开路径的情况，导致折叠起来的时候，需要两次的情况
  setOpenKeys((prevKeys) => Array.from(new Set(prevKeys.concat(parentKeys))));
}, [pathname, routeItems]);

<Menu
  selectedKeys={[pathname]}
  openKeys={openKeys}
  onOpenChange={(keys) => setOpenKeys(keys as string[])}
>
</Menu>
```

展开父级目录的问题就修复了，这样无论是用户点击展开父级目录，还是`history.location.pathname`改变，都可以正确的更新`openKeys`展开目录了。

> **注意：**这里并没有设置`selectedKeys`的onChange事件，因为不需要绑定事件，`selectedKeys`是与`pathname`耦合的，点击栏目之后，一定会跳转，pathname一定会改变，该值也会跟随改变。

剩下的，便是遍历**路由+侧边栏配置**信息，生成侧边栏内容了。我们根据需要的信息暂时定义需要以下内容。

```typescript
export interface IRouteItem extends RouteProps {
    /** 路由在侧边栏的名称 */
    name: string;
    /** 路由地址 */
    path: string;
    /** icon图标组件 */
    icon?: ReactNode;
    /**子路由信息，子路由配置信息不允许带有子路由 */
    routes?: Omit<IRouteItem, "routes">[];
    /** 是否在侧边栏中展示 */
    hide?: boolean;
}
```

在`RouteProps`参数中，其实是含有path参数的，但是该参数的属性类型是`path?: string | string[];`，其中`string[]`不利于我们遍历生成单一链接的侧边栏，因此override为`string`类型。

这样，一个普通的路由配置信息示例如下：

```tsx
export const routeItems: IRouteItem[] = [
  {
    path: "/",
    exact: true,
    hide: true,    // 隐藏不需要在侧边栏展示的
    name: "首页",
    children: <Redirect to="/tables/basic" />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <CloudServerOutlined />,
    component: DashboardComponent,
  },
  {
    path: "/tables",
    name: "表格",
    icon: <TableOutlined />,
    routes: [
      {
        name: "基础表格",
        path: "/tables/basic",
        icon: <InsertRowAboveOutlined />,
        component: BasicTableComponent,
      },
    ],
  },
  {
    hide: true,
    path: "/**",
    component: NotFound,
    name: "404页面未找到",
  },
];
```

我们遍历该数组，将需要展示的组件以下两种情况分别展示即可：

* 有子路由，且子路由`hide: false`的元素数量大于0的，使用`<SubMenu />`组件
* 没有子路由，且`hide: false`的元素，使用`<Menu.Item />`组件

```tsx

const getMenuItem = (item: IRouteItem) => {
  // 隐藏的情况
  if (item.hide) {
    return undefined;
  }
  return (
    <Menu.Item key={item.path}>
      {/* 点击目录元素，直接跳转 */}
      <NavLink to={item.path}>
        {item.icon}
        <span className="nav-text">{item.name}</span>
      </NavLink>
    </Menu.Item>
  );
};


{routeItems.map((menu) => {
  // 隐藏一级侧边栏的情况
  if (menu.hide) {
    return undefined;
  } else if (
    menu.routes &&
    // 子目录中至少有一个是展示的
    menu.routes.filter((v) => !v.hide).length > 0
  ) {
    return (
      <SubMenu
        key={menu.path}
        title={
          <>
            {menu.icon}
            <span className="nav-text">{menu.name}</span>
          </>
        }
      >
        {menu?.routes.map((v) => getMenuItem(v))}
      </SubMenu>
    );
  }
  return getMenuItem(menu);
})}
```

以上，我们便根据**配置**信息，生成了侧边栏信息。

但是，路由配置信息，并不是一个标准的react-router配置文件，因此我们仍需要将该文件拍平为一维数组。