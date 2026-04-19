import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "О проекте", href: "#about" },
  { label: "Специалисты", href: "#specialists" },
  { label: "Блог", href: "#blog" },
  { label: "Вопросы", href: "#faq" },
  { label: "Встречи", href: "#meetings" },
  { label: "Контакты", href: "#contacts" },
];

const SPECIALISTS = [
  {
    name: "Анна Соколова",
    role: "Психолог · 8 лет опыта",
    tags: ["Тревога", "Послеродовая депрессия", "Отношения"],
    img: "https://cdn.poehali.dev/projects/72c4f6fe-eb94-498b-af59-11458089f6fa/files/447f914d-f167-4b8b-9c17-ed7442e5f27d.jpg",
  },
  {
    name: "Мария Лебедева",
    role: "Педиатр · 12 лет опыта",
    tags: ["Здоровье ребёнка", "Питание", "Режим"],
    img: "https://cdn.poehali.dev/projects/72c4f6fe-eb94-498b-af59-11458089f6fa/files/447f914d-f167-4b8b-9c17-ed7442e5f27d.jpg",
  },
  {
    name: "Елена Войнова",
    role: "Нутрициолог · 6 лет опыта",
    tags: ["Питание мамы", "Восстановление", "Энергия"],
    img: "https://cdn.poehali.dev/projects/72c4f6fe-eb94-498b-af59-11458089f6fa/files/447f914d-f167-4b8b-9c17-ed7442e5f27d.jpg",
  },
];

const BLOG_POSTS = [
  {
    tag: "Психология",
    title: "Как справиться с тревогой в первые месяцы",
    desc: "Практические инструменты для мам, которые чувствуют себя потерянными.",
    date: "12 апреля 2026",
  },
  {
    tag: "Здоровье",
    title: "Сон ребёнка: что нормально, а что нет",
    desc: "Разбираем мифы о детском сне с педиатром Марией Лебедевой.",
    date: "7 апреля 2026",
  },
  {
    tag: "Встречи",
    title: "Как прошла наша апрельская встреча",
    desc: "Тёплый отчёт о встрече в кругу 30 мам в Москве.",
    date: "2 апреля 2026",
  },
];

const FAQ_ITEMS = [
  {
    q: "Для кого этот проект?",
    a: "Для мам на любом этапе: беременность, первые месяцы, дошкольный возраст. Мы принимаем всех без исключения.",
  },
  {
    q: "Как попасть на консультацию к специалисту?",
    a: "Выберите специалиста в соответствующем разделе и нажмите «Записаться». Мы свяжемся с вами в течение 24 часов.",
  },
  {
    q: "Встречи проходят офлайн?",
    a: "Да, встречи проводятся в Москве раз в месяц. Также есть онлайн-формат — подключиться можно из любого города.",
  },
  {
    q: "Нужно ли платить за участие в сообществе?",
    a: "Базовый доступ к сообществу и встречам бесплатный. Консультации со специалистами — платные, цены уточняйте на странице специалиста.",
  },
];

const MEETINGS = [
  {
    date: "25 апр",
    day: "Пятница",
    title: "Тема: Послеродовое восстановление",
    format: "Онлайн",
    spots: "12 мест",
  },
  {
    date: "10 мая",
    day: "Суббота",
    title: "Живая встреча в Москве",
    format: "Офлайн",
    spots: "20 мест",
  },
  {
    date: "22 мая",
    day: "Четверг",
    title: "Вебинар: Детские страхи",
    format: "Онлайн",
    spots: "Без ограничений",
  },
];

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="font-display text-2xl font-semibold text-primary tracking-tight">
            МамаКруг
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Войти
            </button>
            <button className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
              Присоединиться
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4 animate-fade-up">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-foreground"
              >
                {l.label}
              </a>
            ))}
            <button className="w-full text-sm bg-primary text-primary-foreground px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity mt-2">
              Присоединиться
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="pt-28 pb-20 md:pt-36 md:pb-28 container max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-full mb-6 animate-fade-up">
              Сообщество для мам
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.08] text-foreground mb-6 animate-fade-up delay-100">
              Здесь тебя<br />
              <em className="text-primary not-italic">понимают</em><br />
              и поддержат
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 animate-fade-up delay-200 max-w-md">
              МамаКруг — живое сообщество, проверенные специалисты и настоящие встречи для мам, которым нужна опора.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-up delay-300">
              <button className="bg-primary text-primary-foreground px-7 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                Стать участницей
              </button>
              <button className="border border-border text-foreground px-7 py-3 rounded-full text-sm font-medium hover:bg-secondary transition-colors">
                Узнать больше
              </button>
            </div>
            <div className="flex items-center gap-6 mt-10 animate-fade-up delay-400">
              <div className="text-center">
                <div className="font-display text-3xl font-semibold text-foreground">1 200+</div>
                <div className="text-xs text-muted-foreground mt-0.5">участниц</div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <div className="font-display text-3xl font-semibold text-foreground">18</div>
                <div className="text-xs text-muted-foreground mt-0.5">специалистов</div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <div className="font-display text-3xl font-semibold text-foreground">3 года</div>
                <div className="text-xs text-muted-foreground mt-0.5">в сообществе</div>
              </div>
            </div>
          </div>

          <div className="relative animate-scale-in delay-200">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img
                src="https://cdn.poehali.dev/projects/72c4f6fe-eb94-498b-af59-11458089f6fa/files/b065c4a9-c849-4c19-a192-f07adf5b89fa.jpg"
                alt="Сообщество мам"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Icon name="Heart" size={16} className="text-accent" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">Следующая встреча</div>
                  <div className="text-xs text-muted-foreground">25 апреля · Онлайн</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* О ПРОЕКТЕ */}
      <section id="about" className="py-20 md:py-28 bg-secondary/50">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-square shadow-xl">
                <img
                  src="https://cdn.poehali.dev/projects/72c4f6fe-eb94-498b-af59-11458089f6fa/files/4ce45a93-7b3a-4627-b97a-358b7cecf08a.jpg"
                  alt="Встреча мам"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-6 -right-4 bg-primary text-primary-foreground rounded-2xl px-5 py-3 shadow-lg">
                <div className="font-display text-2xl font-semibold">+47</div>
                <div className="text-xs opacity-80">новых мам в апреле</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-accent">О проекте</span>
              <h2 className="font-display text-4xl md:text-5xl text-foreground mt-3 mb-6 leading-tight">
                Мы создали место,<br />где мама — это ты
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                МамаКруг родился из простой идеи: мамы не должны чувствовать себя одни. Здесь нет осуждения — только поддержка, знания и настоящие связи.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Мы объединяем психологов, педиатров, нутрициологов и других специалистов, которые работают именно с мамами. Живые встречи, онлайн-кабинет, история консультаций — всё в одном месте.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Users", text: "Живые встречи офлайн и онлайн" },
                  { icon: "ShieldCheck", text: "Проверенные специалисты" },
                  { icon: "BookOpen", text: "Полезный блог и статьи" },
                  { icon: "UserCircle", text: "Личный кабинет участницы" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-border">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={16} className="text-primary" />
                    </div>
                    <span className="text-sm text-foreground leading-tight">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* СПЕЦИАЛИСТЫ */}
      <section id="specialists" className="py-20 md:py-28 container max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">Команда</span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-3">Специалисты</h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Профессионалы, которые работают именно с мамами и знают все нюансы вашего состояния
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {SPECIALISTS.map((s) => (
            <div
              key={s.name}
              className="group bg-white rounded-3xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-4">
                <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-display text-xl text-foreground font-semibold">{s.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-4">{s.role}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {s.tags.map((t) => (
                  <span key={t} className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              <button className="w-full text-sm border border-primary text-primary py-2.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                Записаться
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="text-sm text-muted-foreground border border-border px-6 py-3 rounded-full hover:bg-secondary transition-colors">
            Все специалисты →
          </button>
        </div>
      </section>

      {/* БЛОГ */}
      <section id="blog" className="py-20 md:py-28 bg-secondary/50">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-accent">Блог</span>
              <h2 className="font-display text-4xl md:text-5xl text-foreground mt-3">Статьи и истории</h2>
            </div>
            <button className="hidden md:block text-sm text-muted-foreground border border-border px-6 py-3 rounded-full hover:bg-white transition-colors">
              Все статьи →
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.title}
                className="bg-white rounded-3xl border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="aspect-[16/9] bg-muted" />
                <div className="p-6">
                  <span className="text-xs font-semibold text-accent">{post.tag}</span>
                  <h3 className="font-display text-xl text-foreground mt-2 mb-2 leading-tight">{post.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.desc}</p>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ВСТРЕЧИ */}
      <section id="meetings" className="py-20 md:py-28 container max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">Расписание</span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-3">Ближайшие встречи</h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Присоединяйся к живым и онлайн-встречам нашего сообщества
          </p>
        </div>

        <div className="space-y-4 max-w-2xl mx-auto">
          {MEETINGS.map((m) => (
            <div
              key={m.title}
              className="flex items-center gap-5 bg-white border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="text-center min-w-[52px]">
                <div className="font-display text-2xl font-semibold text-primary leading-none">{m.date.split(" ")[0]}</div>
                <div className="text-xs text-muted-foreground">{m.date.split(" ")[1]}</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="flex-1">
                <div className="font-medium text-foreground text-sm">{m.title}</div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground">{m.day}</span>
                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{m.format}</span>
                  <span className="text-xs text-muted-foreground">{m.spots}</span>
                </div>
              </div>
              <button className="text-sm text-primary border border-primary px-4 py-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap">
                Записаться
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28 bg-secondary/50">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">FAQ</span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mt-3">Частые вопросы</h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="bg-white border border-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/30 transition-colors"
                >
                  <span className="font-medium text-foreground text-sm pr-4">{item.q}</span>
                  <Icon
                    name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                    size={18}
                    className="text-muted-foreground flex-shrink-0"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4 animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contacts" className="py-20 md:py-28 container max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">Контакты</span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mt-3 mb-6">
              Напиши нам,<br />мы ответим
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Есть вопросы о сообществе, хочешь стать специалистом или предложить встречу? Пишите — мы читаем каждое письмо.
            </p>
            <div className="space-y-4">
              {[
                { icon: "Mail", label: "Почта", value: "hello@mamakrug.ru" },
                { icon: "MessageCircle", label: "Telegram", value: "@mamakrug" },
                { icon: "Instagram", label: "Instagram", value: "@mamakrug.official" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon name={c.icon} size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{c.label}</div>
                    <div className="text-sm font-medium text-foreground">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form className="bg-white border border-border rounded-3xl p-8 space-y-4 shadow-sm">
            <h3 className="font-display text-2xl text-foreground mb-2">Написать нам</h3>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Ваше имя</label>
              <input
                type="text"
                placeholder="Мария"
                className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                placeholder="maria@example.com"
                className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Сообщение</label>
              <textarea
                rows={4}
                placeholder="Ваш вопрос или предложение..."
                className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
              Отправить сообщение
            </button>
          </form>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-primary-foreground mb-4">
            Ты не одна. Вступай в круг
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
            Более 1200 мам уже здесь. Присоединяйся бесплатно и найди свою опору.
          </p>
          <button className="bg-white text-primary px-8 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
            Вступить в сообщество
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-border">
        <div className="container max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl text-primary font-semibold">МамаКруг</div>
          <div className="flex flex-wrap gap-5 justify-center">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">© 2026 МамаКруг</div>
        </div>
      </footer>

    </div>
  );
}