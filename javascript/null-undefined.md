# null vs undefined

```javascript
console.log(undefined && 1);  // undefined
console.log(null && 1);  // null

console.log(undefined || 1);  // 1
console.log(null || 1);   // 1
```

null用来表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象。

null是一个表示"无"的对象，转为数值时为0
undefined是一个表示"无"的原始值，转为数值时为NaN

当声明的变量还未被初始化时，变量的默认值为undefined

null用来表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象
