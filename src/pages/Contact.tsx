import { useSiteText } from '../lib/useSiteText';
import PageHeadline from '../components/PageHeadline';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import { cvTranslations } from '../lib/cv_data';
import { LanguageType } from '../lib/translations';
import { SignalSculpture } from '../components/SectionMotion';
import '../styles/pages.css';

// Name, email, message, placeholders, action, compose note, copy states and validation.
const formCopy: Record<LanguageType, string[]> = {
  en: [
    'Your name',
    'Email address',
    'What are you thinking?',
    'Alex / Your name',
    'you@example.com',
    'A project, a question, or a good idea…',
    'Compose email',
    'This opens your email app with a draft. Send it there to reach me.',
    'Copy email',
    'Email copied',
    'Select the email address above to copy it.',
    'Enter at least 2 characters.',
    'Enter a valid email address.',
    'Write at least 10 characters.',
    'Your email draft is ready in your email app. If it did not open, use the email address above.',
  ],
  fa: [
    'نام شما',
    'آدرس ایمیل',
    'چه ایده‌ای در ذهن دارید؟',
    'نام شما',
    'you@example.com',
    'از پروژه، سؤال یا ایده‌تان برایم بنویسید…',
    'نوشتن ایمیل',
    'این فرم برنامه ایمیل شما را با یک پیش‌نویس باز می‌کند. برای ارسال، از همان برنامه استفاده کنید.',
    'کپی ایمیل',
    'ایمیل کپی شد',
    'برای کپی، آدرس ایمیل بالا را انتخاب کنید.',
    'نام باید حداقل ۲ حرف داشته باشد.',
    'یک آدرس ایمیل معتبر وارد کنید.',
    'پیام باید حداقل ۱۰ حرف داشته باشد.',
    'پیش‌نویس در برنامه ایمیل شما باز می‌شود. اگر برنامه‌ای باز نشد، از آدرس ایمیل بالا استفاده کنید.',
  ],
  ar: [
    'اسمك',
    'البريد الإلكتروني',
    'ما الذي تفكر فيه؟',
    'اسمك',
    'you@example.com',
    'مشروع، سؤال، أو فكرة…',
    'كتابة رسالة',
    'يفتح هذا تطبيق البريد مع مسودة. أرسلها من التطبيق للتواصل معي.',
    'نسخ البريد',
    'تم النسخ',
    'حدد عنوان البريد أعلاه لنسخه.',
    'أدخل حرفين على الأقل.',
    'أدخل بريداً إلكترونياً صالحاً.',
    'اكتب 10 أحرف على الأقل.',
    'تفتح المسودة في تطبيق البريد. إن لم يفتح، استخدم العنوان أعلاه.',
  ],
  de: [
    'Dein Name',
    'E-Mail-Adresse',
    'Was hast du vor?',
    'Dein Name',
    'you@example.com',
    'Ein Projekt, eine Frage oder eine Idee…',
    'E-Mail verfassen',
    'Öffnet deine E-Mail-App mit einem Entwurf. Sende ihn dort ab.',
    'E-Mail kopieren',
    'Kopiert',
    'Wähle die E-Mail-Adresse oben zum Kopieren aus.',
    'Mindestens 2 Zeichen eingeben.',
    'Eine gültige E-Mail-Adresse eingeben.',
    'Mindestens 10 Zeichen schreiben.',
    'Der Entwurf öffnet sich in deiner E-Mail-App. Alternativ nutze die Adresse oben.',
  ],
  fr: [
    'Votre nom',
    'Adresse e-mail',
    'Votre idée ?',
    'Votre nom',
    'vous@exemple.fr',
    'Un projet, une question ou une idée…',
    'Rédiger un e-mail',
    'Ouvre votre application e-mail avec un brouillon. Envoyez-le depuis cette application.',
    'Copier l’e-mail',
    'Copié',
    'Sélectionnez l’adresse ci-dessus pour la copier.',
    'Saisissez au moins 2 caractères.',
    'Saisissez une adresse e-mail valide.',
    'Écrivez au moins 10 caractères.',
    'Le brouillon s’ouvre dans votre application e-mail. Sinon, utilisez l’adresse ci-dessus.',
  ],
  it: [
    'Il tuo nome',
    'Indirizzo e-mail',
    'La tua idea?',
    'Il tuo nome',
    'tu@esempio.it',
    'Un progetto, una domanda o un’idea…',
    'Scrivi e-mail',
    'Apre la tua app e-mail con una bozza. Inviala da lì.',
    'Copia e-mail',
    'Copiato',
    'Seleziona l’indirizzo sopra per copiarlo.',
    'Inserisci almeno 2 caratteri.',
    'Inserisci un’e-mail valida.',
    'Scrivi almeno 10 caratteri.',
    'La bozza si apre nella tua app e-mail. Altrimenti usa l’indirizzo sopra.',
  ],
  zh: [
    '你的姓名',
    '电子邮箱',
    '你有什么想法？',
    '姓名',
    'you@example.com',
    '项目、问题或一个好点子…',
    '撰写邮件',
    '这会在邮件应用中打开草稿。请在应用中点击发送。',
    '复制邮箱',
    '已复制',
    '请选择上方邮箱地址并复制。',
    '请输入至少 2 个字符。',
    '请输入有效的邮箱地址。',
    '请至少输入 10 个字符。',
    '草稿将在邮件应用中打开。如果没有打开，请使用上方邮箱地址。',
  ],
  ru: [
    'Ваше имя',
    'Электронная почта',
    'Ваша идея?',
    'Ваше имя',
    'you@example.com',
    'Проект, вопрос или хорошая идея…',
    'Написать письмо',
    'Откроет почтовое приложение с черновиком. Отправьте письмо из приложения.',
    'Скопировать адрес',
    'Скопировано',
    'Выделите адрес выше, чтобы скопировать.',
    'Введите минимум 2 символа.',
    'Введите корректный адрес почты.',
    'Напишите минимум 10 символов.',
    'Черновик откроется в почтовом приложении. Иначе используйте адрес выше.',
  ],
  el: [
    'Το όνομά σας',
    'Διεύθυνση e-mail',
    'Η ιδέα σας;',
    'Το όνομά σας',
    'you@example.com',
    'Ένα έργο, μια ερώτηση ή μια ιδέα…',
    'Σύνταξη e-mail',
    'Ανοίγει την εφαρμογή e-mail με ένα πρόχειρο. Στείλτε το από εκεί.',
    'Αντιγραφή e-mail',
    'Αντιγράφηκε',
    'Επιλέξτε την παραπάνω διεύθυνση για αντιγραφή.',
    'Τουλάχιστον 2 χαρακτήρες.',
    'Εισαγάγετε έγκυρο e-mail.',
    'Γράψτε τουλάχιστον 10 χαρακτήρες.',
    'Το πρόχειρο ανοίγει στην εφαρμογή e-mail. Αλλιώς χρησιμοποιήστε την παραπάνω διεύθυνση.',
  ],
  la: [
    'Nomen tuum',
    'Inscriptio electronica',
    'Quid cogitas?',
    'Nomen tuum',
    'you@example.com',
    'Opus, quaestio, vel nova idea…',
    'Scribe epistulam',
    'Aperit applicationem epistularum cum exemplo. Mitte epistulam ibi.',
    'Copia inscriptionem',
    'Exscriptum',
    'Elige inscriptionem supra ad exscribendum.',
    'Scribe saltem 2 litteras.',
    'Scribe inscriptionem validam.',
    'Scribe saltem 10 litteras.',
    'Exemplum aperitur in applicatione epistularum. Aliter utere inscriptione supra.',
  ],
};

export default function Contact() {
  const l = useSiteText();
  const { dir, t, lang } = useLanguageTheme();
  const reduced = useReducedMotion();
  const cv = cvTranslations[lang];
  const text = formCopy[lang];
  const fa = lang === 'fa';
  const en = lang === 'en';
  const [copied, setCopied] = useState<'idle' | 'success' | 'error'>('idle');
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof values, string>>
  >({});
  const [composed, setComposed] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    []
  );

  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(cv.contactValues.email);
      else {
        const element = document.createElement('textarea');
        element.value = cv.contactValues.email;
        element.style.cssText = 'position:fixed;left:-9999px;top:0';
        document.body.appendChild(element);
        element.select();
        const result = document.execCommand('copy');
        element.remove();
        if (!result) throw new Error('Copy unavailable');
      }
      setCopied('success');
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied('idle'), 3000);
    } catch {
      setCopied('error');
    }
  };

  const composeEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (values.name.trim().length < 2) nextErrors.name = text[11];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      nextErrors.email = text[12];
    if (values.message.trim().length < 10) nextErrors.message = text[13];
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)
        ?.focus();
      return;
    }
    const subject = `Portfolio enquiry — ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n${values.name.trim()}\nReply to: ${values.email.trim()}`;
    window.location.href = `mailto:${cv.contactValues.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setComposed(true);
  };

  const channels = [
    {
      name: 'GitHub',
      label: 'MOHAMMADREZAABEDINPOOR',
      url: cv.contactValues.github,
      icon: Github,
    },
    {
      name: 'Telegram',
      label: cv.contactValues.telegram,
      url: `https://t.me/${cv.contactValues.telegram.replace(/^@/, '')}`,
      icon: Send,
    },
    {
      name: 'LinkedIn',
      label: 'Mohammadreza Abedinpoor',
      url: cv.contactValues.linkedin,
      icon: Linkedin,
    },
  ];
  return (
    <div className="portfolio-page contact-page" dir={dir}>
      <header className="page-header page-container">
        <div className="page-kicker">
          <span>03 /</span>
          {l(t.navContact)}
          <span className="kicker-line" />
        </div>
        <div className="page-heading-row">
          <motion.h1
            initial={reduced ? false : { opacity: 0, x: -25, clipPath: 'inset(0 100% 0 0)' }}
            animate={{ opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 1.05, ease: [.22, 1, .36, 1] }}
          >
            {l(fa ? (
              <>
                <PageHeadline text="از یک سلام،" effect="signal" rtl/>
                <br />
                <em><PageHeadline text="شروع کنیم." effect="signal" rtl/></em>
              </>
            ) : en ? (
              <>
                <PageHeadline text={l("Good things")} effect="signal"/>
                <br />
                <PageHeadline text={l("start with")} effect="signal"/> <em><PageHeadline text="hello." effect="signal"/></em>
              </>
            ) : (
              <PageHeadline text={l(t.contactTitle)} effect="signal" rtl={dir === 'rtl'}/>
            ))}
          </motion.h1>
          <div className="page-intro">
            <p>
              {l(fa
                ? 'یک ایده تازه، یک چالش فنی یا یک همکاری جالب؟ دوست دارم درباره‌اش بشنوم.'
                : en
                  ? 'A new idea, an interesting problem, or a project worth building together? I’d love to hear about it.'
                  : t.contactSub)}
            </p>
            <span className="small-label" dir="ltr">
              {l("RASHT, IRAN / CONNECT FROM ANYWHERE")}</span>
          </div>
        </div>
      </header>
      <div className="page-container contact-layout">
        <section className="contact-direct" aria-label={l(t.contactEmailTitle)}>
          <SignalSculpture fa={fa} activity={values.name.length + values.email.length + values.message.length / 5} composed={composed} />
          <span className="small-label">01 / {l(t.contactEmailTitle)}</span>
          <a
            className="contact-email"
            href={`mailto:${cv.contactValues.email}`}
            dir="ltr"
          >
            mohammadreza
            <br />
            abedinpoor6
            <span>
              @gmail.com <ArrowUpRight size={24} />
            </span>
          </a>
          <button className="copy-email" type="button" onClick={copyEmail}>
            {l(copied === 'success' ? <Check size={15} /> : <Copy size={15} />)}
            {l(copied === 'success' ? text[9] : text[8])}
          </button>
          <p className="copy-feedback" role="status" aria-live="polite">
            {l(copied === 'error'
              ? text[10]
              : copied === 'success'
                ? text[9]
                : '')}
          </p>
          <div className="contact-channels">
            {l(channels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <motion.a
                  href={channel.url}
                  key={channel.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={reduced ? false : { opacity: 0, x: fa ? 30 : -30, rotateY: -12 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: .65, delay: index * .1 }}
                >
                  <Icon size={20} />
                  <div>
                    <strong>{l(channel.name)}</strong>
                    <span dir="ltr">{l(channel.label)}</span>
                  </div>
                  <ArrowUpRight size={20} />
                </motion.a>
              );
            }))}
          </div>
          <div className="contact-small-note">
            <span className="contact-star" aria-hidden="true">
              ✳
            </span>
            <p>
              {l(fa
                ? 'بهترین همکاری‌ها با یک گفتگوی ساده شروع می‌شوند.'
                : en
                  ? 'The best collaborations begin with a simple conversation.'
                  : cv.philosophyQuote)}
            </p>
          </div>
        </section>
        <motion.section
          className="contact-compose"
          data-conversation-label={l('PIMX / A CONVERSATION')}
          initial={reduced ? false : { opacity: 0, rotateY: -14, y: 35, transformPerspective: 1200 }}
          whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="small-label">
            02 / {l(fa ? 'یک پیام برای من' : en ? 'A NOTE TO ME' : t.contactTitle)}
          </span>
          <form ref={formRef} onSubmit={composeEmail} noValidate>
            <div className="contact-field">
              <label htmlFor="contact-name">
                {l(text[0])}
                <span>01</span>
              </label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                value={values.name}
                placeholder={l(text[3])}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                onChange={(event) => {
                  setValues({ ...values, name: event.target.value });
                  setComposed(false);
                }}
              />
              {l(errors.name && (
                <p className="field-error" id="name-error">
                  {l(errors.name)}
                </p>
              ))}
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">
                {l(text[1])}
                <span>02</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                dir="ltr"
                value={values.email}
                placeholder={l(text[4])}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                onChange={(event) => {
                  setValues({ ...values, email: event.target.value });
                  setComposed(false);
                }}
              />
              {l(errors.email && (
                <p className="field-error" id="email-error">
                  {l(errors.email)}
                </p>
              ))}
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message">
                {l(text[2])}
                <span>03</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                maxLength={3000}
                value={values.message}
                placeholder={l(text[5])}
                aria-invalid={!!errors.message}
                aria-describedby={
                  errors.message ? 'message-error' : 'compose-note'
                }
                onChange={(event) => {
                  setValues({ ...values, message: event.target.value });
                  setComposed(false);
                }}
              />
              {l(errors.message && (
                <p className="field-error" id="message-error">
                  {l(errors.message)}
                </p>
              ))}
            </div>
            <div className="compose-footer">
              <button className="page-pill" type="submit">
                {l(text[6])}
                <ArrowUpRight size={20} />
              </button>
              <Mail size={23} strokeWidth={1.1} />
            </div>
            <p className="compose-note" id="compose-note">
              {l(text[7])}
            </p>
            <p className="compose-status" role="status" aria-live="polite">
              {l(composed ? text[14] : '')}
            </p>
          </form>
        </motion.section>
      </div>
    </div>
  );
}
