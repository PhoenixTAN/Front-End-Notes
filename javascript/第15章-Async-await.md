# Async/await

https://javascript.info/async-await

There’s a special syntax to **work with promises** in a more comfortable fashion, called “async/await”. It’s surprisingly easy to understand and use.

## Async functions
Let’s start with the async keyword. It can be placed before a function, like this:
```javascript
async function f() {
  return 1;
}
```
The word “async” before a function means one simple thing: a function always returns a promise. **Other values are wrapped in a resolved promise automatically.**

For instance, this function returns a resolved promise with the result of 1; let’s test it:
```javascript
async function f() {
  return 1;
}

f().then(alert); // 1
```
We could explicitly return a promise, which would be the same:
```javascript
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```
So, async ensures that the function returns a promise, and wraps non-promises in it. Simple enough, right? But not only that. There’s another keyword, await, that works only inside async functions, and it’s pretty cool.

## Await
Syntax
```javascript
// works only inside async functions
let value = await promise;
```
The keyword await makes JavaScript wait until that promise settles and returns its result.

Here’s an example with a promise that resolves in 1 second:

```javascript
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // wait until the promise resolves (*)

  alert(result); // "done!"
}

f();
```
The function execution “pauses” at the line (*) and resumes when the promise settles, with result becoming its result. So the code above shows “done!” in one second.


## Async/await v.s. .then() and .catch()

Let’s take the showAvatar() example from the chapter Promises chaining and rewrite it using async/await:

1. We’ll need to replace .then calls with await.
2. Also we should make the function async for them to work.

### Promises chaining
```javascript
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise(function(resolve, reject) { // (*)
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser); // (**)
    }, 3000);
  }))
  // triggers after 3 seconds
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
```

### Async/await
```javascript
async function showAvatar() {

  // read our JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // show the avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

## 例子
```javascript
async function foo() {
   const result1 = await new Promise((resolve) => setTimeout(() => resolve('1'), 3000));
  console.log(result1);
   const result2 = await new Promise((resolve) => setTimeout(() => resolve('2'), 1000));
  console.log(result2);
}
foo()
```
先输出result1，再输出result2.
