# Cookie和Session如何保持登录状态

https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&mid=2247484755&idx=6&sn=3a370551b0ee800f3bcad8ff37a72b9d&chksm=ebd74452dca0cd44f454ca8aa006d352c6994bb7ea955b5ca5f2ec2b227792010939bfa25532###rd

## 流程
1. 浏览器发送http请求，服务器返回带有cookie的response，浏览器将cookie存在本地。Cookie会包含一个服务器所创建的SessionId，里面包含了相关登录信息。
2. Cookie是跟域名绑定的，浏览器再次向域名发起http请求的时候，会自动带上Cookie信息（包括了sessionId），让服务器验证，服务器根据sessionId在内存里面找相关信息，快速验证一下。
3. 现在用户把浏览器关了，再打开浏览器访问这个服务器，依然是浏览器自动带上Cookie（包括了sessionId）给服务器。
4. 现在用户关闭浏览器，Cookie的有效期是1天。我们很容易想到，服务器如果长时间得不到这个用户的访问，就没有必要再存这个用户的sessionId，用户长时间不访问，服务器就会把这个session会话删掉，防止内存不足。
5. 下午，用户又打开了浏览器，访问这个服务器，浏览器自动带上了Cookie（包括了sessionId）给服务器，服务器发现并没有这个sessionId，会看Cookie的信息，然后再重新创建一个sessionId.这就是为什么谷歌账号能保持好几天都不用登录。

## Cookie
网页之间的交互是通过HTTP协议传输数据的，而Http协议是无状态的协议。无状态的协议是什么意思呢？一旦数据提交完后，浏览器和服务器的连接就会关闭，再次交互的时候需要重新建立新的连接。

**Cookie的流程**：浏览器访问服务器，如果服务器需要记录该用户的状态，就使用response向浏览器发送一个Cookie，浏览器会把Cookie保存起来。当浏览器再次访问服务器的时候，浏览器会把请求的网址连同Cookie一同交给服务器。

### Cookie的有效期
Cookie的有效期是通过setMaxAge()来设置的。
- 如果MaxAge为正数，浏览器会把Cookie写到硬盘中，只要还在MaxAge秒之前，登陆网站时该Cookie就有效。
- 如果MaxAge为负数，Cookie是临时性的，仅在本浏览器内有效，关闭浏览器Cookie就失效了，Cookie不会写到硬盘中。Cookie默认值就是-1。
- 如果MaxAge为0，则表示删除该Cookie。Cookie机制没有提供删除Cookie对应的方法，把MaxAge设置为0等同于删除Cookie.

### Cookie其他细节
1. Cookie不可跨域名性
    浏览器判断一个网站是否能操作另一个网站的Cookie的依据是域名。

2. Cookie的安全属性
    HTTP协议不仅仅是无状态的，而且是不安全的！如果不希望Cookie在非安全协议中传输，可以设置Cookie的secure属性为true，浏览器只会在HTTPS和SSL等安全协议中传输该Cookie。
    当然了，设置secure属性不会将Cookie的内容加密。如果想要保证安全，最好使用md5算法加密。

## Session
Session 是另一种记录浏览器状态的机制。不同的是**Cookie保存在浏览器中，Session保存在服务器中**。用户使用浏览器访问服务器的时候，服务器把用户的信息以某种的形式记录在服务器。

Session比Cookie使用方便，Session可以解决Cookie解决不了的事情【Session可以存储对象，Cookie只能存储字符串。

### Session的生命周期和有效期
1. Session在用户第一次访问服务器Servlet，jsp等动态资源就会被自动创建，Session对象保存在内存里。
2. 如果访问HTML,IMAGE等静态资源Session不会被创建。
3. Session生成后，只要用户继续访问，服务器就会更新Session的最后访问时间，无论是否对Session进行读写，服务器都会认为Session活跃了一次。
4. 由于会有越来越多的用户访问服务器，因此Session也会越来越多。为了防止内存溢出，服务器会把长时间没有活跃的Session从内存中删除，这个时间也就是Session的**超时时间**。

### Session如何为某个用户创建呢

HTTP协议是无状态的，Session不能依据HTTP连接来判断是否为同一个用户。

**于是乎：服务器向用户浏览器发送了一个名为JESSIONID的Cookie，它的值是Session的id值。其实Session依据Cookie来识别是否是同一个用户。**


### Cookie被用户禁用了怎么办
Java Web提供了解决方法：URL地址重写

## Cookie常用属性值
1. Expires 过期日期
2. Max-age 存活时间
3. Domain 对应的域, 可以设置以供多个同域名主机共享cookie, 或限制cookie可使用的域
4. Path 控制哪些路径的页面可以访问cookie
5. Secure 可以http传输或只能https, 防中间人攻击
6. HttpOnly 设置以禁用js的Document.cookieAPI, 防XSS



