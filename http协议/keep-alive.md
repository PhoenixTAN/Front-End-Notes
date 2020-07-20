# Connect Keep-alive 复用TCP连接

## HTTP/1.0
在HTTP/1.0版本中是没有keep-alive机制的，意味着每次 HTTP 请求都会创建一个新的 TCP 连接，在响应完成后关闭当前 TCP 连接。

## HTTP/1.1
在HTTP/1.0时代，由于 TCP 连接创建成本很高，很多服务器和浏览器使用了了一套非标准的keep-alive机制，用于复用 TCP 连接，当然最后HTTP/1.1将这套东西纳入到了标准中，这个标准就是Connection头，用于客户端和服务端协商是否要复用 TCP 连接，在 HTTP/1.1 版本中默认值就是keep-alive，即保持连接。

- By default, HTTP 1.1 uses persistent connections, where the connection does not automatically close after a transaction. HTTP 1.0, on the other hand, does not have persistent connections by default. If a 1.0 client wishes to use persistent connections, it uses the keep-alive parameter as follows:
```
Connection: keep-alive
```


客户端或服务器发现对方一段时间没有活动，就可以主动关闭连接。不过，规范的做法是，客户端在最后一个请求时，发送 Connection: close，明确要求服务器关闭 TCP 连接。
```
Connection: close
```
