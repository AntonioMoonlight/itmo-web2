package lab2;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ResultRow implements Serializable {
    private final double x;
    private final double y;
    private final double r;
    private final boolean result;
    private final String timestamp;

    public ResultRow(double x, double y, double r, boolean result) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
        this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
    }

    public double getX() { return x; }
    public double getY() { return y; }
    public double getR() { return r; }
    public boolean isResult() { return result; }
    public String getTimestamp() { return timestamp; }
}