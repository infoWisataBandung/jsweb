import { setCookieWithExpireHour } from "https://jscroot.github.io/cookie/croot.js";

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const message = document.getElementById("message");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const submitButton = document.getElementById("submit");
    const errorMessage = document.getElementById("error-message");
    const loadingSpinner = document.getElementById("loadingSpinner");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        loadingSpinner.classList.add("active"); // Display loading spinner during login

        const username = usernameInput.value;
        const password = passwordInput.value;

        fetch("https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/LoginNew", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            loadingSpinner.classList.remove("active"); // Hide loading spinner after login attempt

            if (data.status === true) {
                const token = data.token;
                setCookieWithExpireHour("token", token, 2);
                window.location.href = "../pages/autentikasi.html"; // Redirect on successful login
            } else {
                errorMessage.textContent = "User not found";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            loadingSpinner.classList.remove("active"); // Hide loading spinner on error
        });
    });

    const validation = () => {
        const username = usernameInput.value;
        const pass = passwordInput.value;
        submitButton.disabled = !(username !== "" && pass !== "");
    };

    usernameInput.addEventListener("input", validation);
    passwordInput.addEventListener("input", validation);
});
