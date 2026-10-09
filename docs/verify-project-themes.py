"""Check real browser theme toggles, image decoding, links and narrow layout."""
import json, os, subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright

base = os.environ.get('PORTFOLIO_TEST_URL', 'http://127.0.0.1:3001')
data = json.loads(subprocess.check_output(['node', '--import', 'tsx', '--input-type=module', '-e', "import {themedProjectScreenshots} from './src/lib/project_visuals.ts';import {getTranslatedProjects} from './src/lib/project_translations.ts';console.log(JSON.stringify({pairs:themedProjectScreenshots,projects:getTranslatedProjects('en')}));"], encoding='utf-8'))
projects = {p['id']: p for p in data['projects']}
assert 'github-pimx' not in projects
checks, errors = [], []
with sync_playwright() as pw:
    browser = pw.chromium.launch()
    context = browser.new_context(viewport={'width': 1440, 'height': 1000}, reduced_motion='reduce')
    context.add_init_script("localStorage.setItem('mra_portfolio_lang','en');localStorage.setItem('mra_portfolio_theme','dark')")
    page = context.new_page()
    page.on('pageerror', lambda e: errors.append(str(e)))
    def toggle(theme):
        button = page.locator('button[title="' + ('Dark theme' if theme == 'dark' else 'Light theme') + '"]')
        if button.count():
            button.click()
        page.wait_for_timeout(150)
    page.goto(base, wait_until='networkidle')
    for theme in ['dark', 'light']:
        toggle(theme)
        assert page.locator('.showcase-image-shell img').get_attribute('src') == data['pairs']['github-pimx-agent'][theme]
    checks.append('Home hero theme switch')
    page.goto(base + '/project', wait_until='networkidle')
    assert page.get_by_role('button', name='Select Import-Export-Company', exact=True).count() == 0
    assert page.get_by_role('button', name='Select PIMX', exact=True).count() == 0
    assert page.get_by_role('button', name='Show Import-Export-Company', exact=True).count() == 0
    assert page.get_by_role('button', name='Show PIMX', exact=True).count() == 0
    assert page.locator('.dossier-progress button').count() == 13
    checks.append('Exhibition excludes Import-Export-Company and PIMX and has 13 entries')
    search = page.locator('input[type="search"]')
    assert page.locator('#project-archive [data-sculpture-id="github-pimx"]').count() == 0
    checks.append('PIMX removed from the catalog and project archive')
    toggle('light')
    search.fill(projects['github-pimx-swap']['title'])
    swap_image = page.locator('#project-archive [data-sculpture-id="github-pimx-swap"] .study-browser-window img')
    swap_image.scroll_into_view_if_needed()
    assert swap_image.get_attribute('src') == data['pairs']['github-pimx-swap']['light']
    swap_image.evaluate('(img) => img.decode()')
    checks.append('Updated owner-supplied PIMXSWAP image')
    for project_id, pair in data['pairs'].items():
        search.fill(projects[project_id]['title'])
        card = page.locator('#project-archive [data-sculpture-id="' + project_id + '"]')
        card.scroll_into_view_if_needed()
        for theme in ['dark', 'light']:
            toggle(theme)
            img = card.locator('.study-browser-window img')
            assert img.get_attribute('src') == pair[theme], (project_id, theme)
            img.scroll_into_view_if_needed()
            img.evaluate('(img) => img.decode()')
            checks.append(project_id + ' ' + theme)
        assert card.count() == 1
    search.fill('PIMX Support')
    page.get_by_role('button', name='Project details: PIMX Support', exact=True).click()
    dialog = page.locator('dialog')
    dialog.wait_for()
    for url in ['https://github.com/MOHAMMADREZAABEDINPOOR/PIMX_SUPPORT', 'https://pimxsupport.pages.dev/']:
        assert dialog.locator('a[href="' + url + '"]').count() > 0, url
    checks.append('Support source and website links')
    page.keyboard.press('Escape')
    page.set_viewport_size({'width': 300, 'height': 850})
    search.fill('PIMX Agent Bot')
    page.wait_for_timeout(200)
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    checks.append('New bot card fits 300px')
    browser.close()
assert not errors, errors
Path('docs/project-theme-review.json').write_text(json.dumps({'checks': checks, 'runtimeErrors': errors, 'pairedProjects': len(data['pairs'])}, indent=2), encoding='utf-8')
print('PASS:', len(checks), 'browser checks; no runtime errors')
