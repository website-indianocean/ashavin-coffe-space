#!/usr/bin/env python3
"""Static checks for Ashavin V8. Run: python3 verify_site.py"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
from collections import Counter
import json
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parent
ERRORS = []


def check(condition, message):
    if not condition:
        ERRORS.append(message)


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.links = []
        self.images = []
        self.styles = []
        self.scripts = []
        self.headings = []
        self.internal_page_links = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if d.get('id'):
            self.ids.append(d['id'])
        if tag == 'img':
            self.images.append(d)
        if tag == 'script' and d.get('src'):
            self.scripts.append(d['src'])
        if tag == 'link' and d.get('rel') == 'stylesheet':
            self.styles.append(d.get('href', ''))
        if tag in ('a', 'img', 'script', 'link', 'source'):
            value = d.get('href') or d.get('src')
            if value:
                self.links.append((tag, value))
        if tag == 'a' and d.get('href'):
            self.internal_page_links.append(d['href'])
        if tag == 'h1':
            self.headings.append('h1')


def valid_local_path(url):
    if url.startswith(('#', 'mailto:', 'tel:', 'data:', 'javascript:', '//')):
        return None
    parsed = urlsplit(url)
    if parsed.scheme or parsed.netloc or not parsed.path:
        return None
    return ROOT / unquote(parsed.path).lstrip('/')


pages = sorted(ROOT.glob('*.html'))
check(len(pages) == 18, f'Expected 18 HTML pages; found {len(pages)}')
for page in pages:
    parser = PageParser()
    parser.feed(page.read_text(encoding='utf-8'))
    for name, count in Counter(parser.ids).items():
        check(count == 1, f'{page.name}: duplicate ID {name}')
    check(parser.headings.count('h1') == 1, f'{page.name}: expected exactly one h1')
    check([s for s in parser.styles if s == 'site.css' ] == ['site.css'],
          f'{page.name}: expected one unified local stylesheet')
    check(parser.scripts == ['main.js'], f'{page.name}: expected only main.js entrypoint')
    for tag, url in parser.links:
        path = valid_local_path(url)
        if path is not None:
            check(path.exists(), f'{page.name}: missing linked asset: {url}')
    for image in parser.images:
        check('alt' in image, f'{page.name}: image missing alt')
    check('id="site-header"' in page.read_text(), f'{page.name}: missing shared header')
    check('id="mobile-navigation"' in page.read_text(), f'{page.name}: missing navigation')

for file in sorted(ROOT.glob('*.json')):
    try:
        data = json.loads(file.read_text(encoding='utf-8'))
        if file.name == 'gallery.json':
            for item in data:
                check((ROOT / item['src']).is_file(), f'Gallery: missing file {item["src"]}')
    except Exception as exc:
        ERRORS.append(f'{file.relative_to(ROOT)}: invalid JSON: {exc}')

for file in sorted(ROOT.glob('*.js')):
    if subprocess.run(['node', '--check', str(file)], stdout=subprocess.PIPE, stderr=subprocess.PIPE).returncode:
        ERRORS.append(f'JavaScript syntax failed: {file.relative_to(ROOT)}')

css_file = ROOT / 'site.css'
check(css_file.is_file(), 'Missing unified CSS')
if css_file.is_file():
    css = css_file.read_text()
    check('inner-hero-media' in css, 'Missing inner hero media styles')
    for url in re.findall(r"url\(\s*['\"]?([^()'\"\s]+?\.(?:webp|svg|png))", css):
        check((ROOT / url).resolve().exists(), f'Missing CSS background asset: {url}')

if ERRORS:
    print(f'FAIL: {len(ERRORS)} issues')
    for issue in ERRORS:
        print('  -', issue)
    sys.exit(1)
print(f'PASS: {len(pages)} HTML pages, {len(list(ROOT.glob("*.js")))} JS modules, JSON data and asset references')
