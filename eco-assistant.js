document.getElementById("submitBtn").addEventListener("click", async function() {
    let plasticUsage = document.getElementById("plastic").value;
    let transportUsage = document.getElementById("transport").value;
    let electricityUsage = document.getElementById("electricity").value;
    let foodChoice = document.getElementById("food").value;
    
    let userData = {
        plastic: plasticUsage,
        transport: transportUsage,
        electricity: electricityUsage,
        food: foodChoice
    };
    
    let recommendations = await getEcoAdvice(userData);
    document.getElementById("output").innerText = recommendations;
});

// Функция, которая вызывает API ИИ для анализа данных
async function getEcoAdvice(data) {
    let response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_API_KEY"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: "Ты экологический ассистент, который помогает людям снижать их углеродный след. Анализируй данные пользователя и давай простые рекомендации."
            }, {
                role: "user",
                content: `Мои данные: Пластик: ${data.plastic}, Транспорт: ${data.transport}, Электричество: ${data.electricity}, Питание: ${data.food}. Дай мне советы!`
            }],
            max_tokens: 100
        })
    });
    
    let result = await response.json();
    return result.choices[0].message.content;
}

document.write(`
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Эко-Ассистент</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
        .container { max-width: 400px; margin: auto; }
        input, button { display: block; width: 100%; margin: 10px 0; padding: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Эко-Ассистент</h1>
        <label>Сколько пластика вы используете в день? (граммы)</label>
        <input type="number" id="plastic">
        <label>Как часто вы пользуетесь общественным транспортом? (раз в неделю)</label>
        <input type="number" id="transport">
        <label>Ваше среднее энергопотребление? (кВт/ч в месяц)</label>
        <input type="number" id="electricity">
        <label>Какой тип питания вы предпочитаете? (веган, мясоед, смешанное)</label>
        <input type="text" id="food">
        <button id="submitBtn">Получить рекомендации</button>
        <h3>Результаты:</h3>
        <p id="output"></p>
    </div>
</body>
</html>
`);

