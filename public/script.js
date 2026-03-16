window.onload = function () {

    /* =========================
       ИНИЦИАЛИЗАЦИЯ КАРТЫ
    ========================= */

    const map = L.map('map').setView([55.754, 37.620], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    const marker = L.marker([55.754, 37.620]).addTo(map);

    marker.bindPopup("Высшая школа экономики").openPopup();



    /* =========================
       ЧАТ
    ========================= */

    const input = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const messages = document.getElementById("chat-messages");
    const voiceBtn = document.getElementById("voice-btn");



    /* Отправка сообщения */

    sendBtn.onclick = function () {

        const text = input.value.trim();

        if (text === "") return;

        addMessage("Вы: " + text, "user");

        generateReply(text);

        input.value = "";
    };



    /* Добавление сообщения в чат */

    function addMessage(text, type) {

        const msg = document.createElement("div");

        msg.className = "message " + type;

        msg.innerText = text;

        messages.appendChild(msg);

        messages.scrollTop = messages.scrollHeight;
    }



    /* =========================
       АВТООТВЕТЫ
    ========================= */

    function generateReply(userText) {

        const text = userText.toLowerCase();

        let reply = "Интересный вопрос 🙂";

        if (text.includes("привет"))
            reply = "Привет! Рад видеть тебя на моей странице.";

        else if (text.includes("вшэ"))
            reply = "Я учусь в Высшей школе экономики.";

        else if (text.includes("матем"))
            reply = "Математика — одна из моих главных областей интереса.";

        else if (text.includes("программ"))
            reply = "Мне нравится программировать и создавать проекты.";

        else if (text.includes("пока"))
            reply = "До встречи! Спасибо за сообщение.";

        setTimeout(function () {
            addMessage("Автор: " + reply, "bot");
        }, 800);
    }



    /* =========================
       ГОЛОСОВОЙ ВВОД
    ========================= */

    if ('webkitSpeechRecognition' in window) {

        const recognition = new webkitSpeechRecognition();

        recognition.lang = "ru-RU";

        recognition.continuous = false;

        recognition.interimResults = false;



        voiceBtn.onclick = function () {
            recognition.start();
        };



        recognition.onresult = function (event) {

            const voiceText = event.results[0][0].transcript;

            input.value = voiceText;
        };

    } else {

        voiceBtn.onclick = function () {
            alert("Голосовой ввод не поддерживается в этом браузере");
        };

    }

};