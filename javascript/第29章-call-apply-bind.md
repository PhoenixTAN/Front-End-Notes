# call, apply and bind

- call() 方法在使用一个指定的 this 值和**若干个指定的参数值**的前提下调用某个函数或方法。
- apply() 方法在使用一个指定的 this 值和**an array of arguments**的前提下调用某个函数或方法。
- bind() 方法**会创建一个新函数**。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )


看几个例子。

```javascript
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);

console.log(max);
// expected output: 7

const min = Math.min.apply(null, numbers);

console.log(min);
// expected output: 2

const addition = [1, 2, 3];
numbers.push.apply(numbers, addition);
console.log(numbers);   // Array [5, 6, 2, 3, 7, 1, 2, 3]

numbers.push.call(numbers, 'call1', 'call2');
console.log(numbers);   // Array [5, 6, 2, 3, 7, 1, 2, 3, "call1", "call2"]

numbers.push.bind(numbers)('bind1', 'bind2');
console.log(numbers);   // Array [5, 6, 2, 3, 7, 1, 2, 3, "call1", "call2", "bind1", "bind2"]

// 如果call方法没有参数，或者参数为null或undefined，则等同于指向全局对象
window.color = "red";
var o = {color: "blue"};
function sayColor(){
	alert(this.color);
}
sayColor.call(this);//red
sayColor.call(window);//red
sayColor.call();//red
sayColor.call(null);//red
sayColor.call(undefined);//red
sayColor.call(o);//blue

```

## call()的模拟实现

首先看看思路是什么：
```js
// 第一版
Function.prototype.call2 = function(context) {
    // 首先要获取调用call的函数，用this可以获取
    context.fn = this;
    context.fn();
    delete context.fn;
}

// 测试一下
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call2(foo); // 1
```
正好可以打印 1 哎！是不是很开心！(～￣▽￣)～

用比较原始的方法实现：
```js
Function.prototype.call2 = function (thisArg) {
    const context = thisArg || window;
    context.func = this;
	
    const args = [];
    for(let i = 1; i < arguments.length; i++) {
      args.push(`arguments[${i}]`);
    }

    const result = eval(`context.func(${args})`);

    delete context.fn;
    return result;
}
```

用ES6方法。
```js
Function.prototype.call2 = function (thisArg, ...args) {
    const context = thisArg || window;
    context.func = this;
    const result = context.func(...args);
    delete context.func;
    return result;
}
```
1. 把自定义的call2函数，挂在Function类的原型上，使得每个函数，都能够调用call2函数。
2. 注意如果call传入null的话，默认是window.

测试一下
```js
const value = 2;

const obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call2(null); // 2

console.log(bar.call2(obj, 'kevin', 18));	// 1
```
1. context变成obj;
2. context.func指向bar;
3. 执行bar()，打印value，在bar里面找不到value属性，然后就到bar的外层也就是obj里面找value，找到value，打印`value=1`.

## apply()的模拟实现
参考网上的方法。
```js
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
```

## bind()的模拟实现

第一版，返回一个函数。
```js
Function.prototype.bind2 = function (context) {
    var self = this;
    return function () {
        return self.apply(context);
    }
}

var foo = {
    value: 1
};

function bar() {
	return this.value;
}

var bindFoo = bar.bind(foo);

console.log(bindFoo()); // 1
```

第二版，传递参数。
```js
Function.prototype.bind2 = function (context, ...args) {

    var self = this;
    // 获取bind2函数从第二个参数到最后一个参数
    // var args = Array.prototype.slice.call(arguments, 1);

    return function () {
        // 这个时候的arguments是指bind返回的函数传入的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(context, args.concat(bindArgs));
    }

}
```

