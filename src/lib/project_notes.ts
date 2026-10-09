import type { LanguageType } from './translations';

const ids = ['github-pimx-agent','github-pimx-morph','pimx-veil','pimx-node','pimx-moji','github-pimxsats','github-pimx-swap'];
const notes: Record<LanguageType, string[]> = {
  en:[
    'Ask questions, keep conversations and files together, and turn your research into documents or slides.',
    'Convert images, PDFs, audio and documents directly in your browser.',
    'Encrypt a file, store the encrypted payload inside another file, and recover it with a password.',
    'Send files between browsers over a peer-to-peer connection.',
    'Turn a photo into character art, adjust the style and preview the result.',
    'Explore satellites on a globe and see their orbits and predicted passes.',
    'Typed in the wrong keyboard language on Windows? Convert the text without typing it again.',
  ],
  fa:[
    'سؤال بپرس، گفتگوها و فایل‌هایت را یک‌جا نگه دار و نتیجهٔ تحقیق را به سند یا اسلاید تبدیل کن.',
    'عکس، PDF، صدا و سند را مستقیم در مرورگر به فرمت دیگری تبدیل کن.',
    'یک فایل را رمزگذاری کن، دادهٔ رمزگذاری‌شده را داخل فایلی دیگر قرار بده و با گذرواژه بازیابی‌اش کن.',
    'فایل‌ها را با اتصال مستقیم، از یک مرورگر به مرورگر دیگر بفرست.',
    'عکس را به تصویر ساخته‌شده از کاراکترها تبدیل کن، سبک آن را عوض کن و نتیجه را ببین.',
    'ماهواره‌ها را روی کرهٔ زمین پیدا کن و مدار و زمان عبور پیش‌بینی‌شده‌شان را ببین.',
    'در ویندوز با زبان اشتباه کیبورد تایپ کردی؟ متن را بدون تایپ دوباره تبدیل کن.',
  ],
  ar:[
    'اطرح أسئلة، واجمع المحادثات والملفات في مكان واحد، وحوّل بحثك إلى مستندات أو شرائح.',
    'حوّل الصور وملفات PDF والصوت والمستندات مباشرة في المتصفح.',
    'شفّر ملفًا، وخزّن البيانات المشفّرة داخل ملف آخر، واستعدها بكلمة مرور.',
    'أرسل الملفات بين المتصفحات عبر اتصال مباشر بين الطرفين.',
    'حوّل صورة إلى رسم بالأحرف، وعدّل الأسلوب، وشاهد النتيجة.',
    'استكشف الأقمار الصناعية على الكرة الأرضية وشاهد مداراتها ومرورها المتوقع.',
    'كتبت بلغة لوحة مفاتيح خاطئة في Windows؟ حوّل النص دون إعادة كتابته.',
  ],
  de:[
    'Stelle Fragen, halte Gespräche und Dateien zusammen und mache aus deiner Recherche Dokumente oder Folien.',
    'Konvertiere Bilder, PDFs, Audio und Dokumente direkt im Browser.',
    'Verschlüssele eine Datei, speichere die verschlüsselten Daten in einer anderen Datei und stelle sie mit einem Passwort wieder her.',
    'Sende Dateien über eine Peer-to-Peer-Verbindung von einem Browser zum anderen.',
    'Verwandle ein Foto in Zeichenkunst, passe den Stil an und sieh dir das Ergebnis an.',
    'Erkunde Satelliten auf einem Globus und sieh ihre Umlaufbahnen und vorhergesagten Überflüge.',
    'Unter Windows mit der falschen Tastatursprache getippt? Wandle den Text um, ohne ihn neu zu schreiben.',
  ],
  fr:[
    'Posez des questions, gardez vos conversations et fichiers ensemble, puis transformez vos recherches en documents ou diapositives.',
    'Convertissez images, PDF, audio et documents directement dans votre navigateur.',
    'Chiffrez un fichier, placez les données chiffrées dans un autre fichier et récupérez-les avec un mot de passe.',
    'Envoyez des fichiers entre navigateurs grâce à une connexion pair à pair.',
    'Transformez une photo en image faite de caractères, ajustez le style et prévisualisez le résultat.',
    'Explorez les satellites sur un globe et consultez leurs orbites et passages prévus.',
    'Vous avez tapé avec la mauvaise langue de clavier sous Windows ? Convertissez le texte sans le retaper.',
  ],
  it:[
    'Fai domande, tieni conversazioni e file insieme e trasforma le tue ricerche in documenti o slide.',
    'Converti immagini, PDF, audio e documenti direttamente nel browser.',
    'Cifra un file, inserisci i dati cifrati in un altro file e recuperali con una password.',
    'Invia file tra browser attraverso una connessione peer-to-peer.',
    'Trasforma una foto in un’immagine fatta di caratteri, cambia lo stile e guarda l’anteprima.',
    'Esplora i satelliti su un globo e guarda le orbite e i passaggi previsti.',
    'Hai scritto con la lingua di tastiera sbagliata su Windows? Converti il testo senza riscriverlo.',
  ],
  zh:[
    '提问、集中管理对话和文件，再把研究结果整理成文档或幻灯片。',
    '直接在浏览器中转换图片、PDF、音频和文档格式。',
    '加密文件，将加密数据放入另一个文件，再通过密码恢复。',
    '通过点对点连接，在两个浏览器之间发送文件。',
    '把照片变成字符画，调整风格并预览结果。',
    '在地球仪上探索卫星，查看轨道和预测过境时间。',
    '在 Windows 上用错了键盘语言？直接转换文本，无须重新输入。',
  ],
  ru:[
    'Задавайте вопросы, храните разговоры и файлы вместе и превращайте результаты исследования в документы или слайды.',
    'Конвертируйте изображения, PDF, аудио и документы прямо в браузере.',
    'Зашифруйте файл, поместите зашифрованные данные в другой файл и восстановите их с помощью пароля.',
    'Передавайте файлы между браузерами через прямое соединение.',
    'Превратите фото в рисунок из символов, измените стиль и посмотрите результат.',
    'Исследуйте спутники на глобусе, смотрите их орбиты и прогнозируемые пролёты.',
    'Набрали текст в неправильной раскладке Windows? Преобразуйте его, не набирая заново.',
  ],
  el:[
    'Κάνε ερωτήσεις, κράτησε συνομιλίες και αρχεία μαζί και μετέτρεψε την έρευνά σου σε έγγραφα ή διαφάνειες.',
    'Μετέτρεψε εικόνες, PDF, ήχο και έγγραφα απευθείας στον περιηγητή.',
    'Κρυπτογράφησε ένα αρχείο, αποθήκευσε τα κρυπτογραφημένα δεδομένα μέσα σε άλλο αρχείο και ανάκτησέ τα με κωδικό.',
    'Στείλε αρχεία μεταξύ περιηγητών μέσω άμεσης σύνδεσης.',
    'Μετέτρεψε μια φωτογραφία σε εικόνα από χαρακτήρες, άλλαξε το ύφος και δες το αποτέλεσμα.',
    'Εξερεύνησε δορυφόρους σε μια υδρόγειο και δες τις τροχιές και τις προβλεπόμενες διελεύσεις τους.',
    'Έγραψες με λάθος γλώσσα πληκτρολογίου στα Windows; Μετέτρεψε το κείμενο χωρίς να το ξαναγράψεις.',
  ],
  la:[
    'Quaestiones pone, colloquia et tabulas una serva, atque investigationem tuam in documenta vel laminas converte.',
    'Imagines, PDF, sonos et documenta in navigatro converte.',
    'Tabulam cifra, data cifrata intra aliam tabulam serva et tessera restitue.',
    'Tabulas inter navigatra nexu directo mitte.',
    'Photographiam in imaginem ex characteribus factam converte, stilum muta et exitum vide.',
    'Satellites in globo explora, orbitas et transitus praedictos vide.',
    'In Windows lingua claviaturae falsa scripsisti? Textum converte sine eo iterum scribendo.',
  ],
};

export function getProjectNote(lang: LanguageType, id: string, fallback: string) {
  const index = ids.indexOf(id);
  return index < 0 ? fallback : notes[lang][index];
}

export const expertiseIntro: Record<LanguageType,string> = {
  en:'These are the tools behind the projects above. Choose a category to see what I work with.',
  fa:'این‌ها ابزارهای پشت پروژه‌های بالاست. هر بخش را باز کن تا ببینی با چه چیزهایی کار می‌کنم.',
  ar:'هذه الأدوات وراء المشاريع أعلاه. اختر قسمًا لترى ما أعمل به.',
  de:'Mit diesen Werkzeugen entstehen die Projekte oben. Wähle eine Kategorie, um mehr zu sehen.',
  fr:'Voici les outils utilisés dans les projets ci-dessus. Choisissez une catégorie pour en savoir plus.',
  it:'Questi sono gli strumenti usati nei progetti sopra. Scegli una categoria per saperne di più.',
  zh:'上面的项目就是用这些工具做的。选择一个分类，看看我具体使用什么。',
  ru:'Эти инструменты стоят за проектами выше. Выберите категорию, чтобы узнать, с чем я работаю.',
  el:'Με αυτά τα εργαλεία δημιουργούνται τα παραπάνω έργα. Διάλεξε κατηγορία για να δεις με τι δουλεύω.',
  la:'His instrumentis opera supra facio. Genus elige ut videas quibus utar.',
};
