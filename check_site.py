"""Ashavin offline checks. Uses Python 3 standard library only.
Run: python3 check_site.py
"""
from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
from urllib.parse import urlsplit, unquote
import json
import re
import sys

ROOT = Path(__file__).resolve().parent
PAGES = sorted(ROOT.glob('*.html'))
ERRORS = []


class Tags(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.refs = []
        self.stylesheets = []
        self.scripts = []
        self.h1 = 0

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if data.get('id'):
            self.ids.append(data['id'])
        if tag == 'h1':
            self.h1 += 1
        if tag == 'link' and data.get('rel') == 'stylesheet' and data.get('href', '') == 'site.css':
            self.stylesheets.append(data['href'])
        if tag == 'script' and data.get('src'):
            self.scripts.append(data['src'])
        for attr in ('src', 'href'):
            if data.get(attr):
                self.refs.append(data[attr])
        if tag == 'img' and 'alt' not in data:
            ERRORS.append('Image missing alt: ' + str(data.get('src')))


all_ids = {}
for page in PAGES:
    parser = Tags()
    parser.feed(page.read_text(encoding='utf-8'))
    all_ids[page.name] = set(parser.ids)
    duplicates = [name for name, count in Counter(parser.ids).items() if count > 1]
    if duplicates:
        ERRORS.append(f'{page.name}: duplicate IDs {duplicates}')
    if parser.h1 != 1:
        ERRORS.append(f'{page.name}: expected 1 h1, got {parser.h1}')
    if parser.stylesheets != ['site.css']:
        ERRORS.append(f'{page.name}: unexpected stylesheets {parser.stylesheets}')
    if parser.scripts != ['main.js']:
        ERRORS.append(f'{page.name}: unexpected JS entrypoints {parser.scripts}')

    for url in parser.refs:
        parts = urlsplit(url)
        if parts.scheme or url.startswith(('#', '//', 'mailto:', 'tel:', 'data:')):
            if parts.scheme or url.startswith(('mailto:', 'tel:', 'data:')):
                continue
            if url.startswith('#') and url[1:] not in all_ids[page.name]:
                ERRORS.append(f'{page.name}: missing in-page anchor {url}')
            continue
        path = unquote(parts.path).lstrip('/')
        dest = (ROOT / path)
        if path and not dest.exists():
            ERRORS.append(f'{page.name}: missing asset/link {url}')
        if parts.fragment and dest.suffix == '.html':
            # Checked in the second pass below.
            pass

for page in PAGES:
    parser = Tags()
    parser.feed(page.read_text(encoding='utf-8'))
    for url in parser.refs:
        parts = urlsplit(url)
        if not parts.scheme and parts.path.endswith('.html') and parts.fragment:
            target = parts.path.split('/')[-1]
            if parts.fragment not in all_ids.get(target, set()):
                ERRORS.append(f'{page.name}: bad fragment {url}')

for path in ROOT.glob('*.json'):
    try:
        content = json.loads(path.read_text(encoding='utf-8'))
        if path.name == 'gallery.json':
            for item in content:
                if not (ROOT / item['src']).exists():
                    ERRORS.append(f'{path.name}: missing image {item["src"]}')
    except (json.JSONDecodeError, KeyError, TypeError) as ex:
        ERRORS.append(f'{path}: {ex}')

for path in ROOT.glob('*.js'):
    for name in re.findall(r'\bfrom\s+[\'\"](\.[^\'\"]+)[\'\"]', path.read_text(encoding='utf-8')):
        if not (path.parent / name).exists():
            ERRORS.append(f'{path.name}: missing imported JS {name}')

css = (ROOT / 'site.css').read_text(encoding='utf-8')
for name in re.findall(r"url\(\s*['\"]?([^()'\"\s]+?\.(?:webp|svg|png))", css):
    if not (ROOT / name).exists():
        ERRORS.append(f'CSS references missing image {name}')

print(f'Checked {len(PAGES)} HTML pages, {len(list(ROOT.glob("*.js")))} JS files, {len(list(ROOT.glob("*.json")))} data files.')
if ERRORS:
    print('\n'.join('ERROR: ' + error for error in ERRORS))
    sys.exit(1)
print('PASS: no missing local links/assets, invalid data, duplicate IDs or missing JS imports.')
