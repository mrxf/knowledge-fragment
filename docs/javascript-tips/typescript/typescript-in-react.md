# React 中使用 TS 的技巧

在 React 中遇到一些使用 TypeScript 处理的情况，以下作为记录分享

## 获取一个 Component 的 Props 类型

当一个 Component 未导出其 Props 类型，但是我们仍然需要继承或者使用该类型，为了减少重复定义，我们可以借助 React 的 TS 工具来获取 Component 的 Props 类型。

### React.ComponentProps

React 提供了方便获取 ComponentProps 的工具

```tsx
type ViewProps = React.ComponentProps<typeof View>;

type InputProps = React.ComponentProps<"input">;
```

### Class Component 可以直接获取其 Props 属性

```tsx
type ViewProps = View["props"];
```

### 参考内容：[Typescript React: Access component property types](https://stackoverflow.com/questions/43230765/typescript-react-access-component-property-types)

### 拓展阅读：如何使用TS获取function的参数