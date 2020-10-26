//package part2;

import java.io.*;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class ClientThread extends Thread {

    private Socket socket = null;
    private String setupInfo;
    private String endInfo;
    private int delay = 0;

    private BufferedReader br = null;
    private BufferedWriter bw = null;

    private List<Long> rtt = new ArrayList<>();

    private int type;
    private static int PROBE_NUMBER = 0;
    private int MESSAGE_SIZE = 0;

    public ClientThread(Socket socket, int type, ConnectInfo info) throws IOException {
        this.socket = socket;
        this.type = type;
        br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
        setupInfo = info.getSetupConnectionInfo();
        endInfo = info.getEndConnectionInfo();
        delay = info.getDelay();
    }

    public void run() {
        try {
            /**
             *  Connection Setup Phase (CSP)
             */
            boolean result = setUpConnection();
            if (result) {
                /**
                 *  Measurement Phase (MP)
                 */
               // System.out.println("Connected Successfully");
                measurement();
                endConnection();
                outputMeasurementInfo();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
             //   System.out.println("Client: Close Socket!");
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void outputMeasurementInfo() {
        long sumRTT = 0;
        for(int i = 0; i < rtt.size(); i++){
            sumRTT += rtt.get(i);
        }
        long aveRTT = sumRTT / rtt.size();
        switch (type){
            case Client.RTT_TEST:
                System.out.println("DELAY: " + delay + " MESSAGE SIZE: " + MESSAGE_SIZE + " RTT: " + aveRTT + " ms");
                break;
            case Client.THROUGHPUT_TEST:
                long throughput = (long) (2 * MESSAGE_SIZE * 8 / aveRTT);
                System.out.println("DELAY: " + delay + " MESSAGE SIZE: " + MESSAGE_SIZE + " Throughput: " + throughput + " kbps");
                break;
        }
    }

    private void endConnection() {
        try {
            bw.write(endInfo);
            bw.flush();
            String response = null;
            response = br.readLine();
         //   System.out.println(response);
        } catch (IOException e) {

        }
    }

    private boolean setUpConnection() {
        /**
         <PROTOCOL PHASE> <MEASUREMENT TYPE> <NUMBER OF PROBES> <MESSAGE SIZE> <SERVER DELAY>\n
         s                 rtt/tput           int                int            delay

         message size, rtt:    1, 100, 200, 400, 800 and 1000 bytes
         message size, tput:  1K, 2K, 4K, 8K, 16K and 32K bytes, k = 1024
         */
        try {
          //  System.out.println("Sending the first request");
            String request = setupInfo;
         //   System.out.println("setupInfo: " + setupInfo);
            
            bw.write(request);
            bw.flush();

            String response = null;
            response = br.readLine();
          //  System.out.println(response);
            if (response.startsWith("200")) {
            //    System.out.println("GET Response");
                String[] arr = request.split(Client.DELIMITER);
                PROBE_NUMBER = Integer.parseInt(arr[2]);
		MESSAGE_SIZE = Integer.parseInt(arr[3]);
                return true;
            } else if (response.startsWith("404")) {
                return false;
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }


    private String getMeasureMentMessage(int sequence) {
        byte[] payload = new byte[MESSAGE_SIZE];
        Arrays.fill(payload, (byte) 0);
     //   System.out.println("m " + sequence + " " + payload.toString() + "\n");
        return "m " + sequence + " " + payload.toString() + "\n";
    }


    /**
     * Measurement Phase (MP)
     */
    private void measurement() {
        try {
         //   System.out.println("Client: Start measurement!");

            int i = 1;
            while (i <= PROBE_NUMBER) {
                bw.write(getMeasureMentMessage(i));
                bw.flush();
		long startTime = System.currentTimeMillis();
                String response = null;
                response = br.readLine();
                long endTime = System.currentTimeMillis();
           //     System.out.println(response);
                if (response.startsWith("200")) {
            	    System.out.println("OK");
                } else if (response.startsWith("404")) {
                    System.out.println("404");
                    break;
                }
                rtt.add(endTime - startTime);
                i++;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}

