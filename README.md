<div align="center">

# PIMX Portfolio 🚀✨

**[English](#english-description) | [Persian](#persian-description)**

[![Persian Description](https://img.shields.io/badge/Read-Persian%20Description-0A66C2?style=for-the-badge)](#persian-description)
[![Website](https://img.shields.io/badge/Live-pimx.pages.dev-0ea5e9?style=for-the-badge)](https://pimx.pages.dev/)

</div>

---

## <a id="english-description">English Description</a>

# PIMX Portfolio 🌐💼

PIMX Portfolio is a modern bilingual (EN/FA) personal portfolio website showcasing professional work, projects, skills, and resume with dark/light theme support and an interactive diagnostics/terminal UI.
It is built with React 19, Vite 6, Tailwind CSS 4, and Motion. 🚀

🌐 **Live Website:** [https://pimx.pages.dev/](https://pimx.pages.dev/)

### 🧩 What This Project Does
- Showcases professional skills, background, work experience, and educational credentials.
- Features a project portfolio highlighting completed web apps with descriptions and live links.
- Provides a terminal simulator widget and interactive diagnostic tool on the homepage.
- Includes an interactive Playground section for tools and coding experiments.
- Supports full Persian/English language switching (LTR/RTL layout switching).
- Supports Dark/Light theme switching with user preferences saved in local storage.
- Features a downloadable resume/CV flow.

### ✨ Core Features
- 🎨 Modern and premium dark/light UI
- 📱 Fully responsive layout optimized for all device types
- ⚙️ Interactive Terminal Widget & Diagnostics on the Home page
- 🌍 Bilingual UI (FA/EN) with automatic RTL/LTR detection
- 🌗 Dynamic dark/light theme switcher with local storage persistence
- 📂 Interactive Projects listing with categories and detail views
- 📄 Dedicated Resume & CV section with PDF downloads
- 🎮 Playground page containing interactive tools and experiments
- 🧠 Motion-powered premium transitions and hover effects

### 🔐 Data & Privacy Model
This project is built with privacy in mind:
- No tracking cookies or external analytical trackers.
- User choices (theme preference, language setting) are stored locally in the browser's `localStorage`.
- High performance and privacy-first UX.

### 🛠️ Tech Stack
- **React 19**
- **TypeScript**
- **Vite 6**
- **Tailwind CSS 4**
- **Motion** (Animations)
- **Lucide React** (Icons)
- **Express / Node.js** (Server helper)

### 🚀 Local Development
Install dependencies:
```bash
npm install
```

Run dev server:
```bash
npm run dev
```
Open: [http://localhost:3000](http://localhost:3000)

### ☁️ Cloudflare Pages Deployment (Important)
To avoid raw-source/MIME deployment errors, use these exact settings in Pages:
- **Framework preset:** `Vite`
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node.js:** `20` recommended

### 📁 Key Project Paths
- `src/App.tsx` main app flow
- `src/pages/Home.tsx` homepage with terminal and diagnostics
- `src/pages/About.tsx` professional background and skills
- `src/pages/Projects.tsx` portfolio of completed work
- `src/pages/Resume.tsx` resume details and downloads
- `src/pages/Playground.tsx` interactive playground experiments
- `src/context/LanguageThemeContext.tsx` language and theme context
- `src/lib/translations.ts` language translations config
- `src/lib/cv_data.ts` resume CV data source

---

## <a id="persian-description">توضیحات فارسی</a>

# پورتفولیو PIMX 🌐💼

پورتفولیو PIMX یک وبسایت پورتفولیو حرفه‌ای مدرن و دو‌زبانه (فارسی/انگلیسی) برای نمایش پروژه‌ها، سوابق کاری، مهارت‌ها و رزومه شخصی است.
این پروژه با زیبایی بصری فوق‌العاده، انیمیشن‌های تعاملی و سرعت بالا با استفاده از React 19 و Tailwind CSS 4 طراحی شده است. 🚀

🌐 **لینک سایت:** [https://pimx.pages.dev/](https://pimx.pages.dev/)

### ✨ قابلیتهای اصلی
- 🎨 طراحی مدرن، پریمیوم و مینیمال با تم روشن و تاریک
- 🌍 پشتیبانی کامل دو‌زبانه (انگلیسی/فارسی) با چیدمان راست‌چین و چپ‌چین خودکار
- ⚙️ ترمینال شبیه‌ساز تعاملی و ابزار عیب‌یابی در صفحه اصلی
- 🌗 سوییچ داینامیک تم با ذخیره‌سازی محلی ترجیحات کاربر
- 📂 گالری پروژه‌ها با فیلتر دسته‌بندی و اطلاعات دقیق
- 📄 بخش رزومه حرفه‌ای همراه با قابلیت دانلود مستقیم نسخه PDF
- 🎮 صفحه زمین‌بازی (Playground) برای اجرای ابزارها و تست‌های تعاملی
- 🎭 انیمیشن‌ها و ترنزیشن‌های نرم با قدرت Framer Motion

### 🔐 مدل حریم‌خصوصی
این پروژه با اولویت حفظ حریم‌خصوصی توسعه یافته است:
- فاقد هرگونه کوکی یا ترکرهای تحلیلی شخص ثالث.
- ذخیره تنظیمات زبان و تم کاربر کاملاً به صورت محلی در مرورگر (`localStorage`).

### ☁️ دیپلوی صحیح روی Cloudflare Pages
تنظیمات پیشنهادی برای استقرار بدون نقص روی Cloudflare Pages:
- **Framework preset:** `Vite`
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **نسخه نود جی‌اس:** `20` یا بالاتر

---

<div align="center">

**Made with ❤️ by Mohammadreza Abedinpoor**

</div>
