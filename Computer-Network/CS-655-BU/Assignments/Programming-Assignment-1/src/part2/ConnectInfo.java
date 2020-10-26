//package part2;

import java.util.ArrayList;
import java.util.List;

public class ConnectInfo {

    private String setupConnectionInfo;
    private String endConnectionInfo;
    private int delay;
    
    

    public int getDelay() {
		return delay;
	}


	public void setDelay(int delay) {
		this.delay = delay;
	}


	public ConnectInfo(){
    }


    public String getSetupConnectionInfo() {
        return setupConnectionInfo;
    }

    public void setSetupConnectionInfo(String setupConnectionInfo) {
        this.setupConnectionInfo = setupConnectionInfo;
    }

    public String getEndConnectionInfo() {
        return endConnectionInfo;
    }

    public void setEndConnectionInfo(String endConnectionInfo) {
        this.endConnectionInfo = endConnectionInfo;
    }


}
