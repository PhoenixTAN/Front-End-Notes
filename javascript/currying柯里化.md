# currying 函数柯里化

https://juejin.im/post/5af13664f265da0ba266efcf

```javascript
function curry(f) { 
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

function sum(a, b) {
  return a + b;
}

const curriedSum = curry(sum);
console.log( curriedSum );
console.log( curriedSum(1) );
console.log( curriedSum(1)(2) ); // 3
```

结果
```console
function(a) {
  return function(b) {
    return f(a, b);
  };
}
function(b) {
    return f(a, b);
  }
3
```

如何写递归
```javascript
function curry(func, arity = func.length) {
  return function (...args) {
    if (args.length >= arity) {
      return func(...args);
    } else {
      return curry(func.bind(this, ...args), arity - args.length);
    }
  };
}

const multiply = curry((a, b, c) => a * b * c);

console.log(multiply(2, 3)(4));
console.log(multiply(2)(3, 4));
console.log(multiply(2)(3)(4));
console.log(multiply(2, 3, 4));
// 想想怎么实现
```

`length` is a property of a function object, and indicates how many arguments the function expects, i.e. the number of formal parameters.

The bind() method creates a new function that, when called, has its `this` keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.
