document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("wisataForm");
    const submitBtn = document.getElementById("submitBtn");
    const resetBtn = document.getElementById("resetBtn");

    submitBtn.addEventListener("click", function () {
        event.preventDefault();
        submitWisata();
    });

    resetBtn.addEventListener("click", function () {
        form.reset();
        document.getElementById("error-message").textContent = "";
        const notificationContainer = document.getElementById("notification-container");
        while(notificationContainer.firstChild) {
            notificationContainer.removeChild(notificationContainer.firstChild);
        }
    });
});

function showNotification(message, type) {
    const notificationContainer = document.getElementById("notification-container");
    const notification = document.createElement("div");
    notification.className = `notification is-${type}`;
    notification.textContent = message;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notificationContainer.removeChild(notification);
    }, 3000);
}

function submitWisata() {
    const category = document.getElementById("categorySelect").value;
    const nama = document.getElementById("nama").value;
    const konten = document.getElementById("konten").value;
    const alamat = document.getElementById("alamat").value;
    const gambar = document.getElementById("gambar").value;
    const rating = document.getElementById("rating").value;

    const data = {
        "nama": nama,
        "jenis": category,
        "deskripsi": konten,
        "lokasi": {
            "type": "",
            "coordinates": null
        },
        "alamat": alamat,
        "gambar": gambar,
        "rating": parseFloat(rating)
    };

    fetch("https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/function-6CreateWisata", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("Success:", data);
        showNotification("data berhasil di input", "success");
    })
    .catch((error) => {
        console.log("Error:", error);
        showNotification("data gagal di input", "danger");
    });



}