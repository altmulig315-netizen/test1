// Test.js
// Innhold:
// - Caesar-dekoder (koblet til elementene i Test.html: cipherText, key, keyValue, result)
// - Karusell-duplisering for sømløs auto-scroll
// - "Se alle" inline-galleri rendret dynamisk fra karusellkort

console.log("               WILLIAMS GRILL")
console.log("---------------------------------------------")
console.log("               Order Details")

console.log("---------------------------------------------")
console.log(" Item,            Quantity,             Price")

console.log("---------------------------------------------")

console.log("Burger                1                 3")
console.log("Soda                  1                 2")
console.log("Fries                 1                 4")

console.log("---------------------------------------------")
console.log("                     Total              9")

console.log("=============================================")


document.addEventListener('DOMContentLoaded', () => {
  const cipherInput = document.getElementById('cipherText');
  const keyInput = document.getElementById('key');
  const keyValue = document.getElementById('keyValue');
  const resultDiv = document.getElementById('result');

  if (!cipherInput || !keyInput || !keyValue || !resultDiv) {
    // Ikke alle elementer funnet — ingenting å gjøre
    return;
  }

  // Caesar-dekoder: dekoder tekst kryptert med skift over standard alfabet (A-Z / a-z)
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

  // Oppdater resultat når input endres (live)
  function update() {
    const key = parseInt(keyInput.value, 10) || 0;
    keyValue.textContent = String(key);
    const text = cipherInput.value || '';
    resultDiv.textContent = caesarDecode(text, key);
  }

  // Live-oppdatering med debounce for bedre ytelse
  let debounceTimer;
  function debouncedUpdate() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(update, 100); // 100ms forsinkelse
  }
  
  cipherInput.addEventListener('input', debouncedUpdate);
  keyInput.addEventListener('input', update); // Slider kan være instant

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

  // Karusell: dupliser innholdet i .card-track for sømløs loop
  // (CSS-animasjonen flytter -50% i keyframes, derfor trengs dobbelt innhold)
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

  // "Se alle" (inline-galleri): rendrer grid én gang under karusellen og viser/skjuler dynamisk
  (function setupGalleryInline() {
    const btn = document.getElementById('seeAllBtn');
    const inline = document.getElementById('galleryInline');
    if (!btn || !inline) return;

    // Lager header og grid-container inne i inline-wrapper ved behov (lazy)
    function renderGridOnce() {
      if (inline.dataset.rendered === 'true') return;

      const header = document.createElement('div');
      header.className = 'gallery-inline-header gallery-inline-header-flex';
      const h2 = document.createElement('h2');
      h2.className = 'gallery-inline-header-h2';
      h2.textContent = 'Alle bilder';
      const collapse = document.createElement('button');
      collapse.className = 'collapse-btn';
      collapse.textContent = 'Vis mindre';
      collapse.addEventListener('click', collapseGallery);
      header.appendChild(h2);
      header.appendChild(collapse);

      const grid = document.createElement('div');
      grid.className = 'gallery-grid';
      grid.id = 'galleryGridInline';

      // Fyll med originale .card-link-elementer (hopp over duplikater merket aria-hidden)
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
        if (title) inner.setAttribute('aria-label', title);

        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        const h = document.createElement('h3');
        h.textContent = title;
        const p = document.createElement('p');
        p.textContent = subtitle;
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
      // Skjul karusell, vis inline-grid
      const container = document.querySelector('.card-container');
      const seeAllContainer = document.querySelector('.see-all-container');
      if (container) container.style.display = 'none';
      if (seeAllContainer) seeAllContainer.style.display = 'none';
      inline.style.display = 'block';
      inline.setAttribute('aria-hidden', 'false');
      // Scroll til galleriet
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

  // ==========================================================
  // PASSWORD CHECKER - Password strength validation
  // ==========================================================
  (function setupPasswordChecker() {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const meterFill = document.getElementById('meterFill');
    const strengthText = document.getElementById('strengthText');
    const charCount = document.getElementById('charCount');

    // Exit if password checker elements don't exist
    if (!passwordInput || !togglePassword || !meterFill || !strengthText || !charCount) {
      return;
    }

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
        length: password.length >= 12,
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
      if (!element) return;
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
        strengthText.style.color = '#00ffff';
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
  })();
});

// ==========================================================
// ADVANCED CAESAR CIPHER ANALYZER - Global functions
// ==========================================================

// Alfabeter for forskjellige språk og systemer
const ALPHABETS = {
  latin: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  norwegian: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ',
  cyrillic: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
  greek: 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ',
  custom: ''
};

let currentAlphabet = ALPHABETS.norwegian; // Default til norsk alfabet

// Frekvenstabeller for forskjellige språk (i prosent)
const FREQUENCY_TABLES = {
  norwegian: {
    'E': 16.72, 'R': 8.97, 'N': 7.85, 'T': 7.24, 'A': 6.84,
    'I': 6.05, 'S': 5.93, 'L': 5.14, 'O': 4.98, 'D': 4.51,
    'G': 4.05, 'K': 3.51, 'M': 3.35, 'V': 2.52, 'F': 2.09,
    'U': 1.96, 'P': 1.92, 'H': 1.87, 'B': 1.52, 'Æ': 1.14,
    'Ø': 0.94, 'Y': 0.71, 'Å': 0.67, 'J': 0.63, 'C': 0.46,
    'W': 0.31, 'Z': 0.05, 'Q': 0.02, 'X': 0.02
  },
  bokmal: {
    'E': 16.85, 'R': 9.12, 'N': 7.95, 'T': 7.38, 'A': 6.92,
    'I': 6.15, 'S': 6.05, 'L': 5.25, 'O': 5.12, 'D': 4.62,
    'G': 4.15, 'K': 3.58, 'M': 3.42, 'V': 2.58, 'F': 2.15,
    'U': 2.02, 'P': 1.98, 'H': 1.92, 'B': 1.58, 'Æ': 1.22,
    'Ø': 1.02, 'Y': 0.75, 'Å': 0.72, 'J': 0.68, 'C': 0.48,
    'W': 0.35, 'Z': 0.06, 'Q': 0.02, 'X': 0.02
  },
  nynorsk: {
    'E': 16.45, 'R': 8.75, 'N': 7.68, 'T': 6.95, 'A': 6.72,
    'I': 5.88, 'S': 5.75, 'L': 4.95, 'O': 4.78, 'D': 4.35,
    'G': 3.92, 'K': 3.42, 'M': 3.25, 'V': 2.45, 'F': 2.05,
    'U': 1.88, 'P': 1.85, 'H': 1.78, 'B': 1.45, 'Æ': 1.05,
    'Ø': 0.85, 'Y': 0.68, 'Å': 0.62, 'J': 0.58, 'C': 0.42,
    'W': 0.28, 'Z': 0.04, 'Q': 0.02, 'X': 0.02
  },
  english: {
    'E': 12.70, 'T': 9.06, 'A': 8.17, 'O': 7.51, 'I': 6.97,
    'N': 6.75, 'S': 6.33, 'H': 6.09, 'R': 5.99, 'D': 4.25,
    'L': 4.03, 'C': 2.78, 'U': 2.76, 'M': 2.41, 'W': 2.36,
    'F': 2.23, 'G': 2.02, 'Y': 1.97, 'P': 1.93, 'B': 1.29,
    'V': 0.98, 'K': 0.77, 'J': 0.15, 'X': 0.15, 'Q': 0.10,
    'Z': 0.07
  }
};

// Norwegian common words for validation
const NORWEGIAN_WORDS = ['og', 'i', 'er', 'det', 'som', 'på', 'til', 'for', 'med', 'av', 'en', 'ikke', 'har', 'den', 'de', 'var', 'jeg', 'han', 'om', 'men', 'ett', 'være', 'kan', 'vil', 'når', 'fra', 'eller', 'etter', 'ved', 'dette', 'alle', 'også', 'nå', 'over', 'bare', 'dag', 'år', 'der', 'hva', 'skal', 'ut', 'opp', 'skulle', 'noe', 'andre', 'ingen', 'ble', 'mange', 'selv', 'hele', 'måtte', 'blir', 'hver', 'sa', 'kunne', 'hemmelig', 'viktig', 'melding', 'kode', 'brev', 'dokument'];

// Norwegian frequency tables
const NORWEGIAN_FREQ = {'E': 16.72, 'R': 8.97, 'N': 7.85, 'T': 7.24, 'A': 6.84, 'I': 6.05, 'S': 5.93, 'L': 5.14, 'O': 4.98, 'D': 4.51, 'G': 4.05, 'K': 3.51, 'M': 3.35, 'V': 2.52, 'F': 2.09, 'U': 1.96, 'P': 1.92, 'H': 1.87, 'B': 1.52, 'Æ': 1.14, 'Ø': 0.94, 'Y': 0.71, 'Å': 0.67, 'J': 0.63, 'C': 0.46, 'W': 0.31, 'Z': 0.05, 'Q': 0.02, 'X': 0.02};

const NORWEGIAN_BIGRAMS = {'ER': 3.84, 'EN': 3.21, 'ET': 2.67, 'DE': 2.45, 'AN': 2.34, 'RE': 2.28, 'OR': 2.15, 'AR': 2.01, 'TE': 1.98, 'LE': 1.87, 'NE': 1.84, 'ST': 1.76, 'SE': 1.68, 'SK': 1.65, 'FO': 1.59, 'ME': 1.54, 'TI': 1.51, 'ND': 1.48, 'KE': 1.45, 'ED': 1.42, 'AT': 1.39, 'OM': 1.36, 'IN': 1.33, 'AL': 1.30, 'IL': 1.27, 'OG': 1.24, 'VE': 1.21, 'NN': 1.18, 'IG': 1.15, 'GE': 1.12};

const NORWEGIAN_TRIGRAMS = {'DET': 1.42, 'SOM': 1.18, 'FOR': 1.05, 'ERE': 0.98, 'OG ': 0.92, 'ENE': 0.89, 'ING': 0.86, 'TER': 0.83, 'NDE': 0.80, 'SKE': 0.77, 'MED': 0.74, 'VER': 0.71, 'TIL': 0.68, 'STE': 0.65, 'OPP': 0.62, 'NER': 0.59, 'TTE': 0.56, 'LIG': 0.53, 'KKE': 0.50, 'ERN': 0.47, 'REN': 0.45, 'AND': 0.43, 'ATT': 0.41, 'VIL': 0.39, 'END': 0.37, 'ORD': 0.35, 'KAN': 0.33, 'HAR': 0.31, 'VAR': 0.29, 'BLE': 0.27};

const NORWEGIAN_QUADGRAMS = {'TION': 0.89, 'ERER': 0.76, 'EREN': 0.68, 'ERTE': 0.61, 'KKER': 0.58, 'NGEN': 0.55, 'SKAL': 0.52, 'ENNE': 0.49, 'NING': 0.46, 'STEN': 0.43, 'ETTE': 0.41, 'DETT': 0.39, 'NDER': 0.37, 'VING': 0.35, 'TTER': 0.33, 'HVIS': 0.31, 'RING': 0.29, 'KENE': 0.27, 'LIKE': 0.25, 'LING': 0.23, 'SKER': 0.22, 'MMEN': 0.21, 'NNET': 0.20, 'ELLER': 0.19, 'ENKE': 0.18, 'STOR': 0.17, 'FTER': 0.16, 'OVER': 0.15, 'IKKE': 0.14, 'UNDE': 0.13, 'HEMM': 0.12, 'EMME': 0.11, 'MMEL': 0.10, 'MELI': 0.09, 'ELIG': 0.08};

const NORWEGIAN_PENTAGRAMS = {'ERING': 0.45, 'NINGS': 0.42, 'KELIG': 0.39, 'SKJER': 0.36, 'ENHET': 0.33, 'TDETT': 0.31, 'DETTE': 0.29, 'ETTER': 0.27, 'NDERS': 0.25, 'UNDER': 0.23, 'OMMER': 0.22, 'VILLE': 0.21, 'ELLER': 0.20, 'ANNET': 0.19, 'INNEN': 0.18, 'SKULLE': 0.17, 'KSTEN': 0.16, 'HEMME': 0.15, 'EMMEL': 0.14, 'MMELI': 0.13, 'MELIG': 0.12, 'IGHET': 0.11, 'GELIG': 0.10, 'STERK': 0.09, 'FORSK': 0.08, 'ORSKE': 0.07, 'RSKER': 0.06, 'SKING': 0.05, 'VIKTI': 0.04, 'IKTIG': 0.03};

const NORWEGIAN_HEXAGRAMS = {'NINGER': 0.38, 'SKULLE': 0.35, 'SKELIG': 0.32, 'TDETTE': 0.29, 'DETTER': 0.26, 'ETTERE': 0.24, 'DERSOM': 0.22, 'FORSKE': 0.20, 'ORSKER': 0.18, 'RSKING': 0.16, 'VIKTIG': 0.15, 'IKTIGE': 0.14, 'HEMMEL': 0.13, 'EMMELI': 0.12, 'MMELIG': 0.11, 'MELIGE': 0.10, 'ANELSE': 0.09, 'KELIGE': 0.08, 'IGHETE': 0.07, 'HETENE': 0.06, 'TINGST': 0.05, 'INGSTE': 0.04, 'SKRIVE': 0.03, 'KRIVER': 0.02, 'RIVERE': 0.01};

// Språkvariant deteksjon (Bokmål vs Nynorsk)
function detectLanguageVariant(text) {
  const bokmalWords = ['ikke', 'også', 'eller', 'skulle', 'kunne', 'ville', 'noen', 'ingen'];
  const nynorskWords = ['ikkje', 'òg', 'eller', 'skulle', 'kunne', 'ville', 'nokon', 'ingen'];
  
  const lowerText = text.toLowerCase();
  let bokmalCount = 0;
  let nynorskCount = 0;
  
  for (let word of bokmalWords) {
    bokmalCount += (lowerText.match(new RegExp('\\b' + word + '\\b', 'g')) || []).length;
  }
  
  for (let word of nynorskWords) {
    nynorskCount += (lowerText.match(new RegExp('\\b' + word + '\\b', 'g')) || []).length;
  }
  
  if (bokmalCount > nynorskCount * 1.5) return 'Bokmål';
  if (nynorskCount > bokmalCount * 1.5) return 'Nynorsk';
  return 'Norsk';
}

// Finn topp N-grammer i tekst
function getTopNgrams(text, n, top = 10) {
  const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '');
  const ngrams = {};
  
  if (clean.length < n) return [];
  
  for (let i = 0; i <= clean.length - n; i++) {
    const ngram = clean.substring(i, i + n);
    ngrams[ngram] = (ngrams[ngram] || 0) + 1;
  }
  
  return Object.entries(ngrams)
    .sort((a, b) => b[1] - a[1])
    .slice(0, top)
    .map(([ngram, count]) => ({ ngram, count }));
}

// Sliding Window IC for mer robust analyse
function calculateSlidingWindowIC(text, windowSize = 50) {
  const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '');
  
  if (clean.length < windowSize) {
    return { mean: calculateIC(text), stdDev: 0, samples: 1 };
  }
  
  const icValues = [];
  const step = Math.floor(windowSize / 2);
  
  for (let i = 0; i <= clean.length - windowSize; i += step) {
    const window = clean.substring(i, i + windowSize);
    icValues.push(calculateIC(window));
  }
  
  const mean = icValues.reduce((a, b) => a + b, 0) / icValues.length;
  const variance = icValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / icValues.length;
  const stdDev = Math.sqrt(variance);
  
  return { mean, stdDev, samples: icValues.length };
}

// Interpreterer IC-konfidensintervall
function interpretICConfidence(icData) {
  const { mean, stdDev } = icData;
  
  const expectedMonoIC = 0.067;
  const expectedPolyIC = 0.038;
  
  const distFromMono = Math.abs(mean - expectedMonoIC);
  const distFromPoly = Math.abs(mean - expectedPolyIC);
  
  const lowerBound = mean - 2 * stdDev;
  const upperBound = mean + 2 * stdDev;
  
  if (distFromMono < 0.01 && stdDev < 0.01) {
    return `${(95).toFixed(0)}% sikker monoalfabetisk`;
  } else if (distFromPoly < 0.01 && stdDev < 0.01) {
    return `${(95).toFixed(0)}% sikker polyalfabetisk`;
  } else if (upperBound > expectedMonoIC && lowerBound < expectedMonoIC) {
    return `Sannsynlig monoalfabetisk`;
  } else if (upperBound > expectedPolyIC && lowerBound < expectedPolyIC) {
    return `Sannsynlig polyalfabetisk`;
  } else {
    return `Usikker (IC = ${mean.toFixed(4)} ± ${stdDev.toFixed(4)})`;
  }
}

// Beregn empirisk N-gram score
function calculateEmpiricalNgramScore(text, n) {
  if (text.length < n) return -Infinity;
  
  const ngrams = {};
  let total = 0;
  
  for (let i = 0; i <= text.length - n; i++) {
    const ngram = text.substring(i, i + n);
    ngrams[ngram] = (ngrams[ngram] || 0) + 1;
    total++;
  }
  
  let entropy = 0;
  for (let count of Object.values(ngrams)) {
    const p = count / total;
    entropy -= p * Math.log2(p);
  }
  
  const maxEntropy = Math.log2(Math.min(total, Math.pow(29, n)));
  const normalizedEntropy = entropy / maxEntropy;
  
  return -normalizedEntropy * 10;
}

// Analyser bigrams i tekst
function analyzeBigrams(text) {
  const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '');
  const bigrams = {};
  
  for (let i = 0; i < clean.length - 1; i++) {
    const bigram = clean.substring(i, i + 2);
    bigrams[bigram] = (bigrams[bigram] || 0) + 1;
  }
  
  return bigrams;
}

// Oppdater alfabet basert på valg
function updateAlphabet(type) {
  if (type === 'custom') {
    const customInput = document.getElementById('customAlphabet');
    if (customInput) {
      currentAlphabet = customInput.value.toUpperCase() || ALPHABETS.latin;
    }
  } else {
    currentAlphabet = ALPHABETS[type] || ALPHABETS.norwegian;
  }
  
  const text = document.getElementById('inputText')?.value;
  if (text) {
    updateFrequencyAnalysis(text);
  }
}

// Caesar transform funksjon (støtter alle alfabet)
function caesarTransform(text, shift, encrypt = true) {
  let result = '';
  const alphabetLength = currentAlphabet.length;
  
  shift = ((shift % alphabetLength) + alphabetLength) % alphabetLength;
  if (!encrypt) shift = alphabetLength - shift;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const upperChar = char.toUpperCase();
    const index = currentAlphabet.indexOf(upperChar);
    
    if (index !== -1) {
      const newIndex = (index + shift) % alphabetLength;
      const newChar = currentAlphabet[newIndex];
      result += char === char.toLowerCase() ? newChar.toLowerCase() : newChar;
    } else {
      result += char;
    }
  }
  
  return result;
}

// Beregn Index of Coincidence
function calculateIC(text) {
  const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '');
  const n = clean.length;
  if (n <= 1) return 0;
  
  const freq = {};
  for (let char of clean) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  let sum = 0;
  for (let count of Object.values(freq)) {
    sum += count * (count - 1);
  }
  
  return sum / (n * (n - 1));
}

// Beregn Shannon Entropy
function calculateEntropy(text) {
  const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '');
  if (clean.length === 0) return 0;
  
  const freq = {};
  for (let char of clean) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  let entropy = 0;
  const total = clean.length;
  
  for (let count of Object.values(freq)) {
    const p = count / total;
    if (p > 0) {
      entropy -= p * Math.log2(p);
    }
  }
  
  return entropy;
}

// Beregn Chi-Square test
function calculateChiSquare(text, expectedFreq) {
  const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '');
  const n = clean.length;
  if (n === 0) return Infinity;
  
  const observed = {};
  for (let char of clean) {
    observed[char] = (observed[char] || 0) + 1;
  }
  
  let chiSquare = 0;
  for (let char in expectedFreq) {
    const expected = (expectedFreq[char] / 100) * n;
    const obs = observed[char] || 0;
    chiSquare += Math.pow(obs - expected, 2) / expected;
  }
  
  return chiSquare;
}

// N-gram scoring med logaritmisk sannsynlighet
function calculateNgramScore(text, ngramType = 'quadgram') {
  const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '');
  
  let ngramData, n;
  
  if (ngramType === 'bigram') {
    ngramData = NORWEGIAN_BIGRAMS;
    n = 2;
  } else if (ngramType === 'trigram') {
    ngramData = NORWEGIAN_TRIGRAMS;
    n = 3;
  } else if (ngramType === 'pentagram') {
    ngramData = NORWEGIAN_PENTAGRAMS;
    n = 5;
  } else if (ngramType === 'hexagram') {
    ngramData = NORWEGIAN_HEXAGRAMS;
    n = 6;
  } else {
    ngramData = NORWEGIAN_QUADGRAMS;
    n = 4;
  }
  
  let score = 0;
  let count = 0;
  
  for (let i = 0; i <= clean.length - n; i++) {
    const ngram = clean.substring(i, i + n);
    if (ngramData[ngram]) {
      score += Math.log(ngramData[ngram]);
      count++;
    } else {
      score += Math.log(0.0001 / n);
    }
  }
  
  return count > 0 ? score / count : -Infinity;
}

// Tell norske ord
function countNorwegianWords(text) {
  const words = text.toLowerCase().split(/\s+/);
  let count = 0;
  
  for (let word of words) {
    const cleanWord = word.replace(/[.,!?;:]/g, '');
    if (NORWEGIAN_WORDS.includes(cleanWord)) {
      count++;
    }
  }
  
  return count;
}

// Sjekk for ÆØÅ
function checkNorwegianChars(text) {
  const clean = text.toUpperCase();
  const norwegianChars = (clean.match(/[ÆØÅ]/g) || []).length;
  const total = clean.replace(/[^A-ZÆØÅ]/g, '').length;
  
  return {
    hasAeOeAa: norwegianChars > 0,
    count: norwegianChars,
    percentage: total > 0 ? (norwegianChars / total) * 100 : 0
  };
}

// Sjekk for usannsynlige sekvenser
function checkImprobableSequences(text) {
  const clean = text.toUpperCase();
  let penalty = 0;
  
  const badBigrams = ['QZ', 'QX', 'ZQ', 'XQ', 'ÆÆ', 'ØØ', 'ÅÅ', 'ZZ', 'QQ'];
  for (let bigram of badBigrams) {
    penalty += (clean.match(new RegExp(bigram, 'g')) || []).length * 10;
  }
  
  const tripleConsonants = clean.match(/[BCDFGHJKLMNPQRSTVWXZ]{3,}/g) || [];
  penalty += tripleConsonants.length * 5;
  
  return penalty;
}

// Ensemble scoring - kombinerer flere metrikker
function calculateEnsembleScore(text) {
  const textLength = text.replace(/[^A-ZÆØÅ]/gi, '').length;
  
  let w;
  if (textLength <= 40) {
    w = {chiSquare: 0.15, bigram: 0.25, trigram: 0.20, quadgram: 0.15, dictionary: 0.20, improbable: 0.05};
  } else if (textLength <= 200) {
    w = {chiSquare: 0.20, bigram: 0.20, trigram: 0.20, quadgram: 0.15, dictionary: 0.15, improbable: 0.10};
  } else {
    w = {chiSquare: 0.30, bigram: 0.15, trigram: 0.15, quadgram: 0.20, dictionary: 0.10, improbable: 0.10};
  }
  
  const chiSquare = calculateChiSquare(text, NORWEGIAN_FREQ);
  const bigramScore = -calculateNgramScore(text, 'bigram');
  const trigramScore = -calculateNgramScore(text, 'trigram');
  const quadgramScore = -calculateNgramScore(text, 'quadgram');
  const dictionaryScore = -(countNorwegianWords(text) * 2);
  const improbablePenalty = checkImprobableSequences(text);
  
  return w.chiSquare * chiSquare + w.bigram * bigramScore + w.trigram * trigramScore + 
         w.quadgram * quadgramScore + w.dictionary * dictionaryScore + w.improbable * improbablePenalty;
}

function caesarShift(text, shift) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      const isUpper = code >= 65 && code <= 90;
      const base = isUpper ? 65 : 97;
      return String.fromCharCode(((code - base + shift + 26) % 26) + base);
    }
    return char;
  }).join('');
}

function encrypt() {
  const text = document.getElementById('inputText')?.value || '';
  const shift = parseInt(document.getElementById('shiftValue')?.value) || 0;
  const output = document.getElementById('outputText');
  if (output) output.value = caesarShift(text, shift);
}

function decrypt() {
  const text = document.getElementById('inputText')?.value || '';
  const shift = parseInt(document.getElementById('shiftValue')?.value) || 0;
  const output = document.getElementById('outputText');
  if (output) output.value = caesarShift(text, -shift);
}

function applyROT13() {
  const text = document.getElementById('inputText')?.value || '';
  const output = document.getElementById('outputText');
  if (output) output.value = caesarShift(text, 13);
}

function applyROT5() {
  const text = document.getElementById('inputText')?.value || '';
  const output = document.getElementById('outputText');
  if (output) output.value = text.split('').map(c => 
    c.match(/[0-9]/) ? String.fromCharCode(((c.charCodeAt(0) - 48 + 5) % 10) + 48) : c
  ).join('');
}

function applyROT47() {
  const text = document.getElementById('inputText')?.value || '';
  const output = document.getElementById('outputText');
  if (output) {
    output.value = text.split('').map(c => {
      const code = c.charCodeAt(0);
      return (code >= 33 && code <= 126) ? String.fromCharCode(33 + ((code + 14) % 94)) : c;
    }).join('');
  }
}

function scoreText(text) {
  let score = 0;
  const words = text.toLowerCase().split(/\s+/);
  words.forEach(word => {
    if (NORWEGIAN_WORDS.includes(word)) score += 10;
  });
  
  const freq = {};
  text.toUpperCase().split('').forEach(c => {
    if (c.match(/[A-ZÆØÅ]/)) freq[c] = (freq[c] || 0) + 1;
  });
  
  Object.keys(NORWEGIAN_FREQ).forEach(letter => {
    const expected = NORWEGIAN_FREQ[letter];
    const actual = ((freq[letter] || 0) / text.length) * 100;
    score -= Math.abs(expected - actual);
  });
  
  return score;
}

function autoSolve() {
  const text = document.getElementById('inputText')?.value || '';
  if (!text) {
    alert('⚠️ Vennligst skriv inn tekst først!');
    return;
  }
  
  const mode = document.getElementById('analysisMode')?.value || 'educational';
  const panel = document.getElementById('autoSolvePanel');
  const results = document.getElementById('autoSolveResults');
  
  if (!panel || !results) return;
  
  panel.style.display = 'block';
  results.innerHTML = '<div class="p-20 text-center color-cyan">🔬 Analyserer med beslutningsmotor...</div>';
  
  setTimeout(() => {
    const textLength = text.replace(/[^A-ZÆØÅ]/gi, '').length;
    
    // BESLUTNINGSMOTOR: Adaptiv analyse basert på tekstegenskaper
    const icData = calculateSlidingWindowIC(text);
    const entropy = calculateEntropy(text);
    const norwegianChars = checkNorwegianChars(text);
    const icConfidence = interpretICConfidence(icData);
    
    // Diagnostiser chiffer-type
    let cipherType = 'unknown';
    let cipherConfidence = 0;
    
    if (icData.mean > 0.060 && icData.mean < 0.075) {
      cipherType = 'monoalphabetic';
      cipherConfidence = Math.max(0, 100 - Math.abs(icData.mean - 0.067) * 1000);
    } else if (icData.mean < 0.045) {
      cipherType = 'polyalphabetic';
      cipherConfidence = Math.max(0, 100 - Math.abs(icData.mean - 0.038) * 1000);
    }
    
    // Test alle shifts med ENSEMBLE SCORING
    const candidates = [];
    const alphabetLength = currentAlphabet.length;
    
    for (let shift = 0; shift < alphabetLength; shift++) {
      const decrypted = caesarTransform(text, shift, false);
      
      // Ensemble score (lavere = bedre)
      const ensembleScore = calculateEnsembleScore(decrypted);
      
      // Ekstra metrikker
      const wordCount = countNorwegianWords(decrypted);
      const norwegianCharsDecrypted = checkNorwegianChars(decrypted);
      const languageVariant = detectLanguageVariant(decrypted);
      
      // Bonus for ÆØÅ hvis de finnes
      let aeoeaaBonus = 0;
      if (norwegianCharsDecrypted.hasAeOeAa && norwegianCharsDecrypted.percentage > 0.5) {
        aeoeaaBonus = -20;
      }
      
      const finalScore = ensembleScore + aeoeaaBonus;
      
      candidates.push({
        shift: shift,
        text: decrypted,
        score: finalScore,
        wordCount: wordCount,
        languageVariant: languageVariant,
        hasNorwegianChars: norwegianCharsDecrypted.hasAeOeAa,
        norwegianCharPercent: norwegianCharsDecrypted.percentage
      });
    }
    
    // Sorter etter score (lavest først = best)
    candidates.sort((a, b) => a.score - b.score);
    
    // STATISTISK KONFIDENSBEREGNING
    const bestScore = candidates[0].score;
    const secondBestScore = candidates[1].score;
    const scoreGap = secondBestScore - bestScore;
    
    let confidence = 'unknown';
    let confidencePercent = 0;
    
    if (scoreGap > 50) {
      confidence = 'very_high';
      confidencePercent = Math.min(99, 80 + scoreGap / 5);
    } else if (scoreGap > 20) {
      confidence = 'high';
      confidencePercent = 70 + scoreGap;
    } else if (scoreGap > 10) {
      confidence = 'medium';
      confidencePercent = 50 + scoreGap * 2;
    } else {
      confidence = 'low';
      confidencePercent = 30 + scoreGap * 3;
    }
    
    // PRESENTASJON basert på modus
    results.innerHTML = '';
    
    if (mode === 'ctf') {
      // CTF-MODUS: Kun beste svar, ingen forklaring
      const best = candidates[0];
      results.innerHTML = `
        <div class="result-text auto-solve-card-result">
          ${best.text}
        </div>
        <div class="mt-10 color-muted text-center">
          Shift: ${best.shift} | Confidence: ${confidencePercent.toFixed(0)}%
        </div>
      `;
    } else {
      // LÆRINGSMODUS: Full analyse og forklaring
      let html = '<div class="analysis-report-box">';
      html += '<h3 class="analysis-report-title">🔬 Analyserapport</h3>';
      
      // Tekstegenskaper
      html += `<div class="analysis-report-content">`;
      html += `<strong>📏 Tekstlengde:</strong> ${textLength} tegn<br>`;
      html += `<strong>🎲 Entropy:</strong> ${entropy.toFixed(3)} bits (${entropy < 4.0 ? 'strukturert' : 'tilfeldig'})<br>`;
      html += `<strong>🔍 IC:</strong> ${icData.mean.toFixed(4)} ± ${icData.stdDev.toFixed(4)}<br>`;
      html += `<strong>🎯 IC-konfidans:</strong> ${icConfidence}<br>`;
      html += `<strong>🧩 Chiffer-type:</strong> ${cipherType === 'monoalphabetic' ? '✅ Monoalfabetisk (Caesar/Substitusjon)' : cipherType === 'polyalphabetic' ? '⚠️ Polyalfabetisk (Vigenère?)' : '❓ Ukjent'}<br>`;
      html += `<strong>📊 Type-konfidans:</strong> ${cipherConfidence.toFixed(0)}%<br>`;
      html += `</div></div>`;
      
      // Fail-gracefully sjekk
      if (candidates[0].wordCount === 0 && scoreGap < 5) {
        html += '<div class="warning-box">';
        html += '<strong>⚠️ ADVARSEL: Ingen rotasjoner gir god norsk språkprofil</strong><br><br>';
        html += 'Dette kan bety:<br>';
        html += '• Teksten er et <strong>Vigenère-chiffer</strong> (polyalfabetisk)<br>';
        html += '• Det er et <strong>transposisjonschiffer</strong><br>';
        html += '• Teksten er allerede <strong>klartekst</strong><br>';
        html += '• Det er et <strong>substitusjonscryptogram</strong><br>';
        html += '</div>';
      }
      
      // Vis topp 3 løsninger
      for (let i = 0; i < Math.min(3, candidates.length); i++) {
        const candidate = candidates[i];
        const isRecommended = i === 0;
        const gap = i > 0 ? candidates[i].score - bestScore : 0;
        
        const confidenceClass = isRecommended && confidence === 'very_high' ? 'confidence-high' :
                              isRecommended && confidence === 'high' ? 'confidence-high' :
                              isRecommended && confidence === 'medium' ? 'confidence-medium' :
                              'confidence-low';
        
        let badgeText = '';
        if (isRecommended) {
          if (confidence === 'very_high') badgeText = `${confidencePercent.toFixed(0)}% - Ekstremt høy tillit`;
          else if (confidence === 'high') badgeText = `${confidencePercent.toFixed(0)}% - Høy tillit`;
          else if (confidence === 'medium') badgeText = `${confidencePercent.toFixed(0)}% - Moderat tillit`;
          else badgeText = `${confidencePercent.toFixed(0)}% - Lav tillit`;
        } else {
          badgeText = `Alternativ (+${gap.toFixed(1)} score)`;
        }
        
        html += `
          <div class="auto-solve-card auto-solve-result-card" onclick="document.getElementById('outputText').value = \`${candidate.text.replace(/`/g, '\\`')}\`; document.getElementById('shiftValue').value = ${candidate.shift};">
            <span class="confidence-badge confidence-badge-custom ${isRecommended ? 'confidence-badge-recommended' : 'confidence-badge-alternative'}">
              ${isRecommended ? '🏆 ' : ''}${badgeText}
            </span>
            <div class="result-shift-label">
              ${isRecommended ? '🔐 Anbefalt løsning: ' : ''}Shift ${candidate.shift}
              ${candidate.hasNorwegianChars ? ' ✓ ÆØÅ' : ''}
              ${candidate.wordCount > 0 ? ` (${candidate.wordCount} ord)` : ''}
            </div>
            <div class="result-text result-text-truncated">${candidate.text.substring(0, 200)}${candidate.text.length > 200 ? '...' : ''}</div>
            <div class="result-metadata">
              📊 Score: ${candidate.score.toFixed(2)} | 
              🧠 Språk: ${candidate.languageVariant === 'Bokmål' ? 'Bokmål' : candidate.languageVariant === 'Nynorsk' ? 'Nynorsk' : 'Norsk'} 
              ${candidate.norwegianCharPercent > 0 ? `(${candidate.norwegianCharPercent.toFixed(1)}% ÆØÅ)` : ''}
            </div>
          </div>
        `;
      }
      
      // Forklaringsboks
      html += '<div class="explanation-box">';
      html += '<strong>💡 Hvorfor er vi sikre?</strong><br>';
      if (confidence === 'very_high') {
        html += `• Stor statistisk separasjon mellom beste og nest beste (gap: ${scoreGap.toFixed(1)})<br>`;
        html += '• Ekstremt god match med norsk språkstruktur<br>';
        html += '• Høy ensemble-score på tvers av alle metrikker';
      } else if (confidence === 'high') {
        html += `• God statistisk separasjon (gap: ${scoreGap.toFixed(1)})<br>`;
        html += '• Solid match med norsk frekvens og n-grammer';
      } else if (confidence === 'medium') {
        html += `• Moderat separasjon (gap: ${scoreGap.toFixed(1)})<br>`;
        html += '• Sjekk alternativer manuelt';
      } else {
        html += `• Lav separasjon (gap: ${scoreGap.toFixed(1)})<br>`;
        html += '• Flere løsninger er statistisk plausible<br>';
        html += '• Vurder om dette er et Caesar-chiffer';
      }
      html += '</div>';
      
      results.innerHTML = html;
    }
    
    // Sett output til beste løsning
    const output = document.getElementById('outputText');
    if (output) output.value = candidates[0].text;
  }, 100);
}

function bruteForce() {
  const text = document.getElementById('inputText')?.value || '';
  if (!text) {
    alert('Vennligst skriv inn tekst først!');
    return;
  }
  
  const panel = document.getElementById('bruteForcePanel');
  const results = document.getElementById('bruteForceResults');
  
  if (!panel || !results) return;
  
  let html = '';
  for (let shift = 0; shift < 26; shift++) {
    const decoded = caesarShift(text, -shift);
    html += `
      <div class="brute-result-card" onclick="document.getElementById('outputText').value = \`${decoded.replace(/`/g, '\\`')}\`; document.getElementById('shiftValue').value = ${shift};">
        <h3>Shift ${shift}</h3>
        <p>${decoded.substring(0, 150)}${decoded.length > 150 ? '...' : ''}</p>
      </div>
    `;
  }
  
  results.innerHTML = html;
  panel.style.display = 'block';
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const btn = document.querySelector('.dark-mode-toggle span');
  if (btn) {
    btn.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
}

// Substitution cipher solver functions
let substitutionMapping = {};

function autoSolveSubstitution() {
  const text = document.getElementById('inputText')?.value || '';
  if (!text) {
    alert('Vennligst skriv inn tekst først!');
    return;
  }
  
  const resultDiv = document.getElementById('substitutionResult');
  if (!resultDiv) return;
  
  // Calculate frequency
  const freq = {};
  text.toUpperCase().split('').forEach(c => {
    if (c.match(/[A-ZÆØÅ]/)) freq[c] = (freq[c] || 0) + 1;
  });
  
  // Sort by frequency
  const sortedCipher = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const norwegianOrder = ['E', 'R', 'N', 'T', 'A', 'I', 'S', 'L', 'O', 'D', 'G', 'K', 'M', 'V', 'F'];
  
  // Create automatic mapping
  substitutionMapping = {};
  sortedCipher.forEach((entry, idx) => {
    if (idx < norwegianOrder.length) {
      substitutionMapping[entry[0]] = norwegianOrder[idx];
    }
  });
  
  // Apply mapping
  let decoded = text.toUpperCase().split('').map(c => substitutionMapping[c] || c).join('');
  
  resultDiv.innerHTML = `
    <div class="auto-solve-card">
      <h3>🤖 Automatisk Substitusjon (Frekvensbasert)</h3>
      <div class="result-text">${decoded}</div>
      <button onclick="document.getElementById('outputText').value = \`${decoded.replace(/`/g, '\\`')}\`" class="substitution-apply-btn mt-10">
        <span>📋 Kopier til resultat</span>
      </button>
    </div>
  `;
  
  updateFrequencyCharts(text);
}

function showSubstitutionMapping() {
  const panel = document.getElementById('substitutionMappingPanel');
  if (!panel) return;
  
  const isVisible = !panel.classList.contains('substitution-mapping-hidden');
  
  if (isVisible) {
    panel.classList.add('substitution-mapping-hidden');
    panel.classList.remove('substitution-mapping-visible');
  } else {
    panel.classList.remove('substitution-mapping-hidden');
    panel.classList.add('substitution-mapping-visible');
  }
  
  if (!isVisible) {
    const table = document.getElementById('mappingTable');
    if (!table) return;
    
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ'.split('');
    // Generer mappingtabell med input-felt for hver bokstav
    table.innerHTML = alphabet.map(letter => `
      <div class="substitution-cell">
        <!-- Kryptert bokstav (topp) -->
        <div class="substitution-cell-label">${letter}</div>
        <div class="substitution-cell-arrow">↓</div>
        <!-- Input for klartext-bokstav (bunn) -->
        <input type="text" maxlength="1" value="${substitutionMapping[letter] || ''}" 
               onchange="substitutionMapping['${letter}'] = this.value.toUpperCase()"
               class="substitution-cell-input">
      </div>
    `).join('');
  }
}

// Nullstill substitusjons-mappingen
function resetSubstitutionMapping() {
  substitutionMapping = {};
  const panel = document.getElementById('substitutionMappingPanel');
  if (panel) {
    panel.classList.add('substitution-mapping-hidden');
    panel.classList.remove('substitution-mapping-visible');
  }
  const resultDiv = document.getElementById('substitutionResult');
  if (resultDiv) resultDiv.innerHTML = '';
  alert('Mapping er resatt!');
}

function applyManualMapping() {
  const text = document.getElementById('inputText')?.value || '';
  if (!text) {
    alert('Vennligst skriv inn tekst først!');
    return;
  }
  
  let decoded = text.toUpperCase().split('').map(c => substitutionMapping[c] || c).join('');
  const output = document.getElementById('outputText');
  if (output) output.value = decoded;
  
  alert('Mapping anvendt! Sjekk resultatfeltet.');
}

function updateFrequencyCharts(text) {
  // Calculate cipher frequency
  const freq = {};
  text.toUpperCase().split('').forEach(c => {
    if (c.match(/[A-ZÆØÅ]/)) freq[c] = (freq[c] || 0) + 1;
  });
  
  const total = Object.values(freq).reduce((a, b) => a + b, 0);
  
  // Display cipher frequency
  const cipherChart = document.getElementById('cipherFreqChart');
  if (cipherChart) {
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 10);
    cipherChart.innerHTML = sorted.map(([letter, count]) => {
      const percent = ((count / total) * 100).toFixed(1);
      return `<div class="freq-chart-item">
        <span class="freq-chart-letter">${letter}:</span>
        <span class="freq-chart-percent">${percent}%</span>
        <div class="freq-chart-bar freq-chart-bar-cyan" style="width: ${percent * 5}px;"></div>
      </div>`;
    }).join('');
  }
  
  // Display Norwegian frequency
  const norwegianChart = document.getElementById('norwegianFreqChart');
  if (norwegianChart) {
    const norFreq = [
      ['E', 16.72], ['R', 8.97], ['N', 7.85], ['T', 7.24], ['A', 6.84],
      ['I', 6.05], ['S', 5.93], ['L', 5.14], ['O', 4.98], ['D', 4.51]
    ];
    norwegianChart.innerHTML = norFreq.map(([letter, percent]) => {
      return `<div class="freq-chart-item">
        <span class="freq-chart-letter-norwegian">${letter}:</span>
        <span class="freq-chart-percent">${percent}%</span>
        <div class="freq-chart-bar freq-chart-bar-green" style="width: ${percent * 5}px;"></div>
      </div>`;
    }).join('');
  }
}

function copyToClipboard() {
  const output = document.getElementById('outputText');
  if (output && output.value) {
    navigator.clipboard.writeText(output.value).then(() => {
      alert('📋 Kopiert til utklippstavlen!');
    }).catch(() => {
      output.select();
      document.execCommand('copy');
      alert('📋 Kopiert til utklippstavlen!');
    });
  } else {
    alert('Ingen resultat å kopiere!');
  }
}

function exportResult() {
  const output = document.getElementById('outputText');
  if (output && output.value) {
    const blob = new Blob([output.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'caesar-result.txt';
    a.click();
    URL.revokeObjectURL(url);
    alert('💾 Fil eksportert!');
  } else {
    alert('Ingen resultat å eksportere!');
  }
}

function showAdvancedAnalysis() {
  const panel = document.getElementById('advancedPanel');
  if (!panel) return;
  
  const isHidden = panel.classList.contains('advanced-panel-hidden');
  
  if (isHidden) {
    panel.classList.remove('advanced-panel-hidden');
  } else {
    panel.classList.add('advanced-panel-hidden');
  }
  
  if (isHidden) {
    // Generer n-gram tabell
    const text = document.getElementById('inputText')?.value || '';
    if (text) {
      const n = getNgramLength(currentNgramType);
      const topNgrams = getTopNgrams(text, n, 10);
      
      let html = '<table class="ngram-table">';
      html += `<tr class="ngram-header"><th>${n}-gram</th><th>Frekvens</th></tr>`;

      for (let {ngram, count} of topNgrams) {
        html += `<tr class="ngram-row"><td>${ngram}</td><td>${count}</td></tr>`;
      }
      
      html += '</table>';
      document.getElementById('ngramTable').innerHTML = html;
    }
    
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Avansert Hill Climbing med ensemble scoring
function performAdvancedHillClimbing(text) {
  let candidates = [];
  
  for (let shift = 0; shift < 26; shift++) {
    const decoded = caesarShift(text, -shift);
    const ensembleScore = calculateEnsembleScore(decoded);
    const wordCount = countNorwegianWords(decoded);
    const norwegianCharsData = checkNorwegianChars(decoded);
    
    let aeoeaaBonus = 0;
    if (norwegianCharsData.hasAeOeAa && norwegianCharsData.percentage > 0.5) {
      aeoeaaBonus = -20;
    }
    
    const finalScore = ensembleScore + aeoeaaBonus;
    
    candidates.push({
      shift: shift,
      text: decoded,
      score: finalScore,
      wordCount: wordCount
    });
  }
  
  candidates.sort((a, b) => a.score - b.score);
  
  const bestScore = candidates[0].score;
  const secondBestScore = candidates[1].score;
  const scoreGap = secondBestScore - bestScore;
  
  let confidence = Math.min(99, 50 + scoreGap);
  
  return {
    shift: candidates[0].shift,
    text: candidates[0].text,
    score: bestScore,
    wordCount: candidates[0].wordCount,
    confidence: confidence
  };
}

// Mønstergjenkjenning
function detectPatterns(text) {
  const patterns = {};
  const minLength = 3;
  const maxLength = 6;
  
  for (let len = minLength; len <= maxLength; len++) {
    for (let i = 0; i <= text.length - len; i++) {
      const pattern = text.substring(i, i + len);
      if (pattern.match(/^[A-Za-z]+$/)) {
        patterns[pattern] = (patterns[pattern] || 0) + 1;
      }
    }
  }
  
  const common = Object.entries(patterns)
    .filter(([_, freq]) => freq > 1)
    .map(([pattern, frequency]) => ({ pattern, frequency }))
    .sort((a, b) => b.frequency - a.frequency);
  
  return { count: common.length, common };
}

// Polyalfabetisk deteksjon via Index of Coincidence
function detectPolyalphabetic(text) {
  const letters = text.toUpperCase().replace(/[^A-Z]/g, '');
  const freq = {};
  
  for (let c of letters) {
    freq[c] = (freq[c] || 0) + 1;
  }
  
  let ic = 0;
  const n = letters.length;
  
  if (n > 1) {
    for (let count of Object.values(freq)) {
      ic += count * (count - 1);
    }
    ic = ic / (n * (n - 1));
  }
  
  return { ic };
}

// Kasiski-test for å finne nøkkellengde i polyalfabetiske chiffer
function performKasiskiTest(text) {
  const repeats = {};
  const minLength = 3;
  
  // Finn gjentatte sekvenser
  for (let len = minLength; len <= 5; len++) {
    for (let i = 0; i <= text.length - len; i++) {
      const pattern = text.substring(i, i + len);
      if (!pattern.match(/^[A-Za-z]+$/)) continue;
      
      for (let j = i + len; j <= text.length - len; j++) {
        if (text.substring(j, j + len) === pattern) {
          const distance = j - i;
          repeats[distance] = (repeats[distance] || 0) + 1;
        }
      }
    }
  }
  
  // Finn fellesfaktorer
  const factors = {};
  for (let distance of Object.keys(repeats).map(Number)) {
    for (let f = 2; f <= Math.min(distance, 20); f++) {
      if (distance % f === 0) {
        factors[f] = (factors[f] || 0) + repeats[distance];
      }
    }
  }
  
  const keyLengths = Object.entries(factors)
    .map(([length, confidence]) => ({ 
      length: parseInt(length), 
      confidence: confidence / Math.max(...Object.values(factors)) 
    }))
    .sort((a, b) => b.confidence - a.confidence);
  
  return { keyLengths };
}

// ========================================
// FILE UPLOAD/DOWNLOAD FUNKSJONER
// ========================================

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    const inputField = document.getElementById('inputText');
    if (inputField) {
      inputField.value = text;
      updateFrequencyAnalysis(text);
    }
  };
  reader.readAsText(file);
}

// Drag and drop support
function setupDragAndDrop() {
  const dropZone = document.getElementById('dropZone');
  if (!dropZone) return;
  
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });
  
  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });
  
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const inputField = document.getElementById('inputText');
        if (inputField) {
          inputField.value = event.target.result;
          updateFrequencyAnalysis(event.target.result);
        }
      };
      reader.readAsText(file);
    }
  });
}

// Export result to file
function exportResult() {
  const text = document.getElementById('outputText')?.value || '';
  if (!text) {
    alert('⚠️ Ingen resultat å eksportere!');
    return;
  }
  
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `caesar_result_${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Copy to clipboard
function copyToClipboard() {
  const text = document.getElementById('outputText')?.value || '';
  if (!text) {
    alert('⚠️ Ingen tekst å kopiere!');
    return;
  }
  
  navigator.clipboard.writeText(text).then(() => {
    const btn = event.target.closest('button');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>✅ Kopiert!</span>';
    setTimeout(() => {
      btn.innerHTML = originalHTML;
    }, 2000);
  });
}

// ========================================
// CRIB SEARCH (Kjente ord-søk)
// ========================================

function searchCribs() {
  const text = document.getElementById('inputText')?.value || '';
  const cribs = document.getElementById('cribInput')?.value || '';
  
  if (!text || !cribs) {
    alert('⚠️ Vennligst skriv inn både tekst og cribs!');
    return;
  }
  
  const cribList = cribs.split(',').map(c => c.trim().toLowerCase());
  const resultsDiv = document.getElementById('cribResults');
  if (!resultsDiv) return;
  
  let results = '<div class="poly-detection-box">';
  results += '<h4 class="substitution-title mb-10">🔍 Crib Søkeresultater:</h4>';
  
  let foundAny = false;
  
  for (let shift = 0; shift < currentAlphabet.length; shift++) {
    const decoded = caesarTransform(text, shift, false);
    const lowerDecoded = decoded.toLowerCase();
    
    for (let crib of cribList) {
      if (lowerDecoded.includes(crib)) {
        foundAny = true;
        results += `<div class="pattern-card">`;
        results += `<strong class="pattern-highlight">✅ Funnet "${crib}" med shift ${shift}</strong><br>`;
        results += `<div class="poly-detection-text">${decoded.substring(0, 150)}...</div>`;
        results += `</div>`;
      }
    }
  }
  
  if (!foundAny) {
    results += '<div class="pattern-empty">❌ Ingen cribs funnet i noen shift</div>';
  }
  
  results += '</div>';
  resultsDiv.innerHTML = results;
}

// ========================================
// PATTERN RECOGNITION
// ========================================

function runPatternRecognition() {
  const text = document.getElementById('inputText')?.value || '';
  if (!text) {
    alert('⚠️ Vennligst skriv inn tekst først!');
    return;
  }
  
  const patterns = detectPatterns(text);
  const resultsDiv = document.getElementById('patternResults');
  if (!resultsDiv) return;
  
  let html = '<div class="pattern-wrapper">';
  html += '<h4 class="pattern-title">🎯 Mønstre funnet:</h4>';
  
  if (patterns.common.length > 0) {
    html += `<p class="pattern-summary">Fant ${patterns.count} repeterende mønstre:</p>`;
    patterns.common.slice(0, 10).forEach(p => {
      html += `<div class="pattern-card">`;
      html += `<strong class="pattern-highlight">${p.pattern}</strong> - ${p.frequency} ganger`;
      html += `</div>`;
    });
  } else {
    html += '<p class="pattern-empty">Ingen repeterende mønstre funnet</p>';
  }
  
  html += '</div>';
  resultsDiv.innerHTML = html;
}

// ========================================
// FREQUENCY ANALYSIS UPDATE
// ========================================

let customNgramLength = 7;

function updateNgramAnalysis() {
  const selectedType = document.getElementById('ngramType')?.value;
  const customGroup = document.getElementById('customNgramGroup');
  
  if (selectedType === 'custom' && customGroup) {
    customGroup.style.display = 'block';
    customNgramLength = parseInt(document.getElementById('customNgramLength')?.value || 7);
  } else if (customGroup) {
    customGroup.style.display = 'none';
  }
  
  const text = document.getElementById('inputText')?.value;
  if (text) {
    updateFrequencyAnalysis(text);
  }
}

function updateFrequencyAnalysis(text) {
  if (!text) return;
  
  // Update IC
  const ic = calculateIC(text);
  const icEl = document.getElementById('icValue');
  if (icEl) icEl.textContent = ic.toFixed(4);
  
  const slidingIC = calculateSlidingWindowIC(text);
  const icConf = document.getElementById('icConfidence');
  if (icConf) {
    const confidence = interpretICConfidence(slidingIC);
    icConf.textContent = confidence;
  }
  
  // Update Entropy
  const entropy = calculateEntropy(text);
  const entropyEl = document.getElementById('entropyValue');
  if (entropyEl) entropyEl.textContent = entropy.toFixed(2);
  
  const entropyInterp = document.getElementById('entropyInterpret');
  if (entropyInterp) {
    entropyInterp.textContent = entropy < 4.0 ? 'Strukturert' : 'Tilfeldig';
  }
  
  // Update Chi-Square
  const chi = calculateChiSquare(text, NORWEGIAN_FREQ);
  const chiEl = document.getElementById('chiSquare');
  if (chiEl) chiEl.textContent = chi.toFixed(2);
  
  const chiQuality = document.getElementById('chiSquareQuality');
  if (chiQuality) {
    chiQuality.textContent = chi < 100 ? 'Godt match' : chi < 300 ? 'Middels' : 'Dårlig match';
  }
  
  // Update Language
  const langVariant = detectLanguageVariant(text);
  const langEl = document.getElementById('detectedLang');
  if (langEl) langEl.textContent = langVariant;
  
  // Update N-gram
  const ngramType = document.getElementById('ngramType')?.value || 'quadgram';
  let ngramLength = 4;
  
  if (ngramType === 'bigram') ngramLength = 2;
  else if (ngramType === 'trigram') ngramLength = 3;
  else if (ngramType === 'pentagram') ngramLength = 5;
  else if (ngramType === 'hexagram') ngramLength = 6;
  else if (ngramType === 'custom') ngramLength = customNgramLength;
  
  const topNgrams = getTopNgrams(text, ngramLength, 1);
  const topNgramEl = document.getElementById('topNgram');
  if (topNgramEl && topNgrams.length > 0) {
    topNgramEl.textContent = topNgrams[0].ngram;
  }
  
  const ngramScore = calculateNgramScore(text, ngramType);
  const ngramScoreEl = document.getElementById('ngramScore');
  if (ngramScoreEl) ngramScoreEl.textContent = ngramScore.toFixed(2);
  
  // Update frequency chart
  updateFrequencyChart(text);
  
  // Update n-gram table
  updateNgramTable(text, ngramLength);
}

function updateFrequencyChart(text) {
  const chartEl = document.getElementById('frequencyChart');
  if (!chartEl) return;
  
  const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '');
  const freq = {};
  
  for (let char of clean) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ'.split('');
  let html = '';
  
  const maxCount = Math.max(...Object.values(freq), 1);
  
  for (let letter of alphabet) {
    const count = freq[letter] || 0;
    const height = (count / maxCount) * 100;
    const percentage = clean.length > 0 ? ((count / clean.length) * 100).toFixed(1) : 0;
    
    html += `<div class="bar-container bar-container-flex">`;
    html += `<div class="bar bar-fill" style="height: ${height}%;" title="${letter}: ${percentage}%"></div>`;
    html += `<div class="bar-label bar-label-styled">${letter}</div>`;
    html += `</div>`;
  }
  
  chartEl.innerHTML = html;
}

function updateNgramTable(text, n) {
  const tableEl = document.getElementById('ngramTable');
  if (!tableEl) return;
  
  const topNgrams = getTopNgrams(text, n, 10);
  
  if (topNgrams.length === 0) {
    tableEl.innerHTML = '<p class="pattern-empty">Ingen n-grammer funnet</p>';
    return;
  }
  
  let html = '<table class="ngram-table">';
  html += '<tr class="ngram-header"><th>N-gram</th><th>Frekvens</th></tr>';
  
  topNgrams.forEach(ng => {
    html += `<tr class="ngram-row">`;
    html += `<td><code class="ngram-chip">${ng.ngram}</code></td>`;
    html += `<td class="ngram-count">${ng.count}</td>`;
    html += `</tr>`;
  });
  
  html += '</table>';
  tableEl.innerHTML = html;
}

// ========================================
// INITIALIZATION
// ========================================

// Setup event listeners on page load
document.addEventListener('DOMContentLoaded', function() {
  setupDragAndDrop();
  
  // Setup alphabet change handler
  const alphabetSelect = document.getElementById('alphabetType');
  if (alphabetSelect) {
    alphabetSelect.addEventListener('change', function() {
      const customGroup = document.getElementById('customAlphabetGroup');
      if (customGroup) {
        customGroup.style.display = this.value === 'custom' ? 'block' : 'none';
      }
    });
  }
  
  // Setup input text change handler (debounced)
  const inputText = document.getElementById('inputText');
  if (inputText) {
    let debounceTimer;
    inputText.addEventListener('input', function() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (this.value.length > 0) {
          updateFrequencyAnalysis(this.value);
        }
      }, 500);
    });
  }
});
