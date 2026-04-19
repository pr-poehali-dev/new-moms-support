import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { getMe, logout, User } from "@/lib/auth";

const MOCK_CONSULTATIONS = [
  { id: 1, specialist: "Анна Соколова", role: "Психолог", date: "10 апреля 2026", status: "Завершена", topic: "Тревога и беспокойство" },
  { id: 2, specialist: "Мария Лебедева", role: "Педиатр", date: "2 апреля 2026", status: "Завершена", topic: "Режим сна ребёнка" },
  { id: 3, specialist: "Елена Войнова", role: "Нутрициолог", date: "25 апреля 2026", status: "Предстоит", topic: "Восстановление после родов" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe().then((u) => {
      if (!u) navigate("/");
      else setUser(u);
      setLoading(false);
    });
  }, [navigate]);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Загрузка...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="font-display text-xl font-semibold text-primary">МамаКруг</a>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user.name}</span>
            {user.role === "admin" && (
              <span className="text-xs bg-primary text-primary-foreground px-2.5 py-1 rounded-full font-medium">
                Администратор
              </span>
            )}
            <button
              onClick={handleLogout}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <Icon name="LogOut" size={16} />
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display text-4xl text-foreground">Привет, {user.name.split(" ")[0]} 👋</h1>
          <p className="text-muted-foreground mt-1 text-sm">{user.email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: "CalendarCheck", label: "Консультаций", value: "3" },
            { icon: "Clock", label: "Предстоит", value: "1" },
            { icon: "Users", label: "Встреч посещено", value: "2" },
            { icon: "Heart", label: "В сообществе", value: "14 дней" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-border rounded-2xl p-5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Icon name={s.icon} size={18} className="text-primary" />
              </div>
              <div className="font-display text-2xl font-semibold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Consultations */}
        <div className="bg-white border border-border rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-foreground">История консультаций</h2>
            <button className="text-sm text-primary border border-primary px-4 py-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
              Записаться
            </button>
          </div>

          <div className="space-y-3">
            {MOCK_CONSULTATIONS.map((c) => (
              <div key={c.id} className="flex items-center gap-4 p-4 rounded-2xl border border-border hover:bg-secondary/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={18} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{c.specialist}</div>
                  <div className="text-xs text-muted-foreground">{c.role} · {c.topic}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs text-muted-foreground">{c.date}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                    c.status === "Предстоит"
                      ? "bg-accent/15 text-accent"
                      : "bg-secondary text-secondary-foreground"
                  }`}>
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin panel */}
        {user.role === "admin" && (
          <div className="mt-6 bg-primary/5 border border-primary/20 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                <Icon name="Settings" size={18} className="text-primary" />
              </div>
              <h2 className="font-display text-2xl text-foreground">Панель администратора</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Ты администратор сайта. Здесь будут инструменты управления контентом.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { icon: "Users", label: "Участницы" },
                { icon: "UserCheck", label: "Специалисты" },
                { icon: "Calendar", label: "Встречи" },
              ].map((item) => (
                <button key={item.label} className="flex items-center gap-3 p-4 bg-white border border-border rounded-2xl hover:shadow-sm transition-shadow text-left">
                  <Icon name={item.icon} size={18} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
