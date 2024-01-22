//menungu dokumen html selesai dimuat sebelum mengeksekusi skrip
document.addEventListener("DOMContentLoaded", function () {
    //mendapatkan referensi ke elemen formulir dan tombol submit dan reset
    const form = document.getElementById("wisataForm");
    const submitBtn = document.getElementById("submitBtn");
    const resetBtn = document.getElementById("resetBtn");

    //menambhakan event listener untuk tombol submit
    submitBtn.addEventListener("click", function () {
        event.preventDefault(); //mencegah pengiriman formulir secara default
        submitWisata(); //memanggil fungsi submitwisata()
    });

    //menambahkan event listener untuk tombol reset
    resetBtn.addEventListener("click", function () {
        //mereset formulir
        form.reset();
        //menghapus pesan error atau nitifikasi
        document.getElementById("error-message").textContent = "";
        ///mendapatkan elemen dengna id "notification-container" untuk menghandle notif
        const notificationContainer = document.getElementById("notification-container");
        ///menghapus semua elemen anak di dalam "notification-container" (menghapus notif sebelumnya)
        while (notificationContainer.firstChild) {
            notificationContainer.removeChild(notificationContainer.firstChild);
        }
    });
});

//fungsi utk menampilkan notif
function showNotification(message, type) {
    ///mendapatkan elemen dengan id "notification-container" utk menghandle notif
    const notificationContainer = document.getElementById("notification-container");
    ///membuat elemen html div untuk menampung notif
    const notification = document.createElement("div");
    ///menetapkan kelas css untuk elemen notif sesuai dengna jenis notif (success atau danger)
    notification.className = `notification is-${type}`;
    ///menetapkan teks notif sesuai dengan pesan yang diterima
    notification.textContent = message;

    ///menambhakan elemen notif kedalam "notification-container" untuk ditampilkan
    notificationContainer.appendChild(notification); 

    //menhapus notif setelah 3 detik
    setTimeout(() => {
        notificationContainer.removeChild(notification);
    }, 3000);
}

//membuat fungsi submitwisata() utk mengirim data ke server menggunakan metode POST
function submitWisata() {
    //dapatkan value dari elemen formulir
    const category = document.getElementById("categorySelect").value;
    const nama = document.getElementById("nama").value;
    const konten = document.getElementById("konten").value;
    const alamat = document.getElementById("alamat").value;
    const gambar = document.getElementById("gambar").value; // Anda mungkin perlu mengubah cara mendapatkan nilai gambar
    const rating = document.getElementById("rating").value;

    // Buat objek data JSON
    const data = {
        "nama": nama,
        "jenis": category,
        "deskripsi": konten,
        "lokasi": {
            "type": "",
            //"coordinates": [alamat.split(",")[1], alamat
            "coordinates": null
        },
        "alamat": alamat,
        "gambar": gambar,
        "rating": parseFloat(rating)
    };

    // Kirim data melalui API menggunakan metode post
    fetch("https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/function-6CreateWisata", {
        method: "POST", ///metode http untuk mengirim data ke server
        headers: {
            "Content-Type": "application/json", ///jenis konten yg dikirimkan dalam permintaan (dalam hal ini, data JSON)
        },
        body: JSON.stringify(data), ///mengubah data javascript jadi format JSON
    })
    .then(response => {
        //memeriksa apakah respon dari server ok
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); ///mengembalikan respon dalam format JSON
    })
    .then(data => {
        console.log("Success:", data);
        //menampilkan notif setelah berhasil
        showNotification("Dataa has been successfully submitted", "success");
    })
    .catch((error) => {
        console.error("Error:", error);
        //menampilkan notif jika terjadi kesalahan
        showNotification("Failed to submit data. Please try again.", "danger");
    });
}