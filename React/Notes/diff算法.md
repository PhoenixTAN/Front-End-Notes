# Reconciliation -- Diffing Algorithm 

React provides a declarative API so that you don’t have to worry about exactly what changes on every update. This makes writing applications a lot easier.

## Motivation

When you use React, at a single point in time you can think of the render() function as **creating a tree of React elements**. On the next state or props update, that render() function will return **a different tree of React elements**. React then needs to figure out how to efficiently update the UI to match the most recent tree.

在某个时间节点,你可以把render()看作是创建了一棵virtual dom tree，re-render()看作是重新建造了一棵virtual dom tree.然后React会负责看看怎么最高效地得到这颗新的树。

There are some generic solutions to this algorithmic problem of generating the minimum number of operations to transform one tree into another. However, the state of the art algorithms have a complexity in the order of O(n^3) where n is the number of elements in the tree.

有些通用方法可以计算出把一棵树转化成另一棵树的最少的操作次数，但时间复杂度高达N的三次方。

于是 React 在以下两个假设的基础之上提出了一套 O(n) 的启发式算法：

1. 两个不同类型的元素会产生出不同的树；
2. 开发者可以通过 **key prop** 来暗示哪些子元素在不同的渲染下能保持稳定；

## Diffing 算法

### 对比不同类型的元素
1. 当对比两颗树时，React 首先比较两棵树的根节点。不同类型的根节点元素会有不同的形态。
2. 当拆卸一棵树时，对应的 DOM 节点也会被销毁。组件实例将执行 `componentWillUnmount()`方法。
3. 当建立一棵新的树时，对应的 DOM 节点会被创建以及插入到 DOM 中。组件实例将执行`componentWillMount()`方法，紧接着`componentDidMount()`方法。所有跟之前的树所关联的 state 也会被销毁。
4. 在根节点以下的组件也会被卸载，它们的状态会被销毁。

### 对比同一类型的元素
当对比两个相同类型的 React 元素时，React 会保留 DOM 节点，仅比对及更新有改变的属性。

### 对比同类型的组件元素
当一个组件更新时，组件实例保持不变，这样 state 在跨越不同的渲染时保持一致。React 将更新该组件实例的 props 以跟最新的元素保持一致，并且调用该实例的`componentWillReceiveProps()`和`componentWillUpdate()`方法。

下一步，调用 render() 方法，diff 算法将在之前的结果以及新的结果中进行递归。

### 对子节点进行递归
在默认条件下，当递归 DOM 节点的子元素时，React 会同时遍历两个子元素的列表；当产生差异时，生成一个 mutation。

在子元素列表末尾新增元素时，更新开销比较小。
比如:
```html
// 插入前
<ul>
  <li>first</li>
  <li>second</li>
</ul>

// 插入后
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

React 会先匹配两个 \<li>first\</li> 对应的树，然后匹配第二个元素 \<li>second\</li> 对应的树，最后插入第三个元素的 \<li>third\</li> 树。

如果只是简单的将新增元素插入到表头，那么更新开销会比较大。**会重建每一个子元素**。

为了解决以上问题，React 支持 key 属性。当子元素拥有 key 时，React 使用 key 来匹配原有树上的子元素以及最新树上的子元素。以下例子在新增 key 之后使得之前的低效转换变得高效。

```html
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

现在 React 知道只有带着 '2014' key 的元素是新元素，带着 '2015' 以及 '2016' key 的元素仅仅移动了。

## 为什么virtual dom比real dom快？

https://juejin.im/post/5d3ff99fe51d4561fb04beea

https://juejin.im/post/5d1492bbe51d4556bc066fb5



