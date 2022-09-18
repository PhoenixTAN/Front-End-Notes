# any - unknown - never


## any
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
