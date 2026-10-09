"""Functional checks for page palettes, headline effects, custom select and scroll choreography."""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ.get('PORTFOLIO_TEST_URL','http://127.0.0.1:3001')
OUT = Path(__file__).parent / 'page-identities-review'
OUT.mkdir(exist_ok=True)
ROUTES = [('home','/','#e8fa72'),('about','/about','#b8f394'),('projects','/project','#a1d8ff'),('playground','/playground','#ffd49b'),('resume','/resume','#ece9db'),('contact','/contact','#b1a9ef')]
checks, errors = [], []

def passed(name, **extra):
    checks.append({'check':name,'passed':True,**extra})
    print('PASS:',name,flush=True)

def no_overflow(page):
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Horizontal overflow'

def headline_ready(page, reduced=False):
    page.locator('h1 .page-headline').first.wait_for()
    if not reduced:
        page.wait_for_function('''() => [...document.querySelectorAll('h1 .page-headline')].every(n=>n.dataset.revealed==='true')''')
    page.wait_for_function('''() => [...document.querySelectorAll('h1 .headline-unit, h1 .headline-ink')].every(n=>{
      const s=getComputedStyle(n);return Number(s.opacity)>.99 && ['none','blur(0px)'].includes(s.filter) && ['none','inset(0px)'].includes(s.clipPath);
    })''')
    no_overflow(page)

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    context = browser.new_context(viewport={'width':1520,'height':1000})
    context.add_init_script("localStorage.setItem('mra_portfolio_lang','en');localStorage.setItem('mra_portfolio_theme','dark')")
    page=context.new_page()
    page.on('pageerror',lambda error:errors.append(str(error)))
    page.goto(BASE,wait_until='networkidle')
    page.evaluate('window.__identityDocument=1')
    effects=set()
    for name,path,color in ROUTES:
        if name!='home':page.locator(f'a[href="{path}"]:visible').first.click()
        page.wait_for_function('(name)=>document.documentElement.dataset.page===name',arg=name)
        page.locator('.manifesto-'+name).wait_for()
        page.wait_for_timeout(1400)
        assert page.evaluate('getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()') == color
        assert page.evaluate('window.__identityDocument===1')
        assert page.locator('.scroll-signature').get_attribute('data-scroll-page') == name
        page.evaluate('window.scrollTo(0,0)')
        page.wait_for_timeout(400)
        before=page.locator('.scroll-signature-object').evaluate('(n)=>getComputedStyle(n).rotate')
        page.evaluate('window.scrollTo(0,600)')
        page.wait_for_timeout(450)
        progress=page.locator('.portfolio-app').evaluate('(n)=>Number(n.style.getPropertyValue("--scroll-progress"))')
        assert progress>0
        if name!='resume':assert page.locator('.scroll-signature-object').evaluate('(n)=>getComputedStyle(n).rotate') != before
        assert page.locator('.scroll-heading').count()>0
        scene=page.locator('.scroll-scene').last
        scene.scroll_into_view_if_needed()
        page.wait_for_timeout(2100)
        assert float(scene.evaluate('(n)=>n.style.getPropertyValue("--scene-focus")'))>.05
        words=page.locator('.manifesto-'+name+' .kinetic-word').evaluate_all('''nodes=>nodes.map(n=>{
          const box=n.getBoundingClientRect(),mask=n.parentElement.getBoundingClientRect();let opacity=1;
          for(let p=n;p;p=p.parentElement)opacity*=Number(getComputedStyle(p).opacity);
          return {opacity,inside:box.bottom>mask.top&&box.top<mask.bottom};
        })''')
        assert words and all(word['opacity']>.99 and word['inside'] for word in words), (name,words)
        page.evaluate('window.scrollTo(0,0)')
        page.wait_for_timeout(500)
        assert float(page.locator('.portfolio-app').evaluate('(n)=>n.style.getPropertyValue("--scroll-progress")'))==0
        if name in ['playground','resume','contact']:
            headline_ready(page)
            effect=page.locator('h1 .page-headline').first.get_attribute('data-effect')
            effects.add(effect)
            page.screenshot(path=str(OUT/(name+'-final-desktop.png')))
        no_overflow(page)
        passed(f'SPA {name}: palette, live scroll, reverse scroll, visible section titles')
    assert len(effects)==3,effects
    passed('Three distinct headline effects settle into fully readable text')
    # Contact accents must agree across the page and shared shell.
    color='rgb(177, 169, 239)'
    for selector,property in [('.contact-page h1 em','color'),('.compose-footer .page-pill','backgroundColor'),('.contact-star','color'),('.manifesto-topline>span:first-child','color'),('.shell-footer-accent','color'),('.shell-wordmark-period','color')]:
        assert page.locator(selector).first.evaluate('(n,p)=>getComputedStyle(n)[p]',property)==color,selector
    page.locator('#contact-name').fill('A test visitor')
    assert page.locator('#contact-name').input_value()=='A test visitor'
    passed('Contact title, form, note, manifesto, navbar and footer all use purple')
    page.goto(BASE+'/project',wait_until='networkidle')
    trigger=page.get_by_role('combobox',name='Filter programming language')
    trigger.click()
    assert page.get_by_role('listbox').is_visible()
    assert page.get_by_role('option').count()==11
    page.locator('.project-language-menu').screenshot(path=str(OUT/'project-language-list.png'))
    page.get_by_role('option',name='Python',exact=False).click()
    assert trigger.inner_text()=='Python'
    page.wait_for_timeout(850)
    cards=page.locator('.repository-card')
    assert cards.count()>0
    assert cards.locator('.repository-card-tech').evaluate_all('(nodes)=>nodes.every(n=>n.textContent.includes("Python"))')
    trigger.focus();trigger.press('ArrowDown');trigger.press('End')
    assert trigger.get_attribute('aria-activedescendant')
    trigger.press('Enter');page.wait_for_timeout(850)
    assert trigger.inner_text()=='TypeScript'
    trigger.press('ArrowDown');trigger.press('Home');trigger.press('Enter');page.wait_for_timeout(850)
    assert trigger.inner_text()=='Every language'
    trigger.press('Enter');trigger.press('p');trigger.press('y');trigger.press('Enter');page.wait_for_timeout(700)
    assert trigger.inner_text()=='Python'
    trigger.click();trigger.press('Escape')
    assert trigger.get_attribute('aria-expanded')=='false'
    trigger.click();page.locator('.archive-search input').click()
    assert trigger.get_attribute('aria-expanded')=='false'
    no_overflow(page)
    passed('Language list: mouse selection, filtering, arrows, Home/End, typeahead, Escape, outside click')
    # Theme changes need to update the current page without reloading.
    page.evaluate('window.__themeDocument=1')
    page.locator('#theme-toggler-btn').click()
    page.wait_for_function('document.documentElement.classList.contains("light")')
    assert page.evaluate('getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()')=='#236593'
    assert page.evaluate('window.__themeDocument===1')
    trigger=page.get_by_role('combobox',name='Filter programming language')
    trigger.click();page.wait_for_timeout(300);page.locator('.project-language-menu').screenshot(path=str(OUT/'project-language-light.png'))
    passed('Light theme uses a darker, readable version of the project accent')
    trigger.press('Escape')
    light_colors=['#657828','#38733f','#236593','#936126','#756249','#6c5f9f']
    for (name,path,_),color in zip(ROUTES,light_colors):
        page.locator(f'a[href="{path}"]:visible').first.click()
        page.locator('.manifesto-'+name).wait_for()
        assert page.evaluate('getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()')==color
        assert page.evaluate('window.__themeDocument===1')
    passed('All six page accents remain correct during SPA navigation in light theme')
    context.close()
    for lang,theme,reduced in [('en','dark',False),('fa','dark',False),('fa','light',True)]:
        mobile_context=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce' if reduced else 'no-preference')
        mobile_context.add_init_script(f"localStorage.setItem('mra_portfolio_lang','{lang}');localStorage.setItem('mra_portfolio_theme','{theme}')")
        mobile=mobile_context.new_page();mobile.on('pageerror',lambda e:errors.append(str(e)))
        for name,path,_ in ROUTES[3:]:
            mobile.goto(BASE+path,wait_until='networkidle');headline_ready(mobile,reduced)
            mobile.screenshot(path=str(OUT/f'{name}-mobile-{lang}-{theme}.png'))
            mobile.evaluate('window.scrollTo(0,400)');mobile.wait_for_timeout(500);no_overflow(mobile)
            if reduced:
                assert mobile.locator('.scroll-signature').count()==0
                assert mobile.locator('h1 .headline-unit').evaluate_all('(nodes)=>nodes.every(n=>getComputedStyle(n).animationName==="none")')
        mobile.goto(BASE+'/project',wait_until='networkidle')
        mobile.locator('.project-language-trigger').click()
        mobile.get_by_role('option',name='Rust',exact=False).click()
        mobile.wait_for_timeout(700)
        assert mobile.locator('.project-language-trigger').inner_text()=='Rust'
        no_overflow(mobile)
        passed(f'Mobile {lang}/{theme}: all three headlines, scrolling, language menu, reduced motion={reduced}')
        mobile_context.close()
    assert not errors,errors
    browser.close()

(OUT/'verification.json').write_text(json.dumps({'checks':checks,'runtimeErrors':errors},ensure_ascii=False,indent=2),encoding='utf-8')
