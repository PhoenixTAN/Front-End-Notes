# Javascripts进阶

- 变量命名
- 数组
- 函数
- 事件
- 内置对象
- 数组方法

## 变量命名
必须以字母、下划线或**美元**符号开头。

变量也可以不声明，直接使用，但为了规范，需要先声明，后使用。

## 数组
数组对象是一个对象的集合，里边的对象可以是不同类型的。
```javascript
var arr = new Array();
// 当前，里面的值都是undefined

// 可以用索引赋值
myarr[0] = 1;

var myarray = new Array(66,80,90,77,59);    //创建数组同时赋值

myarray = [66,80,90,77,59];     //直接输入一个数组（称 “字面量数组”）

myarray.length; //获得数组myarray的长度

```


### 2D Array
```javascript

var myarr=new Array();  //先声明一维 
for ( var i=0; i<2; i++ ) {   //一维长度为2
    myarr[i] = new Array();  //再声明二维 
    for ( var j=0; j<3; j++ ) {   //二维长度为3
        myarr[i][j] = i+j;   // 赋值，每个数组元素的值为i+j
    }
}

myarr = [[0 , 1 , 2 ],[1 , 2 , 3]]

```

## function
```javascript

function adder(a1, a2) {
    return a1 + a2;
}

```

## 事件
- onclick: 鼠标单击
- onmouseover: 鼠标经过
- onmouseout: 鼠标移开
- onchange: 文本框内容改变
- onselect: 文本框内容被选中
- onfocus: 光标聚集
- onblur: 光标离开
- onload: 网页导入
- onunload: 关闭网页

**注意一下onfocus和onblur，可以用removeAttribute("onfocus")来取消这个特性，避免网页被持续阻塞。**

```html
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title> 卸载事件 </title>
<script type="text/javascript">   
    window.onunload = onunload_message();   
    function onunload_message() {   
        alert("您确定离开该网页吗？");   
    }
</script>   
</head>
<body>
    欢迎学习JavaScript。
</body>
</html>
```

## Javascript 内置对象

### Date
```javascript
var udate = new Date();     // 获取当前时间

var d = new Date(2012, 10, 1);  //2012年10月1日

d = new Date('Oct 1, 2012');    //2012年10月1日
```

- get/setDate()
- get/setFullYeat()
- get/setYear()
- get/setMonth()
- get/setDay()
- get/setHours/Minutes/Seconds()
- get/setTime() 毫秒
- toLocaleTimeString();     // 获取当前时间

```html
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>获得年份 </title>
<script type="text/javascript">
var mydate = new Date(); 
document.write(mydate+"<br>");

var myyear = mydate.getYear();
document.write("年份getYear():"+myyear+"<br>");

myyear = mydate.getFullYear();
document.write("年份getFullYear():"+myyear+"<br>");

mydate.setTime( mydate.getTime()  + 2* 60 * 60 * 1000);
document.write("推迟二小时时间：" + mydate);
</script>
</head>
<body>
</body>
</html>
```

Result:
```
Fri May 22 2020 11:24:46 GMT-0400 (Eastern Daylight Time)
年份getYear():120 // 疑似从1900年开始算
年份getFullYear():2020

当前时间：Fri May 22 2020 11:28:59 GMT-0400 (Eastern Daylight Time)
推迟二小时时间：Fri May 22 2020 13:28:59 GMT-0400 (Eastern Daylight Time)
```

### String
```
stringObject.length

stringObject.toUpperCase()

stringObject.charAt(index) // index starts from 0
// 如果越界会返回一个空字符串

stringObject.indexOf(substring, startpos)
// 从index=startpos开始找第一个出现的substring
// 如果没找到返回-1

stringObject.split(separator, limit)
// limit分割次数
// 如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割。
//
```

```javascript
var mystr = "www.imooc.com";
document.write(mystr.split(".")+"<br>");
document.write(mystr.split(".", 2)+"<br>");
document.write(mystr.split("")+"<br>");
document.write(mystr.split("", 5));
```
Result: 
```
www,imooc,com
www,imooc
w,w,w,.,i,m,o,o,c,.,c,o,m
w,w,w,.,i
```

```
stringObject.substring(startPos,stopPos) 
// 字符串[startPos, stopPos)
// 如果 start 比 stop 大，那么该方法在提取子串之前会先交换这两个参数。

stringObject.substr(startPos,length)
// 如果参数startPos是负数，从字符串的尾部开始算起的位置。
// 也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。

// 如果startPos为负数且绝对值大于字符串长度，startPos为0。

```

### Math对象
```javascript
var mypi = Math.PI; 
var myabs = Math.abs(-15);
document.write(mypi);
document.write(myabs);
```

```
Math.valueOf() 返回Math对象的原始值

Math.random() 方法可返回介于 0 ~ 1（大于或等于 0 但小于 1 )之间的一个随机数
```

## 数组对象
```javascript
var arr = new Array();
```
### 数组方法
- concat(): concatenate
- join(): 所有元素放到一个字符串，并用指定分隔符进行分割
- pop(): 删除并返回最后一个元素
- push(): 向数组末尾增加一个元素或更多，返回新数组长度
- reserve(): 逆序
- shift(): 删除并返回数组第一个元素
- slice(): 切割
- sort()
- splice(): 删除元素，并向数组添加新元素
- toString()
- toSource(): 返回该对象的源代码
- toLocaleString(): 把数组转换为本地数组，并返回结果
- unshift(): 向数组的开头添加一个或更多元素，返回新数组长度
- valueOf(): 返回数组对象的原始值

#### concat()
连接多个元素
```javascript
var mya = new Array(3);
mya[0] = "1";
mya[1] = "2";
mya[2] = "3";
document.write(mya.concat(4,5，6)+"<br>");     // 会deepcopy一个数组
document.write(mya);    // 不会改变原来的数组
```

Result:
```
1,2,3,4,5，6
1,2,3
```

连接数组
```javascript
var mya1= new Array("hello!")
var mya2= new Array("I","love");
var mya3= new Array("JavaScript","!");
var mya4=mya1.concat(mya2,mya3);
document.write(mya4);
```
Result:
```
hello!,I,love,JavaScript,!
```

#### join()
默认使用都好分割符

```javascript
var myarr = new Array(3);
myarr[0] = "I";
myarr[1] = "love";
myarr[2] = "JavaScript";
document.write(myarr.join());
document.write(myarr.join("-"));
```
Result:
```
I,love,JavaScript
I-love-JavaScript
```

#### sort()
```
myArray.sort(sortMethod);
```
该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。

比较函数应该具有两个参数 a 和 b，其返回值如下： 
1. 若返回值<=-1，则表示 A 在排序后的序列中出现在 B 之前。
2. 若返回值>-1 && <1，则表示 A 和 B 具有相同的排序顺序。
3. 若返回值>=1，则表示 A 在排序后的序列中出现在 B 之后。

```javascript
function sortNum(a, b) {
    return a - b;
    //升序，如降序，把“a - b”该成“b - a”
}

var myarr = new Array("80","16","50","6","100","1");
document.write(myarr + "<br>");
document.write(myarr.sort(sortNum));

```