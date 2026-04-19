import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { getMe, logout, User } from "@/lib/auth";
import {
  getSpecialists, getMeetings, saveSpecialist, saveMeeting,
  Specialist, Meeting,
} from "@/lib/content";

const MOCK_CONSULTATIONS = [
  { id: 1, specialist: "Анна Соколова", role: "Психолог", date: "10 апреля 2026", status: "Завершена", topic: "Тревога и беспокойство" },
  { id: 2, specialist: "Мария Лебедева", role: "Педиатр", date: "2 апреля 2026", status: "Завершена", topic: "Режим сна ребёнка" },
  { id: 3, specialist: "Елена Войнова", role: "Нутрициолог", date: "25 апреля 2026", status: "Предстоит", topic: "Восстановление после родов" },
];

type AdminTab = "specialists" | "meetings";

const EMPTY_SPECIALIST: Omit<Specialist, "id"> & { id?: number } = { name: "", role: "", tags: [], img: "" };
const EMPTY_MEETING: Omit<Meeting, "id"> & { id?: number } = { title: "", date: "", day: "", format: "Онлайн", spots: "" };

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Admin state
  const [adminTab, setAdminTab] = useState<AdminTab>("specialists");
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [editingSpecialist, setEditingSpecialist] = useState<(Omit<Specialist, "id"> & { id?: number }) | null>(null);
  const [editingMeeting, setEditingMeeting] = useState<(Omit<Meeting, "id"> & { id?: number }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    getMe().then((u) => {
      if (!u) navigate("/");
      else {
        setUser(u);
        if (u.role === "admin") {
          getSpecialists().then(setSpecialists);
          getMeetings().then(setMeetings);
        }
      }
      setLoading(false);
    });
  }, [navigate]);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  async function handleSaveSpecialist() {
    if (!editingSpecialist) return;
    setSaving(true);
    setSaveError("");
    try {
      const tags = typeof editingSpecialist.tags === "string"
        ? (editingSpecialist.tags as string).split(",").map((t) => t.trim()).filter(Boolean)
        : editingSpecialist.tags;
      await saveSpecialist({ ...editingSpecialist, tags });
      const updated = await getSpecialists();
      setSpecialists(updated);
      setEditingSpecialist(null);
    } catch (e: unknown) {
      setSaveError(e instanceof Error ? e.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveMeeting() {
    if (!editingMeeting) return;
    setSaving(true);
    setSaveError("");
    try {
      await saveMeeting(editingMeeting);
      const updated = await getMeetings();
      setMeetings(updated);
      setEditingMeeting(null);
    } catch (e: unknown) {
      setSaveError(e instanceof Error ? e.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
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
        <div className="bg-white border border-border rounded-3xl p-6 mb-6">
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
                    c.status === "Предстоит" ? "bg-accent/15 text-accent" : "bg-secondary text-secondary-foreground"
                  }`}>{c.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ADMIN PANEL ── */}
        {user.role === "admin" && (
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                <Icon name="Settings" size={18} className="text-primary" />
              </div>
              <h2 className="font-display text-2xl text-foreground">Панель администратора</h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setAdminTab("specialists")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  adminTab === "specialists" ? "bg-primary text-primary-foreground" : "bg-white border border-border text-foreground hover:bg-secondary"
                }`}
              >
                Специалисты
              </button>
              <button
                onClick={() => setAdminTab("meetings")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  adminTab === "meetings" ? "bg-primary text-primary-foreground" : "bg-white border border-border text-foreground hover:bg-secondary"
                }`}
              >
                Встречи
              </button>
            </div>

            {/* ── SPECIALISTS TAB ── */}
            {adminTab === "specialists" && (
              <div>
                <div className="space-y-3 mb-4">
                  {specialists.map((s) => (
                    <div key={s.id} className="flex items-center gap-4 bg-white border border-border rounded-2xl p-4">
                      {s.img && (
                        <img src={s.img} alt={s.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.role}</div>
                      </div>
                      <button
                        onClick={() => { setSaveError(""); setEditingSpecialist({ ...s }); }}
                        className="text-sm text-primary border border-primary px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors flex-shrink-0"
                      >
                        Изменить
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => { setSaveError(""); setEditingSpecialist({ ...EMPTY_SPECIALIST }); }}
                  className="flex items-center gap-2 text-sm text-primary border border-dashed border-primary px-4 py-2.5 rounded-full hover:bg-primary/5 transition-colors"
                >
                  <Icon name="Plus" size={15} />
                  Добавить специалиста
                </button>
              </div>
            )}

            {/* ── MEETINGS TAB ── */}
            {adminTab === "meetings" && (
              <div>
                <div className="space-y-3 mb-4">
                  {meetings.map((m) => (
                    <div key={m.id} className="flex items-center gap-4 bg-white border border-border rounded-2xl p-4">
                      <div className="text-center min-w-[44px]">
                        <div className="font-display text-lg font-semibold text-primary leading-none">{m.date.split(" ")[0]}</div>
                        <div className="text-xs text-muted-foreground">{m.date.split(" ")[1]}</div>
                      </div>
                      <div className="w-px h-8 bg-border" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">{m.title}</div>
                        <div className="text-xs text-muted-foreground">{m.day} · {m.format} · {m.spots}</div>
                      </div>
                      <button
                        onClick={() => { setSaveError(""); setEditingMeeting({ ...m }); }}
                        className="text-sm text-primary border border-primary px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors flex-shrink-0"
                      >
                        Изменить
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => { setSaveError(""); setEditingMeeting({ ...EMPTY_MEETING }); }}
                  className="flex items-center gap-2 text-sm text-primary border border-dashed border-primary px-4 py-2.5 rounded-full hover:bg-primary/5 transition-colors"
                >
                  <Icon name="Plus" size={15} />
                  Добавить встречу
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── MODAL: EDIT SPECIALIST ── */}
      {editingSpecialist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 p-8 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl text-foreground">
                {editingSpecialist.id ? "Редактировать специалиста" : "Новый специалист"}
              </h3>
              <button onClick={() => setEditingSpecialist(null)} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Имя", key: "name", placeholder: "Анна Соколова" },
                { label: "Должность", key: "role", placeholder: "Психолог · 8 лет опыта" },
                { label: "Фото (URL)", key: "img", placeholder: "https://..." },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={(editingSpecialist as Record<string, unknown>)[key] as string}
                    onChange={(e) => setEditingSpecialist({ ...editingSpecialist, [key]: e.target.value })}
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Теги (через запятую)</label>
                <input
                  type="text"
                  placeholder="Тревога, Депрессия, Отношения"
                  value={Array.isArray(editingSpecialist.tags) ? editingSpecialist.tags.join(", ") : editingSpecialist.tags}
                  onChange={(e) => setEditingSpecialist({ ...editingSpecialist, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              {saveError && <div className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">{saveError}</div>}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setEditingSpecialist(null)}
                  className="flex-1 border border-border text-foreground py-3 rounded-full text-sm hover:bg-secondary transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSaveSpecialist}
                  disabled={saving}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {saving ? "Сохраняю..." : "Сохранить"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: EDIT MEETING ── */}
      {editingMeeting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 p-8 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl text-foreground">
                {editingMeeting.id ? "Редактировать встречу" : "Новая встреча"}
              </h3>
              <button onClick={() => setEditingMeeting(null)} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Название", key: "title", placeholder: "Тема: Послеродовое восстановление" },
                { label: "Дата (напр. 25 апр)", key: "date", placeholder: "25 апр" },
                { label: "День недели", key: "day", placeholder: "Пятница" },
                { label: "Количество мест", key: "spots", placeholder: "20 мест" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={(editingMeeting as Record<string, unknown>)[key] as string}
                    onChange={(e) => setEditingMeeting({ ...editingMeeting, [key]: e.target.value })}
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Формат</label>
                <select
                  value={editingMeeting.format}
                  onChange={(e) => setEditingMeeting({ ...editingMeeting, format: e.target.value })}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option>Онлайн</option>
                  <option>Офлайн</option>
                </select>
              </div>
              {saveError && <div className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">{saveError}</div>}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setEditingMeeting(null)}
                  className="flex-1 border border-border text-foreground py-3 rounded-full text-sm hover:bg-secondary transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSaveMeeting}
                  disabled={saving}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {saving ? "Сохраняю..." : "Сохранить"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
