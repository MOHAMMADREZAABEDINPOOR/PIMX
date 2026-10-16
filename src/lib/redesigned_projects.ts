import type { LanguageType } from './translations';

// Current capabilities of the five redesigned projects, reviewed 2026-10-17.
const copy: Record<string, Record<LanguageType, { description: string; features: string[] }>> = {
  "pimx-pass": {
    "ar": {
      "description": "قارن خوادم DNS على اتصالك بطلبات DNS-over-HTTPS حقيقية وشبكة ثلاثية الأبعاد. احفظ المقارنات وسجل كل شبكة، وأضف خوادم مخصصة وصدّر النتائج واتبع أدلة إعداد الأجهزة.",
      "features": [
        "قياسات DoH ومقارنة الخوادم",
        "سجل محلي واستيراد وتصدير",
        "أدلة الأجهزة وتطبيق يعمل دون اتصال"
      ]
    },
    "de": {
      "description": "Vergleiche DNS-Resolver über deine Verbindung mit echten DNS-over-HTTPS-Abfragen und einem animierten 3D-Netzwerk. Speichere Vergleiche und Netzwerkverläufe, importiere eigene Resolver und nutze Exporte sowie Einrichtungsanleitungen.",
      "features": [
        "Echte DoH-Messungen und Vergleiche",
        "Lokaler Verlauf, Import und Export",
        "Geräteanleitungen und Offline-PWA"
      ]
    },
    "fr": {
      "description": "Comparez les résolveurs DNS sur votre connexion avec de vraies requêtes DNS-over-HTTPS et un réseau 3D animé. Gardez comparaisons et historique par réseau, importez des résolveurs et exportez les résultats avec des guides de configuration.",
      "features": [
        "Mesures DoH et comparaisons",
        "Historique local, import et export",
        "Guides par appareil et PWA hors ligne"
      ]
    },
    "it": {
      "description": "Confronta i resolver DNS sulla tua connessione con vere richieste DNS-over-HTTPS e una rete 3D animata. Conserva confronti e cronologia per rete, importa resolver, esporta i risultati e segui le guide di configurazione.",
      "features": [
        "Misure DoH e confronto dei resolver",
        "Cronologia locale, importazione ed esportazione",
        "Guide per dispositivi e PWA offline"
      ]
    },
    "zh": {
      "description": "通过真实的 DNS-over-HTTPS 请求和动态三维网络，在自己的网络上比较 DNS 解析器。保存对比与各网络的历史记录，导入自定义解析器、导出结果，并查看设备设置指南。",
      "features": [
        "真实 DoH 测量与解析器对比",
        "本地历史、导入与导出",
        "设备指南与离线 PWA"
      ]
    },
    "ru": {
      "description": "Сравнивайте DNS-серверы на своём подключении с реальными запросами DNS-over-HTTPS и живой 3D-сетью. Сохраняйте сравнения и историю для каждой сети, импортируйте серверы, экспортируйте результаты и читайте инструкции настройки устройств.",
      "features": [
        "Измерения DoH и сравнение серверов",
        "Локальная история, импорт и экспорт",
        "Инструкции для устройств и офлайн-PWA"
      ]
    },
    "el": {
      "description": "Σύγκρινε διακομιστές DNS στη σύνδεσή σου με πραγματικά αιτήματα DNS-over-HTTPS και ένα ζωντανό τρισδιάστατο δίκτυο. Αποθήκευσε συγκρίσεις και ιστορικό ανά δίκτυο, εισήγαγε διακομιστές, εξήγαγε αποτελέσματα και βρες οδηγούς ρύθμισης.",
      "features": [
        "Μετρήσεις DoH και συγκρίσεις DNS",
        "Τοπικό ιστορικό, εισαγωγή και εξαγωγή",
        "Οδηγοί συσκευών και PWA εκτός σύνδεσης"
      ]
    },
    "la": {
      "description": "Servos DNS in conexione tua compara per veras interrogationes DNS-over-HTTPS et rete tridimensionale animatum. Comparationes et historiam cuiusque retis serva, servos proprios importa, exitus exporta et duces configurationis lege.",
      "features": [
        "Mensurae DoH et comparatio servorum",
        "Historia localis, importatio et exportatio",
        "Duces apparatuum et PWA sine reti"
      ]
    },
    "en": {
      "description": "Compare DNS resolvers on your own connection with real DNS-over-HTTPS queries, a live 3D network, saved comparisons and device setup guides. Keep network-specific history, import custom resolvers and export results.",
      "features": [
        "Real DoH measurements, resolver comparisons and a live 3D network",
        "Local history, favorites, custom imports and JSON/CSV/TXT/PNG/QR exports",
        "Separate Home, Test and Guide pages; Persian/English, themes and offline PWA"
      ]
    },
    "fa": {
      "description": "سرویس‌های DNS را روی اینترنت خودت با درخواست واقعی DNS-over-HTTPS مقایسه کن؛ با شبکهٔ سه‌بعدی زنده، مقایسه‌های ذخیره‌شده و راهنمای تنظیم دستگاه. تاریخچهٔ هر شبکه را نگه دار، DNS دلخواه اضافه کن و از نتایج خروجی بگیر.",
      "features": [
        "اندازه‌گیری واقعی DoH، مقایسهٔ DNSها و شبکهٔ سه‌بعدی زنده",
        "تاریخچهٔ محلی، علاقه‌مندی‌ها، ورود DNS دلخواه و خروجی JSON/CSV/TXT/PNG/QR",
        "صفحه‌های خانه، آزمایش و راهنما؛ فارسی و انگلیسی، دو پوسته و PWA آفلاین"
      ]
    }
  },
  "pimx-moji": {
    "ar": {
      "description": "حوّل صورك إلى فن ASCII أو فسيفساء كلمات أو إيموجي مع 300 نمط ومعاينة على صورتك. عدّل بالفرش وأضف الحركة وصدّر PNG أو نصًا أو GIF أو فيديو؛ تبقى المشاريع والنسخ الاحتياطية في متصفحك.",
      "features": [
        "300 نمط ومعاينات للصورة",
        "فرش و18 تأثير حركة",
        "مكتبة محلية ونسخ احتياطي واستعادة"
      ]
    },
    "de": {
      "description": "Verwandle Fotos mit 300 Stilen in ASCII-Porträts, Wortmosaike oder Emoji-Kunst. Vorschau am eigenen Bild, Pinsel, Bewegung und PNG-, Text-, GIF- oder Videoexport; Projekte und übertragbare Sicherungen bleiben im Browser.",
      "features": [
        "300 Stile mit Bildvorschau",
        "Pinsel und 18 Bewegungseffekte",
        "Lokale Bibliothek, Sicherung und Wiederherstellung"
      ]
    },
    "fr": {
      "description": "Transformez vos photos en portraits ASCII, mosaïques de mots ou d’émojis avec 300 styles et des aperçus sur votre image. Pinceaux, animation et exports PNG, texte, GIF ou vidéo ; projets et sauvegardes restent dans le navigateur.",
      "features": [
        "300 styles avec aperçu sur votre photo",
        "Pinceaux et 18 effets animés",
        "Bibliothèque locale, sauvegarde et restauration"
      ]
    },
    "it": {
      "description": "Trasforma foto in ritratti ASCII, mosaici di parole o emoji con 300 stili e anteprime sulla tua immagine. Usa pennelli e movimento, esporta PNG, testo, GIF o video; progetti e backup trasferibili restano nel browser.",
      "features": [
        "300 stili con anteprima sulla foto",
        "Pennelli e 18 effetti di movimento",
        "Libreria locale, backup e ripristino"
      ]
    },
    "zh": {
      "description": "使用 300 种风格，将照片转成 ASCII 肖像、文字或表情拼贴，并在自己的图片上预览。支持画笔、动画及 PNG、文本、GIF、视频导出；项目和可迁移备份保存在浏览器中。",
      "features": [
        "300 种风格与照片预览",
        "画笔和 18 种动画效果",
        "本地作品库、备份与恢复"
      ]
    },
    "ru": {
      "description": "Превращайте фото в ASCII-портреты, мозаику из слов или эмодзи с 300 стилями и предпросмотром на своём изображении. Кисти, анимация и экспорт PNG, текста, GIF или видео; проекты и переносимые резервные копии остаются в браузере.",
      "features": [
        "300 стилей с предпросмотром на фото",
        "Кисти и 18 эффектов движения",
        "Локальная библиотека, резервирование и восстановление"
      ]
    },
    "el": {
      "description": "Μετέτρεψε φωτογραφίες σε πορτρέτα ASCII, μωσαϊκά λέξεων ή emoji με 300 στυλ και προεπισκόπηση στη φωτογραφία σου. Πινέλα, κίνηση και εξαγωγή PNG, κειμένου, GIF ή βίντεο· έργα και αντίγραφα μένουν στον περιηγητή.",
      "features": [
        "300 στυλ με προεπισκόπηση φωτογραφίας",
        "Πινέλα και 18 εφέ κίνησης",
        "Τοπική βιβλιοθήκη, αντίγραφα και επαναφορά"
      ]
    },
    "la": {
      "description": "Photographias in imagines ASCII, musiva verborum vel emoji converte cum 300 stilis et prospectu imaginis tuae. Penicillis et motu utere; PNG, textum, GIF vel video exporta. Opera et exemplaria portabilia in navigatro manent.",
      "features": [
        "300 stili cum prospectu photographiae",
        "Penicilli et 18 effectus motus",
        "Bibliotheca localis, exemplaria et restitutio"
      ]
    },
    "en": {
      "description": "Turn photos into ASCII portraits, word mosaics or emoji art with 300 styles and previews on your own image. Edit with brushes, add motion and export PNG, text, GIF or video; projects and portable backups stay in your browser.",
      "features": [
        "300 styles with hover, keyboard and touch previews on your photo",
        "Brushes, undo/redo, custom styles and 18 motion effects",
        "PNG/text/GIF/video exports; IndexedDB library and portable backup/restore"
      ]
    },
    "fa": {
      "description": "عکس‌ها را با ۳۰۰ سبک و پیش‌نمایش روی تصویر خودت به پرترهٔ ASCII، موزاییک کلمه یا هنر ایموجی تبدیل کن. با قلم‌مو ویرایش کن، حرکت اضافه کن و خروجی PNG، متن، GIF یا ویدئو بگیر؛ پروژه‌ها و پشتیبان قابل انتقال در مرورگرت می‌مانند.",
      "features": [
        "۳۰۰ سبک با پیش‌نمایش روی عکس خودت با ماوس، کیبورد و لمس",
        "قلم‌مو، واگرد و بازانجام، سبک دلخواه و ۱۸ جلوهٔ حرکتی",
        "خروجی PNG، متن، GIF و ویدئو؛ کتابخانهٔ IndexedDB و پشتیبان و بازیابی قابل انتقال"
      ]
    }
  },
  "github-pimx-morph": {
    "ar": {
      "description": "حوّل الصور وPDF والمستندات والصوت والفيديو والبيانات محليًا. اختر الملف أولًا لرؤية صيغ الإخراج المتوافقة، واحفظ النتائج في مكتبة المتصفح واستخدم الأدوات المحمّلة دون اتصال.",
      "features": [
        "صيغ متوافقة بعد اختيار الملف",
        "تحويل محلي للصور والمستندات والوسائط",
        "مكتبة نتائج وأدوات قابلة للحفظ دون اتصال"
      ]
    },
    "de": {
      "description": "Konvertiere Bilder, PDFs, Dokumente, Audio, Video und strukturierte Daten lokal. Wähle zuerst eine Datei, um passende Zielformate zu sehen. Behalte Ergebnisse in der Browserbibliothek und nutze gespeicherte Werkzeuge offline.",
      "features": [
        "Passende Zielformate nach der Dateiauswahl",
        "Lokale Bild-, Dokument- und Medienkonvertierung",
        "Ergebnisbibliothek und Offline-Werkzeuge"
      ]
    },
    "fr": {
      "description": "Convertissez images, PDF, documents, audio, vidéo et données structurées localement. Choisissez un fichier pour voir les sorties compatibles, conservez les résultats dans la bibliothèque du navigateur et utilisez les outils téléchargés hors ligne.",
      "features": [
        "Formats compatibles après sélection du fichier",
        "Conversion locale des images, documents et médias",
        "Bibliothèque de résultats et outils hors ligne"
      ]
    },
    "it": {
      "description": "Converti immagini, PDF, documenti, audio, video e dati strutturati localmente. Seleziona prima il file per vedere i formati compatibili, conserva i risultati nella libreria del browser e usa offline gli strumenti scaricati.",
      "features": [
        "Formati compatibili dopo la scelta del file",
        "Conversione locale di immagini, documenti e media",
        "Libreria dei risultati e strumenti offline"
      ]
    },
    "zh": {
      "description": "在本地转换图片、PDF、文档、音频、视频和结构化数据。先选择文件再查看兼容输出格式，将结果保存在浏览器作品库中，并离线使用已下载的工具。",
      "features": [
        "选择文件后显示兼容格式",
        "本地图片、文档及媒体转换",
        "结果库与离线工具"
      ]
    },
    "ru": {
      "description": "Конвертируйте изображения, PDF, документы, аудио, видео и структурированные данные локально. Сначала выберите файл, затем совместимый формат. Храните результаты в библиотеке браузера и используйте скачанные инструменты без сети.",
      "features": [
        "Совместимые форматы после выбора файла",
        "Локальная конвертация изображений, документов и медиа",
        "Библиотека результатов и офлайн-инструменты"
      ]
    },
    "el": {
      "description": "Μετέτρεψε εικόνες, PDF, έγγραφα, ήχο, βίντεο και δομημένα δεδομένα τοπικά. Επίλεξε πρώτα αρχείο για να δεις συμβατές μορφές εξόδου, κράτησε αποτελέσματα στη βιβλιοθήκη και χρησιμοποίησε αποθηκευμένα εργαλεία εκτός σύνδεσης.",
      "features": [
        "Συμβατές μορφές μετά την επιλογή αρχείου",
        "Τοπική μετατροπή εικόνων, εγγράφων και πολυμέσων",
        "Βιβλιοθήκη αποτελεσμάτων και εργαλεία εκτός σύνδεσης"
      ]
    },
    "la": {
      "description": "Imagines, PDF, documenta, sonos, video et data ordinata localiter converte. Primum tabulam elige ut formas congruentes videas; exitus in bibliotheca navigatri serva et instrumentis receptis sine reti utere.",
      "features": [
        "Formae congruentes post electionem tabulae",
        "Conversio localis imaginum, documentorum et mediorum",
        "Bibliotheca exituum et instrumenta sine reti"
      ]
    },
    "en": {
      "description": "Convert images, PDFs, documents, audio, video and structured data locally. Upload first to see compatible outputs, save finished conversions in a browser library, and install the app with downloaded tools available offline.",
      "features": [
        "Upload-first workflow with compatible output formats",
        "Local image/HEIC, PDF, DOCX, media and JSON/CSV tools",
        "Persistent output library, installable PWA and downloadable offline media engine"
      ]
    },
    "fa": {
      "description": "تصویر، PDF، سند، صدا، ویدئو و داده‌های ساختاریافته را روی دستگاه خودت تبدیل کن. ابتدا فایل را انتخاب کن تا خروجی‌های سازگار نمایش داده شوند؛ نتیجه‌ها را در کتابخانهٔ مرورگر نگه دار و برنامه را با ابزارهای دانلودشده آفلاین استفاده کن.",
      "features": [
        "انتخاب فایل پیش از نمایش فرمت‌های خروجی سازگار",
        "ابزارهای محلی تصویر و HEIC، PDF، DOCX، رسانه و JSON/CSV",
        "کتابخانهٔ ماندگار خروجی‌ها، PWA نصب‌شدنی و موتور رسانهٔ قابل دانلود برای آفلاین"
      ]
    }
  },
  "pimx-node": {
    "ar": {
      "description": "أرسل الملفات والمجلدات والنص بين المتصفحات عبر WebRTC مشفّر. ادعُ الأجهزة برمز QR ووافق على المستلمين وتحكّم في قوائم النقل وتحقّق من سلامة الملفات؛ تعمل الإشارات على Node.js أو Cloudflare Durable Objects.",
      "features": [
        "دعوات QR وموافقة المستلمين",
        "قوائم نقل واستئناف وفحص سلامة",
        "اتصال ثلاثي الأبعاد وسجل محلي"
      ]
    },
    "de": {
      "description": "Sende Dateien, Ordner und Text über verschlüsselte WebRTC-Verbindungen zwischen Browsern. Lade Geräte per QR ein, bestätige Empfänger, steuere Warteschlangen und prüfe die Dateiintegrität; Signalisierung über Node.js oder Cloudflare Durable Objects.",
      "features": [
        "QR-Einladungen und Empfängerfreigabe",
        "Warteschlangen, Fortsetzen und Integritätsprüfung",
        "3D-Verbindungsanzeige und lokaler Verlauf"
      ]
    },
    "fr": {
      "description": "Envoyez fichiers, dossiers et texte entre navigateurs via WebRTC chiffré. Invitez par QR, approuvez les destinataires, gérez les files de transfert et vérifiez les fichiers ; signalisation avec Node.js ou Cloudflare Durable Objects.",
      "features": [
        "Invitations QR et approbation des destinataires",
        "Files, reprise et contrôle d’intégrité",
        "État de connexion 3D et historique local"
      ]
    },
    "it": {
      "description": "Invia file, cartelle e testo tra browser con WebRTC cifrato. Invita dispositivi tramite QR, approva i destinatari, gestisci le code e verifica l’integrità dei file; segnalazione con Node.js o Cloudflare Durable Objects.",
      "features": [
        "Inviti QR e approvazione dei destinatari",
        "Code, ripresa e verifica dell’integrità",
        "Stato della connessione 3D e cronologia locale"
      ]
    },
    "zh": {
      "description": "通过加密 WebRTC 连接，在浏览器之间发送文件、文件夹和文本。使用二维码邀请设备、确认接收方、管理传输队列并校验文件完整性；信令可运行于 Node.js 或 Cloudflare Durable Objects。",
      "features": [
        "二维码邀请与接收确认",
        "传输队列、续传与完整性校验",
        "三维连接状态和本地历史"
      ]
    },
    "ru": {
      "description": "Передавайте файлы, папки и текст между браузерами по зашифрованному WebRTC. Приглашайте устройства по QR, подтверждайте получателей, управляйте очередью и проверяйте целостность файлов; сигнализация на Node.js или Cloudflare Durable Objects.",
      "features": [
        "QR-приглашения и подтверждение получателей",
        "Очередь, возобновление и проверка целостности",
        "3D-состояние соединения и локальная история"
      ]
    },
    "el": {
      "description": "Στείλε αρχεία, φακέλους και κείμενο μεταξύ περιηγητών με κρυπτογραφημένο WebRTC. Προσκάλεσε συσκευές με QR, ενέκρινε παραλήπτες, έλεγξε την ουρά και την ακεραιότητα αρχείων· σηματοδοσία με Node.js ή Cloudflare Durable Objects.",
      "features": [
        "Προσκλήσεις QR και έγκριση παραληπτών",
        "Ουρά, συνέχιση και έλεγχος ακεραιότητας",
        "Τρισδιάστατη κατάσταση σύνδεσης και τοπικό ιστορικό"
      ]
    },
    "la": {
      "description": "Tabulas, fasciculos et textum inter navigatra per WebRTC cifratum mitte. Apparatus codice QR invita, accipientes approba, ordinem transmissionum rege et integritatem verifica; signa per Node.js vel Cloudflare Durable Objects traduntur.",
      "features": [
        "Invitationes QR et approbatio accipientium",
        "Ordo, continuatio et probatio integritatis",
        "Status conexionis tridimensionalis et historia localis"
      ]
    },
    "en": {
      "description": "Send files, folders and text between browsers through encrypted WebRTC connections. Invite devices by QR, approve recipients, manage transfer queues and verify file integrity; signaling runs on Node.js or Cloudflare Durable Objects.",
      "features": [
        "QR rooms, recipient approval and multi-recipient file/folder/text sharing",
        "Queue controls, reconnect/resume and file integrity verification",
        "Live 3D connection state, diagnostics, local history and installable PWA"
      ]
    },
    "fa": {
      "description": "فایل، پوشه و متن را با اتصال رمزنگاری‌شدهٔ WebRTC بین مرورگرها بفرست. با QR دستگاه دعوت کن، گیرنده را تأیید کن، صف انتقال را مدیریت کن و صحت فایل را بررسی کن؛ سیگنالینگ روی Node.js یا Cloudflare Durable Objects اجرا می‌شود.",
      "features": [
        "اتاق با QR، تأیید گیرنده و اشتراک فایل، پوشه و متن با چند گیرنده",
        "کنترل صف، اتصال و ادامهٔ مجدد و بررسی صحت فایل",
        "وضعیت اتصال سه‌بعدی زنده، عیب‌یابی، تاریخچهٔ محلی و PWA نصب‌شدنی"
      ]
    }
  },
  "pimx-wide": {
    "ar": {
      "description": "شفّر الرسائل والملفات والمجلدات محليًا باستخدام AES-256-GCM. رتّب الحزم المشفّرة في خزنة بكلمة مرور وأنشئ كلمات مرور وعبارات سرية ونسخًا احتياطية؛ تعمل الأدوات المحلية دون اتصال بعد تخزين التطبيق.",
      "features": [
        "تشفير محلي للنصوص والملفات والمجلدات",
        "خزنة مشفّرة ونسخ احتياطي وقفل تلقائي",
        "مولّد كلمات مرور وأدوات دون اتصال"
      ]
    },
    "de": {
      "description": "Verschlüssele Nachrichten, Dateien und Ordner lokal mit AES-256-GCM. Ordne Pakete in einem passwortgeschützten Tresor, erstelle Passwörter oder Passphrasen und verschlüsselte Sicherungen. Lokale Werkzeuge funktionieren nach dem Zwischenspeichern offline.",
      "features": [
        "Lokale Verschlüsselung von Text, Dateien und Ordnern",
        "Verschlüsselter Tresor, Sicherungen und automatische Sperre",
        "Passwortgenerator und Offline-Werkzeuge"
      ]
    },
    "fr": {
      "description": "Chiffrez messages, fichiers et dossiers localement avec AES-256-GCM. Rangez les paquets dans un coffre protégé, générez des mots de passe ou phrases secrètes et gardez des sauvegardes chiffrées ; les outils locaux fonctionnent hors ligne après mise en cache.",
      "features": [
        "Chiffrement local des textes, fichiers et dossiers",
        "Coffre chiffré, sauvegardes et verrouillage automatique",
        "Générateur de mots de passe et outils hors ligne"
      ]
    },
    "it": {
      "description": "Cifra messaggi, file e cartelle localmente con AES-256-GCM. Organizza i pacchetti in una cassaforte protetta, genera password o frasi segrete e conserva backup cifrati; gli strumenti locali funzionano offline dopo il salvataggio nella cache.",
      "features": [
        "Cifratura locale di testo, file e cartelle",
        "Cassaforte cifrata, backup e blocco automatico",
        "Generatore di password e strumenti offline"
      ]
    },
    "zh": {
      "description": "使用 AES-256-GCM 在本地加密消息、文件和文件夹。将加密包整理到密码保护的保险库中，生成密码或口令并保留加密备份；缓存后可离线使用本地工具。",
      "features": [
        "本地文本、文件及文件夹加密",
        "加密保险库、备份与自动锁定",
        "密码生成器与离线工具"
      ]
    },
    "ru": {
      "description": "Шифруйте сообщения, файлы и папки локально с AES-256-GCM. Храните пакеты в защищённом паролем хранилище, создавайте пароли или фразы и зашифрованные резервные копии; после кеширования локальные инструменты работают без сети.",
      "features": [
        "Локальное шифрование текста, файлов и папок",
        "Зашифрованное хранилище, копии и автоблокировка",
        "Генератор паролей и офлайн-инструменты"
      ]
    },
    "el": {
      "description": "Κρυπτογράφησε μηνύματα, αρχεία και φακέλους τοπικά με AES-256-GCM. Οργάνωσε πακέτα σε θησαυροφυλάκιο με κωδικό, δημιούργησε κωδικούς ή φράσεις και κράτησε κρυπτογραφημένα αντίγραφα· τα τοπικά εργαλεία λειτουργούν εκτός σύνδεσης μετά την αποθήκευση.",
      "features": [
        "Τοπική κρυπτογράφηση κειμένου, αρχείων και φακέλων",
        "Κρυπτογραφημένο θησαυροφυλάκιο, αντίγραφα και αυτόματο κλείδωμα",
        "Δημιουργός κωδικών και εργαλεία εκτός σύνδεσης"
      ]
    },
    "la": {
      "description": "Nuntios, tabulas et fasciculos localiter per AES-256-GCM cifra. Involucra in arca tessera munita ordina, tesseras vel phrases crea et exemplaria cifrata serva; instrumenta localia post conservationem sine reti operantur.",
      "features": [
        "Cifratio localis textus, tabularum et fasciculorum",
        "Arca cifrata, exemplaria et clausura automatica",
        "Generator tesserarum et instrumenta sine reti"
      ]
    },
    "en": {
      "description": "Encrypt messages, files and folders locally with AES-256-GCM. Organize encrypted packages in a password-protected vault, create passwords or passphrases, and keep encrypted backups; local tools work offline after caching.",
      "features": [
        "AES-256-GCM packages for text, files and folders; legacy package support",
        "Encrypted local vault with tags, favorites, backups and automatic locking",
        "Cryptographic passwords/passphrases, eight languages and offline local tools"
      ]
    },
    "fa": {
      "description": "پیام، فایل و پوشه را روی دستگاه خودت با AES-256-GCM رمزگذاری کن. بسته‌های رمزگذاری‌شده را در صندوق دارای گذرواژه مرتب کن، رمز یا عبارت عبور بساز و پشتیبان رمزگذاری‌شده نگه دار؛ ابزارهای محلی پس از ذخیرهٔ برنامه آفلاین کار می‌کنند.",
      "features": [
        "بسته‌های AES-256-GCM برای متن، فایل و پوشه و پشتیبانی از بسته‌های قدیمی",
        "صندوق محلی رمزگذاری‌شده با برچسب، علاقه‌مندی، پشتیبان و قفل خودکار",
        "رمز و عبارت عبور با تصادفی‌بودن رمزنگاری، هشت زبان و ابزارهای محلی آفلاین"
      ]
    }
  }
};

export function getRedesignedProjectCopy(id: string, lang: string) {
  const project = copy[id];
  return project ? project[lang as LanguageType] || project.en : undefined;
}
