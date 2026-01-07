#!/usr/bin/env node
/*
  Simple CSS fixer: converts rgb(...) / rgba(...) -> #RRGGBB / #RRGGBBAA
  - Handles only numeric forms like rgb(255, 0, 0) and rgba(255,0,0,0.5)
  - Does not handle percentages or space-separated modern syntax
*/

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const TARGET_DIR = ROOT;

function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

function toHex2(n) {
  return clamp(n, 0, 255).toString(16).padStart(2, '0').toUpperCase();
}

function alphaToHex(a) {
  const v = Math.round(clamp(a, 0, 1) * 255);
  return toHex2(v);
}

function convertInCss(css) {
  const re = /(rgba?)\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*([0-9]*\.?[0-9]+))?\s*\)/gi;
  return css.replace(re, (_, fn, r, g, b, a) => {
    const R = parseInt(r, 10);
    const G = parseInt(g, 10);
    const B = parseInt(b, 10);
    const base = `#${toHex2(R)}${toHex2(G)}${toHex2(B)}`;
    if (fn.toLowerCase() === 'rgba') {
      const A = a == null ? 1 : parseFloat(a);
      return base + alphaToHex(A);
    }
    return base;
  });
}

function* walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name.startsWith('.git')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.isFile() && p.toLowerCase().endsWith('.css')) yield p;
  }
}

let changed = 0;
for (const file of walk(TARGET_DIR)) {
  const before = fs.readFileSync(file, 'utf8');
  const after = convertInCss(before);
  if (after !== before) {
    fs.writeFileSync(file, after, 'utf8');
    console.log(`Converted: ${path.relative(ROOT, file)}`);
    changed++;
  }
}

if (changed === 0) {
  console.log('No rgb()/rgba() usages found to convert.');
}
