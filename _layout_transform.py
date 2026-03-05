"""
Apply two-column sidebar layout to all 7 blog post HTML files.
Matches the layout of google-lsa-for-water-damage-restoration.html
"""
import re, sys, os

BASE = r"C:\Users\julia\OneDrive\Desktop\BGM - Repository Git\bluegridmedia"

# ── CSS to inject before </style> ─────────────────────────────────────────────
CSS_INJECT = """
    /* ── Two-column page layout ── */
    .article-page-wrap {
      display: grid;
      grid-template-columns: 1fr 280px;
      gap: 3rem;
      max-width: 1120px;
      margin: 0 auto;
    }
    @media (max-width: 900px) {
      .article-page-wrap { grid-template-columns: 1fr; }
      .article-sidebar { order: -1; }
    }

    /* ── Sidebar ── */
    .sidebar-cta {
      background: linear-gradient(135deg, #0f2d4e, #0ea5a4);
      color: #fff;
      border-radius: 10px;
      padding: 1.5rem;
      text-align: center;
    }
    .sidebar-cta h3 {
      color: #d1fafa;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.75rem;
    }
    .sidebar-cta p {
      color: #e2e8f0;
      font-size: 0.88rem;
      margin-bottom: 1rem;
    }
    .sidebar-cta a {
      display: block;
      background: #fff;
      color: #0f2d4e;
      font-weight: 700;
      font-size: 0.9rem;
      padding: 0.7rem 1rem;
      border-radius: 7px;
      text-decoration: none;
    }
    .sidebar-cta a:hover { background: #f0fafa; }
    .sidebar-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 1.5rem;
      margin-top: 1.5rem;
    }
    .sidebar-card h3 {
      font-size: 0.82rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    .sidebar-card ul { list-style: none; padding: 0; margin: 0; }
    .sidebar-card ul li { padding: 0.4rem 0; border-bottom: 1px solid #e2e8f0; font-size: 0.92rem; }
    .sidebar-card ul li:last-child { border-bottom: none; }
    .sidebar-card a { color: #0ea5a4; text-decoration: none; }
    .sidebar-card a:hover { text-decoration: underline; }

    /* ── Breadcrumb ── */
    .article-breadcrumb {
      font-size: 0.8rem;
      color: #94a3b8;
      margin-bottom: 30px;
    }
    .article-breadcrumb a { color: #0ea5a4; text-decoration: none; }
    .article-breadcrumb a:hover { text-decoration: underline; }

    /* ── Topic bar ── */
    .topic-bar-wrap {
      background: #f7f9fc;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 40px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.04);
      font-size: 0.9rem;
    }
"""

def make_sidebar(guides):
    items = "\n".join(f'            <li><a href="{url}">{text}</a></li>' for text, url in guides)
    return f"""
      <aside class="article-sidebar">
        <div class="sidebar-cta">
          <h3>Free LSA Audit</h3>
          <p>Find out what's costing you leads — no charge, no obligation.</p>
          <a href="/Free-LSA-audit">Request Audit</a>
        </div>
        <div class="sidebar-card">
          <h3>More LSA Guides</h3>
          <ul>
{items}
          </ul>
        </div>
      </aside>"""

def make_breadcrumb(title):
    return f"""
        <div class="article-breadcrumb">
          <a href="/">Home</a> &rsaquo; <a href="/resources">Resources</a> &rsaquo; {title}
        </div>
"""

# ── Per-file config ────────────────────────────────────────────────────────────
FILES = {
    "google-lsa-for-hvac-companies.html": {
        "breadcrumb": "Google LSA for HVAC Companies",
        "guides": [
            ("Google LSA for Roofers", "/google-lsa-for-roofers"),
            ("Google LSA for Electricians", "/google-lsa-for-electricians"),
            ("Google LSA for Water Damage Restoration", "/google-lsa-for-water-damage-restoration"),
            ("Google LSA Ranking Factors", "/google-lsa-ranking-factors"),
            ("Why You\u2019re Not Getting LSA Calls", "/lsa-no-calls-guide"),
        ],
    },
    "google-lsa-for-roofers.html": {
        "breadcrumb": "Google LSA for Roofers",
        "guides": [
            ("Google LSA for HVAC Companies", "/google-lsa-for-hvac-companies"),
            ("Google LSA for Electricians", "/google-lsa-for-electricians"),
            ("Google LSA for Water Damage Restoration", "/google-lsa-for-water-damage-restoration"),
            ("Google LSA Ranking Factors", "/google-lsa-ranking-factors"),
            ("Why You\u2019re Not Getting LSA Calls", "/lsa-no-calls-guide"),
        ],
    },
    "google-lsa-for-electricians.html": {
        "breadcrumb": "Google LSA for Electricians",
        "guides": [
            ("Google LSA for HVAC Companies", "/google-lsa-for-hvac-companies"),
            ("Google LSA for Roofers", "/google-lsa-for-roofers"),
            ("Google LSA for Water Damage Restoration", "/google-lsa-for-water-damage-restoration"),
            ("Google LSA Ranking Factors", "/google-lsa-ranking-factors"),
            ("Why You\u2019re Not Getting LSA Calls", "/lsa-no-calls-guide"),
        ],
    },
    "google-ads-vs-lsa-plumbers.html": {
        "breadcrumb": "Google Ads vs. LSA for Plumbers",
        "guides": [
            ("Google LSA for HVAC Companies", "/google-lsa-for-hvac-companies"),
            ("Google LSA for Roofers", "/google-lsa-for-roofers"),
            ("Google LSA for Electricians", "/google-lsa-for-electricians"),
            ("Google LSA Ranking Factors", "/google-lsa-ranking-factors"),
            ("Why You\u2019re Not Getting LSA Calls", "/lsa-no-calls-guide"),
        ],
    },
    "plumbing-ads-playbook-google-local-services-ads.html": {
        "breadcrumb": "Plumbing Ads Playbook",
        "guides": [
            ("Google LSA for HVAC Companies", "/google-lsa-for-hvac-companies"),
            ("Google LSA for Roofers", "/google-lsa-for-roofers"),
            ("Google LSA for Electricians", "/google-lsa-for-electricians"),
            ("Google LSA Ranking Factors", "/google-lsa-ranking-factors"),
            ("Why You\u2019re Not Getting LSA Calls", "/lsa-no-calls-guide"),
        ],
    },
    "google-lsa-ranking-factors.html": {
        "breadcrumb": "Google LSA Ranking Factors",
        "guides": [
            ("Google LSA for HVAC Companies", "/google-lsa-for-hvac-companies"),
            ("Google LSA for Roofers", "/google-lsa-for-roofers"),
            ("Google LSA for Electricians", "/google-lsa-for-electricians"),
            ("Google LSA for Water Damage Restoration", "/google-lsa-for-water-damage-restoration"),
            ("Why You\u2019re Not Getting LSA Calls", "/lsa-no-calls-guide"),
        ],
    },
    "lsa-no-calls-guide.html": {
        "breadcrumb": "Why You\u2019re Not Getting LSA Calls",
        "guides": [
            ("Google LSA for HVAC Companies", "/google-lsa-for-hvac-companies"),
            ("Google LSA for Roofers", "/google-lsa-for-roofers"),
            ("Google LSA for Electricians", "/google-lsa-for-electricians"),
            ("Google LSA for Water Damage Restoration", "/google-lsa-for-water-damage-restoration"),
            ("Google LSA Ranking Factors", "/google-lsa-ranking-factors"),
        ],
    },
}

# ── Transform each file ────────────────────────────────────────────────────────
for fname, cfg in FILES.items():
    fpath = os.path.join(BASE, fname)
    print(f"Processing: {fname}")

    with open(fpath, "r", encoding="utf-8") as f:
        html = f.read()

    original = html  # keep for diff check

    # 1. Add CSS before </style>
    if CSS_INJECT.strip() not in html:
        html = html.replace("  </style>\n</head>", CSS_INJECT + "  </style>\n</head>", 1)
        if CSS_INJECT.strip() not in html:
            # try Windows line endings
            html = html.replace("  </style>\r\n</head>", CSS_INJECT + "  </style>\r\n</head>", 1)

    # 2. Replace outer wrapper div
    html = html.replace(
        '    <div style="max-width: 820px; margin: 0 auto;">',
        '    <div class="article-page-wrap">',
        1
    )

    # 3. Replace article-content div → main
    html = html.replace(
        '\n      <div class="article-content">\n',
        '\n      <main class="article-content">\n',
        1
    )
    # also handle version without blank line before
    html = html.replace(
        '      <div class="article-content">\n',
        '      <main class="article-content">\n',
        1
    )

    # 4. Replace topic bar inline style → class  (multiline match)
    topic_bar_pattern = re.compile(
        r'        <div style="\s*\n\s*background:#f7f9fc;\s*\n\s*padding:20px;\s*\n\s*border-radius:12px;\s*\n\s*margin-bottom:40px;\s*\n\s*box-shadow:0 6px 18px rgba\(0,0,0,0\.04\);\s*\n\s*">',
        re.MULTILINE
    )
    html = topic_bar_pattern.sub('        <div class="topic-bar-wrap">', html, count=1)

    # 5. Add breadcrumb after byline paragraph
    # The byline paragraph ends with </p> followed by a blank line and then the topic bar
    breadcrumb_html = make_breadcrumb(cfg["breadcrumb"])
    byline_end = re.compile(
        r'(        </p>\n)(\n        <div class="topic-bar-wrap">)',
        re.MULTILINE
    )
    if byline_end.search(html):
        html = byline_end.sub(r'\1' + breadcrumb_html + r'\2', html, count=1)
    else:
        # Try without blank line
        byline_end2 = re.compile(
            r'(        </p>\n)(        <div class="topic-bar-wrap">)',
            re.MULTILINE
        )
        html = byline_end2.sub(r'\1' + breadcrumb_html + r'\2', html, count=1)

    # 6. Replace closing article-content div + wrapper + section structure
    # Old: "      </div>\n\n    </div>\n  </div>\n</section>"
    # New: "      </main>" + sidebar + "    </div>\n  </div>\n</section>"
    aside_html = make_sidebar(cfg["guides"])
    closing_pattern = re.compile(
        r'      </div>\n\n    </div>\n  </div>\n</section>',
        re.MULTILINE
    )
    new_closing = '      </main>' + aside_html + '\n    </div>\n  </div>\n</section>'
    if closing_pattern.search(html):
        html = closing_pattern.sub(new_closing, html, count=1)
    else:
        # Try single newline variant
        closing_pattern2 = re.compile(
            r'      </div>\n    </div>\n  </div>\n</section>',
            re.MULTILINE
        )
        new_closing2 = '      </main>' + aside_html + '\n    </div>\n  </div>\n</section>'
        html = closing_pattern2.sub(new_closing2, html, count=1)

    if html == original:
        print(f"  WARNING: No changes made to {fname} — check patterns!")
    else:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"  Done. ({len(html)} chars)")

print("\nAll files processed.")
