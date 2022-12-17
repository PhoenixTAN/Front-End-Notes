# More on Functions

The simplest way to describe a function is with a *function type expression*.

```typescript
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}
 
function printToConsole(s: string) {
  console.log(s);
}
 
greeter(printToConsole);
```



## Call Signatures

In JavaScript, functions can have properties in addition to being callable. However, the function type expression syntax doesn’t allow for declaring properties. If we want to describe something callable with properties, we can write a *call signature* in an object type:

如果你想给你的函数定义一点属性，可以这么定义：

```typescript
type DescribableFunction = {
  description: string;	// 自己定义的属性
  (someArg: number): boolean;	// 这么写表示这个type是callable
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
```

## Construct Signatures

JavaScript functions can also be invoked with the `new` operator.

TypeScript refers to these as *constructors* because they usually create a new object. You can write a *construct signature* by adding the `new` keyword in front of a call signature:

```typescript
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```

Some objects, like JavaScript’s `Date` object, can be called with or without `new`. You can combine call and construct signatures in the same type arbitrarily:

```typescript
interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): number;
}
```

## Generic Functions

```typescript
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
```

## Inference

```typescript
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
```

## Constraints

```typescript
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
 
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);
Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
```



## Specifying Type Arguments

```typescript
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

const arr = combine([1, 2, 3], ["hello"]);
Type 'string' is not assignable to type 'number'

```

If you intended to do this, however, you could manually specify `Type`:

```typescript
const arr = combine<string | number>([1, 2, 3], ["hello"]);
```

## Optional Parameters

## Optional Parameters in Callbacks

## Function Overloads

注意TS不能像java一样对同一个入参，但不同类型：

```typescript
function fn(x: boolean): void;
// Argument type isn't right
function fn(x: string): void;
```



```typescript
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);

// No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
```

其实一个函数只能实现一次，跟java的overload完全不是一回事。



## Declaring`this`in a Function

```typescript
const user = {
  id: 123,
 
  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};
```



## void

`void` represents the return value of functions which don’t return a value. It’s the inferred type any time a function doesn’t have any `return` statements, or doesn’t return any explicit value from those return statements:

```typescript
// The inferred return type is void
function noop() {
  return;
}
```

void是TS特性，在JS中，一个函数没有明示返回值，就默认返回undefined.

在TS中void和undefined是不一样的东西。

## object

The special type `object` refers to any value that isn’t a primitive (`string`, `number`, `bigint`, `boolean`, `symbol`, `null`, or `undefined`).

This is different from the *empty object type* `{ }`, and also different from the global type `Object`. It’s very likely you will never use `Object`.

大写的Object怎么用？

```typescript
Object.keys(obj).reduce(() => {}, []);
```

## unknown

The `unknown` type represents *any* value. This is similar to the `any` type, but is safer because it’s not legal to do anything with an `unknown` value:

```typescript
function safeParse(s: string): unknown {
  return JSON.parse(s);
}
 
// Need to be careful with 'obj'!
const obj = safeParse(someRandomString);
```

## never

```typescript
function fail(msg: string): never {
  throw new Error(msg);
}
```

## Function

The global type `Function` describes properties like `bind`, `call`, `apply`, and others present on all function values in JavaScript. It also has the special property that values of type `Function` can always be called; these calls return `any`:

```typescript
function doSomething(f: Function) {
  return f(1, 2, 3);
}
```



This is an *untyped function call* and is generally best avoided because of the unsafe `any` return type.

If you need to accept an arbitrary function but don’t intend to call it, the type `() => void` is generally safer.





