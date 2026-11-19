import { readFileSync, writeFileSync } from 'node:fs';

let h = readFileSync('Ecolink_India_Website_Copy_Deck.docx.html', 'utf8');
h = h.replace(/<style[\s\S]*?<\/style>/g, '').replace(/<script[\s\S]*?<\/script>/g, '');
h = h.replace(/<\/(p|div|h1|h2|h3|li|tr)>/g, '\n').replace(/<br\s*\/?>/g, '\n');
h = h.replace(/<[^>]+>/g, '');
h = h
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&#39;/g, "'")
  .replace(/&quot;/g, '"');
h = h
  .split('\n')
  .map((l) => l.trim())
  .filter(Boolean)
  .join('\n');
writeFileSync('copydeck.txt', h);
console.log('chars:', h.length);
