# var vs let
https://www.cnblogs.com/fly_dragon/p/8669057.html

## Introduction
这是语言使用的问题。尽量都使用与主流语言相似的语法。

这个就是作用域的问题。

**块级作用域，函数作用域，全局作用域。**

**在ES6之前，我们都是用var来声明变量，而且JS只有函数作用域和全局作用域，没有块级作用域，所以{}限定不了var声明变量的访问范围。**

我的理解是，举个例子:
只有很好地理解C语言的指针和计算机组成原理的内存，才能更好地理解Java里面的对象的引用，和对象，才能更好地理解Javascript里面的闭包。

## 经典面试题
```javascript
var a = 99;            // 全局变量a
f();                   // f是函数，虽然定义在调用的后面，但是函数声明会提升到作用域的顶部。 
console.log(a);        // a=>99,  此时是全局变量的a
function f() {
  console.log(a);      // 当前的a变量是下面变量a声明提升后，默认值undefined
  var a = 10;
  console.log(a);      // a => 10
}

// 输出结果：
undefined
10
99
```
## ES6可以用let定义块级作用域变量
```javascript
{ 
  var i = 9;
} 
console.log(i);  // 9
```
ES6新增的let，可以声明块级作用域的变量。
```javascript
{ 
  let i = 9;     // i变量只在 花括号内有效！！！
} 
console.log(i);  // Uncaught ReferenceError: i is not defined
```

## let 配合for循环的独特应用
JS中的for循环体比较特殊，每次执行都是一个全新的独立的块作用域。用let声明的变量传入到 for循环体的作用域后，不会发生改变，不受外界的影响。

```javascript
for (var i = 0; i <10; i++) {  
  setTimeout(function() {  // 同步注册回调函数到 异步的 宏任务队列。
    console.log(i);        // 执行此代码时，同步代码for循环已经执行完成
  }, 0);
}
// 输出结果
10   共10个
// 这里面的知识点： JS的事件循环机制，setTimeout的机制等
```
setTimeout 实际上并没有立刻执行，而是等到整个 for 循环结束之后才执行的。但是i都是指向同一个地方，在这里i没有被重新创建，setTimeout注册的时候，指针只是指向了i，并没有实时获取i的值。

```javascript
// i虽然在全局作用域声明，但是在for循环体局部作用域中使用的时候，变量会被固定，不受外界干扰。
for (let i = 0; i < 10; i++) { 
  setTimeout(function() {
    console.log(i);    //  i 是循环体内局部作用域，不受外界影响。
  }, 0);
}
// 输出结果：
0  1  2  3  4  5  6  7  8 9
```

https://blog.rxliuli.com/p/acfc2875/

这个问题值得深究。
```javascript
for (var i = 0; i < 3; console.log('in for expression', i), i++) {
  let i
  console.log('in for block', i)
}

// 结果：
// in for block undefined
// in for expression 0
// in for block undefined
// in for expression 1
// in for block undefined
// in for expression 2
```

1. 创建 for 循环，表达式中存在 let 变量，for 将会创建一个块级作用域（ES6 let 专用）
2. 每次迭代时，会创建一个子块级作用域，迭代变量 i 也会重新生成
3. 对 i 的任何操作，都会被记住并赋值给下一次的迭代

```javascript
for( var i=0; i<=5; i++ ) {            
    setTimeout(function timer(){                
        console.log(i);         
    }, i*1000) ;       
}        
console.log(i);
```
输出结果：立即输出一个6，然后每隔一秒输出一个6；

## let没有变量提升与暂时性死区
```javascript
console.log(aicoder);    // 错误：Uncaught ReferenceError ...
let aicoder = 'aicoder.com';
// 这里就可以安全使用aicoder
```
总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

## let变量不能重复声明
var可以重复声明。
