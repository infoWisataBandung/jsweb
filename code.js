const fetchData = async () => {
    try {
        const response = await fetch('https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/function-7ReadWisata');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.text) {
            console.error('Server response text:', await error.response.text());
        }
        return null;
    }
};




