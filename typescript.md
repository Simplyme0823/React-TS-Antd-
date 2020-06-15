## interface 与 type 的区别

### 相同点

1. 二者都可扩展，但是扩展的方式不同

```javascript
/**
 * interfcae扩展interface
 */
interface a {
  name: string;
}
// 有点抽象类的感觉
interface b extends a {
  age: number;
}

/**
 * type扩展type
 */
type c = {
  name: string,
};

type d = c & { age: number };

/**
 * interfcae扩展type
 */
interface a {
  name: string;
}
// 有点抽象类的感觉
interface d extends c {
  age: number;
}

/**
 * type扩展interface
 */

type e = a & {
  age: number,
};
```

### 不同点

#### type 鼠标悬停在类型别名 aliased 上显示的是对象字面量类型

1. 类型别名: 可以给一个类型起新名称(类型别名不可以被 extends/implements)

```typescript
type Name = string; //原始值
type NameResolver = () => string;
interface test {
  name: string;
}
type NameOrResover = Name | NameResolver | interface; // 联合类型 包括泛型
type NameList = [Name, NameResolver, interface]; // 数组
type Container<T> = { value: T }; //泛型
type Tree<T> = {
  //在属性中引用自身
  value: T;
  left: Tree<T>;
  right: Tree<T>;
};
```

2. typeof 获取实例的类型进行赋值

```typescript
let div = document.createElement("div");
type test = typeof div;
```

#### interface 接口可以合并

```typescript
interface User {
  id: number;
}
interface User {
  name: string;
}

// User接口{
//     id:number
//         name:string
// }
```
