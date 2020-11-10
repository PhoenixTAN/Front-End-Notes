# Router

A high-level view of a generic router architecture is shown in Figure 4.4. Four router components can be
identified:

![alt text](./images/router-architecture.png)

- Input ports.
- Output ports.
- Switching fabric.
- **Routing processor.** The routing processor performs control-plane functions. 

In traditional routers, it executes the routing protocols (which we’ll study in Sections 5.3 and 5.4), maintains routing tables and attached link state information, and computes the forwarding table for the router. 

In SDN routers, the routing processor is responsible for communicating with the remote controller in order to (among other activities) receive forwarding table entries computed by the remote controller, and install these entries in the router’s input ports. The routing processor also performs the network management functions that we’ll study in Section 5.7.

A router’s input ports, output ports, and switching fabric **are almost always implemented in hardware**.

While the **data plane operates at the nanosecond time scale**, a router’s control functions—executing the routing protocols, responding to attached links that go up or down, communicating with the remote controller (in the SDN case) and performing management functions—operate at the **millisecond or second timescale**. 

## Destination-based forwarding

## Generalized forwarding

## Input Port Processing and Destination-Based Forwarding

## Switching

## Output Port Processing

## Packet Scheduling
