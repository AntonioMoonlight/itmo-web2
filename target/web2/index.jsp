<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Веб-программирование | лабораторная №2</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
    <link rel="icon" href="${pageContext.request.contextPath}/icon.png">
</head>
<body>
    <header>
        Веб-программирование, лабораторная №2 <br>
        Никифоров Антон Евгеньевич <br>
        Группа P3215, Вариант 73488
    </header>

    <div class="container">
        <div class="visual-column">
            <canvas id="graphCanvas" width="300" height="300"></canvas>
        </div>

        <div class="form-column">
            <form id="checkForm" action="${pageContext.request.contextPath}/controller" method="POST" onsubmit="return validateForm()">
                <div class="input-group">
                    <label>X:</label>
                    <select name="x" id="x-select">
                        <option value="-5">-5</option>
                        <option value="-4">-4</option>
                        <option value="-3">-3</option>
                        <option value="-2">-2</option>
                        <option value="-1">-1</option>
                        <option value="0" >0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Y:</label>
                    <input type="text" name="y" id="y-text" placeholder="-5 ... 5">
                    <span id="y-error" class="error"></span>
                </div>

                <div class="input-group">
                    <label>R:</label>
                    <input type="text"
                           name="r"
                           id="r-text"
                           placeholder="2 ... 5"
                           value="${not empty applicationScope.results ? applicationScope.results[0].r : ''}"
                           oninput="drawGraph()">
                    <span id="r-error" class="error"></span>
                </div>

                <button type="submit">Check Point</button>
            </form>
        </div>
    </div>

    <hr>
    <h3>Таблица результатов</h3>
    <table>
        <thead>
            <tr>
                <th>X</th><th>Y</th><th>R</th><th>Попадание</th><th>Время</th>
            </tr>
        </thead>
        <tbody id="resultsBody">
            <c:forEach var="row" items="${applicationScope.results}">
                <tr>
                    <td>${row.x}</td>
                    <td>${row.y}</td>
                    <td>${row.r}</td>
                    <td>${row.result ? '<span style="color:green">Да</span>' : '<span style="color:red">Нет</span>'}</td>
                    <td>${row.timestamp}</td>
                </tr>
            </c:forEach>
        </tbody>
    </table>

    <script>
        const existingPoints = [
            <c:forEach var="row" items="${applicationScope.results}">
                {x: ${row.x}, y: ${row.y}, r: ${row.r}, result: ${row.result}},
            </c:forEach>
        ];
    </script>
    <script src="${pageContext.request.contextPath}/js/script.js"></script>
</body>
</html>