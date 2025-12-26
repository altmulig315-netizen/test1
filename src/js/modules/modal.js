// Simple gallery modal toggling with click/escape close behavior.
export function initModal () {
  const modal = document.getElementById('galleryModal')
  const closeBtn = document.getElementById('galleryClose')
  if (!modal || !closeBtn) return

  const closeModal = () => {
    modal.dataset.open = 'false'
    modal.setAttribute('aria-hidden', 'true')
  }

  closeBtn.addEventListener('click', closeModal)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal()
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.dataset.open === 'true') closeModal()
  })
}
