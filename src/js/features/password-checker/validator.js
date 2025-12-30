// Password strength widget: toggles visibility, evaluates requirements,
// updates meter, and syncs requirement indicators.
import { sanitizeText, validateText, escapeHtml } from '../../core/utils.js'

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
      // Prevent paste of potentially malicious content
      this.passwordInput.addEventListener('paste', (e) => this.handlePaste(e))
  }

  togglePasswordVisibility () {
    const type = this.passwordInput.type === 'password' ? 'text' : 'password'
    this.passwordInput.type = type
    this.togglePassword.textContent = type === 'password' ? '👁️' : '🙈'
  }

    handlePaste (event) {
      event.preventDefault()
      const pastedText = (event.clipboardData || window.clipboardData).getData('text')
      const sanitized = sanitizeText(pastedText, {
        maxLength: 128,
        allowNewlines: false,
        trim: false
      })
    
      // Insert sanitized text at cursor position
      const start = this.passwordInput.selectionStart
      const end = this.passwordInput.selectionEnd
      const currentValue = this.passwordInput.value
    
      this.passwordInput.value = currentValue.substring(0, start) + sanitized + currentValue.substring(end)
      this.passwordInput.selectionStart = this.passwordInput.selectionEnd = start + sanitized.length
    
      // Trigger input event to update strength meter
      this.passwordInput.dispatchEvent(new Event('input'))
    }

  checkPassword () {
      const rawPassword = this.passwordInput.value
    
      // Sanitize input
      const password = sanitizeText(rawPassword, {
        maxLength: 128,
        allowNewlines: false,
        allowSpecialChars: true,
        trim: false
      })
    
      // Update input if sanitized version differs
      if (password !== rawPassword) {
        this.passwordInput.value = password
      }
    
      // Validate password
      const validation = validateText(password, {
        maxLength: 128,
        allowEmpty: true
      })
    
      if (!validation.valid && password.length > 0) {
        this.showError(validation.errors[0])
        return
      }
    
    const count = password.length
      // Use textContent for safe output
      this.charCount.textContent = `${count} tegn`
    
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

    showError (message) {
      // Create or update error message element
      let errorEl = document.getElementById('password-error')
      if (!errorEl) {
        errorEl = document.createElement('div')
        errorEl.id = 'password-error'
        errorEl.className = 'error-message'
        errorEl.style.color = '#ff4757'
        errorEl.style.fontSize = '0.9rem'
        errorEl.style.marginTop = '0.5rem'
        this.passwordInput.parentNode.insertBefore(errorEl, this.passwordInput.nextSibling)
      }
      errorEl.textContent = message
    
      // Auto-hide after 3 seconds
      setTimeout(() => {
        if (errorEl.parentNode) {
          errorEl.textContent = ''
        }
      }, 3000)
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
