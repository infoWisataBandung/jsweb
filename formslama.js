document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("wisataForm");
    const submitBtn = document.getElementById("submitBtn");
    const resetBtn = document.getElementById("resetBtn");
  
    submitBtn.addEventListener("click", function () {
      event.preventDefault();
      submitWisata();
    });
  
    resetBtn.addEventListener("click", function () {
      // Reset the form
      form.reset();
      // Clear any error messages or notifications
      document.getElementById("error-message").textContent = "";
      const notificationContainer = document.getElementById("notification-container");
      while (notificationContainer.firstChild) {
        notificationContainer.removeChild(notificationContainer.firstChild);
      }
    });
  }); //end document.addEventListener("DOMContentLoaded", function () {
  
  function showNotification(message, type) {
    const notificationContainer = document.getElementById("notification-container");
    const notification = document.createElement("div");
    notification.className = `notification is-${type}`;
    notification.textContent = message;
  
    notificationContainer.appendChild(notification); 
  
    // Remove the notification after 3 seconds
    setTimeout(() => {
      notificationContainer.removeChild(notification);
    }, 3000);
  }
  
  function submitWisata() {
    // Dapatkan nilai dari elemen formulir
    const category = document.getElementById("categorySelect").value;
    const nama = document.getElementById("nama").value;
    const konten = document.getElementById("konten").value;
    const alamat = document.getElementById("alamat").value;
    const gambar = document.getElementById("gambar").value; // Anda mungkin perlu mengubah cara mendapatkan nilai gambar
    const rating = document.getElementById("rating").value;
    //const errorMessage = document.getElementById("error-message");
  
    // Buat objek data JSON
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
  
    // Kirim data melalui API menggunakan metode post
    fetch("https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/function-6CreateWisata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      //.then(response => response.json())
      //.then(data => {
        //console.log("Success:", data);
        //showNotification("Data has been successfully submitted", "success");
        // Lakukan sesuatu setelah berhasil, seperti memberikan umpan balik kepada pengguna atau mereset formulir
      //})
      //.catch((error) => {
        //console.error("Error:", error);
        //showNotification("Failed to submit data. Please try again.", "danger");
        //errorMessage.textContent = "Data belum berhasil di input";
        // Handle error, misalnya memberikan umpan balik atau menampilkan pesan kesalahan
      //});    
  
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Success:", data);
        showNotification("Dataa has been successfully submitted", "success");
        // Lakukan sesuatu setelah berhasil, seperti memberikan umpan balik kepada pengguna atau mereset formulir
      })
      .catch((error) => {
        console.error("Error::", error);
        showNotification("Failed to submit data. Please try again.", "danger");
        //errorMessage.textContent = "Data belum berhasil di input";
        // Handle error, misalnya memberikan umpan balik atau menampilkan pesan kesalahan
      });
  }// end function submitWisata() {
  