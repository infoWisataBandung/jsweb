// forms2.js

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
      resetForm();
    });
  
    // Function to submit the form data
    function submitForm() {
      const categorySelect = document.getElementById('categorySelect');
      const namaInput = document.getElementById('nama');
      const kontenTextarea = document.getElementById('konten');
      const alamatInput = document.getElementById('alamat');
      const gambarInput = document.getElementById('gambar');
      const ratingInput = document.getElementById('rating');
  
      // Validate form data before sending
      if (!validateForm()) {
        return;
      }
  
      // Prepare the data object to be sent
      const formData = {
        category: categorySelect.value,
        nama: namaInput.value,
        konten: kontenTextarea.value,
        alamat: alamatInput.value,
        gambar: gambarInput.value, // You might need to adjust this based on your requirements
        rating: parseFloat(ratingInput.value)
      };
  
      // Make a POST request to the API endpoint
      fetch('https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/CreateWIsataToken1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log('Success:', data);
        // You can handle success accordingly, for example, display a success message or redirect the user
      })
      .catch((error) => {
        console.error('Error:', error);
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
  });
  