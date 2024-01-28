document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("showSectionBtn").addEventListener("click", function () {
        showSection();
    });

    document.getElementById("searchLocationBtn").addEventListener("click", function () {
        searchLocation();
    });
});

// function showSection() {
//     document.getElementById("section2").classList.remove("section-hidden");
//     window.scrollTo({
//         top: document.getElementById("section2").offsetTop,
//         behavior: 'smooth'
//     });
// }

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
    var address = getAddressFromCoordinates(latitude, longitude);

    document.getElementById("resultSection").style.display = "block";
    document.getElementById("addressResult").innerHTML = "<strong>Alamat Destinasi:</strong> " + address;
}

function getAddressFromCoordinates(latitude, longitude) {
    return "Jalan Contoh, Kota Contoh, Negara Contoh";
}