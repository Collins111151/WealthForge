let balance = 10; // Initial bonus
let balanceVisible = true;

document.getElementById('balance').innerText = balance;

document.getElementById('toggleBalance').addEventListener('click', () => {
    balanceVisible = !balanceVisible;
    document.getElementById('balance').innerText = balanceVisible ? balance : '****';
});

document.getElementById('toggleHistory').addEventListener('click', () => {
    const history = document.getElementById('transactionHistory');
    history.classList.toggle('hidden');
});

document.getElementById('claimBonusButton').addEventListener('click', () => {
    claimBonus();
});

function claimBonus() {
    balance += 3;
    document.getElementById('balance').innerText = balanceVisible ? balance : '****';
    document.getElementById('claimBonusButton').disabled = true;
    setTimeout(() => {
        document.getElementById('claimBonusButton').disabled = false;
    }, 86400000); // Enable button after 24 hours
}

function deposit() {
    const amount = parseFloat(document.getElementById('depositAmount').value);
    const depositMessage = document.getElementById('depositMessage');
    if (isNaN(amount) || amount <= 0) return alert('Invalid amount');
    depositMessage.textContent = 'Pending';
    setTimeout(() => {
        analyzeDeposit(amount);
    }, 30000); // Verify deposit in 30 seconds
}

function analyzeDeposit(expectedAmount) {
    const depositMessage = document.getElementById('depositMessage');
    const depositScreenshot = document.getElementById('depositScreenshot').files[0];
    if (!depositScreenshot) return alert('Please upload a screenshot.');

    const reader = new FileReader();
    reader.onload = function (e) {
        // Placeholder for image analysis
        // Ideally, this would be replaced with actual image analysis logic
        const correctAmount = true; // Simulated verification result
        const correctWallet = true; // Simulated verification result

        if (correctAmount && correctWallet) {
            balance += expectedAmount;
            document.getElementById('balance').innerText = balanceVisible ? balance : '****';
            addHistory('Deposit', expectedAmount);
            depositMessage.textContent = 'Deposit successful';
        } else {
            depositMessage.textContent = 'Deposit failed. Incorrect details.';
        }
    };
    reader.readAsDataURL(depositScreenshot);
}

function withdrawStep1() {
    document.getElementById('withdrawWalletStep').classList.remove('hidden');
    document.getElementById('withdrawAmountStep').classList.add('hidden');
    document.getElementById('withdrawMessage').textContent = '';
}

function withdrawStep2() {
    const walletAddress = document.getElementById('withdrawWallet').value;
    if (walletAddress.length !== 20) return alert('Invalid wallet address');
    document.getElementById('withdrawWalletStep').classList.add('hidden');
    document.getElementById('withdrawAmountStep').classList.remove('hidden');
}

function withdraw() {
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    if (isNaN(amount) || amount <= 0 || amount > balance) return alert('Invalid amount');
    balance -= amount;
    document.getElementById('balance').innerText = balanceVisible ? balance : '****';
    addHistory('Withdraw', amount);
    showMessage('withdrawMessage', 'Withdrawal successful');
}

function invest() {
    const plan = parseFloat(document.getElementById('investmentPlan').value);
    if (plan > balance) return alert('Insufficient balance');
    balance -= plan;
    document.getElementById('balance').innerText = balanceVisible ? balance : '****';
    addHistory('Invest', plan);
    showMessage('investMessage', 'Plan successfully purchased, would reflect after being reviewed');
    setTimeout(() => {
        const profit = plan * 3;
        balance += profit;
        document.getElementById('balance').innerText = balanceVisible ? balance : '****';
        addHistory('Investment Return', profit);
    }, 30000); // Give profit in 30 seconds
}

function connectWallet() {
    const address = document.getElementById('walletAddress').value;
    if (address.length !== 20) return alert('Invalid wallet address');
    showMessage('walletMessage', 'Submitted successfully');
}

function addHistory(type, amount) {
    const history = document.getElementById('transactionHistory');
    const listItem = document.createElement('li');
    listItem.textContent = `${type}: $${amount}`;
    history.appendChild(listItem);
}

function showMessage(elementId, message) {
    const messageElement = document.getElementById(elementId);
    messageElement.textContent = message;
    setTimeout(() => {
        messageElement.textContent = '';
    }, 5000);
}

function toggleSection(sectionId) {
    const sections = document.querySelectorAll('.action-section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.toggle('hidden');
            document.querySelector('.overlay').style.display = section.classList.contains('hidden') ? 'none' : 'block';
        } else {
            section.classList.add('hidden');
        }
    });
}

document.querySelector('.overlay').addEventListener('click', () => {
    const sections = document.querySelectorAll('.action-section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    document.querySelector('.overlay').style.display = 'none';
});