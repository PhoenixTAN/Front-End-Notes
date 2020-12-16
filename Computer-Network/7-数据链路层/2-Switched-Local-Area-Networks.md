# Switched Local Area Networks

- Link-layer addressing
- ARP
- Switch
- VLAN

![alt text](./images/network-connected-by-four-switches.png)

如图，两个服务器，一个路由器，四个交换机。交换机工作在Link-layer，并不认识什么IP地址和路由算法，它使用Link-layer address来发送link-layer frame.

## Link-Layer Addressing and ARP (Address Resolution Protocol)
一个很自然的问题，为什么路由器已经有IP地址了，也还是有一个link-layer地址？我们后面会讲，先剧透一下，ARP会提供一种方法：把IP地址翻译成link-layer addresses.


### Mac addresses (physical address, LAN address, link-layer address)
实际上link-layer address是在host, router and switch的adapter上，adapter也叫network interfaces网卡. 如果一个host或者router有多个网卡，就意味着有多个IP地址和link-layer地址。**一定要注意，交换机是没有link-layer addresses associated with their interfaces that connect to hosts and routers.这是因为，交换机的工作是把包发给目标主机，This is because the job of the link-layer switch is to carry datagrams between hosts and routers; a switch does this job transparently, that is, without the host or router having to explicitly address the frame to the intervening switch.看下图6.16**

![alt text](./images/mac-address.png)

Mac地址的长度为6字节。Mac地址是永久分配的，但是现在我们也可以通过软件来修改，我们接下来的讨论都假设Mac地址是固定的。

每张网卡的Mac地址都是不一样的，网卡在不同厂家生产，如何保证不一样吗？IEEE是管理Mac地址哦那关键的机构，厂家得花钱买。

当一个网卡想要发一个frame给另一个网卡，这个网卡会在frame里面放进目标Mac地址然后发出去。有时候发送者会广播这个frame，用的是Mac广播地址FF-FF-FF-FF-FF-FF.



### Address Resolution Protocol (ARP)

#### Why both IP address and Mac address
1. LAN是会有不同network-layer协议的，并不一定是IP协议，如果一个适配器只有IP地址，而没有中立的Mac地址，适配器就很难直持不同的网络层协议（例如IPX or DECnet).
2. 如果只用IP地址，这个就会被存在适配器的RAM里面，然后每次重启设备都要重新配置IP地址。

我们先讲讲为什么会有将IP地址翻译成link-layer地址的需求。我们看图6.17

![alt text](./images/need-for-arp.png)

为了方便,我们假设交换机广播所有frames. 后面我们会更详细地讲交换机怎么运作.

如果**主机C现在要发东西给主机A**,主机C当然是会带上自己IP和目标IP,当然也会带上自己的Mac地址和目标Mac地址,但他有怎么知道目标Mac地址呢?

这时候ARP模块就起作用了,ARP模块是在主机C里面实现的,他会告诉你目标IP的Mac地址是什么. 这有点像DNS服务,把域名翻译成IP地址，**但ARP协议不同，他只会翻译同一个子网下的IP地址到Mac地址的映射**. 

每个host和router都会在自己的内存里面存了一张**ARP table**.

![alt text](./images/arp-table.png)

好了,回到刚刚的问题.主机C要发东西给主机A,现在主机C要去自己的ARP table查主机A的Mac地址,找到,那就好办,要是找不到呢?

先引入一个属于ARP packet. An ARP packet has several fields, including the sending and receiving IP and MAC addresses. Both ARP query and response packets have the same format. The purpose of the ARP query packet is to **query all the other hosts and routers on the subnet to determine the MAC address corresponding to the IP address that is being resolved**.

现在主机C就会进行广播找人,使用广播地址FF-FF-FF-FF-FF-FF作为目标地址. 由于是广播地址,所有接到这个包的人,都会再广播一遍. 只要有一个设备他的ARP Table里面有主机C的Mac地址,就会回复一个response ARP packet, 但这不能是一个广播,只能是回复给主机C. 请详细思考这个问题.

### Sending a Datagram off the Subnet
问题又来了,那我如果要把包发到外网怎么办?我总不能还知道外网的某个主机的Mac地址吧. 我们看图6.19

![alt text](./images/send-frame-off-subnet.png)

左边为子网1, 111.111.111.xxx/24. 
右边为子网2, 222.222.222/24.

我们想想子网1的主机111.111.111.111怎么发一个包到子网2的主机222.222.222.222? 实际上会先发到自己的网关路由器,也就是111.111.111.110这时候的目标Mac地址就是E6-E9-00-17-BB-4B. 然后你的网关路由器就会根据路由表去找要从哪个interface发出去, 然后会选择从222.222.222.220发出求,这个包就会从这个接口的ARP Table找到目标主机222.222.222.222的Mac地址,然后作为目标Mac地址.

## Ethernet

维基百科:

以太网（英語：Ethernet）是一种计算机局域网技术。 IEEE組織的IEEE 802.3标准制定了以太网的技术标准，它规定了包括物理层的连线、电子信号和介质访问控制的内容。 以太网是目前应用最普遍的局域网技术，取代了其他局域网标准如令牌环、FDDI和ARCNET。

以太网的标准拓扑结构为总线型拓扑，但目前的快速以太网（100BASE-T、1000BASE-T标准）为了减少冲突，将能提高的网络速度和使用效率最大化，使用交换机（Switch hub）来进行网络连接和组织。如此一来，以太网的拓扑结构就成了星型；但在逻辑上，以太网仍然使用总线型拓扑和CSMA/CD（Carrier Sense Multiple Access/Collision Detection，即载波多重访问/碰撞侦测）的总线技术。


以太网发展史:

The original Ethernet LAN was invented in the mid-1970s by Bob Metcalfe and David Boggs. The original Ethernet LAN used a **coaxial bus** to interconnect the nodes. **Bus topologies** for Ethernet actually persisted throughout the 1980s and into the mid-1990s. Ethernet with a bus topology is a broadcast LAN — all transmitted frames travel to and are processed by all adapters connected to the bus. Recall that we covered Ethernet’s CSMA/CD multiple access protocol with binary exponential backoff in Section 6.3.2.

By the late 1990s, most companies and universities had replaced their LANs with Ethernet installations using a **hub-based star topology**. In such an installation the hosts (and routers) are directly connected to **a hub with twisted-pair copper wire**. **A hub is a physical-layer device** that acts on individual bits rather than frames. When a bit, representing a zero or a one, arrives from one interface, the hub simply recreates the bit, boosts its energy strength, and transmits the bit onto all the other interfaces. Thus, Ethernet with a hub-based star topology is also a broadcast LAN—whenever a hub receives a bit from one of its interfaces, it sends a copy out on all of its other interfaces. In particular, if a hub receives frames from two different interfaces at the same time, a **collision occurs** and the nodes that created the frames must retransmit.

In the early 2000s Ethernet experienced yet another major evolutionary change. Ethernet installations continued to use a star topology, **but the hub at the center was replaced with a switch**. 最终集线器被交换机所取代.

我们会详细讲交换机为什么碰撞会少一点. 交换机还是一个 bona-fide store-and-forward packet switch.

### Ethernet Frame Structure
![alt text](./images/frame-structure.png)

- **Data field (46 - 1500 bytes)**. The maximum transmission unit
(MTU) of Ethernet is 1,500 bytes. This means that if the IP datagram exceeds 1,500 bytes, then the host has to fragment the datagram. The minimum size of the data field is 46 bytes. This means that if the IP datagram is less than 46 bytes, the data field has to be “stuffed” to fill it out to 46 bytes.
- **Destination address (6 bytes)**. 
- **Source address (6 bytes)**.
- **Type field (2 bytes)**. The type field permits Ethernet to multiplex network-layer protocols. 
- **Cyclic redundancy check (CRC) (4 bytes)**.
- **Preamble (8 bytes)**. Each of the first 7 bytes of the preamble has a value of 10101010; the last byte is 10101011. The first 7 bytes of the preamble serve to “wake up” the receiving adapters and to synchronize their clocks to that of the sender’s clock. Why should the clocks be out of synchronization? Keep in mind that adapter A aims to transmit the frame at 10 Mbps, 100 Mbps, or 1 Gbps, depending on the type of Ethernet LAN.

## Link-Layer Swithes

We’ll see that the switch itself is **transparent** to the hosts and routers in the subnet; that is, a host/router addresses a frame to another host/router (rather than addressing the frame to the switch) and happily sends the frame into the LAN, unaware that a switch will be receiving the frame and forwarding it. 

### Forwarding and Filtering
- **Filtering** is the switch function that determines whether a frame should be forwarded to some interface or should just be dropped. 
- **Forwarding** is the switch function that determines the interfaces to which a frame should be directed, and then moves the frame to those interfaces.

![alt text](./images/switch-table.png)

Switch filtering and forwarding are done with a switch table.  The switch table contains entries for some, but not necessarily all, of the hosts and routers on a LAN. An entry in the switch table contains 
- (1) a MAC address, 
- (2) the switch interface that leads toward that MAC address, 
- (3) the time at which the entry was placed in the table.

How does switch work?
先来假定一个场景. A frame with destination address DD-DD-DD-DD-DD-DD arrives at the switch on interface x. The switch indexes its table with the MAC address. There are three possible cases:
- There is **no entry in the table** for DD-DD-DD-DD-DD-DD. The switch **broadcasts** the frame.
- There is an **entry** in the table, **associating DD-DD-DD-DD-DD-DD with interface x**. In this case, the frame is coming from a LAN segment that contains adapter DD-DD-DD-DD-DD-DD. There being no need to forward the frame to any of the other interfaces, the switch performs the **filtering function by discarding the frame**.
- There is an entry in the table, associating DD-DD-DD-DD-DD-DD **with interface y != x**. In this case, the frame needs to be forwarded to the LAN segment attached to interface y. The switch performs its **forwarding function** by putting the frame in an output buffer that precedes interface y.


### Self-Learning

How does this **switch table get configured** in the first
place?

A switch has the wonderful property (particularly for the already-overworked network administrator) that its table is built automatically, dynamically, and autonomously—without any intervention from a network administrator or from a configuration protocol. In other words, switches are **self-learning**. This capability is accomplished as follows:

1. The switch table is initially empty.
2. For each incoming frame received on an interface, the switch stores in its table (1) the MAC address in the frame’s source address field, (2) the interface from which the frame arrived, and (3) the current time. In this manner the switch records in its table the LAN segment on which the sender resides. If every host in the LAN eventually sends a frame, then every host will eventually get recorded in the table.
3. The switch deletes an address in the table if no frames are received with that address as the source address after some period of time (the **aging time**).

### Properties of Link-Layer Switching

- **Elimination of collisions**. In a LAN built from switches (and without hubs), there is no wasted bandwidth due to collisions! The switches buffer frames and never transmit more than one frame on a segment at any one time. As with a router, the maximum aggregate throughput of a switch is the sum of all the switch interface rates. Thus, switches provide a significant performance improvement over LANs with broadcast links.
- **Heterogeneous links**. Because a switch isolates one link from another, the different links in the LAN can operate at **different speeds** and can run over **different media**. For example, the uppermost switch in Figure 6.15 might have three1 Gbps 1000BASE-T copper links, two 100 Mbps 100BASEFX fiber links, and one 100BASE-T copper link. Thus, a switch is ideal for mixing legacy equipment with new equipment.
- **Management**. In addition to providing enhanced security (see sidebar on Focus on Security), a switch also eases network management. For example, if an adapter malfunctions and continually sends Ethernet frames (called a jabbering adapter), a switch can detect the problem and internally disconnect the malfunctioning adapter. With this feature, the network administrator need not get out of bed and drive back to work in order to correct the problem. Similarly, a cable cut disconnects only that host that was using the cut cable to connect to the switch. In the days of coaxial cable, many a network manager spent hours “walking the line” (or more accurately, “crawling the floor”) to find the cable break that brought down the entire network. Switches also gather statistics on bandwidth usage, collision rates, and traffic types, and make this information available to the network manager.


## Virtual Local Area Networks (VLANS)

![alt text](./images/network-connected-by-four-switches.png)



