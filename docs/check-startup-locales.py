import json
from pathlib import Path
from playwright.sync_api import sync_playwright
base='http://127.0.0.1:3001'
results=[]
with sync_playwright() as pw:
 browser=pw.chromium.launch()
 context=browser.new_context(viewport={'width':300,'height':850})
 context.route('**/assets/*.js',lambda route:route.abort())
 page=context.new_page()
 for lang in ['en','fa','ar','de','fr','it','zh','ru','el','la']:
  page.goto(base,wait_until='domcontentloaded')
  page.evaluate('(lang)=>localStorage.setItem("mra_portfolio_lang",lang)',lang)
  for route in ['/','/about','/project','/playground','/resume','/contact']:
   page.goto(base+route,wait_until='domcontentloaded');page.evaluate('document.fonts.ready')
   result=page.locator('#startup-portal').evaluate('''e=>{const word=e.querySelector('strong'),caption=e.querySelector('.portal-caption');return {word:word.textContent,caption:caption.textContent,wordWidth:word.getBoundingClientRect().width,captionWidth:caption.getBoundingClientRect().width,viewport:innerWidth};}''')
   results.append({'lang':lang,'route':route,**result})
   assert result['wordWidth']<=300 and result['captionWidth']<=300, results[-1]
   if lang!='en':assert result['caption']!='A DIFFERENT WORLD.',results[-1]
  print(f'{lang}: startup artwork fits and is localized.',flush=True)
 browser.close()
Path('docs/startup-locale-review.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
print('60 initial loading screens fit at 300px; all nine localized captions verified.')
