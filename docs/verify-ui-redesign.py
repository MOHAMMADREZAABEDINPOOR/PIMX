"""UI regression: run with the dev server on :3000 and Python Playwright installed."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = 'http://127.0.0.1:3000'
OUTPUT = Path(__file__).parent / 'ui-redesign-review'
OUTPUT.mkdir(exist_ok=True)
ROUTES = [('home', '/'), ('about', '/about'), ('projects', '/project'),
          ('playground', '/playground'), ('resume', '/resume'), ('contact', '/contact')]
results = []

def readable(page, selector):
    target = page.locator(selector)
    target.scroll_into_view_if_needed()
    page.wait_for_timeout(1600)
    words = target.locator('.kinetic-word').evaluate_all('''words => words.map(word => {
      const s = getComputedStyle(word), box = word.getBoundingClientRect();
      const mask = word.parentElement.getBoundingClientRect();
      let opacity = 1;
      for (let node = word; node; node = node.parentElement) opacity *= Number(getComputedStyle(node).opacity);
      return {text: word.textContent, opacity, filter: s.filter, clip: s.clipPath,
        inside: box.width > 0 && box.height > 0 && box.bottom > mask.top && box.top < mask.bottom};
    })''')
    assert words and all(w['opacity'] > .99 and w['inside'] and w['filter'] in ['none', 'blur(0px)'] and w['clip'] in ['none', 'inset(0px)'] for w in words), words
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Horizontal overflow'
    return words

with sync_playwright() as p:
    browser = p.chromium.launch()
    errors = []
    desktop = browser.new_context(viewport={'width': 1440, 'height': 1000})
    desktop.add_init_script("localStorage.setItem('mra_portfolio_lang','en');localStorage.setItem('mra_portfolio_theme','dark');")
    page = desktop.new_page()
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto(BASE, wait_until='networkidle')
    page.evaluate("window.__redesignDocument = 'same-document'")
    effects = set()
    for name, path in ROUTES:
        if name != 'home':
            page.locator(f'a[href="{path}"]:visible').first.click()
        section = f'.manifesto-{name}'
        page.locator(section).wait_for()
        words = readable(page, section)
        assert page.evaluate("window.__redesignDocument === 'same-document'"), 'Unexpected full reload'
        effects.add(page.locator(f'{section} .kinetic-text').first.get_attribute('class'))
        page.locator(section).screenshot(path=str(OUTPUT / f'{name}-manifesto.png'))
        results.append({'check': 'SPA navigation + reveal', 'page': name, 'words': len(words), 'passed': True})
        print(f'PASS: SPA {name}', flush=True)
    assert len(effects) == 6, effects
    page.go_back()
    page.locator('.manifesto-resume').wait_for()
    readable(page, '.manifesto-resume')
    page.go_forward()
    page.locator('.manifesto-contact').wait_for()
    readable(page, '.manifesto-contact')
    results.append({'check': 'Browser back / forward', 'passed': True})
    for name, path in ROUTES:
        page.goto(BASE + path, wait_until='networkidle')
        readable(page, f'.manifesto-{name}')
        results.append({'check': 'Direct route load + reveal', 'page': name, 'passed': True})
        print(f'PASS: direct {name}', flush=True)

    page.goto(BASE, wait_until='networkidle')
    page.screenshot(path=str(OUTPUT / 'home-desktop.png'))
    for index in range(3):
        page.locator('.showcase-tabs button').nth(index).click()
        page.wait_for_timeout(650)
        image = page.locator('.showcase-product-frame img')
        assert image.evaluate('(img) => img.complete && img.naturalWidth > 0')
        assert page.locator('.showcase-tabs button[aria-pressed=true]').count() == 1
    for index in range(3):
        button = page.locator('.service-row > button').nth(index)
        if button.get_attribute('aria-expanded') != 'true':
            button.click()
        page.wait_for_timeout(500)
        assert button.get_attribute('aria-expanded') == 'true'
        assert page.locator('.craft-console').get_attribute('data-service') == str(index)
        assert page.locator(f'#service-details-{index}').get_attribute('aria-hidden') == 'false'
    for selector, name in [('.home-process', 'process'), ('.expertise-section', 'expertise'), ('.home-about', 'about')]:
        page.locator(selector).scroll_into_view_if_needed()
        page.wait_for_timeout(1600)
        page.locator(selector).screenshot(path=str(OUTPUT / f'home-{name}.png'))
    readable(page, '.home-process')
    results.append({'check': 'All showcase tabs, all service panels, process text', 'passed': True})

    page.goto(BASE + '/project', wait_until='networkidle')
    page.locator('input[type="search"]').fill('shop3')
    shop = page.locator('[data-project-id="github-shop3"] img')
    shop.scroll_into_view_if_needed()
    page.wait_for_timeout(500)
    assert shop.get_attribute('src') == '/project-previews/github-shop3.jpg'
    assert shop.evaluate('(img) => img.complete && img.naturalWidth > 0')
    results.append({'check': 'shop3 correct preview asset', 'passed': True})

    for lang, theme, reduced in [('en', 'dark', 'no-preference'), ('fa', 'dark', 'no-preference'), ('fa', 'light', 'reduce')]:
        context = browser.new_context(viewport={'width': 390, 'height': 844}, reduced_motion=reduced, is_mobile=True, has_touch=True)
        context.add_init_script(f"localStorage.setItem('mra_portfolio_lang','{lang}');localStorage.setItem('mra_portfolio_theme','{theme}');")
        mobile = context.new_page()
        mobile.on('pageerror', lambda error: errors.append(str(error)))
        mobile.goto(BASE, wait_until='networkidle')
        mobile.locator('.home-showcase').wait_for()
        mobile.wait_for_timeout(1300)
        mobile.screenshot(path=str(OUTPUT / f'home-mobile-{lang}-{theme}.png'))
        readable(mobile, '.home-process')
        mobile.locator('.home-process').screenshot(path=str(OUTPUT / f'process-mobile-{lang}-{theme}.png'))
        for name, path in ROUTES:
            if name != 'home':
                mobile.evaluate('''path => {history.pushState({}, '', path); dispatchEvent(new PopStateEvent('popstate'));}''', path)
            mobile.locator(f'.manifesto-{name}').wait_for()
            readable(mobile, f'.manifesto-{name}')
            if reduced == 'reduce':
                assert mobile.locator('.route-manifesto .kinetic-word').first.evaluate('e=>getComputedStyle(e).animationName') == 'none'
        results.append({'check': 'Mobile: all six routes', 'language': lang, 'theme': theme, 'motion': reduced, 'passed': True})
        print(f'PASS: mobile {lang} {theme} {reduced}', flush=True)
        context.close()

    # A missed observer callback must never leave text hidden indefinitely.
    context = browser.new_context(viewport={'width': 1440, 'height': 1000})
    context.add_init_script("localStorage.setItem('mra_portfolio_lang','en');window.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};")
    fallback = context.new_page()
    fallback.goto(BASE, wait_until='networkidle')
    readable(fallback, '.route-manifesto')
    readable(fallback, '.home-process')
    results.append({'check': 'Readable with missed IntersectionObserver callbacks', 'passed': True})
    assert not errors, errors
    browser.close()

report = {'results': results, 'runtimeErrors': errors}
(OUTPUT / 'verification.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))
