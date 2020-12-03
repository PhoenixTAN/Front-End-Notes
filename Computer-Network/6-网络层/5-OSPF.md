# Intra-AS Routing in the Internet: OSPF (Open Shortest Path First)

到目前为止，我们路由算法的讨论，都是基于整个网络的路由器都是使用一样的路由算法这一假设的。实际上，this model and its view of a homogenous set of routers all executing the same routing algorithm is simplistic for two important reasons:
- Scale. 但是随着网络规模变大，路由表也会过于膨胀，增大了路由信息交换的代价。
- Administrative autonomy. 前面讲过，互联网是不同ISP互相连通的网络。每个ISP都有自己管理和配置自己的网络的需要。


Both of these problems can be solved by organizing routers into **autonomous systems (ASs)**, with each AS consisting of a group of routers that are under the same administrative control.

An autonomous system is identified by its **globally unique autonomous system number (ASN)**. AS numbers, like IP addresses, are assigned by ICANN regional registries.

Routers within the same AS all run the same routing algorithm and have information about each other. The routing algorithm running within an autonomous system is called an **intra-autonomous system routing protocol**.

## Open Shortest Path First (OSPF)

OSPF routing and its closely related cousin, IS-IS, are widely used for intra-AS routing in the Internet.

Open的意思是开源。

OSPF is a **link-state protocol** that uses flooding of link-state information and a **Dijkstra’s** least-cost path algorithm.

With OSPF, each router constructs a complete topological map (that is, a graph) of the entire autonomous system. Each router then locally runs Dijkstra’s shortest-path algorithm to determine a shortest-path tree to all subnets, with itself as the root node.

每个路由器都会有整个网络的拓扑图，各自跑迪杰斯特拉算法。Link costs由管理员设置。

With OSPF, a router broadcasts routing information to all other routers in the autonomous system, not
just to its neighboring routers. 
