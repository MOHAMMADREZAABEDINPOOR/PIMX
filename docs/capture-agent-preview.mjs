// Run from the portfolio checkout with the updated sibling PIMX_AGENT_BOT present.
// The bot preview uses in-memory fixtures, without Telegram or production data.
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { chromium } from '../../PIMX_AGENT_BOT/node_modules/@playwright/test/index.mjs';
import { startPreview } from '../../PIMX_AGENT_BOT/tools/ui-preview.mjs';

const preview = await startPreview();
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1919, height: 943 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${preview.url}/app`, { waitUntil: 'domcontentloaded' });
  await page.locator('.studio-home').waitFor();
  await page.locator('#languageToggle').click();
  await page.waitForFunction(() => document.documentElement.lang === 'en' && !window.pxLanguageSwitching);
  await page.locator('.studio-home').waitFor();
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator('html').getAttribute('dir'), 'ltr');
  assert.match(await page.locator('.studio-home').innerText(), /Start chatting/);
  for (const theme of ['dark', 'light']) {
    await page.evaluate(theme => window.pxSetTheme(theme), theme);
    await page.waitForFunction(theme => document.documentElement.getAttribute('data-px-theme') === theme, theme);
    await page.waitForTimeout(3500); // Let the theme notification disappear.
    const filename = theme === 'dark' ? 'github-pimx-agent-bot.png' : 'github-pimx-agent-bot-light.png';
    await page.screenshot({ path: fileURLToPath(new URL(`../public/project-previews/${filename}`, import.meta.url)), animations: 'disabled' });
    console.log(`Captured English bot preview: ${theme}`);
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
  await preview.close();
}
