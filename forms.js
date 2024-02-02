document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');

    submitBtn.addEventListener('click', function () {
        submitForm();
    });

    resetBtn.addEventListener('click', function () {
        resetForm();
    });

    // Add file input functionality
    const fileInput = document.querySelector('#file-js-example input[type=file]');
    fileInput.onchange = () => {
        if (fileInput.files.length > 0) {
            const fileName = document.querySelector('#file-js-example .file-name');
            fileName.textContent = fileInput.files[0].name;
        }
    };

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

    // Function to submit the form data
    function submitForm() {
        const categorySelect = document.getElementById('categorySelect');
        const namaInput = document.getElementById('nama');
        const kontenTextarea = document.getElementById('konten');
        const longitudeInput = document.getElementById('longitude');
        const latitudeInput = document.getElementById('latitude');
        const alamatInput = document.getElementById('alamat');
        const gambarInput = document.getElementById('gambar');
        const ratingInput = document.getElementById('rating');
        

        // Get token from cookies
        const token = getCookie('token');

        // Validate form data before sending
        if (!validateForm()) {
            return;
        }

        // Validate latitude and longitude
        if (isNaN(parseFloat(latitudeInput.value)) || isNaN(parseFloat(longitudeInput.value))) {
            alert('Latitude and Longitude must be valid numbers.');
            return;
        }

        // Prepare the data object to be sent
        const formData = new FormData();
        formData.append('nama', namaInput.value);
        formData.append('jenis', categorySelect.value);
        //formData.append('nama', namaInput.value);
        formData.append('deskripsi', kontenTextarea.value);
        // formData.append('longitude', longitudeInput.value);
        formData.append('lokasi.latitude', parseFloat(latitudeInput.value));
        //formData.append('latitude', latitudeInput.value);
        formData.append('lokasi.longitude', parseFloat(longitudeInput.value));
        formData.append('alamat', alamatInput.value);
        formData.append('gambar', gambarInput.files[0]);
        formData.append('rating', parseFloat(ratingInput.value));

        // Make a POST request to the API endpoint with authorization
        fetch('https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/CreateWIsataToken1', {
            method: 'POST',
            headers: {
                'token': token // Add authorization header
            },
            body: formData // Send form data as FormData
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            // console.log('Success:', data);
            // showNotification("Data has been successfully submitted", "success");
            // Handle the response from the server
            console.log('Response:', data);
            if (data.status) {
                showNotification("Data has been successfully submitted", "success");
            } else {
                showNotification("Failed to submit data. " + data.message, "danger");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification("Failed to submit data. Please try again.", "danger");
        });
    }

    function resetForm() {
        //document.getElementById("wisataForm").reset();
        const form = document.getElementById("wisataForm");
        form.reset();

       
        const fileInput = document.querySelector('#file-js-example input[type=file]');
        const fileName = document.querySelector('#file-js-example .file-name');
        fileInput.value = ''; // Clear the file input value
        fileName.textContent = 'No file uploaded'; // Reset the display text
    }

    function validateForm() {
        
        const namaInput = document.getElementById('nama');

        const latitudeInput = document.getElementById('latitude');
        const longitudeInput = document.getElementById('longitude');

        if (namaInput.value.trim() === '') {
            alert('Title is required.');
            return false;
        }

        // Validate latitude and longitude
        const latitude = parseFloat(latitudeInput.value);
        const longitude = parseFloat(longitudeInput.value);

        if (isNaN(latitude) || isNaN(longitude)) {
            alert('Please enter valid latitude and longitude values.');
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
});
