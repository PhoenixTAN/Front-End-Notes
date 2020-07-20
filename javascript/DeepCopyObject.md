# deep copy object

```javascript
const complexObject = {
  obj1: {
    a: 1,
    b: 2,
    deepObj: {
      e: 5
    }
  },
  obj2: {
    c: 3,
    d: 4
  }
}

console.log(complexObject);

const copyObj = Object.assign({}, complexObject);
console.log('Object.assign', copyObj);
console.log(copyObj.obj1.deepObj);

function clone(Obj) {
    var buf;   
    if (Obj instanceof Array) {
        buf = [];  // 创建一个空的数组
        var i = Obj.length;
        while (i--) {
            buf[i] = clone(Obj[i]);
        }
        return buf;
    } else if (Obj instanceof Object){
        buf = {};  // 创建一个空对象
        for (var k in Obj) {  // 为这个对象添加新的属性
            buf[k] = clone(Obj[k]);
        }
        return buf;
    }else{
        return Obj;
    }
}

const cloneObj = clone(complexObject);
console.log('clone', cloneObj);

```

```
[object Object] {
  obj1: [object Object] {
    a: 1,
    b: 2,
    deepObj: [object Object] { ... }
  },
  obj2: [object Object] {
    c: 3,
    d: 4
  }
}
"Object.assign"
[object Object] {
  obj1: [object Object] {
    a: 1,
    b: 2,
    deepObj: [object Object] { ... }
  },
  obj2: [object Object] {
    c: 3,
    d: 4
  }
}
[object Object] {
  e: 5
}
"clone"
[object Object] {
  obj1: [object Object] {
    a: 1,
    b: 2,
    deepObj: [object Object] { ... }
  },
  obj2: [object Object] {
    c: 3,
    d: 4
  }
}
```