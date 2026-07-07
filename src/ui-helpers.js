export function createOverlay(id, className, innerHTML, bindings) {
  removeOverlay(id)
  const el = document.createElement('div')
  el.className = className
  el.id = id
  el.innerHTML = innerHTML
  document.body.appendChild(el)

  if (bindings) {
    for (const [selector, event, handler] of bindings) {
      const target = selector ? el.querySelector(selector) : el
      if (target) target.addEventListener(event, handler)
    }
  }

  el.addEventListener('click', (e) => {
    if (e.target === el) removeOverlay(id)
  })

  return el
}

export function removeOverlay(id) {
  const el = document.getElementById(id)
  if (el) el.parentNode?.removeChild(el)
}

export function fmt(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return Math.floor(n).toString()
}

export function levelStars(level, maxLevel) {
  if (maxLevel == null) maxLevel = 3
  return '★'.repeat(level) + '☆'.repeat(maxLevel - level)
}
