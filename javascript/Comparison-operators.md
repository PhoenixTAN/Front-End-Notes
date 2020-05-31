# Comparison operators

## Equality (==)

The equality operator converts the operands if they are not of the same type, then applies strict comparison.

If both operands are objects, then JavaScript compares internal references which are equal when operands refer to the same object in memory.

如果两个操作数不是同一个type，用先进行类型转换再apply strict comparision.

如果连个操作数都是对象，那就看指针是不是指向同一个对象（内存空间）。

```javascript
1    ==  1         // true
'1'  ==  1         // true
1    == '1'        // true
0    == false      // true
0    == null       // false
var object1 = {'key': 'value'}, object2 = {'key': 'value'}; 
object1 == object2 // false
0    == undefined  // false
null == undefined  // true
```

## Identity / strict equality (===)
The identity operator returns true if the operands are strictly equal (see above) with no type conversion.
```javascript
3 === 3   // true
3 === '3' // false
var object1 = {'key': 'value'}, object2 = {'key': 'value'};
object1 === object2 //false
```

