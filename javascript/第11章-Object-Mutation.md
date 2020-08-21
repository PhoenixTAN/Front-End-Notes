# Object Mutation In JavaScript

https://www.zeptobook.com/object-mutation-in-javascript/

## What is data mutation in JavaScript?
Mutation means a change in the form or nature of the original data. In JavaScript, there are two data types: 
1) primitive and 
2) non-primitive/reference data types.

Primitive data types are Boolean, Number, String, Null and Undefined. Primitive data types are referenced by value. Primitive types in JavaScripts are immutable, meaning that if we change one then a new instance is created as a result.

Reference data types are Objects and Arrays. Reference types in JavaScript are  mutable, meaning that the state and fields of mutable types can be changed. No new instance is created as a result.

## Why mutation is bad programming?
这两个指针指向同一个内存里面的对象。
```javascript
const car = { name: 'BWM' };
car.color = 'black';

const newCar = car;
newCar.color = 'blue';
```

我们还有一种方法，使用Object.assing(targetObject, sourceObject);

```javascript
const newObject = Object.assign(targetObject, SourceObject);
const manager = { role: 'manager'};
const salary = { salary: '$50,000'};
const staff = Object.assign(salary, manager);
console.log(staff);
// salary: "$50,000"
// role: "manager"

// Manager没有发生变化
console.log(manager);
// role: "manager"

// 但是salary发生了变化
console.log(salary);
// salary: "$50,000"
// role: "manager"
```

那我们如何避免这样的情况？
可以这样写：
```javascript
const staff = Object.assign({}, salary, manager);
```
这样salary和manager都不会变化。

