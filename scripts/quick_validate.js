const fs = require('fs');
const path = require('path');

function checkCSS(file) {
  const s = fs.readFileSync(file, 'utf8');
  const open = (s.match(/\{/g) || []).length;
  const close = (s.match(/\}/g) || []).length;
  const startC = (s.match(/\/\*/g) || []).length;
  const endC = (s.match(/\*\//g) || []).length;
  return { file, open, close, startC, endC };
}

function checkJS(file) {
  const s = fs.readFileSync(file, 'utf8');
  try {
    // Use Function constructor to validate syntax (will throw on syntax errors)
    new Function(s);
    return { file, ok: true };
  } catch (e) {
    return { file, ok: false, error: e && e.message ? e.message : String(e) };
  }
}

const results = [];
const cssFile = path.join(__dirname, '..', 'Test.css');
const jsFile = path.join(__dirname, '..', 'js', 'Test.js');

results.push(checkCSS(cssFile));
results.push(checkJS(jsFile));

console.log(JSON.stringify(results, null, 2));
