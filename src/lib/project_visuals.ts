/** Only files that exist in public/project-previews belong here. */
export const projectScreenshots: Record<string, string> = Object.fromEntries([
  'github-pimx-agent', 'github-pimx-morph', 'pimx-veil', 'pimx-node', 'pimx-moji',
  'github-pimxsats', 'pimx-wide', 'github-pimx-eltex', 'github-pimx-weather',
  'pimx-pass', 'github-pimx-portal', 'github-pimx-fail',
  'github-import-export-company', 'soheil-portal', 'github-pimx-swap',
  'github-shop', 'github-shop2', 'github-shop3',
].map(id => [id, `/project-previews/${id}.jpg`]));

export const hasProjectScreenshot = (id: string) => Object.prototype.hasOwnProperty.call(projectScreenshots, id);

/** Project captures selected to match the portfolio theme. */
export const themedProjectScreenshots: Record<string, { light: string; dark: string }> = {
  'github-pimx-swap': { light: '/project-previews/github-pimx-swap.png', dark: '/project-previews/github-pimx-swap-dark.png' },
  'github-pimx-fail': { light: '/project-previews/github-pimx-fail-light.png', dark: '/project-previews/github-pimx-fail-dark.png' },
  'github-pimx-weather': { light: '/project-previews/github-pimx-weather-light.png', dark: '/project-previews/github-pimx-weather-dark.png' },
  'soheil-portal': { light: projectScreenshots['soheil-portal'], dark: '/project-previews/soheil-portal-dark.png' },
  'github-pimx-portal': { light: projectScreenshots['github-pimx-portal'], dark: '/project-previews/github-pimx-portal-dark.png' },
  'github-pimx-agent-bot': { light: '/project-previews/github-pimx-agent-bot-light.png', dark: '/project-previews/github-pimx-agent-bot.png' },
  'github-pimx-support': { light: '/project-previews/github-pimx-support-light.png', dark: '/project-previews/github-pimx-support-dark.png' },
  'github-pimx-agent': { light: '/project-previews/github-pimx-agent-light.png', dark: projectScreenshots['github-pimx-agent'] },
  'github-pimx-morph': { light: '/project-previews/github-pimx-morph-light.png', dark: projectScreenshots['github-pimx-morph'] },
  'pimx-veil': { light: projectScreenshots['pimx-veil'], dark: '/project-previews/pimx-veil-dark.png' },
  'pimx-node': { light: '/project-previews/pimx-node-light.png', dark: projectScreenshots['pimx-node'] },
  'pimx-moji': { light: projectScreenshots['pimx-moji'], dark: '/project-previews/pimx-moji-dark.png' },
  'pimx-wide': { light: '/project-previews/pimx-wide-light.png', dark: projectScreenshots['pimx-wide'] },
  'github-pimx-eltex': { light: projectScreenshots['github-pimx-eltex'], dark: '/project-previews/github-pimx-eltex-dark.png' },
  'pimx-pass': { light: projectScreenshots['pimx-pass'], dark: '/project-previews/pimx-pass-dark.png' },
  'github-shop': { light: projectScreenshots['github-shop'], dark: '/project-previews/github-shop-dark.png' },
  'github-shop2': { light: projectScreenshots['github-shop2'], dark: '/project-previews/github-shop2-dark.png' },
  'github-shop3': { light: projectScreenshots['github-shop3'], dark: '/project-previews/github-shop3-dark.png' },
};
projectScreenshots['github-pimx-support'] = themedProjectScreenshots['github-pimx-support'].dark;
projectScreenshots['github-pimx-agent-bot'] = '/project-previews/github-pimx-agent-bot.png';
projectScreenshots['github-pimx-fail'] = themedProjectScreenshots['github-pimx-fail'].dark;
projectScreenshots['github-pimx-weather'] = themedProjectScreenshots['github-pimx-weather'].dark;
projectScreenshots['github-pimx-swap'] = '/project-previews/github-pimx-swap.png';

export function getProjectScreenshot(id: string, theme: 'light' | 'dark', fallback?: string) {
  return themedProjectScreenshots[id]?.[theme] || projectScreenshots[id] || fallback;
}
