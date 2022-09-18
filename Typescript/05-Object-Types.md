# Object Types

匿名对象。

```typescript
function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}
```

interface定义对象的类型。

```typescript
interface Person {
  name: string;
  age: number;
}
 
function greet(person: Person) {
  return "Hello " + person.name;
}
```

type定义对象的类型。

```typescript
type Person = {
  name: string;
  age: number;
};
 
function greet(person: Person) {
  return "Hello " + person.name;
}
```

### Optional Properties

```typescript
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}
```



### `readonly`Properties

```typescript
interface SomeType {
  readonly prop: string;
}
```



### Index Signatures

Sometimes you don’t know all the names of a type’s properties ahead of time, but you do know the shape of the values.

```typescript
interface StringArray {
  [index: number]: string;
}
```

It is possible to support both types of indexers, but the type returned from a numeric indexer must be a subtype of the type returned from the string indexer.

This is because when indexing with a `number`, JavaScript will actually convert that to a `string` before indexing into an object. JS史记上会把number类型的索引转成string类型的索引。

That means that indexing with `100` (a `number`) is the same thing as indexing with `"100"` (a `string`), so the two need to be consistent.



## Extending Types 关键字extends

```typescript
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
 
interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```



## Intersection Types

`interface`s allowed us to build up new types from other types by extending them.

```typescript
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
 
type ColorfulCircle = Colorful & Circle;
```

Here, we’ve intersected `Colorful` and `Circle` to produce a new type that has all the members of `Colorful` *and* `Circle`.

## Generic Object Types

```typescript
interface Box {
  contents: any;
}
```

如果用any就意味着放弃类型检查，我们可以使用unknown，TS会在如果有类型推断的时候，会进行类型检查：

```typescript
interface Box {
  contents: unknown;
}
 
let x: Box = {
  contents: "hello world",
};
 
// we could check 'x.contents'
if (typeof x.contents === "string") {
  console.log(x.contents.toLowerCase());
}
 
// or we could use a type assertion
console.log((x.contents as string).toLowerCase());

```

其实在这个场景下，我们可以使用泛型：当TS知道我们的类型的时候，就会去做类型检查。

```typescript
interface Box<Type> {
  contents: Type;
}

type OrNull<Type> = Type | null;
 
type OneOrMany<Type> = Type | Type[];
 
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
```



## The`Array`Type

Whenever we write out types like `number[]` or `string[]`, that’s really just a shorthand for `Array<number>` and `Array<string>`.

## The`ReadonlyArray`Type

```typescript
function doStuff(values: ReadonlyArray<string>) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);
 
  // ...but we can't mutate 'values'.
  values.push("hello!");
Property 'push' does not exist on type 'readonly string[]'.
}
```



## Tuple Types

A *tuple type* is another sort of `Array` type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.

元组类型是一种数组类型，确切知道有几个元素，在什么位置，各个元素都是什么类型。

```typescript
type StringNumberPair = [string, number];
```



















