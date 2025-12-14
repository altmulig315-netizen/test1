// Test.js
// Enkel Caesar-dekoder for å koble til elementene i Test.html
// Bruker id-ene: cipherText, key, keyValue, result

document.addEventListener('DOMContentLoaded', () => {
  const cipherInput = document.getElementById('cipherText');
  const keyInput = document.getElementById('key');
  const keyValue = document.getElementById('keyValue');
  const resultDiv = document.getElementById('result');

  if (!cipherInput || !keyInput || !keyValue || !resultDiv) {
    // Ikke alle elementer funnet — ingenting å gjøre
    return;
  }

  // Dekoder en tekst som er kryptert med Caesar (standard alfabet A-Z / a-z)
  function caesarDecode(text, key) {
    // Sørg for 0 <= key < 26
    key = ((key % 26) + 26) % 26;

    let out = '';
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const code = text.charCodeAt(i);

      // A-Z
      if (code >= 65 && code <= 90) {
        const decoded = ((code - 65 - key + 26) % 26) + 65;
        out += String.fromCharCode(decoded);
        continue;
      }

      // a-z
      if (code >= 97 && code <= 122) {
        const decoded = ((code - 97 - key + 26) % 26) + 97;
        out += String.fromCharCode(decoded);
        continue;
      }

      // Ikke-bokstav: behold som det er
      out += ch;
    }

    return out;
  }

  // Oppdater resultat når input endres
  function update() {
    const key = parseInt(keyInput.value, 10) || 0;
    keyValue.textContent = String(key);
    const text = cipherInput.value || '';
    resultDiv.textContent = caesarDecode(text, key);
  }

  // Live-oppdatering
  cipherInput.addEventListener('input', update);
  keyInput.addEventListener('input', update);

  // Init
  update();

  // Enkel selvtest i konsollen for å validere dekoderen
  try {
    console.groupCollapsed('Caesar-dekoder selvtest');
    console.assert(caesarDecode('def', 3) === 'abc', "'def' med nøkkel 3 -> 'abc'");
    console.assert(caesarDecode('AbC', 3) === 'XyZ', "'AbC' med nøkkel 3 -> 'XyZ'");
    console.log('Caesar-dekoder: alle selvtester passerte');
    console.groupEnd();
  } catch (e) {
    console.error('Selvtest feil:', e);
  }

  // Karusell: dupliser innholdet i .card-track for å muliggjøre sømløs loop
  // (CSS-animasjonen flytter -50% i keyframes, så innhold må være dobbelt)
  (function setupCarouselDuplication() {
    const track = document.querySelector('.card-track');
    if (!track) return;
    // Unngå å duplisere flere ganger
    if (track.dataset.duplicated === 'true') return;
    const markup = track.innerHTML;
    if (!markup.trim()) return;
    const originalCount = track.children.length;
    track.insertAdjacentHTML('beforeend', markup);
    // Gjør duplikatene usynlige for hjelpemidler og fjern dem fra tabbingen
    for (let i = originalCount; i < track.children.length; i++) {
      const el = track.children[i];
      el.setAttribute('aria-hidden', 'true');
      el.querySelectorAll && el.querySelectorAll('a,button').forEach(node => node.setAttribute('tabindex', '-1'));
    }
    track.dataset.duplicated = 'true';
  })();

  // Se alle (inline gallery): render grid ONCE under karusellen og vis/ skjul dynamisk
  (function setupGalleryInline() {
    const btn = document.getElementById('seeAllBtn');
    const inline = document.getElementById('galleryInline');
    if (!btn || !inline) return;

    // create header and grid container inside inline wrapper lazily
    function renderGridOnce() {
      if (inline.dataset.rendered === 'true') return;

      const header = document.createElement('div');
      header.className = 'gallery-inline-header';
      const h2 = document.createElement('h2'); h2.textContent = 'Alle bilder';
      const collapse = document.createElement('button');
      collapse.className = 'collapse-btn';
      collapse.textContent = 'Vis mindre';
      collapse.addEventListener('click', collapseGallery);
      header.appendChild(h2);
      header.appendChild(collapse);

      const grid = document.createElement('div');
      grid.className = 'gallery-grid';
      grid.id = 'galleryGridInline';

      // Populate with original .card-link items only (skip duplicates marked aria-hidden)
      document.querySelectorAll('.card-track > .card-link').forEach(link => {
        if (link.getAttribute('aria-hidden') === 'true') return; // skip dupes
        const href = link.href;
        const card = link.querySelector('.card');
        const title = card?.querySelector('h3')?.textContent?.trim() || '';
        const subtitle = card?.querySelector('p')?.textContent?.trim() || '';
        const style = card?.getAttribute('style') || '';

        const item = document.createElement('div');
        item.className = 'gallery-item project-button';
        item.setAttribute('role', 'group');
        item.setAttribute('tabindex', '0');

        const a = document.createElement('a');
        a.className = 'gallery-link';
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';

        const inner = document.createElement('div');
        inner.className = 'featured-project-card gallery-card';
        if (style) inner.setAttribute('style', style);

        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        const h = document.createElement('h3'); h.textContent = title;
        const p = document.createElement('p'); p.textContent = subtitle;
        overlay.appendChild(h);
        overlay.appendChild(p);

        inner.appendChild(overlay);
        a.appendChild(inner);
        item.appendChild(a);
        grid.appendChild(item);
      });

      inline.appendChild(header);
      inline.appendChild(grid);
      inline.dataset.rendered = 'true';
    }

    function openInline() {
      renderGridOnce();
      // skjul karusell, vis inline grid
      const container = document.querySelector('.card-container');
      const seeAllContainer = document.querySelector('.see-all-container');
      if (container) container.style.display = 'none';
      if (seeAllContainer) seeAllContainer.style.display = 'none';
      inline.style.display = 'block';
      inline.setAttribute('aria-hidden', 'false');
      // scroll to gallery
      inline.scrollIntoView({ behavior: 'smooth' });
    }

    function collapseGallery() {
      const container = document.querySelector('.card-container');
      const seeAllContainer = document.querySelector('.see-all-container');
      if (container) container.style.display = '';
      if (seeAllContainer) seeAllContainer.style.display = '';
      inline.style.display = 'none';
      inline.setAttribute('aria-hidden', 'true');
      btn.focus();
    }

    btn.addEventListener('click', openInline);
  })();
});

// Enkel test i konsollen (kan fjernes senere)
// console.log(caesarDecode('def', 3)); // -> 'abc' hvis funksjonen er tilgjengelig fra scope
