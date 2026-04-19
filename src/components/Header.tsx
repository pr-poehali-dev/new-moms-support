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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
  );
}
