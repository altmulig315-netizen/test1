// UI-facing frequency analyzer: updates IC/entropy/chi-square, n-grams,
// charts, and Norwegian language hints for Caesar analysis panels.
import {
  calculateChiSquare,
  calculateEntropy,
  calculateIC,
  calculateNgramScore,
  calculateSlidingWindowIC,
  checkNorwegianChars,
  countNorwegianWords,
  detectLanguageVariant,
  getTopNgrams,
  interpretICConfidence
} from '../../core/utils.js'
import { NORWEGIAN_FREQ } from '../../core/constants.js'

export class FrequencyAnalyzer {
  constructor () {
    this.currentNgramType = 'quadgram'
    this.customNgramLength = 7
  }

  handleNgramChange (value, customLength) {
    this.currentNgramType = value || 'quadgram'
    if (this.currentNgramType === 'custom' && customLength) {
      this.customNgramLength = Number(customLength) || 7
    }
  }

  getNgramLength () {
    if (this.currentNgramType === 'bigram') return 2
    if (this.currentNgramType === 'trigram') return 3
    if (this.currentNgramType === 'pentagram') return 5
    if (this.currentNgramType === 'hexagram') return 6
    if (this.currentNgramType === 'custom') return this.customNgramLength
    return 4
  }

  updateFrequencyAnalysis (text) {
    if (!text) return
    const ic = calculateIC(text)
    const icEl = document.getElementById('icValue')
    if (icEl) icEl.textContent = ic.toFixed(4)

    const slidingIC = calculateSlidingWindowIC(text)
    const icConf = document.getElementById('icConfidence')
    if (icConf) icConf.textContent = interpretICConfidence(slidingIC)

    const entropy = calculateEntropy(text)
    const entropyEl = document.getElementById('entropyValue')
    if (entropyEl) entropyEl.textContent = entropy.toFixed(2)
    const entropyInterp = document.getElementById('entropyInterpret')
    if (entropyInterp) entropyInterp.textContent = entropy < 4.0 ? 'Strukturert' : 'Tilfeldig'

    const chi = calculateChiSquare(text, NORWEGIAN_FREQ)
    const chiEl = document.getElementById('chiSquare')
    if (chiEl) chiEl.textContent = chi.toFixed(2)
    const chiQuality = document.getElementById('chiSquareQuality')
    if (chiQuality) {
      chiQuality.textContent = chi < 100 ? 'Godt match' : chi < 300 ? 'Middels' : 'Dårlig match'
    }

    const langVariant = detectLanguageVariant(text)
    const langEl = document.getElementById('detectedLang')
    if (langEl) langEl.textContent = langVariant

    const ngramLength = this.getNgramLength()
    const topNgrams = getTopNgrams(text, ngramLength, 1)
    const topNgramEl = document.getElementById('topNgram')
    if (topNgramEl && topNgrams.length > 0) {
      topNgramEl.textContent = topNgrams[0].ngram
    }

    const ngramScore = calculateNgramScore(text, this.currentNgramType)
    const ngramScoreEl = document.getElementById('ngramScore')
    if (ngramScoreEl) ngramScoreEl.textContent = ngramScore.toFixed(2)

    this.updateFrequencyChart(text)
    this.updateNgramTable(text, ngramLength)
  }

  updateFrequencyChart (text) {
    const chartEl = document.getElementById('frequencyChart')
    if (!chartEl) return
    const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '')
    const freq = {}
    for (const char of clean) {
      freq[char] = (freq[char] || 0) + 1
    }
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ'.split('')
    const maxCount = Math.max(...Object.values(freq), 1)
    let html = ''
    for (const letter of alphabet) {
      const count = freq[letter] || 0
      const height = (count / maxCount) * 100
      html += `<div class="bar-container bar-container-flex"><div class="bar bar-fill" style="height: ${height}%;" title="${letter}"></div><div class="bar-label bar-label-styled">${letter}</div></div>`
    }
    chartEl.innerHTML = html
  }

  updateNgramTable (text, n) {
    const tableEl = document.getElementById('ngramTable')
    if (!tableEl) return
    const topNgrams = getTopNgrams(text, n, 10)
    if (topNgrams.length === 0) {
      tableEl.innerHTML = '<p class="pattern-empty">Ingen n-grammer funnet</p>'
      return
    }
    let html = '<table class="ngram-table">'
    html += '<tr class="ngram-header"><th>N-gram</th><th>Frekvens</th></tr>'
    topNgrams.forEach((ng) => {
      html += `<tr class="ngram-row"><td><code class="ngram-chip">${ng.ngram}</code></td><td class="ngram-count">${ng.count}</td></tr>`
    })
    html += '</table>'
    tableEl.innerHTML = html
  }

  updateFrequencyChartsSubstitution (text) {
    const freq = {}
    text.toUpperCase().split('').forEach((c) => {
      if (c.match(/[A-ZÆØÅ]/)) freq[c] = (freq[c] || 0) + 1
    })
    const total = Object.values(freq).reduce((a, b) => a + b, 0)
    const cipherChart = document.getElementById('cipherFreqChart')
    if (cipherChart) {
      const sorted = Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
      cipherChart.innerHTML = sorted
        .map(([letter, count]) => {
          const percent = ((count / total) * 100).toFixed(1)
          return `<div class="freq-chart-item"><span class="freq-chart-letter">${letter}:</span><span class="freq-chart-percent">${percent}%</span><div class="freq-chart-bar freq-chart-bar-cyan" style="width: ${percent * 5}px;"></div></div>`
        })
        .join('')
    }
    const norwegianChart = document.getElementById('norwegianFreqChart')
    if (norwegianChart) {
      const norFreq = [
        ['E', 16.72], ['R', 8.97], ['N', 7.85], ['T', 7.24], ['A', 6.84],
        ['I', 6.05], ['S', 5.93], ['L', 5.14], ['O', 4.98], ['D', 4.51]
      ]
      norwegianChart.innerHTML = norFreq
        .map(([letter, percent]) => `<div class="freq-chart-item"><span class="freq-chart-letter-norwegian">${letter}:</span><span class="freq-chart-percent">${percent}%</span><div class="freq-chart-bar freq-chart-bar-green" style="width: ${percent * 5}px;"></div></div>`)
        .join('')
    }
  }

  countNorwegianWords (text) {
    return countNorwegianWords(text)
  }

  checkNorwegianChars (text) {
    return checkNorwegianChars(text)
  }
}
