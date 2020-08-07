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


- \<script src="...">\</script> 标签嵌入跨域脚本。语法错误信息只能被同源脚本中捕捉到。
- \<link rel="stylesheet" href="..."> 标签嵌入CSS。由于CSS的松散的语法规则，CSS的跨域需要一个设置正确的 HTTP 头部 Content-Type 。不同浏览器有不同的限制： IE, Firefox, Chrome, Safari (跳至CVE-2010-0051)部分 和 Opera。
- 通过 \<img> 展示的图片。支持的图片格式包括PNG,JPEG,GIF,BMP,SVG,...
- 通过 \<video> 和 \<audio> 播放的多媒体资源。
- 通过 \<object>、 \<embed> 和 <applet> 嵌入的插件。
- 通过 @font-face 引入的字体。一些浏览器允许跨域字体（ cross-origin fonts），一些需要同源字体（same-origin fonts）。
- 通过 \<iframe> 载入的任何资源。站点可以使用 X-Frame-Options 消息头来阻止这种形式的跨域交互。

## 如何允许跨源访问
可以使用 CORS 来允许跨源访问。CORS 是 HTTP 的一部分，它允许服务端来指定哪些主机可以从这个服务端加载资源。


## 解锁canvas导出图片跨域的N种姿势
https://juejin.im/post/5c46b58cf265da617265c876

### 一、将图片转换成base64
页面直接img显示的图片，而img并不会触发跨域，所以当页面打开后img会请求到CDN的图片并缓存到本地，而缓存不带CORS配置，然后请求直接访问本地图片，触发了同源限制，导致跨域报错。

图片变成base64就没有域名一说了，自然不存在跨域。

**所以你disable cache就行了？**
一开始是用img的src获取CDN图片的，src获取不受跨域限制，然后这个图片缓存了起来，当使用Axios.get再次请求的时候，是受到跨域限制的，跨域的请求怎么能访问浏览器本地缓存呢?所以你的浏览器设置disable cache就好了，那浏览器就不会去访问缓存，而是再次发送一个请求。

**怎么解决？**
加了 crossorigin 属性，则表明图片就一定会按照 CORS 来请求图片。而通过CORS 请求到的图片可以再次被复用到 canvas 上进行绘制。换言之，如果不加 crossorigin 属性的话，那么图片是不能再次被复用到 canvas 上去的。

**你总不能让用户去disable cache吧**
有挺多解决方法的

1. 你可以让CDN回复的时候加上`cache-control: no-cache`，那么再次请求的时候就不会走cache.
2. 防止使用缓存，ajax请求图片是加上随机参数，url = url + '?s=' + Math.random().toString()
3. 配置CDN的CORS，使其直接返回跨域配置 （啥意思）

### 二、图片服务器设置允许跨域
即请求图片返回的响应头中带有Access-Control-Allow-Origin切值为 *（允许所有网站跨域请求）或者当前网站域名（只允许固定域名下跨域请求）, 然后前端在加载图片是设置图片跨域属性img.crossOrigin="anonymous"。

如果你用的htmlToCanvas插件导出图片的话，则需要添加useCORS: true配置项,原理跟方法二一样,当然前置条件是图片域名允许跨域。

### JSONP
JSONP 的原理就是利用 \<script> 标签的 src 属性没有跨域的限制，通过指向一个需要访问的地址，由服务端返回一个预先定义好的 Javascript 函数的调用，并且将服务器数据以该函数参数的形式传递过来，此方法需要前后端配合完成。


https://juejin.im/post/5cad99796fb9a068ab40a29a#heading-11

对于简单请求，浏览器直接发起 CORS 请求，具体来说就是服务器端会根据请求头信息中的 origin 字段（包括了协议 + 域名 + 端口），来决定是否同意这次请求。


## 跨站脚本攻击—XSS
XSS 是跨站脚本攻击（Cross Site Scripting）的简写，但是从首写字母命名的方式来看，应该取名 CSS，但这样就和层叠样式表（Cascading Style Sheets，CSS）重名了，所以取名为 XSS。

XSS 攻击，一般是指攻击者通过在网页中注入恶意脚本，当用户浏览网页时，恶意脚本执行，控制用户浏览器行为的一种攻击方式。

### XSS 危害
https://portswigger.net/web-security

- 窃取用户Cookie，获取用户隐私，盗取用户账号。
- 劫持用户（浏览器）会话，从而执行任意操作，例如进行非法转账、强制发表日志、发送电子邮件等。
- 强制弹出广告页面，刷流量等。
- 传播跨站脚本蠕虫，网页挂马等。
- 结合其他漏洞，如 CSRF 漏洞，实施进一步的攻击。


### 服务器代理

浏览器有跨域限制，但是服务器不存在跨域问题，所以可以由服务器请求所要域的资源再返回给客户端。

一般我们在本地环境开发时，就是使用 webpack-dev-server 在本地开启一个服务进行代理访问的。

