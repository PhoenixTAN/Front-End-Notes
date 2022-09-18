# Type v.s. Interface

- An interface can have multiple merged declarations, but a type alias for an object type literal cannot.
1. **An interface will merge declarations.**

    Unlike a type alias, an interface can be defined multiple times, and will be treated as a single interface (with members of all declarations being merged).
```ts
// These two declarations become: 
// interface Point { x: number; y: number; } 

interface Point { x: number; } 
interface Point { y: number; } 

const point: Point = { x: 1, y: 2 };
```


2. **Implementations**

    A class can implement an interface or type alias, both in the same exact way. Note however that a class and interface are considered static blueprints. Therefore, they can not implement / extend a type alias that names a union type.
```typescript
interface Point { x: number; y: number; } 
class SomePoint implements Point { 
    x = 1; 
    y = 2; 
} 

type Point2 = { x: number; y: number; }; 
class SomePoint2 implements Point2 { 
    x = 1; 
    y = 2; 
} 

type PartialPoint = { x: number; } | { y: number; }; 
// FIXME: can not implement a union type 
class SomePartialPoint implements PartialPoint { 
    x = 1; 
    y = 2; 
} 
```

怎么定义一个字典类型？
```ts
type themeType = {
  foreground: string;
  background: string;
};

type themesType = { [key: string]: themeType };

const themes: themesType = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

```
