import Icon from "@/components/ui/icon";

export default function HeroAbout() {
  return (
    <>
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
    </>
  );
}
