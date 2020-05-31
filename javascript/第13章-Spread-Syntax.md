# Spread syntax

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

Spread syntax allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.

```javascript
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));
// expected output: 6

console.log(sum.apply(null, numbers));
// expected output: 6

```

## Syntax
For function calls:
```javascript
myFunction(...iterableObj);
```

For array literals or strings:
```javascript
[...iterableObj, '4', 'five', 6];
```

For object literals (new in ECMAScript 2018):
```javascript
let objClone = { ...obj };
```

## Apply for new
When calling a constructor with new it's not possible to directly use an array and apply() (apply() does a [[Call]] and not a [[Construct]]). However, an array can be easily used with new thanks to spread syntax:

```javascript
const dateFields = [1970, 0, 1];  // 1 Jan 1970
const d = new Date(...dateFields);
```

To use new with an array of parameters without spread syntax, you would have to do it indirectly through partial application:
```javascript
function applyAndNew(constructor, args) {
   function partial () {
      return constructor.apply(this, args);
   };
   // 这里是为什么 === "object"
   if (typeof constructor.prototype === "object") {
      partial.prototype = Object.create(constructor.prototype);
   }
   return partial;
}


function myConstructor () {
   console.log("arguments.length: " + arguments.length);
   console.log(arguments);
   this.prop1="val1";
   this.prop2="val2";
};

const myArguments = ["hi", "how", "are", "you", "mr", null];
const myConstructorWithArguments = applyAndNew(myConstructor, myArguments);

// var obj = new myConstructorWithArguments;
// console.log(obj.prop1);
// 
console.log(new myConstructorWithArguments);
//  (internal log of myConstructor):           arguments.length: 6
//  (internal log of myConstructor):           ["hi", "how", "are", "you", "mr", null]
//  (log of "new myConstructorWithArguments"): {prop1: "val1", prop2: "val2"}
```

## Spread in array literals
### A more powerful array literal

```javascript
const parts = ['shoulders', 'knees']; 
const lyrics = ['head', ...parts, 'and', 'toes']; 
//  ["head", "shoulders", "knees", "and", "toes"]
```

### Copy an array
```javascript
const arr = [1, 2, 3];
const arr2 = [...arr]; // same as arr.slice()

arr2.push(4);
//  arr2 becomes [1, 2, 3, 4]
//  arr remains unaffected
```

Spread syntax effectively goes one level deep while copying an array. Therefore, it may be unsuitable for copying multidimensional arrays, as the following example shows.
```javascript
const a = [[1], [2], [3]];
const b = [...a];

b.shift().shift(); 
//  1

//  Oh no!  Now array 'a' is affected as well:
a
//  [[], [2], [3]]
```

### A better way to concatenate arrays
```javascript

const arr1 = [0, 1, 2];
const arr2 = [3, 4, 5]; 

//  Append all items from arr2 onto arr1
arr1 = arr1.concat(arr2);

// With spread syntax this becomes:

let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];

arr1 = [...arr1, ...arr2]; 
//  arr1 is now [0, 1, 2, 3, 4, 5]
```

```javascript
const arr1 = [0, 1, 2];
const arr2 = [3, 4, 5];

//  Prepend all items from arr2 onto arr1
Array.prototype.unshift.apply(arr1, arr2)

//  arr1 is now [3, 4, 5, 0, 1, 2]

// With spread syntax, this becomes:
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];

arr1 = [...arr2, ...arr1];
//  arr1 is now [3, 4, 5, 0, 1, 2]

```

### Spread in object literals
```javascript
const obj1 = { foo: 'bar', x: 42 };
const obj2 = { foo: 'baz', y: 13 };

const clonedObj = { ...obj1 };
// Object { foo: "bar", x: 42 }

const mergedObj = { ...obj1, ...obj2 };
// Object { foo: "baz", x: 42, y: 13 }
```


