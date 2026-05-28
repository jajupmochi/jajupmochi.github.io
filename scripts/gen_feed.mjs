#!/usr/bin/env node
/* gen_feed.mjs — regenerate feed.xml (RSS 2.0) from blog-posts/registry.json.
 * No build step on the site; run this manually whenever a post is added:
 *   node scripts/gen_feed.mjs
 * The feed uses each post's primary language (falling back to en) for title/excerpt.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const SITE = 'https://jajupmochi.github.io';
const reg = JSON.parse(readFileSync('blog-posts/registry.json', 'utf8'));

const pick = (obj, langs) => {
  if (!obj) return '';
  for (const l of langs) if (obj[l]) return obj[l];
  return Object.values(obj)[0] || '';
};
const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const posts = [...(reg.posts || [])].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

const items = posts.map(p => {
  const primary = p.primaryLang || (p.langs && p.langs[0]) || 'en';
  const langs = [primary, 'en', ...(p.langs || [])];
  const title = pick(p.title, langs);
  const excerpt = pick(p.excerpt, langs);
  const url = `${SITE}/blog.html?post=${p.slug}&lang=${primary}`;
  const date = p.date ? new Date(p.date + 'T00:00:00Z').toUTCString() : new Date().toUTCString();
  const cats = (p.tags || []).map(t => `      <category>${esc(t)}</category>`).join('\n');
  return `    <item>
      <title>${esc(title)}</title>
      <link>${esc(url)}</link>
      <guid isPermaLink="true">${esc(url)}</guid>
      <pubDate>${date}</pubDate>
      <description>${esc(excerpt)}</description>
${cats}
    </item>`;
}).join('\n');

const now = new Date().toUTCString();
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/feed.xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Linlin Jia — Blog</title>
    <link>${SITE}/blog.html</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Notes on ML, tooling, and building things — written human × AI, in four languages.</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>
`;

writeFileSync('feed.xml', xml);
console.log(`feed.xml written with ${posts.length} item(s).`);
