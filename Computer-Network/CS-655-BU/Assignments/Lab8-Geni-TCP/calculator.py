import math

print('helloWorld')

raw = '''85 bytes from PC2-link-1 (10.10.2.2): icmp_seq=1 ttl=63 time=11.2 ms
85 bytes from PC2-link-1 (10.10.2.2): icmp_seq=2 ttl=63 time=11.3 ms
85 bytes from PC2-link-1 (10.10.2.2): icmp_seq=3 ttl=63 time=11.3 ms
85 bytes from PC2-link-1 (10.10.2.2): icmp_seq=4 ttl=63 time=11.2 ms
85 bytes from PC2-link-1 (10.10.2.2): icmp_seq=5 ttl=63 time=11.0 ms
85 bytes from PC2-link-1 (10.10.2.2): icmp_seq=6 ttl=63 time=11.3 ms
85 bytes from PC2-link-1 (10.10.2.2): icmp_seq=7 ttl=63 time=11.3 ms
85 bytes from PC2-link-1 (10.10.2.2): icmp_seq=8 ttl=63 time=11.1 ms
85 bytes from PC2-link-1 (10.10.2.2): icmp_seq=10 ttl=63 time=11.3 ms'''

# calculate throughput

# calculate RTT
pings = raw.split('\n')

sum_of_time = 0.0 # ms
num_of_pings = len(pings)


for ping in pings:
    time_str = ping.split(' ')[-2]
    time = time_str.split('=')[-1]
    # print(time)
    sum_of_time += float(time)

print(num_of_pings)

ave = sum_of_time / num_of_pings

print(ave, 'ms')

MSS = 1460 * 8

rtt = ave / 1000

plr = 0.07

throughput = 1.22 * MSS / (rtt * math.sqrt(plr))

print('throughput', throughput)

