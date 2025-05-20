
// Theme Button
const themeToggle = document.getElementById('theme-toggle');

// Check if a theme is saved in local storage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

// Toggle theme and save state
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const authNav = document.getElementById('authNav');
    const authButton = document.getElementById('authButton');
    const authModal = document.getElementById('authModal');
    const closeModal = document.querySelector('.close');
    const authSubmit = document.getElementById('authSubmit');
    const authTitle = document.getElementById('authTitle');
    const authUsername = document.getElementById('authUsername');
    const authPassword = document.getElementById('authPassword');
    const toggleAuth = document.getElementById('toggleAuth');
    const switchMode = document.getElementById('switchMode');

    let isLoginMode = true;

    const updateNav = () => {
        const user = localStorage.getItem('loggedInUser');
        authNav.innerHTML = user
            ? `<a href="#" id="logoutLink">Logout (${user})</a>`
            : `<a href="#" id="authButton">Login</a>`;
    };

    updateNav();

    document.addEventListener('click', (e) => {
        if (e.target.id === 'authButton') {
            isLoginMode = true;
            authTitle.textContent = 'Login';
            authSubmit.textContent = 'Login';
            toggleAuth.innerHTML = `Don't have an account? <a href="#" id="switchMode">Sign up</a>`;
            authModal.classList.remove('hidden');
        }

        if (e.target.id === 'logoutLink') {
            localStorage.removeItem('loggedInUser');
            updateNav();
        }

        if (e.target.id === 'switchMode') {
            e.preventDefault();
            isLoginMode = !isLoginMode;
            authTitle.textContent = isLoginMode ? 'Login' : 'Sign Up';
            authSubmit.textContent = isLoginMode ? 'Login' : 'Sign Up';
            toggleAuth.innerHTML = isLoginMode
                ? `Don't have an account? <a href="#" id="switchMode">Sign up</a>`
                : `Already have an account? <a href="#" id="switchMode">Login</a>`;
        }
    });

    authSubmit.addEventListener('click', () => {
        const username = authUsername.value.trim();
        const password = authPassword.value;

        if (!username || !password) return alert('Please enter both fields');

        const users = JSON.parse(localStorage.getItem('users')) || {};

        if (isLoginMode) {
            if (users[username] && users[username] === password) {
                localStorage.setItem('loggedInUser', username);
                authModal.classList.add('hidden');
                updateNav();
            } else {
                alert('Invalid credentials.');
            }
        } else {
            if (users[username]) {
                alert('User already exists.');
            } else {
                users[username] = password;
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('loggedInUser', username);
                authModal.classList.add('hidden');
                updateNav();
            }
        }
    });

    closeModal.addEventListener('click', () => {
        authModal.classList.add('hidden');
    });
});
