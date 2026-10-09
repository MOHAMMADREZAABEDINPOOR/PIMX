import json,os
from pathlib import Path
from playwright.sync_api import sync_playwright
base=os.environ.get('PORTFOLIO_TEST_URL','http://127.0.0.1:3001')
out=Path('docs/responsive-review');out.mkdir(exist_ok=True)
routes=['/','/about','/project','/playground','/resume','/contact'];results=[];errors=[]
languages=os.environ.get('TEST_LANGUAGES','en,fa,de').split(',')
widths=[int(w) for w in os.environ.get('TEST_WIDTHS','300,390,768,1440').split(',')]
with sync_playwright() as pw:
 browser=pw.chromium.launch(args=['--disable-webgl'])
 context=browser.new_context(viewport={'width':1440,'height':900},reduced_motion='reduce')
 page=context.new_page();page.on('pageerror',lambda error:errors.append(str(error)))
 for lang in languages:
  page.goto(base);page.evaluate('(lang)=>localStorage.setItem("mra_portfolio_lang",lang)',lang)
  for width in widths:
   page.set_viewport_size({'width':width,'height':850})
   for route in routes:
    page.goto(base+route,wait_until='networkidle')
    page.wait_for_timeout(120)
    data=page.evaluate('''() => ({scrollWidth:document.documentElement.scrollWidth,width:innerWidth,overflow:[...document.querySelectorAll('h1,h2,h3,p,button,a,input,textarea,.resume-profile,.language-picker')].filter(e=>{const r=e.getBoundingClientRect();if(!r.width||!r.height||getComputedStyle(e).position==='absolute'||e.closest('.cert-hero-rail,svg,.credential-scene,.sculpture-controls,.study-dimensional-stage,.showcase-display,.signal-universe,.identity-machine,.identity-orbits,.skills-marquee,.manifesto-stage,.kinetic-readable,.headline-readable'))return false;for(let parent=e.parentElement;parent;parent=parent.parentElement){if(['auto','scroll'].includes(getComputedStyle(parent).overflowX)&&parent.scrollWidth>parent.clientWidth)return false;}return r.right>innerWidth+2||r.left < -2||(e.matches('h1,h2,h3,p,button')&&e.clientWidth>0&&e.scrollWidth>e.clientWidth+3);}).map(e=>({tag:e.tagName,class:e.className,text:e.textContent.slice(0,90),left:Math.round(e.getBoundingClientRect().left),right:Math.round(e.getBoundingClientRect().right)})).slice(0,18)})''')
    results.append({'lang':lang,'route':route,'viewportWidth':width,**data})
    if data['scrollWidth']>width or data['overflow']:print(json.dumps(results[-1],ensure_ascii=False),flush=True)
    if width==300 and lang=='en':page.screenshot(path=str(out/(route.strip('/') or 'home'))+'-300.png',full_page=True)
   print(f'{lang}: {width}px checked.',flush=True)
 browser.close()
(out/os.environ.get('RESPONSIVE_REPORT','matrix.json')).write_text(json.dumps({'results':results,'errors':errors},ensure_ascii=False,indent=2),encoding='utf-8')
print(f'{len(results)} layouts; {len(errors)} runtime errors; {sum(bool(r["overflow"]) or r["scrollWidth"]>r["width"] for r in results)} need review.')

raise SystemExit(bool(errors or any(r['overflow'] or r['scrollWidth']>r['width'] for r in results)))
