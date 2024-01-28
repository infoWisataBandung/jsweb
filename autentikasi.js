const authForm = document.getElementById("authForm");
const tokenTextArea = document.getElementById("tokenTextArea");
const submitButton = document.getElementById("submit");
const errorMessage = document.getElementById("error-message");

authForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const token = tokenTextArea.value;

    try {
        const response = await fetch("https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/OtorisasiFIx", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token // Menggunakan token sebagai apiKey
            }
        });

        const data = await response.json();

        if (response.ok) {
            if (data.status === true) {
                const role = data.data.role;
                if (role === "admin") {
                    window.location.href = "../pages/admindashboard.html";
                } else if (role === "user") {
                    window.location.href = "../pages/card.html";
                } else {
                    errorMessage.textContent = "Role tidak valid";
                }
            } else {
                errorMessage.textContent = data.message;
            }
        } else {
            errorMessage.textContent = "Terjadi kesalahan dalam permintaan";
        }
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
});
