# Expressions - Destructuring assignment

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

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

## Default values
A variable can be assigned a default, in the case that the value unpacked from the array is undefined.

```javascript
[a=5, b=7] = [1];
console.log(a); // 1
console.log(b); // 7
```

## Swapping variables
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

## Parsing an array returned from a function
```javascript
function f() {
  return [1, 2];
}

let a, b; 
[a, b] = f(); 
console.log(a); // 1
console.log(b); // 2
```

## Ignoring some returned values

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

## Assigning the rest of an array to a variable
```javascript
const [a, ...b] = [1, 2, 3];
console.log(a); // 1
console.log(b); // [2, 3]
```

## Unpacking values from a regular expression match
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

## Object Destrcucturing
```javascript
const user = {
    id: 42,
    is_verified: true
};

const {id, is_verified} = user;

console.log(id); // 42
console.log(is_verified); // true 
```

## Assignment without declaration
```javascript
let a, b;

({a, b} = {a: 1, b: 2});
// a = 1
// b = 2
```

## Assigning to new variable names
```javascript
const o = {p: 42, q: true};
const {p: foo, q: bar} = o;
 
console.log(foo); // 42 
console.log(bar); // true
```

## Default values
```javascript
const {a = 10, b = 5} = {a: 3};

console.log(a); // 3
console.log(b); // 5
```

## Assigning to new variables names and providing default values
```javascript
const {a: aa = 10, b: bb = 5} = {a: 3};

console.log(aa); // 3
console.log(bb); // 5
```
用aa取代a，是变量名上的取代，并给aa赋默认值10，等号右边给a赋值为3.打印a你会发现a不存在。

## Unpacking fields from objects passed as function parameter
```javascript
const user = {
  id: 42,
  displayName: 'jdoe',
  fullName: {
      firstName: 'John',
      lastName: 'Doe'
  }
};

function userId({id}) {
  return id;
}

function whois({displayName, fullName: {firstName: name}}) {
  // 把fullName赋值为firstName，并把变量名firstName改为name
  return `${displayName} is ${name}`;
}

console.log(userId(user)); // 42
console.log(whois(user));  // "jdoe is John"
```

## Setting a function parameter's default value
```javascript
function drawChart({size = 'big', coords = {x: 0, y: 0}, radius = 25} = {}) {
  console.log(size, coords, radius);
  // do some chart drawing
}

drawChart({
  coords: {x: 18, y: 30},
  radius: 30
});
```

## Nested object and array destructuring
```javascript
const metadata = {
  title: 'Scratchpad',
  translations: [
    {
      locale: 'de',
      localization_tags: [],
      last_edit: '2014-04-14T08:43:37',
      url: '/de/docs/Tools/Scratchpad',
      title: 'JavaScript-Umgebung'
    }
  ],
  url: '/en-US/docs/Tools/Scratchpad'
};

let {
  title: englishTitle, // rename
  translations: [
    {
       title: localeTitle, // rename
    },
  ],
} = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle);  // "JavaScript-Umgebung"
```

## For of iteration and destructuring
```javascript
const people = [
  {
    name: 'Mike Smith',
    family: {
      mother: 'Jane Smith',
      father: 'Harry Smith',
      sister: 'Samantha Smith'
    },
    age: 35
  },
  {
    name: 'Tom Jones',
    family: {
      mother: 'Norah Jones',
      father: 'Richard Jones',
      brother: 'Howard Jones'
    },
    age: 25
  }
];

for (const {name: n, family: {father: f}} of people) {
  console.log('Name: ' + n + ', Father: ' + f);
}

// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"
```

## Computed object property names and destructuring
```javascript
let key = 'z';
let {[key]: foo} = {z: 'bar'};

console.log(foo);   // "bar"
```

## Rest in Object Destructuring
```javascript
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40}
a; // 10 
b; // 20 
rest; // { c: 30, d: 40 }
```

## Invalid JavaScript identifier as a property name
Destructuring can be used with property names that are **not valid JavaScript identifiers** by providing an alternative identifier that is valid.
```javascript
const foo = { 'fizz-buzz': true };
const foo2 = { fizz: true };
const { 'fizz-buzz': fizzBuzz } = foo;

document.write(foo['fizz-buzz']); // "true"
document.write(foo2['fizz']); // "true"
document.write(foo2.fizz); // "true"
document.write(fizzBuzz); // "true"
```

## Combined Array and Object Destructuring
```javascript
const props = [
  { id: 1, name: 'Fizz'},
  { id: 2, name: 'Buzz'},
  { id: 3, name: 'FizzBuzz'}
];

const [,, { name }] = props;

console.log(name); // "FizzBuzz"
```

