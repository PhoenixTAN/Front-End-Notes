//package part2;

import java.io.IOException;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;


public class Client {
	public final static int RTT_TEST = 1;
	public final static int THROUGHPUT_TEST = 0;

	public final static String DELIMITER = " ";

	public final static int[] RTT_MESSAGE_SIZE = new int[]{1, 100, 200, 400, 800, 1000};
	public final static int[] THROUGHPUT_MESSAGE_SIZE = new int[]{1, 2, 4, 8, 16, 32};
	public final static int[] DELAY = new int[]{0, 500, 1000, 2000, 5000, 10000};

	public final static int TEST_NUMBER = 6;
	public final static int PROBE_NUMBER = 10;

	public static void main(String[] agrs) throws UnknownHostException, IOException {
		// test for rrt
		int i = 0;
		List<ConnectInfo> rttTestCases = createRTTTestCase();
		while(i < rttTestCases.size()){
			Socket socket = new Socket("128.197.11.36", 58520);
			new ClientThread(socket, RTT_TEST, rttTestCases.get(i)).start();
			i++;

		}

		// test for throughput
		/*
		int j = 0;
		List<ConnectInfo> tputTestCases = createThroughputTestCase();
		while(j < tputTestCases.size()){
			// if(j % PROBE_NUMBER == 0){
			// 	System.out.println("DELAY: " + DELAY[j] + "ms");
			// }
			Socket socket = new Socket("128.197.11.36", 58520);
			new ClientThread(socket, THROUGHPUT_TEST, tputTestCases.get(j)).start();
			j++;
		}
		*/
	}

	private static List<ConnectInfo> createRTTTestCase(){
		List<ConnectInfo> connectInfos = new ArrayList<>();
		for(int j = 0; j < TEST_NUMBER; j++){
			for(int i = 0; i < TEST_NUMBER; i++){
				ConnectInfo rtt_test = new ConnectInfo();
				rtt_test.setSetupConnectionInfo("s rtt " + Client.PROBE_NUMBER + " " +  RTT_MESSAGE_SIZE[i] + " " + DELAY[j] + "\n");
				rtt_test.setEndConnectionInfo("t\n");
				rtt_test.setDelay(DELAY[j]);
				connectInfos.add(rtt_test);
			}
		}
		return connectInfos;
	}

	private static List<ConnectInfo> createThroughputTestCase(){
		List<ConnectInfo> connectInfos = new ArrayList<>();
		for(int j = 0; j < TEST_NUMBER; j++){
			for(int i = 0; i < TEST_NUMBER; i++){
				ConnectInfo rtt_test = new ConnectInfo();
				rtt_test.setSetupConnectionInfo("s tput " + Client.PROBE_NUMBER + " " +  THROUGHPUT_MESSAGE_SIZE[i] * 1024 + " " + DELAY[j] + "\n");
				rtt_test.setEndConnectionInfo("t\n");
				rtt_test.setDelay(DELAY[j]);
				connectInfos.add(rtt_test);
			}
		}
		return connectInfos;
	}
}
