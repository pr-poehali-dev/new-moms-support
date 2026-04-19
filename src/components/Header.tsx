import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import AuthModal from "@/components/AuthModal";
import { getMe, User } from "@/lib/auth";

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
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMe().then(setUser);
  }, []);

  function handleAuthSuccess(u: User) {
    setUser(u);
    setShowAuth(false);
    navigate("/dashboard");
  }

  return (
    <>
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
            {user ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 text-sm text-foreground border border-border px-4 py-2 rounded-full hover:bg-secondary transition-colors"
              >
                <Icon name="User" size={15} />
                {user.name.split(" ")[0]}
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowAuth(true)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Войти
                </button>
                <button
                  onClick={() => setShowAuth(true)}
                  className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  Присоединиться
                </button>
              </>
            )}
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
            {user ? (
              <button
                onClick={() => { setMenuOpen(false); navigate("/dashboard"); }}
                className="w-full text-sm bg-primary text-primary-foreground px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity mt-2"
              >
                Мой кабинет
              </button>
            ) : (
              <button
                onClick={() => { setMenuOpen(false); setShowAuth(true); }}
                className="w-full text-sm bg-primary text-primary-foreground px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity mt-2"
              >
                Присоединиться
              </button>
            )}
          </div>
        )}
      </header>

      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} onSuccess={handleAuthSuccess} />
      )}
    </>
  );
}
