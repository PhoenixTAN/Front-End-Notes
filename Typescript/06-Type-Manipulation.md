# Type Manipulation

**Creating Types from Types**

- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) - Types which take parameters
- [Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html) - Using the `keyof` operator to create new types
- [Typeof Type Operator](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html) - Using the `typeof` operator to create new types
- [Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html) - Using `Type['a']` syntax to access a subset of a type
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) - Types which act like if statements in the type system
- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) - Creating types by mapping each property in an existing type
- [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html) - Mapped types which change properties via template literal strings

## Generics

### Hello World of Generics

```typescript
function identity<Type>(arg: Type): Type {
  return arg;
}
```

### Working with Generic Type Variables

当你开始使用泛型，编译器就会强制你正确地使用这个泛型，例如：

```typescript
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
Property 'length' does not exist on type 'Type'.
  return arg;
}
```

### Generic Types

In this section, we’ll explore the type of the functions themselves and how to create generic interfaces.

```typescript
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}
 
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: GenericIdentityFn = identity;
```

### Generic Classes

```typescript
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
 
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

### Using Type Parameters in Generic Constraints

```typescript
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, "a");
getProperty(x, "m");
Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
```



### Using Class Types in Generics

When creating factories in TypeScript using generics, it is necessary to refer to class types by their constructor functions. For example,

```typescript
function create<Type>(c: { new (): Type }): Type {
  return new c();
}
```

A more advanced example uses the prototype property to infer and constrain relationships between the constructor function and the instance side of class types.

```typescript
class BeeKeeper {
  hasMask: boolean = true;
}
 
class ZooKeeper {
  nametag: string = "Mikle";
}
 
class Animal {
  numLegs: number = 4;
}
 
class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}
 
class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}
 
function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}
 
createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```



## Keyof Type Operator

The `keyof` operator takes an object type and produces a string or numeric literal union of its keys. The following type P is the same type as “x” | “y”:

```typescript
type Point = { x: number; y: number };
type P = keyof Point;	// type P = x | y;
```



If the type has a `string` or `number` index signature, `keyof` will return those types instead:

```typescript
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;	// type A = number;

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;		// type M = string | number;
```



## The`typeof`type operator

JavaScript already has a `typeof` operator you can use in an *expression* context:

```javascript
// Prints "string"
console.log(typeof "Hello world");
```

TypeScript adds a `typeof` operator you can use in a *type* context to refer to the *type* of a variable or property:

```typescript
let s = "hello";
let n: typeof s;
```

This isn’t very useful for basic types, but combined with other type operators, you can use `typeof` to conveniently express many patterns. For an example, let’s start by looking at the predefined type `ReturnType<T>`. It takes a *function type* and produces its return type:

```typescript
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
```

## Indexed Access Types

We can use an *indexed access type* to look up a specific property on another type:

```typescript
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];	// 想获取Person类型中age属性的值的类型
// type Age = number
```



The indexing type is itself a type, so we can use unions, `keyof`, or other types entirely:

```typescript
type I1 = Person["age" | "name"];
// 想获取Person中属性age和属性name的值的类型
// type I1 = string | number

type I2 = Person[keyof Person];
// 想获取Person中所有属性的值的类型  
// type I2 = string | number | boolean
 
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
     
// type I3 = string | boolean
```



## Conditional Types

很奇怪，这个extends去作为条件表达式有什么用呢？

*Conditional types* help describe the relation between the types of inputs and outputs.

```typescript
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
 
type Example1 = Dog extends Animal ? number : string;
// type Example1 = number
 
type Example2 = RegExp extends Animal ? number : string;    
// type Example2 = string
```

From the examples above, conditional types might not immediately seem useful - we can tell ourselves whether or not `Dog extends Animal` and pick `number` or `string`! But the power of conditional types comes from using them with generics.

从刚刚的例子可以看出来，extends来写个问号表达式没什么了不起的。extends的真正魅力在使用泛型的时候。

For example, let’s take the following `createLabel` function:

```typescript
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}
 
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}
```









