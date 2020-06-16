
## Class-based Component

### Re-render的时机
1. state改变
2. props改变
3. 父元素重新渲染
4. forceUpdate()被调用

#### 父元素重新渲染，子元素
可以用React.memo来包裹子元素,React.memo()检查子元素的props是不是改变了，如果没有改变，就不用重新渲染。

