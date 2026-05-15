import { calculatePValue } from './statistics';

const STORAGE_KEY = "cortana-crv-sessions";

export function getSessions() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to parse sessions", e);
    return [];
  }
}

export function saveSession(session) {
  if (typeof window === 'undefined') return;
  const sessions = getSessions();
  sessions.push({ ...session, id: Date.now() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function getStats() {
  const sessions = getSessions();
  const totalSessions = sessions.length;
  const hits = sessions.filter(s => s.hit).length;
  const hitRate = totalSessions > 0 ? hits / totalSessions : 0;
  const pValue = calculatePValue(totalSessions, hits);

  return { totalSessions, hits, hitRate, pValue, sessions };
}

export function clearSessions() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
