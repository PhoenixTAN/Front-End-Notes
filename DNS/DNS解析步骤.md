# 浏览器根据url去访问DNS服务器查找IP
- 浏览器缓存：浏览器会缓存DNS记录，不过这个时间根据浏览器的不同大概会在（2min-30min）之间。
- 操作系统缓存：如果浏览器缓存不包含所需的记录，则浏览器进行系统调用（Windows中的gethostbyname），查找操作系统本身的DNS缓存。
- 路由器缓存：还找不到就会去查路由器缓存。
- ISP DNS缓存：下一步就会去查ISP的DNS缓存。ISP(Internet Service Provider), 互联网服务提供商。
- 递归搜索：到达ISP这一步之后还找不到就会执行递归搜索，从根域名服务器查到顶级域名服务器，再到目标服务器，直到找到IP地址。
- 返回这个IP给client.

本地DNS服务器: 
www.bu.edu

先问根服务器，再问.edu DNS服务器，再问bu.edu DNS服务器，再问www.bu.eud

.edu根域名


 abc.com.cn 其中 cn 是顶级域名、com 是二级域名、abc 是三级域名，如 abc.com 其中 com 为顶级域名，abc 为二级域名。

![alt text](./Example_of_an_iterative_DNS_resolver.svg)
