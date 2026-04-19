const AUTH_URL = "https://functions.poehali.dev/21bcaca2-a0cc-4f37-9ab3-66e493b48e3b";
const SESSION_KEY = "mamakrug_session";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "member" | "admin";
}

function getSessionId(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

function saveSession(sid: string) {
  localStorage.setItem(SESSION_KEY, sid);
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export async function register(name: string, email: string, password: string): Promise<User> {
  const res = await fetch(`${AUTH_URL}?action=register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Ошибка регистрации");
  saveSession(data.session_id);
  return data.user;
}

export async function login(email: string, password: string): Promise<User> {
  const res = await fetch(`${AUTH_URL}?action=login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Ошибка входа");
  saveSession(data.session_id);
  return data.user;
}

export async function logout(): Promise<void> {
  const sid = getSessionId();
  if (sid) {
    await fetch(`${AUTH_URL}?action=logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Session-Id": sid },
      body: "{}",
    });
  }
  clearSession();
}

export async function getMe(): Promise<User | null> {
  const sid = getSessionId();
  if (!sid) return null;
  const res = await fetch(`${AUTH_URL}?action=me`, {
    headers: { "X-Session-Id": sid },
  });
  if (!res.ok) {
    clearSession();
    return null;
  }
  return res.json();
}
