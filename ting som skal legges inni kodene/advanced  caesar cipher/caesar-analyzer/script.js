        /**
         * Alfabeter for forskjellige språk og systemer
         */
        const ALPHABETS = {
            latin: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            norwegian: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ',
            cyrillic: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
            greek: 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ',
            custom: ''
        };

        /**
         * Frekvenstabeller for forskjellige språk (i prosent)
         */
        const FREQUENCY_TABLES = {
            norwegian: {
                'E': 16.72, 'R': 8.97, 'N': 7.85, 'T': 7.24, 'A': 6.84,
                'I': 6.05, 'S': 5.93, 'L': 5.14, 'O': 4.98, 'D': 4.51,
                'G': 4.05, 'K': 3.51, 'M': 3.35, 'V': 2.52, 'F': 2.09,
                'U': 1.96, 'P': 1.92, 'H': 1.87, 'B': 1.52, 'Æ': 1.14,
                'Ø': 0.94, 'Y': 0.71, 'Å': 0.67, 'J': 0.63, 'C': 0.46,
                'W': 0.31, 'Z': 0.05, 'Q': 0.02, 'X': 0.02
            },
            bokmal: { // Bokmål-spesifikk
                'E': 16.85, 'R': 9.12, 'N': 7.95, 'T': 7.38, 'A': 6.92,
                'I': 6.15, 'S': 6.05, 'L': 5.25, 'O': 5.12, 'D': 4.62,
                'G': 4.15, 'K': 3.58, 'M': 3.42, 'V': 2.58, 'F': 2.15,
                'U': 2.02, 'P': 1.98, 'H': 1.92, 'B': 1.58, 'Æ': 1.22,
                'Ø': 1.02, 'Y': 0.75, 'Å': 0.72, 'J': 0.68, 'C': 0.48,
                'W': 0.35, 'Z': 0.06, 'Q': 0.02, 'X': 0.02
            },
            nynorsk: { // Nynorsk-spesifikk
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

        /**
         * Norske vanlige ord for ordbok-validering
         */
        const NORWEGIAN_COMMON_WORDS = [
            'og', 'i', 'er', 'det', 'som', 'på', 'til', 'for', 'med', 'av',
            'en', 'ikke', 'har', 'den', 'de', 'var', 'jeg', 'han', 'om', 'men',
            'ett', 'være', 'kan', 'vil', 'når', 'fra', 'eller', 'etter', 'ved',
            'dette', 'alle', 'også', 'nå', 'over', 'bare', 'dag', 'år', 'der',
            'hva', 'skal', 'ut', 'opp', 'skulle', 'noe', 'andre', 'ingen', 'ble',
            'mange', 'selv', 'hele', 'måtte', 'blir', 'hver', 'sa', 'kunne',
            'hemmelig', 'viktig', 'melding', 'kode', 'brev', 'dokument'
        ];

        /**
         * Norske bigrammer (2-bokstavers kombinasjoner) - frekvens i %
         */
        const NORWEGIAN_BIGRAMS = {
            'ER': 3.84, 'EN': 3.21, 'ET': 2.67, 'DE': 2.45, 'AN': 2.34,
            'RE': 2.28, 'OR': 2.15, 'AR': 2.01, 'TE': 1.98, 'LE': 1.87,
            'NE': 1.84, 'ST': 1.76, 'SE': 1.68, 'SK': 1.65, 'FO': 1.59,
            'ME': 1.54, 'TI': 1.51, 'ND': 1.48, 'KE': 1.45, 'ED': 1.42,
            'AT': 1.39, 'OM': 1.36, 'IN': 1.33, 'AL': 1.30, 'IL': 1.27,
            'OG': 1.24, 'VE': 1.21, 'NN': 1.18, 'IG': 1.15, 'GE': 1.12
        };

        /**
         * Norske trigrammer (3-bokstavers kombinasjoner) - frekvens i %
         */
        const NORWEGIAN_TRIGRAMS = {
            'DET': 1.42, 'SOM': 1.18, 'FOR': 1.05, 'ERE': 0.98, 'OG ': 0.92,
            'ENE': 0.89, 'ING': 0.86, 'TER': 0.83, 'NDE': 0.80, 'SKE': 0.77,
            'MED': 0.74, 'VER': 0.71, 'TIL': 0.68, 'STE': 0.65, 'OPP': 0.62,
            'NER': 0.59, 'TTE': 0.56, 'LIG': 0.53, 'KKE': 0.50, 'ERN': 0.47,
            'REN': 0.45, 'AND': 0.43, 'ATT': 0.41, 'VIL': 0.39, 'END': 0.37,
            'ORD': 0.35, 'KAN': 0.33, 'HAR': 0.31, 'VAR': 0.29, 'BLE': 0.27
        };

        /**
         * Norske quadgrammer (4-bokstavers kombinasjoner) - BESTE for analyse!
         * Quadgrammer gir mest presis språkdeteksjon
         */
        const NORWEGIAN_QUADGRAMS = {
            'TION': 0.89, 'ERER': 0.76, 'EREN': 0.68, 'ERTE': 0.61, 'KKER': 0.58,
            'NGEN': 0.55, 'SKAL': 0.52, 'ENNE': 0.49, 'NING': 0.46, 'STEN': 0.43,
            'ETTE': 0.41, 'DETT': 0.39, 'NDER': 0.37, 'VING': 0.35, 'TTER': 0.33,
            'HVIS': 0.31, 'RING': 0.29, 'KENE': 0.27, 'LIKE': 0.25, 'LING': 0.23,
            'SKER': 0.22, 'MMEN': 0.21, 'NNET': 0.20, 'ELLER': 0.19, 'ENKE': 0.18,
            'STOR': 0.17, 'FTER': 0.16, 'OVER': 0.15, 'IKKE': 0.14, 'UNDE': 0.13,
            'HEMM': 0.12, 'EMME': 0.11, 'MMEL': 0.10, 'MELI': 0.09, 'ELIG': 0.08
        };

        /**
         * Norske pentagrammer (5-bokstavers kombinasjoner)
         * Mer spesifikke, bedre for å identifisere unike fraser
         */
        const NORWEGIAN_PENTAGRAMS = {
            'ERING': 0.45, 'NINGS': 0.42, 'KELIG': 0.39, 'SKJER': 0.36, 'ENHET': 0.33,
            'TDETT': 0.31, 'DETTE': 0.29, 'ETTER': 0.27, 'NDERS': 0.25, 'UNDER': 0.23,
            'OMMER': 0.22, 'VILLE': 0.21, 'ELLER': 0.20, 'ANNET': 0.19, 'INNEN': 0.18,
            'SKULLE': 0.17, 'KSTEN': 0.16, 'HEMME': 0.15, 'EMMEL': 0.14, 'MMELI': 0.13,
            'MELIG': 0.12, 'IGHET': 0.11, 'GELIG': 0.10, 'STERK': 0.09, 'FORSK': 0.08,
            'ORSKE': 0.07, 'RSKER': 0.06, 'SKING': 0.05, 'VIKTI': 0.04, 'IKTIG': 0.03
        };

        /**
         * Norske hexagrammer (6-bokstavers kombinasjoner)
         * Svært spesifikke, best for å identifisere presise fraser og ord
         */
        const NORWEGIAN_HEXAGRAMS = {
            'NINGER': 0.38, 'SKULLE': 0.35, 'SKELIG': 0.32, 'TDETTE': 0.29, 'DETTER': 0.26,
            'ETTERE': 0.24, 'DERSOM': 0.22, 'FORSKE': 0.20, 'ORSKER': 0.18, 'RSKING': 0.16,
            'VIKTIG': 0.15, 'IKTIGE': 0.14, 'HEMMEL': 0.13, 'EMMELI': 0.12, 'MMELIG': 0.11,
            'MELIGE': 0.10, 'ANELSE': 0.09, 'KELIGE': 0.08, 'IGHETE': 0.07, 'HETENE': 0.06,
            'TINGST': 0.05, 'INGSTE': 0.04, 'SKRIVE': 0.03, 'KRIVER': 0.02, 'RIVERE': 0.01
        };

        let currentAlphabet = ALPHABETS.latin;
        let currentNgramType = 'quadgram';
        let customNgramLength = 7;

        /**
         * Oppdaterer alfabetet basert på valgt type
         */
        function updateAlphabet() {
            const type = document.getElementById('alphabetType').value;
            const customGroup = document.getElementById('customAlphabetGroup');
            
            if (type === 'custom') {
                customGroup.style.display = 'block';
                currentAlphabet = document.getElementById('customAlphabet').value.toUpperCase() || ALPHABETS.latin;
            } else {
                customGroup.style.display = 'none';
                currentAlphabet = ALPHABETS[type];
            }
            
            // Oppdater frekvensanalyse hvis det er tekst
            if (document.getElementById('inputText').value) {
                updateFrequencyAnalysis(document.getElementById('inputText').value);
            }
        }

        /**
         * Hovedfunksjon for Caesar cipher transformasjon
         * @param {string} text - Teksten som skal transformeres
         * @param {number} shift - Forskyvningsverdien
         * @param {boolean} encrypt - True for kryptering, false for dekryptering
         * @returns {string} - Transformert tekst
         */
        function caesarTransform(text, shift, encrypt = true) {
            let result = '';
            const alphabetLength = currentAlphabet.length;
            
            // Normaliser shift (støtte for negative verdier)
            shift = ((shift % alphabetLength) + alphabetLength) % alphabetLength;
            if (!encrypt) shift = alphabetLength - shift;
            
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const upperChar = char.toUpperCase();
                const index = currentAlphabet.indexOf(upperChar);
                
                if (index !== -1) {
                    // Bokstaven finnes i alfabetet - utfør transformasjon
                    const newIndex = (index + shift) % alphabetLength;
                    const newChar = currentAlphabet[newIndex];
                    
                    // Behold original case (stor/liten bokstav)
                    result += char === char.toLowerCase() ? newChar.toLowerCase() : newChar;
                } else {
                    // Ikke i alfabetet - behold som original
                    result += char;
                }
            }
            
            return result;
        }

        /**
         * Krypterer teksten
         */
        function encrypt() {
            const text = document.getElementById('inputText').value;
            const shift = parseInt(document.getElementById('shiftValue').value) || 0;
            
            if (!text) {
                alert('⚠️ Vennligst skriv inn tekst!');
                return;
            }
            
            const encrypted = caesarTransform(text, shift, true);
            document.getElementById('outputText').value = encrypted;
            updateFrequencyAnalysis(encrypted);
        }

        /**
         * Dekrypterer teksten
         */
        function decrypt() {
            const text = document.getElementById('inputText').value;
            const shift = parseInt(document.getElementById('shiftValue').value) || 0;
            
            if (!text) {
                alert('⚠️ Vennligst skriv inn tekst!');
                return;
            }
            
            const decrypted = caesarTransform(text, shift, false);
            document.getElementById('outputText').value = decrypted;
            updateFrequencyAnalysis(decrypted);
        }

        /**
         * Beregner Index of Coincidence (IC)
         * IC er et mål på sannsynligheten for at to tilfeldige bokstaver er like
         * @param {string} text - Teksten som skal analyseres
         * @returns {number} - IC-verdien
         */
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

        /**
         * SLIDING WINDOW IC - Beregner IC over flere vinduer for mer robust analyse
         * @param {string} text - Teksten som skal analyseres
         * @param {number} windowSize - Vindusstørrelse (standard: 50)
         * @returns {Object} - {mean, stdDev, samples}
         */
        function calculateSlidingWindowIC(text, windowSize = 50) {
            const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '');
            
            if (clean.length < windowSize) {
                return { mean: calculateIC(text), stdDev: 0, samples: 1 };
            }
            
            const icValues = [];
            const step = Math.floor(windowSize / 2); // 50% overlap
            
            for (let i = 0; i <= clean.length - windowSize; i += step) {
                const window = clean.substring(i, i + windowSize);
                icValues.push(calculateIC(window));
            }
            
            // Beregn gjennomsnitt og standardavvik
            const mean = icValues.reduce((a, b) => a + b, 0) / icValues.length;
            const variance = icValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / icValues.length;
            const stdDev = Math.sqrt(variance);
            
            return { mean, stdDev, samples: icValues.length };
        }

        /**
         * SHANNON ENTROPY - Måler informasjonsinnhold/tilfeldighet
         * Lav entropy = mer struktur = sannsynligvis riktig dekryptering
         * @param {string} text - Teksten som skal analyseres
         * @returns {number} - Entropy-verdi (0-5 for norsk alfabet)
         */
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

        /**
         * Sjekker for ÆØÅ i teksten (kritisk for norsk)
         * @param {string} text - Teksten som skal analyseres
         * @returns {Object} - {hasAeOeAa, count, percentage}
         */
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

        /**
         * Sjekker for usannsynlige bokstavsekvenser
         * @param {string} text - Teksten som skal analyseres
         * @returns {number} - Straffpoeng (høyere = dårligere)
         */
        function checkImprobableSequences(text) {
            const clean = text.toUpperCase();
            let penalty = 0;
            
            // Usannsynlige bigrammer
            const badBigrams = ['QZ', 'QX', 'ZQ', 'XQ', 'ÆÆ', 'ØØ', 'ÅÅ', 'ZZ', 'QQ'];
            for (let bigram of badBigrams) {
                penalty += (clean.match(new RegExp(bigram, 'g')) || []).length * 10;
            }
            
            // Tre konsonanter på rad uten vokal
            const tripleConsonants = clean.match(/[BCDFGHJKLMNPQRSTVWXZ]{3,}/g) || [];
            penalty += tripleConsonants.length * 5;
            
            return penalty;
        }

        /**
         * ENSEMBLE SCORING - Kombinerer flere metrikker for robust scoring
         * @param {string} text - Dekryptert tekst
         * @param {Object} weights - Vekter for adaptiv scoring
         * @returns {number} - Total score (lavere = bedre)
         */
        function calculateEnsembleScore(text, weights = null) {
            const textLength = text.replace(/[^A-ZÆØÅ]/gi, '').length;
            
            // ADAPTIV VEKTING basert på tekstlengde
            let w;
            if (weights) {
                w = weights;
            } else if (textLength <= 40) {
                // Kort tekst: IC er upålitelig, vekt heuristikk mer
                w = {
                    chiSquare: 0.15,
                    bigram: 0.25,
                    trigram: 0.20,
                    quadgram: 0.15,
                    dictionary: 0.20,
                    improbable: 0.05
                };
            } else if (textLength <= 200) {
                // Medium tekst: Balansert
                w = {
                    chiSquare: 0.20,
                    bigram: 0.20,
                    trigram: 0.20,
                    quadgram: 0.15,
                    dictionary: 0.15,
                    improbable: 0.10
                };
            } else {
                // Lang tekst: IC og statistikk veier tungt
                w = {
                    chiSquare: 0.30,
                    bigram: 0.15,
                    trigram: 0.15,
                    quadgram: 0.20,
                    dictionary: 0.10,
                    improbable: 0.10
                };
            }
            
            // Beregn alle komponenter
            const chiSquare = calculateChiSquare(text, FREQUENCY_TABLES.norwegian);
            const bigramScore = -calculateNgramScore(text, 'bigram'); // Negativ fordi høyere er bedre
            const trigramScore = -calculateNgramScore(text, 'trigram');
            const quadgramScore = -calculateNgramScore(text, 'quadgram');
            const dictionaryScore = -(countNorwegianWords(text) * 2); // Negativ fordi høyere er bedre
            const improbablePenalty = checkImprobableSequences(text);
            
            // Kombiner med vekter
            const totalScore = 
                w.chiSquare * chiSquare +
                w.bigram * bigramScore +
                w.trigram * trigramScore +
                w.quadgram * quadgramScore +
                w.dictionary * dictionaryScore +
                w.improbable * improbablePenalty;
            
            return totalScore;
        }

        /**
         * DETEKTERER SPRÅKVARIANT (Bokmål vs Nynorsk)
         * @param {string} text - Teksten som skal analyseres
         * @returns {string} - 'bokmal', 'nynorsk', eller 'norwegian'
         */
        function detectLanguageVariant(text) {
            const bokmalWords = ['ikke', 'også', 'eller', 'skulle', 'kunne', 'ville'];
            const nynorskWords = ['ikkje', 'òg', 'eller', 'skulle', 'kunne', 'ville'];
            
            const lowerText = text.toLowerCase();
            let bokmalCount = 0;
            let nynorskCount = 0;
            
            for (let word of bokmalWords) {
                bokmalCount += (lowerText.match(new RegExp('\\b' + word + '\\b', 'g')) || []).length;
            }
            
            for (let word of nynorskWords) {
                nynorskCount += (lowerText.match(new RegExp('\\b' + word + '\\b', 'g')) || []).length;
            }
            
            if (bokmalCount > nynorskCount * 1.5) return 'bokmal';
            if (nynorskCount > bokmalCount * 1.5) return 'nynorsk';
            return 'norwegian';
        }

        /**
         * Beregner statistisk konfidensintervall for IC
         * @param {Object} icData - Output fra calculateSlidingWindowIC
         * @returns {string} - Konfidensinterpretasjon
         */
        function interpretICConfidence(icData) {
            const { mean, stdDev } = icData;
            
            // Forventet IC for norsk monoalfabetisk
            const expectedMonoIC = 0.067;
            const expectedPolyIC = 0.038;
            
            // Beregn avstand fra forventet
            const distFromMono = Math.abs(mean - expectedMonoIC);
            const distFromPoly = Math.abs(mean - expectedPolyIC);
            
            // Konfidensintervall (±2 std dev)
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

        /**
         * Beregner Chi-Square test mot forventet frekvens
         * Lavere verdi = bedre match med språkets normalfordeling
         * @param {string} text - Teksten som skal analyseres
         * @param {Object} expectedFreq - Forventet frekvensfordeling
         * @returns {number} - Chi-square score
         */
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

        /**
         * Teller antall norske ord i teksten
         * @param {string} text - Teksten som skal analyseres
         * @returns {number} - Antall matchende ord
         */
        function countNorwegianWords(text) {
            const words = text.toLowerCase().split(/\s+/);
            let count = 0;
            
            for (let word of words) {
                // Fjern tegnsetting
                const cleanWord = word.replace(/[.,!?;:]/g, '');
                if (NORWEGIAN_COMMON_WORDS.includes(cleanWord)) {
                    count++;
                }
            }
            
            return count;
        }

        /**
         * Beregner n-gram score basert på valgt n-gram type
         * Støtter nå pentagram, hexagram og tilpassede n-grammer
         * @param {string} text - Teksten som skal analyseres
         * @param {string} ngramType - Type: 'bigram', 'trigram', 'quadgram', 'pentagram', 'hexagram', eller 'custom'
         * @returns {number} - Score (høyere = bedre match)
         */
        function calculateNgramScore(text, ngramType = 'quadgram') {
            const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '');
            
            let ngramData, n;
            
            // Velg riktig n-gram datasett og lengde
            if (ngramType === 'bigram') {
                ngramData = NORWEGIAN_BIGRAMS;
                n = 2;
            } else if (ngramType === 'trigram') {
                ngramData = NORWEGIAN_TRIGRAMS;
                n = 3;
            } else if (ngramType === 'quadgram') {
                ngramData = NORWEGIAN_QUADGRAMS;
                n = 4;
            } else if (ngramType === 'pentagram') {
                ngramData = NORWEGIAN_PENTAGRAMS;
                n = 5;
            } else if (ngramType === 'hexagram') {
                ngramData = NORWEGIAN_HEXAGRAMS;
                n = 6;
            } else if (ngramType === 'custom') {
                // For tilpassede n-grammer, bruk empirisk frekvensanalyse
                n = customNgramLength;
                ngramData = null; // Vil bruke empirisk scoring
            } else {
                ngramData = NORWEGIAN_QUADGRAMS;
                n = 4;
            }
            
            // Hvis vi har forhåndsdefinerte frekvenser, bruk dem
            if (ngramData) {
                let score = 0;
                let count = 0;
                
                for (let i = 0; i <= clean.length - n; i++) {
                    const ngram = clean.substring(i, i + n);
                    if (ngramData[ngram]) {
                        // Bruk logaritmisk scoring for bedre differensiering
                        score += Math.log(ngramData[ngram]);
                        count++;
                    } else {
                        // Straff for ukjente n-grammer (men mindre straff for lengre n-grammer)
                        score += Math.log(0.0001 / n);
                    }
                }
                
                return count > 0 ? score / count : -Infinity;
            } else {
                // Empirisk scoring for tilpassede n-grammer
                // Basert på Shannon entropy og repetisjonsmønstre
                return calculateEmpiricalNgramScore(clean, n);
            }
        }

        /**
         * Empirisk n-gram scoring for tilpassede lengder
         * Bruker entropy og gjentakelsesanalyse
         * @param {string} text - Renset tekst
         * @param {number} n - N-gram lengde
         * @returns {number} - Empirisk score
         */
        function calculateEmpiricalNgramScore(text, n) {
            if (text.length < n) return -Infinity;
            
            const ngrams = {};
            let total = 0;
            
            // Tell alle n-grammer
            for (let i = 0; i <= text.length - n; i++) {
                const ngram = text.substring(i, i + n);
                ngrams[ngram] = (ngrams[ngram] || 0) + 1;
                total++;
            }
            
            // Beregn Shannon entropy
            let entropy = 0;
            for (let count of Object.values(ngrams)) {
                const p = count / total;
                entropy -= p * Math.log2(p);
            }
            
            // Normaliser entropy (lavere entropy = mer struktur = bedre)
            const maxEntropy = Math.log2(Math.min(total, Math.pow(29, n))); // 29 = norsk alfabet
            const normalizedEntropy = entropy / maxEntropy;
            
            // Konverter til score (høyere = bedre)
            // Mer struktur (lavere entropy) = høyere score
            return -normalizedEntropy * 10;
        }

        /**
         * Finner de mest frekvente n-grammene i teksten
         * @param {string} text - Teksten som skal analyseres
         * @param {number} n - Lengde på n-gram (2-10)
         * @param {number} top - Antall topp-resultater
         * @returns {Array} - Array av {ngram, count} objekter
         */
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

        /**
         * Henter n-gram lengde basert på type
         * @param {string} ngramType - Type av n-gram
         * @returns {number} - Lengden på n-grammet
         */
        function getNgramLength(ngramType) {
            const lengths = {
                'bigram': 2,
                'trigram': 3,
                'quadgram': 4,
                'pentagram': 5,
                'hexagram': 6,
                'custom': customNgramLength
            };
            return lengths[ngramType] || 4;
        }

        /**
         * Oppdaterer n-gram analysen når bruker endrer type
         */
        function updateNgramAnalysis() {
            const selectedType = document.getElementById('ngramType').value;
            const customGroup = document.getElementById('customNgramGroup');
            
            // Vis/skjul tilpasset n-gram lengde input
            if (selectedType === 'custom') {
                customGroup.style.display = 'block';
                customNgramLength = parseInt(document.getElementById('customNgramLength').value) || 7;
                currentNgramType = 'custom';
            } else {
                customGroup.style.display = 'none';
                currentNgramType = selectedType;
            }
            
            // Oppdater analyse hvis det er tekst
            const text = document.getElementById('inputText').value;
            if (text) {
                updateFrequencyAnalysis(text);
            }
        }

        /**
         * Analyserer bigrams (to-bokstavs kombinasjoner)
         * @param {string} text - Teksten som skal analyseres
         * @returns {Object} - Bigram-frekvenser
         */
        function analyzeBigrams(text) {
            const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '');
            const bigrams = {};
            
            for (let i = 0; i < clean.length - 1; i++) {
                const bigram = clean.substring(i, i + 2);
                bigrams[bigram] = (bigrams[bigram] || 0) + 1;
            }
            
            return bigrams;
        }

        /**
         * Auto-Solve: PROFESJONELL CAESAR DEKRYPTERING
         * Med adaptiv pipeline, ensemble scoring, og statistisk konfidensanalyse
         */
        function autoSolve() {
            const text = document.getElementById('inputText').value;
            
            if (!text) {
                alert('⚠️ Vennligst skriv inn tekst!');
                return;
            }
            
            const mode = document.getElementById('analysisMode').value;
            const panel = document.getElementById('autoSolvePanel');
            const loading = document.getElementById('autoSolveLoading');
            const results = document.getElementById('autoSolveResults');
            
            panel.style.display = 'block';
            loading.classList.add('active');
            results.innerHTML = '';
            
            setTimeout(() => {
                const textLength = text.replace(/[^A-ZÆØÅ]/gi, '').length;
                
                // BESLUTNINGSMOTOR: Adaptiv analyse basert på tekstegenskaper
                const icData = calculateSlidingWindowIC(text);
                const entropy = calculateEntropy(text);
                const norwegianChars = checkNorwegianChars(text);
                
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
                        aeoeaaBonus = -20; // Negativ fordi lavere score er bedre
                    }
                    
                    // Final score
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
                        <div class="result-text" style="font-size: 1.2em; padding: 20px; background: rgba(0,255,255,0.1); border-radius: 8px; border: 2px solid var(--accent-green);">
                            ${best.text}
                        </div>
                        <div style="margin-top: 10px; color: var(--text-muted); text-align: center;">
                            Shift: ${best.shift} | Confidence: ${confidencePercent.toFixed(0)}%
                        </div>
                    `;
                } else {
                    // LÆRINGSMODUS: Full analyse og forklaring
                    let html = '<div style="background: rgba(0,0,0,0.4); padding: 20px; border-radius: 8px; margin-bottom: 20px;">';
                    html += '<h3 style="color: var(--primary-cyan); margin-bottom: 15px;">🔬 Analyserapport</h3>';
                    
                    // Tekstegenskaper
                    html += `<div style="color: var(--text-muted); line-height: 1.8;">`;
                    html += `<strong>📏 Tekstlengde:</strong> ${textLength} tegn<br>`;
                    html += `<strong>🎲 Entropy:</strong> ${entropy.toFixed(3)} bits (${entropy < 4.0 ? 'strukturert' : 'tilfeldig'})<br>`;
                    html += `<strong>🔍 IC:</strong> ${icData.mean.toFixed(4)} ± ${icData.stdDev.toFixed(4)}<br>`;
                    html += `<strong>🧩 Chiffer-type:</strong> ${cipherType === 'monoalphabetic' ? '✅ Monoalfabetisk (Caesar/Substitusjon)' : cipherType === 'polyalphabetic' ? '⚠️ Polyalfabetisk (Vigenère?)' : '❓ Ukjent'}<br>`;
                    html += `<strong>🎯 Type-konfidans:</strong> ${cipherConfidence.toFixed(0)}%<br>`;
                    html += `</div></div>`;
                    
                    // Fail-gracefully sjekk
                    if (candidates[0].wordCount === 0 && scoreGap < 5) {
                        html += '<div class="info-box" style="background: rgba(255,107,107,0.2); border-color: var(--accent-red);">';
                        html += '<strong>⚠️ ADVARSEL: Ingen rotasjoner gir god norsk språkprofil</strong><br><br>';
                        html += 'Dette kan bety:<br>';
                        html += '• Teksten er et <strong>Vigenère-chiffer</strong> (polyalfabetisk)<br>';
                        html += '• Det er et <strong>transposisjonschiffer</strong><br>';
                        html += '• Teksten er allerede <strong>klartekst</strong><br>';
                        html += '• Det er et <strong>substitusjonscryptogram</strong> (bruk Substitusjonsløser)<br>';
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
                        
                        const card = document.createElement('div');
                        card.className = 'suggestion-card';
                        card.onclick = () => applySuggestion(candidate);
                        
                        let badgeText = '';
                        if (isRecommended) {
                            if (confidence === 'very_high') badgeText = `${confidencePercent.toFixed(0)}% - Ekstremt høy tillit`;
                            else if (confidence === 'high') badgeText = `${confidencePercent.toFixed(0)}% - Høy tillit`;
                            else if (confidence === 'medium') badgeText = `${confidencePercent.toFixed(0)}% - Moderat tillit`;
                            else badgeText = `${confidencePercent.toFixed(0)}% - Lav tillit (flere plausible)`;
                        } else {
                            badgeText = `Alternativ (+${gap.toFixed(1)} score)`;
                        }
                        
                        card.innerHTML = `
                            <span class="confidence-badge ${confidenceClass}">
                                ${isRecommended ? '🏆 ' : ''}${badgeText}
                            </span>
                            <div class="shift-label">
                                ${isRecommended ? '🔐 Anbefalt løsning: ' : ''}Shift ${candidate.shift}
                                ${candidate.hasNorwegianChars ? ' ✓ ÆØÅ' : ''}
                                ${candidate.wordCount > 0 ? ` (${candidate.wordCount} ord)` : ''}
                            </div>
                            <div class="result-text">${candidate.text.substring(0, 200)}${candidate.text.length > 200 ? '...' : ''}</div>
                            <div style="margin-top: 10px; font-size: 0.8em; color: #8892b0;">
                                📊 Score: ${candidate.score.toFixed(2)} | 
                                🧠 Språk: ${candidate.languageVariant === 'bokmal' ? 'Bokmål' : candidate.languageVariant === 'nynorsk' ? 'Nynorsk' : 'Norsk'} ${candidate.norwegianCharPercent > 0 ? `(${candidate.norwegianCharPercent.toFixed(1)}% ÆØÅ)` : ''}
                            </div>
                        `;
                        results.appendChild(card);
                    }
                    
                    // Forklaringsboks
                    html += '<div class="info-box" style="margin-top: 20px;">';
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
                    
                    results.innerHTML = html + results.innerHTML;
                }
                
                loading.classList.remove('active');
                panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 800);
        }

        /**
         * HILL CLIMBING ALGORITHM
         * Optimaliserer shift-verdien ved å "klatre" mot bedre løsninger
         * Bruker n-gram scoring som fitness-funksjon
         */
        function runHillClimbing() {
            const text = document.getElementById('inputText').value;
            
            if (!text) {
                alert('⚠️ Vennligst skriv inn tekst!');
                return;
            }
            
            const resultDiv = document.getElementById('hillClimbingResult');
            resultDiv.innerHTML = '<div class="loading active">⛰️ Klatrer mot optimal løsning...</div>';
            
            setTimeout(() => {
                const alphabetLength = currentAlphabet.length;
                let currentShift = Math.floor(Math.random() * alphabetLength);
                let currentScore = calculateNgramScore(caesarTransform(text, currentShift, false), currentNgramType);
                let bestShift = currentShift;
                let bestScore = currentScore;
                let iterations = 0;
                let noImprovement = 0;
                
                // Hill climbing med random restarts
                while (iterations < 1000 && noImprovement < 50) {
                    iterations++;
                    
                    // Test naboskift (+1 og -1)
                    const neighbors = [
                        (currentShift + 1) % alphabetLength,
                        (currentShift - 1 + alphabetLength) % alphabetLength
                    ];
                    
                    let improved = false;
                    for (let neighbor of neighbors) {
                        const decrypted = caesarTransform(text, neighbor, false);
                        const score = calculateNgramScore(decrypted, currentNgramType);
                        
                        if (score > currentScore) {
                            currentShift = neighbor;
                            currentScore = score;
                            improved = true;
                            
                            if (score > bestScore) {
                                bestScore = score;
                                bestShift = neighbor;
                                noImprovement = 0;
                            }
                        }
                    }
                    
                    if (!improved) {
                        noImprovement++;
                        // Random restart hvis vi er fast
                        if (noImprovement % 10 === 0) {
                            currentShift = Math.floor(Math.random() * alphabetLength);
                            currentScore = calculateNgramScore(caesarTransform(text, currentShift, false), currentNgramType);
                        }
                    }
                }
                
                const bestDecryption = caesarTransform(text, bestShift, false);
                
                document.getElementById('hillIterations').textContent = iterations;
                document.getElementById('hillBestScore').textContent = bestScore.toFixed(2);
                
                resultDiv.innerHTML = `
                    <div class="suggestion-card" onclick="document.getElementById('shiftValue').value=${bestShift}; document.getElementById('outputText').value=\`${bestDecryption.replace(/`/g, '\\`')}\`;">
                        <span class="confidence-badge confidence-high">Beste løsning</span>
                        <div class="shift-label">ROT-${bestShift} (Score: ${bestScore.toFixed(2)})</div>
                        <div class="result-text">${bestDecryption.substring(0, 300)}${bestDecryption.length > 300 ? '...' : ''}</div>
                    </div>
                `;
            }, 500);
        }

        /**
         * PATTERN RECOGNITION
         * Identifiserer gjentatte mønstre og strukturer i chifferteksten
         */
        function runPatternRecognition() {
            const text = document.getElementById('inputText').value;
            
            if (!text) {
                alert('⚠️ Vennligst skriv inn tekst!');
                return;
            }
            
            const resultDiv = document.getElementById('patternResults');
            resultDiv.innerHTML = '<div class="loading active">🎯 Søker etter mønstre...</div>';
            
            setTimeout(() => {
                const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '');
                const patterns = {};
                
                // Søk etter gjentatte sekvenser (3-8 tegn)
                for (let len = 3; len <= 8; len++) {
                    for (let i = 0; i <= clean.length - len; i++) {
                        const pattern = clean.substring(i, i + len);
                        const positions = [];
                        
                        for (let j = i + len; j <= clean.length - len; j++) {
                            if (clean.substring(j, j + len) === pattern) {
                                if (!patterns[pattern]) {
                                    positions.push(i);
                                }
                                positions.push(j);
                            }
                        }
                        
                        if (positions.length > 0) {
                            patterns[pattern] = positions;
                        }
                    }
                }
                
                // Sorter etter antall gjentakelser
                const sortedPatterns = Object.entries(patterns)
                    .sort((a, b) => b[1].length - a[1].length)
                    .slice(0, 10);
                
                if (sortedPatterns.length === 0) {
                    resultDiv.innerHTML = '<div class="info-box">Ingen signifikante gjentatte mønstre funnet.</div>';
                    return;
                }
                
                let html = '<div style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px;">';
                html += '<strong style="color: var(--primary-cyan);">🔍 Gjentatte mønstre:</strong><br><br>';
                
                for (let [pattern, positions] of sortedPatterns) {
                    const spacing = positions.length > 1 ? positions[1] - positions[0] : 0;
                    html += `<div style="margin-bottom: 10px; padding: 8px; background: rgba(0,255,255,0.05); border-left: 3px solid var(--accent-yellow); border-radius: 4px;">`;
                    html += `<strong style="color: var(--accent-yellow);">"${pattern}"</strong> `;
                    html += `<span style="color: var(--text-muted);">- ${positions.length} ganger`;
                    if (spacing > 0) html += ` (avstand: ${spacing})`;
                    html += `</span></div>`;
                }
                
                html += '</div>';
                html += '<div class="info-box" style="margin-top: 15px;">';
                html += '<strong>💡 Analyse:</strong><br>';
                html += '• Regelmessige avstander kan indikere nøkkellengde i polyalfabetiske chiffer<br>';
                html += '• Gjentatte mønstre kan være vanlige ord/fraser<br>';
                html += '• For Caesar-chiffer: mønstre bevares, bare forskjøvet';
                html += '</div>';
                
                resultDiv.innerHTML = html;
            }, 500);
        }

        /**
         * CRIBS - Kjente ord/fraser søk
         * Søker etter kjente ord ved alle mulige shifts
         */
        function searchCribs() {
            const text = document.getElementById('inputText').value;
            const cribInput = document.getElementById('cribInput').value;
            
            if (!text || !cribInput) {
                alert('⚠️ Skriv inn både tekst og cribs!');
                return;
            }
            
            const cribs = cribInput.split(',').map(c => c.trim().toUpperCase());
            const resultDiv = document.getElementById('cribResults');
            resultDiv.innerHTML = '<div class="loading active">🔑 Søker etter cribs...</div>';
            
            setTimeout(() => {
                const alphabetLength = currentAlphabet.length;
                const matches = [];
                
                for (let shift = 0; shift < alphabetLength; shift++) {
                    const decrypted = caesarTransform(text, shift, false).toUpperCase();
                    const foundCribs = [];
                    
                    for (let crib of cribs) {
                        if (decrypted.includes(crib)) {
                            foundCribs.push(crib);
                        }
                    }
                    
                    if (foundCribs.length > 0) {
                        matches.push({
                            shift: shift,
                            cribs: foundCribs,
                            text: caesarTransform(text, shift, false)
                        });
                    }
                }
                
                if (matches.length === 0) {
                    resultDiv.innerHTML = '<div class="info-box">❌ Ingen cribs funnet i noen shifts.</div>';
                    return;
                }
                
                let html = '<div style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px;">';
                html += `<strong style="color: var(--accent-green);">✅ Funnet ${matches.length} mulige matches:</strong><br><br>`;
                
                for (let match of matches) {
                    html += `<div class="suggestion-card" onclick="document.getElementById('shiftValue').value=${match.shift}; document.getElementById('outputText').value=\`${match.text.replace(/`/g, '\\`')}\`; updateFrequencyAnalysis(\`${match.text.replace(/`/g, '\\`')}\`);">`;
                    html += `<span class="confidence-badge confidence-high">${match.cribs.length} Crib(s)</span>`;
                    html += `<div class="shift-label">ROT-${match.shift} - Funnet: ${match.cribs.join(', ')}</div>`;
                    html += `<div class="result-text">${match.text.substring(0, 200)}${match.text.length > 200 ? '...' : ''}</div>`;
                    html += `</div>`;
                }
                
                html += '</div>';
                resultDiv.innerHTML = html;
            }, 500);
        }

        /**
         * POLYALPHABETIC DETECTION
         * Tester om chifferet er polyalfabetisk (Vigenère, etc.)
         */
        function runPolyalphabeticTest() {
            const text = document.getElementById('inputText').value;
            
            if (!text) {
                alert('⚠️ Vennligst skriv inn tekst!');
                return;
            }
            
            const resultDiv = document.getElementById('polyResults');
            resultDiv.innerHTML = '<div class="loading active">🔀 Analyserer for polyalfabetiske mønstre...</div>';
            
            setTimeout(() => {
                const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '');
                const ic = calculateIC(text);
                
                // Test forskjellige nøkkellengder (Kasiski-test)
                const possibleKeyLengths = [];
                const patterns = {};
                
                // Finn gjentatte trigrammer
                for (let i = 0; i <= clean.length - 3; i++) {
                    const trigram = clean.substring(i, i + 3);
                    if (!patterns[trigram]) patterns[trigram] = [];
                    patterns[trigram].push(i);
                }
                
                // Beregn avstander mellom gjentakelser
                const distances = [];
                for (let positions of Object.values(patterns)) {
                    if (positions.length > 1) {
                        for (let i = 0; i < positions.length - 1; i++) {
                            distances.push(positions[i + 1] - positions[i]);
                        }
                    }
                }
                
                // Finn GCD (Greatest Common Divisor) av avstander
                function gcd(a, b) {
                    return b === 0 ? a : gcd(b, a % b);
                }
                
                if (distances.length > 0) {
                    let commonDivisor = distances[0];
                    for (let d of distances) {
                        commonDivisor = gcd(commonDivisor, d);
                    }
                    
                    // Mulige nøkkellengder er faktorer av GCD
                    for (let i = 2; i <= Math.min(commonDivisor, 20); i++) {
                        if (commonDivisor % i === 0) {
                            possibleKeyLengths.push(i);
                        }
                    }
                }
                
                let html = '<div style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px;">';
                
                // Klassifiser chiffer-type basert på IC
                if (ic > 0.060) {
                    html += '<div style="color: var(--accent-green); font-weight: bold; margin-bottom: 10px;">✅ Sannsynlig MONOALFABETISK chiffer</div>';
                    html += `<div style="color: var(--text-muted);">IC = ${ic.toFixed(4)} (nær 0.067 for nordiske språk)</div>`;
                    html += '<div style="margin-top: 10px; color: var(--text-muted);">Dette er mest sannsynlig et Caesar-chiffer eller enkel substitusjonschiffer.</div>';
                } else if (ic > 0.045) {
                    html += '<div style="color: var(--accent-yellow); font-weight: bold; margin-bottom: 10px;">⚠️ Mulig POLYALFABETISK chiffer</div>';
                    html += `<div style="color: var(--text-muted);">IC = ${ic.toFixed(4)} (mellom mono- og polyalfabetisk)</div>`;
                } else {
                    html += '<div style="color: var(--accent-red); font-weight: bold; margin-bottom: 10px;">🔀 POLYALFABETISK chiffer detektert!</div>';
                    html += `<div style="color: var(--text-muted);">IC = ${ic.toFixed(4)} (typisk ${0.038} for Vigenère)</div>`;
                    
                    if (possibleKeyLengths.length > 0) {
                        html += '<div style="margin-top: 15px;"><strong style="color: var(--primary-cyan);">Mulige nøkkellengder (Kasiski):</strong><br>';
                        html += '<div style="margin-top: 10px;">';
                        for (let len of possibleKeyLengths.slice(0, 5)) {
                            html += `<span style="display: inline-block; margin: 5px; padding: 5px 15px; background: rgba(0,255,255,0.2); border: 1px solid var(--primary-cyan); border-radius: 15px;">${len}</span>`;
                        }
                        html += '</div></div>';
                    }
                }
                
                html += '</div>';
                html += '<div class="info-box" style="margin-top: 15px;">';
                html += '<strong>📚 Forklaring:</strong><br>';
                html += '• <strong>IC ≈ 0.067:</strong> Monoalfabetisk (Caesar, Substitusjon)<br>';
                html += '• <strong>IC ≈ 0.038:</strong> Polyalfabetisk (Vigenère, Playfair)<br>';
                html += '• <strong>Kasiski-test:</strong> Finner nøkkellengde ved å analysere gjentatte mønstre';
                html += '</div>';
                
                resultDiv.innerHTML = html;
            }, 500);
        }

        /**
         * Viser avansert analyse-panel
         */
        function showAdvancedAnalysis() {
            const panel = document.getElementById('advancedPanel');
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            
            if (panel.style.display === 'block') {
                // Generer n-gram tabell
                const text = document.getElementById('inputText').value;
                if (text) {
                    const n = getNgramLength(currentNgramType);
                    const topNgrams = getTopNgrams(text, n, 10);
                    
                    let html = '<table style="width: 100%; color: var(--text-muted);">';
                    html += `<tr style="border-bottom: 2px solid var(--primary-cyan);"><th>${n}-gram</th><th>Frekvens</th></tr>`;
                    
                    for (let {ngram, count} of topNgrams) {
                        html += `<tr style="border-bottom: 1px solid rgba(0,255,255,0.1);"><td style="padding: 8px; color: var(--primary-cyan);">${ngram}</td><td style="padding: 8px;">${count}</td></tr>`;
                    }
                    
                    html += '</table>';
                    document.getElementById('ngramTable').innerHTML = html;
                }
                
                panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        /**
         * Anvender et forslag fra auto-solve
         */
        function applySuggestion(candidate) {
            document.getElementById('shiftValue').value = candidate.shift;
            document.getElementById('outputText').value = candidate.text;
            updateFrequencyAnalysis(candidate.text);
        }

        /**
         * Brute Force: Viser alle mulige dekrypteringer
         */
        function bruteForce() {
            const text = document.getElementById('inputText').value;
            
            if (!text) {
                alert('⚠️ Vennligst skriv inn tekst!');
                return;
            }
            
            const panel = document.getElementById('bruteForcePanel');
            const loading = document.getElementById('bruteForceLoading');
            const results = document.getElementById('bruteForceResults');
            
            panel.style.display = 'block';
            loading.classList.add('active');
            results.innerHTML = '';
            
            setTimeout(() => {
                const alphabetLength = currentAlphabet.length;
                
                for (let shift = 0; shift < alphabetLength; shift++) {
                    const decrypted = caesarTransform(text, shift, false);
                    const wordCount = countNorwegianWords(decrypted);
                    
                    const card = document.createElement('div');
                    card.className = 'result-card';
                    card.onclick = () => {
                        document.getElementById('shiftValue').value = shift;
                        document.getElementById('outputText').value = decrypted;
                        updateFrequencyAnalysis(decrypted);
                    };
                    card.innerHTML = `
                        <div class="shift-label">ROT-${shift} ${wordCount > 0 ? `(${wordCount} ord)` : ''}</div>
                        <div class="result-text">${decrypted}</div>
                    `;
                    results.appendChild(card);
                }
                
                loading.classList.remove('active');
                panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 500);
        }

        /**
         * Oppdaterer frekvensanalyse-grafen med alle nye metrikker
         */
        function updateFrequencyAnalysis(text) {
            const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '');
            const freq = {};
            
            // Tell bokstavfrekvenser
            for (let char of clean) {
                freq[char] = (freq[char] || 0) + 1;
            }
            
            // Normaliser til prosent
            const total = clean.length;
            for (let char in freq) {
                freq[char] = (freq[char] / total) * 100;
            }
            
            // Oppdater graf
            const chart = document.getElementById('frequencyChart');
            chart.innerHTML = '';
            
            const maxFreq = Math.max(...Object.values(freq), 5);
            
            for (let char of currentAlphabet) {
                const percentage = freq[char] || 0;
                const height = (percentage / maxFreq) * 100;
                
                const container = document.createElement('div');
                container.className = 'bar-container';
                
                const bar = document.createElement('div');
                bar.className = 'bar';
                bar.style.height = height + '%';
                bar.title = `${char}: ${percentage.toFixed(2)}%`;
                
                const label = document.createElement('div');
                label.className = 'bar-label';
                label.textContent = char;
                
                container.appendChild(bar);
                container.appendChild(label);
                chart.appendChild(container);
            }
            
            // Beregn alle metrikker
            const icData = calculateSlidingWindowIC(text);
            const chiSquare = calculateChiSquare(text, FREQUENCY_TABLES.norwegian);
            const entropy = calculateEntropy(text);
            const ngramScore = calculateNgramScore(text, currentNgramType);
            const languageVariant = detectLanguageVariant(text);
            const norwegianChars = checkNorwegianChars(text);
            
            // Finn topp n-gram
            const n = getNgramLength(currentNgramType);
            const topNgrams = getTopNgrams(text, n, 1);
            const topNgram = topNgrams.length > 0 ? `${topNgrams[0].ngram} (${topNgrams[0].count})` : '-';
            
            // Oppdater IC med konfidensintervall
            document.getElementById('icValue').textContent = icData.mean.toFixed(4);
            document.getElementById('icConfidence').textContent = interpretICConfidence(icData);
            
            // Oppdater Chi-Square med kvalitetsvurdering
            document.getElementById('chiSquare').textContent = chiSquare.toFixed(2);
            let chiQuality = '';
            if (chiSquare < 30) chiQuality = '✅ Utmerket match';
            else if (chiSquare < 50) chiQuality = '✓ God match';
            else if (chiSquare < 100) chiQuality = '○ Moderat match';
            else chiQuality = '✗ Dårlig match';
            document.getElementById('chiSquareQuality').textContent = chiQuality;
            
            // Oppdater Entropy
            document.getElementById('entropyValue').textContent = entropy.toFixed(3);
            let entropyInterpret = '';
            if (entropy < 3.5) entropyInterpret = 'Høy struktur';
            else if (entropy < 4.0) entropyInterpret = 'Moderat struktur';
            else if (entropy < 4.5) entropyInterpret = 'Lav struktur';
            else entropyInterpret = 'Tilfeldig';
            document.getElementById('entropyInterpret').textContent = entropyInterpret;
            
            // Oppdater topp n-gram
            document.getElementById('topNgram').textContent = topNgram;
            document.getElementById('ngramScore').textContent = ngramScore.toFixed(2);
            
            // Detekter språk og variant
            let detectedLang = '-';
            let langVariantText = '';
            
            if (icData.mean > 0.060 && icData.mean < 0.075) {
                if (chiSquare < 50) {
                    detectedLang = 'Norsk';
                    if (languageVariant === 'bokmal') langVariantText = 'Bokmål';
                    else if (languageVariant === 'nynorsk') langVariantText = 'Nynorsk';
                    else langVariantText = 'Ubestemt variant';
                    
                    // Sjekk for ÆØÅ
                    if (!norwegianChars.hasAeOeAa) {
                        langVariantText += ' (⚠️ Mangler ÆØÅ)';
                    }
                } else {
                    detectedLang = 'Ukjent';
                    langVariantText = 'Lav språkscore';
                }
            } else if (icData.mean < 0.045) {
                detectedLang = 'Polyalfabetisk?';
                langVariantText = 'Ikke Caesar';
            } else {
                detectedLang = 'Ukjent';
                langVariantText = `IC ${icData.mean > 0.075 ? 'for høy' : 'for lav'}`;
            }
            
            document.getElementById('detectedLang').textContent = detectedLang;
            document.getElementById('langVariant').textContent = langVariantText;
        }

        /**
         * Historiske modus-snarveier
         */
        function applyROT13() {
            document.getElementById('alphabetType').value = 'latin';
            updateAlphabet();
            document.getElementById('shiftValue').value = 13;
            if (document.getElementById('inputText').value) {
                decrypt();
            }
        }

        function applyROT5() {
            // ROT5 for tall (0-9)
            const text = document.getElementById('inputText').value;
            let result = '';
            
            for (let char of text) {
                if (char >= '0' && char <= '9') {
                    const num = parseInt(char);
                    result += ((num + 5) % 10).toString();
                } else {
                    result += char;
                }
            }
            
            document.getElementById('outputText').value = result;
        }

        function applyROT47() {
            // ROT47 for ASCII 33-126
            const text = document.getElementById('inputText').value;
            let result = '';
            
            for (let char of text) {
                const code = char.charCodeAt(0);
                if (code >= 33 && code <= 126) {
                    result += String.fromCharCode(33 + ((code - 33 + 47) % 94));
                } else {
                    result += char;
                }
            }
            
            document.getElementById('outputText').value = result;
        }

        /**
         * Fil-håndtering
         */
        function handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('inputText').value = e.target.result;
                    updateFrequencyAnalysis(e.target.result);
                };
                reader.readAsText(file);
            }
        }

        // Drag & drop funksjonalitet
        const dropZone = document.getElementById('dropZone');
        
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
            if (file && file.type === 'text/plain') {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('inputText').value = e.target.result;
                    updateFrequencyAnalysis(e.target.result);
                };
                reader.readAsText(file);
            }
        });

        /**
         * Kopierer resultatet til clipboard
         */
        function copyToClipboard() {
            const output = document.getElementById('outputText');
            output.select();
            document.execCommand('copy');
            alert('✅ Kopiert til clipboard!');
        }

        /**
         * Eksporterer resultatet til .txt-fil
         */
        function exportResult() {
            const text = document.getElementById('outputText').value;
            if (!text) {
                alert('⚠️ Ingen resultat å eksportere!');
                return;
            }
            
            const blob = new Blob([text], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `caesar_result_${Date.now()}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        }

        /**
         * Toggle dark mode
         */
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
        }

        // Substitution cipher mapping
        let substitutionMapping = {};

        /**
         * AUTOMATISK SUBSTITUSJONSLØSER
         * Bruker frekvensanalyse og n-gram matching for å løse substitusjonscryptogrammer
         */
        function autoSolveSubstitution() {
            const text = document.getElementById('inputText').value;
            
            if (!text) {
                alert('⚠️ Vennligst skriv inn kryptert tekst!');
                return;
            }

            const resultDiv = document.getElementById('substitutionResult');
            resultDiv.innerHTML = '<div class="loading active">🤖 Løser substitusjonscryptogram med Hill Climbing og frekvensanalyse...</div>';

            setTimeout(() => {
                // Analyser frekvenser i chifferteksten
                const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '');
                const cipherFreq = {};
                
                for (let char of clean) {
                    cipherFreq[char] = (cipherFreq[char] || 0) + 1;
                }
                
                // Sorter etter frekvens
                const sortedCipher = Object.entries(cipherFreq)
                    .sort((a, b) => b[1] - a[1])
                    .map(([char]) => char);
                
                // Norsk frekvensrekkefølge
                const norwegianOrder = ['E', 'R', 'N', 'T', 'A', 'I', 'S', 'L', 'O', 'D', 
                                       'G', 'K', 'M', 'V', 'F', 'U', 'P', 'H', 'B', 'Æ',
                                       'Ø', 'Y', 'Å', 'J', 'C', 'W', 'Z', 'Q', 'X'];
                
                // Lag initial mapping basert på frekvens
                let currentMapping = {};
                for (let i = 0; i < sortedCipher.length; i++) {
                    currentMapping[sortedCipher[i]] = norwegianOrder[i] || 'X';
                }
                
                // Hill Climbing for å forbedre mapping
                let bestMapping = { ...currentMapping };
                let bestScore = scoreSubstitutionMapping(text, currentMapping);
                let noImprovement = 0;
                const maxIterations = 5000;
                
                for (let iter = 0; iter < maxIterations && noImprovement < 500; iter++) {
                    // Prøv å bytte to tilfeldige bokstaver i mappingen
                    const keys = Object.keys(currentMapping);
                    const i = Math.floor(Math.random() * keys.length);
                    const j = Math.floor(Math.random() * keys.length);
                    
                    if (i !== j) {
                        // Swap
                        const temp = currentMapping[keys[i]];
                        currentMapping[keys[i]] = currentMapping[keys[j]];
                        currentMapping[keys[j]] = temp;
                        
                        const newScore = scoreSubstitutionMapping(text, currentMapping);
                        
                        if (newScore > bestScore) {
                            bestMapping = { ...currentMapping };
                            bestScore = newScore;
                            noImprovement = 0;
                        } else {
                            // Revert swap
                            const temp = currentMapping[keys[i]];
                            currentMapping[keys[i]] = currentMapping[keys[j]];
                            currentMapping[keys[j]] = temp;
                            noImprovement++;
                        }
                    }
                }
                
                // Anvend beste mapping
                substitutionMapping = bestMapping;
                const decrypted = applySubstitutionMapping(text, bestMapping);
                
                // Vis resultat
                let html = '<div class="suggestion-card">';
                html += `<span class="confidence-badge confidence-high">Score: ${bestScore.toFixed(2)}</span>`;
                html += '<div class="shift-label">Automatisk løsning med frekvensbasert Hill Climbing</div>';
                html += `<div class="result-text" style="font-size: 1.1em; padding: 15px; background: rgba(0,255,255,0.05); border-radius: 8px; margin-top: 10px;">${decrypted}</div>`;
                html += '</div>';
                
                html += '<div style="margin-top: 20px;"><strong style="color: var(--primary-cyan);">📋 Mappingtabell:</strong><br>';
                html += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 5px; margin-top: 10px;">';
                
                for (let [cipher, plain] of Object.entries(bestMapping).sort()) {
                    html += `<div style="background: rgba(0,255,255,0.1); padding: 8px; border-radius: 5px; text-align: center;">`;
                    html += `<div style="color: var(--accent-red); font-weight: bold;">${cipher}</div>`;
                    html += `<div style="color: var(--text-muted);">↓</div>`;
                    html += `<div style="color: var(--accent-green); font-weight: bold;">${plain}</div>`;
                    html += `</div>`;
                }
                
                html += '</div></div>';
                
                html += '<div class="info-box" style="margin-top: 20px;">';
                html += '<strong>💡 Tips:</strong> Hvis resultatet ikke gir mening:<br>';
                html += '• Prøv å kjøre Auto-Løs flere ganger (stokastisk algoritme)<br>';
                html += '• Bruk manuell mapping for å justere enkelte bokstaver<br>';
                html += '• Kombiner med cribs (kjente ord) for bedre resultat<br>';
                html += '• Sjekk om det faktisk er et substitusjonscryptogram og ikke Caesar';
                html += '</div>';
                
                resultDiv.innerHTML = html;
                
                // Oppdater output-feltet
                document.getElementById('outputText').value = decrypted;
                
                // Oppdater frekvenssammenligninger
                updateFrequencyComparison(text);
            }, 500);
        }

        /**
         * Scorer en substitusjonsmapping basert på n-gram fitness
         * @param {string} text - Original kryptert tekst
         * @param {Object} mapping - Bokstavmapping (cipher -> plain)
         * @returns {number} - Fitness score
         */
        function scoreSubstitutionMapping(text, mapping) {
            const decrypted = applySubstitutionMapping(text, mapping);
            
            // Bruk n-gram scoring
            const ngramScore = calculateNgramScore(decrypted, currentNgramType);
            
            // Tell norske ord som bonus
            const wordCount = countNorwegianWords(decrypted);
            
            return ngramScore + (wordCount * 0.5);
        }

        /**
         * Anvender en substitusjonsmapping på tekst
         * @param {string} text - Original tekst
         * @param {Object} mapping - Bokstavmapping
         * @returns {string} - Transformert tekst
         */
        function applySubstitutionMapping(text, mapping) {
            let result = '';
            
            for (let char of text) {
                const upper = char.toUpperCase();
                if (mapping[upper]) {
                    result += char === char.toLowerCase() ? 
                             mapping[upper].toLowerCase() : 
                             mapping[upper];
                } else {
                    result += char;
                }
            }
            
            return result;
        }

        /**
         * Viser mappingtabell for manuell redigering
         */
        function showSubstitutionMapping() {
            const panel = document.getElementById('substitutionMappingPanel');
            const table = document.getElementById('mappingTable');
            
            if (panel.style.display === 'none') {
                panel.style.display = 'block';
                
                // Generer interaktiv tabell
                const alphabet = currentAlphabet;
                table.innerHTML = '';
                
                for (let cipherChar of alphabet) {
                    const cell = document.createElement('div');
                    cell.style.cssText = 'background: rgba(0,255,255,0.1); padding: 10px; border-radius: 5px; text-align: center; cursor: pointer; transition: all 0.3s;';
                    cell.onmouseover = () => cell.style.background = 'rgba(0,255,255,0.2)';
                    cell.onmouseout = () => cell.style.background = 'rgba(0,255,255,0.1)';
                    
                    const plainChar = substitutionMapping[cipherChar] || '?';
                    
                    cell.innerHTML = `
                        <div style="color: var(--accent-red); font-weight: bold; font-size: 1.2em;">${cipherChar}</div>
                        <div style="color: var(--text-muted); margin: 5px 0;">↓</div>
                        <select id="map_${cipherChar}" style="background: rgba(0,0,0,0.5); color: var(--accent-green); border: 1px solid var(--primary-cyan); padding: 5px; border-radius: 3px; font-weight: bold;">
                            ${[...alphabet].map(char => `<option value="${char}" ${char === plainChar ? 'selected' : ''}>${char}</option>`).join('')}
                        </select>
                    `;
                    
                    table.appendChild(cell);
                }
                
                panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                panel.style.display = 'none';
            }
        }

        /**
         * Anvender manuell mapping
         */
        function applyManualMapping() {
            const alphabet = currentAlphabet;
            
            for (let cipherChar of alphabet) {
                const select = document.getElementById(`map_${cipherChar}`);
                if (select) {
                    substitutionMapping[cipherChar] = select.value;
                }
            }
            
            const text = document.getElementById('inputText').value;
            const decrypted = applySubstitutionMapping(text, substitutionMapping);
            document.getElementById('outputText').value = decrypted;
            
            alert('✅ Mapping anvendt! Sjekk output-feltet.');
        }

        /**
         * Resetter substitusjonsmapping
         */
        function resetSubstitutionMapping() {
            substitutionMapping = {};
            document.getElementById('substitutionMappingPanel').style.display = 'none';
            document.getElementById('substitutionResult').innerHTML = '';
            alert('🔄 Mapping tilbakestilt!');
        }

        /**
         * Oppdaterer frekvenssammenligning mellom cipher og norsk
         */
        function updateFrequencyComparison(text) {
            const clean = text.toUpperCase().replace(/[^A-ZÆØÅ]/g, '');
            const cipherFreq = {};
            
            // Tell frekvenser i chiffertekst
            for (let char of clean) {
                cipherFreq[char] = (cipherFreq[char] || 0) + 1;
            }
            
            const total = clean.length;
            for (let char in cipherFreq) {
                cipherFreq[char] = (cipherFreq[char] / total) * 100;
            }
            
            // Vis cipher frekvenser
            let cipherHtml = '<div style="display: flex; align-items: flex-end; height: 150px; gap: 2px;">';
            const sortedCipher = Object.entries(cipherFreq).sort((a, b) => b[1] - a[1]).slice(0, 15);
            const maxCipherFreq = Math.max(...sortedCipher.map(([, f]) => f));
            
            for (let [char, freq] of sortedCipher) {
                const height = (freq / maxCipherFreq) * 100;
                cipherHtml += `
                    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px;">
                        <div style="width: 100%; background: linear-gradient(to top, var(--accent-red), rgba(255,107,107,0.3)); height: ${height}%; border-radius: 3px;" title="${char}: ${freq.toFixed(2)}%"></div>
                        <div style="color: var(--text-muted); font-size: 0.8em;">${char}<br>${freq.toFixed(1)}%</div>
                    </div>
                `;
            }
            cipherHtml += '</div>';
            
            // Vis norsk frekvenser
            let norwegianHtml = '<div style="display: flex; align-items: flex-end; height: 150px; gap: 2px;">';
            const norwegianFreqSorted = Object.entries(FREQUENCY_TABLES.norwegian).sort((a, b) => b[1] - a[1]).slice(0, 15);
            const maxNorwegianFreq = Math.max(...norwegianFreqSorted.map(([, f]) => f));
            
            for (let [char, freq] of norwegianFreqSorted) {
                const height = (freq / maxNorwegianFreq) * 100;
                norwegianHtml += `
                    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px;">
                        <div style="width: 100%; background: linear-gradient(to top, var(--accent-green), rgba(81,207,102,0.3)); height: ${height}%; border-radius: 3px;" title="${char}: ${freq.toFixed(2)}%"></div>
                        <div style="color: var(--text-muted); font-size: 0.8em;">${char}<br>${freq.toFixed(1)}%</div>
                    </div>
                `;
            }
            norwegianHtml += '</div>';
            
            document.getElementById('cipherFreqChart').innerHTML = cipherHtml;
            document.getElementById('norwegianFreqChart').innerHTML = norwegianHtml;
        }

        // Initialiser med frekvensanalyse ved lasting
        window.addEventListener('load', () => {
            updateAlphabet();
        });

        // Oppdater frekvensanalyse når tekst endres
        document.getElementById('inputText').addEventListener('input', function() {
            if (this.value) {
                updateFrequencyAnalysis(this.value);
                updateFrequencyComparison(this.value);
            }
        });
