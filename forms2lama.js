document.addEventListener('DOMContentLoaded', function () {
    const wisataForm = document.getElementById('wisataForm');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Add an event listener to the submit button
    submitBtn.addEventListener('click', function () {
        submitForm();
    });
  
    // Add an event listener to the reset button
    resetBtn.addEventListener('click', function () {
      // Reset the form  
      resetForm();
      form.reset();
        // Clear any error messages or notifications
        document.getElementById("error-message").textContent = "";
        const notificationContainer = document.getElementById("notification-container");
        while (notificationContainer.firstChild) {
          notificationContainer.removeChild(notificationContainer.firstChild);
      }
    });
  
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
  
    // Function to submit the form data, js = id
    function submitForm() {
        const categorySelect = document.getElementById('categorySelect');
        const namaInput = document.getElementById('nama');
        const kontenTextarea = document.getElementById('konten');
        const alamatInput = document.getElementById('alamat');
        const gambarInput = document.getElementById('gambar');
        const ratingInput = document.getElementById('rating');
      
        // Get token from cookies
        const token = getCookie('token');
      
        // Validate form data before sending
        if (!validateForm()) {
            return;
        }
      
        // Prepare the data object to be sent, mongodb=js
        const formData = {
          jenis: categorySelect.value, // 'jenis' corresponds to 'category' in your MongoDB structure
            nama: namaInput.value,
            deskripsi: kontenTextarea.value, // 'deskripsi' corresponds to 'konten' in your MongoDB structure
            alamat: alamatInput.value,
            gambar: gambarInput.value.toString(), // You might need to adjust this based on your requirements
            rating: parseFloat(ratingInput.value)
        };
  
        
      
        // Make a POST request to the API endpoint with authorization
        fetch('https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/CreateWIsataToken1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token // Add authorization header
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            console.log('Success::', data);
            showNotification("Dataa has been successfully submitted", "success");
            // You can handle success accordingly, for example, display a success message or redirect the user
        })
        .catch((error) => {
            console.error('Error:', error);
            showNotification("Failed to submit data. Please try again.", "danger");
            // Handle errors, display an error message, or log the error
        });
    }
  
    // Function to reset the form
    function resetForm() {
        wisataForm.reset();
    }
  
    // Function to validate the form data
    function validateForm() {
        // You can implement your validation logic here
        // For simplicity, this example assumes that all fields are required
        const namaInput = document.getElementById('nama');
        const ratingInput = document.getElementById('rating');
      
        if (namaInput.value.trim() === '') {
            alert('Title is required.');
            return false;
        }
      
        if (ratingInput.value.trim() === '') {
            alert('Rating is required.');
            return false;
        }
      
        return true;
    }
  
    // Function to get cookie value by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
  }); //end document.addEventListener('DOMContentLoaded', function () {
  