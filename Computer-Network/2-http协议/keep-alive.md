# Connect Keep-alive 复用 TCP 连接

## HTTP/1.0

在 HTTP/1.0 版本中是没有 keep-alive 机制的，意味着每次 HTTP 请求都会创建一个新的 TCP 连接，在响应完成后关闭当前 TCP 连接。

## HTTP/1.1

在 HTTP/1.0 时代，由于 TCP 连接创建成本很高，很多服务器和浏览器使用了了一套非标准的 keep-alive 机制，用于复用 TCP 连接，当然最后 HTTP/1.1 将这套东西纳入到了标准中，这个标准就是 Connection 头，用于客户端和服务端协商是否要复用 TCP 连接，在 HTTP/1.1 版本中默认值就是 keep-alive，即保持连接。

- By default, HTTP 1.1 uses persistent connections, where the connection does not automatically close after a transaction. HTTP 1.0, on the other hand, does not have persistent connections by default. If a 1.0 client wishes to use persistent connections, it uses the keep-alive parameter as follows:

```
Connection: keep-alive
```

客户端或服务器发现对方一段时间没有活动，就可以主动关闭连接。不过，规范的做法是，客户端在最后一个请求时，发送 Connection: close，明确要求服务器关闭 TCP 连接。

```
Connection: close
```

### RFC

https://www.w3.org/Protocols/rfc2616/rfc2616-sec8.html

part of Hypertext Transfer Protocol -- HTTP/1.1
RFC 2616 Fielding, et al.

**A significant difference between HTTP/1.1 and earlier versions of HTTP is that persistent connections are the default behavior of any HTTP connection.** That is, unless otherwise indicated, the client SHOULD assume that the server will maintain a persistent connection, even after error responses from the server.

Persistent connections provide a mechanism by which a client and a server can signal the close of a TCP connection. This signaling takes place using the Connection header field (section 14.10). Once a close has been signaled, the client MUST NOT send any more requests on that connection.

## TCP keep alive vs HTTP keep alive
RFC 文档
https://tools.ietf.org/html/rfc1122#page-101

Implementors MAY include "keep-alives" in their TCP implementations, although this practice is not universally accepted. If keep-alives are included, the application MUST be able to turn them on or off for each TCP connection, and they MUST default to off.

Keep-alive packets MUST only be sent when no data or acknowledgement packets have been received for the connection within an interval.  This interval MUST be configurable and MUST default to no less than two hours.

### http keep alive

## 为什么 post 方法是发两个包，get 是发一个

RFC 官方文档
The purpose of the 100 (Continue) status (see section 10.1.1) is to allow a client that is sending a request message with a request body to determine if the origin server is willing to accept the request (based on the request headers) before the client sends the request body. In some cases, it might either be inappropriate or highly inefficient for the client to send the body if the server will reject the message without looking at the body.

## 维基百科 HTTP persistent connection
HTTP persistent connection, also called HTTP keep-alive, or HTTP connection reuse, is the idea of using a single TCP connection to send and receive multiple HTTP requests/responses, as opposed to opening a new connection for every single request/response pair. The newer HTTP/2 protocol uses the same idea and takes it further to allow multiple concurrent requests/responses to be multiplexed over a single connection.

