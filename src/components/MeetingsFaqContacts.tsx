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

export default function MeetingsFaqContacts() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
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
    </>
  );
}
