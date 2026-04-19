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

export default function SpecialistsBlog() {
  return (
    <>
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
    </>
  );
}
