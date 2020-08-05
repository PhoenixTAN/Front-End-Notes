# Javascript数据类型

The latest ECMAScript standard defines nine types:

## Primitives
Six Data Types that are primitives, checked by typeof operator:
- `undefined` : typeof instance === "undefined"
- `Boolean` : typeof instance === "boolean"
- `Number` : typeof instance === "number"
- `String` : typeof instance === "string"
- `BigInt` : typeof instance === "bigint"
- `Symbol` : typeof instance === "symbol"

- `null` : typeof instance === "object". Special primitive type having additional usage for its value: if object is not inherited, then null is shown;
- `Object` : typeof instance === "object". Special non-data but structural type for any constructed object instance also used as data structures: new Object, new Array, new Map, new Set, new WeakMap, new WeakSet, new Date and almost everything made with new keyword;
- `Function` non data structure, though it also answers for typeof operator: typeof instance === "function". This answer is done as a special shorthand for Functions, though every Function constructor is derived from Object constructor.

## Symbol

### 测试用例
```javascript
console.log(undefined == null); // true
console.log(undefined === null); // false

console.log(undefined == false); // false
console.log(undefined === false); // false

console.log(null == false); // false
console.log(null === false); // false

console.log(!null); // true
console.log(!undefined);  // true

console.log('1' === 1); // false
console.log('1' == 1);  // true

console.log(null == 0); // false
console.log(null === 0);    // false

console.log(undefined && 1);  // undefined
console.log(null && 1);  // null

console.log(undefined || 1);  // 1
console.log(null || 1);   // 1

const obj1 = { a : 1 };
const obj2 = { a : 1 };
const obj3 = obj1;
console.log(obj1 == obj2);  // false
console.log(obj1 === obj2); // false
console.log(obj3 == obj1);  // true
console.log(obj3 === obj1); // true

检查对象的“值相等”的一个强大的方法，最好是依靠完善的测试库，涵盖了各种边界情况。
Underscore和Lo-Dash有一个名为_.isEqual()方法，用来比较好的处理深度对象的比较。

console.log(undefined == 0);    // false
console.log(undefined === 0);   // false

// foo does not exist. It is not defined and has never been initialized:
foo; //ReferenceError: foo is not defined

// foo is known to exist now but it has no type or value:
var foo = null; 
foo; //null
```

undefined是ReferenceError，没有被定义，没有被初始化。
null是已经被定义了，但是没有类型和值。

The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.

