document.addEventListener('DOMContentLoaded', function () {
    // const urlParams = new URLSearchParams(window.location.search);
    // const postName = urlParams.get('postName');
    const postName = getParameterByName('postName');

    // Mengambil data berdasarkan postName
    // You need to implement this fetch function based on your API
    // const fetchDataForEdit = async (postName) => {
    const fetchDataForEdit = async () => {
        try {
            const response = await fetch(`https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/function-7ReadWisata?nama=${postName}`);
            //const data = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
            
            // Temukan data yang sesuai dengan postName
            // const postData = data.data.find(item => item.nama === postName);
            // return postData;
        } catch (error) {
            console.error('Errorr fetching data for edit:', error);
            //baru
            return null;
        }
    };

    // Fungsi untuk mengisi formulir dengan data
    const populateFormForEdit = async () => {
        const data = await fetchDataForEdit(postName);

        // Mengisi bidang formulir dengan data
        if (data && data.data) {
            document.getElementById('nama').value = data.nama;
            document.getElementById('konten').value = data.deskripsi;
            document.getElementById('alamat').value = data.alamat;

            // Menangani input file secara terpisah
            const fileInput = document.getElementById('gambar');
            fileInput.parentNode.querySelector('.file-name').innerText = data.gambar;

            document.getElementById('rating').value = data.rating;

            // Tetapkan kategori yang dipilih di menu dropdown
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

    // Mengambil data dan mengisi formulir saat memuat halaman
    populateFormForEdit();

    // Set up event listener for Done button
    const submitBtn = document.getElementById('editBtn');
    submitBtn.addEventListener('click', async () => {
        // Tangani pengisian formulir di sini
        const updatedData = {
            filter: { nama: postName },
            update: {
                $set: {
                    jenis: document.getElementById('categorySelect').value,
                    deskripsi: document.getElementById('konten').value,
                    //nama: document.getElementById('nama').value,
                    alamat: document.getElementById('alamat').value,
                    gambar: document.getElementById('gambar').value,
                    rating: document.getElementById('rating').value,
                    // ... other fields
                },
            },
            //nama: document.getElementById('nama').value,
            // deskripsi: document.getElementById('konten').value,
            // alamat: document.getElementById('alamat').value,
            // gambar: document.getElementById('gambar').value,
            // rating: document.getElementById('rating').value,
            // jenis: document.getElementById('categorySelect').value,
        }; //const updatedData = {

        // Tangani panggilan API update di sini
        //await updateDataFunction(updatedData);

        // Alihkan ke dasbord setelah pembaruan berhasil
        //window.location.href = 'admindashboard.html';
        try {
            await updateDataFunction(updatedData);

            // Fetch and fill the table after successful update
            //fetchData().then((data) => fillTable(data));
            // Redirect to dashboard after successful update
            window.location.href = 'admindashboard.html';
        } catch (error) {
            console.error('Errorr updating data:', error);
            // Show an alert or handle the error accordingly
        }
    });    

});
      
// Add this function to handle the API call for updating data
const updateDataFunction = async (data) => {
    try {
        const response = await fetch('https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/function-8UpdateWisata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        //console.log('Update result:', result);

        // Check if the expected result structure is present
        if (result && result.message === "Data updated successfully") {
            console.log('Update result:', result);
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        console.error('Errorr updating data:', error);
        throw error; // Re-throw the error for the calling function to catch
    }
    
    fetchDataForEdit(postName).then(data => {
        populateFormForEdit(data);
    });
};