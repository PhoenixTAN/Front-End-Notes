//package part1;

import java.io.*;
import java.net.Socket;
import java.util.Scanner;

public class ClientThread extends Thread {
    private Socket socket = null;

    private BufferedReader br = null;
    private BufferedWriter bw = null;

    public ClientThread(Socket socket) throws IOException {
        this.socket = socket;
        br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
    }

    public void run() {
        try {
            String request = "hello\n";
            bw.write(request);
            bw.flush();
            String response = br.readLine();
            System.out.println(response);
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
