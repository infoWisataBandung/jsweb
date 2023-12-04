document.addEventListener('DOMContentLoaded', function () {
    // Fungsi untuk mendapatkan data dari API MongoDB
    const fetchData = async () => {
        try {
            const response = await fetch('https://us-central1-bustling-walker-340203.cloudfunctions.net/function-7ReadWisata');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fungsi untuk mengisi tabel dengan data
    const fillTable = (data) => {
    const tableBody = document.getElementById('table-body');

    // Bersihkan isi tabel sebelum mengisi data baru
    tableBody.innerHTML = '';

    // Cek apakah data ada di dalam property "data"
    if (data && data.data) {
        // Iterasi melalui data dan tambahkan baris baru ke tabel
        data.data.forEach((item) => {
            const row = 
            `
                <tr>
                    <td class="is-checkbox-cell">
                        <label class="b-checkbox checkbox">
                            <input type="checkbox" value="false">
                            <span class="check"></span>
                        </label>
                    </td>
                    <td data-label="Judul">${item.nama}</td>
                    <td data-label="Jenis">${item.jenis}</td>
                    <td data-label="Alamat">${item.alamat}</td>
                    <td data-label="Rating">${item.rating}</td>
                    <td class="is-actions-cell">
                        <div class="buttons is-right">
                            <button class="button is-small is-warning" type="button">
                                <span class="icon"><i class="mdi mdi-file-edit"></i></span>
                            </button>
                            <button class="button is-small is-danger jb-modal" data-target="modals" type="button">
                                <span class="icon"><i class="mdi mdi-trash-can"></i></span>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            // Tambahkan baris ke tabel
            tableBody.innerHTML += row;
        });
    } else {
        console.error('Data structure is not as expected:', data);
    }
    };

    // Panggil fetchData dan fillTable ketika halaman dimuat
    fetchData().then((data) => fillTable(data));

    // Event listener for delete button click
    document.getElementById('table-body').addEventListener('click', function (event) {
        if (event.target.classList.contains('is-danger')) {
            // Show the delete confirmation modal
            document.getElementById('deleteModal').classList.add('is-active');

            // Event listener for confirm delete button click
            document.getElementById('confirmDelete').addEventListener('click', function () {
                // Close the modal
                document.getElementById('deleteModal').classList.remove('is-active');

                // Get the post ID from the clicked row (adjust this based on your data structure)
                const postId = event.target.closest('tr').dataset.postId;

                // Call the API to delete the post
                deletePost(postId);
            });

            // Event listener for modal close
            document.querySelector('.jb-modal-close').addEventListener('click', function () {
                document.getElementById('deleteModal').classList.remove('is-active');
            });
        }
    });

    // Function to delete post by calling the API
    const deletePost = async (postId) => {
        try {
            const response = await fetch('https://us-central1-bustling-walker-340203.cloudfunctions.net/function-9DeleteWisata', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if needed
                },
                body: JSON.stringify({
                    filter: { _id: postId }, // Adjust this based on your data structure
                }),
            });

            if (!response.ok) {
                throw new Error('Error deleting post');
            }

            // Fetch and fill the table again after deletion
            const data = await fetchData();
            fillTable(data);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


});
