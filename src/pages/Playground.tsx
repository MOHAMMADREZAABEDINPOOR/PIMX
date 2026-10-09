import { useSiteText } from '../lib/useSiteText';
import PageHeadline from '../components/PageHeadline';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Download, ExternalLink, Layers3, Rotate3D, Search, X } from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import CredentialScene from '../components/CredentialScene';
import SectionMotion from '../components/SectionMotion';
import { certificates, type Certificate } from '../lib/certificates_data';
import type { LanguageType } from '../lib/translations';
import '../styles/certificates.css';

const marks: Record<Certificate['issuer'], string> = { michigan: 'M', sharif: 'S', london: 'L', toronto: 'T', upenn: 'P', meta: 'Me', jhu: 'JH', rice: 'R', kados: 'K' };
const issuerNames: Record<Certificate['issuer'], string> = { michigan: 'Michigan', sharif: 'Sharif', london: 'London', toronto: 'Toronto', upenn: 'Pennsylvania', meta: 'Meta', jhu: 'Johns Hopkins', rice: 'Rice', kados: 'Kados' };
const issuers = [...new Set(certificates.map(certificate => certificate.issuer))];
const courseLabels: Record<LanguageType, string> = { en: 'Course record', fa: 'گواهیِ دوره', ar: 'شهادة دورة', de: 'Kursnachweis', fr: 'Certificat de cours', it: 'Certificato del corso', zh: '课程记录', ru: 'Сертификат курса', el: 'Πιστοποιητικό μαθήματος', la: 'Testimonium studii' };
const baseCopy = {
  kicker: 'THE KNOWLEDGE VAULT', title: 'Knowledge', titleAccent: 'in motion.',
  intro: 'Curiosity becomes knowledge. Knowledge becomes something you can build. Explore the courses, ideas, and original documents behind my work.',
  credentials: 'credentials', institutions: 'institutions', perfect: 'perfect grades', explore: 'Enter the archive',
  featured: 'A closer look', selected: 'Selected learning record', grade: 'Final grade',
  front: 'The credential', back: 'The ideas behind it', flip: 'Flip the record',
  learning: 'From study to practice', topics: 'Areas of learning', context: 'The foundation',
  previous: 'Previous credential', next: 'Next credential', view: 'View original PDF', download: 'Download original PDF',
  unavailable: 'Original file not yet available in this archive.', archive: 'Every chapter counts.', archiveIntro: 'Different institutions. One continuous pursuit of better software.',
  search: 'Search courses, institutions, or skills…', all: 'All institutions', filter: 'Filter by institution', results: 'records',
  noResults: 'No matching credentials.', reset: 'Clear filters', clear: 'Clear search', open: 'Explore this record',
  close: 'Close document', newTab: 'Open PDF in a new tab', pdfHint: 'The original document is embedded below. If your browser does not display PDFs, open it in a new tab or download it.',
  scene: 'Interactive 3D learning archive. Drag or use the arrow keys to rotate; Home resets the view.',
  drag: 'DRAG TO ROTATE', pause: 'Pause animation', play: 'Resume animation', resetScene: 'Reset sculpture rotation',
  footnote: 'Original course titles, recorded grades, and available documents. Always learning, always building.',
};
type Copy = typeof baseCopy;
const copyByLanguage: Record<LanguageType, Copy> = {
  en: baseCopy,
  fa: { ...baseCopy,
    kicker: 'گنجینهٔ دانش', title: 'یادگیری،', titleAccent: 'در حرکت.',
    intro: 'کنجکاوی به دانش تبدیل می‌شود و دانش به چیزی که می‌توان ساخت. اینجا مسیر یادگیری من، ایده‌های پشت پروژه‌ها و فایل اصلی گواهی‌نامه‌ها را ببین.',
    credentials: 'گواهی‌نامه', institutions: 'مؤسسهٔ آموزشی', perfect: 'نمرهٔ کامل', explore: 'ورود به آرشیو',
    featured: 'از نزدیک ببین', selected: 'گواهی‌نامهٔ انتخاب‌شده', grade: 'نمرهٔ نهایی', front: 'روی گواهی‌نامه', back: 'ایده‌های پشت آن', flip: 'برگرداندن کارت',
    learning: 'از یادگیری تا ساختن', topics: 'موضوعات یادگیری', context: 'پایهٔ این مسیر', previous: 'گواهی‌نامهٔ قبلی', next: 'گواهی‌نامهٔ بعدی',
    view: 'مشاهدهٔ PDF اصلی', download: 'دانلود PDF اصلی', unavailable: 'فایل اصلی این گواهی‌نامه هنوز در آرشیو موجود نیست.',
    archive: 'هر فصل، یک قدم جلوتر.', archiveIntro: 'مؤسسه‌های متفاوت؛ یک مسیر پیوسته برای ساختن نرم‌افزار بهتر.',
    search: 'جستجوی دوره، دانشگاه یا مهارت…', all: 'همهٔ مؤسسه‌ها', filter: 'فیلتر مؤسسهٔ آموزشی', results: 'گواهی‌نامه',
    noResults: 'گواهی‌نامه‌ای با این مشخصات پیدا نشد.', reset: 'پاک کردن فیلترها', clear: 'پاک کردن جستجو', open: 'بررسی این گواهی‌نامه',
    close: 'بستن سند', newTab: 'باز کردن PDF در تب جدید', pdfHint: 'فایل اصلی در پایین نمایش داده می‌شود. اگر مرورگرت PDF را نشان نمی‌دهد، آن را در تب جدید باز کن یا دانلود کن.',
    scene: 'گنجینهٔ سه‌بعدی یادگیری. با کشیدن یا کلیدهای جهت بچرخان؛ کلید Home نما را بازنشانی می‌کند.',
    drag: 'بکش و بچرخان', pause: 'توقف انیمیشن', play: 'ادامهٔ انیمیشن', resetScene: 'بازنشانی چرخش مدل',
    footnote: 'عنوان دوره‌ها، نمره‌های ثبت‌شده و اسناد موجود؛ یادگیری ادامه دارد و ساختن هم.',
  },
  ar: { ...baseCopy,
    kicker: 'خزينة المعرفة', title: 'المعرفة', titleAccent: 'في حركة.', intro: 'يتحول الفضول إلى معرفة، والمعرفة إلى أشياء يمكن بناؤها. اكتشف الدورات والأفكار والوثائق الأصلية وراء عملي.',
    credentials: 'شهادات', institutions: 'مؤسسات تعليمية', perfect: 'درجات كاملة', explore: 'استكشف الأرشيف', featured: 'نظرة أقرب', selected: 'سجل التعلم المحدد', grade: 'الدرجة النهائية',
    front: 'الشهادة', back: 'الأفكار وراءها', flip: 'اقلب البطاقة', learning: 'من التعلم إلى التطبيق', topics: 'مجالات التعلم', context: 'الأساس', previous: 'الشهادة السابقة', next: 'الشهادة التالية',
    view: 'عرض ملف PDF الأصلي', download: 'تنزيل ملف PDF الأصلي', unavailable: 'الملف الأصلي غير متاح بعد في الأرشيف.', archive: 'كل فصل يصنع فرقًا.', archiveIntro: 'مؤسسات مختلفة. رحلة مستمرة لبناء برمجيات أفضل.',
    search: 'ابحث عن دورة أو مؤسسة أو مهارة…', all: 'جميع المؤسسات', filter: 'تصفية المؤسسة', results: 'سجلات', noResults: 'لا توجد شهادات مطابقة.', reset: 'إزالة عوامل التصفية', clear: 'مسح البحث', open: 'استكشف هذا السجل',
    close: 'إغلاق الوثيقة', newTab: 'فتح PDF في علامة تبويب جديدة', pdfHint: 'تظهر الوثيقة الأصلية أدناه. إذا لم يعرض متصفحك ملفات PDF، افتحها في علامة تبويب جديدة أو قم بتنزيلها.',
    scene: 'أرشيف تعلم ثلاثي الأبعاد. اسحب أو استخدم مفاتيح الأسهم للتدوير؛ Home يعيد ضبط العرض.', drag: 'اسحب للتدوير', pause: 'إيقاف الحركة', play: 'استئناف الحركة', resetScene: 'إعادة ضبط الدوران', footnote: 'عناوين الدورات والدرجات المسجلة والوثائق المتاحة. التعلم والبناء مستمران.',
  },
  de: { ...baseCopy, kicker: 'DAS WISSENSARCHIV', title: 'Wissen', titleAccent: 'in Bewegung.', intro: 'Neugier wird Wissen. Wissen wird etwas, das man bauen kann. Entdecke die Kurse, Ideen und Originaldokumente hinter meiner Arbeit.', credentials: 'Zertifikate', institutions: 'Institutionen', perfect: 'Bestnoten', explore: 'Archiv entdecken', featured: 'Genauer betrachtet', selected: 'Ausgewähltes Zertifikat', grade: 'Abschlussnote', front: 'Das Zertifikat', back: 'Die Ideen dahinter', flip: 'Karte umdrehen', learning: 'Vom Lernen zur Praxis', topics: 'Lernbereiche', context: 'Die Grundlage', previous: 'Vorheriges Zertifikat', next: 'Nächstes Zertifikat', view: 'Original-PDF ansehen', download: 'Original-PDF herunterladen', unavailable: 'Die Originaldatei ist im Archiv noch nicht verfügbar.', archive: 'Jedes Kapitel zählt.', archiveIntro: 'Verschiedene Institutionen. Eine kontinuierliche Suche nach besserer Software.', search: 'Kurse, Institutionen oder Fähigkeiten suchen…', all: 'Alle Institutionen', filter: 'Nach Institution filtern', results: 'Einträge', noResults: 'Keine passenden Zertifikate.', reset: 'Filter zurücksetzen', clear: 'Suche löschen', open: 'Eintrag entdecken', close: 'Dokument schließen', newTab: 'PDF in neuem Tab öffnen', drag: 'ZUM DREHEN ZIEHEN', pause: 'Animation pausieren', play: 'Animation fortsetzen', resetScene: 'Drehung zurücksetzen' },
  fr: { ...baseCopy, kicker: 'LES ARCHIVES DU SAVOIR', title: 'Le savoir', titleAccent: 'en mouvement.', intro: 'La curiosité devient savoir. Le savoir devient quelque chose à construire. Découvrez les cours, les idées et les documents originaux derrière mon travail.', credentials: 'certificats', institutions: 'institutions', perfect: 'notes parfaites', explore: 'Explorer les archives', featured: 'De plus près', selected: 'Certificat sélectionné', grade: 'Note finale', front: 'Le certificat', back: 'Les idées derrière', flip: 'Retourner la carte', learning: 'De la théorie à la pratique', topics: 'Domaines étudiés', context: 'Les fondations', previous: 'Certificat précédent', next: 'Certificat suivant', view: 'Voir le PDF original', download: 'Télécharger le PDF original', unavailable: 'Le fichier original est encore indisponible dans les archives.', archive: 'Chaque chapitre compte.', archiveIntro: 'Des institutions différentes. Une même recherche de meilleurs logiciels.', search: 'Rechercher un cours, une institution ou une compétence…', all: 'Toutes les institutions', filter: 'Filtrer par institution', results: 'documents', noResults: 'Aucun certificat correspondant.', reset: 'Réinitialiser les filtres', clear: 'Effacer la recherche', open: 'Explorer ce document', close: 'Fermer le document', newTab: 'Ouvrir le PDF dans un nouvel onglet', drag: 'GLISSER POUR TOURNER', pause: 'Mettre en pause', play: 'Reprendre l’animation', resetScene: 'Réinitialiser la rotation' },
  it: { ...baseCopy, kicker: 'L’ARCHIVIO DEL SAPERE', title: 'Conoscenza', titleAccent: 'in movimento.', intro: 'La curiosità diventa conoscenza. La conoscenza diventa qualcosa da costruire. Esplora i corsi, le idee e i documenti originali dietro al mio lavoro.', credentials: 'certificati', institutions: 'istituzioni', perfect: 'voti perfetti', explore: 'Esplora l’archivio', featured: 'Da vicino', selected: 'Certificato selezionato', grade: 'Voto finale', front: 'Il certificato', back: 'Le idee alla base', flip: 'Gira la scheda', learning: 'Dallo studio alla pratica', topics: 'Aree di studio', context: 'Le basi', previous: 'Certificato precedente', next: 'Certificato successivo', view: 'Visualizza PDF originale', download: 'Scarica PDF originale', unavailable: 'Il file originale non è ancora disponibile nell’archivio.', archive: 'Ogni capitolo conta.', archiveIntro: 'Istituzioni diverse. Una ricerca continua di software migliore.', search: 'Cerca corsi, istituzioni o competenze…', all: 'Tutte le istituzioni', filter: 'Filtra per istituzione', results: 'documenti', noResults: 'Nessun certificato corrispondente.', reset: 'Azzera i filtri', clear: 'Cancella ricerca', open: 'Esplora il documento', close: 'Chiudi documento', newTab: 'Apri PDF in una nuova scheda', drag: 'TRASCINA PER RUOTARE', pause: 'Pausa animazione', play: 'Riprendi animazione', resetScene: 'Reimposta rotazione' },
  zh: { ...baseCopy, kicker: '知识档案', title: '知识，', titleAccent: '不断前行。', intro: '好奇心化为知识，知识化为作品。探索我所学习的课程、项目背后的理念，以及原始证书文件。', credentials: '份证书', institutions: '所机构', perfect: '次满分', explore: '探索档案', featured: '近距离了解', selected: '已选学习记录', grade: '最终成绩', front: '证书', back: '背后的理念', flip: '翻转卡片', learning: '从学习到实践', topics: '学习领域', context: '基础', previous: '上一份证书', next: '下一份证书', view: '查看原始 PDF', download: '下载原始 PDF', unavailable: '档案中尚未提供原始文件。', archive: '每一章都有意义。', archiveIntro: '不同的机构，同一个目标：不断打造更好的软件。', search: '搜索课程、机构或技能…', all: '所有机构', filter: '按机构筛选', results: '条记录', noResults: '没有匹配的证书。', reset: '清除筛选', clear: '清除搜索', open: '探索这条记录', close: '关闭文档', newTab: '在新标签页中打开 PDF', drag: '拖动以旋转', pause: '暂停动画', play: '继续动画', resetScene: '重置旋转' },
  ru: { ...baseCopy, kicker: 'АРХИВ ЗНАНИЙ', title: 'Знания', titleAccent: 'в движении.', intro: 'Любопытство становится знанием, а знание — основой для новых проектов. Изучите курсы, идеи и оригинальные документы, стоящие за моей работой.', credentials: 'сертификатов', institutions: 'учреждений', perfect: 'максимальные оценки', explore: 'Открыть архив', featured: 'Ближе к деталям', selected: 'Выбранный сертификат', grade: 'Итоговая оценка', front: 'Сертификат', back: 'Идеи за ним', flip: 'Перевернуть карточку', learning: 'От учёбы к практике', topics: 'Области обучения', context: 'Основа', previous: 'Предыдущий сертификат', next: 'Следующий сертификат', view: 'Просмотреть исходный PDF', download: 'Скачать исходный PDF', unavailable: 'Исходный файл пока недоступен в архиве.', archive: 'Каждая глава важна.', archiveIntro: 'Разные учреждения. Постоянное стремление создавать лучшие программы.', search: 'Поиск курсов, учреждений или навыков…', all: 'Все учреждения', filter: 'Фильтр по учреждению', results: 'записей', noResults: 'Подходящих сертификатов нет.', reset: 'Сбросить фильтры', clear: 'Очистить поиск', open: 'Изучить запись', close: 'Закрыть документ', newTab: 'Открыть PDF в новой вкладке', drag: 'ПОТЯНИТЕ ДЛЯ ВРАЩЕНИЯ', pause: 'Приостановить анимацию', play: 'Продолжить анимацию', resetScene: 'Сбросить вращение' },
  el: { ...baseCopy, kicker: 'ΤΟ ΑΡΧΕΙΟ ΓΝΩΣΗΣ', title: 'Γνώση', titleAccent: 'σε κίνηση.', intro: 'Η περιέργεια γίνεται γνώση. Η γνώση γίνεται κάτι που μπορείς να δημιουργήσεις. Εξερευνήστε τα μαθήματα, τις ιδέες και τα πρωτότυπα έγγραφα πίσω από τη δουλειά μου.', credentials: 'πιστοποιητικά', institutions: 'ιδρύματα', perfect: 'άριστοι βαθμοί', explore: 'Εξερεύνηση αρχείου', featured: 'Μια πιο κοντινή ματιά', selected: 'Επιλεγμένο πιστοποιητικό', grade: 'Τελικός βαθμός', front: 'Το πιστοποιητικό', back: 'Οι ιδέες πίσω του', flip: 'Αναστροφή κάρτας', learning: 'Από τη μελέτη στην πράξη', topics: 'Τομείς μάθησης', context: 'Η βάση', previous: 'Προηγούμενο πιστοποιητικό', next: 'Επόμενο πιστοποιητικό', view: 'Προβολή πρωτότυπου PDF', download: 'Λήψη πρωτότυπου PDF', unavailable: 'Το πρωτότυπο αρχείο δεν είναι ακόμη διαθέσιμο.', archive: 'Κάθε κεφάλαιο μετράει.', archiveIntro: 'Διαφορετικά ιδρύματα. Μια συνεχής αναζήτηση για καλύτερο λογισμικό.', search: 'Αναζήτηση μαθημάτων, ιδρυμάτων ή δεξιοτήτων…', all: 'Όλα τα ιδρύματα', filter: 'Φίλτρο ιδρύματος', results: 'εγγραφές', noResults: 'Δεν βρέθηκαν πιστοποιητικά.', reset: 'Επαναφορά φίλτρων', clear: 'Εκκαθάριση αναζήτησης', open: 'Εξερεύνηση εγγραφής', close: 'Κλείσιμο εγγράφου', newTab: 'Άνοιγμα PDF σε νέα καρτέλα', drag: 'ΣΥΡΕΤΕ ΓΙΑ ΠΕΡΙΣΤΡΟΦΗ', pause: 'Παύση κίνησης', play: 'Συνέχιση κίνησης', resetScene: 'Επαναφορά περιστροφής' },
  la: { ...baseCopy, kicker: 'ARCHIVUM SCIENTIAE', title: 'Scientia', titleAccent: 'in motu.', intro: 'Curiositas fit scientia. Scientia fit opus. Explora studia, notiones et documenta originalia quae operibus meis fundamenta dant.', credentials: 'testimonia', institutions: 'instituta', perfect: 'notae perfectae', explore: 'Explora archivum', featured: 'Propius inspice', selected: 'Testimonium selectum', grade: 'Nota finalis', front: 'Testimonium', back: 'Notiones', flip: 'Verte chartam', learning: 'A studio ad opus', topics: 'Argumenta studiorum', context: 'Fundamentum', previous: 'Testimonium prius', next: 'Testimonium proximum', view: 'Vide PDF originale', download: 'Depone PDF originale', unavailable: 'Documentum originale nondum in archivo praesto est.', archive: 'Omne capitulum valet.', archiveIntro: 'Instituta varia. Studium continuum meliorum operum.', search: 'Quaere studia, instituta vel artes…', all: 'Omnia instituta', filter: 'Elige institutum', results: 'documenta', noResults: 'Nulla testimonia inventa.', reset: 'Restitue indicem', clear: 'Dele quaestionem', open: 'Explora documentum', close: 'Claude documentum', newTab: 'Aperi PDF in nova tabula', drag: 'TRAHE AD ROTANDUM', pause: 'Siste motum', play: 'Repete motum', resetScene: 'Restitue rotationem' },
};

type LearningRecord = { topics: string[]; en: string; fa: string; ar: string };
const learningById: Record<string, LearningRecord> = {
  'cert-1': { topics: ['Accessibility', 'Responsive design', 'Capstone'], en: 'Bringing a website together means thinking about structure, responsive behavior, testing, and accessibility as one connected system. This is the foundation for making interfaces work for more people.', fa: 'ساختن یک وب‌سایت کامل یعنی دیدن ساختار، واکنش‌گرایی، تست و دسترس‌پذیری به‌عنوان یک سیستم پیوسته. این نگاه، پایهٔ رابط‌هایی است که برای آدم‌های بیشتری قابل استفاده‌اند.', ar: 'جمع هيكل الموقع واستجابته واختباره وإتاحته في نظام واحد هو أساس بناء واجهات يمكن لعدد أكبر من الناس استخدامها.' },
  'cert-2': { topics: ['Django', 'HTTP', 'Data modeling'], en: 'Understanding how requests, routes, Python, and database models connect is the starting point for dependable web applications. These ideas underpin the backend side of a full-stack project.', fa: 'درک ارتباط درخواست‌ها، مسیرها، پایتون و مدل‌های پایگاه داده، نقطهٔ شروع ساختن وب‌اپلیکیشن قابل‌اتکاست. این مفاهیم زیربنای بخش بک‌اند پروژه‌های فول‌استک هستند.', ar: 'فهم الصلة بين الطلبات والمسارات وبايثون ونماذج البيانات هو أساس تطبيقات الويب الموثوقة والجزء الخلفي من المشاريع المتكاملة.' },
  'cert-3': { topics: ['Python', 'Control flow', 'Functions'], en: 'Variables, conditions, loops, and functions turn an idea into a program you can reason about. A practical foundation for Python scripts, automation, and the first steps toward larger systems.', fa: 'متغیرها، شرط‌ها، حلقه‌ها و تابع‌ها، ایده را به برنامه‌ای تبدیل می‌کنند که می‌توان منطقش را فهمید. پایه‌ای کاربردی برای اسکریپت‌های پایتون، اتوماسیون و قدم‌های اول در سیستم‌های بزرگ‌تر.', ar: 'المتغيرات والشروط والحلقات والدوال تحول الفكرة إلى برنامج مفهوم؛ أساس عملي لبرامج بايثون والأتمتة والأنظمة الأكبر.' },
  'cert-4': { topics: ['HTML', 'CSS', 'Responsive layouts'], en: 'A layout should adapt to the screen instead of asking the screen to adapt to it. HTML structure, CSS, and media queries provide the tools for interfaces that travel comfortably between devices.', fa: 'چیدمان باید با صفحهٔ نمایش سازگار شود. ساختار HTML، استایل CSS و مدیاکوئری‌ها ابزار ساختن رابطی هستند که در موبایل، تبلت و دسکتاپ درست کار کند.', ar: 'ينبغي أن يتكيف التخطيط مع الشاشة. توفر بنية HTML وCSS والاستعلامات الإعلامية أدوات واجهات مناسبة لمختلف الأجهزة.' },
  'cert-5': { topics: ['Problem solving', 'Debugging', 'Functions'], en: 'Breaking a problem into smaller functions and checking each assumption makes code easier to improve. The fundamentals of programming are also the fundamentals of careful debugging.', fa: 'تقسیم مسئله به تابع‌های کوچک‌تر و بررسی هر فرض، بهتر کردن کد را ساده می‌کند. مبانی برنامه‌نویسی همان ابزارهای اولیه برای دیباگ کردن دقیق هستند.', ar: 'تقسيم المشكلة إلى دوال صغيرة وفحص الافتراضات يجعل تحسين الكود أسهل. أساسيات البرمجة هي أيضًا أساس تصحيح الأخطاء بعناية.' },
  'cert-6': { topics: ['Python', 'File handling', 'Data structures'], en: 'Working with files, collections, methods, and Python syntax gives small programs room to grow. These are useful building blocks for data processing and everyday automation.', fa: 'کار با فایل‌ها، مجموعه‌داده‌ها، متدها و قواعد پایتون به برنامه‌های کوچک امکان رشد می‌دهد. این‌ها بلوک‌های پایه برای پردازش داده و اتوماسیون کارهای روزمره‌اند.', ar: 'الملفات والمجموعات والدوال وصياغة بايثون تمنح البرامج الصغيرة مجالًا للنمو، وتوفر أساسًا لمعالجة البيانات والأتمتة اليومية.' },
  'cert-7': { topics: ['Front-end', 'Semantic HTML', 'UI structure'], en: 'The browser is where structure, styling, and interaction meet. Front-end foundations help connect the technical parts of an interface to the experience of the person using it.', fa: 'مرورگر جایی است که ساختار، استایل و تعامل به هم می‌رسند. مبانی فرانت‌اند کمک می‌کنند بخش‌های فنی رابط را به تجربهٔ آدمی که از آن استفاده می‌کند وصل کنیم.', ar: 'المتصفح هو مكان التقاء البنية والتنسيق والتفاعل. تربط أساسيات تطوير الواجهات التفاصيل التقنية بتجربة المستخدم.' },
  'cert-8': { topics: ['JavaScript', 'DOM', 'HTML / CSS'], en: 'HTML gives content a structure, CSS gives it a visual language, and JavaScript gives it behavior. Understanding their relationship supports interactive sites that stay coherent as they become more complex.', fa: 'HTML به محتوا ساختار می‌دهد، CSS زبان بصری می‌سازد و جاوااسکریپت رفتار اضافه می‌کند. فهم ارتباط این سه، پایهٔ سایت‌های تعاملی است که با پیچیده‌تر شدن همچنان منسجم می‌مانند.', ar: 'يمنح HTML المحتوى بنية، وCSS لغة بصرية، وجافا سكريبت سلوكًا. فهم العلاقة بينها يدعم مواقع تفاعلية متماسكة.' },
  'cert-9': { topics: ['Python', 'Event-driven code', 'Interactive graphics'], en: 'Event-driven programs respond to the user rather than following only a straight line. Connecting logic, graphics, and interaction is a useful bridge between programming fundamentals and playful digital experiences.', fa: 'برنامهٔ رویدادمحور به کاربر پاسخ می‌دهد و فقط یک مسیر خطی را دنبال نمی‌کند. اتصال منطق، گرافیک و تعامل، پلی کاربردی میان مبانی برنامه‌نویسی و تجربه‌های دیجیتال خلاقانه است.', ar: 'تستجيب البرامج القائمة على الأحداث للمستخدم. الربط بين المنطق والرسوم والتفاعل جسر بين أساسيات البرمجة والتجارب الرقمية الإبداعية.' },
  'cert-10': { topics: ['Emerging technology', 'Cloud', 'Future of work'], en: 'Looking beyond a single programming language helps put software in a wider context. Emerging technologies and changing career paths encourage a habit of exploring what comes next.', fa: 'نگاه کردن فراتر از یک زبان برنامه‌نویسی، جایگاه نرم‌افزار را در دنیای بزرگ‌تر روشن می‌کند. فناوری‌های نوظهور و مسیرهای شغلی در حال تغییر، انگیزه‌ای برای دنبال کردن آینده‌اند.', ar: 'النظر إلى ما وراء لغة برمجة واحدة يضع البرمجيات في سياق أوسع. تدفع التقنيات الناشئة والمسارات المهنية المتغيرة إلى استكشاف المستقبل.' },
  'cert-11': { topics: ['C++', 'Memory', 'Object-oriented code'], en: 'Thinking about memory, pointers, classes, and compilation reveals what higher-level tools often hide. C++ adds a systems perspective to the way a programmer reasons about performance and structure.', fa: 'فکر کردن به حافظه، اشاره‌گرها، کلاس‌ها و کامپایل، چیزهایی را روشن می‌کند که ابزارهای سطح بالاتر پنهان می‌کنند. ++C نگاه سیستمی را به درک عملکرد و ساختار برنامه اضافه می‌کند.', ar: 'التفكير في الذاكرة والمؤشرات والفئات والترجمة يكشف ما تخفيه الأدوات الأعلى مستوى. تضيف C++ منظور الأنظمة إلى فهم أداء البرامج وبنيتها.' },
};

const localize = (certificate: Certificate, lang: LanguageType) => ({
  title: lang === 'fa' ? certificate.titleFa : lang === 'ar' ? certificate.titleAr : certificate.titleEn,
  description: lang === 'fa' ? certificate.descFa : lang === 'ar' ? certificate.descAr : certificate.descEn,
  institution: lang === 'fa' ? certificate.institutionFa : lang === 'ar' ? certificate.institutionAr : certificate.institutionEn,
  badge: lang === 'fa' ? certificate.badgeTypeFa : lang === 'ar' ? certificate.badgeTypeAr : certificate.badgeTypeEn,
});
const getFiles = (certificate: Certificate, lang: LanguageType) => certificate.pdfFile
  ? [{ name: localize(certificate, lang).title, url: '/' + encodeURIComponent(certificate.pdfFile) }]
  : certificate.pdfFiles?.map(file => ({ name: file.title[lang === 'fa' ? 'fa' : lang === 'ar' ? 'ar' : 'en'], url: '/' + encodeURIComponent(file.url) })) || [];

function tilt(event: React.PointerEvent<HTMLElement>, enabled: boolean) {
  if (!enabled || event.pointerType !== 'mouse') return;
  const rect = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width, y = (event.clientY - rect.top) / rect.height;
  event.currentTarget.style.setProperty('--tilt-x', `${(0.5 - y) * 9}deg`);
  event.currentTarget.style.setProperty('--tilt-y', `${(x - 0.5) * 12}deg`);
  event.currentTarget.style.setProperty('--shine-x', `${x * 100}%`);
  event.currentTarget.style.setProperty('--shine-y', `${y * 100}%`);
}
function resetTilt(event: React.PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--tilt-x', '0deg');
  event.currentTarget.style.setProperty('--tilt-y', '0deg');
}

const courseIdentities = [
  { name: 'THE INTERFACE', accent: '#d2e89b', ink: '#263526', background: '#202b20' },
  { name: 'CONNECTED SYSTEMS', accent: '#9adfd2', ink: '#183d35', background: '#16302b' },
  { name: 'A FIRST LANGUAGE', accent: '#adc9ff', ink: '#283550', background: '#232b3d' },
  { name: 'EVERY SCREEN', accent: '#ebbb9e', ink: '#563b2f', background: '#3b2b24' },
  { name: 'A LOGICAL PATH', accent: '#d4bce9', ink: '#463954', background: '#32293d' },
  { name: 'THINK IN PYTHON', accent: '#e9d497', ink: '#514926', background: '#342f20' },
  { name: 'THE FRONT LAYER', accent: '#edb9c6', ink: '#5b3744', background: '#382630' },
  { name: 'THREE LANGUAGES', accent: '#dfdccd', ink: '#3d3b30', background: '#333228' },
  { name: 'CODE AS A CANVAS', accent: '#abe1bc', ink: '#2b5137', background: '#1b3325' },
  { name: 'WHAT COMES NEXT', accent: '#a2d9e9', ink: '#2e4957', background: '#20313b' },
  { name: 'BELOW THE SURFACE', accent: '#c3c5d6', ink: '#373a4e', background: '#262833' },
];

/** Eleven course-specific, code-built objects. Each visual describes what the course explores. */
function CourseSculpture({ index, miniature = false }: { index: number; miniature?: boolean }) {
  const l = useSiteText();
  const nodes = [{x: 140, y: 24}, {x: 65, y: 85}, {x: 215, y: 85}, {x: 25, y: 152}, {x: 105, y: 152}, {x: 180, y: 152}, {x: 255, y: 152}];
  return <div className={`course-sculpture course-sculpture-${index} ${miniature ? 'is-miniature' : ''}`} aria-hidden="true" dir="ltr"><div className="course-object-ground" /><div className="course-object-stage">
    {l(index === 0 && <div className="course-browser-build">{l([0, 1, 2].map(i => <div className={`course-browser-panel panel-${i}`} key={i}><div className="browser-dots"><i /><i /><i /></div>{l(i === 0 ? <><div className="browser-block-title" /><div className="browser-block-lines"><i /><i /></div><div className="browser-block-grid"><i /><i /><i /></div></> : i === 1 ? <svg viewBox="0 0 150 110"><path d="M5 12H145V100H5ZM20 29H130M20 50H60V85H20ZM73 50H130M73 65H130M73 80H109" /></svg> : <span>&lt;/&gt;</span>)}</div>))}</div>)}
    {l(index === 1 && <div className="course-relational-world"><svg viewBox="0 0 300 190"><path className="course-flow-line" d="M45 135L145 80L245 135M45 65L145 120L245 65M145 25V168" /><circle cx="45" cy="65" r="5" /><circle cx="245" cy="65" r="5" /><circle cx="45" cy="135" r="5" /><circle cx="245" cy="135" r="5" /></svg><div className="course-database">{l([0, 1, 2].map(i => <i key={i} style={{ '--slice': i } as React.CSSProperties}><span>0{l(i+1)}</span></i>))}</div><span className="course-data-packet packet-a">{l("GET")}</span><span className="course-data-packet packet-b">{l("POST")}</span></div>)}
    {l(index === 2 && <div className="course-python-ribbon"><svg viewBox="0 0 280 190"><path className="python-trail" d="M215 32H108C54 32 54 88 111 88H173C228 88 228 151 170 151H65" /><path d="M96 10V51M196 131V175" /><circle cx="95" cy="32" r="5" /><circle cx="193" cy="151" r="5" /><path className="course-flow-line" d="M25 62H253M25 121H253" /></svg><span className="python-ribbon-code">{l("for idea in curiosity:")}</span><span className="python-ribbon-output">build(idea)</span></div>)}
    {l(index === 3 && <div className="course-responsive-devices"><div className="responsive-monitor"><div><i /><span>{l("WEB")}</span><b /><b /><b /></div><i /></div><div className="responsive-tablet"><i /><i /><i /></div><div className="responsive-phone"><i /><i /><i /></div><span className="responsive-width-line">320 ← → 1440</span></div>)}
    {l(index === 4 && <div className="course-logic-tree"><svg viewBox="0 0 280 190"><path className="course-flow-line" d="M140 25V52H65V85M140 52H215V85M65 85V118H25V152M65 118H105V152M215 85V118H180V152M215 118H255V152" />{l(nodes.map(({x, y}, i) => <g className="logic-node" key={i} style={{ '--node': i } as React.CSSProperties}><rect x={x-18} y={y-14} width="36" height="28" rx={i === 0 ? 14 : 3} /><text x={x} y={y+3} textAnchor="middle">{l(['?', 'if', 'else', '01', '10', '11', '00'][i])}</text></g>))}</svg></div>)}
    {l(index === 5 && <div className="course-python-steps">{l(['idea', '  if curious:', '    explore()', '    make()', '  repeat()'].map((line, i) => <div key={line} style={{ '--step': i } as React.CSSProperties}><span>0{l(i+1)}</span><code>{l(line)}</code></div>))}</div>)}
    {l(index === 6 && <div className="course-front-architecture"><div className="front-portal"><span>&lt;</span><div className="front-layer layer-a"><i /><i /><i /></div><div className="front-layer layer-b"><b /><i /><i /></div><span>/&gt;</span></div><div className="front-architecture-line" /></div>)}
    {l(index === 7 && <div className="course-web-cube"><div className="web-cube-face cube-front"><span>HTML</span><small>{l("STRUCTURE")}</small></div><div className="web-cube-face cube-right"><span>CSS</span><small>{l("EXPRESSION")}</small></div><div className="web-cube-face cube-top"><span>JS</span><small>{l("INTERACTION")}</small></div><div className="web-cube-face cube-bottom" /></div>)}
    {l(index === 8 && <div className="course-turtle-drawing"><svg viewBox="0 0 280 190"><path className="turtle-line" d="M135 105H151V90H122V121H167V75H106V137H184V59H89V154H201V42H72V170H218V26H55" /><path d="M53 26L43 33L48 16Z" /><circle cx="135" cy="105" r="3" /></svg><span>{l("forward() / turn()")}</span></div>)}
    {l(index === 9 && <div className="course-future-city"><div className="future-city-orbit" /><div className="future-city-orbit second" />{l([0, 1, 2, 3, 4].map(i => <div className="future-city-tower" key={i} style={{ '--tower': i } as React.CSSProperties}><i /><span /><span /><span /></div>))}<div className="future-city-foundation" /><span className="future-label">{l("NOW → NEXT")}</span></div>)}
    {l(index === 10 && <div className="course-memory-array"><div className="memory-pointer">&amp;address<svg viewBox="0 0 100 50"><path d="M0 6H58V43H94M87 36L94 43L87 49" /></svg></div><div className="memory-voxels">{l(Array.from({length: 9}, (_, i) => <div key={i} style={{ '--voxel': i } as React.CSSProperties}><span>{l(['00','01','02','03','04','05','06','07','08'][i])}</span><i /><b /></div>))}</div><span className="memory-label">{l("C++ / MEMORY / STRUCTURE")}</span></div>)}
  </div><span className="course-object-coordinate">{l("STUDY /")}{l(String(index+1).padStart(2,'0'))}</span></div>;
}

function randomCredentialIndex() {
  if (certificates.length < 2) return 0;
  let previous = -1;
  try { const stored = sessionStorage.getItem('pimx-last-credential'); if (stored !== null) previous = Number(stored); } catch { /* Storage is optional. */ }
  const hasPrevious = Number.isInteger(previous) && previous >= 0 && previous < certificates.length;
  const choice = Math.floor(Math.random() * (certificates.length - (hasPrevious ? 1 : 0)));
  return hasPrevious && choice >= previous ? choice + 1 : choice;
}

export default function Playground() {
  const l = useSiteText();
  const { dir, lang } = useLanguageTheme();
  const copy = copyByLanguage[lang];
  const reduced = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(randomCredentialIndex);
  const [flipped, setFlipped] = useState(false);
  const [search, setSearch] = useState('');
  const [issuer, setIssuer] = useState<Certificate['issuer'] | 'all'>('all');
  const [document, setDocument] = useState<{ name: string; url: string } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const featureRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const selected = certificates[selectedIndex];
  const localized = localize(selected, lang);
  const learning = learningById[selected.id];
  const learningText = lang === 'fa' ? learning.fa : lang === 'ar' ? learning.ar : learning.en;
  const files = getFiles(selected, lang);
  const filtered = certificates.filter(certificate => {
    const terms = [certificate.titleEn, certificate.titleFa, certificate.titleAr, certificate.institutionEn, certificate.institutionFa, certificate.institutionAr, certificate.descEn, certificate.descFa, ...learningById[certificate.id].topics].join(' ').toLocaleLowerCase();
    return (issuer === 'all' || issuer === certificate.issuer) && terms.includes(search.trim().toLocaleLowerCase());
  });
  const perfect = certificates.filter(certificate => certificate.percentage === 100).length;

  useEffect(() => { try { sessionStorage.setItem('pimx-last-credential', String(selectedIndex)); } catch { /* Storage is optional. */ } }, [selectedIndex]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (document && !dialog.open) dialog.showModal();
    if (!document && dialog.open) dialog.close();
  }, [document]);
  useEffect(() => {
    const active = railRef.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
    const rail = railRef.current;
    if (!active || !rail) return;
    const activeBounds = active.getBoundingClientRect(), railBounds = rail.getBoundingClientRect();
    if (activeBounds.left < railBounds.left) rail.scrollBy({ left: activeBounds.left - railBounds.left - 12, behavior: reduced ? 'instant' : 'smooth' });
    else if (activeBounds.right > railBounds.right) rail.scrollBy({ left: activeBounds.right - railBounds.right + 12, behavior: reduced ? 'instant' : 'smooth' });
  }, [selectedIndex, reduced]);
  const select = (index: number, scroll = false) => {
    setSelectedIndex((index + certificates.length) % certificates.length); setFlipped(false);
    if (scroll) featureRef.current?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
  };
  const reveal = reduced ? {} : { opacity: 0, y: 30 };

  return (
    <div className="cert-page" dir={dir} style={{ '--course-accent': courseIdentities[selectedIndex].accent, '--course-ink': courseIdentities[selectedIndex].ink, '--course-background': courseIdentities[selectedIndex].background } as React.CSSProperties}>
      <div className="cert-container">
        <header className="cert-hero">
          <motion.div className="cert-hero-copy" initial={reveal} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <p className="cert-kicker"><span aria-hidden="true" />{l(copy.kicker)}<span className="cert-kicker-line" aria-hidden="true" /></p>
            <h1><PageHeadline text={l(copy.title)} effect="inscription" rtl={dir === 'rtl'}/><br /><em><PageHeadline text={l(copy.titleAccent)} effect="inscription" rtl={dir === 'rtl'}/></em></h1>
            <p className="cert-hero-description">{l(copy.intro)}</p>
            <div className="cert-hero-summary">
              {l([[certificates.length, copy.credentials], [issuers.length, copy.institutions], [perfect, copy.perfect]].map(([number, label]) => <div key={label}><strong>{l(String(number).padStart(2, '0'))}</strong><span>{l(label)}</span></div>))}
            </div>
            <a className="cert-enter" href="#credential-archive">{l(copy.explore)}<ArrowDown size={17} aria-hidden="true" /></a>
          </motion.div>
          <motion.div className="cert-hero-object" initial={reduced ? false : { opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1 }}>
            <CredentialScene index={selectedIndex} title={l(selected.titleEn)} issuer={selected.institutionEn} grade={selected.grade} labels={{ scene: copy.scene, drag: copy.drag, pause: copy.pause, play: copy.play, reset: copy.resetScene }} />
          </motion.div>
        </header>

        <motion.section className="cert-exhibition" ref={featureRef} initial={reveal} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7 }} aria-label={l(copy.selected)}>
          <div className="cert-exhibition-heading"><p><Layers3 size={16} aria-hidden="true" />{l(copy.featured)}</p><span dir="ltr">{l(String(selectedIndex + 1).padStart(2, '0'))} <i>/</i> {l(String(certificates.length).padStart(2, '0'))}</span></div>
          <div className="cert-stage">
            <div className="cert-dossier-area">
              <div className="cert-dossier-shadow" aria-hidden="true" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div className="cert-dossier-perspective" key={selected.id} initial={reduced ? false : { opacity: 0, rotateY: -25, y: 24, scale: 0.96 }} animate={{ opacity: 1, rotateY: 0, y: 0, scale: 1 }} exit={reduced ? { opacity: 0 } : { opacity: 0, rotateY: 20, y: -18, scale: 0.98 }} transition={{ duration: reduced ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="cert-dossier-tilt" onPointerMove={event => tilt(event, !reduced)} onPointerLeave={resetTilt}>
                    <div className={`cert-dossier ${flipped ? 'is-flipped' : ''}`}>
                      <div className="cert-dossier-face cert-dossier-front" aria-hidden={flipped}>
                        <div className="cert-dossier-top"><span className="cert-institution-mark" dir="ltr" aria-hidden="true">{l(marks[selected.issuer])}</span><span>{l(selected.titleEn.includes('Capstone') ? localized.badge : courseLabels[lang])}</span></div>
                        <span className="cert-dossier-watermark" dir="ltr" aria-hidden="true">{l(String(selectedIndex + 1).padStart(2, '0'))}</span>
                        <CourseSculpture index={selectedIndex} miniature />
                        <div className="cert-dossier-title"><p>{l(localized.institution)}</p><h2>{l(localized.title)}</h2></div>
                        <div className="cert-dossier-grade"><span>{l(copy.grade)}</span><strong dir="ltr">{l(selected.grade)}</strong></div>
                        <div className="cert-dossier-footer"><span dir="ltr">{l("PIMX / LEARNING ARCHIVE")}</span><BookOpen size={18} aria-hidden="true" /></div>
                      </div>
                      <div className="cert-dossier-face cert-dossier-back" aria-hidden={!flipped}>
                        <span className="cert-dossier-back-icon" aria-hidden="true">✳</span><p className="cert-back-label">{l(copy.back)}</p>
                        <h3>{l(copy.topics)}</h3><div className="cert-back-topics" dir="ltr">{l(learning.topics.map((topic, index) => <p key={topic}><span>{l(String(index + 1).padStart(2, '0'))}</span>{l(topic)}</p>))}</div>
                        <p className="cert-back-context">{l(localized.description)}</p><div className="cert-dossier-footer"><span dir="ltr">{l(issuerNames[selected.issuer])} / {l(String(selectedIndex + 1).padStart(2, '0'))}</span><ArrowUpRight size={18} aria-hidden="true" /></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <button className="cert-flip" type="button" onClick={() => setFlipped(value => !value)} aria-pressed={flipped}><Rotate3D size={16} aria-hidden="true" />{l(copy.flip)}<span>{l(flipped ? copy.front : copy.back)}</span></button>
            </div>
            <div className="cert-learning-panel">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={selected.id} initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.28 }}>
                  <p className="cert-panel-kicker"><span aria-hidden="true" />{l(copy.context)}</p>
                  <h3>{l(copy.learning)}</h3><p className="cert-learning-text">{l(learningText)}</p>
                  <div className="cert-topic-chips" dir="ltr">{l(learning.topics.map(topic => <span key={topic}>{l(topic)}</span>))}</div>
                  <div className="cert-grade-gauge"><span>{l(copy.grade)}</span><strong dir="ltr">{l(selected.grade)}</strong><div aria-hidden="true"><motion.i initial={reduced ? false : { width: 0 }} animate={{ width: `${selected.percentage}%` }} transition={{ duration: reduced ? 0 : 0.8, delay: 0.15 }} /></div></div>
                  <div className="cert-document-actions">{l(files.length ? files.map(file => <div key={file.url}><button type="button" className="cert-view-document" onClick={() => setDocument(file)} aria-label={l(`${copy.view}: ${file.name}`)}>{l(copy.view)}<ArrowUpRight size={17} aria-hidden="true" /></button><a className="cert-download" href={file.url} download aria-label={l(`${copy.download}: ${file.name}`)} title={l(copy.download)}><Download size={17} aria-hidden="true" /></a></div>) : <p className="cert-unavailable">{l(copy.unavailable)}</p>)}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="cert-navigation">
            <button className="cert-step" type="button" onClick={() => select(selectedIndex - 1)} aria-label={l(copy.previous)}><ArrowLeft size={18} aria-hidden="true" /></button>
            <div className="cert-record-rail" ref={railRef} role="group" aria-label={l(copy.selected)}>
              {l(certificates.map((certificate, index) => <button type="button" key={certificate.id} className="cert-rail-record" onClick={() => select(index)} aria-label={l(`${copy.open}: ${localize(certificate, lang).title}`)} aria-pressed={selectedIndex === index} style={{ '--record-color': courseIdentities[index].accent } as React.CSSProperties}><span dir="ltr">{l(String(index + 1).padStart(2, '0'))}</span><span>{l(learningById[certificate.id].topics[0])}</span><i aria-hidden="true" /></button>))}
            </div>
            <button className="cert-step" type="button" onClick={() => select(selectedIndex + 1)} aria-label={l(copy.next)}><ArrowRight size={18} aria-hidden="true" /></button>
          </div>
          <span className="cert-sr-only" role="status" aria-live="polite">{l(localized.title)}. {l(copy.grade)}: {l(selected.grade)}</span>
        </motion.section>

        <section className="cert-collection" id="credential-archive" aria-label={l(copy.kicker)}>
          <motion.div className="cert-collection-heading" initial={reveal} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}><div><p className="cert-panel-kicker"><span aria-hidden="true" />{l(copy.kicker)}</p><h2>{l(copy.archive)}</h2><p>{l(copy.archiveIntro)}</p></div><span className="cert-collection-count" dir="ltr" aria-hidden="true">{l(String(certificates.length).padStart(2, '0'))}<i>↗</i></span></motion.div>
          <div className="cert-controls">
            <div className="cert-search"><Search size={18} aria-hidden="true" /><label className="cert-sr-only" htmlFor="cert-search-input">{l(copy.search)}</label><input id="cert-search-input" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder={l(copy.search)} />{l(search && <button type="button" onClick={() => setSearch('')} aria-label={l(copy.clear)}><X size={16} /></button>)}</div>
            <div className="cert-issuer-select"><label className="cert-sr-only" htmlFor="cert-issuer-filter">{l(copy.filter)}</label><select id="cert-issuer-filter" value={issuer} onChange={event => setIssuer(event.target.value as typeof issuer)}><option value="all">{l(copy.all)}</option>{l(issuers.map(value => <option key={value} value={value}>{l(issuerNames[value])}</option>))}</select></div>
            <span className="cert-result-count" role="status" aria-live="polite">{l(filtered.length)} / {l(certificates.length)} {l(copy.results)}</span>
          </div>
          <motion.div className={`cert-grid ${filtered.length < 4 ? 'has-few-records' : ''}`} layout={!reduced}>
            <AnimatePresence mode="popLayout" initial={false}>
              {l(filtered.map(certificate => {
                const record = localize(certificate, lang), index = certificates.indexOf(certificate), topics = learningById[certificate.id].topics;
                return <motion.article key={certificate.id} className={`cert-archive-card cert-course-${index} ${selectedIndex === index ? 'is-selected' : ''}`} style={{ '--course-accent': courseIdentities[index].accent, '--course-ink': courseIdentities[index].ink, '--course-background': courseIdentities[index].background } as React.CSSProperties} layout={!reduced} initial={reduced ? false : { opacity: 0, y: 30, rotateX: 12 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: reduced ? 0 : 0.3 }}>
                  <button className="cert-archive-button" type="button" onClick={() => select(index, true)} onPointerMove={event => tilt(event, !reduced)} onPointerLeave={resetTilt} aria-label={l(`${copy.open}: ${record.title}`)}>
                    <div className="cert-jacket-top"><span className="cert-jacket-index" dir="ltr">{l(String(index + 1).padStart(2, '0'))}</span><span>{l(certificate.titleEn.includes('Capstone') ? record.badge : courseLabels[lang])}</span><ArrowUpRight size={18} aria-hidden="true" /></div>
                    <SectionMotion className="course-art-reveal" kind={index % 3 === 0 ? 'iris' : index % 3 === 1 ? 'fold' : 'slide'}><CourseSculpture index={index} /></SectionMotion>
                    <span className="cert-jacket-monogram" dir="ltr" aria-hidden="true">{l(courseIdentities[index].name)}</span>
                    <div className="cert-jacket-copy"><p>{l(record.institution)}</p><h3>{l(record.title)}</h3></div>
                    <div className="cert-jacket-topics" dir="ltr">{l(topics.slice(0, 2).map(topic => <span key={topic}>{l(topic)}</span>))}</div>
                    <div className="cert-jacket-footer"><span>{l(copy.grade)}</span><strong dir="ltr">{l(certificate.grade)}</strong><span className="cert-jacket-plus" aria-hidden="true">+</span></div>
                  </button>
                </motion.article>;
              }))}
            </AnimatePresence>
          </motion.div>
          {l(filtered.length === 0 && <div className="cert-empty"><Search size={32} strokeWidth={1} aria-hidden="true" /><h3>{l(copy.noResults)}</h3><button type="button" onClick={() => { setSearch(''); setIssuer('all'); }}>{l(copy.reset)}<ArrowRight size={16} aria-hidden="true" /></button></div>)}
          <p className="cert-footnote"><BookOpen size={15} aria-hidden="true" />{l(copy.footnote)}</p>
        </section>
      </div>
      <dialog className="cert-document-dialog" ref={dialogRef} aria-labelledby="cert-document-title" onCancel={() => setDocument(null)} onClose={() => setDocument(null)} onClick={event => { if (event.target === event.currentTarget) setDocument(null); }}>
        {l(document && <div className="cert-document-shell"><div className="cert-document-toolbar"><h2 id="cert-document-title">{l(document.name)}</h2><a href={document.url} target="_blank" rel="noopener noreferrer" title={l(copy.newTab)} aria-label={l(copy.newTab)}><ExternalLink size={18} /></a><a href={document.url} download title={l(copy.download)} aria-label={l(copy.download)}><Download size={18} /></a><button type="button" autoFocus onClick={() => setDocument(null)} aria-label={l(copy.close)}><X size={22} /></button></div><p className="cert-pdf-hint">{l(copy.pdfHint)} <a href={document.url} target="_blank" rel="noopener noreferrer">{l(copy.newTab)}<ArrowUpRight size={13} aria-hidden="true" /></a></p><iframe src={`${document.url}#view=FitH`} title={l(document.name)} /></div>)}
      </dialog>
    </div>
  );
}
