// Password strength widget: toggles visibility, evaluates requirements,
// updates meter, and syncs requirement indicators.
export class PasswordChecker {
  constructor () {
    this.passwordInput = document.getElementById('password')
    this.togglePassword = document.getElementById('togglePassword')
    this.meterFill = document.getElementById('meterFill')
    this.strengthText = document.getElementById('strengthText')
    this.charCount = document.getElementById('charCount')
    if (!this.passwordInput || !this.togglePassword || !this.meterFill || !this.strengthText || !this.charCount) {
      return
    }
    this.requirements = ['length', 'lowercase', 'uppercase', 'number', 'symbol']
    this.initElements()
    this.attachEventListeners()
  }

  initElements () {
    this.requirementEls = {
      length: document.getElementById('req-length'),
      lowercase: document.getElementById('req-lowercase'),
      uppercase: document.getElementById('req-uppercase'),
      number: document.getElementById('req-number'),
      symbol: document.getElementById('req-symbol')
    }
  }

  attachEventListeners () {
    this.togglePassword.addEventListener('click', () => this.togglePasswordVisibility())
    this.passwordInput.addEventListener('input', () => this.checkPassword())
  }

  togglePasswordVisibility () {
    const type = this.passwordInput.type === 'password' ? 'text' : 'password'
    this.passwordInput.type = type
    this.togglePassword.textContent = type === 'password' ? '👁️' : '🙈'
  }

  checkPassword () {
    const password = this.passwordInput.value
    const count = password.length
    this.charCount.textContent = `${count} ${count === 1 ? 'tegn' : 'tegn'}`
    const requirements = {
      length: password.length >= 12,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[!@#$%^&*()_+=\]{};':"\\|,.<>/?-[]/.test(password)
    }
    this.updateRequirements(requirements)
    const metRequirements = Object.values(requirements).filter(Boolean).length
    this.updateStrength(metRequirements, password.length)
  }

  updateRequirements (reqs) {
    Object.entries(reqs).forEach(([key, met]) => {
      const el = this.requirementEls[key]
      if (!el) return
      if (met) el.classList.add('met')
      else el.classList.remove('met')
    })
  }

  updateStrength (metRequirements, length) {
    this.meterFill.className = 'meter-fill'
    if (length === 0) {
      this.strengthText.textContent = '-'
      return
    }
    if (metRequirements <= 2) {
      this.meterFill.classList.add('weak')
      this.strengthText.textContent = 'Svakt'
      this.strengthText.style.color = '#ff4757'
    } else if (metRequirements === 3) {
      this.meterFill.classList.add('fair')
      this.strengthText.textContent = 'Middels'
      this.strengthText.style.color = '#00ffff'
    } else if (metRequirements === 4) {
      this.meterFill.classList.add('good')
      this.strengthText.textContent = 'Bra'
      this.strengthText.style.color = '#1e90ff'
    } else if (metRequirements === 5) {
      this.meterFill.classList.add('strong')
      this.strengthText.textContent = 'Sterkt'
      this.strengthText.style.color = '#2ecc71'
    }
  }
}
