// Toggles body dark-mode class and syncs button label.
export function initDarkMode () {
  const toggle = document.getElementById('darkModeToggle')
  if (!toggle) return
  const updateLabel = () => {
    const span = toggle.querySelector('span')
    if (!span) return
    span.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode'
  }
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')
    updateLabel()
  })
  updateLabel()
}
