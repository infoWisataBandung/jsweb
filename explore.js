document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchBtn").addEventListener("click", function () {
        getCoordinates();
    });

    document.getElementById("showSectionBtn").addEventListener("click", function () {
        showSection();
    });

    document.getElementById("searchLocationBtn").addEventListener("click", function () {
        searchLocation();
    });
});

function getCoordinates() {
    var inputName = document.getElementById("input1").value;

    // Encode the inputName to make it suitable for a URL
    var encodedName = encodeURIComponent(inputName);

    
    fetch(`https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/function-10GeocodingAPI?name=${encodedName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Check if data is not undefined and has the expected format
            if (data) {
                var coordinates = parseCoordinates(data);

                // Update latitude and longitude in the table
                document.getElementById("latitude").textContent = coordinates.latitude;
                document.getElementById("longitude").textContent = coordinates.longitude;

                
                showSection();
            } else {
                console.error('Error: Data is undefined or in unexpected format');
            }
        })
        .catch(error => console.error('Error:', error.message));
}


function parseCoordinates(result) {
    // Split the result string into an array of coordinates
    var coordinatesArray = result.split(', ');

    // Extract latitude and longitude from the array
    var latitude = coordinatesArray[0].replace('Latitude: ', '').trim();
    var longitude = coordinatesArray[1].replace('Longitude: ', '').trim();

    return {
        latitude: latitude,
        longitude: longitude
    };
}

function showSection() {
    var section2 = document.getElementById("section2");

    if (section2) {
        section2.classList.remove("section-hidden");
        window.scrollTo({
            top: section2.offsetTop,
            behavior: 'smooth'
        });
    } else {
        console.error("Element with ID 'section2' not found!");
    }
}

function searchLocation() {
    var latitude = document.getElementById("inputLatitude").value;
    var longitude = document.getElementById("inputLongitude").value;

    
    fetch(`https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/function-10ReverseGeocodingAPI?latitude=${latitude}&longitude=${longitude}`)
        .then(response => response.json())
        .then(data => {
            // Display the address result
            document.getElementById("addressResult").innerHTML = "<strong>Alamat Destinasi:</strong> " + data.result;
        })
        .catch(error => console.error('Error:', error));
}
