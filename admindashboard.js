document.addEventListener('DOMContentLoaded', function () {
  
  // Fungsi menutup modal konfirmasi penghapusan
  const closeDeleteConfirmationModal = () => {
    document.getElementById('deleteConfirmationModal').classList.remove('is-active');
  };

  // Fungsi dapatkan nilai cookie berdasarkan nama
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

    const fetchData = async () => {
      try {
        const token = getCookie('token'); // dapatkan token dari cookie
        const response = await fetch('https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/Function-3ReadWisata', {
            headers: {
              'Authorization': `Bearer ${token}`, // tambahkan header Authorization dengan token
            },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();

        // cek respon
        if (Array.isArray(jsonData)) {
          return { data: jsonData }; // Wrap the array in an object with a 'data' property
        } else {
        console.error('Invalid data structure in response:', jsonResponse);
        return null;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    };
  
        
        const fillTable = (data) => {
          const tableBody = document.getElementById('table-body');
  
            
          tableBody.innerHTML = '';
  
          // Cek apakah data ada di dalam property "data"
          if (data && data.data) {
          // Iterasi melalui data dan tambahkan baris baru ke tabel
          data.data.forEach((item) => {
              const row = 
              `
                  <tr>
                      
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
  
          
          const deleteButtons = document.querySelectorAll('.delete-post');
          deleteButtons.forEach(button => {
              button.addEventListener('click', () => {
              const postName = button.getAttribute('data-post-name');
              //const postId = button.dataset.postId;
              showDeleteConfirmationModal(postName);
            });
          });
  
          
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
      }; //end const fillTable = (data) => {

  
    const showDeleteConfirmationModal = (postName) => {
      const deleteConfirmButton = document.getElementById('deleteConfirmButton');
  
      // Menampilkan nama post yang akan dihapus di dalam modal
      document.getElementById('postNameToDelete').innerHTML = `Post: ${postName}`;
  
      deleteConfirmButton.onclick = async () => {
        const token = getCookie('token'); // Mendapatkan token dari cookie
        const apiUrl = `https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/Function-5DeleteWisata`;
  
        try {
          const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'token': token, // Menambahkan header Authorization dengan token
            },
            body: JSON.stringify({
              filter: {
                nama: postName,
              },
            }),
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log(data);
  
          
          fetchData().then((data) => fillTable(data));
        } catch (error) {
          console.error('Error deleting data:', error);
          
          alert('Error deleting data. Please try again.');
        } finally {
          
          closeDeleteConfirmationModal();
        }
      };
  
      // Tampilkan modal konfirmasi penghapusan
      document.getElementById('deleteConfirmationModal').classList.add('is-active');
    };
  
    
    const editButtons = document.querySelectorAll('.edit-post');
    editButtons.forEach(button => {
    button.addEventListener('click', () => {
        const postName = button.getAttribute('data-post-name');
        window.location.href = `formedit.html?postName=${postName}`;
      });
    });
  
    fetchData().then((data) => fillTable(data));
  
  });
  