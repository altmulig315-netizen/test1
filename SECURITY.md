# Sikkerhetsdokumentasjon

## 🔒 Implementerte sikkerhetstiltak

Dette prosjektet har implementert omfattende klientsidevalidering og sanitering for å forhindre XSS-angrep og andre sikkerhetsproblemer.

---

## 📋 Sikkerhetsfeatures

### 1. **Input Sanitering**
- `sanitizeText()` - Fjerner farlig innhold fra tekstinput
  - Fjerner null bytes
  - Fjerner kontrollkarakterer
  - Fjerner script-tags og event handlers
  - Håndhever maksimal lengde
  - Fjerner `javascript:` URIs

### 2. **HTML Escaping**
- `escapeHtml()` - Konverterer spesialtegn til HTML-entiteter
  - `&` → `&amp;`
  - `<` → `&lt;`
  - `>` → `&gt;`
  - `"` → `&quot;`
  - `'` → `&#039;`

### 3. **Input Validering**
- `validateText()` - Validerer tekst mot regler
  - Min/maks lengde
  - Regex-mønstre
  - Påkrevde felter
  - Custom validators

- `validateNumber()` - Validerer numeriske verdier
  - Min/maks verdier
  - Heltall vs desimaltall
  - Endelige verdier (ikke Infinity/NaN)

- `validateFile()` - Validerer filopplastinger
  - Filtype-sjekk (.txt)
  - Størrelsesbegrensning (5MB)
  - MIME-type validering

### 4. **Sikker DOM-manipulasjon**
- `setSafeText()` - Setter tekstinnhold sikkert via `textContent`
- `setSafeAttribute()` - Setter attributter med validering
- `createSafeTextNode()` - Lager sikre tekstnoder

---

## 🛡️ Implementerte sikkerhetstiltak per modul

### **Password Checker** (`validator.js`)
✅ Sanitering av passordinput  
✅ Håndtering av paste-events med validering  
✅ Maks lengde enforcement (128 tegn)  
✅ Feilmeldinger via `textContent` (ikke innerHTML)  

### **Caesar Cipher Analyzer** (`analyzer.js`)
✅ Sanitering av input tekst (maks 50,000 tegn)  
✅ HTML escaping i frekvensdiagrammer  
✅ Sikker rendering av n-gram tabeller  
✅ Validering av n-gram lengde  
✅ Sikker tekstoutput via `setSafeText()`  

### **Caesar Cipher Solver** (`solver.js`)
✅ Sanitering av input før dekryptering  
✅ HTML escaping av alle output-resultater  
✅ Sikker rendering av brute force resultater  

### **File Upload** (`Test-main.js`)
✅ Filtype-validering (.txt only)  
✅ Størrelsesbegrensning (5MB)  
✅ MIME-type sjekk  
✅ Sanitering av filinnhold  
✅ Error handling for fil-lesing  
✅ UTF-8 encoding enforcement  

### **Gallery** (`gallery.js`)
✅ URL-validering (kun http/https)  
✅ Sanitering av titler og undertekster  
✅ Sikker inline style håndtering  
✅ XSS-beskyttelse i dynamisk innhold  

### **Main Script** (`Test-main.js`)
✅ Validering av shift-verdier  
✅ Sanitering før alle cipher-operasjoner  
✅ Input lengde begrensninger  

---

## 🚨 Beskyttelse mot angrep

### **Cross-Site Scripting (XSS)**
- ✅ All dynamisk innhold escapes før visning
- ✅ Bruker `textContent` i stedet for `innerHTML` der mulig
- ✅ Filtrerer ut `<script>` tags og event handlers
- ✅ Validerer URLs før bruk i href/src

### **Code Injection**
- ✅ Fjerner `javascript:`, `data:`, og `vbscript:` URIs
- ✅ Forhindrer `onclick` og andre event-attributter
- ✅ Saniterer all brukerinput

### **File Upload Attacks**
- ✅ Whitelist filtyper (.txt)
- ✅ Størrelsesbegrensninger
- ✅ MIME-type validering
- ✅ Innholdssanitisering

### **Denial of Service (DoS)**
- ✅ Maks lengde på input (50,000 tegn for tekst)
- ✅ Filstørrelse limit (5MB)
- ✅ Debouncing av input events

---

## 📝 Best Practices

### **Generelle retningslinjer:**
1. **Aldri stol på brukerinput** - Alltid sanitize og validate
2. **Bruk textContent over innerHTML** - Når dynamisk innhold skal vises
3. **Escape HTML** - Når innerHTML er nødvendig
4. **Validate på klient OG server** - Klientsidevalidering er ikke nok alene
5. **Begrens input** - Sett rimelige grenser på lengde og størrelse
6. **CSS-farger skal være HEX** - Konverter alle `rgb(...)`/`rgba(...)` til HEX (`#RRGGBB` eller `#RRGGBBAA` for alfa)

### **For utviklere:**
```javascript
// ❌ FARLIG - Ikke gjør dette
element.innerHTML = userInput

// ✅ TRYGT - Gjør dette i stedet
import { setSafeText } from './core/utils.js'
setSafeText(element, userInput)

// ✅ TRYGT - Eller dette hvis du trenger HTML
import { escapeHtml } from './core/utils.js'
element.innerHTML = escapeHtml(userInput)
```

---

## 🔍 Testing sikkerhet

### **Test med farlige input:**
```javascript
// Test XSS
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
javascript:alert('XSS')

// Test SQL-lignende injection (selv om dette er klientside)
'; DROP TABLE users; --
" OR 1=1 --

// Test overflødig data
// Veldig lang streng (over 50,000 tegn)
// Stor fil (over 5MB)
```

---

## 📚 Sikkerhetsfunksjoner oversikt

| Funksjon | Formål | Lokasjon |
|----------|--------|----------|
| `escapeHtml()` | HTML entity encoding | `utils.js` |
| `sanitizeText()` | Fjerner farlig innhold | `utils.js` |
| `validateText()` | Validerer tekstinput | `utils.js` |
| `validateNumber()` | Validerer tall | `utils.js` |
| `validateFile()` | Validerer filer | `utils.js` |
| `setSafeText()` | Sikker tekstsetting | `utils.js` |
| `setSafeAttribute()` | Sikker attributtsetting | `utils.js` |
| `createSafeTextNode()` | Lager tekstnoder | `utils.js` |

---

## ⚠️ Kjente begrensninger

1. **Kun klientsidevalidering** - Dette er ikke tilstrekkelig for produksjonssystemer
2. **Ingen Content Security Policy (CSP)** - Bør implementeres på serversiden
3. **Ingen rate limiting** - Kan være sårbar for automated attacks
4. **Lokal filbehandling** - FileReader API kan ha browser-spesifikke sikkerhetsproblemer

---

## 📞 Rapporter sikkerhetsproblemer

Hvis du finner sikkerhetsproblemer, vennligst:
1. **IKKE** opprett en public issue
2. Kontakt prosjekteier direkte
3. Gi detaljert beskrivelse av sårbarheten
4. Inkluder steps to reproduce

---

## 📅 Sist oppdatert
Desember 28, 2025

---

## 🔧 Ekstra Tiltak Implementert

### **Lenker med `target="_blank"`**
- Bruker `rel="nofollow noopener noreferrer"` på alle eksterne lenker.
- **nofollow:** Hindrer søkemotorer i å følge/indeksere lenken.
- **noopener:** Blokkerer `window.opener` → beskytter mot reverse tabnabbing.
- **noreferrer:** Fjerner Referer‑headeren → bedre personvern og samme beskyttelse som `noopener`.

### **Inline JS‑policy**
- Ingen inline `script`‑blokker eller `on*`‑attributter i HTML.
- All interaksjon skjer via eksterne JS‑filer og `addEventListener`.
- Anbefaling: Aktiver CSP som blokkerer inline kode (`Content-Security-Policy: script-src 'self'`) for ytterligere XSS‑beskyttelse.

### **Forbudte/risikable APIer**
- Ikke bruk av `eval(...)` eller `new Function(...)`.
- Ikke bruk av `document.write(...)`.
- Ingen `setTimeout("...")`/`setInterval("...")` med streng—kun funksjoner, f.eks. `setTimeout(() => ..., ms)`.

### **Tredjepartsscript**
- Ingen tredjeparts JS‑biblioteker eller trackere i nettklienten (jQuery, Bootstrap, GA, etc.).
- Kun egne kildefiler; dev‑verktøy i `package.json` er for utvikling (linting) og lastes ikke i produksjon.

## ✅ Security Checklist

- [x] Input sanitization implemented
- [x] HTML escaping implemented
- [x] File upload validation
- [x] XSS protection
- [x] URL validation
- [x] Input length limits
- [x] Error handling
- [x] Safe DOM manipulation
- [x] External links use `rel="nofollow noopener noreferrer"`
- [x] No inline `script` or `on*` HTML attributes
- [x] No use of `eval(...)`
- [x] No use of `new Function(...)`
- [x] No use of `document.write(...)`
- [x] No `setTimeout("...")`/`setInterval("...")` with string; only function arguments
- [x] No third‑party libraries/trackers at runtime
- [ ] Password field hardening: `autocomplete="new-password"`
- [x] Content Security Policy (CSP): baseline `default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; upgrade-insecure-requests`
- [x] Referrer‑Policy: `no-referrer` or `strict-origin-when-cross-origin`
- [x] Permissions‑Policy: disable sensitive APIs (`geolocation=(), camera=(), microphone=(), usb=()`)
- [x] X‑Frame‑Options: `DENY` (or CSP `frame-ancestors 'none'`)
- [x] X‑Content‑Type‑Options: `nosniff`
- [x] Cross‑Origin Isolation: `COOP: same-origin`, `CORP: same-origin` (if needed)
- [x] Trusted Types: `require-trusted-types-for 'script'` (Chromium)
- [x] `maxlength`/`pattern` attributes on inputs for additional client‑side validation
- [x] Subresource Integrity (SRI) for any future CDN assets
- [x] Avoid storing secrets in `localStorage/sessionStorage`
- [x] HTTPS enforcement
- [x] CSS bruker kun HEX‑farger (`#RRGGBB`/`#RRGGBBAA`); ingen `rgb(...)`/`rgba(...)`

---

## 🖥️ Server‑Side Only (not implemented in this frontend)

- **Server‑side validation:** Validate all inputs on the server; mirror client rules and reject invalid payloads.
- **Rate limiting:** Apply per‑IP/user limits for login, uploads, brute‑force endpoints.
  - Examples: Nginx `limit_req`, Express `express-rate-limit`, Cloudflare/WAF rules.

## 🛠️ Development/CI Practices

- **ESLint security rules:** Add `eslint-plugin-security` to catch common anti‑patterns early.
- **Dependency audits:** Run `npm audit` periodically or in CI to surface known vulnerabilities.
