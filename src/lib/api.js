import axios from 'axios';
import { supabase } from './supabaseClient';
import { projects as localProjects } from '../data/portfolio';

// Backend API base — configurable via env. Falls back to Supabase then local data.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const normalizeSupabase = (p) => ({
  id: p.id ?? p.title,
  title: p.title,
  description: p.description,
  tech: p.tech_stack ?? [],
  features: p.features ?? [],
  github: p.github_url ?? null,
  demo: p.demo_url ?? null,
  featured: p.featured ?? false,
  category: p.category ?? 'Web',
  image: p.image ?? null,
});

const normalizeApi = (p) => ({
  id: p.id ?? p.title,
  title: p.title,
  description: p.description,
  tech: p.tech_stack ?? p.tech ?? [],
  features: p.features ?? [],
  github: p.github_url ?? p.github,
  demo: p.demo_url ?? p.demo,
  featured: p.featured ?? false,
  category: p.category ?? 'Web',
  image: p.image ?? null,
});

export async function fetchProjects() {
  // 1) Supabase (provisioned, always available in this environment)
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });
    if (!error && Array.isArray(data) && data.length > 0) {
      return data.map(normalizeSupabase);
    }
  } catch {
    // ignore — try next source
  }

  // 2) FastAPI backend (when VITE_API_URL points to a running server)
  try {
    const { data } = await axios.get(`${API_URL}/projects`, { timeout: 4000 });
    if (Array.isArray(data) && data.length > 0) return data.map(normalizeApi);
  } catch {
    // ignore — fall through
  }

  // 3) Local fallback
  return localProjects;
}

export async function submitContact(payload) {
  // 1) Supabase
  try {
    const { error } = await supabase.from('contact_messages').insert({
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
    });
    if (!error) return { ok: true };
  } catch {
    // try next
  }

  // 2) FastAPI
  try {
    const { data } = await axios.post(`${API_URL}/contact`, payload, { timeout: 6000 });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err };
  }
}
