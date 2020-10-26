# Lab1

You should see at least two interfaces:
- **The control interface.** This is the interface you use to access the node, e.g. ssh into your host. The control interface is mainly used for control traffic, i.e. traffic for controlling the node and the experiment. **(likely something like 172.17.1.9)**
- **The data interface.** This is the interface that is used for sending experimental traffic. This is the interface that connects to the other hosts of your experiment through GENI. The links between these interfaces are the ones that allow you to run non-IP experiments. The data interface is the one that has an IP address and mask that match what you configured before you reserved your resources. **(likely something like 10.10.1.2)**


## server
```
ziqi1756@server:~$ ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.1.31  netmask 255.240.0.0  broadcast 172.31.255.255
        inet6 fe80::69:80ff:fefe:a988  prefixlen 64  scopeid 0x20<link>
        ether 02:69:80:fe:a9:88  txqueuelen 1000  (Ethernet)
        RX packets 881  bytes 98702 (98.7 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 978  bytes 89849 (89.8 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

eth1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.10.1.2  netmask 255.255.255.0  broadcast 10.10.1.255
        inet6 fe80::84:eaff:fef6:6cd4  prefixlen 64  scopeid 0x20<link>
        ether 02:84:ea:f6:6c:d4  txqueuelen 1000  (Ethernet)
        RX packets 32  bytes 2269 (2.2 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 13  bytes 1387 (1.3 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

## client
```
ziqi1756@client:~$ sudo ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.1.28  netmask 255.240.0.0  broadcast 172.31.255.255
        inet6 fe80::e4:daff:fed9:d6ed  prefixlen 64  scopeid 0x20<link>
        ether 02:e4:da:d9:d6:ed  txqueuelen 1000  (Ethernet)
        RX packets 1021  bytes 110363 (110.3 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1096  bytes 108849 (108.8 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

eth1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.10.1.1  netmask 255.255.255.0  broadcast 10.10.1.255
        inet6 fe80::d0:b3ff:fe2b:4b27  prefixlen 64  scopeid 0x20<link>
        ether 02:d0:b3:2b:4b:27  txqueuelen 1000  (Ethernet)
        RX packets 45  bytes 3189 (3.1 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 24  bytes 3297 (3.2 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

```

ziqi1756@client:~$ iperf -c 10.10.1.2

Client connecting to 10.10.1.2, TCP port 5001
TCP window size: 85.0 KByte (default)

[  3] local 10.10.1.1 port 59844 connected with 10.10.1.2 port 5001
[ ID] Interval       Transfer     Bandwidth
[  3]  0.0-10.1 sec   116 MBytes  97.0 Mbits/sec

Client connecting to 172.17.1.31, TCP port 5001
TCP window size: 85.0 KByte (default)

[  3] local 172.17.1.28 port 60934 connected with 172.17.1.31 port 5001
[ ID] Interval       Transfer     Bandwidth
[  3]  0.0-10.0 sec  3.81 GBytes  3.27 Gbits/sec

```
