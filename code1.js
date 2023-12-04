document.addEventListener('DOMContentLoaded', function () {
    const postName = getParameterByName('postName');

    // Fungsi untuk mendapatkan data dari API MongoDB berdasarkan nama post
    const fetchDataForEdit = async () => {
        try {
            const response = await fetch(`https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/function-8ReadOneWisata?nama=${postName}`);
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

    // Fungsi untuk mengisi formulir dengan data
    const populateFormForEdit = async () => {
        try {
            const dataForEdit = await fetchDataForEdit();

            if (dataForEdit && dataForEdit.data) {
                const formData = dataForEdit.data;

                // Populate the form fields with the retrieved data
                document.getElementById('nama').value = formData.nama;
                document.getElementById('categorySelect').value = formData.jenis;
                document.getElementById('konten').value = formData.deskripsi;
                document.getElementById('alamat').value = formData.alamat;
                document.getElementById('rating').value = formData.rating;

                // Handle image field separately, assuming 'gambar' is the correct field name
                // Update this part if the actual field name is different
                const imageInput = document.getElementById('gambar');
                if (imageInput) {
                    // You might need to handle the image input differently based on your structure
                    // If 'gambar' is a file input, you'll need to update its value or handle it accordingly
                    // Example: imageInput.value = formData.gambar;
                }
            } else {
                console.error('Data structure is not as expected for edit:', dataForEdit);
                // Handle the case where data is not found
                alert('Data not found for editing.');
            }
        } catch (error) { //try {
            console.error('Error populating form for edit:', error);
        }
    };

    // Call the function to populate the form
    populateFormForEdit();
});
