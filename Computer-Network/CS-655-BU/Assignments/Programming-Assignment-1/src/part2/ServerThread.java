//package part2;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class ServerThread extends Thread {

    private Socket socket = null;

    private BufferedReader br = null;
    private BufferedWriter bw = null;


    private static int PROBE_NUMBER = 0;
    private static int MESSAGE_SIZE = 0;
    private static int DELAY = 0;

    public ServerThread(Socket socket) throws IOException {
        this.socket = socket;
        br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
    }

    public void run() {
        try {
            boolean result = handleSetupConnectionRequest();
            if (result) {
                int i = 1;
                boolean flag = true;
                while (i <= PROBE_NUMBER && flag) {
                    flag = handleMeasurement(i);
                    i++;
                }
                handleEndConnectionRequest();
            }
        } finally {
            try {
                System.out.println("Server: Close Socket!");
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private boolean handleEndConnectionRequest() {
        try {
            String request = "";
            request = br.readLine();
	    System.out.println("request: " + request);
            if(request.startsWith("t")){
                bw.write("200 OK: Closing Connection\n");
                bw.flush();
                System.out.println("200 OK: Closing Connection");
                return true;
            }
        }catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }



    private boolean handleSetupConnectionRequest() {
        try {
            String request = "";
            request = br.readLine();
            String[] arr = request.split(Client.DELIMITER);
            if (arr.length == 4 || arr.length == 5 && arr[1].equals("rtt") || arr[1].equals("tput"))  {
                PROBE_NUMBER = Integer.parseInt(arr[2]);
                DELAY = arr.length == 5 ? Integer.parseInt(arr[4]) : 0;
                bw.write("200 OK: Ready\n");
                bw.flush();
                System.out.println("200 OK: Ready");
                return true;
            } else {
                bw.write("404 ERROR: Invalid Connection Setup Message\n");
                bw.flush();
                System.out.println("Length = " + arr.length + " " + "Nessage: " + request);
                System.out.println("404 ERROR: Invalid Connection Setup Message");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

    private boolean handleMeasurement(int exceptedSequence) {
        try {
            String request = br.readLine();
            String[] arr = request.split(Client.DELIMITER);
            if (arr.length == 3 && arr[0].equals("m") && exceptedSequence == Integer.parseInt(arr[1])){
                Thread.sleep(DELAY);
                bw.write("100 Continue, data: " + arr[2] + "\n");
                bw.flush();
                System.out.println("100 Continue");
                return true;
            }else{
                bw.write("404 ERROR: Invalid Measurement Message\n");
                bw.flush();
                System.out.println("404 ERROR: Invalid Measurement Message");
            }
        } catch (IOException | InterruptedException ioException) {
            ioException.printStackTrace();
        }
        return false;
    }
}
