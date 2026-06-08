export interface TranslatedProjectItem {
  id: string;
  badge: string;
  title: string;
  titleEn: string;
  description: string;
  features?: string[];
  link?: string;
  githubUrl?: string;
  accent: 'teal' | 'cyan' | 'indigo' | 'emerald' | 'rose' | 'violet' | 'gold';
  category: 'featured' | 'ai' | 'web' | 'automation';
}

const faProjects: TranslatedProjectItem[] = [
  {
    id: "pimx-veil",
    title: "سامانه پنهان‌نگاری و امنیت اطلاعات PIMX_VEIL",
    titleEn: "PIMX_VEIL STEGANOGRAPHY & DATA SECURITY SUITE",
    category: "featured",
    description: "یک سوئیت امنیتی نظامی مدرن و ۱۰۰٪ محلی (Client-Side) که به کاربران اجازه می‌دهد فایل‌های حساس خود را با الگوریتم‌های فوق‌پیشرفته رمزنگاری کرده و به صورت کاملاً پنهان و غیرقابل‌شناسایی درون بدنه فایل‌های بی‌رویا (سند PDF، موزیک MP3 یا تصویر JPEG) تزریق (Steganography) کنند، بدون اینکه قالب یا کارکرد فایل میزبان تغییر کند. این پروژه با رویکرد Zero-Knowledge طراحی شده و مجهز به متدهای رمزنگاری AES-GCM 256-Bit و فناوری تفکیک PBKDF2 با بیش از ۶۰۰,۰۰۰ مرتبه تکرار هضم کلید جهت مقاومت در برابر حملات بروت‌فورس است.",
    link: "https://pimxveil.pages.dev",
    accent: "violet",
    badge: "CYBER VAULT",
    features: [
      "تزریق پنهان اطلاعات درون فایل‌های MP3، JPEG و PDF بدون زیان به فایل میزبان",
      "رمزنگاری فوق‌پیشرفته AES-GCM 256-Bit تحت معماری دانش‌صفر (Zero-Knowledge)",
      "تولید کلیدهای مستحکم به کمک تابع کشش PBKDF2 با بیش از ۶۰۰,۰۰۰ مرتبه تکرار"
    ]
  },
  {
    id: "pimx-moji",
    title: "پلتفرم خلاقانه ساخت هنرهای اسکی PIMX_MOJI",
    titleEn: "PIMX_MOJI ASCII ART GENERATOR",
    category: "featured",
    description: "ابزاری فوق‌العاده کاربردی و تفریحی جهت ساخت و تبدیل تصاویر یا کاراکترها به هنرهای متنی اسکی (ASCII Art) با استفاده از شکلک‌ها، ترکیب ایموجی‌ها و المان‌های گرافیکی متنی. مجهز به انواع تم‌های بصری جذاب و متنوع (مانند ماتریکس، کلاسیک، سایبرپانک و مونوکروم) جهت خلق جلوه‌های زیبا در شبکه‌های اجتماعی و نرم‌افزارهای چت.",
    link: "https://pimxmoji.pages.dev",
    accent: "rose",
    badge: "LIVE WEB APP",
    features: [
      "خلق و ویرایش تصاویر اسکی با تم‌های رنگی گوناگون",
      "قابلیت کپی سریع خروجی با یک کلیک و بهینه‌سازی سایز",
      "سازگاری با انواع چت‌روم‌ها و پلتفرم‌های پیام‌رسان"
    ]
  },
  {
    id: "pimx-pass",
    title: "وب‌سایت تست پینگ و انتخاب دی‌ان‌اس PIMX_PASS DNS",
    titleEn: "PIMX_PASS DNS TESTER & CONTROLLER",
    category: "featured",
    description: "پلتفرم فوق‌العاده کاربردی جهت تست، تحلیل کارایی و انتخاب هوشمند بهینه‌ترین سرورهای دی‌ان‌اس (DNS) دقیقاً متناسب با شبکه‌ اینترنت فعلی و فعال شما (همراه اول، ایرانسل، مخابرات، شاتل و غیره). این ابزار با ارسال درخواست‌های لحظه‌ای به شما کمک می‌کند پینگ پایدارتری در بازی‌های آنلاین کسب کرده و سرعت دسترسی اینترنتی خود را ارتقا دهید.",
    link: "https://pimxpassdns.pages.dev/",
    accent: "teal",
    badge: "SECURE GATEWAY",
    features: [
      "تست و بررسی سرعت پاسخ سرورهای DNS بر اساس اینترنت شما",
      "کاهش تاخیر شبکه‌ای، نوسان پینگ و رفع اختلال دسترسی",
      "آموزش گام‌به‌گام و مصور اعمال تغییرات بر روی انواع دیوایس‌ها"
    ]
  },
  {
    id: "mml-wallet-bot",
    title: "ربات تلگرام خرید توکن و احراز هویت MML Wallet",
    titleEn: "MML WALLET CLIENT TELEGRAM BOT",
    category: "featured",
    description: "ربات هوشمند تلگرام توسعه‌یافته سفارشی برای کارفرما جهت ثبت‌نام کاربران، احراز هویت اطلاعات و خرید توکن اختصاصی (MML Wallet). در این معماری، کاربران مایل به خرید توکن ابتدا اطلاعات کاربری و تراکنش خود را ثبت می‌کنند؛ در ادامه فرآیند، ادمین بعد از بررسی و تایید اسناد فیزیکی و تراکنشی در پنل مدیریت تصمیم‌گیری، اجازه قطعی خرید و تایید توکن را صادر می‌کند.",
    accent: "teal",
    badge: "CLIENT BOT",
    features: [
      "فرم ورودی ایمن جهت ارسال مدارک و جزییات احراز هویت کاربران",
      "داشبورد اعلان و مدیریت ادمین برای تایید نهایی تراکنش‌ها و آزادسازی توکن",
      "توسعه بومی با پایتون مبتنی بر وب‌هوک‌های محافظت‌شده و کدهای بهینه"
    ]
  },
  {
    id: "pimx-wide",
    title: "سامانه پیشرفته و فوق‌امن رمزنگاری بدون سرور PIMX_WIDE",
    titleEn: "PIMX_WIDE ADVANCED SECURE CRYPTO STATION",
    category: "featured",
    description: "پلتفرم PIMX_WIDE یک ابزار وب پیشرفته، فوق‌العاده امن، و کاملاً بدون نیاز به سرور (Serverless) است که برای رمزنگاری و رمزگشایی داده‌های حساس با امنیت استانداردهای نظامی طراحی شده است. تمام فرآیندهای محاسباتی، رمزنگاری و رمزگشایی مستقیماً روی پردازنده و رم دستگاه شما (به صورت کاملاً محلی و درون مرورگر) انجام می‌شود و هیچ داده‌ای تحت هیچ شرایطی به هیچ سروری ارسال یا در آن ذخیره نمی‌گردد. این پلتفرم مجهز به کنسول رمزنگاری مستقل (AES-GCM 256-Bit) با خروجی کانتینر فشرده Base64 و فایل فیزیکی .json، پرتال رمزگشایی آفلاین با تخلیه امنیتی رم، و پنل مدیریت مانيتورينگ پیشرفته به همراه ۳۴ فیلتر هوشمند زمانی و طراحی تیره غنی فضایی با راکتورهای چرخان سه بعدی است.",
    link: "https://pimxwide.pages.dev",
    accent: "gold",
    badge: "MILITARY CRYPTO",
    features: [
      "کنسول رمزنگاری مستقل با استاندارد نظامی AES-GCM با قابلیت خروجی .json و Base64",
      "پنل مدیریت پیشرفته و مانیتورینگ واقعی به همراه ۳۴ فیلتر هوشمند زمانی و نمودارهای متحرک خطی (نام کاربری: pimxwide و گذرواژه: 123456789PIMX_WIDe@#$%^&)",
      "حاکمیت ۱۰۰٪ محلی و آفلاین مجهز به مکانیزم تخلیه رم و تم خلاقانه راکتورهای فضایی سه بعدی"
    ]
  },
  {
    id: "pimx-node",
    title: "پلتفرم انتقال فایل همتابه‌همتا و شبیه‌ساز شبکه PIMX_NODE",
    titleEn: "PIMX_NODE P2P FILE METEOR & FIREWALL TRANSLATOR",
    category: "featured",
    description: "پلتفرم PIMX_NODE (یا به اختصار PIMX) یک پرتال پیشرفته، فوق‌العاده سریع و کاملاً بدون سرور (Serverless) برای انتقال فایل همتابه‌همتا (P2P) مبتنی بر پروتکل WebRTC و بدون واسطه‌گری فضای ابری است. همچنین این ابزار مجهز به شبیه‌ساز تعاملی فایروال (NAT Traversal) در قالب ۴ سناریو (اتصال محلی LAN Bridge، فایروال‌های معمولی STUN، اینترنت همراه CGNAT و انسدادهای Symmetric NAT اداری)، پنل مدیریت لحظه‌ای حاوی آمار واقعی کاربران آنلاین، حجم جابجایی دقیق دیتا و نمودار داینامیک SVG زمانبندی و سئوی قدرتمند و بهینه‌سازی شده در خروجی گوگل است.",
    link: "https://pimxnode.pages.dev",
    accent: "indigo",
    badge: "SERVERLESS P2P",
    features: [
      "انتقال مستقیم همتابه‌همتا (P2P) با پروتکل انقلابی WebRTC بدون واسطه‌گری سرورها",
      "شبیه‌ساز تعاملی و ریسپانسیو ۴ سناریوی فایروال و عبور از NAT (ترافیک افقی روی دسکتاپ و عمودی روی موبایل)",
      "داشبورد مدیریت زنده و واقعی با نمودارهای متحرک SVG، حجم لود Payload و تفکیک دستگاه‌ها"
    ]
  },
  {
    id: "pimx-pass-bot",
    title: "ربات تلگرام جامع PIMX_PASS_BOT",
    titleEn: "PIMX_PASS_BOT CONNECTIVITY HUB",
    category: "featured",
    description: "هاب همه‌کاره و فوق‌سریع اتصال اینترنتی. دسترسی آسان و خودکار به سرورها و تونل‌های پرسرعت V2Ray، OpenVPN، HA Tunnel Plus، NPV Tunnel، HTTP Custom و HTTP Injector به صورت لایو و آپدیت لحظه‌ای.",
    accent: "indigo",
    badge: "V2RAY & VPN",
    features: ["کانفیگ و اشتراک‌گذاری تونل‌های پایداری شبکه", "کاهش پینگ با سرورهای قدرتمند آسیایی و اروپایی", "پشتیبانی دائم نسخه موبایل و دسکتاپ تلگرام"]
  },
  {
    id: "pimx-play-bot",
    title: "ربات تلگرام اندروید آپ هانتر PIMX_PLAY_BOT",
    titleEn: "ANDROID APP HUNTER (PIMX_PLAY_BOT)",
    category: "featured",
    description: "دانلود مستقیم برنامه‌های اندروید بدون تاخیر از داخل تلگرام. دور زدن استورهای کند خارجی و لینک‌های تبلیغاتی؛ جستجوی فوری اپ‌ها و دریافت مستقیم فایل‌های APK تاییدشده و امن با ارسال مستقیم آدرس گوگل‌پلی.",
    accent: "emerald",
    badge: "ANDROID HUNTER",
    features: ["دانلود مستقیم فایل APK تایید شده سالم", "امکان وارد کردن لینک مرجع فروشگاه Google Play", "پشتیبانی از جستجوی اتوماتیک نام برنامه‌ها"]
  },
  {
    id: "pimx-sonic-bot",
    title: "ربات موزیک پلیر آفلاین PIMX_SONIC_BOT",
    titleEn: "OFFLINE MUSIC PLAYER (PIMX_SONIC_BOT)",
    category: "featured",
    description: "دستیار موسیقی فوق‌العاده برای شبکه‌های با پهنای باند محدود. استریم و دانلود مستقیم تمامی موزیک‌های موردعلاقه به همراه یکپارچه‌سازی کامل در بستر تلگرام بدون نیاز به خروج از پلتفرم و اتلاف ترافیک.",
    link: "https://t.me/PIMX_SONIC_BOT",
    accent: "cyan",
    badge: "MUSIC STREAMER",
    features: ["دانلود و ذخیره‌سازی محلی کلاینت صوت", "خروجی باکیفیت و بالا بدون کاستی فرکانس", "یکپارچه‌سازی سیستم بدون محدودیت‌های اپراتوری اینترنت"]
  },
  {
    id: "school-blog-cms",
    title: "وب‌سایت وبلاگ مدرسه برای معاونت آموزشی",
    titleEn: "School Academic Blog CMS",
    category: "web",
    description: "طراحی سیستم مدیریت علمی محتوا برای معاونت آموزشی مدرسه؛ همراه با احراز هویت اختصاصی کلاینت/سرور (ثبت نام، ورود، بازیابی رمز عبور)، سیستم نوتیفیکیشن‌های ایمیلی هوشمند، و داشبورد ادیتور چندرسانه‌ای جهت تولید بلاگ‌های صوتی، متنی و تصویری.",
    accent: "teal",
    badge: "SCHOOL PROJECT"
  },
  {
    id: "advanced-monitoring-chatbot",
    title: "پلتفرم چت‌بات هوشمند مجهز به سیستم نظارت",
    titleEn: "Advanced Chatbot with Monitoring Platform",
    category: "ai",
    description: "توسعه وب‌سایت گفتگو و چت‌بات جامع (بیش از ۱۰ صفحه مجزا) با قابلیت حساب‌های کاربری فعال، فراخوانی مستقیم API مدل Gemini، شخصی‌سازی و مهندسی پرامپت‌ها و ساختار مدیریت ادمین برای نظارت بر لاگ پیام‌ها و مسدودسازی کاربران متخلف.",
    accent: "indigo",
    badge: "PERSONAL ENGINE"
  },
  {
    id: "multilingual-frontend-bot",
    title: "وب‌سایت فرانت‌اند چت‌بات چندزبانه کلاینت",
    titleEn: "Multilingual Pure Frontend Chatbot",
    category: "ai",
    description: "پیاده‌سازی سایت چت‌بات واکنش‌گرا با پشتیبانی از ۱۰ زبان زنده دنیا (بیش از ۵ صفحه کاربر پسند) با هدف ارائه تجربه کاری فوق‌العاده متمرکز و روان بر روی مرورگرهای کلاینت بدون نیاز به عملیات دیتابیس نویسی.",
    accent: "cyan",
    badge: "FRONTEND ONLY"
  },
  {
    id: "telegram-agent-admin-panel",
    title: "عامل هوشمند تلگرام و داشبورد وب کنترل",
    titleEn: "Telegram Agent & Administrative Panel",
    category: "automation",
    description: "طراحی عمیق ایجنت اختصاصی تلگرام برای مدیریت کامل حساب‌ها به همراه پاسخ‌دهی‌های کاملاً پویا، شخصی‌سازی‌شده و منحصربه‌فرد بر اساس سناریوهای پایتونی و ساخت پنل وب ادمین برای نظارت گرافیکی آنلاین.",
    accent: "violet",
    badge: "DAEMON ENGINE"
  },
  {
    id: "gemini-webhook-mailer",
    title: "چت‌بات متصل به موتور Gemini با فرستنده ایمیل",
    titleEn: "Gemini Chatbot with Email Pipeline",
    category: "ai",
    description: "پیاده‌سازی چت‌بات واکنش‌گرا و متصل به مدل زبانی هوش مصنوعی با قابلیت جستجو در اینترنت (Grounding محدود)؛ یکپارچه‌شده با ایمیل شخصی جهت ارسال اتوماتیک پیام به مقاصد از پیش تعیین‌شده با کمک n8n.",
    accent: "rose",
    badge: "N8N PIPELINE"
  },
  {
    id: "housing-ads-scrapper-bot",
    title: "ربات تلگرامی تحلیل و جستجوی آگهی مسکن",
    titleEn: "Real Estate Housing Scraper Bot",
    category: "automation",
    description: "ربات خودکار واکشی زنده آگهی‌های مسکن بر اساس فیلترهای دلخواه نظیر شهر، متراژ، قیمت و محدوده؛ تحویل کاتالوگ جامع اطلاعات با جزییات منحصربه‌فرد در تلگرام بدون نیاز به باز کردن سایت مرجع.",
    accent: "emerald",
    badge: "SCRAPY MODULE"
  },
  {
    id: "personal-resume-gate",
    title: "لندینگ پیج معرفی و رزومه مدرن محمدرضا",
    titleEn: "Personal Resume Landing Page",
    category: "web",
    description: "توسعه وب‌سایت لندینگ پیج تک‌صفحه‌ای اختصاصی مجهز به افکت‌های جذاب CSS و انیمیشن‌های روان فریم ورک موشن جهت معرفی بیوگرافی، سوابق علمی، پروژه‌ها و مهارت‌های برنامه‌نویسی پایتون و جنگو.",
    accent: "cyan",
    badge: "WEB INTERFACE"
  },
  {
    id: "flutter-chatbot-arcade",
    title: "اپلیکیشن بومی فلاتر چت‌بات و کیت‌بازی‌ها",
    titleEn: "Flutter Custom Chatbot & Arcade Play",
    category: "automation",
    description: "طراحی و توسعه اپلیکیشن چندسکویی موبایل با فریمورک Flutter همراه با دستیار تعاملی چت و بازی‌های نوستالژیک موبایلی نظیر تتریس (Tetris)، دوز دونفره (XO)، بازی فکری حافظه و مار کلاسیک گرافیکی.",
    accent: "indigo",
    badge: "FLUTTER APP"
  },
  {
    id: "telegram-content-maker-make",
    title: "عامل خودکارسازی تولید محتوای گروه‌ها تلگرام",
    titleEn: "Auto Telegram Content Generator Bot",
    category: "automation",
    description: "پیاده‌سازی اتوماسیون قدرتمند با پلتفرم Make برای گروه‌های کاری تلگرام؛ ربات ورود کاربران جدید را پایش کرده و بر اساس الگوها مقالات تخصصی یا اطلاعات وب‌سایت انتخاب‌شده را استخراج کرده و توسعه می‌دهد.",
    accent: "teal",
    badge: "AUTOMATION WORK"
  },
  {
    id: "persian-chatbot-dashboard",
    title: "وب‌سایت چت‌بات فارسی با پنل مدیریت نوین",
    titleEn: "Persian Chatbot with Responsive Dashboard",
    category: "ai",
    description: "طراحی پوعر پلتفرم چت مستقل ایرانی با رابط و زبان بصری فارسی، مجهز به پنل ادمین فوق‌العاده کاربردی جهت مدیریت آسان پیام‌ها، تاریخچه‌ها و کانفیگ پارامترهای مدل.",
    accent: "violet",
    badge: "ADMIN PORTAL"
  },
  {
    id: "school-grading-platform",
    title: "پورتال مدرن ثبت و مانیتورینگ نمرات دبیران",
    titleEn: "Secure Teacher Grading School Portal",
    category: "web",
    description: "توسعه سامانه وب با بک‌اند ایمن برای ثبت نمرات و مستندات کلاسی دانش‌آموزان توسط کادر آموزشی؛ مجهز به لاگین حفاظت‌شده دبیران به گونه‌ای که دخل و تصرف توسط کلاینت‌ها کاملاً مسدود گردیده است.",
    accent: "teal",
    badge: "SCHOOL PROJECT"
  },
  {
    id: "anonymous-teacher-peer-review",
    title: "سامانه ارزیابی عملکرد و نظرسنجی مخفی دبیران",
    titleEn: "Anonymous Educator Peer Review Platform",
    category: "web",
    description: "توسعه بستری امن و کاملاً ناشناس جهت ثبت نظرات و بازخورد کلاسی دانش‌آموزان و دبیران؛ مجهز به فیلدهای اعتبارسنجی قفل‌شده با توکن بدون امکان نشت اطلاعات یا دستکاری هویت ثبت‌کنندگان.",
    accent: "rose",
    badge: "ANONYMOUS DATA"
  }
];

const enProjects: TranslatedProjectItem[] = [
  {
    id: "pimx-veil",
    title: "PIMX_VEIL — Advanced Local Steganography Suite",
    titleEn: "PIMX_VEIL HYBRID STEGANOGRAPHY & DATA ISOLATION WORKSPACE",
    category: "featured",
    description: "A highly advanced, 100% client-side military steganography and encryption suite that empowers users to encrypt highly sensitive files and inject them invisibly into harmless carrier files (PDF, MP3, or JPEG) using advanced end-of-file buffer offset algorithms. Operating fully under a zero-knowledge architecture within the browser's RAM, it secures keys via a robust PBKDF2 HMAC-SHA256 derivation function performing over 600,000 stretching cycles, and locks components using authenticated AES-GCM (256-bit) encryption.",
    link: "https://pimxveil.pages.dev",
    accent: "violet",
    badge: "CYBER VAULT",
    features: [
      "Invisible payload steganography stashing data packets within harmless carrier PDFs, MP3s, & JPEGs",
      "Pure client-side zero-knowledge environment utilizing Web Crypto API inside RAM",
      "Robust key derivation via PBKDF2 implementing 600,000+ HMAC-SHA256 hashing iterations"
    ]
  },
  {
    id: "pimx-moji",
    title: "PIMX_MOJI ASCII Art Canvas",
    titleEn: "PIMX_MOJI ASCII ART GENERATOR",
    category: "featured",
    description: "A creative online canvas tool to convert images or text characters into beautiful ASCII art and emoji mosaic tables, styled with an immersive Matrix-like hacker theme for quick copy-paste.",
    link: "https://pimxmoji.pages.dev",
    accent: "rose",
    badge: "LIVE WEB APP",
    features: [
      "Real-time image or text-character mapping and conversion",
      "One-click high-speed copy and layout optimization",
      "Fully loaded with retro Matrix hackish monochrome styling"
    ]
  },
  {
    id: "pimx-pass",
    title: "PIMX_PASS DNS Benchmark & Diagnostic",
    titleEn: "PIMX_PASS DNS TESTER & CONTROLLER",
    category: "featured",
    description: "A highly practical network benchmarking utility to test latency and discover the optimal safe DNS server matching your specific active ISP provider, improving online gaming ping.",
    link: "https://pimxpassdns.pages.dev/",
    accent: "teal",
    badge: "SECURE GATEWAY",
    features: [
      "Accurate DNS latency test relative to your local internet setup",
      "Minimize packet losses, ping spikes, and speed jitter",
      "Step-by-step setup guides for manual router configurations"
    ]
  },
  {
    id: "mml-wallet-bot",
    title: "MML Wallet Client Verification & Token Bot",
    titleEn: "MML WALLET CLIENT TELEGRAM BOT",
    category: "featured",
    description: "An automated Telegram companion bot custom-built to register users, facilitate secure document/KYC verification, and process request approvals for unique community token purchases.",
    accent: "teal",
    badge: "CLIENT BOT",
    features: [
      "Structured validation wizard safely carrying user identity sheets",
      "Admin validation controls for quick approvals or rejection updates",
      "Highly responsive backend designed for secure long-polling cycles"
    ]
  },
  {
    id: "pimx-wide",
    title: "PIMX_WIDE Advanced Serverless Cryptographic Platform",
    titleEn: "PIMX_WIDE SECURE CRYPTO ENGINE",
    category: "featured",
    description: "PIMX_WIDE is an advanced, ultra-secure, and completely serverless (Serverless) web tool designed for military-grade encryption and decryption of sensitive data. All computational, encryption, and decryption steps happen purely locally in your browser's RAM, ensuring no data is ever stored on any server. It features an independent encryption console (AES-GCM 256-bit) with secure Base64 and `.json` outputs, a offline decryption portal that purges RAM, and an advanced living admin dashboard with 34 temporal dropdown filters alongside eye-catching 3D rotating reactors.",
    link: "https://pimxwide.pages.dev",
    accent: "gold",
    badge: "MILITARY CRYPTO",
    features: [
      "Independent military-grade AES-GCM cryptography generating robust secure .json & Base64 files",
      "Advanced live admin dashboard (/pimxwideadmin) with 34 temporal dropdown filters & charts (Usr: pimxwide, Pwd: 123456789PIMX_WIDe@#$%^&)",
      "100% serverless zero-knowledge offline environment with instant RAM purging & 3D rotating reactors"
    ]
  },
  {
    id: "pimx-node",
    title: "PIMX_NODE P2P Direct File Transfer & NAT Traversal Simulator",
    titleEn: "PIMX_NODE P2P FILE METEOR & FIREWALL TRANSLATOR",
    category: "featured",
    description: "PIMX_NODE (or PIMX in short) is an advanced, ultra-fast, and completely serverless peer-to-peer (P2P) file transfer portal powered by WebRTC protocol, combined with an interactive simulator of network behavior and firewall traversal. It models 4 distinct network environments (LAN Bridge, STUN, CGNAT, Symmetric NAT) dynamically adjusting flows for desktop and mobile layouts. Additionally, it offers a real-time monitor dashboard tracking active room peers, payload volumes, and animated custom SVG sparklines.",
    link: "https://pimxnode.pages.dev",
    accent: "indigo",
    badge: "SERVERLESS P2P",
    features: [
      "Direct Peer-to-Peer transfer using WebRTC protocol, bypassing intermediate clouds and servers",
      "Interactive NAT traversal simulator modeling 4 scenarios (horizontal layout on desktop, vertical on mobile)",
      "Real-time technical monitoring dashboard with animated custom SVG sparklines & device analytics"
    ]
  },
  {
    id: "pimx-pass-bot",
    title: "PIMX_PASS_BOT VPN Autonomic Tunnel Bot",
    titleEn: "PIMX_PASS_BOT CONNECTIVITY HUB",
    category: "featured",
    description: "A robust online tunnel provisioning engine dispatching trusted config benchmarks (V2Ray, OpenVPN) to registered clients on the fly with minimal latency.",
    accent: "indigo",
    badge: "V2RAY & VPN",
    features: [
      "Automated custom network tunnels sharing",
      "Minimized ping jitter and premium routing pathways",
      "Flawless cross-platform execution on mobile and desktop"
    ]
  },
  {
    id: "pimx-play-bot",
    title: "PIMX_PLAY_BOT Google Play APK Downloader Bot",
    titleEn: "ANDROID APP HUNTER (PIMX_PLAY_BOT)",
    category: "featured",
    description: "Automated Telegram download daemon parsing external Android app nodes on demand to stream purified secure APK files straight to user chats without redundant ads.",
    accent: "emerald",
    badge: "ANDROID HUNTER",
    features: [
      "Raw source APK downloads verifying cryptographic signatures",
      "Handles instant Play Store url parsing directly on command",
      "Preloaded with light-weight malware checks"
    ]
  },
  {
    id: "pimx-sonic-bot",
    title: "PIMX_SONIC_BOT Offline Music Streamer",
    titleEn: "OFFLINE MUSIC PLAYER (PIMX_SONIC_BOT)",
    category: "featured",
    description: "High-fidelity terminal client to search, play, and cache audio parameters off-grid. Optimizes mobile traffic by indexing, caching, and streaming songs directly inside user chats.",
    link: "https://t.me/PIMX_SONIC_BOT",
    accent: "cyan",
    badge: "MUSIC STREAMER",
    features: [
      "Download and cache audio files completely local to user chats",
      "High-fidelity compression and streaming with zero loss of audio frequency",
      "Integrates fully with standalone user playlists and Telegram groups"
    ]
  },
  {
    id: "school-blog-cms",
    title: "School Academic Blog CMS",
    titleEn: "School Academic Blog CMS",
    category: "web",
    description: "CMS content publishing and administrative review portal engineered for high school, with user-tier logins, SMTP alerts, and media editors.",
    accent: "teal",
    badge: "SCHOOL PROJECT"
  },
  {
    id: "advanced-monitoring-chatbot",
    title: "Advanced Chatbot with Monitoring Platform",
    titleEn: "Advanced Chatbot with Monitoring Platform",
    category: "ai",
    description: "A secure AI-integrated chatbot system complete with Gemini API interactions, system telemetry logs, prompt engineering customization, and administrative block controls.",
    accent: "indigo",
    badge: "PERSONAL ENGINE"
  },
  {
    id: "multilingual-frontend-bot",
    title: "Multilingual Pure Frontend Chatbot",
    titleEn: "Multilingual Pure Frontend Chatbot",
    category: "ai",
    description: "Highly interactive multi-language responsive UI layout supporting over 10 languages, focused on maximum browser efficiency and fluent animations.",
    accent: "cyan",
    badge: "FRONTEND ONLY"
  },
  {
    id: "telegram-agent-admin-panel",
    title: "Telegram Agent & Administrative Panel",
    titleEn: "Telegram Agent & Administrative Panel",
    category: "automation",
    description: "Custom daemon to manage Telegram profiles automatically under pythonic event loops, coupled with a graphical monitoring web application dashboard.",
    accent: "violet",
    badge: "DAEMON ENGINE"
  },
  {
    id: "gemini-webhook-mailer",
    title: "Gemini Chatbot with Email Pipeline",
    titleEn: "Gemini Chatbot with Email Pipeline",
    category: "ai",
    description: "AI chatbot coupled with web search grounding and a direct n8n workflow pipeline that formats query highlights and emails them automatically to folders.",
    accent: "rose",
    badge: "N8N PIPELINE"
  },
  {
    id: "housing-ads-scrapper-bot",
    title: "Real Estate Housing Scraper Bot",
    titleEn: "Real Estate Housing Scraper Bot",
    category: "automation",
    description: "Crawler daemon parsing recent property listings on active forums on specified ranges, streaming automated catalogue sheets into target Telegram chats.",
    accent: "emerald",
    badge: "SCRAPY MODULE"
  },
  {
    id: "personal-resume-gate",
    title: "Personal Resume Landing Page",
    titleEn: "Personal Resume Landing Page",
    category: "web",
    description: "Elegant single-page developer portfolio landing website decorated with parallax CSS and motion-driven layout animations presenting engineering stats.",
    accent: "cyan",
    badge: "WEB INTERFACE"
  },
  {
    id: "flutter-chatbot-arcade",
    title: "Flutter Custom Chatbot & Arcade Play",
    titleEn: "Flutter Custom Chatbot & Arcade Play",
    category: "automation",
    description: "A cross-platform Flutter application featuring an interactive communication helper alongside embedded retro games like arcade Tetris, Tic-Tac-Toe, and Snake.",
    accent: "indigo",
    badge: "FLUTTER APP"
  },
  {
    id: "telegram-content-maker-make",
    title: "Auto Telegram Content Generator Bot",
    titleEn: "Auto Telegram Content Generator Bot",
    category: "automation",
    description: "Advanced Make automation listening to new channels, extracting summarized media details, and generating publications for linked channels automatically.",
    accent: "teal",
    badge: "AUTOMATION WORK"
  },
  {
    id: "persian-chatbot-dashboard",
    title: "Persian Chatbot with Responsive Dashboard",
    titleEn: "Persian Chatbot with Responsive Dashboard",
    category: "ai",
    description: "A localized interactive chat web application featuring a highly refined administrative portal tracking user growth, latency delays, and prompt versions.",
    accent: "violet",
    badge: "ADMIN PORTAL"
  },
  {
    id: "school-grading-platform",
    title: "Secure Teacher Grading School Portal",
    titleEn: "Secure Teacher Grading School Portal",
    category: "web",
    description: "Academic content recording portals protecting test score input interfaces, secure user sessions preventing client modifications.",
    accent: "teal",
    badge: "SCHOOL PROJECT"
  },
  {
    id: "anonymous-teacher-peer-review",
    title: "Anonymous Educator Peer Review Platform",
    titleEn: "Anonymous Educator Peer Review Platform",
    category: "web",
    description: "A protected survey platform allowing students and staff to evaluate coursework anonymously with encrypted token validation.",
    accent: "rose",
    badge: "ANONYMOUS DATA"
  }
];

// Translation dictionaries for remaining languages (ar, de, fr, it, zh, ru, el, la)
const arProjectTranslations: Record<string, { title: string; description: string; badge?: string; features?: string[] }> = {
  "pimx-veil": {
    title: "PIMX_VEIL — نظام أمن المعلومات وإخفاء البيانات الهجين",
    description: "مجموعة أمان عسكرية حديثة ومحلية بالكامل (من جانب العميل) تتيح للمستخدمين تشفير ملفاتهم الحساسة للغاية وحقنها بشكل غير مرئي وغير قابل للكشف داخل ملفات حاملة غير ضارة (مستند PDF أو موسيقى MP3 أو صور JPEG) دون تغيير شكلها أو وظيفتها الأصلية. تم تصميمه بهيكل المعرفة الصفرية (Zero-Knowledge) في ذاكرة RAM للمتصفح، باستخدام خوارزميات AES-GCM 256-bit و PBKDF2 مع أكثر من 600,000 تكرار.",
    badge: "خزنة سيبرانية",
    features: [
      "حقن غير مرئي للملفات الحسابية ضمن مستندات PDF و MP3 و JPEG دون إلحاق أي ضرر بالناقل",
      "أمان تام من طرف العميل باستخدام Web Crypto API وقاعدة المعرفة الصفرية داخل ذاكرة RAM مؤقتاً",
      "اشتقاق وتمدد مفاتيح فائق القوة عبر خوارزمية PBKDF2 بـ 600,000 لفة هضم وتكرار متطورة"
    ]
  },
  "pimx-moji": {
    title: "بكسل آرت منشئ أسكي PIMX_MOJI",
    description: "أداة إبداعية على الويب لتحويل الصور والنصوص إلى لوحات فنية مذهلة قائمة على رموز أسكي وإيموجي مع تسهيلات نسخ وحظر ماتریکس.",
    badge: "تطبيق ويب نشط",
    features: ["تخطيط وتحويل فوري للصور والنصوص", "نسخ سريع وبسيط بنقرة واحدة وتعديل الحجم", "طابع ماتركس ريترو بلون أحادي"]
  },
  "pimx-pass": {
    title: "محلل تشغيل دي ان اس PIMX_PASS",
    description: "أداة عملية لقياس دقة وسرعة خوادم DNS المتوافقة مع مزود الخدمة الخاص بك، لضمان استقرار الألعاب وسرعة التصفح.",
    badge: "بوابة آمنة",
    features: ["اختبارlatency دقيق لشبكة الويب الخاصة بك", "تخفيض ارتداد البنج وضياع الحزم الفنية", "دليل إعداد مصور خطوة بخطوة للراوتر"]
  },
  "mml-wallet-bot": {
    title: "تداول توكن والتحقق MML Wallet",
    description: "بوت تلغرام ذكي لتسجيل المستخدمين، تحقق KYC الآمن، وتسهيل تداول توكنات MML الخاصة بالبائع تحت إدارة يد ادمين.",
    badge: "بوت العميل",
    features: ["استبيان تجميع الوثائق الرسمية والبطاقات بروتوكول آمن", "لوحة تحكم إدارية للموافقة أو الرفض الأنيق", "سيرفر خلفي فائق التجاوب للطلبات العالية"]
  },
  "pimx-wide": {
    title: "منصة تشفير برمجية عسكرية محلية PIMX_WIDE",
    description: "تطبيق ويب متطور وفائق الأمان خالٍ من الخوادم (Serverless) لتشفير وفك تشفير البيانات الحساسة بمعايير عسكرية خاضعة للمعرفة الصفرية (Zero-Knowledge) داخل ذاكرة RAM للجهاز. يتميز بوجود وحدة تشفير مستقلة AES-GCM 256-bit، وبوابة فك التشفير غير المتصلة بالإنترنت، ولوحة تحكم مانيتورينغ مخصصة للإدارة بـ 34 فلتر زمني متطور ورسوم بيانية خطية ناصعة مع مفاعلات مغناطيسية ثلاثية الأبعاد.",
    badge: "تشفير عسكري",
    features: [
      "وحدة تشفير مستقلة بمعايير AES-GCM وتصدير ملفات .json وقوالب Base64 محميّة",
      "لوحة تحكم إدارية مانيتورينغ تفاعلية بـ 34 فلتر زمني دقيق (مستخدم: pimxwide، رمز: 123456789PIMX_WIDe@#$%^&)",
      "بيئة معرفة صفرية محلية بالكامل مجهزة بتطهير فوري للذاكرة ومفاعلات فضائية دوّارة ثلاثية الأبعاد"
    ]
  },
  "pimx-node": {
    title: "PIMX_NODE بيئة نقل ملفات P2P زيرو-سيرفر ومحاكاة عبور جدران الـ NAT",
    description: "منصة ويب متطورة وسريعة للغاية وبدون خوادم (Serverless) لنقل الملفات همتاً لهمت (P2P) المباشرة بالاعتماد على بروتوكول WebRTC المبتكر دون الحاجة للوسائط السحابية. تتضمن محاكي شبكات تعاملي لـ 4 سيناريوهات مختلفة من جدران الحماية واجتياز الـ NAT (جسر LAN، خادم STUN، إنترنت CGNAT، جدار Symmetric NAT العصيب)، ولوحة تحكم مانيتورينغ حَيّة ترصد غرف النشاط بدقة ومخططات SVG زمانية متفوقة.",
    badge: "انتقال P2P مباشر",
    features: [
      "نقل ملفات مباشر وبدون قيود حجم بين الأجهزة P2P باستخدام بروتوكول WebRTC المتين",
      "محاكاة تفاعلية وتناسبية لـ 4 سيناريوهات جدران نارية (تخطيط أفقي على الحواسب ورأسي على الهواتف)",
      "داشبورد تقني ومراقبة لحظية مدعومة بمخططات تخطيط بصرية SVG وإحصائيات متغيرة"
    ]
  },
  "pimx-pass-bot": {
    title: "بوت الاتصال التونلات وتوفير السيرفرات PIMX_PASS_BOT",
    description: "بوت سريع لنشر وتكوين نصوص تونلات V2Ray و OpenVPN لضمان الاتصال المتجاوب وحرية التصفح لجميع المستخدمين.",
    badge: "سيرفرات آمنة",
    features: ["مشاركة آلية لتونلات الشبكة وحصص التمرير", "تخفيض البنج وضمان سيرفرات سريعة في آسيا وأوروبا", "توافق كامل مع تطبيقات تلغرام للموبايل والديسكتاب"]
  },
  "pimx-play-bot": {
    title: "بوت تنزيل تطبيقات أندرويد حرة PIMX_PLAY_BOT",
    description: "تنزيل حزم APK مباشرة من جوجل بلاي دون إعلانات مزعجة مع فحص فوري لحماية التطبيقات من الفيروسات.",
    badge: "تنزيل الآندرويد",
    features: ["تنزيل مجاني ومباشر لحزم APK الأصلية الموثقة", "تحليل روابط متجر Google Play الفورية بسلاسة", "فحص مدمج ضد الفيروسات البسيطة والملفات الخبيثة"]
  },
  "pimx-sonic-bot": {
    title: "مشغل الميديا والموسيقى أوفلاين PIMX_SONIC_BOT",
    description: "مساعد الترفيه والبث المباشر للأصوات والملفات الصوتية ضمن هاب تلغرام آمن تماماً موفر لحساب الباقة والسرعة.",
    badge: "مشغل الميوزك",
    features: ["تنزيل وتخزين محلي مرن للملفات الصوتية", "مستوى تردد مشغل فائق النقاء والجودة", "تكامل تام ومشاركة القوائم دون حدود مشغلي الإنترنت"]
  },
  "school-blog-cms": {
    title: "بوابة وبلوغ المدرسة وإدارة المحتوى الأكاديمي",
    description: "نظام إدارة المحتوى العلمي والتعليمي للمدرسة بمدونات غنية بالوسائط (تسجيلات، صور، نصوص) وحسابات موثقة للمعلمين.",
    badge: "مشروع مدرسي"
  },
  "advanced-monitoring-chatbot": {
    title: "شات بوت ذكي متكامل مع لوحة مراقبة الإدارة",
    description: "جهاز محادثة عميق متصل بذكاء اصطناعي جيميني مزود بواجهات ومقاييس إدارة لحظر المستخدمين المنتهكين وتتبع لاقات التفاعل.",
    badge: "سيرفر خاص"
  },
  "multilingual-frontend-bot": {
    title: "شات بوت فرونت إند كلي لغات متعددة",
    description: "موقع محادثة متطور بـ 10 لغات عالمية يعمل كليا بسمت العميل دون حاجة لقاعدة بيانات خلفية.",
    badge: "فرونت إند فقط"
  },
  "telegram-agent-admin-panel": {
    title: "عامل حساب تيليغرام التلقائي ولوحة الإدارة",
    description: "عامل محادثة ذكي لتلغرام يعمل ديناميكيا بناء على خوارزميات بايثون ولوحة ويب للمراقبة والتحليلات.",
    badge: "محرك ديمون"
  },
  "gemini-webhook-mailer": {
    title: "أتمتة ذكية وجسر نوتيفيكيشن SMTP",
    description: "بوت متصل بالذكاء الاصطناعي مع أتمتة n8n لإرسال تدوينات البحث فورا إلى بريدك الإلكتروني الشخصي بأمان.",
    badge: "أتمتة n8n"
  },
  "housing-ads-scrapper-bot": {
    title: "بوت مسح وتحليل العقارات التلقائي تيليغرام",
    description: "مسح فوري لأحدث العرووض العقارية في منطقتك وتجميعها وإشعارها بروابط مباشرة دون تضييع الوقت.",
    badge: "بايثون كرالر"
  },
  "personal-resume-gate": {
    title: "بوابة لندينغ بيج محترفة لرزومه",
    description: "موقع تقديم السيرة الذاتية المهنية مع تأثيرات بصرية رائعة ورسوم متحركة لتصفح المهارات بسلاسة.",
    badge: "لوحة ويب"
  },
  "flutter-chatbot-arcade": {
    title: "تطبيق فلاتر ومحاكي ألعاب قديمة",
    description: "تطبيق للموبايل يجمع بين نظام ذكاء اصطناعي وألعاب تعود إلى الذاكرة (أتاري، تتريس، دون دون) بتكامل تام.",
    badge: "تطبيق فلاتر"
  },
  "telegram-content-maker-make": {
    title: "أتمتة صناعة المحتوى على تيليغرام",
    description: "استخدام أتمتة Make وجوجل لنشر تحليلات الأخبار وترجمتها بشكل آلي دون تدخل بشري دوري.",
    badge: "أتمتة برمجية"
  },
  "persian-chatbot-dashboard": {
    title: "شات بوت كود محلي بواجهة مخصصة",
    description: "شات بوت كود محلي بواجهة مخصصة لرصد معدل النقل والتأخير ونمو المستخدمين بطرق ذكية وتحليلية.",
    badge: "لوحة إدارية"
  },
  "school-grading-platform": {
    title: "منصة نمرات المعلمين الآمنة",
    description: "پورتال علمي يسجل أرقام الطلاب بمصادقة مشددة تمنع أي تلاعب وتضمن حماية المعلومات التعليمية.",
    badge: "مشروع مدرسي"
  },
  "anonymous-teacher-peer-review": {
    title: "تقييم أداء المعلمين مجهول الهوية",
    description: "تسهيل استطلاعات الرأي الفردية للطلاب والمعلمين لمراجعة المناهج وتقييم الدرجات دون تسرير للبيانات.",
    badge: "بيانات سرية"
  }
};

const zhProjectTranslations: Record<string, { title: string; description: string; badge?: string; features?: string[] }> = {
  "pimx-veil": {
    title: "PIMX_VEIL — 浏览器端超高防护信息安全与混合隐写术系统",
    description: "一款现代且 100% 运行于本地浏览器端（Client-Side）的安全黑客套件，允许用户使用顶尖的高级军工加密算法，将极为敏感的秘密数据无痕且不可检测地隐写（Steganography）并注入到普通的 PDF 文档、MP3 音频或 JPEG 图像等载体文件中，而绝不改变或损坏载体原本的内容、格式或正常运行。项目在极其纯洁的零知识（Zero-Knowledge）RAM 环境中运行，通过 Web Crypto API 实现 256 位 AES-GCM 隔离加密，并通过拉伸 600,000+ 次的 PBKDF2 强化密匙衍生，完全隔离并根除数据泄露。",
    badge: "密码金库",
    features: [
      "利用文件末尾缓冲区（EOF Offset）在 PDF/MP3/JPEG 载体中无痕隐藏秘密负载",
      "基于 Web Crypto API 架构 of 100% 本地 RAM 运行，实现纯净零知识且无数据库离线隔离",
      "采用超高防爆强度的 PBKDF2 HMAC-SHA256 算法进行高达 600,000+ 次哈希强化秘钥衍生"
    ]
  },
  "pimx-moji": {
    title: "PIMX_MOJI 艺术像素 ASCII 画布生成器",
    description: "一款富有创意的在线画布工具，可将图片与字符矩阵一键转换为精美的 ASCII 文字艺术与 Emoji 混合表格拼贴画。配有黑客级高科技主题，适合开发者与社交分享。",
    badge: "已上线运行",
    features: ["图像或文本字符实时映射转化", "一键高速剪贴板复制及布局优化", "默认搭载矩阵经典极简黑客色彩"]
  },
  "pimx-pass": {
    title: "PIMX_PASS 极速 DNS 基准测试与性能诊断平台",
    description: "高端动态网络测速诊断平台，实时请求、度量并给全球主流高安全级 DNS 服务测算延迟，消除游戏卡顿与网络抖动，为网络配置变革提供图文指引。",
    badge: "安全网关",
    features: ["适配不同网络提供商的实时基准测速算法", "有效改善连接丢包以及抖动延迟", "预载路由器与移动端的一键式配置指南"]
  },
  "mml-wallet-bot": {
    title: "MML Wallet 企业自主代币核销 Telegram 机器人",
    description: "面向企业特制定制的生产级自动化机器人，高效核验身份、注册并辅助后台管理员做代币的安全划转。管理员对提交的所有凭证和交易单号进行全权把控审核。",
    badge: "客户托管",
    features: ["结构化的多重凭据验证传送体系", "支持管理员一键审批和拒绝订单交互", "基于安全 Python 轮询与 Webhook 框架的高并发后台"]
  },
  "pimx-wide": {
    title: "PIMX_WIDE 超高级零知识无服务器密码安全终端",
    description: "PIMX_WIDE 是一款专门针对高度敏感信息进行军工级加密与解密而设计的尖端、无服务器（Serverless）、极高防护的 Web 安全系统。所有计算、编译和加解密过程全部在本地浏览器 RAM 内存中完成，数据绝不上传至任何服务器，达成物理级完美零知识安全。系统配备基于 AES-GCM 256 位独立加密控制台、离线内存即时擦除解密门户、具有 34 种时维度筛选过滤的深度动态监控看板，以及酷炫的 3D 三维旋转空天反应堆结构设计。",
    badge: "军工级非对称解密",
    features: [
      "军事级 AES-GCM 256 位高强度独立加解密技术，生成密态 Base64 气泡文及 .json 加密实体",
      "搭载基于 34 种时间段精准筛选的监控大屏，图形化深度解析各项运营动作 (用户名: pimxwide，密码: 123456789PIMX_WIDe@#$%^&)",
      "100% 运行于单机离线环境，完备的物理级内存擦除保障及 3D 立体悬浮粒子反应核心结构"
    ]
  },
  "pimx-node": {
    title: "PIMX_NODE 无服务器 peer-to-peer 极速文件分发及网络行为仿真系统",
    description: "PIMX_NODE (简称 PIMX) 是一款基于先进 WebRTC 架构的无服务器端对端（P2P）超高速文件直传网站，摆脱了云端中转服务器和存储容量束缚。同时该平台内置创新的 NAT 网闸防火墙穿越仿真器，支持本地 LAN Bridge、传统 STUN、移动 CGNAT 以及对称 Symmetric NAT 办公限速 4 种典型网络拓扑的可视化交互模拟，配备高敏活跃节点、吞吐总流量监视器及 SVG 原生动画仪表盘，自适应适配电脑端的水平传输和手机端的垂直版面设计。",
    badge: "P2P 无极直传",
    features: [
      "基于 WebRTC 原创技术的多线程分布式端对端流直飞直传，不占用中转云端与硬件运存",
      "高度互动的 NAT 网关穿透行为仿真箱，完美适应办公端水平布局与移动垂直自适应格式",
      "全动态自研 SVG 科技仪表谱线、大通量字节审计、多点存活在线节点跟踪"
    ]
  },
  "pimx-pass-bot": {
    title: "PIMX_PASS_BOT 多合一自动隧道连接 Telegram 机器人",
    description: "直连后台高速 V2Ray、OpenVPN 隧道配置并向大群进行每日的线路质量节点存活诊断与自动分发推送。",
    badge: "加密隧道",
    features: ["每日自动下发可信 VPN 配置文件", "全球多点低延穿透节点保障", "多主流平台及客户端快速兼容支持"]
  },
  "pimx-play-bot": {
    title: "PIMX_PLAY_BOT 纯净 APK 软件获取 Telegram 机器人",
    description: "免除臃肿广告，自动将 Google Play 商店原始链接解析并极速直达到群，带病毒查杀等安全服务。",
    badge: "应用速递",
    features: ["完全无外部拦截广告 of APK 原创下载安装包", "Google Play 链接极速拦截和多点并行下载", "自动启动轻量病毒及危险参数过滤"]
  },
  "pimx-sonic-bot": {
    title: "PIMX_SONIC_BOT 离线随身音乐盒 Telegram 机器人",
    description: "在 Telegram 内部极速搜索、缓存并无损下载全世界所有音乐。特别针对特定网络环境流量消耗与缓冲做极致优化。",
    badge: "音乐极享",
    features: ["本地大文件异步快速缓存技术", "高保真低损无削减音质解码", "支持直接添加到您的单人/群组自建播放列表"]
  },
  "school-blog-cms": {
    title: "学校教辅业务内容与博客 CMS 后台",
    description: "为中学定制的教务内容发布与审核 CMS 系统，带有用户账户鉴权、系统级邮件警报和富媒体博客编辑器，全面助力课后音频、视频及图文发布。",
    badge: "校园专属项目",
    features: ["管理员和讲师多级严格权限系统", "采用先进 Node/Python 路由防止代码注入", "自适应多栏媒体展示及留言点赞回复"]
  },
  "advanced-monitoring-chatbot": {
    title: "高级监视与自动化系统聊天机器人",
    description: "专为企业设计的生产型会话管理系统，具有用户异常追踪、多账户实时管理、智能 Gemini 提示。管理层可以在多级看板上轻松监督不合规事件并实施IP或账户封禁。",
    badge: "企业自主"
  },
  "multilingual-frontend-bot": {
    title: "十国语言无服务器全前端智能助手",
    description: "纯前端零服务器部署的多国语言交互助理，完美适配移动设备及低端浏览器性能。运行于纯离线环境，100% 保护隐私泄露风向。",
    badge: "纯前端"
  },
  "telegram-agent-admin-panel": {
    title: "独立代跑智能助手及监控终端",
    description: "基于 Python 开发的安全异步调度程序。通过轻量 Web Dashboard 对 Telegram 频道的所有数据波动和操作记录做出高精度响应。",
    badge: "自动化引擎"
  },
  "gemini-webhook-mailer": {
    title: "Gemini 智能邮件投递集成器",
    description: "连接 Gemini 神经网络，并通过 n8n 安全传输通道实现自动信息收集、报告过滤并将其极速通知到指定的个人电子邮箱。",
    badge: "N8N流水线"
  },
  "housing-ads-scrapper-bot": {
    title: "房产信息多源抓取及实时 Telegram 精准推送",
    description: "部署深度分布式网路爬虫任务，全天候清洗解析区域房产信息，按您指定的低总价和地段在机器人端秒速下发卡片简报。",
    badge: "Scraping模块"
  },
  "personal-resume-gate": {
    title: "个人品牌现代简历自适应页面",
    description: "以极致审美构建的响应式单页网站，通过流畅的动画交互展现系统自动化开发的技能图谱、开源作品和谢里夫大学认证。",
    badge: "网页前端"
  },
  "flutter-chatbot-arcade": {
    title: "Flutter 双用智能助理及经典电子游戏模拟器",
    description: "面向 Android 研发的微型智能手机客户端，内置经典算法街机小游戏（俄罗斯方块、XO 对弈、视觉记忆宫殿），好玩且零延迟运行。",
    badge: "Flutter移动应用"
  },
  "telegram-content-maker-make": {
    title: "Make 跨境资讯自动化集成中台",
    description: "将主流全球社论媒体订阅源与 Telegram 目标网络环境完美接轨。利用 Make 宏流图层在背景实时处理、精炼翻译和瞬时分发。",
    badge: "自动工作流"
  },
  "persian-chatbot-dashboard": {
    title: "高级分析追踪器对话机器人后台",
    description: "精心调校的智能数据决策仪表盘，用于统计高并发下的服务器负载率、单次会话延迟及累计交互频次，保障稳定产出。",
    badge: "管理看板"
  },
  "school-grading-platform": {
    title: "高强度数据加密教师学术成绩录入保护平台",
    description: "为教师构建的机密级教务管理网络平台，严厉硬化通信接口。在录录期间，杜绝任何人尝试利用浏览器进行检测或恶意注入篡改。",
    badge: "校园专属项目"
  },
  "anonymous-teacher-peer-review": {
    title: "匿名学术教师双向综合民主评测评级器",
    description: "教职工与学生之间纯匿名的课程考评系统。所有的投票单均采用加密技术安全打包，绝无任何人可以通过网络溯源泄露隐私。",
    badge: "匿名加密"
  }
};

const deProjectTranslations: Record<string, { title: string; description: string; badge?: string; features?: string[] }> = {
  "pimx-veil": {
    title: "PIMX_VEIL — Browserbasiertes hybrides Steganographie- & Sicherheits-Kit",
    description: "Eine fortschrittliche, zu 100 % clientseitige Kryptographie- und Steganographie-Suite für Browser, mit der sensible Daten unsichtbar in harmlose Trägerdateien (PDF, MP3, JPEG) injiziert werden, ohne deren Aussehen oder Funktion zu beeinträchtigen. Funktioniert vollständig unter einer Zero-Knowledge-Architektur im RAM unter Verwendung der Web Crypto API mit AES-GCM (256-Bit) Verschlüsselung und PBKDF2-Schlüsseldehnung mit über 600.000 Wiederholungen.",
    badge: "CYBER VAULT",
    features: [
      "Unsichtbare Nutzlast-Steganographie in PDF-, MP3- und JPEG-Trägern mittels EOF-Puffer-Offsets",
      "100 % browserbasierte Zero-Knowledge-RAM-Umgebung ohne externe Server oder Verbindungen",
      "Robuste Schlüsselaushärtung via PBKDF2 mit mehr als 600.000 HMAC-SHA256-Schlüsselstreckungen"
    ]
  },
  "pimx-moji": {
    title: "PIMX_MOJI ASCII-Kunst Leinwand",
    description: "Ein Online-Canvas-Tool, mit dem Sie Bilder in anpassbare ASCII-Kunst und Emoji-Mosaike umwandeln können.",
    badge: "LIVE APP",
    features: ["Echtzeit-Mapping-Algorithmus von Pixeln in ASCII-Kunst", "Schnelle Zwischenablage-Kopiervorlagen für Entwickler", "Werbefreie Steuerung mit Matrix-Themen"]
  },
  "pimx-pass": {
    title: "PIMX_PASS DNS-Geschwindigkeits-Benchmarking",
    description: "Dynamische Benchmarking-Plattform zur Messung und Bewertung der global sicheren DNS-Latenzen relativ zu Ihrem Internet-Spiele-Setup.",
    badge: "SICHERES PORTAL",
    features: ["Präzise Latenztests for alle Internetprovider", "Optimiert Verbindungsstabilität und Game-Ping", "Illustrationen für manuelle FritzBox- und Router-Konfiguration"]
  },
  "mml-wallet-bot": {
    title: "MML Wallet Verifizierung & Token Bot",
    description: "Ein automatischer Telegram-Roboter zur Registrierung von Benutzern, zur sicheren KYC-Verifizierung und zur Bearbeitung von Kaufanträgen für Community-Token.",
    badge: "KUNDEN-BOT"
  },
  "pimx-wide": {
    title: "Erweiterte serverlose Zero-Knowledge-Kryptographieplattform PIMX_WIDE",
    description: "PIMX_WIDE ist eine fortschrittliche, ultrasichere und völlig serverlose (Serverless) Webanwendung für die militärische Ver- und Entschlüsselung sensibler Daten auf Basis von Zero-Knowledge-Sicherheitsstandards. Alle Berechnungen und Kryptoprozesse finden direkt im RAM Ihres Browsers statt, wodurch Datenlecks physisch ausgeschlossen sind. Das System verfügt über ein eigenständiges AES-GCM-256-Bit-Kryptomodul mit Base64- und .json-Exporten, ein Offline-Entschlüsselungsportal mit sofortiger RAM-Bereinigung und ein hochentwickeltes Admin-Dashboard mit 34 Zeitfiltern sowie rotierenden 3D-Reaktoreffekten.",
    badge: "Militär-Krypto",
    features: [
      "Eigenständige militärische AES-GCM-Verschlüsselung mit verschlüsselten .json-Dateien und Base64-Umschlägen",
      "Erweitertes Live-Admin-Dashboard mit 34 dynamischen Zeitfiltern & Charts (Benutzer: pimxwide, Passwort: 123456789PIMX_WIDe@#$%^&)",
      "100 % serverlose Offline-Umgebung mit sofortiger RAM-Leerung und animierten rotierenden 3D-Weltraumreaktoren"
    ]
  },
  "pimx-node": {
    title: "PIMX_NODE Serverlose P2P-Dateiübertragung & Firewall-Simulator",
    description: "Die PIMX_NODE-Plattform (oder kurz PIMX) ist ein revolutionäres, ultraschnelles und vollständig serverloses Direct-P2P-Dateiübertragungsportal auf WebRTC-Basis, das ohne Cloud-Vermittlung oder Volumengrenzen arbeitet. Integriert ist ein hochentwickelter interaktiver NAT-Traversal-Simulator, der 4 Firewall-Szenarien (LAN Bridge, STUN, CGNAT und restriktive Symmetric NAT-Sperren) simuliert, ein Echtzeit-Admin-Dashboard für aktive Peers, Datenvolumen und dynamische SVG-Sparklines enthält.",
    badge: "Serverlose P2P",
    features: [
      "Direkte Peer-to-Peer-Übertragung mit WebRTC-Protokoll, die Cloud-Server komplett umgeht",
      "Interaktiver und adaptiver NAT-Traversal-Simulator für 4 Szenarien (horizontales Layout auf dem Desktop, vertikal auf dem Handy)",
      "Echtzeit-Diagnoseportal mit animierten SVG-Kurvendiagrammen und detaillierten Gerätestatistiken"
    ]
  },
  "pimx-pass-bot": {
    title: "PIMX_PASS_BOT VPN Autonomer Tunnel-Bot",
    description: "Ein robuster Telegram-Verbindungs-Bot zur schnellen automatischen Zuweisung und Verteilung stabiler V2Ray- und OpenVPN-Konfigurationen.",
    badge: "SICHERER TUNNEL"
  },
  "pimx-play-bot": {
    title: "PIMX_PLAY_BOT Google Play APK Downloader Bot",
    description: "Automatisierter Telegram-Daemon zum Durchsuchen und direkten Herunterladen virengeprüfter APK-Dateien aus dem Google Play Store ohne lästige Werbung.",
    badge: "APPLICATION HUNTER"
  },
  "pimx-sonic-bot": {
    title: "PIMX_SONIC_BOT Offline-Musik-Streamer",
    description: "Medien-Suche und Downloader-Assistent innerhalb von Telegram zur Minimierung des Datenverbrauchs im Mobilfunknetz.",
    badge: "MUSIC STREAMER"
  },
  "school-blog-cms": {
    title: "Schulakademie-Blog CMS",
    description: "Inhaltsverwaltungssystem für akademische Schulprojekte mit sicherer Benutzerauthentifizierung und Multimedia-Editor.",
    badge: "SCHULPROJEKT"
  },
  "advanced-monitoring-chatbot": {
    title: "Konversationeller Chatbot mit Monitoring-Panel",
    description: "Fortschrittlicher Chatbot mit Gemini-Unterstützung und administrativem Kontrollzentrum zur Überwachung von logs und IP-Sperren.",
    badge: "PREMIUM ENGINE"
  },
  "multilingual-frontend-bot": {
    title: "Mehrsprachiger reiner Frontend-Chatbot",
    description: "Ein schneller, komplett Client-seitiger Chatbot, der 10 Sprachen direkt im Browser ohne Backend-Datenbank unterstützt.",
    badge: "NUR FRONTEND"
  },
  "telegram-agent-admin-panel": {
    title: "Autonomer Telegram-Konto-Agent & Admin-Konsole",
    description: "Serverseitiges Skript zur automatischen Steuerung von Telegram-Aktivitäten mit webbasierter grafischer Benutzeroberfläche.",
    badge: "DAEMON ENGINE"
  },
  "gemini-webhook-mailer": {
    title: "Gemini AI Automation mit E-Mail-Integrator",
    description: "Intelligente Automatisierung mit n8n E-Mail-Pipelines zur automatischen Zustellung Ihrer KI-Rechercheergebnisse.",
    badge: "N8N PIPELINE"
  },
  "housing-ads-scrapper-bot": {
    title: "Immobilien-Scraper & Telegram-Warn-Bot",
    description: "Sucht im Hintergrund kontinuierlich nach passenden Wohnungsangeboten und sendet sofortige Benachrichtigungen an Telegram.",
    badge: "SCRAPY MODUL"
  },
  "personal-resume-gate": {
    title: "Moderne persönliche Portfolio-Website",
    description: "Eine elegante Landingpage zur Präsentation von Berufserfahrung, Programmierkenntnissen und offiziellen Zertifikaten.",
    badge: "WEB PORTAL"
  },
  "flutter-chatbot-arcade": {
    title: "Flutter Custom Chatbot & Arcade-Spiele",
    description: "Feine mobile Client-App für Android mit interaktivem Chathilfe-Dienst und klassischen Arcade-Spielen (Tetris, XO, Memory).",
    badge: "FLUTTER APP"
  },
  "telegram-content-maker-make": {
    title: "Verteiler-Automatisierung für Telegram",
    description: "Verbindet globale Mediendienstleistungen über Make-Automatisierungs-Workflows direkt mit Ihren Telegram-Gruppen.",
    badge: "AUTOMATISIERUNG"
  },
  "persian-chatbot-dashboard": {
    title: "Lokalisierter Chatbot mit Analyse-Dashboard",
    description: "Lokale dialogorientierte KI-Lösung mit detaillierten Tracking-Parametern zur Bewertung von Latenz und Serverlast.",
    badge: "ADMIN PORTAL"
  },
  "school-grading-platform": {
    title: "Sicheres Notenportal für Lehrkräfte",
    description: "Schulsystem zur Erfassung von Schülerleistungen, welches Manipulationen und Quellcode-Auslesungen wirksam blockiert.",
    badge: "SCHULPROJEKT"
  },
  "anonymous-teacher-peer-review": {
    title: "Schülerbewertung & Anonyme Feedback-Plattform",
    description: "Sicherer, Token-geschützter Kurs-Evaluierungsdienst zur Erfassung ehrlicher Schülermeinungen mit absoluter Verschlüsselung.",
    badge: "ANONYME DATEN"
  }
};

const frProjectTranslations: Record<string, { title: string; description: string; badge?: string; features?: string[] }> = {
  "pimx-veil": {
    title: "PIMX_VEIL — Suite Hybride de Stéganographie & de Sécurité dans le Navigateur",
    description: "Une suite de sécurité de niveau militaire, 100 % côté client, permettant aux utilisateurs de chiffrer des fichiers hautement sensibles et de les injecter de manière invisible dans des fichiers porteurs inoffensifs (PDF, MP3, JPEG). Fonctionne entièrement sous une architecture Zero-Knowledge dans la RAM du navigateur en utilisant l'API Web Crypto avec AES-GCM (256 bits) et d'une dérivation de clés PBKDF2 avec plus de 600 000 étirements.",
    badge: "CYBER VAULT",
    features: [
      "Stéganographie invisible intégrant des données dans des conteneurs PDF, MP3 et JPEG sans altérer le format",
      "Environnement 100 % client et Zero-Knowledge sur RAM locale via Web Crypto API",
      "Dérivation de clés PBKDF2 haute sécurité exécutant plus de 600 000 itérations HMAC-SHA256"
    ]
  },
  "pimx-moji": {
    title: "PIMX_MOJI Canevas Artistique ASCII",
    description: "Un utilitaire de canevas créatif pour convertir des images ou des paramètres en œuvres d'art texte ASCII sytlisées.",
    badge: "APP EN DIRECT",
    features: ["Traitement interactif des données d'image en art texte", "Sauvegarde rapide dans le presse-papiers sous format adaptatif", "Thèmes rétro Matrix préchargés"]
  },
  "pimx-pass": {
    title: "Diagnostic de performance DNS PIMX_PASS",
    description: "Évaluez et scorez les latences des DNS mondiaux sécurisés en temps réel par rapport à votre connexion.",
    badge: "PASSERELLE SÉCURISÉE",
    features: ["Algorithmes d'évaluation en temps réel pour tous FAI", "Réduction des pertes de paquets et du jitter de connexion", "Guides visuels pas-à-pas pour les routeurs et smartphones"]
  },
  "mml-wallet-bot": {
    title: "Validation KYC & Token Bot MML Wallet",
    description: "Un bot Telegram automatisé conçu pour enregistrer les utilisateurs, faciliter la validation sécurisée des identités et valider les transferts de jetons d'achat.",
    badge: "BOT CLIENT"
  },
  "pimx-wide": {
    title: "Console de cryptographie avancée sans serveur PIMX_WIDE",
    description: "PIMX_WIDE est une plateforme web avancée, ultra-sécurisée et entièrement sans serveur (Serverless) conçue pour le chiffrement et le déchiffrement de qualité militaire des données hautement sensibles, sous une architecture stricte de type Zero-Knowledge dans la RAM locale. Tous les processus informatiques s'exécutent localement dans votre navigateur ; aucune donnée n'est envoyée ou stockée sur un quelconque serveur. Elle dispose d'une console de chiffrement indépendante (AES-GCM 256 bits) avec sorties Base64 et .json, d'un portail de déchiffrement hors ligne qui vide la mémoire RAM, et d'un tableau de bord de supervision avec 34 filtres temporels et des réacteurs 3D tournants.",
    badge: "Chiffrement Militaire",
    features: [
      "Console de cryptage autonome conforme à la norme militaire AES-GCM avec exportation .json et enveloppes Base64 sécurisées",
      "Tableau de bord administrateur en direct avec 34 filtres de plage temporelle et graphiques vectoriels (ID : pimxwide, MDP : 123456789PIMX_WIDe@#$%^&)",
      "Environnement 100% sans serveur ni stockage, équipé d'un nettoyage de la RAM et de réacteurs animés 3D en lévitation"
    ]
  },
  "pimx-node": {
    title: "PIMX_NODE Transfert de fichiers P2P sans serveur & Simulateur réseau",
    description: "La plateforme PIMX_NODE (ou PIMX) est un portail de transfert de fichiers peer-to-peer (P2P) direct, révolutionnaire, extrêmement rapide et entièrement sans serveur (Serverless) basé sur le protocole WebRTC. Sans intermédiaire cloud ou limite de taille, il intègre également un simulateur interactif de traversée NAT et pare-feu modélisant 4 scénarios (LAN Bridge, STUN, CGNAT et blocages restrictifs Symmetric NAT), avec un panneau de contrôle temps réel affichant les pairs en ligne et des graphiques SVG dynamiques.",
    badge: "P2P Sans Serveur",
    features: [
      "Transfert de fichiers direct de pair à pair (P2P) à l'aide de WebRTC, éliminant tout intermédiaire cloud",
      "Simulateur de traversée NAT interactif modélisant 4 types de pare-feu (mise en page horizontale sur PC et verticale sur mobile)",
      "Portail d'analyse technique en direct avec sparklines vectorielles animées SVG et détails du trafic"
    ]
  },
  "pimx-pass-bot": {
    title: "PIMX_PASS_BOT Bot Tunnel Réseau Intelligent",
    description: "Un assistant de connectivité performant offrant un accès en temps réel aux tunnels et profils V2Ray et OpenVPN.",
    badge: "CONNEXIONS SÉCURISÉES"
  },
  "pimx-play-bot": {
    title: "PIMX_PLAY_BOT Téléchargeur APK Libres Google Play",
    description: "Un daemon automatisé inspectant et téléchargeant les paquets APK directement depuis Google Play sans publicités intrusives.",
    badge: "LOGICIELS FIABLES"
  },
  "pimx-sonic-bot": {
    title: "Lecteur Audio & Téléchargeur PIMX_SONIC_BOT",
    description: "Un outil optimisé pour économiser la bande passante mobile en téléchargeant et indexant directement les médias dans l'environnement Telegram.",
    badge: "STREAMING FLUIDE"
  },
  "school-blog-cms": {
    title: "CMS Universitaire de Blog de l'École",
    description: "Système académique développé pour la direction éducationnelle, doté d'une gestion complète d'édition de documents multimédia.",
    badge: "PROJET ÉCOLE"
  },
  "advanced-monitoring-chatbot": {
    title: "Chatbot Intelligent et Module de Contrôle Admin",
    description: "Interface de dialogue avancée connectée à Gemini avec tableaux de bord de surveillance pour restreindre les abus et bloquer les IP.",
    badge: "ROBUSTE ET SÛR"
  },
  "multilingual-frontend-bot": {
    title: "Chatbot Client purement Frontend Multilingue",
    description: "Une application client rapide gérant 10 langues nativement sur le navigateur de l'appareil sans couche données SQL.",
    badge: "FRONTEND SEUL"
  },
  "telegram-agent-admin-panel": {
    title: "Module de Contrôle Automatique Telegram",
    description: "Un processus écrit en Python gérant des flux de messages avec console de supervision graphique moderne.",
    badge: "MOTEUR DAEMON"
  },
  "gemini-webhook-mailer": {
    title: "Automatisation Gemini vers E-mail via Webhooks",
    description: "Assistant d'enquêtes analytiques exploitant Gemini et n8n pour envoyer des rapports triés ver vos boîtes de réception.",
    badge: "PIPELINE N8N"
  },
  "housing-ads-scrapper-bot": {
    title: "Bot Scraping Immobilier & Alerte Telegram",
    description: "Déploie des scripts automatisés pour chercher et cataloguer les annonces correspondantes à votre budget.",
    badge: "MODULE SCRAPY"
  },
  "personal-resume-gate": {
    title: "Site de Présentation Moderne de Portfolio",
    description: "Présentation réactive de l'expérience, de l'expertise, des technologies logicielles et des certifications.",
    badge: "PORTAIL WEB"
  },
  "flutter-chatbot-arcade": {
    title: "Application Mobile Flutter & Émulateur Arcade",
    description: "Application client mobile hybride avec assistant conversationnel ainsi que des jeux de logique rétro (Tetris, XO).",
    badge: "APPLICATION FLUTTER"
  },
  "telegram-content-maker-make": {
    title: "Automatisation Flux de Publication Telegram",
    description: "Connecte des services d'actualités mondiaux à vos salons Telegram via des intégrations Make automatisées.",
    badge: "INTÉGRATION COMPLÈTE"
  },
  "persian-chatbot-dashboard": {
    title: "Console Analytique Locale de Chatbot AI",
    description: "Outil d'analyse locale comptabilisant les accès du trafic, la latence des réponses et la charge serveur.",
    badge: "PANNEAU DE BORD"
  },
  "school-grading-platform": {
    title: "Portail de Notation Sécurisé des Enseignants",
    description: "Système d'évaluation crypté pour enseignants, bloquant les modifications ou inspections illicites par l'utilisateur.",
    badge: "PROJET ÉCOLE"
  },
  "anonymous-teacher-peer-review": {
    title: "Évaluation Académique Anonyme des Enseignants",
    description: "Système de collecte d'opinions étudiantes hautement sécurisé par clés d'authentification uniques.",
    badge: "DONNÉES SÉCURISÉES"
  }
};

const itProjectTranslations: Record<string, { title: string; description: string; badge?: string; features?: string[] }> = {
  "pimx-veil": {
    title: "PIMX_VEIL — Suite Ibrida di Steganografia e Sicurezza delle Informazioni nel Browser",
    description: "Una suite di livello militaire, 100% lato client, che permette di cifrare file altamente riservati e iniettarli invisibilmente in file portanti innocui (PDF, MP3 o JPEG). Funzionando interamente con un approccio Zero-Knowledge nella RAM del browser tramite Web Crypto API con cifratura AES-GCM (256-bit) e derivazione chiavi PBKDF2 con oltre 600.000 iterazioni.",
    badge: "CYBER VAULT",
    features: [
      "Steganografia invisibile iniettando pacchetti dati in vettori PDF, MP3 e JPEG sans altérer le format",
      "Ambiente 100% client-side zero-knowledge su RAM locale tramite Web Crypto API",
      "Robustezza derivazione chiavi via PBKDF2 con più di 600.000 cicli HMAC-SHA256"
    ]
  },
  "pimx-moji": {
    title: "PIMX_MOJI ASCII Arts Tela Creativa",
    description: "Piattaforma creativa proiettata a trasformare immagini e testi in splendidi mosaici ASCII ed emoji.",
    badge: "APP ONLINE",
    features: ["Conversione interattiva di pixel in caratteri di testo", "Copia rapida negli appunti per layout integrati", "Temi retrò in stile hacker Matrix"]
  },
  "pimx-pass": {
    title: "PIMX_PASS DNS Performance Diagnostics",
    description: "Piattaforma avanzata per misurare la latenza dei DNS globali, migliorando l'esperienza di navigazione e gioco online.",
    badge: "GATEWAY PROTETTO",
    features: ["Test di latenza personalizzati sulla tua linea internet", "Eliminazione del ping jitter e lag nei caricamenti", "Manuale illustrato di configurazione pro router e desktop"]
  },
  "mml-wallet-bot": {
    title: "Verifica Identità & Scambio MML Wallet",
    description: "Un assistente Telegram automatizzato sviluppato per autenticare utenti, caricare KYC ed eseguire trasferimenti interni controllati da remoto.",
    badge: "BOT CLIENTE"
  },
  "pimx-wide": {
    title: "Console crittografica avanzata e serverless PIMX_WIDE",
    description: "PIMX_WIDE è uno strumento web avanzato, estremamente sicuro e completamente serverless progettato per la crittografia e decrittografia di livello militare di dati sensibili sotto un'architettura rigorosamente zero-knowledge nella RAM locale. Tutti i processi di elaborazione avvengono localmente all'interno del browser; nessun dato viene trasmesso o registrato su un server esterno. È dotato di una console di crittografia indipendente (AES-GCM 256-bit) with uscite Base64 e .json, di un portale di decrittografia offline che svuota la memoria di sistema e di una dashboard di amministrazione dal vivo con 34 filtri temporali, valorizzata da effetti di reattori 3D rotanti.",
    badge: "Crittografia Militare",
    features: [
      "Console di crittografia autonoma conforme agli standard militari AES-GCM con esportazione .json ed buste Base64 protette",
      "Pannello amministratore in tempo reale con 34 filtri di intervallo temporale e grafici vettoriali (ID: pimxwide, PASS: 123456789PIMX_WIDe@#$%^&)",
      "Ambiente 100% serverless senza database, dotato di cancellazione della memoria RAM e reattori spaziali rotanti 3D"
    ]
  },
  "pimx-node": {
    title: "PIMX_NODE P2P File Transfer e Simulatore di Rete Senza Server",
    description: "La piattaforma PIMX_NODE (o brevemente PIMX) è un portail di trasferimento diretto di file peer-to-peer (P2P) basato sul protocollo WebRTC, senza server o limiti di dimensioni. Include un simulatore interattivo di attraversamento NAT e firewall con 4 scenari (LAN Bridge, STUN, CGNAT e blocchi restrittivi Symmetric NAT), completato da una dashboard di monitoraggio in tempo reale contenente peer attivi, volumi di traffico e grafici SVG dinamici.",
    badge: "P2P Serverless",
    features: [
      "Trasferimento diretto di file peer-to-peer (P2P) tramite WebRTC, aggirando completamente i server cloud",
      "Simulatore di attraversamento NAT interattivo e responsivo (layout orizzontale su desktop, verticale su dispositivi mobili)",
      "Portale di monitoraggio tecnico in tempo reale con sparkline vettoriali SVG animate e statistiche dettagliate sui dispositivi"
    ]
  },
  "pimx-pass-bot": {
    title: "PIMX_PASS_BOT Bot per Tunnel VPN Automatici",
    description: "Boot Telegram ad alte performance per agevolare e distribuire file di configurazione V2Ray e OpenVPN in tempo reale.",
    badge: "TUNNEL PROTETTI"
  },
  "pimx-play-bot": {
    title: "Download Sicuro Applicazioni PIMX_PLAY_BOT",
    description: "Ricerca e scarica direttamente su chat Telegram i file di installazione APK puliti del Google Play Store senza annunci dannosi.",
    badge: "APP STORE HUB"
  },
  "pimx-sonic-bot": {
    title: "PIMX_SONIC_BOT Streamer in Streaming Offline",
    description: "Progetto concepito per indicizzare, ascoltare e salvare file audio in locale riducendo il consumo di traffico internet.",
    badge: "AUDIO STREAM"
  },
  "school-blog-cms": {
    title: "Portale CMS d'Istituto Scolastico",
    description: "Sistema integrato per la direzione didattica scolastica con solido backend di autenticazione ed editor blog di documenti multimediali.",
    badge: "PROGETTO SCUOLA"
  },
  "advanced-monitoring-chatbot": {
    title: "Chatbot Intelligente & Console Monitoraggio Admin",
    description: "Motore di chat interattivo su protocollo Gemini e controllo per l'amministratore per limitare violazioni e inserire ban IP.",
    badge: "CORE ENGINE"
  },
  "multilingual-frontend-bot": {
    title: "Chatbot Multilingua Puro Frontend Cliente",
    description: "Interact con un chatbot leggero in 10 lingue, ideale per smartphone a prestazioni basse senza storage SQL.",
    badge: "SOLO FRONTEND"
  },
  "telegram-agent-admin-panel": {
    title: "Controllo Automatizzato Canali Telegram",
    description: "Daemon scritto in Python per dirigere in modo efficiente l'interattività dei canali social legandoli a log e cruscotti.",
    badge: "DAEMON ENGINE"
  },
  "gemini-webhook-mailer": {
    title: "Integrazione Automatica Gemini & SMTP Mailer",
    description: "Svolge interrogazioni approfondite con Gemini e sfrutta i connettori n8n per trasmettere report direttamente su posta elettronica.",
    badge: "PROCESSI N8N"
  },
  "housing-ads-scrapper-bot": {
    title: "Bot Telegram per Estrazione Annunci Immobiliari",
    description: "Avvia algoritmi avanzati di scraping per monitorare e segnalare alloggi idonei alle preferenze di prezzo inserite.",
    badge: "SCRAPING MODULE"
  },
  "personal-resume-gate": {
    title: "Sito di Presentazione Personale Moderno",
    description: "Landing page creata per esibire il curriculum di studi, specializzazioni ed esperienze nello sviluppo web.",
    badge: "PORTALE WEB"
  },
  "flutter-chatbot-arcade": {
    title: "App Mobile Flutter & Emulatori Giochi Arcade",
    description: "App nativa con assistente intelligente integrato e storici videogiochi vintage funzionanti interamente offline.",
    badge: "APP FLUTTER"
  },
  "telegram-content-maker-make": {
    title: "Orchestratore di Pubblicazione Contenuti",
    description: "Connette i feed dei siti mondiali d’informazione spingendoli su canali Telegram tramite flussi di lavoro su Make.",
    badge: "AUTOMAZIONE"
  },
  "persian-chatbot-dashboard": {
    title: "Pannello Statistico per Server Chatbot",
    description: "Soluzione integrata ad uso amministrativo dedita alla misurazione di latenze e volume dei dati gestiti complessivi.",
    badge: "MINDPORTAL"
  },
  "school-grading-platform": {
    title: "Registro Voti Docenti con Controllo di Accesso",
    description: "Portale web blindato adibito alla memorizzazione delle valutazioni scolastiche, salvaguardando l'integrità dei parametri scolastici.",
    badge: "PROGETTO SCUOLA"
  },
  "anonymous-teacher-peer-review": {
    title: "Feedback Docenti Anonimo & Valutazione",
    description: "Fornisce alla classe aree di compilazione crittografate accessibili solo via token univoco per inoltrare opinioni in forma totalmente anonima.",
    badge: "DATI CRYPTO"
  }
};

const ruProjectTranslations: Record<string, { title: string; description: string; badge?: string; features?: string[] }> = {
  "pimx-veil": {
    title: "PIMX_VEIL — Браузерная гибридная система информационной безопасности и стеганографии",
    description: "Прогрессивный и полностью локальный (Client-Side) защитный комплекс military уровня, позволяющий шифровать чувствительные файлы и невидимо внедрять их в безобидные файлы-носители (PDF-документы, MP3-треки или JPEG-изображения) без изменения их структуры или работоспособности. Работает по принципу Zero-Knowledge непосредственно в оперативной памяти браузера через Web Crypto API на базе 256-битного алгоритма AES-GCM и PBKDF2 со значением растягивания ключа более 600,000 раз.",
    badge: "КИБЕР-СЕЙФ",
    features: [
      "Невидимое внедрение полезной нагрузки в PDF, MP3 и JPEG без повреждения исходных носителей",
      "Полная безопасность на стороне клиента благодаря архитектуре Zero-Knowledge и Web Crypto API внутри ОЗУ",
      "Максимальная криптостойкость ключей за счет PBKDF2 с более чем 600,000 итерациями хэширования"
    ]
  },
  "pimx-moji": {
    title: "PIMX_MOJI Генератор ASCII-графики",
    description: "Онлайн-холст для转换图像并快速生成文本艺术字、Emoji拼贴等的创意外用工具，内载黑客主题样式的Matrix经典配置。",
    badge: "ОНЛАЙН-ПРИЛОЖЕНИЕ",
    features: ["Интерактивное преобразование пикселей в символы", "Быстрое копирование готовых шаблонов в буфер обмена", "Ретро-темы оформления в стиле матрицы"]
  },
  "pimx-pass": {
    title: "Тестирование DNS PIMX_PASS Diagnostics",
    description: "Высокоточная диагностическая платформа для измерения пинга безопасных мировых серверов DNS под вашего провайдера.",
    badge: "БЕЗОПАСНЫЙ ШЛЮЗ",
    features: ["Алгоритмы тестирования пинга под каждого провайдера", "Снижение задержек и стабилизация игрового процесса", "Инструкции по настройке подключения на роутерах и ПК"]
  },
  "mml-wallet-bot": {
    title: "MML Wallet Покупка токенов & Верификация",
    description: "Специализированный бот для Telegram для регистрации клиентов, передачи KYC-документов и безопасного совершения сделок под контролем администратора.",
    badge: "БОТ КЛИЕНТА"
  },
  "pimx-wide": {
    title: "Бессерверная платформа сверхсекретного шифрования PIMX_WIDE",
    description: "PIMX_WIDE — это передовое, ультразащищенное веб-приложение, работающее полностью на стороне клиента без серверов (Serverless) и предназначенное для шифрования и дешифрования конфиденциальных данных военного уровня под архитектурой Zero-Knowledge в локальной оперативной памяти. Все вычислительные процессы происходят непосредственно на вашем устройстве; данные никогда не передаются и не хранятся на внешних серверах. Система оснащена независимой консолью шифрования AES-GCM 256-бит, офлайн-порталом удаления ключей из RAM, продвинутой админ-панелью мониторинга с 34 временными фильтрами и анимированным 3D космическим реактором.",
    badge: "Военное шифрование",
    features: [
      "Автономная военная криптография AES-GCM с экспортом зашифрованных .json файлов и контейнеров Base64",
      "Продвинутая панель мониторинга с 34 шкалами временной фильтрации и линейными графиками (логин: pimxwide, пароль: 123456789PIMX_WIDe@#$%^&)",
      "100% бессерверная офлайн-среда с быстрой очисткой оперативной памяти и интерактивным зацикленным 3D-реактором"
    ]
  },
  "pimx-node": {
    title: "Бессерверный портал обмена файлами P2P и симулятор сетей PIMX_NODE",
    description: "Платформа PIMX_NODE (или коротко PIMX) — это революционный, сверхбыстрый и полностью бессерверный (Serverless) веб-портал прямого обмена файлами peer-to-peer (P2P), работающий на базе протокола WebRTC без использования облачных хранилищ и ограничений на размер файлов. Также в систему встроен интерактивный симулятор прохождения NAT и брандмауэров, моделирующий 4 сценария (LAN Bridge, STUN, CGNAT и Symmetric NAT), дополненный панелью мониторинга активных участников и SVG-графиками.",
    badge: "P2P без серверов",
    features: [
      "Прямая передача файлов от пользователя к пользователю (P2P) через WebRTC в обход промежуточных облак",
      "Интерактивный симулятор прохождения NAT для 4 сценариев (горизонтальный вид на ПК, вертикальный — на смартфонах)",
      "Техническая панель мониторинга в реальном времени с анимированными SVG-графиками и деталями трафика"
    ]
  },
  "pimx-pass-bot": {
    title: "PIMX_PASS_BOT VPN Бот автоматического туннелирования",
    description: "Надежный служебный бот в Telegram для мгновенного получения и распространения стабильных профилей V2Ray и OpenVPN.",
    badge: "ЗАЩИЩЕННЫЙ ТРАНЗИТ"
  },
  "pimx-play-bot": {
    title: "Удобный загрузчик APK-файлов PIMX_PLAY_BOT",
    description: "Умный бот для обхода медленных рекламных ссылок и быстрого скачивания APK прямо из Google Play с антивирусным сканированием.",
    badge: "ЗАГРУЗЧИК APK"
  },
  "pimx-sonic-bot": {
    title: "Аудио-плеер и кэшер медиа PIMX_SONIC_BOT",
    description: "Инструмент для поиска и локального кэширования музыки внутри Telegram, оптимизирующий потребление мобильного интернета.",
    badge: "МЕДИА-ПЛЕЕР"
  },
  "school-blog-cms": {
    title: "Академическая CMS и Блог для учебных заведений",
    description: "Система публикации и мониторинга учебных материалов с защищенной авторизацией преподавателей и мультимедийным редактором.",
    badge: "ШКОЛЬНЫЙ ПРОЕКТ"
  },
  "advanced-monitoring-chatbot": {
    title: "Умный Чатбот под контролем системы аналитики",
    description: "Диалоговая система на платформе Gemini со специальной панелью администратора для выявления спама и бана нарушителей по IP.",
    badge: "АНАЛИТИКА И ЧАТ"
  },
  "multilingual-frontend-bot": {
    title: "Мультиплатформенный чатбот только на Frontend",
    description: "Быстрый веб-интерфейс чатбота на 10 языках, оптимизированный под слабые смартфоны и не требующий внешних баз данных.",
    badge: "ЧИСТЫЙ FRONTEND"
  },
  "telegram-agent-admin-panel": {
    title: "Автоматический координатор для каналов Telegram",
    description: "Умный скрипт на Python для обработки входящего трафика сообщений с легким интерфейсом статистики.",
    badge: "МЕНЕДЖЕР ДЕМОНА"
  },
  "gemini-webhook-mailer": {
    title: "Gemini Интеграция & SMTP Шлюз Рассылок",
    description: "Бот для исследования сложных запросов с помощью Gemini и интеграции n8n для отправки сводных отчетов на почту.",
    badge: "ЮНИТЫ N8N"
  },
  "housing-ads-scrapper-bot": {
    title: "Бот-парсер жилья и каталогов недвижимости",
    description: "Автоматический фоновый сбор данных о жилье с фильтрацией по цене и моментальной рассылкой карточек в Telegram.",
    badge: "ОТКРЫТЫЙ СКРАПЕР"
  },
  "personal-resume-gate": {
    title: "Современное портфолио-резюме (Мохаммадреза)",
    description: "Интерактивная адаптивная визитка, показывающая технический стек, завершенные проекты и сертификаты Sharif University.",
    badge: "ВЕБ ИНТЕРФЕЙС"
  },
  "flutter-chatbot-arcade": {
    title: "Мобильное приложение Flutter & Игры-Аркады",
    description: "Клиентское приложение для Android с виртуальным помощником и набором классических игр (Тетрис, XO).",
    badge: "ПРИЛОЖЕНИЕ FLUTTER"
  },
  "telegram-content-maker-make": {
    title: "Автогенератор публикаций в рабочие группы",
    description: "Интеграция новостных каналов с Telegram чатами через конвейер Make сценариев на базе триггеров.",
    badge: "АВТОМАТИЗАЦИЯ"
  },
  "persian-chatbot-dashboard": {
    title: "Административный трекер для аналитики ИИ",
    description: "Система оценки общей производительности, задержки ответов и динамики базы пользователей сервера.",
    badge: "КОНСОЛЬ АДМИНА"
  },
  "school-grading-platform": {
    title: "Портал внесения академических оценок учителями",
    description: "Веб-инструмент для надежной фиксации оценок школьников, гарантирующий защиту от нелегального перехвата сессий.",
    badge: "ШКОЛЬНЫЙ ПРОЕКТ"
  },
  "anonymous-teacher-peer-review": {
    title: "Анонимный аудит эффективности преподавания",
    description: "Опросы и оценки преподавателей учащимися. Доступ ограничен токенами без возможности утечки личных данных.",
    badge: "ЗАЩИЩЕНО КРИПТО"
  }
};

const elProjectTranslations: Record<string, { title: string; description: string; badge?: string; features?: string[] }> = {
  "pimx-veil": {
    title: "PIMX_VEIL — Υπερσύγχρονο Σύστημα Ασφαλείας Πληροφοριών & Υβριδικής Στεγανογραφίας στο Πρόγραμμα Περιήγησης",
    description: "Μια στρατιωτικού επιπέδου, 100% τοπική (Client-Side) σουίτα ασφαλείας που επιτρέπει στους χρήστες να κρυπτογραφούν εξαιρετικά ευαίσθητα αρχεία και να τα εγχέουν αόρατα μέσα σε ακίνδυνα αρχεία-φορείς (έγγραφα PDF, μουσική MP3 ή εικόνες JPEG) χωρίς καμία αλλαγή στη μορφή ή τη λειτουργικότητά τους. Σχεδιασμένο με την αρχιτεκτονική Zero-Knowledge στη μνήμη RAM του browser, χρησιμοποιώντας τους αλγόριθμους AES-GCM 256-bit και PBKDF2 με περισσότερες από 600.000 επαναλήψεις.",
    badge: "CYBER VAULT",
    features: [
      "Αόρατη στεγανογραφία εισάγοντας δεδομένα σε φορείς PDF, MP3 και JPEG χωρίς ζημιά στο αρχείο",
      "Πλήρης ασφάλεια από την πλευρά του χρήστη με Web Crypto API και Zero-Knowledge περιβάλλον στη RAM",
      "Ισχυρή παραγωγή κλειδιού μέσω PBKDF2 με περισσότερες από 600.000 επαναλήψεις HMAC-SHA256"
    ]
  },
  "pimx-moji": {
    title: "PIMX_MOJI Καμβάς Τέχνης ASCII",
    description: "Δημιουργικό εργαλείο μετατροπής εικόνων και κειμένων σε εντυπωσιακά ASCII ψηφιδωτά και emoji.",
    badge: "LIVE WEB APP",
    features: ["Μετατροπή pixel εικόνας σε χαρακτήρες κειμένου", "Γρήγορη αντιγραφή στο πρόχειρο για κοινή χρήση", "Προεγκατεστημένα ρετρό θέματα Matrix"]
  },
  "pimx-pass": {
    title: "PIMX_PASS DNS Έλεγχος & Διάγνωση",
    description: "Benchmark πλατφόρμα ελέγχου και μέτρησης καθυστέρησης των παγκόσμιων ασφαλών DNS διακομιστών.",
    badge: "ΑΣΦΑΛΗΣ ΠΥΛΗ",
    features: ["Δοκιμές απόκρισης σύμφωνα με τον πάροχο διαδικτύου σας", "Μείωση των διακυμάνσεων ping και βελτίωση σταθερότητας", "Οδηγίες εγκατάστασης σε routers και συσκευές"]
  },
  "mml-wallet-bot": {
    title: "MML Wallet Έλεγχος Ταυτότητας & Token Bot",
    description: "Αυτοματοποιημένο bot στο Telegram για την εγγραφή πελατών, υποβολή KYC εγγράφων και ασφαλή αγορά token υπό έλεγχο διαχειριστή.",
    badge: "CLIENT BOT"
  },
  "pimx-wide": {
    title: "Προηγμένη Serverless Πλατφόρμα Κρυπτογράφησης PIMX_WIDE",
    description: "Το PIMX_WIDE είναι ένα προηγμένο, εξαιρετικά ασφαλές και πλήρως serverless διαδικτυακό εργαλείο σχεδιασμένο για στρατιωτικού επιπέδου κρυπτογράφηση και αποκρυπτογράφηση ευαίσθητων δεδομένων, υπό αρχιτεκτονική zero-knowledge στην τοπική μνήμη RAM. Όλη η επεξεργασία γίνεται στη συσκευή σας. Διαθέτει ανεξάρτητη κονσόλα κρυπτογράφησης AES-GCM 256-bit με εξαγωγή Base64 και .json, πύλη αποκρυπτογράφησης με άμεσο καθαρισμό της RAM, και έναν πίνακα ελέγχου διαχειριστή με 34 χρονικά φίλτρα, πλαισιωμένο από τρισδιάστατους (3D) περιστρεφόμενους πυρηνικούς αντιδραστήρες.",
    badge: "Στρατιωτικό AI/Crypto",
    features: [
      "Αυτόνομη στρατιωτική κρυπτογράφηση AES-GCM με εξαγωγή προστατευμένων .json αρχείων & Base64 φακέλων",
      "Προηγμένος πίνακας ελέγχου με 34 χρονικά φίλτρα & διαγράμματα (ID: pimxwide, PASS: 123456789PIMX_WIDe@#$%^&)",
      "100% serverless offline περιβάλλον με άμεσο καθαρισμό της μνήμης RAM και τρισδιάστατους περιστρεφόμενους αντιδραστήρες"
    ]
  },
  "pimx-node": {
    title: "PIMX_NODE Serverless P2P Μεταφορά Αρχείων & Προσομοιωτής Firewall",
    description: "Η πλατφόρμα PIMX_NODE (ή PIMX) είναι μια επαναστατική, εξαιρετικά γρήγορη και πλήρως serverless πύλη άμεσης peer-to-peer (P2P) μεταφοράς αρχείων μέσω του πρωτοκόλλου WebRTC, χωρίς ενδιάμεσα clouds ή όρια μεγέθους. Περιλαμβάνει έναν διαδραστικό προσομοιωτή NAT Traversal και firewall 4 σεναρίων (LAN Bridge, STUN, CGNAT, και Symmetric NAT), συμπληρωμένο από έναν πίνακα ελέγχου σε πραγματικό χρόνο για ενεργούς χρήστες, όγκο δεδομένων και δυναμικά SVG γραφήματα.",
    badge: "Serverless P2P",
    features: [
      "Άμεση peer-to-peer μεταφορά αρχείων με WebRTC, παρακάμπτοντας πλήρως τους διακομιστές cloud",
      "Διαδραστικός και responsive προσομοιωτής NAT traversal 4 σεναρίων (οριζόντια σχεδίαση σε PC, κάθετη σε κινητά)",
      "Τεχνικός πίνακας ελέγχου πραγματικού χρόνου με κινούμενα SVG sparklines και λεπτομερή στατιστικά συσκευών"
    ]
  },
  "pimx-pass-bot": {
    title: "PIMX_PASS_BOT VPN Bot Αυτόματης Δρομολόγησης",
    description: "Γρήγορο bot στο Telegram για την αυτόματη διανομή σταθερών αρχείων ρυθμίσεων δικτύου V2Ray και OpenVPN.",
    badge: "ΑΣΦΑΛΗ TUNNELS"
  },
  "pimx-play-bot": {
    title: "PIMX_PLAY_BOT Λήψη Ασφαλών APK Google Play",
    description: "Αυτόματος daemon στο Telegram που αναλύει links του Google Play και σας στέλνει απευθείας καθαρά APK αρχεία χωρίς διαφημίσεις.",
    badge: "APK HUNTER"
  },
  "pimx-sonic-bot": {
    title: "Offline Music Player PIMX_SONIC_BOT",
    description: "Ενσωματωμένη πλατφόρμα στο Telegram για αναζήτηση, λήψη και caching μουσικής με ελάχιστη κατανάλωση bandwidth.",
    badge: "MUSIC STREAMER"
  },
  "school-blog-cms": {
    title: "Σχολικό CMS Ακαδημαϊκού Ιστολογίου",
    description: "Σύστημα διαχείρισης εκπαιδευτικού περιεχομένου με ασφαλή είσοδο εκπαιδευτικών και επεξεργαστή πολυμέσων.",
    badge: "ΣΧΟΛΙΚΟ ΕΡΓΟ"
  },
  "advanced-monitoring-chatbot": {
    title: "Έξυπνο Chatbot με Πίνακα Παρακολούθησης",
    description: "Εργαλείο συνομιλίας εξοπλισμένο με API της Gemini και πίνακα ελέγχου για τον εντοπισμό παραβιάσεων και αποκλεισμό IP χρηστών.",
    badge: "ΣΥΣΤΗΜΑ ENGINE"
  },
  "multilingual-frontend-bot": {
    title: "Πολύγλωσσο Pure Frontend CLIENT Chatbot",
    description: "Γρήγορο chatbot στην πλευρά του client που υποστηρίζει 10 γλώσσες σε 5 βασικές προβολές, χωρίς backend βάση δεδομένων.",
    badge: "FRONTEND ΜΟΝΟ"
  },
  "telegram-agent-admin-panel": {
    title: "Αυτόματος Διαχειριστής Καναλιών Telegram",
    description: "Υπηρεσία Python που διαχειρίζεται αυτόματα τις απαντήσεις καναλιών στο Telegram, με γραφικό πίνακα ελέγχου.",
    badge: "ΜΗΧΑΝΗ DAEMON"
  },
  "gemini-webhook-mailer": {
    title: "Gemini AI Αυτοματοποίηση με Email Webhooks",
    description: "Σύνδεση ChatGPT/Gemini με workflows στο n8n για την άμεση αυτόματη αποστολή αναφορών έρευνας στο email σας.",
    badge: "N8N PIPELINE"
  },
  "housing-ads-scrapper-bot": {
    title: "Bot Telegram για Αναζήτηση Ακινήτων",
    description: "Αυτόματο scraping και φιλτράρισμα αγγελιών κατοικιών με βάση τις προτιμήσεις σας και αποστολή καρτών στο Telegram.",
    badge: "MODULE SCRAPY"
  },
  "personal-resume-gate": {
    title: "Σύγχρονο Portfolio & Βιογραφικό (Mohammadreza)",
    description: "Αποκριτική σελίδα παρουσίασης των δεξιοτήτων προγραμματισμού, των έργων μας και των πιστοποιητικών μας.",
    badge: "WEB PORTAL"
  },
  "flutter-chatbot-arcade": {
    title: "Flutter Chatbot & Mobile Arcade Emulator",
    description: "Mobile εφαρμογή σε Flutter με έξυπνο βοηθό συνομιλίας και κλασικά interactive arcade παιχνίδια (Tetris, XO).",
    badge: "FLUTTER APP"
  },
  "telegram-content-maker-make": {
    title: "Αυτοματοποιημένος Εκδότης Περιεχομένου",
    description: "Συνδέει ροές ειδήσεων από το διαδίκτυο απευθείας με ομάδες εργασίας στο Telegram μέσω σεναρίων Make.",
    badge: "ΑΥΤΟΜΑΤΙΣΜΟΣ"
  },
  "persian-chatbot-dashboard": {
    title: "Πίνακας Αναλυτικών Στατιστικών AI Chat",
    description: "Σύστημα παρακολούθησης απόδοσης για τη μέτρηση του φόρτου του server, του latency και της ανάπτυξης χρηστών.",
    badge: "ADMIN PORTAL"
  },
  "school-grading-platform": {
    title: "Ασφαλής Πύλη Καταχώρησης Βαθμολογιών",
    description: "Σύστημα που επιτρέπει στους καθηγητές να εισάγουν βαθμολογίες με ισχυρή προστασία, εμποδίζοντας τυχόν υποκλοπές.",
    badge: "ΣΧΟΛΙΚΟ ΕΡΓΟ"
  },
  "anonymous-teacher-peer-review": {
    title: "Ανώνυμη Πλατφόρμα Αξιολόγησης Καθηγητών",
    description: "Ιδιωτική αξιολόγηση καθηγητών από τους μαθητές, με κρυπτογραφημένη πρόσβαση μέσω token για απόλυτη ασφάλεια.",
    badge: "ANONYMOUS DATA"
  }
};

const laProjectTranslations: Record<string, { title: string; description: string; badge?: string; features?: string[] }> = {
  "pimx-veil": {
    title: "PIMX_VEIL — Systema Securitatis Informationis et Steganographiae Amborum in Navigatro",
    description: "Systema securitatis militaris 100% in machina clientis constructum ad imagines PDF, MP3 vel JPEG cum cryptographia AES-GCM (256-bit) et derivatione clavis per PBKDF2 (600,000 repetitis) sine ulla mutatione formae originis occultandum.",
    badge: "CYBER VAULT",
    features: [
      "Steganographia invisibilis in carreris PDF, MP3 et JPEG sine damno formae",
      "Securitas totalis in RAM locali per Web Crypto API et Zero-Knowledge structuram",
      "Derivatio clavis robusta per PBKDF2 cum ultra 600,000 repetitis HMAC-SHA256"
    ]
  },
  "pimx-moji": {
    title: "PIMX_MOJI Tabula Artis ASCII",
    description: "Instrumentum ad imagines vertendum in formas litterarum ASCII et expressiones vultuum.",
    badge: "OPERE ACTIVE",
    features: ["Conversio pixelorum in litteras computatrales", "Copiatio celeris in clipboard pro usu facili", "Themata retro Matrix instructa"]
  },
  "pimx-pass": {
    title: "PIMX_PASS DNS Performance Diagnostics",
    description: "Rationes computandi et metiendi latencias DNS globalium ad nexum meliorem faciendam.",
    badge: "ADITUS PROTECTUS",
    features: ["Mensure latenciarum pro connectione tua propria", "Remotio tarditatis et stabilitas pro ludis retialibus", "Mandata illustrata ad mutandum DNS in machinis"]
  },
  "mml-wallet-bot": {
    title: "MML Wallet Probatio KYC & Token Bot",
    description: "Automatus bot in Telegram ad subnotandum usuarios, KYC documenta transferendum et emptio tokens moderandum ab administratore.",
    badge: "BOT CLIENTIS"
  },
  "pimx-wide": {
    title: "Consola Cryptographica Sine Server Provecta PIMX_WIDE",
    description: "PIMX_WIDE est instrumentum interretiale provectum, maxime securum et omnino sine server scriptum, ad res cryptographicas militaris ordinis faciendus sub structura scientiae nullius (Zero-Knowledge) in memoria RAM. Omnes computaciones intra navigatrum tuum aguntur; nulla hypothesis ad server externum mittitur. Habet consolam cryptae distinctam (AES-GCM 256-bit) cum output Base64 et .json, portale ad res offline legendendas quod memoriam purgat, et tabulam administratoris dynamicam cum 34 temporis filtris atque reactoribus magneticis 3D.",
    badge: "Cryptographia Militaris",
    features: [
      "Consola cryptae autonoma ex ordine AES-GCM 256-bit ad creandum tabulas secras .json et Base64",
      "Tabula monitoris cum 34 filtris temporis et graphis linearibus (ID: pimxwide, PASS: 123456789PIMX_WIDe@#$%^&)",
      "100% sine server in machina offline cum abolitione memoriae RAM et reactoribus spatialibus 3D"
    ]
  },
  "pimx-node": {
    title: "PIMX_NODE Transitus Documentorum P2P et Simulator NAT Retis",
    description: "PIMX_NODE (vel breviter PIMX) est portale novum, celerrimum et prorsus sine server (Serverless) ad documenta transferenda recta peer-to-peer (P2P) ex charta WebRTC, sine nubibus mediis. Habet simulatorem interactivae transitionis NAT et firewall cum 4 formis nexuum (LAN Bridge, STUN, CGNAT, et Symmetric NAT), una cum tabula monitoris real-time pro personis active et graphis SVG dynamicis.",
    badge: "P2P Sine Server",
    features: [
      "Translatio directa peer-to-peer (P2P) adhibita charta WebRTC sine nubibus vel tabulis mediis",
      "Simulator dynamicus nexuum NAT cum 4 formis (dispositio horizontalis in computatris, verticalis in cellu-phoniis)",
      "Tabula technica real-time cum lineis SVG motis et statisticis documentorum instrumenti"
    ]
  },
  "pimx-pass-bot": {
    title: "PIMX_PASS_BOT VPN Automatus Tunnel Assistens",
    description: "Auxilium celeris ad dividendum configutos nexuum retis (V2Ray, OpenVPN) pro clientibus omnibus active.",
    badge: "SECURE TUNNELS"
  },
  "pimx-play-bot": {
    title: "PIMX_PLAY_BOT Google Play APK Downloader Bot",
    description: "Boti in Telegram ad quaerendum et mittendum pura APK documenta ex Google Play sine molestis praeconiis.",
    badge: "APK DISTRIBUTOR"
  },
  "pimx-sonic-bot": {
    title: "PIMX_SONIC_BOT Musicae Instrumentum Solum",
    description: "Assistentia musica in Telegram ad media exquirendum, colendum ac tuto localiter salvandum sine consumptione nimia mobilis.",
    badge: "MUSIC STREAMER"
  },
  "school-blog-cms": {
    title: "Ephemeris CMS et Administratio Scholae",
    description: "Propositum scholasticum pro directore academicorum cum aditu password-securato et scriptura multimediale.",
    badge: "SCHOLAE MUNUS"
  },
  "advanced-monitoring-chatbot": {
    title: "Chatbot Intellegens cum Praetorio Custodiae",
    description: "Machina eloquens cum Gemini API instructa, et admin-portale ad investigandum delicta et interdicendum IP.",
    badge: "SYSTEM ENGINE"
  },
  "multilingual-frontend-bot": {
    title: "Polylingualis Sola Frontend Scriptor Chatbot",
    description: "Chatbot in decem linguis constructus qui in ipso navigatro sine databasis server adhibitis tuto capitur.",
    badge: "SOLUM FRONTEND"
  },
  "telegram-agent-admin-panel": {
    title: "Telegram Agentis Control Panel Administratum",
    description: "Ministerium Python ad automatendum nuntios canalesque in Telegram ac telemetriae graphicae inspectionem in web.",
    badge: "DAEMON ENGINE"
  },
  "gemini-webhook-mailer": {
    title: "Gemini AI Automation cum SMTP Webhook Mailer",
    description: "Conectit mentes n8n workflows ad vestigandum nuntios et mittere relationes immediate in curriculum epistularum.",
    badge: "N8N WORKFLOW"
  },
  "housing-ads-scrapper-bot": {
    title: "Scraper Tabulariorum Demorum pro Telegram",
    description: "Automaticus scrapis indicibus de pretiis locorumque ad colligendum opportunitates et mittere nuntios celeres users.",
    badge: "SCRAPY MODULE"
  },
  "personal-resume-gate": {
    title: "Situs Modernus Curriculum Vitae (Mohammadreza)",
    description: "Landing page creata ad demonstrandum curriculum studiorum ac peritias in scriptione Python et Django.",
    badge: "WEB PORTAL"
  },
  "flutter-chatbot-arcade": {
    title: "Flutter Custom Chatbot & Arcade Ludi",
    description: "App in Flutter pro Android vel aliis machinis cum chatbot et ludis antiquis (Tetris, XO, memoria).",
    badge: "FLUTTER SCRIPT"
  },
  "telegram-content-maker-make": {
    title: "Automatus Publicator Media in Telegram",
    description: "Intectio nuntiorum interretis via Make automationum directly in target channels Telegram.",
    badge: "AUTOMATIO"
  },
  "persian-chatbot-dashboard": {
    title: "Palaestra Inspectus Statistica Server",
    description: "Solutio cum tabulis diagnosticis statisticae ad examinandum onera motoris vel latencias nuntiorum.",
    badge: "ADMIN PORTAL"
  },
  "school-grading-platform": {
    title: "Securus Aditus Notarum e Magistris",
    description: "Systema academicum secure ad conservandum notarum indicem quas magistri inscribunt, ne codices a malis invadantur.",
    badge: "SCHOLAE MUNUS"
  },
  "anonymous-teacher-peer-review": {
    title: "Aestimatio Magistrorum in Forma Anonyma",
    description: "Forma iudicandi magistros a discipulis, securata aditu unius token ne quis nomen nuntiantis comperire possit.",
    badge: "ANONYMOUS DATA"
  }
};

const polyglotTranslations: Record<string, Record<string, { title: string; description: string; badge?: string; features?: string[] }>> = {
  ar: arProjectTranslations,
  zh: zhProjectTranslations,
  de: deProjectTranslations,
  fr: frProjectTranslations,
  it: itProjectTranslations,
  ru: ruProjectTranslations,
  el: elProjectTranslations,
  la: laProjectTranslations
};

// Translation payload mapper helper
export function getTranslatedProjects(lang: string): TranslatedProjectItem[] {
  if (lang === 'fa') {
    return faProjects;
  }
  const poly = polyglotTranslations[lang];
  if (poly) {
    return enProjects.map(p => {
      const trans = poly[p.id];
      if (trans) {
        return {
          ...p,
          title: trans.title,
          description: trans.description,
          badge: trans.badge || p.badge,
          features: trans.features || p.features
        };
      }
      return p;
    });
  }
  return enProjects; // English is our core baseline
}
/*
  },
  "pimx-sonic-bot": {
    title: "PIMX_SONIC_BOT 离线随身音乐盒 Telegram 机器人",
    description: "在 Telegram 内部极速搜索、缓存并无损下载全世界所有音乐。特别针对特定网络环境流量消耗与缓冲做极致优化。",
    badge: "音乐极享",
    features: ["本地大文件异步快速缓存技术", "高保真低损无削减音质解码", "支持直接添加到您的单人/群组自建播放列表"]
  },
  "school-blog-cms": {
    title: "学校教辅业务内容与博客 CMS 后台",
    description: "为中学定制的教务内容发布与审核 CMS 系统，带有用户账户鉴权、系统级邮件警报和富媒体博客编辑器，全面助力课后音频、视频及图文发布。",
    badge: "校园专属项目",
    features: ["管理员和讲师多级严格权限系统", "采用先进 Node/Python 路由防止代码注入", "自适应多栏媒体展示及留言点赞回复"]
  }
};

const deProjectTranslations: Record<string, { title: string; description: string; badge?: string; features?: string[] }> = {
  "pimx-moji": {
    title: "PIMX_MOJI ASCII-Kunst Leinwand",
    description: "Ein Online-Canvas-Tool, mit dem Sie Bilder in anpassbare ASCII-Kunst und Emoji-Mosaike umwandeln können.",
    badge: "LIVE APP",
    features: ["Echtzeit-Mapping-Algorithmus von Pixeln in ASCII-Kunst", "Schnelle Zwischenablage-Kopiervorlagen für Entwickler", "Werbefreie Steuerung mit Matrix-Themen"]
  },
  "pimx-pass": {
    title: "PIMX_PASS DNS-Geschwindigkeits-Benchmarking",
    description: "Dynamische Benchmarking-Plattform zur Messung und Bewertung der global sicheren DNS-Latenzen relativ zu Ihrem Internet-Spiele-Setup.",
    badge: "SICHERES PORTAL",
    features: ["Präzise Latenztests for alle Internetprovider", "Optimiert Verbindungsstabilität und Game-Ping", "Illustrationen für manuelle FritzBox- und Router-Konfiguration"]
  }
};

const frProjectTranslations: Record<string, { title: string; description: string; badge?: string; features?: string[] }> = {
  "pimx-moji": {
    title: "PIMX_MOJI Canevas Artistique ASCII",
    description: "Un utilitaire de canevas créatif pour convertir des images ou des paramètres en œuvres d'art texte ASCII sytlisées.",
    badge: "APP EN DIRECT",
    features: ["Traitement interactif des données d'image en art texte", "Sauvegarde rapide dans le presse-papiers sous format adaptatif", "Thèmes rétro Matrix préchargés"]
  },
  "pimx-pass": {
    title: "Diagnostic de performance DNS PIMX_PASS",
    description: "Évaluez et scorez les latences des DNS mondiaux sécurisés en temps réel par rapport à votre connexion.",
    badge: "PASSERELLE SÉCURISÉE",
    features: ["Algorithmes d'évaluation en temps réel pour tous FAI", "Réduction des pertes de paquets et du jitter de connexion", "Guides visuels pas-à-pas pour les routeurs et smartphones"]
  }
};

const itProjectTranslations: Record<string, { title: string; description: string; badge?: string; features?: string[] }> = {
  "pimx-moji": {
    title: "PIMX_MOJI ASCII Arts Tela Creativa",
    description: "Piattaforma creativa proiettata a trasformare immagini e testi in splendidi mosaici ASCII ed emoji.",
    badge: "APP ONLINE",
    features: ["Conversione interattiva di pixel in caratteri di testo", "Copia rapida negli appunti per layout integrati", "Temi retrò in stile hacker Matrix"]
  },
  "pimx-pass": {
    title: "PIMX_PASS DNS Performance Diagnostics",
    description: "Piattaforma avanzata per misurare la latenza dei DNS globali, migliorando l'esperienza di navigazione e gioco online.",
    badge: "GATEWAY PROTETTO",
    features: ["Test di latenza personalizzati sulla tua linea internet", "Eliminazione del ping jitter e lag nei caricamenti", "Manuale illustrato di configurazione pro router e desktop"]
  }
};

const ruProjectTranslations: Record<string, { title: string; description: string; badge?: string; features?: string[] }> = {
  "pimx-moji": {
    title: "PIMX_MOJI Генератор ASCII-графики",
    description: "Онлайн-холст для преобразования изображений в стильный текстовый ASCII-арт и мозаику из эмодзи.",
    badge: "ОНЛАЙН-ПРИЛОЖЕНИЕ",
    features: ["Интерактивное преобразование пикселей в символы", "Быстрое копирование готовых шаблонов в буфер обмена", "Ретро-темы оформления в стиле матрицы"]
  },
  "pimx-pass": {
    title: "Тестирование DNS PIMX_PASS Diagnostics",
    description: "Высокоточная диагностическая платформа для измерения пинга безопасных мировых серверов DNS под вашего провайдера.",
    badge: "БЕЗОПАСНЫЙ ШЛЮЗ",
    features: ["Алгоритмы тестирования пинга под каждого провайдера", "Снижение задержек и стабилизация игрового процесса", "Инструкции по настройке подключения на роутерах и ПК"]
  }
};

const elProjectTranslations: Record<string, { title: string; description: string; badge?: string; features?: string[] }> = {
  "pimx-moji": {
    title: "PIMX_MOJI Καμβάς Τέχνης ASCII",
    description: "Δημιουργικό εργαλείο μετατροπής εικόνων και κειμένων σε εντυπωσιακά ASCII ψηφιδωτά και emoji.",
    badge: "LIVE WEB APP",
    features: ["Μετατροπή pixel εικόνας σε χαρακτήρες κειμένου", "Γρήγορη αντιγραφή στο πρόχειρο για κοινή χρήση", "Προεγκατεστημένα ρετρό θέματα Matrix"]
  },
  "pimx-pass": {
    title: "PIMX_PASS DNS Έλεγχος & Διάγνωση",
    description: "Benchmark πλατφόρμα ελέγχου και μέτρησης καθυστέρησης των παγκόσμιων ασφαλών DNS διακομιστών.",
    badge: "ΑΣΦΑΛΗΣ ΠΥΛΗ",
    features: ["Δοκιμές απόκρισης σύμφωνα με τον πάροχο διαδικτύου σας", "Μείωση των διακυμάνσεων ping και βελτίωση σταθερότητας", "Οδηγίες εγκατάστασης σε routers και συσκευές"]
  }
};

const laProjectTranslations: Record<string, { title: string; description: string; badge?: string; features?: string[] }> = {
  "pimx-moji": {
    title: "PIMX_MOJI Tabula Artis ASCII",
    description: "Instrumentum ad imagines vertendum in formas litterarum ASCII et expressiones vultuum.",
    badge: "OPERE ACTIVE",
    features: ["Conversio pixelorum in litteras computatrales", "Copiatio celeris in clipboard pro usu facili", "Themata retro Matrix instructa"]
  },
  "pimx-pass": {
    title: "PIMX_PASS DNS Performance Diagnostics",
    description: "Rationes computandi et metiendi latencias DNS globalium ad nexum meliorem faciendam.",
    badge: "ADITUS PROTECTUS",
    features: ["Mensure latenciarum pro connectione tua propria", "Remotio tarditatis et stabilitas pro ludis retialibus", "Mandata illustrata ad mutandum DNS in machinis"]
  }
};

const polyglotTranslations: Record<string, Record<string, { title: string; description: string; badge?: string; features?: string[] }>> = {
  zh: zhProjectTranslations,
  de: deProjectTranslations,
  fr: frProjectTranslations,
  it: itProjectTranslations,
  ru: ruProjectTranslations,
  el: elProjectTranslations,
  la: laProjectTranslations
};

// Translation payload mapper helper
export function getTranslatedProjects(lang: string): TranslatedProjectItem[] {
  if (lang === 'fa') {
    return faProjects;
  }
  if (lang === 'ar') {
    return arProjects;
  }
  const poly = polyglotTranslations[lang];
  if (poly) {
    return enProjects.map(p => {
      const trans = poly[p.id];
      if (trans) {
        return {
          ...p,
          title: trans.title,
          description: trans.description,
          badge: trans.badge || p.badge,
          features: trans.features || p.features
        };
      }
      return p;
    });
  }
  return enProjects; // English is our core baseline
}
*/
