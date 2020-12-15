# CS 655: Computer Networks Final Review Questions


**Q1. Consider a transport protocol over a wide-area network. The protocol uses an error control scheme where every ACK (acknowledgment) carries the sequence number of the last in-sequence packet seen by the receiver (also called the cumulative acknowledgment).** 

**(a) How can a sender use repeated (duplicate) ACKs to improve its detection of packet loss? Would you use a different number of repeated ACKs depending on whether the network is connectionless or connection-oriented? Explain.** 

**(b) An extension to the basic scheme in part (a) is for each ACK from a receiver to carry, in addition to the cumulative acknowledgement, the sequence number of the packet that caused the ACK to be sent. Under this scheme, what do ACKs contain when a receiver receives packets with sequence numbers 5, 7, 8, 10? What should the sender do upon the receipt of each ACK? Does the additional information carried in each ACK help improve performance? If so, explain why.**


**Q2. A group of N users located in the same building are all using the same remote computer via a connection-oriented network. On the average, a user generates L data packets per hour of P bytes each. The packet carrier charges C cents per byte of user data transported, plus X cents per hour for each virtual circuit open. Under what conditions is it cost effective to multiplex all N transport connections onto the same virtual circuit, if such multiplexing adds 2 bytes of data to each packet? Assume that even one virtual circuit has enough capacity for all users. Comment on when it becomes more likely that such multiplexing is beneficial. [Hint: compute cost expressions for the case when one virtual circuit is used and the case when N virtual circuits are used.]**

**Q3. Describe the Split-Horizon and Split-Horizon with Poison Reverse heuristics used by RIP. Explain how they address the problem of routing loops.**

**Q4. Consider an arbitrary network topology that contains cycles/loops. If a message is flooded over such a network, the message can loop. Briefly describe two techniques to avoid this message-looping problem completely.**

**Q5. In IP, why is it necessary to have one address per interface, rather than just one address per host?**

A router connecting several networks must be part of each network.

**Q6. In IP, the checksum covers only the header and not the data. Why do you suppose this design was chosen?**

Transport Layer does the checksum and link-layer has the CRC.

**Q7. In a global internet, for two machines on the same subnet to communicate, they need to know each other's physical address. So, the source machine has to map the internet address of the destination into a physical address.** 

**(a) Why is this address mapping important? Couldn't the two machines just communicate using their internet addresses?**

**(b) Describe at least two solutions to address mapping. Describe the conditions under which each solution is appropriate. State any advantages or disadvantages each solution might have.**

**Q8.**

**(a) In a global internet, different subnets may have different Maximum Transfer Unit (MTU). Why is there a different MTU for different subnets?**

**(b) An intermediate router must fragment the internet packet if its size is larger than the MTU of the subnet over which the packet will be routed. Two approaches can be used to reassemble a fragmented packet. The first approach is to reassemble it immediately after the subnet with smaller MTU. A second approach is to reassemble the fragmented packet at the destination host. What are the advantages and disadvantages of each approach to reassembly?**

**(c) A TCP segment of 1500 bytes is to be transmitted over a network with MTU of 252 bytes. Assuming the header in each IP datagram requires 20 bytes, would fragmentation take place? Explain why or why not? If fragmentation takes place, derive the number of datagrams (fragments) required. Also, show how many bytes are in each fragment, and how many of those bytes correspond to headers and data (payload) fields.**

**Q9. Fragmentation of an IP datagram takes place if its size is larger than the MTU of the subnet over which the datagram will be routed. Most IP datagram reassembly algorithms have a timer to avoid having a lost fragment tie up reassembly buffers forever. Suppose a datagram is fragmented into four fragments. The first three fragments arrive, but the last one is delayed. Eventually the timer goes off and the three fragments in the receiver's memory are discarded. A little later, the last fragment stumbles in. What should be done with it?**

**Q10. What are the CIDR addresses for a network and its two subnets, if the network’s addresses all start with 135.104, and one subnet should support 500 hosts and the other subnet should support 4000 hosts?**


**Q11. How many addresses are spanned by the CIDR address 205.12.192.0/20, and what range do they span?**


**Q12. The new IP protocol (IPv6) uses 16-byte addresses. When IPv6 is employed, does the ARP protocol have to be changed? If so, are the changes conceptual or technical?**


**Q13. One IP option is loose "source route". A datagram with this option carries in its header a list of IP addresses of routers that the datagram must visit on its way to the destination. Successive routers specified in the list do not have to be neighbors (i.e. directly connected). In general, the processing cost of options in IP routers is typically high. Specifically, a datagram with no options has a fixed length header, which is processed very fast after loading its five 32-bit words in as many registers. On the other hand, datagrams with options are processed slowly and sometimes with a lower priority to limit performance loss.**


**(a) Devise an alternative technique to specify a loose source route that does not entail the performance penalty associated with the use of options, even if the source sends only one datagram. Assume no fragmentation is ever needed.** 

**(b) Consider a situation where we want to specify a loose source route from host A to host B through router C for a datagram carrying a TCP segment. Using IP options, this datagram looks as shown in Figure below. Using your alternative technique in (a), what will the datagram look like?**

```
source --> protocol option
destination type
-------------------------------------------------------
| A --> B | TCP | C | TCP header + data |
-------------------------------------------------------
<---------- IP header ------------><------- data ------>
```

**Q14. Why is the data link layer in IEEE 802 LANs divided into sublayers? What does each sublayer implement?**

**Q15. Describe at least one way by which bit-oriented framing methods achieve data transparency, i.e. make sure that the closing flag does not appear within the frame.**


**Q16. Suppose you are connecting ethernet segments together to build a campus-wide network. Describe three different ways a given pair of segments might be connected. For each, briefly discuss the ramifications (e.g., limitations, advantages, disadvantages).**


**Q17. List at least three reasons why would an Ethernet adaptor accept (pass to the host’s memory) a frame.**


**Q18. Although CSMA/CD is still needed for legacy LAN configurations, it is not needed in modern Ethernet networks where computers and Ethernet switches are connected via full-duplex point-to-point links. Explain why.**

**Q19. On an Ethernet, IP addresses are resolved by using the ARP protocol to obtain corresponding Ethernet addresses. With the help of a diagram, explain how ARP works.**

**Q20. Describe a resource discovery protocol that allows mobile IP users to rediscover the location of local area network resources (e.g. local printer) each time they move to a different LAN. Your protocol should allow the mobile user to request the location of any type of resource any time the user needs to. Your protocol can make use of existing TCP/IP protocols. Specify the format of your protocol messages and at which layer of the TCP/IP protocol stack your protocol belongs. Your protocol should be simple and flexible!**


**Q21. Why can’t the CSMA/CD protocol be used as is in a wireless LAN? State at least two reasons.**



