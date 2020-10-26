//package part1;

import java.io.*;
import java.net.Socket;

public class ServerThread extends Thread {

	private Socket socket = null;

	private BufferedReader br = null;
	private BufferedWriter bw = null;

	public ServerThread(Socket socket) throws IOException {
		this.socket = socket;
		br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
		bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
	}

	public void run() {
		try {
			// exchange data
			String request = null;
			request = br.readLine();
			String response = "From server: " + request + "\n";
			bw.write(response);
			bw.flush();
			System.out.println(request);

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (socket != null) {
					socket.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
