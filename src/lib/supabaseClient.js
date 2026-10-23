import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Ключи приходят из .env (см. .env.example и README).
// Пока они не заданы, формы работают в локальном режиме (localStorage),
// чтобы сайт не падал до подключения базы.
export const db = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const dbOnline = Boolean(db);

export async function submitSupportRequest(payload) {
  if (!db) return saveLocal('supportRequests', payload);
  const { error } = await db.from('support_requests').insert(payload);
  if (error) return { ok: false, saved: 'none', error };
  return { ok: true, saved: 'db' };
}

export async function submitPledge(payload) {
  if (!db) return saveLocal('donorPledges', payload);
  const { error } = await db.from('donor_pledges').insert(payload);
  if (error) return { ok: false, saved: 'none', error };
  return { ok: true, saved: 'db' };
}

export async function getDonorCount() {
  if (!db) return null;
  const { data, error } = await db.rpc('get_donor_count');
  if (error) return null;
  return data ?? null;
}

const FALLBACK_PREFIX = 'ty-ne-odin:';

function saveLocal(name, payload) {
  try {
    const key = FALLBACK_PREFIX + name;
    const list = JSON.parse(window.localStorage.getItem(key) || '[]');
    list.push({ ...payload, created_at: new Date().toISOString() });
    window.localStorage.setItem(key, JSON.stringify(list));
    return { ok: true, saved: 'local' };
  } catch {
    return { ok: false, saved: 'none', error: new Error('localStorage недоступен') };
  }
}
