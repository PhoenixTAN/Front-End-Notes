//package part2;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
	public static boolean RECEIVED = false;
	
	public static void main(String[] agrs) throws IOException {
		System.out.println("Server is running... ");
		ServerSocket serverSocket = new ServerSocket(58520);
		while(true){
			Socket socket = serverSocket.accept();
			ServerThread serverThread = new ServerThread(socket);
			serverThread.start();
		}
	}
}
