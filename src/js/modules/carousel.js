// Duplicates carousel cards for seamless loop and hides cloned items from a11y/tab flow.
export function initCarousel () {
  const track = document.querySelector('.card-track')
  if (!track || track.dataset.duplicated === 'true') return
  const markup = track.innerHTML
  if (!markup.trim()) return
  const originalCount = track.children.length
  track.insertAdjacentHTML('beforeend', markup)
  for (let i = originalCount; i < track.children.length; i++) {
    const el = track.children[i]
    el.setAttribute('aria-hidden', 'true')
    el.querySelectorAll && el.querySelectorAll('a,button').forEach((node) => node.setAttribute('tabindex', '-1'))
  }
  track.dataset.duplicated = 'true'
}
