# AJAX Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）

通过在后台与服务器进行少量数据交换，AJAX 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

传统的网页（不使用 AJAX）如果需要更新内容，必需重载整个网页面。

```javascript
// ajax
const url = 'https://jsonplaceholder.typicode.com/todos';

const xmlhttp = new XMLHttpRequest();
// xmlhttp.open(method, url, isAsync);
xmlhttp.open('GET', url, true);
// method：请求的类型；GET 或 POST
// url：文件在服务器上的位置
// async：true（异步）或 false（同步）

xmlhttp.onreadystatechange = () => {
  if ( xmlhttp.readyState === 4 && xmlhttp.status === 200 ) {
    console.log(xmlhttp.responseText);
  }
}

xmlhttp.send(); // 如果是post请求，这里放一个请求体参数
```

## 服务器响应
- responseText: 获得字符串形式的响应数据。
- responseXML: 获得 XML 形式的响应数据。

## onreadystatechange
onreadystatechange	存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。

XMLHttpRequest readyState
- 0: 请求未初始化
- 1: 服务器连接已建立
- 2: 请求已接收
- 3: 请求处理中
- 4: 请求已完成，且响应已就绪

status
- 200
- 404
- ...


## Ajax封装成promise

```javascript
const url = 'https://jsonplaceholder.typicode.com/todos';

const fetchPromise = (url) => {
  return new Promise( (resolve, reject) => {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, true);
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        if ( xmlhttp.status === 200 ) {
          resolve(xmlhttp.responseText);
        }
        else {
          const errInfo = { code: xmlhttp.status, response: xmlhttp.response }
          reject(errInfo);
        }
      }
    }
    xmlhttp.send();
  });
}

fetchPromise(url)
.then((response) => {
  console.log(response);
})
.catch((err) => {
  console.log(err);
});
```

## 发5次请求，每隔2秒发一个，直到成功为止
```javascript
const autoFetchPromise = (url, maxRetryTimes, delay) => {
    if ( maxRetryTimes <= 0 ) {
      return Promise.reject(new Error("Reach retry limit."));
    }
  
    return fetchPromise(url).catch((err) => {
      console.log('fail', err);
      return new Promise( (resolve) => {
        setTimeout( () => {
           autoFetchPromise(url, maxRetryTimes-1, delay);
        }, delay);
      });
    });
}


autoFetchPromise("url", 3, 2000)
.then( (data) => {
  console.log(data);
})
.catch(
  (error) => {
     console.log(error);
  }
);
```

