import matplotlib.pyplot as plt
import numpy as np
import os

dir = os.path.dirname(os.path.abspath(__file__))
# PerfAppRRT_Test_TestServer.txt
# Sorted_PerfAppRRT_Test_Xueyan_Server.txt
my_txt = os.path.join(dir, 'PerfAppRRT_Test_TestServer.txt')

file = open(my_txt, "r")
content = file.read()

lines = content.split('\n')

# y label RTT
# x label message size
# various delays 
delays = [0, 500, 1000, 2000, 5000, 10000]
message_size = [1, 100, 200, 400, 800, 1000]

polylines = []

i = 0
arr = []
for index, line in enumerate(lines):
    items = line.split(' ')
    # ['DELAY:', '0', 'MESSAGE', 'SIZE:', '1', 'RTT:', '134', 'ms']
    delay = items[1]
    m_size = items[4]
    rtt = items[6]  # ms

    # print(delay + ',' + message_size)
    arr.append(rtt)
    if len(arr) == 6:
        print(arr)
        polylines.append(arr)
        arr = []


# plt.ylim(0, 1200)
# plot rtt test --- test server
for index, polyline in enumerate(polylines):
    x = np.asarray(message_size)
    y = np.asarray(polyline)
    print(x)
    print(y)
    plt.plot(x, y, label='delay = ' + str(delays[index]) + ' ms')


plt.title('Result for RRT to Test Server 192.12.245.164')
plt.xlabel('Message size / Bytes')
plt.ylabel('RTT ms')
plt.legend(loc='lower right')
plt.show()

