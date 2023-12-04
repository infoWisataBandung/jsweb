document.addEventListener('DOMContentLoaded', function () {
    // Fungsi untuk mendapatkan data dari API MongoDB
    const fetchData = async () => {
        try {
            const response = await fetch('https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/function-7ReadWisata');
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Errorr fetching data:', error);
            //return null;
            if (error.response && error.response.text) {
                console.error('Server response text:', await error.response.text());
            }
            return null;
        }
    };

    // Fungsi untuk mengisi tabel dengan data
    const fillTable = (data) => {
        const tableBody = document.getElementById('table-body');

        // Bersihkan isi tabel sebelum mengisi data baru   
        tableBody.innerHTML = '';

        try{

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
                                <button class="button is-small is-danger jb-modal delete-post" data-target="deleteConfirmationModal" data-post-name="${item.nama}" type="button">
                                    <span class="icon"><i class="mdi mdi-trash-can"></i></span>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
                // Tambahkan baris ke tabel
                tableBody.innerHTML += row;
            });
    
            // Set up event listeners for delete buttons
            const deleteButtons = document.querySelectorAll('.delete-post');
            deleteButtons.forEach(button => {
                button.addEventListener('click', () => {
                const postName = button.getAttribute('data-post-name');
                //const postId = button.dataset.postId;
                showDeleteConfirmationModal(postName);
              });
            });
    
            // Set up event listeners for edit buttons
            const editButtons = document.querySelectorAll('.button.is-warning');
            editButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const postName = button.parentElement.parentElement.parentElement.querySelector('td[data-label="Judul"]').innerText;
                    // Redirect to the edit form with the postName parameter
                    window.location.href = `formedit.html?postName=${postName}`;
                });
            });
        } else {
            console.error('Data structure is not as expected:', data);
        }
        }catch (error) { //try {
        console.error('Error while filling the table:', error);
        }
    }; //end const fillTable = (data) => {

    

    const showDeleteConfirmationModal = (postName) => {
        const deleteConfirmButton = document.getElementById('deleteConfirmButton');

        // Menampilkan nama post yang akan dihapus di dalam modal
        document.getElementById('postNameToDelete').innerHTML = `Post: ${postName}`;

        deleteConfirmButton.onclick = () => {
        // Panggil API untuk menghapus data berdasarkan nama
        // Ganti URL dengan URL API delete yang sesuai
        const apiUrl = `https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/function-9DeleteWisata`;

        fetch(apiUrl, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              filter: {
                nama: postName,
              },
            }),
        }) //end fetch(apiUrl, {
            

          //update 4
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            // Lakukan sesuatu setelah berhasil menghapus, misalnya refresh tabel
            fetchData().then((data) => fillTable(data));
          })
          .catch(error => {
            console.error('Errorr deleting data:', error);
            // Tampilkan pesan kesalahan ke pengguna
            alert('Error deleting data. Please try again.');
          })
          .finally(() => {
            // Tutup modal konfirmasi penghapusan, baik berhasil maupun gagal
            closeDeleteConfirmationModal();
          });

        }; //end deleteConfirmButton.onclick = () => {
    
        // Tampilkan modal konfirmasi penghapusan
        document.getElementById('deleteConfirmationModal').classList.add('is-active');
    }; // end const showDeleteConfirmationModal = (postId) => {
    
    // Fungsi untuk menutup Modal Konfirmasi Hapus Data?
    const closeDeleteConfirmationModal = () => {
        // Tutup modal konfirmasi penghapusan
        document.getElementById('deleteConfirmationModal').classList.remove('is-active');
    };

    // Set up event listeners for edit buttons
    const editButtons = document.querySelectorAll('.edit-post');
    editButtons.forEach(button => {
    button.addEventListener('click', () => {
        const postName = button.getAttribute('data-post-name');
        // Redirect to the edit form with the postName parameter
        window.location.href = `formedit.html?postName=${postName}`;
      });
    });

  fetchData().then((data) => fillTable(data));

}); //end document.addEventListener('DOMContentLoaded', function () {
