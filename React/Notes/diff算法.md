# Reconciliation -- Diffing Algorithm 

React provides a declarative API so that you don’t have to worry about exactly what changes on every update. This makes writing applications a lot easier.

## Motivation

When you use React, at a single point in time you can think of the render() function as **creating a tree of React elements**. On the next state or props update, that render() function will return **a different tree of React elements**. React then needs to figure out how to efficiently update the UI to match the most recent tree.

在某个时间节点,你可以把render()看作是创建了一棵virtual dom tree，re-render()看作是重新建造了一棵virtual dom tree.然后React会负责看看怎么最高效地得到这颗新的树。

There are some generic solutions to this algorithmic problem of generating the minimum number of operations to transform one tree into another. However, the state of the art algorithms have a complexity in the order of O(n^3) where n is the number of elements in the tree.

有些通用方法可以计算出把一棵树转化成另一棵树的最少的操作次数，但时间复杂度高达N的三次方。


## 为什么virtual dom比real dom快？

https://juejin.im/post/5d3ff99fe51d4561fb04beea

https://juejin.im/post/5d1492bbe51d4556bc066fb5
