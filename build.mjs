import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const template = readFileSync('template.html', 'utf8');

function render(lang) {
  const strings = JSON.parse(readFileSync(`lang/${lang}.json`, 'utf8'));
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (!(key in strings)) throw new Error(`Missing key "${key}" in lang/${lang}.json`);
    return strings[key];
  });
}

mkdirSync('en', { recursive: true });
writeFileSync('index.html', render('de'));
writeFileSync('en/index.html', render('en'));
console.log('Built index.html (DE) and en/index.html (EN)');
