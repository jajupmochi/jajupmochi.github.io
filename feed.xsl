<?xml version="1.0" encoding="UTF-8"?>
<!-- Renders feed.xml as a friendly human page in the browser. RSS readers still
     consume the raw RSS underneath; humans who click the link see this instead
     of bare XML. -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="UTF-8" indent="yes"
  doctype-system="about:legacy-compat"/>
<xsl:template match="/">
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title><xsl:value-of select="/rss/channel/title"/> — RSS feed</title>
  <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&amp;family=Spectral:wght@400;600&amp;display=swap" rel="stylesheet"/>
  <style>
    :root{ --ink:#352a20; --soft:#6b5b48; --maroon:#9a2b1e; --rule:rgba(120,80,40,.28); }
    *{box-sizing:border-box}
    body{ margin:0; color:var(--ink); background:#f3ead6;
      background-image:radial-gradient(120% 80% at 50% 0,#fbf5e6,transparent 70%);
      font-family:'Spectral',Georgia,serif; line-height:1.6; }
    .wrap{ max-width:680px; margin:0 auto; padding:3em 1.4em 4em; }
    .kicker{ font-family:'Patrick Hand',cursive; color:var(--maroon); letter-spacing:.12em; text-transform:uppercase; font-size:.85em; margin:0 0 .2em; }
    h1{ font-family:'Patrick Hand',cursive; font-size:2.1em; margin:0 0 .15em; color:var(--ink); }
    .desc{ color:var(--soft); margin:.2em 0 1.4em; }
    .how{ background:rgba(154,43,30,.06); border:1.3px solid var(--rule); border-radius:9px 6px 10px 6px;
      padding:1em 1.2em; margin:0 0 2em; font-size:.96em; }
    .how strong{ color:var(--maroon); }
    .how code{ font-family:ui-monospace,Menlo,monospace; font-size:.9em; background:rgba(120,80,40,.1); padding:.1em .4em; border-radius:4px; }
    h2{ font-family:'Patrick Hand',cursive; color:var(--maroon); font-size:1.4em; margin:1.5em 0 .6em; }
    ul{ list-style:none; padding:0; margin:0; }
    li{ padding:1em 0; border-bottom:1px dashed var(--rule); }
    li a{ font-family:'Patrick Hand',cursive; font-size:1.3em; color:var(--maroon); text-decoration:none; }
    li a:hover{ text-decoration:underline; }
    .meta{ font-family:ui-monospace,Menlo,monospace; font-size:.78em; color:var(--soft); margin:.2em 0; }
    li p{ margin:.3em 0 0; color:var(--soft); font-size:.95em; }
    .back{ margin-top:2.4em; }
    .back a{ color:var(--maroon); font-family:'Patrick Hand',cursive; font-size:1.15em; text-decoration:none; }
  </style>
</head>
<body>
  <div class="wrap">
    <p class="kicker">RSS feed</p>
    <h1><xsl:value-of select="/rss/channel/title"/></h1>
    <p class="desc"><xsl:value-of select="/rss/channel/description"/></p>
    <div class="how">
      <strong>This is an RSS feed.</strong> It is not meant to be read here directly — copy
      this page's address from the URL bar and paste it into an <strong>RSS reader</strong>
      (Feedly, NetNewsWire, Inoreader, Thunderbird, or your browser's reading-list extension)
      to get new posts automatically, with no account and no tracking.
    </div>
    <h2>Latest posts</h2>
    <ul>
      <xsl:for-each select="/rss/channel/item">
        <li>
          <a href="{link}"><xsl:value-of select="title"/></a>
          <div class="meta"><xsl:value-of select="pubDate"/></div>
          <p><xsl:value-of select="description"/></p>
        </li>
      </xsl:for-each>
    </ul>
    <p class="back"><a href="/blog.html">← Back to the blog</a></p>
  </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
