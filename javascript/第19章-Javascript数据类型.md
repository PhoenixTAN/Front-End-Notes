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

## null vs undefined
阮一峰文章
http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html


大多数计算机语言，有且仅有一个表示"无"的值，比如，C语言的NULL，Java语言的null，Python语言的None，Ruby语言的nil。

有点奇怪的是，JavaScript语言居然有两个表示"无"的值：undefined和null。这是为什么？

### 相似性
在JavaScript中，将一个变量赋值为undefined或null，老实说，几乎没区别。

undefined和null在if语句中，都会被自动转为false，相等运算符甚至直接报告两者相等。

### 历史原因
原来，这与JavaScript的历史有关。1995年JavaScript诞生时，最初像Java一样，只设置了null作为表示"无"的值。

根据C语言的传统，null被设计成可以自动转为0。

```js
Number(null)
// 0

5 + null
// 5


Number(undefined)
// NaN

5 + undefined
// NaN
```

但是，JavaScript的设计者Brendan Eich，觉得这样做还不够，有两个原因。

首先，null像在Java里一样，被当成一个对象。但是，JavaScript的数据类型分成原始类型（primitive）和合成类型（complex）两大类，Brendan Eich觉得表示"无"的值最好不是对象。

其次，JavaScript的最初版本没有包括错误处理机制，发生数据类型不匹配时，往往是自动转换类型或者默默地失败。Brendan Eich觉得，如果null自动转为0，很不容易发现错误。

因此，Brendan Eich又设计了一个undefined。

### 目前的用法
null表示"没有对象"，即该处不应该有值。典型用法是：

（1） 作为函数的参数，表示该函数的参数不是对象。

（2） 作为对象原型链的终点。
```js
Object.getPrototypeOf(Object.prototype)
// null
```

undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：

（1）变量被声明了，但没有赋值时，就等于undefined。

（2）调用函数时，应该提供的参数没有提供，该参数等于undefined。

（3）对象没有赋值的属性，该属性的值为undefined。

（4）函数没有返回值时，默认返回undefined。

# Comparison operators

## Equality (==)

The equality operator converts the operands if they are not of the same type, then applies strict comparison.

If both operands are objects, then JavaScript compares internal references which are equal when operands refer to the same object in memory.

如果两个操作数不是同一个type，用先进行类型转换再apply strict comparision.

如果连个操作数都是对象，那就看指针是不是指向同一个对象（内存空间）。

```javascript
1    ==  1         // true
'1'  ==  1         // true
1    == '1'        // true
0    == false      // true
0    == null       // false
var object1 = {'key': 'value'}, object2 = {'key': 'value'}; 
object1 == object2 // false
0    == undefined  // false
null == undefined  // true
```

## Identity / strict equality (===)
The identity operator returns true if the operands are strictly equal (see above) with no type conversion.
```javascript
3 === 3   // true
3 === '3' // false
var object1 = {'key': 'value'}, object2 = {'key': 'value'};
object1 === object2 //false
```


