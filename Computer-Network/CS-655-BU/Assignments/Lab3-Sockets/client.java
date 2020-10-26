import java.net.*;
import java.io.*;

public class client {
  public static void main(String [] args) throws IOException {
    Socket s = new Socket("localhost", 4999);
    System.out.println("Connected");
    PrintWriter pr = new PrintWriter(s.getOutputStream());
    pr.println("Hello world!");
    pr.flush();
  }
}
