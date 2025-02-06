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
