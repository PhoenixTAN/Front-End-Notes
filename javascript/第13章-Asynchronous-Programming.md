# Asynchronous Programming

Getting to know asynchronous JavaScript: Callbacks, Promises and Async/Await

https://medium.com/codebuddies/getting-to-know-asynchronous-javascript-callbacks-promises-and-async-await-17e0673281ee

## Asynchrony in JavaScript

According to Wikipedia: Asynchrony in computer programming refers to the occurrence of events **independently of the main program flow** and ways to deal with such events.

In programming languages like e.g Java or C# the “main program flow” happens on the main thread or process and “the occurrence of events independently of the main program flow” is the spawning of new threads or processes that runs code in parallel to the “main program flow”.

在Java和C#中，事件的发生是独立于主函数执行流的，跟主函数是**并行执行**的。

Javascript就不一样。

This is not the case with JavaScript.

That is because a JavaScript program is **single threaded and all code is executed in a sequence, not in parallel**. In JavaScript this is handled by using what is called an **“asynchronous non-blocking I/O model”**. 

**That means while the execution of JavaScript is blocking, I/O operations are not.**
Javascript被block的时候，IO操作不会被block.

I/O operations can be fetching data over the internet with Ajax or over WebSocket connections, querying data from a database such as MongoDB or accessing the filesystem with the NodeJs “fs” module. 

所有IO操作都是异步，例如：
1. 网上通过Ajax或者WebSocket连接获取数据，
2. 数据库请求，
3. 文件系统读取。

**All these kind of operations are done in parallel to the execution of your code and it is not JavaScript that does these operations; to put it simply, the underlying engine does it.**

**这些操作是并行的，但并不是Javascript做的，而是Javascript的引擎做的。**

插播一条知识，一个线程什么时候会被阻塞？
1. 线程放弃CPU，被调度。
2. 线程进入critical section的时候无法获得同步锁。
3. 线程主动阻塞，等待其他线程的执行。
4. 线程执行某些IO操作（等待硬件资源和硬件上的响应）。因为等待相关的资源进入了阻塞状态，比如监听system.in()，但是尚且没有收到键盘的输入，则进入阻塞状态。

## Callbacks
For JavaScript to know when an asynchronous operation has a result (a result being either returned data or an error that occurred during the operation), **it points to a function that will be executed once that result is ready.** This function is what we call a “callback function”. 

当一个异步操作有了结果，不管这个结果是返回的数据还是发生的异常和错误，我们执行一个callback函数。

Meanwhile, JavaScript continues its normal execution of code. This is why frameworks that does external calls of different kinds have APIs where you provide callback functions to be executed later on.

Registering event listeners in a browser with “addEventListener”, reading a files content with “fs.readFile” or registering a middleware in an express web server with “server.use” are examples of common APIs that uses callbacks.

Here is an example of fetching data from an URL using a module called “request”:
```javascript
const request = require('request');
request('https://www.somepage.com', function (error, response, body) {
  if(error){
    // Handle error.
  }
  else {
    // Successful, do something with the result.
  }
});
```

The following works just as fine and will give the same result as above:

```javascript
const request = require('request');
function handleResponse(error, response, body){
    if(error){
        // Handle error.
    }
    else {
        // Successful, do something with the result.
    }
}
request('https://www.somepage.com', handleResponse);
```

As you can see, “request” takes a function as its last argument. This function is not executed together with the code above. It is saved to be executed later once the underlying I/O operation of fetching data over HTTP(s) is done. 

**The underlying HTTP(s) request is an asynchronous operation and does not block the execution of the rest of the JavaScript code.** 

The callback function is put on **a sort of queue called the "event loop"** until it will be executed with a result from the request.

### Callback function MDN
我们看看MDN怎么解释。
A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

```javascript
function greeting(name) {
	console.log("callback...");
    console.log(name);
}

function processUserInput(callback) {
	console.log("processUserInput...");
    var name = "Ziqi";
    callback(name);
}

processUserInput(greeting);
```
The above example is a synchronous callback, as it is executed immediately.

这是一个同步的callback,因为这是马上执行的。
```
"processUserInput..."
"callback..."
"Ziqi"
```

A good example is the callback functions executed inside a .then() block chained onto the end of a promise after that promise fulfills or rejects. This structure is used in many modern web APIs, such as fetch().

### Callback hell

Callbacks are a good way to declare what will happen once an I/O operation has a result, but what if you want to use that data in order to make another request? You can only handle the result of the request (if we use the example above) within the callback function provided.

如果我们想用第一次的请求结果再做另外的请求呢？
看看刚刚这个例子会有什么问题？

In this example the variable “result” will not have a value when printed to the console at the last line:

```javascript
const request = require(‘request’);
let result;
request('http://www.somepage.com', function (error, response, body) {
    if(error){
        // Handle error.
    }
    else {
        result = body;
    }
});
console.log(result);
```

我们定义一个result全局变量，然后再callback函数里面把body赋值给result，然后再request的函数体外打印result.
请记住，这个callback function是异步执行的：再request某个URL的时候，javascript引擎会继续执行request外面的代码，也就是console.log(result),这这一般只能得到undefine的结果。

The last line will output “undefined” to the console because at the time that line is being executed, the callback has not been called.

那我们怎么解决呢？
再写一层不就好了。
```javascript
request('http://www.somepage.com', function (firstError, firstResponse, firstBody) {
    if(firstError){
        // Handle error.
    }
    else {
        request(`http://www.somepage.com/${firstBody.someValue}`, function (secondError, secondResponse, secondBody) {
            if(secondError){
                // Handle error.
            }
            else {
                // Use secondBody for something
            }
        });
    }
});
```
但这么嵌套就很难受。It becomes less readable and a little bit messy.

One thing to note here is the first argument in every callback function will contain an error if something went wrong, or will be empty if all went well. **This pattern is called “error first callbacks” and is very common.** It is the standard pattern for callback-based APIs in NodeJs. This means that for every callback declared we need to check if there is an error and that just adds to the mess when dealing with nested callbacks.
**This is the anti-pattern that has been named “callback hell”.**

Promises就是用来解决这个问题的。


## EventLoop
https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop


promisify

