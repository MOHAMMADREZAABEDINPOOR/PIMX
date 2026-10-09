"""Find untranslated public UI text and labels in the actual rendered pages."""
import json
import os
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright

base = os.environ.get('PORTFOLIO_TEST_URL', 'http://127.0.0.1:3001')
dictionary = json.loads(Path('src/lib/site_text.json').read_text(encoding='utf-8'))
reviewed = json.loads(subprocess.check_output(['node','--import','tsx','--input-type=module','-e',
    "import {reviewedSiteText} from './src/lib/site_text_review.ts'; process.stdout.write(JSON.stringify(reviewedSiteText));"], encoding='utf-8'))
for phrase, translations in reviewed.items():
    dictionary.setdefault(phrase, {}).update(translations)
languages = ['fa', 'ar', 'de', 'fr', 'it', 'zh', 'ru', 'el', 'la']
routes = ['/', '/about', '/project', '/playground', '/resume', '/contact']
extract = '''() => {
  const root=document.querySelector('#mra-portfolio-app'), values=[];
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  while(walker.nextNode()) {
    const node=walker.currentNode, element=node.parentElement;
    if(element.closest('script,style,.headline-visual,.kinetic-word-mask,.orbit-type-visual,.fragment-word'))continue;
    const value=node.textContent.replace(/\\s+/g,' ').trim();
    if(value.length>2)values.push(value);
  }
  for(const element of root.querySelectorAll('[aria-label],[placeholder],[title]')) {
    for(const attr of ['aria-label','placeholder','title']) {
      const value=element.getAttribute(attr);
      if(value)values.push(value.trim());
    }
  }
  return [...new Set(values)];
}'''
results = []
errors = []
with sync_playwright() as pw:
    browser = pw.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900}, reduced_motion='reduce')
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto(base, wait_until='networkidle')
    english = {}
    for route in routes:
        page.goto(base + route, wait_until='networkidle')
        english[route] = page.evaluate(extract)
    for lang in languages:
        page.evaluate('(lang)=>localStorage.setItem("mra_portfolio_lang",lang)', lang)
        for route in routes:
            page.goto(base + route, wait_until='networkidle')
            actual = set(page.evaluate(extract))
            unchanged = [text for text in english[route] if dictionary.get(text, {}).get(lang)
                         and dictionary[text][lang] != text and text in actual]
            results.append({'lang': lang, 'route': route, 'untranslated': unchanged})
            if unchanged:
                print(json.dumps(results[-1], ensure_ascii=False), flush=True)
    browser.close()
Path('docs/localization-review.json').write_text(json.dumps({'results': results, 'errors': errors},
    ensure_ascii=False, indent=2), encoding='utf-8')
failures = sum(bool(result['untranslated']) for result in results)
print(f'{len(results)} localized pages; {failures} with untranslated UI; {len(errors)} runtime errors.')
raise SystemExit(bool(failures or errors))
