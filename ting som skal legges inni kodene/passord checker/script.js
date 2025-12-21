const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const meterFill = document.getElementById('meterFill');
const strengthText = document.getElementById('strengthText');
const charCount = document.getElementById('charCount');

// Toggle password visibility
togglePassword.addEventListener('click', function() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    this.textContent = type === 'password' ? '👁️' : '🙈';
});

// Password strength checker
passwordInput.addEventListener('input', function() {
    const password = this.value;
    
    // Update character count
    const count = password.length;
    charCount.textContent = count + (count === 1 ? ' tegn' : ' tegn');
    
    // Check requirements
    const requirements = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };

    // Update requirement indicators
    updateRequirement('req-length', requirements.length);
    updateRequirement('req-lowercase', requirements.lowercase);
    updateRequirement('req-uppercase', requirements.uppercase);
    updateRequirement('req-number', requirements.number);
    updateRequirement('req-symbol', requirements.symbol);

    // Calculate strength
    const metRequirements = Object.values(requirements).filter(Boolean).length;
    updateStrength(metRequirements, password.length);
});

function updateRequirement(id, met) {
    const element = document.getElementById(id);
    if (met) {
        element.classList.add('met');
    } else {
        element.classList.remove('met');
    }
}

function updateStrength(metRequirements, length) {
    // Remove all classes
    meterFill.className = 'meter-fill';
    
    if (length === 0) {
        strengthText.textContent = '-';
        return;
    }

    if (metRequirements <= 2) {
        meterFill.classList.add('weak');
        strengthText.textContent = 'Svakt';
        strengthText.style.color = '#ff4757';
    } else if (metRequirements === 3) {
        meterFill.classList.add('fair');
        strengthText.textContent = 'Middels';
        strengthText.style.color = '#ffa502';
    } else if (metRequirements === 4) {
        meterFill.classList.add('good');
        strengthText.textContent = 'Bra';
        strengthText.style.color = '#1e90ff';
    } else if (metRequirements === 5) {
        meterFill.classList.add('strong');
        strengthText.textContent = 'Sterkt';
        strengthText.style.color = '#2ecc71';
    }
}
