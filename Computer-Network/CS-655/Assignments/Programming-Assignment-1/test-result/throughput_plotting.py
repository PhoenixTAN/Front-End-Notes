import matplotlib.pyplot as plt
import numpy as np
import os

dir = os.path.dirname(os.path.abspath(__file__))
# PerfAppThroughput-Test-TestServer.txt
# Sorted_PerfAppThroughput_Test_Xueyan_Server.txt
my_txt = os.path.join(dir, 'Sorted_PerfAppThroughput_Test_Xueyan_Server.txt')

file = open(my_txt, "r")
content = file.read()

lines = content.split('\n')

# y label RTT
# x label message size
# various delays
delays = [0, 500, 1000, 2000, 5000, 10000]
message_size = [1, 2, 4, 8, 16, 32]

polylines = []

i = 0
arr = []
for index, line in enumerate(lines):
    items = line.split(' ')
    # ['DELAY:', '0', 'MESSAGE', 'SIZE:', '1', 'RTT:', '134', 'ms']
    delay = items[1]
    m_size = items[4]
    rtt = items[6]  # ms

    arr.append(int(rtt))
    if len(arr) == 6:
        print(arr)
        polylines.append(arr)
        arr = []



plt.axis([0, 35, 0, 60])
# plot rtt test --- test server
for index, polyline in enumerate(polylines):
    x = np.asarray(message_size)
    y = np.asarray(polyline)
    print(x)
    print(y)
    plt.plot(x, y, label='delay = ' + str(delays[index]) + ' ms')

# plt.autoscale(False)
# plt.ylim(0, 10)
plt.title('Result for Throughput to csa2 Server 128.197.11.36')
plt.xlabel('Message size / KB')
plt.ylabel('Throughput kbps')
plt.legend(loc='upper left')
plt.show()

