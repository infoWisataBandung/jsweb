//https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/OtorisasiFIx
document.addEventListener("DOMContentLoaded", function () {
    const tokenTextArea = document.getElementById("tokenTextArea");
    const submitButton = document.getElementById("submit");
    const errorMessage = document.getElementById("error-message");

    submitButton.addEventListener("click", function () {
        const token = tokenTextArea.value;

        // Kirim permintaan POST ke API validasi token
        fetch("https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/OtorisasiFIx", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === true) {
                // Jika token cocok, redirect ke halaman card.html
                window.location.href = "../pages/card.html";
            } else {
                // Jika token tidak cocok, tampilkan pesan kesalahan
                errorMessage.textContent = "Token salah";
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });
});
