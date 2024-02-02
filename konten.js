document.addEventListener('DOMContentLoaded', function () {
    const cardContainer = document.getElementById('card-container');

    const fetchData = async () => {
        try {
            const response = await fetch('https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/Function-3ReadWisata');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    const fillCardContainer = (data) => {
        if (data && Array.isArray(data)) {
            data.forEach((item) => {
                const card = document.createElement('div');
                card.className = 'column is-4';
                card.innerHTML = `
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="${item.gambar}" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <p class="title">${item.nama}</p>
                            <p class="subtitle">${item.jenis}</p>
                        </div>
                        <div class="card-footer">
                            <a href="#" class="card-footer-item">Baca Lebih Lanjut</a>
                        </div>
                    </div>
                `;
                cardContainer.appendChild(card);
            });
        } else {
            console.error('Invalid data structure:', data);
        }
    };

    fetchData().then((data) => fillCardContainer(data));
});
