"""Verify first paint, cold route loading, refresh and pointer-driven home surfaces."""
import asyncio, json, math, os
from pathlib import Path
from playwright.async_api import async_playwright

base = os.environ.get('PORTFOLIO_TEST_URL', 'http://127.0.0.1:3001')
output = Path('docs/responsive-review')
checks, errors = [], []

def passed(name, **details):
    checks.append({'check': name, 'passed': True, **details})
    print('PASS:', name, flush=True)

async def run():
    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        context = await browser.new_context(viewport={'width':1650,'height':950})
        await context.add_init_script("localStorage.setItem('mra_portfolio_lang','en');localStorage.setItem('mra_portfolio_theme','dark')")
        page = await context.new_page()
        page.on('pageerror', lambda error: errors.append(str(error)))
        async def slow_main(route):
            await asyncio.sleep(1.5)
            await route.continue_()
        await page.route('**/assets/index-*.js', slow_main)
        await page.goto(base, wait_until='commit')
        await page.locator('#startup-portal').wait_for(state='visible')
        assert await page.locator('#root').inner_text() == ''
        assert await page.locator('#startup-portal strong').inner_text() == 'PIMX'
        await page.screenshot(path=str(output/'initial-loading-before-react.png'))
        passed('Same portal artwork is visible before the application JavaScript arrives')
        await page.locator('#startup-portal').wait_for(state='detached')
        await page.locator('.transition-portal').wait_for(state='visible')
        assert await page.locator('.transition-portal').count() == 1
        await page.locator('.transition-portal').wait_for(state='detached')
        await page.wait_for_load_state('networkidle')
        await page.wait_for_timeout(700)
        await page.screenshot(path=str(output/'hero-redesign-final.png'))
        passed('Startup portal hands off to React without duplicate overlays and exits')
        await page.reload(wait_until='commit')
        await page.locator('#startup-portal').wait_for(state='visible')
        await page.locator('#startup-portal').wait_for(state='detached')
        await page.locator('.transition-portal').wait_for(state='detached')
        passed('Refresh replays the entry portal')
        await page.unroute('**/assets/index-*.js', slow_main)

        async def slow_about(route):
            await asyncio.sleep(3)
            await route.continue_()
        await page.route('**/assets/About-*.js', slow_about)
        await page.goto(base+'/about', wait_until='commit')
        await page.locator('.transition-portal:not(#startup-portal)').wait_for(state='visible')
        assert await page.locator('.transition-portal strong').inner_text() == 'HUMAN'
        await page.wait_for_timeout(1400)
        assert await page.locator('.transition-portal').count() == 1
        assert await page.locator('.transition-portal .portal-message strong').inner_text() == 'HUMAN'
        await page.locator('.about-page').wait_for(state='visible')
        await page.locator('.transition-portal').wait_for(state='detached')
        await page.unroute('**/assets/About-*.js', slow_about)
        passed('Direct entry to a cold route retains its portal until the route is ready')
        await page.locator('nav a').filter(has_text='Work').first.click()
        await page.locator('.transition-portal').wait_for(state='visible')
        assert await page.locator('.transition-portal strong').inner_text() == 'WORLDS'
        await page.locator('.transition-portal').wait_for(state='detached')
        passed('Existing navigation portal still plays with the matching page identity')
        await page.goto(base,wait_until='networkidle')
        await page.locator('.transition-portal').wait_for(state='detached')
        showcase=page.locator('.home-showcase')
        for i, name in enumerate(['PIMX Agent','PIMXSATS','PIMX Swap']):
            await showcase.locator('.showcase-selector button').nth(i).click()
            await page.wait_for_timeout(750)
            assert await showcase.locator('.showcase-details h2').inner_text() == name+'.'
            assert await showcase.locator('.showcase-selector button').nth(i).get_attribute('aria-pressed') == 'true'
            image=showcase.locator('.showcase-aperture img')
            assert await image.evaluate('(img)=>img.complete && img.naturalWidth>0')
        passed('All three hero exhibits switch artwork, links and selection state')
        await showcase.locator('.showcase-selector button').first.click()
        await page.wait_for_timeout(750)

        card=page.locator('.selected-project').first
        await card.scroll_into_view_if_needed()
        await page.wait_for_timeout(500)
        preview=card.locator('.project-preview-link')
        box=await preview.bounding_box()
        await page.mouse.move(box['x']+box['width']*.8,box['y']+box['height']*.35)
        await page.wait_for_timeout(900)
        data=await card.evaluate('''node=>({active:node.dataset.pointer,tilt:getComputedStyle(node.querySelector('.project-preview-link')).transform,scale:getComputedStyle(node.querySelector('.study-browser-window')).scale,ticket:getComputedStyle(node.querySelector('.project-hover-ticket')).opacity,depth:getComputedStyle(node.querySelector('.study-floating-spec')).translate})''')
        assert data['active']=='true' and data['tilt']!='none' and float(data['scale'])>1.06 and float(data['ticket'])>.95, data
        await page.screenshot(path=str(output/'project-hover-final.png'))
        await page.mouse.move(20,120)
        await page.wait_for_timeout(900)
        assert await card.get_attribute('data-pointer')=='false'
        assert await card.locator('.study-browser-window').evaluate('(e)=>getComputedStyle(e).scale') in ['none','1']
        await preview.focus()
        await page.wait_for_timeout(600)
        assert float(await card.locator('.project-hover-ticket').evaluate('(e)=>getComputedStyle(e).opacity'))>.95
        passed('Hover opens layered depth and ticket; pointer exit resets; keyboard focus reveals the action', **data)

        reduced=await browser.new_context(viewport={'width':300,'height':850},reduced_motion='reduce')
        small=await reduced.new_page()
        small.on('pageerror', lambda error: errors.append(str(error)))
        await small.goto(base,wait_until='networkidle')
        await small.locator('.transition-portal').wait_for(state='detached')
        await small.locator('.home-showcase').scroll_into_view_if_needed()
        await small.screenshot(path=str(output/'hero-redesign-final-300.png'))
        await small.locator('.showcase-aperture').hover()
        assert await small.locator('.showcase-image-shell').evaluate('(e)=>getComputedStyle(e).transform')=='none'
        assert await small.evaluate('document.documentElement.scrollWidth')==300
        passed('300px layout and reduced motion retain readable content and static surfaces')
        await browser.close()
    assert not errors, errors
    Path('docs/home-redesign-review.json').write_text(json.dumps({'checks':checks,'errors':errors},indent=2),encoding='utf-8')

asyncio.run(run())
