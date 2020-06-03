# Arrow function expressions
An arrow function expression is a syntactically compact alternative to a regular function expression, although without its own bindings to the this, arguments, super, or new.target keywords. Arrow function expressions are ill suited as methods, and they cannot be used as constructors.

## Demo
```javascript
const materials = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

console.log(materials.map(material => material.length));
// expected output: Array [8, 6, 7, 9]
```

The **map()** method creates a new array populated with the results of calling a provided function on every element in the calling array.
```javascript
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```

## Syntax

### Basic syntax
```javascript
(param1, param2, …, paramN) => { statements } 
(param1, param2, …, paramN) => expression
// equivalent to: => { return expression; }

// Parentheses are optional when there's only one parameter name:
(singleParam) => { statements }
singleParam => { statements }

// The parameter list for a function with no parameters should be written with a pair of parentheses.
() => { statements }
```

### Advanced syntax
```javascript
// Parenthesize the body of a function to return an object literal expression:
params => ({foo: bar})

// Rest parameters and default parameters are supported
(param1, param2, ...rest) => { statements }
(param1 = defaultValue1, param2, …, paramN = defaultValueN) => { 
statements }

// Destructuring within the parameter list is also supported
var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
f(); // 6
```


## Shorter functions
```javascript
var elements = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

// This statement returns the array: [8, 6, 7, 9]
elements.map(function(element) {
  return element.length;
});

// The regular function above can be written as the arrow function below
// 最基本的箭头的用法：省掉function关键字
elements.map((element) => {
  return element.length;
}); // [8, 6, 7, 9]

// When there is only one parameter, we can remove the surrounding parentheses
// 只有一个参数，我们可以把element旁边的括号生气
elements.map(element => {
  return element.length;
}); // [8, 6, 7, 9]

// When the only statement in an arrow function is `return`, we can remove `return` and remove
// the surrounding curly brackets
// 如果函数只有一句return，我们可以把函数体也省了
elements.map(element => element.length); // [8, 6, 7, 9]

// In this case, because we only need the length property, we can use destructuring parameter:
// Notice that the `length` corresponds to the property we want to get whereas the
// obviously non-special `lengthFooBArX` is just the name of a variable which can be changed
// to any valid variable name you want
// 我们只需要长度length属性
elements.map(({ length: lengthFooBArX }) => lengthFooBArX); // [8, 6, 7, 9]

// This destructuring parameter assignment can also be written as seen below. However, note that in
// this example we are not assigning `length` value to the made up property. Instead, the literal name
// itself of the variable `length` is used as the property we want to retrieve from the object.
// 这个很像Destructuring Assignment里面的
// Unpacking fields from objects passed as function parameter
elements.map(({ length }) => length); // [8, 6, 7, 9] 
```

## No separate this
没懂 什么是strict mode
这里！ No more issue with the "this" keyword.
```javascript
function Person() {
  // The Person() constructor defines `this` as an instance of itself.
  this.age = 0;
	document.write(this.age);
  setInterval(function growUp() {
    // In non-strict mode, the growUp() function defines `this`
    // as the global object (because it's where growUp() is executed.), 
    // which is different from the `this`
    // defined by the Person() constructor.
    this.age++;
    document.write(this.age);   // NaN
  }, 1000);
}

var p = new Person();
```

```javascript
function Person() {
  var that = this;
  that.age = 0;
	document.write(that.age);
  setInterval(function growUp() {
    // The callback refers to the `that` variable of which
    // the value is the expected object.
    that.age++;
    document.write(that.age);
  }, 1000);
}

var p = new Person();
```

Arrow Function
An arrow function does not have its own this. The this value of the enclosing lexical scope is used; arrow functions follow the normal variable lookup rules. **So while searching for this which is not present in the current scope, an arrow function ends up finding the this from its enclosing scope.**

Thus, in the following code, the this within the function that is passed to setInterval has the same value as the this in the lexically enclosing function:

```javascript
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| properly refers to the Person object
  }, 1000);
}

var p = new Person();
```

```javascript
var f = () => { return this; };
f() === window; // or the global object

document.write(f()===window);  // True
```

## Invoked through call or apply
Since arrow functions do not have their own this, the methods call() and apply() can only pass in parameters. Any this argument is ignored.

这个没懂：
```javascript
var adder = {
  base: 1,

  add: function(a) {
    var f = v => v + this.base;
    // 第一个v是函数的参数，
    // 第二个v是表示 return v+this.base;
    return f(a);
  },

  addThruCall: function(a) {
    var f = v => v + this.base;
    var b = {
      base: 2
    };

    return f.call(b, a);
  }
};

console.log(adder.add(1));         // This would log 2
console.log(adder.addThruCall(1)); // This would log 2 still
```

The call() method calls a function with a given this value and arguments provided individually.
```javascript
function Product(name, price) {
  this.name = name;
  this.price = price;
  console.log(this.name);	// cheese
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);	// cheese
// expected output: "cheese"
```

## No binding of arguments
Arrow functions do not have their own arguments object. Thus, in this example, arguments is simply a reference to the arguments of the enclosing scope:

这里没懂：
```javascript
var arguments = [1, 2, 3];
var arr = () => arguments[0];

arr(); // 1

function foo(n) {
  var f = () => arguments[0] + n; // foo's implicit arguments binding. arguments[0] is n
  return f();
}

foo(3); // 6
```

In most cases, using rest parameters is a good alternative to using an arguments object.
```javascript
function foo(n) { 
  var f = (...args) => args[0] + n;
  return f(10); 
}

foo(1); // 11
```

## Arrow functions used as methods

```javascript
'use strict';

var obj = { // does not create a new scope
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log(this.i, this);
  }
}

obj.b(); // prints undefined, Window {...} (or the global object)
obj.c(); // prints 10, Object {...}
```

## Arrow functions cannot be used as a constructor
```javascript
var Foo = () => {};
var foo = new Foo(); // TypeError: Foo is not a constructor
```

## Function body
```javascript
var func = x => x * x;                  
// concise body syntax, implied "return"

var func = (x, y) => { return x + y; }; 
// with block body, explicit "return" needed
```

## Return object literals
Keep in mind that returning object literals using the concise body syntax params => {object:literal} will not work as expected.

```javascript
var func = () => { foo: 1 };
// Calling func() returns undefined!

var func = () => { foo: function() {} };
// SyntaxError: function statement requires a name
```
You must wrap the object literal in parentheses:
```javascript
var func = () => ({ foo: 1 });
```

## Line breaks
An arrow function cannot contain a line break between its parameters and its arrow.

```javascript
var func = (a, b, c)
  => 1;
// SyntaxError: expected expression, got '=>'
```

However, this can be amended by putting the line break after the arrow or using parentheses/braces as seen below to ensure that the code stays pretty and fluffy. You can also put line breaks between arguments.

```javascript
var func = (a, b, c) => (
  1
);

var func = (a, b, c) => {
  return 1
};

var func = (
  a,
  b,
  c
) => 1;
 
// no SyntaxError thrown
```

## Parsing order
```javascript
let callback;

callback = callback || function() {}; // ok

callback = callback || () => {};
// SyntaxError: invalid arrow-function arguments

callback = callback || (() => {});    // ok
```

## Basic usage
```javascript
// An empty arrow function returns undefined
let empty = () => {};

(() => 'foobar')(); 
// Returns "foobar"
// (this is an Immediately Invoked Function Expression)

var simple = a => a > 15 ? 15 : a; 
simple(16); // 15
simple(10); // 10

let max = (a, b) => a > b ? a : b;

// Easy array filtering, mapping, ...

var arr = [5, 6, 13, 0, 1, 18, 23];

var sum = arr.reduce((a, b) => a + b);
// 66

var even = arr.filter(v => v % 2 == 0); 
// [6, 0, 18]

var double = arr.map(v => v * 2);
// [10, 12, 26, 0, 2, 36, 46]

// More concise promise chains
promise.then(a => {
  // ...
}).then(b => {
  // ...
});

// Parameterless arrow functions that are visually easier to parse
setTimeout( () => {
  console.log('I happen sooner');
  setTimeout( () => {
    // deeper code
    console.log('I happen later');
  }, 1);
}, 1);
```
