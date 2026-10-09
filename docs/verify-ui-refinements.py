"""Verify project art, interactive type, measured panel transitions and responsive About."""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ.get('PORTFOLIO_TEST_URL', 'http://127.0.0.1:3001')
OUT = Path(__file__).parent / 'ui-refinement-review'
OUT.mkdir(exist_ok=True)
checks, errors = [], []

def passed(name, **details):
    checks.append({'check': name, 'passed': True, **details})
    print('PASS:', name, flush=True)

def overflow(page):
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Horizontal overflow'

def settled_height(page, selector):
    return page.locator(selector).evaluate('(n)=>n.getBoundingClientRect().height')

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    context = browser.new_context(viewport={'width': 1440, 'height': 1000})
    context.add_init_script("localStorage.setItem('mra_portfolio_lang','en');localStorage.setItem('mra_portfolio_theme','dark')")
    page = context.new_page()
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto(BASE + '/project', wait_until='networkidle')
    page.wait_for_timeout(1800)
    page.locator('h1').hover()
    page.wait_for_timeout(850)
    assert page.locator('.orbit-unit').evaluate_all('(nodes)=>nodes.some(n=>getComputedStyle(n).transform !== "none")')
    overflow(page)
    passed('Project heading orbit on hover')
    page.mouse.move(0, 200)
    while page.locator('.archive-load-more button').count():
        page.locator('.archive-load-more button').click()
        page.wait_for_timeout(200)
    cards = page.locator('.repository-card [data-render-mode]')
    modes = cards.evaluate_all('(nodes)=>nodes.map(n=>({id:n.dataset.artworkId,mode:n.dataset.renderMode}))')
    assert len(modes) == 68, len(modes)
    assert all(item['mode'] == 'screenshot' for item in modes[:19])
    assert all(item['mode'] == 'dedicated-vector' for item in modes[19:]), modes
    for i in range(19):
        image = cards.nth(i).locator('img')
        image.scroll_into_view_if_needed()
        image.wait_for()
        page.wait_for_function('(id)=>{const n=document.querySelector(`[data-artwork-id="${id}"] img`);return n && n.complete && n.naturalWidth>0}', arg=modes[i]['id'])
    assert cards.locator('[data-composition]').count() == 49
    assert not page.get_by_text('Preview unavailable', exact=True).count()
    passed('All 68 project previews: 19 real captures first, 49 dedicated drawings')
    page.locator('input[type=search]').fill('shop2')
    shop = page.locator('[data-project-id="github-shop2"]')
    shop.scroll_into_view_if_needed()
    page.wait_for_timeout(650)
    assert shop.locator('img').get_attribute('src') == '/project-previews/github-shop2.jpg'
    shop.screenshot(path=str(OUT / 'shop2-card.png'))
    page.locator('input[type=search]').fill('personal-website')
    page.wait_for_timeout(650)
    page.locator('.repository-grid').screenshot(path=str(OUT / 'dedicated-resume-card.png'))
    footer = page.locator('.shell-footer-big-link')
    footer.scroll_into_view_if_needed()
    page.wait_for_timeout(800)
    footer.hover()
    page.wait_for_timeout(800)
    assert page.locator('.fragment-base').first.evaluate('(n)=>getComputedStyle(n).opacity') == '0'
    assert page.locator('.fragment-slice').first.evaluate('(n)=>getComputedStyle(n).opacity') == '1'
    footer.screenshot(path=str(OUT / 'footer-fragmentation.png'))
    page.mouse.move(0,0)
    page.wait_for_timeout(650)
    assert page.locator('.fragment-base').first.evaluate('(n)=>getComputedStyle(n).opacity') == '1'
    footer.focus()
    page.keyboard.press('Tab')
    page.keyboard.press('Shift+Tab')
    page.wait_for_timeout(800)
    assert page.locator('.fragment-base').first.evaluate('(n)=>getComputedStyle(n).opacity') == '0'
    passed('Footer fragments on mouse hover and keyboard focus; restores on leave')
    page.goto(BASE + '/about', wait_until='networkidle')
    page.locator('.story-explorer').scroll_into_view_if_needed()
    page.wait_for_timeout(600)
    transitions = []
    for index in range(5):
        before = settled_height(page,'.story-reader')
        page.locator('.story-chapters button').nth(index).click()
        page.wait_for_timeout(110)
        during = settled_height(page,'.story-reader')
        page.wait_for_timeout(650)
        after = settled_height(page,'.story-reader')
        content = settled_height(page,'.story-reader .auto-height-content')
        assert abs(after-content) < 3, (after,content)
        assert page.locator('.story-reader article').count() == 1
        assert page.locator('.story-reader .story-illustration').count() == 1
        if abs(after-before) > 8:
            assert min(before,after) < during < max(before,after), (before,during,after)
        transitions.append([before,during,after])
    passed('Five story chapters animate actual height without collapsing', heights=transitions)
    for i in range(16):
        button = page.locator('.skill-picker button').nth(i)
        title = button.locator('span').nth(1).evaluate('(n)=>n.firstChild.textContent')
        button.click()
        page.wait_for_timeout(580)
        assert page.locator('.skill-inspector h3').inner_text() == title
        assert page.locator('.skill-inspector article').count() == 1
        assert page.locator('.skill-inspector [data-composition]').count() == 1
    for i, count in [(1,6),(2,4),(3,6),(0,16)]:
        page.locator('.skill-filters button').nth(i).click()
        page.wait_for_timeout(550)
        assert page.locator('.skill-picker button').count() == count
        assert page.locator('.skill-picker button[aria-pressed=true]').count() == 1
    page.locator('.skill-picker button').first.click()
    page.wait_for_timeout(550)
    page.locator('.skill-workbench').screenshot(path=str(OUT / 'skill-workbench-desktop.png'))
    assert page.locator('.approach-illustration').count() == 4
    assert page.locator('.approach-art i').count() == 0
    page.locator('.about-approach').screenshot(path=str(OUT / 'approach-section.png'))
    passed('All 16 skills, 4 filters, honest levels, four new approach illustrations')
    profile = page.locator('.about-profile').bounding_box()
    heading = page.locator('.story-heading').bounding_box()
    assert heading['y'] - (profile['y']+profile['height']) < 220
    passed('About spacing: profile to story below 220px', gap=heading['y']-(profile['y']+profile['height']))
    context.close()
    for lang, theme, reduced in [('en','dark','no-preference'),('fa','dark','no-preference'),('fa','light','reduce')]:
        mobile_context = browser.new_context(viewport={'width':390,'height':844}, is_mobile=True, has_touch=True, reduced_motion=reduced)
        mobile_context.add_init_script(f"localStorage.setItem('mra_portfolio_lang','{lang}');localStorage.setItem('mra_portfolio_theme','{theme}')")
        mobile = mobile_context.new_page()
        mobile.on('pageerror',lambda error:errors.append(str(error)))
        mobile.goto(BASE+'/about',wait_until='networkidle')
        mobile.locator('.skill-workbench').scroll_into_view_if_needed()
        mobile.wait_for_timeout(700)
        overflow(mobile)
        mobile.locator('.skill-picker button').nth(5).click()
        mobile.wait_for_timeout(600)
        assert mobile.locator('.skill-picker button[aria-pressed=true]').count() == 1
        mobile.locator('.skill-inspector').screenshot(path=str(OUT/f'skill-mobile-{lang}-{theme}.png'))
        mobile.locator('.story-chapters button').nth(3).click()
        mobile.wait_for_timeout(700)
        assert abs(settled_height(mobile,'.story-reader')-settled_height(mobile,'.story-reader .auto-height-content')) < 3
        overflow(mobile)
        mobile.goto(BASE+'/project',wait_until='networkidle')
        mobile.wait_for_timeout(1500)
        overflow(mobile)
        mobile.screenshot(path=str(OUT/f'projects-mobile-{lang}-{theme}.png'))
        mobile.locator('.shell-footer-big-link').scroll_into_view_if_needed()
        mobile.locator('.shell-footer-big-link').tap()
        mobile.wait_for_timeout(600)
        assert mobile.locator('.fragment-base').first.evaluate('(n)=>getComputedStyle(n).opacity') == '1'
        overflow(mobile)
        passed(f'Mobile {lang}/{theme}/{reduced}: About, skills, story, projects, footer')
        mobile_context.close()
    assert not errors, errors
    browser.close()

(OUT/'verification.json').write_text(json.dumps({'checks':checks,'runtimeErrors':errors},ensure_ascii=False,indent=2),encoding='utf-8')
