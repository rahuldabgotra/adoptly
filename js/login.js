document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok && data.name && data.email) {
            // Store user in localStorage
            const currentUser = {
                name: data.name,
                email: data.email,
                userId: data.userId || null
            };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            sessionStorage.setItem('loggedIn', 'true');

            // Redirect to homepage
            window.location.href = 'index.html';
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Login request failed.');
    }
});
