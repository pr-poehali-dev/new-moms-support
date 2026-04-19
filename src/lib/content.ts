const CONTENT_URL = "https://functions.poehali.dev/e14e9e5b-1d9c-474e-a17c-c56a99b50056";
const SESSION_KEY = "mamakrug_session";

function sid() {
  return localStorage.getItem(SESSION_KEY) || "";
}

export interface Specialist {
  id: number;
  name: string;
  role: string;
  tags: string[];
  img: string;
}

export interface Meeting {
  id: number;
  title: string;
  date: string;
  day: string;
  format: string;
  spots: string;
}

export async function getSpecialists(): Promise<Specialist[]> {
  const res = await fetch(`${CONTENT_URL}?action=specialists`);
  return res.json();
}

export async function getMeetings(): Promise<Meeting[]> {
  const res = await fetch(`${CONTENT_URL}?action=meetings`);
  return res.json();
}

async function authFetch(method: string, action: string, body: object) {
  const res = await fetch(`${CONTENT_URL}?action=${action}`, {
    method,
    headers: { "Content-Type": "application/json", "X-Session-Id": sid() },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Ошибка");
  return data;
}

export const saveSpecialist = (s: Omit<Specialist, "id"> & { id?: number }) =>
  s.id ? authFetch("PUT", "specialist", s) : authFetch("POST", "specialist", s);

export const saveMeeting = (m: Omit<Meeting, "id"> & { id?: number }) =>
  m.id ? authFetch("PUT", "meeting", m) : authFetch("POST", "meeting", m);
