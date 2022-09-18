# Everyday Types

## The primitives

### string

### number

### boolean

本质上应该是 true | false.

## Array

`number[]或者Array<number>`



## any

Bottom type and top type?

The `any` type is useful when you don’t want to write out a long type just to convince TypeScript that a particular line of code is okay.

noImplicitAny

When you don’t specify a type, and TypeScript can’t infer it from context, the compiler will typically default to `any`.

You usually want to avoid this, though, because `any` isn’t type-checked.

用any就表示你会告诉编译器你放弃了这个类型检查。

Use the compiler flag [`noImplicitAny`](https://www.typescriptlang.org/tsconfig#noImplicitAny) to flag any implicit `any` as an error. 可以配置这个项让把any作为一个报错。

## Type Annotations on Variables

类型

```typescript
let myName: string = "Alice";
```

In most cases, though, this isn’t needed. Wherever possible, TypeScript tries to automatically *infer* the types in your code. For example, the type of a variable is inferred based on the type of its initializer:

很多情况下，TS会自动类型推断

```typescript
// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";
```



## Functions

### Parameter Type Annotations

```typescript
// Parameter type annotation
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

### Return Type Annotations

```typescript
function getFavoriteNumber(): number {
  return 26;
}
```

### Anonymous Functions

```typescript
// No type annotations here, but TypeScript can spot the bug
const names = ["Alice", "Bob", "Eve"];
 
// Contextual typing for function
names.forEach(function (s) {
  console.log(s.toUppercase());
Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
 
// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUppercase());
Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
```



## Object Types

```typescript
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

### Optional Properties

```typescript
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```



## Union Types 联合类型 a | b

It’s time to start *combining* them in interesting ways.

### Defining a Union Type

A union type is a type formed from two or more other types, representing values that may be ***any one* of those types**.

```typescript
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });
Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
```



```typescript
function printId(id: number | string) {
  console.log(id.toUpperCase());
Property 'toUpperCase' does not exist on type 'string | number'.
  Property 'toUpperCase' does not exist on type 'number'.
}
```

The solution is to *narrow* the union with code, the same as you would in JavaScript without type annotations.

```typescript
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```



## Type Aliases 使用关键字type定义的类型别名

A *type alias* is exactly that - a *name* for any *type*.

```typescript
type Point = {
  x: number;
  y: number;
};
 
// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

## Interfaces 关键字

An *interface declaration* is another way to name an object type:

```typescript
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```



### Differences Between Type Aliases and Interfaces

The key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

interface可以重新定义一遍并增加新的类型，type不可以。

```typescript
// interface先来个title
interface window10 {
    title: string
}

// 再给他加一个name属性
interface window10 {
    name: string;
}

const window10Obj: window10  = {
    title: "asdf",
    name: "sadfasdf"
}
// 两个都可以
window10Obj.title;
window10Obj.name;

// type不行
type Window = {
  title: string
}

type Window = {
  ts: TypeScriptAPI
}

 // Error: Duplicate identifier 'Window'.


```



```typescript
// interface的继承
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear() 
bear.name
bear.honey

// type的继承需要使用交叉类型 a & b
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}

const bear = getBear();
bear.name;
bear.honey;
```



## Type Assertions

类型断言，有时候，TS只知道你`getElementById`会返回一个`HTMLElement`但是其实你知道这是一个`HTMLCanvasElement`.

```typescript
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```



## Literal Types 字面意思的类型

例如，直接把一个字符串作为一个类型。

```typescript
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

### Literal Inference

When you initialize a variable with an object, TypeScript assumes that the properties of that object might change values later.

当你用一个对象初始化一个变量，TS认为这个对象的属性以后是会变化的。

```typescript
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```

### as const

有时候会有这样的问题，定义了入参类型是`"GET" | "POST"`,但是入参是个string：

```typescript
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

我们可以用 `as const`

You can use `as const` to convert the entire object to be type literals:

```typescript
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```



## `null`and`undefined`

JavaScript has two primitive values used to signal absent or uninitialized value: `null` and `undefined`.

### `strictNullChecks`off

With [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks) *off*, values that might be `null` or `undefined` can still be accessed normally, and the values `null` and `undefined` can be assigned to a property of any type. This is similar to how languages without null checks (e.g. C#, Java) behave. The lack of checking for these values tends to be a major source of bugs; we always recommend people turn [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks) on if it’s practical to do so in their codebase.

还是建议把strictNullChecks.

### `strictNullChecks`on

With [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks) *on*, when a value is `null` or `undefined`, you will need to test for those values before using methods or properties on that value. Just like checking for `undefined` before using an optional property, we can use *narrowing* to check for values that might be `null`:

```typescript
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```



### Non-null Assertion Operator (Postfix`!`)

```typescript
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

Just like other type assertions, this doesn’t change the runtime behavior of your code, so it’s important to only use `!` when you know that the value *can’t* be `null` or `undefined`.



## Enums

Enums are a feature added to JavaScript by TypeScript which allows for describing a value which could be one of a set of possible named constants. Unlike most TypeScript features, this is *not* a type-level addition to JavaScript but something added to the language and runtime.

枚举类型是TS给JS加的特性，允许一个值是一个集合中的某个常量。不像大多数TS的特性，这不是对JS的一个类型级别的改动。

https://www.typescriptlang.org/docs/handbook/enums.html



## Less Common Primitives

#### `bigint`

From ES2020 onwards, there is a primitive in JavaScript used for very large integers, `BigInt`:

```typescript
// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100);
 
// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n;
```



#### `symbol`是什么

There is a primitive in JavaScript used to **create a globally unique reference** via the function `Symbol()`

```typescript
const firstName = Symbol("name");
const secondName = Symbol("name");
 
if (firstName === secondName) {
This condition will always return 'false' since the types 'typeof firstName' and 'typeof secondName' have no overlap.
  // Can't ever happen
}
```





