/** Art direction is deliberately assigned to each real project, rather than derived from a category. */
export interface ProjectSculptureProfile {
  accent: string;
  secondary: string;
  title: string;
  signature: string;
  backdrop: string;
}

const art = (title: string, signature: string, accent: string, secondary: string, backdrop: string): ProjectSculptureProfile => ({ title, signature, accent, secondary, backdrop });

export const projectSculptureProfiles: Record<string, ProjectSculptureProfile> = {
  'github-pimx-support': art('SUPPORT', 'A little heart / support for the next idea', '#a5c096', '#ffb583', '#183329'),
  'github-pimx-agent-bot': art('AGENT BOT', 'Telegram conversations / connected models', '#8da2ff', '#85e2da', '#171f35'),
  'github-pimx-agent': art('AGENT', 'Neural core / orbiting tools', '#8da2ff', '#f79eff', '#17132c'),
  'github-pimx-morph': art('MORPH', 'Matter transforming between formats', '#ff8467', '#ffdf7f', '#2a1714'),
  'pimx-veil': art('VEIL', 'A concealed payload inside its carrier', '#d3b7ff', '#7df2d4', '#19142b'),
  'pimx-node': art('NODE', 'Two endpoints / travelling data packets', '#54e8ee', '#5ca0ff', '#102427'),
  'pimx-moji': art('MOJI', 'An expressive character built from voxels', '#ffa8dd', '#ffe48c', '#291a24'),
  'github-pimxsats': art('SATS', 'Earth / orbital satellite constellation', '#64afff', '#ffcc70', '#101d35'),
  'github-pimx-swap': art('SWAP', 'Two keyboard layouts / one physical key', '#ffb355', '#8fe2ff', '#261c12'),
  'github-pimxdash': art('DASH', 'A miniature browser command centre', '#a7f37d', '#88d7ff', '#172318'),
  'pimx-wide': art('WIDE', 'A rotating cipher lock / encrypted fragments', '#efcf61', '#fa91b6', '#292310'),
  'github-pimx-eltex': art('ELTEX', 'A cinematic strip / illuminated playhead', '#ff748e', '#b8a0ff', '#2a131e'),
  'github-pimx-weather': art('WEATHER', 'Sun / cloud / falling rain', '#ffdb65', '#71cbff', '#182735'),
  'pimx-pass': art('DNS', 'A resolver tree / a moving lookup', '#79efb0', '#68adff', '#12291e'),
  'github-pimx-portal': art('PORTAL', 'An architectural gateway to an ecosystem', '#b8a0ff', '#8ceadd', '#21172e'),
  'soheil-portal': art('SOHEIL', 'A portrait pavilion / cascading personal links', '#f6c296', '#80d4d9', '#30241e'),
  'github-pimx-fail': art('FAIL', 'A fractured tower / a recovered blueprint', '#ff8369', '#dbc8b1', '#2c1914'),
  'github-pimx': art('PIMX', 'A sculptural monogram / a living portfolio', '#e8fa72', '#faf5e2', '#242715'),
  'github-import-export-company': art('TRADE', 'Cargo ship / containers / delivery route', '#ffbd65', '#74c9d8', '#272215'),
  'github-3d-animated-interactive-portfolio': art('DIMENSION', 'A wireframe stage / orbiting camera', '#bd98ff', '#81f1ff', '#22172f'),
  'github-bot': art('BOT', 'An assistant head / message memory', '#80e7cf', '#abb6ff', '#172b25'),
  'github-c-mn': art('STREAM', 'Characters entering a file stream', '#ffcc74', '#89c1ff', '#2c2317'),
  'github-chat': art('CHAT', 'Interleaved conversation bubbles', '#d299ff', '#f7a78f', '#281a2d'),
  'github-chess-timer-with-python': art('CHESS', 'Two clocks / one alternating turn', '#f2e7d2', '#ffbd67', '#28251f'),
  'github-clock': art('CLOCK', 'Mechanical hands / a ticking second', '#72dbe9', '#fcac86', '#142829'),
  'github-coursera': art('COURSE', 'Responsive layouts / device breakpoints', '#84b9ff', '#f5cb80', '#172538'),
  'github-cpp': art('MATRIX', 'A 3 × 3 matrix / highlighted column', '#9be18b', '#a9a4ff', '#192819'),
  'github-email-generator': art('INBOX', 'Disposable envelopes / extracted codes', '#ffc899', '#fc9dcd', '#2c211c'),
  'github-exam': art('EXAM', 'A name / a persisted identity card', '#9de7df', '#d2b58c', '#1b2a28'),
  'github-gussing-number': art('GUESS', 'A tumbling die / a target number', '#ffd268', '#ff826b', '#302719'),
  'github-gussing-number-with-js': art('HIGH / LOW', 'A number rail / searching arrows', '#f898db', '#a9c3ff', '#2d1b2b'),
  'github-mcino-introduction-to-git-and-github': art('BRANCH', 'A commit graph / a merged contribution', '#ffae7b', '#ad99ff', '#2e2018'),
  'mml-wallet-bot': art('WALLET', 'A wallet / collected address tokens', '#eac866', '#8af4bb', '#292515'),
  'github-mohammadrezaabedinpoor': art('PROFILE', 'An identity beacon / an open source orbit', '#d9ed7f', '#adc5ff', '#272b19'),
  'github-my-project': art('FILE I/O', 'An input funnel / counted integer blocks', '#93cbff', '#f2b48c', '#172539'),
  'github-open-random-window': art('WINDOWS', 'Ten floating windows / random positions', '#ec9ece', '#b8db7b', '#2c1b28'),
  'personal-resume-gate': art('RESUME', 'A folded document / a certificate seal', '#e8ddbd', '#7dc8ea', '#28251e'),
  'pimx-pass-bot': art('SCAN', 'A scanning dish / validated network nodes', '#92f0ae', '#65ceff', '#162a1a'),
  'github-pimx-pass-panel': art('CONTROL', 'A server cabinet / a tunnel connection', '#6dc5ff', '#e3a1ff', '#15253a'),
  'github-pimx-personal': art('PROXY', 'A geodesic globe / routed server paths', '#7cdbd0', '#ffbb88', '#152b29'),
  'github-pimx-planner': art('PLAN', 'A calendar / a moving task timeline', '#b8e892', '#ffca93', '#242b18'),
  'pimx-play-bot': art('PLAY', 'An arcade cabinet / discovery cartridge', '#c498ff', '#ffbd73', '#24172f'),
  'pimx-sonic-bot': art('SONIC', 'A vinyl record / reactive waveform', '#ff95bd', '#99ecdd', '#2c1726'),
  'github-pimx-save-bot': art('SAVE', 'A media mixing desk / extraction channels', '#aaa4ff', '#f8b164', '#1f1a32'),
  'github-pwa-chatbot': art('PWA', 'A phone / offline conversation cache', '#8fdcf4', '#bb97ff', '#172636'),
  'github-shop': art('SHOP', 'A storefront / a rolling shopping cart', '#ffae85', '#a7e6a5', '#2c211c'),
  'github-shop2': art('SHOP II', 'A retail display / ascending order pipeline', '#fb9a95', '#ffdc7d', '#2c1c1b'),
  'github-shop3': art('SHOP III', 'A warehouse / parcels on a conveyor', '#bdabff', '#8cd8ce', '#241d35'),
  'github-spam-with-pyautogui': art('KEY EVENTS', 'A keyboard / a moving automation cursor', '#84d5df', '#f4b190', '#172a2c'),
  'github-sqlalchemy': art('ORM', 'Database cylinders / connected records', '#eebc75', '#95b9ff', '#2a231b'),
  'github-telegram-bot': art('GEMINI', 'A paper plane / twin AI stars', '#99c1ff', '#ffb6d9', '#18263c'),
  'housing-ads-scrapper-bot': art('HOUSING', 'A miniature house / a scanning lens', '#bcdf9b', '#ffad8f', '#242b1b'),
  'github-temperuture': art('CLIMATE', 'A heater / a cooler / a temperature slider', '#ff9076', '#7cceff', '#2b211e'),
  'github-test': art('INTEREST', 'An interest dial / compounding coin stair', '#dec176', '#a2dac8', '#2a2518'),
  'github-thermometer': art('THERMOMETER', 'Two calibrated glass temperature tubes', '#fb877d', '#c4e8ff', '#2c1c20'),
  'github-time-with-tkinter-library': art('COUNTDOWN', 'An hourglass / an approaching deadline', '#ffc88b', '#c8b5ff', '#292219'),
  'github-timer-with-threading-library': art('THREADS', 'Two independent ticking mechanisms', '#9ddebf', '#ceadff', '#1e2c26'),
  'github-turtle-library': art('TURTLE', 'A turtle drawing a geometric flower', '#b3f4a6', '#ffdb82', '#1f2d1b'),
  'github-web-application-technologies-and-django-coursera': art('DJANGO', 'Five learning steps / a web architecture', '#85cdac', '#dcc0ff', '#1a2c25'),
  'school-blog-cms': art('EDITORIAL', 'A school / a publishing press', '#cfa0ef', '#f7c78b', '#2a1d2e'),
  'advanced-monitoring-chatbot': art('MONITOR', 'A signal tower / real time telemetry', '#71efc6', '#bbacff', '#182b25'),
  'multilingual-frontend-bot': art('LANGUAGES', 'A translation globe / character ribbons', '#9be2ff', '#ffa3c9', '#192a38'),
  'telegram-agent-admin-panel': art('ADMIN', 'A command console / controlled agent arms', '#adadff', '#6ee8d6', '#211e33'),
  'gemini-webhook-mailer': art('WEBHOOK', 'An AI star / a dispatched mail envelope', '#ffc081', '#c0a2ff', '#2d2219'),
  'flutter-chatbot-arcade': art('ARCADE', 'A handheld console / conversational play', '#fc89b9', '#94daff', '#2e1927'),
  'telegram-content-maker-make': art('MAKE', 'An automation assembly line / publishing', '#eabf6c', '#97d5ef', '#2d2519'),
  'persian-chatbot-dashboard': art('PERSIAN', 'A Persian chat window / interactive charts', '#bca6ff', '#fdc489', '#251f35'),
  'school-grading-platform': art('GRADES', 'A report card / graduated learning bars', '#a8de88', '#b6c9ff', '#232b1a'),
  'anonymous-teacher-peer-review': art('PEER REVIEW', 'Two anonymous masks / a shared assessment', '#f4c7a8', '#9bd3e7', '#2c2420'),
};

const fallback = art('EXPERIMENT', 'An open sculpture / a new idea', '#b8a6ff', '#8de8d5', '#201c2b');

export const getProjectSculptureProfile = (id: string): ProjectSculptureProfile => projectSculptureProfiles[id] || fallback;
