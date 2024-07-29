const registeredEmails = ['test@example.com']; // Simulated database of registered emails
const registeredUsers = [{ email: 'test@example.com', password: 'password123' }]; // Simulated database of users

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const user = registeredUsers.find(user => user.email === email);
    if (user && user.password === password) {
        showLoading();
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 5000);
    } else {
        document.getElementById('loginError').textContent = 'Incorrect email or password';
    }
}

function createAccount() {
    const email = document.getElementById('createEmail').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const address = document.getElementById('address').value;
    
    if (registeredEmails.includes(email)) {
        document.getElementById('createError').textContent = 'Email is already registered';
        return;
    }
    if (password !== confirmPassword) {
        document.getElementById('createError').textContent = 'Passwords do not match';
        return;
    }
    
    // Simulate account creation
    registeredEmails.push(email);
    registeredUsers.push({ email, password, username, address });
    
    showLoading();
    setTimeout(() => {
        window.location.href = 'WealthForge3.html';
    }, 5000);
}

function showLoading() {
    document.querySelector('.form-container').style.display = 'none';
    document.getElementById('loading').style.display = 'flex';
}