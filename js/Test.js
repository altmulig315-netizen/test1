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

// Det er mange måter å gjøre ting på

const track = document.querySelector(".card-track");
if (track) {
    track.innerHTML += track.innerHTML;
}

// alt cyber relatert

// ⚠️ Pass på at HTML har:
// <input id="cipherText">, <input id="key">, <div id="result"></div>, <span id="keyValue"></span>
const textInput = document.getElementById("cipherText");
const keyInput = document.getElementById("key");
const resultBox = document.getElementById("result");
const keyLabel = document.getElementById("keyValue");

// ▲ NY FUNKSJON: Krypterer tekst (flytter bokstaver fremover)
function encodeCaesar(text, key) {
    let output = "";

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];

        // hvis ikke bokstav, behold som det er 
        if (!/[a-zA-Z]/.test(ch)) {
            output += ch;
            continue;
        }

        const isUpper = ch === ch.toUpperCase();
        const base = isUpper ? "A".charCodeAt(0) : "a".charCodeAt(0);

        const charCode = ch.charCodeAt(0) - base;
        const encodedCode = (charCode + key) % 26; // ▲ ENDRET: + i stedet for -
        const encodedChar = String.fromCharCode(encodedCode + base);

        output += encodedChar;
    }

    return output;
}

// funksjonen som dekoder Caesar-tekst
function decodeCaesar(text, key) {
    let output = "";

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];

        // hvis ikke bokstav, behold som det er 
        if (!/[a-zA-Z]/.test(ch)) {
            output += ch;
            continue;
        }

        const isUpper = ch === ch.toUpperCase();
        const base = isUpper ? "A".charCodeAt(0) : "a".charCodeAt(0);

        const charCode = ch.charCodeAt(0) - base; // gjør A->0, B->1, osv.
        const decodedCode = (charCode - key + 26) % 26;
        const decodedChar = String.fromCharCode(decodedCode + base);

        output += decodedChar;
    }

    return output;
}

// funksjonen som oppdaterer live    
function updateOutput() {
    if (!textInput || !keyInput || !resultBox || !keyLabel) {
        // Hvis noe mangler i DOM, ikke gjør noe
        return;
    }

    const text = textInput.value;
    const key = Number(keyInput.value);

    keyLabel.textContent = key;

    const encoded = encodeCaesar(text, key); // ▲ ENDRET: Bruker encode i stedet for decode
    resultBox.textContent = encoded; // viktig: textContent, ikke innerHTML
}

// Koble input + slider til updateOutput (LIVE)
if (textInput) {
    textInput.addEventListener("input", updateOutput);
}
if (keyInput) {
    keyInput.addEventListener("input", updateOutput);
}

// Kjør én gang ved start
updateOutput();