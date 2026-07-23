"""
YCOTW reusable cluster page builder.
Separates CONTENT (body HTML + FAQ text files) from TEMPLATE (shared style,
nav, footer, capture, chat, FAQ accordion).

Usage pattern:
  exec(open('cluster_builder.py').read())   # loads page(), hub_page(), parse_faqs(), make_nav(), wc(), STYLE
  html = page(cluster_key, cluster_label, hub_file, ptype, title, desc, kw_meta,
              crumb, h1, standfirst, toc_items, body, faqs, related, foot_links)
  open('my-page.html','w').write(html)

FAQ text file format:  Question||Answer   (blocks separated by a line containing @@)

NOTE: STYLE below is extracted from the gold-standard cost pillar
(how-much-does-a-yacht-cost.html). To regenerate it exactly, copy the <style>...</style>
block from that file. It is reproduced here so the builder is self-contained.
Paste the article-page <style> block from how-much-does-a-yacht-cost.html into STYLE.
"""
import re

# --- STYLE: paste the <style>...</style> block from how-much-does-a-yacht-cost.html here ---
# (Kept external so this file stays readable. Load it from the pillar at runtime:)
def load_style(pillar_path='../site/how-much-does-a-yacht-cost.html'):
    src = open(pillar_path).read()
    return re.search(r'<style>.*?</style>', src, re.DOTALL).group(0)

# If running alongside the site pages, call load_style() to populate STYLE.
STYLE = ''  # set via: STYLE = load_style('path/to/how-much-does-a-yacht-cost.html')

def parse_faqs(raw):
    out = []
    for block in raw.strip().split('\n@@\n'):
        if '||' in block:
            q, a = block.split('||', 1)
            out.append((q.strip(), a.strip()))
    return out

def make_nav(active):
    items = [('buy-hub.html','Buy','buy'),('charter-hub.html','Charter','charter'),
             ('sell-hub.html','Sell','sell'),('learn-hub.html','Learn','learn'),
             ('maintain-hub.html','Maintain','maintain'),('connect-hub.html','Connect','connect')]
    links = ''
    for href,label,key in items:
        cls = ' class="active"' if key==active else ''
        links += '<a href="%s"%s>%s</a>' % (href,cls,label)
    return ('<nav><div class="nav-in"><a href="../Final Home Page 6.19.26.html" class="mark">'
            'Y<b>C</b>OTW</a><div class="nav-links">%s</div></div></nav>') % links

def page(cluster_key, cluster_label, hub_file, ptype, title, desc, kw_meta, crumb, h1,
         standfirst, toc_items, body, faqs, related, foot_links):
    nav = make_nav(cluster_key)
    toc = '\n'.join('<li><a href="#%s">%s</a></li>' % (i,t) for i,t in toc_items)
    faq_html = '\n'.join('<div class="faq-item"><button class="faq-q">%s</button>'
                         '<div class="faq-a">%s</div></div>' % (q,a) for q,a in faqs)
    tagline = '%s &middot; %s' % (cluster_label, ptype)
    head = ('<header class="art-head"><div class="wrap art-head-in"><div class="crumb">'
            '<a href="../Final Home Page 6.19.26.html">Home</a> &nbsp;/&nbsp; '
            '<a href="%s">%s</a> &nbsp;/&nbsp; %s</div><span class="art-tag">%s</span>'
            '<h1>%s</h1><p class="standfirst">%s</p><div class="art-meta">'
            '<span>Updated June 2026</span><span>&middot;</span><span>11 min read</span>'
            '<span>&middot;</span><span>Yachting Capital of the World</span></div></div></header>'
            ) % (hub_file, cluster_label, crumb, tagline, h1, standfirst)
    tocbox = ('<div class="wrap"><nav class="toc"><h4>What this guide covers</h4>'
              '<ol>%s</ol></nav></div>') % toc
    ask = ('<section class="ask"><div class="ask-in"><h2>Have a question?</h2>'
           '<p>Ask anything and get a real answer instantly.</p><div class="ask-box">'
           '<input id="askInput" placeholder="Ask your question..."><button onclick="askGo()">Ask</button>'
           '</div><p class="ask-note">Instant answers, powered by AI. No email required to ask.</p></div></section>')
    rel = '<section class="related"><div class="wide"><h2>Keep Exploring</h2><div class="rel-grid">%s</div></div></section>' % related
    foot = ('<footer><div class="wide"><div class="foot-top"><div><div class="foot-mark">Y<b>C</b>OTW</div>'
            '<p style="margin-top:12px;max-width:260px;font-size:.9rem">Yachting Capital of the World&trade;'
            '<br>Fort Lauderdale, Florida</p></div><div class="foot-col"><h5>%s</h5>%s</div>'
            '<div class="foot-col"><h5>YCOTW</h5><a href="../Final Home Page 6.19.26.html">Home</a>'
            '<a href="%s">%s hub</a><a href="#">Community</a></div></div>'
            '<p class="disclaimer">General information for planning purposes, not professional advice. '
            'Figures vary by vessel, location, and circumstances.</p>'
            '<div class="foot-fine">ycotw.com &middot; #YCOTW &middot; Everything worth knowing about life on the water.</div>'
            '</div></footer>') % (cluster_label, foot_links, hub_file, cluster_label)
    script = ("<script>document.querySelectorAll('.faq-q').forEach(q=>{q.addEventListener('click',()=>"
              "{const a=q.nextElementSibling;q.classList.toggle('open');a.classList.toggle('show');});});"
              "function askGo(){const v=document.getElementById('askInput').value.trim();if(!v)return;"
              "alert('In the live site, this opens an AI conversation that answers instantly. (Claude API - Phase 2.)');}</script>")
    faq_section = ('<section class="faq" id="faq"><div class="wrap"><h2>%s: Frequently Asked Questions</h2>'
                   '<p class="faq-sub">Quick answers to the most common questions on this topic.</p>%s</div></section>'
                   ) % (crumb, faq_html)
    return ('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">'
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
            '<title>%s</title><meta name="description" content="%s"><meta name="keywords" content="%s">'
            '<link rel="preconnect" href="https://fonts.googleapis.com">'
            '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
            '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500'
            '&family=Oswald:wght@300;400;500&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">'
            '%s</head><body>%s%s%s<article><div class="wrap">%s</div></article>%s%s%s%s%s</body></html>'
            ) % (title, desc, kw_meta, STYLE, nav, head, tocbox, body, faq_section, ask, rel, foot, script)

def wc(html):
    """Word count of article body + FAQ, to verify against the floor (pillars 2500, spokes 2000)."""
    b = re.search(r'<article>.*?</article>', html, re.DOTALL)
    fq = re.search(r'<section class="faq".*?</section>', html, re.DOTALL)
    w = 0
    if b: w += len(re.sub(r'<[^>]+>',' ', b.group(0)).split())
    if fq: w += len(re.sub(r'<[^>]+>',' ', fq.group(0)).split())
    return w

# --- HUB PAGES ---
# The reliable way to build a hub is to CLONE an existing hub (buy-hub.html) and do
# safe, unique string replacements (see HANDOFF.md sec 9). Hub CSS (hub-hero, art-grid,
# .articles) lives in buy-hub.html, not in the article STYLE above. Do NOT use slice-based
# edits — a slice bug once produced a corrupt 17MB file. Always replace unique strings.
