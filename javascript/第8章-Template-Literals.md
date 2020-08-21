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

## Nesting templagets

```javascript
// In ES5:

let classes = 'header';
classes += (isLargeScreen() ?
  '' : item.isCollapsed ?
    ' icon-expander' : ' icon-collapser');

// In ES2015 with template literals and without nesting:
const classes = `header ${ isLargeScreen() ? '' :
  (item.isCollapsed ? 'icon-expander' : 'icon-collapser') }`;

// In ES2015 with nested template literals:
const classes = `header ${ isLargeScreen() ? '' :
  `icon-${item.isCollapsed ? 'expander' : 'collapser'}` }`;

```

## Tagged templates
Tags allow you to parse template literals with a function. The first argument of a tag function contains **an array of string values**. The remaining arguments are related to the **expressions**.

```javascript
let person = 'Mike';
let age = 28;

function myTag(strings, personExp, ageExp) {
    let str0 = strings[0]; // "That "
    let str1 = strings[1]; // " is a "

    // There is technically a string after
    // the final expression (in our example),
    // but it is empty (""), so disregard.
    // let str2 = strings[2];

    let ageStr;
    if (ageExp > 99){
        ageStr = 'centenarian';
    } else {
        ageStr = 'youngster';
    }

    // We can even return a string built using a template literal
    return `${str0}${personExp}${str1}${ageStr}`;
}

let output = myTag`That ${ person } is a ${ age }`;

console.log(output);
// That Mike is a youngster
```


这里没懂
```javascript
function template(strings, ...keys) {
  return (function(...values) {
    let dict = values[values.length - 1] || {};
    let result = [strings[0]];
    keys.forEach(function(key, i) {
      let value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  });
}

let t1Closure = template`${0}${1}${0}!`;
t1Closure('Y', 'A');                      // "YAY!"
let t2Closure = template`${0} ${'foo'}!`;
t2Closure('Hello', {foo: 'World'});       // "Hello World!"
```

## Raw strings
```javascript
function tag(strings) {
  console.log(strings.raw[0]);
}

tag`string text line 1 \n string text line 2`;
// logs "string text line 1 \n string text line 2" ,
// including the two characters '\' and 'n'
// 转义字符会被拆开哦！！！

//In addition, the String.raw() method exists to create raw strings—just like the default template function and string concatenation would create.
let str = String.raw`Hi\n${2+3}!`;
// "Hi\n5!"

str.length;
// 6

Array.from(str).join(',');
// "H,i,\,n,5,!"
```
