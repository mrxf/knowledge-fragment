# 使用 typescript 如何为 useReducer 声明类型

惰性初始化一个 reducer 需要三个参数

```ts
const [state, dispatch] = useReducer(reducer, initState, init);
```

我们需要对这三个参数进行类型声明，声明方法如下：

```ts
export interface IState {
  name: string; // 姓名]
  age: number; // 年龄
}

// 声明对应的Action，这样会进行对应的代码提示
export type IStateAction =
  | {
      type: "update_name";
      value: string;
    }
  | {
      type: "reduce_age";
    };

const reducer: Reducer<IState, IStateAction> = (state, action) => {
  switch (action.type) {
    case "update_name":
      return { ...state, name: action.value };
    case "reduce_age":
      return { ...state, age: --state.age };
    default:
      return state;
  }
};

/**
 * 初始化函数
 */
const init = (initState?: Partial<IState>): IState => {
  if (!initState) {
    return initValue;
  } else {
    return { ...initValue, ...initState };
  }
};

```

`initState`的类型就是`IState`即可。这样就完成了有代码推导的typescript声明。