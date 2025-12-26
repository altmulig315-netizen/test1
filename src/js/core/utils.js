// Shared helpers for debouncing, Caesar shifts, frequency/entropy/ngram analysis,
// and language heuristics (Norwegian-focused with ÆØÅ support).
import {
  ALPHABETS,
  FREQUENCY_TABLES,
  NORWEGIAN_BIGRAMS,
  NORWEGIAN_HEXAGRAMS,
  NORWEGIAN_PENTAGRAMS,
  NORWEGIAN_QUADGRAMS,
  NORWEGIAN_TRIGRAMS,
  NORWEGIAN_WORDS
} from './constants.js'

export function debounce (fn, delay = 150) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export function caesarShift (text, shift) {
  return text
    .split('')
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0)
        const isUpper = code >= 65 && code <= 90
        const base = isUpper ? 65 : 97
        return String.fromCharCode(((code - base + shift + 26) % 26) + base)
      }
      return char
    })
    .join('')
}

export function caesarTransform (text, shift, alphabetKey, encrypt = true) {
  const alphabet = ALPHABETS[alphabetKey] || ALPHABETS.norwegian
  let result = ''
  const alphabetLength = alphabet.length
  shift = ((shift % alphabetLength) + alphabetLength) % alphabetLength
  if (!encrypt) shift = alphabetLength - shift

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const upperChar = char.toUpperCase()
    const index = alphabet.indexOf(upperChar)
    if (index !== -1) {
      const newIndex = (index + shift) % alphabetLength
      const newChar = alphabet[newIndex]
      result += char === char.toLowerCase() ? newChar.toLowerCase() : newChar
    } else {
      result += char
    }
  }
  return result
}

export function detectLanguageVariant (text) {
  const bokmalWords = ['ikke', 'også', 'eller', 'skulle', 'kunne', 'ville', 'noen', 'ingen']
  const nynorskWords = ['ikkje', 'òg', 'eller', 'skulle', 'kunne', 'ville', 'nokon', 'ingen']
  const lowerText = text.toLowerCase()
  let bokmalCount = 0
  let nynorskCount = 0
  for (const word of bokmalWords) {
    bokmalCount += (lowerText.match(new RegExp(`\\b${word}\\b`, 'g')) || []).length
  }
  for (const word of nynorskWords) {
    nynorskCount += (lowerText.match(new RegExp(`\\b${word}\\b`, 'g')) || []).length
  }
  if (bokmalCount > nynorskCount * 1.5) return 'Bokmål'
  if (nynorskCount > bokmalCount * 1.5) return 'Nynorsk'
  return 'Norsk'
}

export function getTopNgrams (text, n, top = 10) {
  const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '')
  const ngrams = {}
  if (clean.length < n) return []
  for (let i = 0; i <= clean.length - n; i++) {
    const ngram = clean.substring(i, i + n)
    ngrams[ngram] = (ngrams[ngram] || 0) + 1
  }
  return Object.entries(ngrams)
    .sort((a, b) => b[1] - a[1])
    .slice(0, top)
    .map(([ngram, count]) => ({ ngram, count }))
}

export function calculateSlidingWindowIC (text, windowSize = 50) {
  const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '')
  if (clean.length < windowSize) {
    return { mean: calculateIC(text), stdDev: 0, samples: 1 }
  }
  const icValues = []
  const step = Math.floor(windowSize / 2)
  for (let i = 0; i <= clean.length - windowSize; i += step) {
    const window = clean.substring(i, i + windowSize)
    icValues.push(calculateIC(window))
  }
  const mean = icValues.reduce((a, b) => a + b, 0) / icValues.length
  const variance = icValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / icValues.length
  const stdDev = Math.sqrt(variance)
  return { mean, stdDev, samples: icValues.length }
}

export function interpretICConfidence (icData) {
  const { mean, stdDev } = icData
  const expectedMonoIC = 0.067
  const expectedPolyIC = 0.038
  const distFromMono = Math.abs(mean - expectedMonoIC)
  const distFromPoly = Math.abs(mean - expectedPolyIC)
  const lowerBound = mean - 2 * stdDev
  const upperBound = mean + 2 * stdDev
  if (distFromMono < 0.01 && stdDev < 0.01) {
    return `${(95).toFixed(0)}% sikker monoalfabetisk`
  }
  if (distFromPoly < 0.01 && stdDev < 0.01) {
    return `${(95).toFixed(0)}% sikker polyalfabetisk`
  }
  if (upperBound > expectedMonoIC && lowerBound < expectedMonoIC) {
    return 'Sannsynlig monoalfabetisk'
  }
  if (upperBound > expectedPolyIC && lowerBound < expectedPolyIC) {
    return 'Sannsynlig polyalfabetisk'
  }
  return `Usikker (IC = ${mean.toFixed(4)} ± ${stdDev.toFixed(4)})`
}

export function calculateEmpiricalNgramScore (text, n) {
  if (text.length < n) return -Infinity
  const ngrams = {}
  let total = 0
  for (let i = 0; i <= text.length - n; i++) {
    const ngram = text.substring(i, i + n)
    ngrams[ngram] = (ngrams[ngram] || 0) + 1
    total++
  }
  let entropy = 0
  for (const count of Object.values(ngrams)) {
    const p = count / total
    entropy -= p * Math.log2(p)
  }
  const maxEntropy = Math.log2(Math.min(total, Math.pow(29, n)))
  const normalizedEntropy = entropy / maxEntropy
  return -normalizedEntropy * 10
}

export function analyzeBigrams (text) {
  const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '')
  const bigrams = {}
  for (let i = 0; i < clean.length - 1; i++) {
    const bigram = clean.substring(i, i + 2)
    bigrams[bigram] = (bigrams[bigram] || 0) + 1
  }
  return bigrams
}

export function calculateIC (text) {
  const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '')
  const n = clean.length
  if (n <= 1) return 0
  const freq = {}
  for (const char of clean) {
    freq[char] = (freq[char] || 0) + 1
  }
  let sum = 0
  for (const count of Object.values(freq)) {
    sum += count * (count - 1)
  }
  return sum / (n * (n - 1))
}

export function calculateEntropy (text) {
  const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '')
  if (clean.length === 0) return 0
  const freq = {}
  for (const char of clean) {
    freq[char] = (freq[char] || 0) + 1
  }
  let entropy = 0
  const total = clean.length
  for (const count of Object.values(freq)) {
    const p = count / total
    if (p > 0) {
      entropy -= p * Math.log2(p)
    }
  }
  return entropy
}

export function calculateChiSquare (text, expectedFreq = FREQUENCY_TABLES.norwegian) {
  const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '')
  const n = clean.length
  if (n === 0) return Infinity
  const observed = {}
  for (const char of clean) {
    observed[char] = (observed[char] || 0) + 1
  }
  let chiSquare = 0
  for (const char in expectedFreq) {
    const expected = (expectedFreq[char] / 100) * n
    const obs = observed[char] || 0
    chiSquare += Math.pow(obs - expected, 2) / expected
  }
  return chiSquare
}

export function calculateNgramScore (text, ngramType = 'quadgram') {
  const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '')
  let ngramData
  let n = 4
  if (ngramType === 'bigram') {
    ngramData = NORWEGIAN_BIGRAMS
    n = 2
  } else if (ngramType === 'trigram') {
    ngramData = NORWEGIAN_TRIGRAMS
    n = 3
  } else if (ngramType === 'pentagram') {
    ngramData = NORWEGIAN_PENTAGRAMS
    n = 5
  } else if (ngramType === 'hexagram') {
    ngramData = NORWEGIAN_HEXAGRAMS
    n = 6
  } else {
    ngramData = NORWEGIAN_QUADGRAMS
  }
  let score = 0
  let count = 0
  for (let i = 0; i <= clean.length - n; i++) {
    const ngram = clean.substring(i, i + n)
    if (ngramData[ngram]) {
      score += Math.log(ngramData[ngram])
      count++
    } else {
      score += Math.log(0.0001 / n)
    }
  }
  return count > 0 ? score / count : -Infinity
}

export function countNorwegianWords (text) {
  const words = text.toLowerCase().split(/\s+/)
  let count = 0
  for (const word of words) {
    const cleanWord = word.replace(/[.,!?;:]/g, '')
    if (NORWEGIAN_WORDS.includes(cleanWord)) count++
  }
  return count
}

export function checkNorwegianChars (text) {
  const clean = text.toUpperCase()
  const norwegianChars = (clean.match(/[ÆØÅ]/g) || []).length
  const total = clean.replace(/[^A-ZÆØÅ]/g, '').length
  return {
    hasAeOeAa: norwegianChars > 0,
    count: norwegianChars,
    percentage: total > 0 ? (norwegianChars / total) * 100 : 0
  }
}

export function checkImprobableSequences (text) {
  const clean = text.toUpperCase()
  let penalty = 0
  const badBigrams = ['QZ', 'QX', 'ZQ', 'XQ', 'ÆÆ', 'ØØ', 'ÅÅ', 'ZZ', 'QQ']
  for (const bigram of badBigrams) {
    penalty += (clean.match(new RegExp(bigram, 'g')) || []).length * 10
  }
  const tripleConsonants = clean.match(/[BCDFGHJKLMNPQRSTVWXZ]{3,}/g) || []
  penalty += tripleConsonants.length * 5
  return penalty
}

export function detectPatterns (text) {
  const patterns = {}
  const minLength = 3
  const maxLength = 6
  for (let len = minLength; len <= maxLength; len++) {
    for (let i = 0; i <= text.length - len; i++) {
      const pattern = text.substring(i, i + len)
      if (pattern.match(/^[A-Za-z]+$/)) {
        patterns[pattern] = (patterns[pattern] || 0) + 1
      }
    }
  }
  const common = Object.entries(patterns)
    .filter(([, freq]) => freq > 1)
    .map(([pattern, frequency]) => ({ pattern, frequency }))
    .sort((a, b) => b.frequency - a.frequency)
  return { count: common.length, common }
}

export function detectPolyalphabetic (text) {
  const letters = text.toUpperCase().replace(/[^A-Z]/g, '')
  const freq = {}
  for (const c of letters) {
    freq[c] = (freq[c] || 0) + 1
  }
  let ic = 0
  const n = letters.length
  if (n > 1) {
    for (const count of Object.values(freq)) {
      ic += count * (count - 1)
    }
    ic = ic / (n * (n - 1))
  }
  return { ic }
}

export function performKasiskiTest (text) {
  const repeats = {}
  const minLength = 3
  for (let len = minLength; len <= 5; len++) {
    for (let i = 0; i <= text.length - len; i++) {
      const pattern = text.substring(i, i + len)
      if (!pattern.match(/^[A-Za-z]+$/)) continue
      for (let j = i + len; j <= text.length - len; j++) {
        if (text.substring(j, j + len) === pattern) {
          const distance = j - i
          repeats[distance] = (repeats[distance] || 0) + 1
        }
      }
    }
  }
  const factors = {}
  for (const distance of Object.keys(repeats).map(Number)) {
    for (let f = 2; f <= Math.min(distance, 20); f++) {
      if (distance % f === 0) {
        factors[f] = (factors[f] || 0) + repeats[distance]
      }
    }
  }
  const max = Math.max(...Object.values(factors), 1)
  const keyLengths = Object.entries(factors)
    .map(([length, confidence]) => ({ length: Number(length), confidence: confidence / max }))
    .sort((a, b) => b.confidence - a.confidence)
  return { keyLengths }
}

export function updateLegacyResult (cipherInput, keyInput, keyValue, resultDiv) {
  const update = () => {
    const key = parseInt(keyInput.value, 10) || 0
    keyValue.textContent = String(key)
    const text = cipherInput.value || ''
    resultDiv.textContent = caesarShift(text, -key)
  }
  const debounced = debounce(update, 100)
  cipherInput.addEventListener('input', debounced)
  keyInput.addEventListener('input', update)
  update()
}
