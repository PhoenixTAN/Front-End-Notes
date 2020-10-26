//package part1;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
	
	public static void main(String[] agrs) throws IOException {
		ServerSocket serverSocket = new ServerSocket(9920);
		Socket socket = serverSocket.accept();
		ServerThread serverThread = new ServerThread(socket);
		serverThread.start();
	}
}
