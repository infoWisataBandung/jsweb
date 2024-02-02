document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const no_whatsappInput = document.getElementById('no_whatsapp');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const registerApiUrl = 'https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/function-1SIGNAUTHWA';

    // Add event listener for form submission
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const no_whatsapp = no_whatsappInput.value;
        const username = usernameInput.value;
        const password = passwordInput.value;
        const role = 'user';

        try {
            const response = await fetch(registerApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, no_whatsapp, role }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.status === true) {
                    // Redirect to success page
                    window.location.href = '../pages/suksesDaftar.html';
                } else {
                    errorMessage.textContent = 'Failed to register.';
                }
            } else {
                const data = await response.json();
                if (data.status === false) {
                    errorMessage.textContent = data.message;
                } else {
                    errorMessage.textContent = 'Failed to register.';
                }
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });
});
