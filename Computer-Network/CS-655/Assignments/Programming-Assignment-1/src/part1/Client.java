//package part1;

import java.io.IOException;
import java.net.Socket;
import java.net.UnknownHostException;

public class Client {
	public static void main(String[] agrs) throws UnknownHostException, IOException {
		Socket socket = new Socket("127.0.0.1", 9920);
//		new ClientSendThread(socket).start();
//		new ClientReceiveThread(socket).start();
		new ClientThread(socket).start();
	}
}
