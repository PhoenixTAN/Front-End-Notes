import java.net.*;
import java.io.*;

public class server {
  public static void main(String [] args) throws IOException {
    ServerSocket ss = new ServerSocket(4999);
    while (true) {
      Socket s = ss.accept();
      System.out.println("A client joined");

      InputStreamReader in = new InputStreamReader(s.getInputStream());
      BufferedReader br = new BufferedReader(in);

      String str = br.readLine();
      System.out.println(str);
    }
  }
}
