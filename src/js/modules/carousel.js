// Configures carousel scroll distance so the loop restarts right after last card.
export function initCarousel () {
  const track = document.querySelector('.card-track')
  const container = track?.parentElement
  if (!track || !container) return

  const setScrollDistance = () => {
    const distance = Math.max(track.scrollWidth - container.clientWidth, 0)
    track.style.setProperty('--scroll-distance', `${distance}px`)
  }

  setScrollDistance()
  window.addEventListener('resize', setScrollDistance)
}
