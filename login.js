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
        loadingSpinner.classList.add("active"); // Tampilkan animasi loading saat tombol login ditekan

        const username = usernameInput.value;
        const password = passwordInput.value;

        // Kirim permintaan POST ke API login user
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
            loadingSpinner.classList.remove("active"); // Sembunyikan animasi loading setelah proses login selesai

            if (data.status === true) {
                // Pengolahan respons setelah login berhasil untuk user biasa
                const token = data.token;
                setCookieWithExpireHour("token", token, 2);
                window.location.href = "../pages/autentikasi.html";
            } else {
                // Pesan kesalahan jika login gagal
                errorMessage.textContent = "User not found"; // Pesan kesalahan
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });

    // Fungsi untuk mengecek apakah form telah diisi dengan benar
    const validation = () => {
        const username = usernameInput.value;
        const pass = passwordInput.value;
        if (username !== "" && pass !== "") {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    };

    // Panggil fungsi validation saat input berubah 
    usernameInput.addEventListener("input", validation);
    passwordInput.addEventListener("input", validation);
});
