# Template literals (Template strings)

Template literals are string literals **allowing embedded expressions**. You can use multi-line strings and string interpolation features with them.

## Syntax
```
`string text`

`string text line 1
 string text line 2`

`string text ${expression} string text`

tag`string text ${expression} string text`
```

Template literals are enclosed by the **backtick (` `)  (grave accent) character** instead of double or single quotes.

```javascript
`\`` === '`' // --> true
```
反斜杠表示转义字符

## Multi-line strings
```javascript
console.log('string text line 1\n' +
'string text line 2');
// "string text line 1
// string text line 2"

// Using template literals, you can do the same like this:
console.log(`string text line 1
string text line 2`);
// "string text line 1
// string text line 2"
```

## Expression interpolation 插值
```javascript
let a = 5;
let b = 10;
console.log('Fifteen is ' + (a + b) + ' and\nnot ' + (2 * a + b) + '.');
// "Fifteen is 15 and
// not 20."

let a = 5;
let b = 10;
console.log(`Fifteen is ${a + b} and
not ${2 * a + b}.`);
// "Fifteen is 15 and
// not 20."

```