```javascript
const s = new Date().getSeconds();

setTimeout(function () {
  // 输出 "2"，表示回调函数并没有在 500 毫秒之后立即执行
  console.log("Ran after " + (new Date().getSeconds() - s) + " seconds");
}, 500);

while (true) {
  if (new Date().getSeconds() - s >= 2) {
    console.log("Good, looped for 2 seconds");
    break;
  }
}
```

```javascript
console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

console.log("loop beigns");
for (let i = 0; i < 100000000; i++) {}
console.log("loop ends");

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
})
  .then(function () {
    console.log("promise2");
  })
  .then(function () {
    console.log("promise3");
  });

console.log("script end");
```

```javascript
console.log(1);

setTimeout(() => {
  console.log("我是定时器，延迟0S执行的");
}, 0);

new Promise((resolve, reject) => {
  console.log("new Promise是同步任务里面的宏任务");
  resolve("我是then里面的参数，promise里面的then方法是宏任务里面的微任务");
}).then((data) => {
  console.log(data);
});

console.log(2);
```

上述代码可以看出执行顺序,同步任务（先执行宏任务，在执行微任务），遍历异步队列，执行异步任务。

setTimeout setInterval 是异步任务，promise.then()是微任务，new Promise()是宏任务。

```
script start
loop beigns
loop ends
promise1
script end
promise2
promise3
undefined
VM3732:4 setTimeout
```

```javascript
async function testSometing() {
  console.log("执行testSometing");
  return "testSometing";    
  // 这个return的值作为 then 里面的参数，
  //会被 v1这个变量接收 await 会阻止后续代码的执行 
}

async function testAsync() {
  console.log("执行testAsync");
  return Promise.resolve("hello async");
}

async function test() {
  console.log("test start...");
  new Promise((resolve) => {
    console.log("async 里面的promise");
    resolve("async里面的promise里面的then");
  }).then((data) => {
    console.log(data);
  });
  const v1 = await testSometing();  // 这里返回的是一个微任务
  console.log(v1);  
  const v2 = await testAsync();
  console.log(v2);
  console.log(v1, v2);
}

test();

var promise = new Promise((resolve) => {
  console.log("promise start..");
  resolve("promise");
}); //3
promise.then((val) => console.log(val));
setTimeout(() => {
  console.log("setTime1");
}, 3000);
console.log("test end...");
```

```
test start...
async 里面的promise
执行testSometing
promise start..
test end...
async里面的promise里面的then
testSometing
执行testAsync
promise
hello async
testSometing hello async
setTime1
```

```
1）输出 “test start...”
2）Promise是一个宏任务 输出 “async 里面的promise” 后续代码会被推入微任务队列
3）遇见 await await后面的会被转换为Promise Promise里面的代码是宏任务，then()里面的代码是微任务，
所以执行后面的 testSometing 这个函数，需要分析 testSomething 这个函数 
输出“执行testSometing” 遇到函数的返回值，对应 await 来说，
这个return的值作为 then 里面的参数，会被 v1这个变量接收 await 会阻止后续代码的执行 
test() 目前执行完毕
4）遇见 promise 输出 ‘promise start..’ 后续代码推入到微任务
5）后续遇见定时器，异步任务，推入异步队列
6）输出 “test end” 全部宏任务执行完毕，检查微任务队列
7）第一个微任务是执行 test()函数推入的 输出“async里面的promise里面的then”
8）还记得 test() 里面的await 后面的 微任务执行 输出 “test something”
9) 继续向下执行 执行 testAsync 输出 "执行testAsync"
10) 再次推入微任务
11）执行 promise 那一个微任务 输出 promise
12）10步的时候推入了一个微任务，继续执行 输出 “hello async”
13）遇见 console 执行 “testSometing hello async”
14）微任务执行完毕 执行异步任务，就是定时器 输出 “setTime1”
```
