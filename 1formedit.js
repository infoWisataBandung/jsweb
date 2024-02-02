function getParameterByName(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

document.addEventListener('DOMContentLoaded', function () {
    const postName = getParameterByName('postName');
    const submitBtn = document.getElementById('editBtn');

    // Add an event listener to the submit button
    submitBtn.addEventListener('click', function () {
        submitForm();
    });

    // Add file input functionality
    const fileInput = document.querySelector('#file-js-example input[type=file]');
    fileInput.onchange = () => {
        if (fileInput.files.length > 0) {
            const fileName = document.querySelector('#file-js-example .file-name');
            fileName.textContent = fileInput.files[0].name;
        }
    };

    // Fetch data for the selected post and populate the form fields
    const fetchDataForEdit = async () => {
        try {
            const response = await fetch(`https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/Function-3ReadWisata?nama=${postName}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data for edit:', error);
            return null;
        }
    };

    // Populate the form fields with the fetched data
    const populateFormForEdit = async () => {
        const data = await fetchDataForEdit();

        if (data && data.data) {
            document.getElementById('nama').value = data.nama;
            document.getElementById('konten').value = data.deskripsi;
            document.getElementById('alamat').value = data.alamat;
            document.getElementById('latitude').value = data.lokasi.latitude;
            document.getElementById('longitude').value = data.lokasi.longitude;

            // Handle file input separately
            const fileInput = document.getElementById('gambar');
            fileInput.parentNode.querySelector('.file-name').innerText = data.gambar;

            document.getElementById('rating').value = data.rating;

            // Set selected category in the dropdown menu
            const categorySelect = document.getElementById('categorySelect');
            const selectedCategory = data.jenis;
            for (let i = 0; i < categorySelect.options.length; i++) {
                if (categorySelect.options[i].value === selectedCategory) {
                    categorySelect.selectedIndex = i;
                    break;
                }
            }
        } else {
            console.error(`Data not found for postName: ${postName}`);
        }
    };

    // Get data and populate the form when the page loads
    populateFormForEdit();

    // Function to submit the form data
    function submitForm() {
        const token = getCookie('token');

        // Validate form data and perform necessary checks
        // ...

        const updatedData = {
            filter: { nama: postName },
            update: {
                $set: {
                    jenis: document.getElementById('categorySelect').value,
                    deskripsi: document.getElementById('konten').value,
                    alamat: document.getElementById('alamat').value,
                    'lokasi.latitude': parseFloat(document.getElementById('latitude').value),
                    'lokasi.longitude': parseFloat(document.getElementById('longitude').value),
                    gambar: document.getElementById('gambar').files[0], // Use files[0] for file input
                    rating: document.getElementById('rating').value,
                },
            },
        };

        // Make a PUT request to the API endpoint with authorization
        fetch('https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/UpdateWisata', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            if (data && data.message === "Data updated successfully") {
                console.log('Update result:', data);
                showNotification("Data has been successfully updated", "success");
                window.location.href = 'admindashboard.html';
            } else {
                throw new Error('Unexpected response format');
            }
        })
        .catch(error => {
            console.error('Error updating data:', error);
            showNotification("Failed to update data. Please try again.", "danger");
        });
    }

    // Function to show notifications
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

    // Function to get cookie value by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
});
