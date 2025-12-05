<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Результат проверки</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>
<body>
    <div class="result-container">
        <h1>Результат проверки</h1>
        
        <table>
            <tr>
                <th>Параметр</th>
                <th>Значение</th>
            </tr>
            <tr>
                <td>X</td>
                <td>${currentRow.x}</td>
            </tr>
            <tr>
                <td>Y</td>
                <td>${currentRow.y}</td>
            </tr>
            <tr>
                <td>R</td>
                <td>${currentRow.r}</td>
            </tr>
            <tr>
                <td>Результат</td>
                <td>
                    ${currentRow.result ? 
                    '<span style="color: green; font-weight: bold">ПОПАДАНИЕ</span>' : 
                    '<span style="color: red; font-weight: bold">ПРОМАХ</span>'}
                </td>
            </tr>
            <tr>
                <td>Время</td>
                <td>${currentRow.timestamp}</td>
            </tr>
        </table>

        <br>
        <a href="${pageContext.request.contextPath}/controller" class="button">Вернуться назад</a>
    </div>
</body>
</html>