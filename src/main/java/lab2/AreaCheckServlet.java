package lab2;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/check")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            double x = Double.parseDouble(req.getParameter("x"));
            double y = Double.parseDouble(req.getParameter("y").replace(",", "."));
            double r = Double.parseDouble(req.getParameter("r").replace(",", "."));

            if (r < 2 || r > 5) {
                throw new NumberFormatException("R out of range");
            }

            boolean hit = checkArea(x, y, r);
            ResultRow row = new ResultRow(x, y, r, hit);

            ServletContext context = getServletContext();
            @SuppressWarnings("unchecked")
            List<ResultRow> results = (List<ResultRow>) context.getAttribute("results");
            if (results == null) {
                results = new ArrayList<>();
                context.setAttribute("results", results);
            }
            results.add(0,row);

            req.setAttribute("currentRow", row);

            req.getRequestDispatcher("/result.jsp").forward(req, resp);

        } catch (NumberFormatException e) {
            req.setAttribute("error", "Некорректные данные: " + e.getMessage());
            req.getRequestDispatcher("/index.jsp").forward(req, resp);
        }
    }

    private boolean checkArea(double x, double y, double r) {
        if (x >= 0 && y >= 0) return x <= r && y <= (r / 2.0); // 1st Q
        if (x <= 0 && y >= 0) return y <= (2 * x + r);         // 2nd Q
        if (x <= 0 && y <= 0) return (x * x + y * y) <= ((r / 2.0) * (r / 2.0)); // 3rd Q
        return false;
    }
}