# http状态码

1. Informational responses (100–199),
2. Successful responses (200–299),
3. Redirects (300–399),
4. Client errors (400–499),
5. Server errors (500–599).

- 100 Continue
- 200 OK

- 301, 302 重定向
    - 301 Moved Permanently 永久重定向
    - 302 temporary redirection 临时重定向
- 304 Not Modified 资源无更新

- 400 Bad Request: The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.
- 401 Not Authorized
- 403 Forbidden the server understood the request but refuses to authorize it.
- 404 Page Not Found

- 500 Internal Server Error: The server encountered an unexpected condition which prevented it from fulfilling the request.

