# Cross-origin resource sharing (CORS)

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

## HTTP访问控制（CORS）定义

Cross-Origin Resource Sharing (CORS) is a mechanism that **uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin.** A web application executes a cross-origin HTTP request when it requests a resource that has a different origin (domain, protocol, or port) from its own.

CORS是一种机制：使用额外的HTTP请求头告诉浏览器，让在某个运行在某个origin的Web application访问不同origin的资源。

### 先解释一下origin:
Web content's origin is defined by the scheme (protocol), host (domain), and port of the URL used to access it. Two objects have the same origin only when the scheme, host, and port all match.
两个对象同源意味着protocol, host和port都相同。

#### same origin例子
```
http://example.com/app1/index.html
http://example.com/app2/index.html
```
同样的协议--http协议，同样的主机example.com，同样的端口--http默认端口80.


#### different origin
```
http://example.com
http://www.example.com
http://myapp.example.com	
```
主机名不同

An example of a cross-origin request: the front-end JavaScript code served from 
https://domain-a.com uses XMLHttpRequest to make a request for 
https://domain-b.com/data.json.

出于安全原因，浏览器限制从脚本内发起的跨源HTTP请求。 例如，XMLHttpRequest和Fetch API遵循同源策略。 这意味着使用这些API的Web应用程序只能从加载应用程序的同一个域请求HTTP资源，**除非响应报文包含了正确CORS响应头**。
请看下main控制台发生的错误。
```
Access to XMLHttpRequest at 'https://cdn.pinon.io/psr-resource/cde0c7fa-3ecd-44ef-a820-dcffe5b184f6/original' 
from origin 'https://local.dev.pinon.io' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

（译者注：这段描述不准确，并不一定是浏览器限制了发起跨站请求，也可能是跨站请求可以正常发起，但是返回结果被浏览器拦截了。）

怎么解决?
浏览器Network点击Disable cache. 这个是什么原理




