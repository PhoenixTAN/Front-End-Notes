
# http 1.0 vs http 1.1

1. Caching
2. Bandwidth optimization
3. Network connection management
4. Message transmission
5. Internet address conservation
6. Error notification
7. Security, integrity, and authentication
8. Content negotiation

## Caching
Cache-Control是新header.

## Bandwidth optimization
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



