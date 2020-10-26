# HTTP (HyperText Transfer Protocol)

HTTP uses TCP as its underlying transport protocol. Once the connection is established, the browser and the server processes access TCP through their socket interfaces.

## Non-persistent and persistent connection

### Non-persistent connection
假设一个HTML文件里面引用了10张图片，这11个文件都放在同一个服务器上。请求发出去后，发生如下事情：

1. HTTP client初始化TCP连接，使用80端口. Associated with the TCP connection, there will be a socket at the client and a socket at the server.
2. HTTP client sends an HTTP request message to the server via its socket.
3. HTTP server process receives the request via its socket and then retrieves the html file from its storage (RAM or disk), and send it back to the client.
4. HTTP server tells TCP to close the TCP connection.
5. HTTP client receives the HTML file and the TCP connection terminates. Then the client finds the references to the 10 images. 
6. 每取一张图片，前面4步都会重复一遍。

### Persistent connection
With **HTTP 1.1 persistent connections**, the server leaves the TCP connection open after sending a
response. Subsequent requests and responses between the same client and server can be sent over
the same connection. 

In particular, an entire Web page (in the example above, the base HTML file and the 10 images) can be sent over a single persistent TCP connection. Moreover, multiple Web pages
residing on the same server can be sent from the server to the same client over a single persistent TCP connection. These requests for objects can be made back-to-back, **without waiting for replies to pending requests (pipelining)**. Typically, the HTTP server closes a connection when it isn’t used for a certain time (a configurable timeout interval). When the server receives the back-to-back requests, it sends the objects back-to-back. **The default mode of HTTP uses persistent connections with pipelining.** 

Most recently,**HTTP/2** [RFC 7540] builds on HTTP 1.1 by allowing multiple requests and replies to be interleaved in the same connection, and a mechanism for prioritizing HTTP message requests and replies within this connection.


## http 1.0 vs http 1.1

1. Caching
2. Bandwidth optimization
3. Network connection management
4. Message transmission
5. Internet address conservation
6. Error notification
7. Security, integrity, and authentication
8. Content negotiation

### Caching
Cache-Control是新header.

### Bandwidth optimization
- new status code: 100

Some HTTP requests (for example, the PUT or
POST methods) carry request bodies, which may be arbitrarily long. 
If, the server is not willing to accept the request, perhaps because of an authentication
failure, it would be a waste of bandwidth to transmit such a large request body.

- Range header
client请求部分资源
服务器response status code 206 (Partial Content)

## Network connection management
HTTP almost always uses TCP as its transport
protocol. TCP works best for long-lived connections,
but the original HTTP design used a new TCP connection for each request, so each request incurred the
cost of setting up a new TCP connection (at least
one round-trip time across the network, plus several
overhead packets).

- Conntection header
    - Persistent connections
    Some HTTP=1.0 implementations, however, use a Keep-Alive header (described in [12]) to request that a connection persist.
    - HTTP=1.1 makes persistent connections the default.
    - the protocol permits it to send a `Connection: close` header to inform the recipient that the connection will not be reused.

- Pipelining
a client need not wait to receive the response for one request before sending another request on the same connection. In
fact, a client could send an arbitrarily large number of requests over a TCP connection before receiving any of the responses. This practice, known as pipelining, can greatly improve performance[31].

## Message transmission
- Transfer-Encoding: chunked



