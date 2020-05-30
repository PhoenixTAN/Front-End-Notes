# Javascript Important Language Features

## Expressions - Destructuring assignment

The destructuring assignment syntax is a JavaScript expression that makes it possible to **unpack values from arrays, or properties from objects, into distinct variables**.

```javascript
let a, b, rest;
[a, b] = [10, 20];

console.log(a);
// expected output: 10

console.log(b);
// expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest);
// expected output: Array [30,40,50]
```

### Default values
A variable can be assigned a default, in the case that the value unpacked from the array is undefined.

```javascript
[a=5, b=7] = [1];
console.log(a); // 1
console.log(b); // 7
```

### Swapping variables
Two variables values can be swapped in one destructuring expression.

Without destructuring assignment, swapping two values requires a temporary variable (or, in some low-level languages, the **XOR-swap trick**).

```javascript
let a = 1;
let b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1

const arr = [1,2,3];
[arr[2], arr[1]] = [arr[1], arr[2]];
console.log(arr); // [1,3,2]

```

XOR-swap trick
```c
x = 1010b;
y = 0011b;

x = x ^ y;  // x = 1010 XOR 0011 = 1001
y = x ^ y;  // y = 0011 XOR 1001 = 1010
x = x ^ y;  // x = 1001 XOR 1010 = 0011
```

### Parsing an array returned from a function
```javascript
function f() {
  return [1, 2];
}

let a, b; 
[a, b] = f(); 
console.log(a); // 1
console.log(b); // 2
```

### Ignoring some returned values

```javascript
function f() {
  return [1, 2, 3];
}

const [a, , b] = f();   // 看这里，不需要用变量去接收
console.log(a); // 1
console.log(b); // 3

const [c] = f();
console.log(c); // 1
```

### Assigning the rest of an array to a variable
```javascript
const [a, ...b] = [1, 2, 3];
console.log(a); // 1
console.log(b); // [2, 3]
```

### Unpacking values from a regular expression match
When the regular expression exec() method finds a match, it returns an array containing first the entire matched portion of the string and then the portions of the string that matched each parenthesized group in the regular expression. Destructuring assignment allows you to unpack the parts out of this array easily, ignoring the full match if it is not needed.


```javascript
function parseProtocol(url) { 
  const parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
  if (!parsedURL) {
    return false;
  }
  console.log(parsedURL); // ["https://developer.mozilla.org/en-US/Web/JavaScript", "https", "developer.mozilla.org", "en-US/Web/JavaScript"]

  const [, protocol, fullhost, fullpath] = parsedURL;
  return protocol;
}

console.log(parseProtocol('https://developer.mozilla.org/en-US/Web/JavaScript')); // "https"
```


