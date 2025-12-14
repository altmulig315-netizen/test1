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
});

// Enkel test i konsollen (kan fjernes senere)
// console.log(caesarDecode('def', 3)); // -> 'abc' hvis funksjonen er tilgjengelig fra scope
