"""Exercise the requested language menus, measured project transitions and home motion."""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

base = os.environ.get('PORTFOLIO_TEST_URL', 'http://127.0.0.1:3001')
output = Path('docs/responsive-review')
checks, errors, requests = [], [], []

def passed(name, **details):
    checks.append({'check': name, 'passed': True, **details})
    print('PASS:', name, flush=True)

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    context = browser.new_context(viewport={'width': 300, 'height': 850})
    context.add_init_script("localStorage.setItem('mra_portfolio_lang','en');localStorage.setItem('mra_portfolio_theme','dark')")
    page = context.new_page()
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('request', lambda request: requests.append(request.url))
    page.goto(base + '/resume', wait_until='networkidle')
    assert not any('/assets/' in url and any('/'+lang+'-' in url for lang in ['fa','ar','de','fr','it','zh','ru','el','la']) for url in requests)
    passed('English initial load excludes all nine translation bundles')
    cv = page.locator('#resume-language')
    cv.scroll_into_view_if_needed()
    position = page.evaluate('scrollY')
    cv.press('Enter')
    panel = page.locator('.resume-language-control .language-picker-panel')
    bounds = panel.bounding_box()
    assert bounds['x'] >= 0 and bounds['x'] + bounds['width'] <= 300
    cv.press('End')
    assert abs(page.evaluate('scrollY') - position) < 2
    page.screenshot(path=str(output / 'resume-menu-final-300.png'))
    cv.press('Enter')
    page.wait_for_function("document.querySelector('.resume-paper').lang==='la'")
    site = page.locator('#language-select-trigger')
    site.click()
    page.get_by_role('option').filter(has_text='Deutsch').click()
    page.wait_for_function("document.documentElement.lang==='de'")
    assert page.locator('.resume-paper').get_attribute('lang') == 'la'
    assert page.locator('.resume-paper').get_attribute('dir') == 'ltr'
    assert 'Download' not in page.locator('.resume-toolbar').inner_text()
    passed('CV and site languages load independently; keyboard navigation preserves scroll')

    for lang, name, direction in [('fa','فارسی','rtl'),('ar','العربية','rtl'),('zh','中文','ltr'),('en','English','ltr')]:
        site.click()
        page.get_by_role('option').filter(has_text=name).click()
        expected = 'zh-CN' if lang == 'zh' else lang
        page.wait_for_function('(value)=>document.documentElement.lang===value', arg=expected)
        assert page.locator('html').get_attribute('dir') == direction
        assert page.locator('.resume-paper').get_attribute('lang') == 'la'
    assert not any('translate.googleapis' in url for url in requests)
    passed('RTL and CJK language switches retain selected CV; no online translation requests')

    page.goto(base + '/project', wait_until='networkidle')
    page.locator('.project-observatory-height').scroll_into_view_if_needed()
    page.wait_for_timeout(900)
    transitions = []
    for index in [14, 1, 7]:
        data = page.evaluate('''async index => {
          const host=document.querySelector('.project-observatory-height'), heights=[];
          const before=host.getBoundingClientRect().height;
          document.querySelectorAll('.dossier-progress button')[index].click();
          const start=performance.now();
          await new Promise(resolve=>{function tick(now){heights.push(host.getBoundingClientRect().height);if(now-start<900)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);});
          const after=host.getBoundingClientRect().height,content=host.querySelector('.auto-height-content').getBoundingClientRect().height;
          return {before,after,content,range:Math.max(...heights)-Math.min(...heights),largestStep:Math.max(...heights.slice(1).map((height,i)=>Math.abs(height-heights[i])))};
        }''', index)
        assert abs(data['after'] - data['content']) < 3, data
        if data['range'] > 20:
            assert data['largestStep'] < data['range'] * .65, data
        transitions.append(data)
        art=page.locator('.project-stage-sculpture .product-study')
        spec=art.locator('.study-floating-spec').bounding_box()
        controls=art.locator('.sculpture-controls').bounding_box()
        if spec and controls:
            assert spec['y']+spec['height'] <= controls['y'], (spec,controls)
    assert any(data['range'] > 20 for data in transitions), transitions
    page.screenshot(path=str(output / 'project-transition-final-300.png'))
    passed('Mobile project exhibition interpolates height and ends at actual content height', transitions=transitions)

    page.set_viewport_size({'width': 1440, 'height': 900})
    page.goto(base + '/about', wait_until='networkidle')
    page.wait_for_function("[...document.querySelectorAll('h1 .headline-discovery')].every(n=>n.dataset.revealed==='true')")
    assert page.locator('h1 .headline-discovery .headline-unit').first.evaluate("n=>getComputedStyle(n).animationName") == 'headline-discovery'
    page.wait_for_timeout(1500)
    page.screenshot(path=str(output / 'about-headline-final.png'))
    passed('About headline uses its discovery text effect')

    page.goto(base, wait_until='networkidle')
    card = page.locator('.selected-project').first
    page.wait_for_function("document.querySelector('.selected-project')?.dataset.scrollReady==='true'")
    before = card.evaluate("n=>n.style.getPropertyValue('--card-lift')")
    card.scroll_into_view_if_needed()
    page.wait_for_timeout(400)
    after = card.evaluate("n=>n.style.getPropertyValue('--card-lift')")
    assert before != after, (before, after)
    assert page.locator('.product-study[data-active="false"]').count() > 0
    passed('Home cards move with scrolling; offscreen project animations pause')
    page.locator('.expertise-section').scroll_into_view_if_needed()
    page.wait_for_function("document.querySelector('.expertise-section').dataset.scrollVisible==='true'")
    page.locator('.service-row > button').nth(2).click()
    assert page.locator('.craft-console').get_attribute('data-service') == '2'
    assert page.locator('.craft-diagram > i').first.evaluate("n=>getComputedStyle(n,'::after').animationPlayState") == 'running'
    page.wait_for_timeout(750)
    page.screenshot(path=str(output / 'home-expertise-final.png'))
    page.evaluate('scrollTo(0,0)')
    page.wait_for_timeout(500)
    assert page.locator('.craft-diagram > i').first.evaluate("n=>getComputedStyle(n,'::after').animationPlayState") == 'paused'
    passed('Home expertise diagram responds to selection and pauses offscreen')

    page.emulate_media(reduced_motion='reduce')
    page.goto(base + '/about', wait_until='networkidle')
    assert page.locator('h1 .headline-unit').first.evaluate("n=>getComputedStyle(n).animationName") == 'none'
    assert page.locator('h1').inner_text().strip()
    page.goto(base, wait_until='networkidle')
    assert page.locator('.craft-diagram').evaluate("n=>getComputedStyle(n).animationName") == 'none'
    assert page.locator('.selected-project').first.evaluate("n=>getComputedStyle(n).translate") == 'none'
    passed('Reduced motion keeps text and content visible without decorative animations')
    browser.close()

assert not errors, errors
Path('docs/localized-motion-review.json').write_text(json.dumps({'checks': checks, 'errors': errors}, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'{len(checks)} interaction checks; no runtime errors.')
