
```javascript
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);

console.log(max);
// expected output: 7

const min = Math.min.apply(null, numbers);

console.log(min);
// expected output: 2

const addition = [1, 2, 3];
numbers.push.apply(numbers, addition);
console.log(numbers);   // Array [5, 6, 2, 3, 7, 1, 2, 3]

numbers.push.call(numbers, 'call1', 'call2');
console.log(numbers);   // Array [5, 6, 2, 3, 7, 1, 2, 3, "call1", "call2"]

numbers.push.bind(numbers)('bind1', 'bind2');
console.log(numbers);   // Array [5, 6, 2, 3, 7, 1, 2, 3, "call1", "call2", "bind1", "bind2"]

// 如果call方法没有参数，或者参数为null或undefined，则等同于指向全局对象
window.color = "red";
var o = {color: "blue"};
function sayColor(){
	alert(this.color);
}
sayColor.call(this);//red
sayColor.call(window);//red
sayColor.call();//red
sayColor.call(null);//red
sayColor.call(undefined);//red
sayColor.call(o);//blue

```