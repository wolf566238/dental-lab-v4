const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwkcd6GiWWcBjsBFJov3HqihMf8CQcSw1XWLYcgbUIWg6DOtOnc7LIiKgZudJ6wEgMa/exec";

let currentLang = localStorage.getItem("favLang") || "ar";
let currentTheme = localStorage.getItem("favTheme") || "light";

document.addEventListener("DOMContentLoaded", () => {
    document.body.setAttribute("data-theme", currentTheme);
    document.getElementById("themeBtn").innerText = currentTheme === "dark" ? "☀️" : "🌙";
    applyLanguage(currentLang);
});

function toggleLang() {
    currentLang = currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("favLang", currentLang);
    applyLanguage(currentLang);
}

function applyLanguage(lang) {
    const htmlTag = document.documentElement;
    if (lang === "ar") {
        htmlTag.setAttribute("dir", "rtl");
        htmlTag.setAttribute("lang", "ar");
        document.getElementById("langBtn").innerText = "EN";
    } else {
        htmlTag.setAttribute("dir", "ltr");
        htmlTag.setAttribute("lang", "en");
        document.getElementById("langBtn").innerText = "AR";
    }

    document.getElementById("title").innerText = translations[lang].title;
    document.getElementById("subtitle").innerText = translations[lang].subtitle;
    document.getElementById("name").placeholder = translations[lang].name;
    document.getElementById("email").placeholder = translations[lang].email;
    document.getElementById("phone").placeholder = translations[lang].phone;
    document.getElementById("doctor").placeholder = translations[lang].doctor;
    document.getElementById("patient").placeholder = translations[lang].patient;
    document.getElementById("lblType").innerText = translations[lang].lblType;
    document.getElementById("lblPriority").innerText = translations[lang].lblPriority;
    document.getElementById("lblDate").innerText = translations[lang].lblDate;
    document.getElementById("lblFiles").innerText = translations[lang].lblFiles;
    document.getElementById("notes").placeholder = translations[lang].notes;
    document.getElementById("submitBtn").innerText = translations[lang].submitBtn;
}

function toggleTheme() {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", currentTheme);
    localStorage.setItem("favTheme", currentTheme);
    document.getElementById("themeBtn").innerText = currentTheme === "dark" ? "☀️" : "🌙";
}

document.getElementById("orderForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById("submitBtn");
    const statusDiv = document.getElementById("status");
    
    submitBtn.disabled = true;
    statusDiv.className = "status-msg status-loading";
    statusDiv.innerText = translations[currentLang].loading;

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        doctor: document.getElementById("doctor").value,
        patient: document.getElementById("patient").value,
        type: document.getElementById("type").value,
        priority: document.getElementById("priority").value,
        date: document.getElementById("date").value,
        notes: document.getElementById("notes").value
    };

    try {
        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        statusDiv.className = "status-msg status-success";
        statusDiv.innerText = translations[currentLang].success;
        document.getElementById("orderForm").reset();

    } catch (error) {
        statusDiv.className = "status-msg status-error";
        statusDiv.innerText = translations[currentLang].error;
    } finally {
        submitBtn.disabled = false;
    }
});
