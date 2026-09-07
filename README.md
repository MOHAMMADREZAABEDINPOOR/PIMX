<div align="center">

# 🌐 PIMX_PORTAL 🧭⚡
### Unified Visual Gateway & Central Ecosystem Command Center for PIMX Platforms

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=for-the-badge)](https://www.gnu.org/licenses/agpl-3.0)
[![React: 18+](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Read in Persian](https://img.shields.io/badge/مطالعه_به_فارسی-Persian_README-008080?style=for-the-badge)](#-توضیحات-کامل-فارسی-persian-documentation)

<p align="center">
  The central nervous system and flagship visual dashboard connecting all PIMX ecosystem tools, utilities, and decentralized gateways. Features real-time cluster health monitors, responsive dark glassmorphism, instant cross-app routing, and native bilingual localization (EN / FA).
</p>

[Key Portals](#-integrated-ecosystem-nodes) •
[Architecture](#-architecture) •
[Quick Start](#-quick-start) •
[توضیحات فارسی](#-توضیحات-کامل-فارسی-persian-documentation) •
[License](#-license)

</div>

---

## 🧭 Integrated Ecosystem Nodes

- 📚 **PIMX Planner**: Direct deep-link integration into personal productivity and study workflows.
- 🛡️ **PIMX Pass Infrastructure**: Real-time status indicators for proxy nodes, DNS benchmark services, and Telegram gateways.
- 🔐 **PIMX Cryptographic Suite**: Quick launchers for PIMX_WIDE (AES-256 encryption) and PIMX_VEIL (Steganography).
- 🎨 **Creative Media Hub**: Seamless transition into PIMX_MOJI and 3D Interactive Portfolio experiences.
- 🌐 **Full Bilingual RTL Experience**: One-click language switching between Persian and English with responsive layout adjustments.

---

## 🏗️ Architecture

```
[ Visitor / Client ] 
         │ (Cloudflare Anycast CDN)
         ▼
┌──────────────────────────────────────────────┐
│        Cloudflare Pages Edge Static Asset    │
│  - React 18 SPA + Vite Production Bundle     │
│  - Embedded Ecosystem Directory Registry     │
└──────────────────────┬───────────────────────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
┌──────────────────┐       ┌──────────────────┐
│  Live Health API │       │ Service Worker   │
│  - Endpoint Ping │       │ - Offline Cache  │
│  - Node Status   │       │ - Instant Nav    │
└──────────────────┘       └──────────────────┘
```

---

## 🚀 Quick Start

### 1. Installation
```bash
git clone https://github.com/MOHAMMADREZAABEDINPOOR/PIMX_PORTAL.git
cd PIMX_PORTAL

npm install
```

### 2. Development
```bash
npm run dev
```

### 3. Production Deployment
```bash
npm run build
# Deploy to Cloudflare Pages:
npx wrangler pages deploy dist
```

---

## 🇮🇷 توضیحات کامل فارسی (Persian Documentation)

### معرفی پروژه درگاه مرکزی PIMX_PORTAL
پروژه **PIMX_PORTAL** هاب و درگاه اصلی ورود به کل پلتفرم‌های اکوسیستم PIMX است. این پرتال به کاربران امکان می‌دهد تا در یک محیط فوق‌العاده شیک، با طراحی شیشه‌ای مدرن (Glassmorphism) و به صورت کاملاً دو زبانه (فارسی و انگلیسی)، به تمامی ابزارهای برنامه‌ریزی، امنیتی، ربات‌های تلگرام و ابزارهای رمزنگاری دسترسی داشته باشند.

### امکانات شاخص:
1. **داشبورد یکپارچه اکوسیستم:**
   * پیوند مستقیم و هدایت سریع به تمام پروژه‌های PIMX اعم از ربات‌ها، پنل‌ها و ابزارهای وب.
2. **پایش زنده وضعیت سرورها:**
   * نمایش وضعیت آنلاین/آفلاین بودن سرویس‌ها و درگاه‌های مختلف به صورت زنده.
3. **طراحی لوکس نئونی و واکنش‌گرا:**
   * سازگاری کامل با تمامی ابعاد نمایشگرها (موبایل، تبلت، مانیتورهای عریض) و پشتیبانی از تم تاریک اختصاصی.
4. **سرعت بالا با Cloudflare Pages:**
   * بارگذاری کمتر از یک ثانیه در سراسر جهان به کمک شبکه تحویل محتوای کلودفلر.

---

## 📜 License

Licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

---

<div align="center">
  <sub>Architected by <a href="https://github.com/MOHAMMADREZAABEDINPOOR">MOHAMMADREZA ABEDINPOOR</a>. Star ⭐ this repository if you enjoy unified dashboards!</sub>
</div>
