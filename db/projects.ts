import { Platform } from 'react-native';
import type { Project } from '../context/ProjectsContext';

const IS_WEB = Platform.OS === 'web';

// Only load expo-sqlite on native; never on web to avoid "Cannot find native module 'ExpoSQLite'"
const SQLiteModule = IS_WEB ? null : (require('expo-sqlite') as typeof import('expo-sqlite'));

type SQLiteType = typeof import('expo-sqlite');
let dbInstance: Awaited<ReturnType<SQLiteType['openDatabaseAsync']>> | null = null;

const WEB_STORAGE_KEY = 'cost_estimate_projects';

function getWebStorage(): Project[] {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(WEB_STORAGE_KEY) : null;
    if (raw == null || raw === '') return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setWebStorage(projects: Project[]): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(WEB_STORAGE_KEY, JSON.stringify(projects));
    }
  } catch (_) {}
}

async function getDb() {
  if (IS_WEB) return null;
  if (dbInstance) return dbInstance;
  if (!SQLiteModule) return null;
  dbInstance = await SQLiteModule.openDatabaseAsync('cost_estimate.db');
  return dbInstance;
}

export async function initProjectsTable(): Promise<void> {
  if (IS_WEB) return;
  const db = await getDb();
  if (!db) return;
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY NOT NULL,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      created_at TEXT NOT NULL,
      summary_json TEXT NOT NULL,
      data_json TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
  `);
}

function safeParseJson<T>(json: string, fallback: T): T {
  try {
    if (json == null || json === '') return fallback;
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

export async function loadProjectsFromDb(): Promise<Project[]> {
  if (IS_WEB) {
    const list = getWebStorage();
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  const db = await getDb();
  if (!db) return [];
  const rows = await db.getAllAsync<{
    id: string;
    type: string;
    title: string;
    created_at: string;
    summary_json: string;
    data_json: string;
  }>('SELECT * FROM projects ORDER BY datetime(created_at) DESC;');

  const projects: Project[] = [];
  for (const row of rows) {
    if (!row?.id || !row?.type || !row?.title || !row?.created_at) continue;
    projects.push({
      id: String(row.id),
      type: row.type as Project['type'],
      title: String(row.title),
      createdAt: String(row.created_at),
      summary: safeParseJson<Project['summary']>(row.summary_json ?? '', []),
      data: safeParseJson<Project['data']>(row.data_json ?? '{}', {}),
    });
  }
  return projects;
}

export async function insertProjectToDb(project: Project): Promise<void> {
  if (IS_WEB) {
    const list = getWebStorage();
    list.unshift(project);
    setWebStorage(list);
    return;
  }
  const db = await getDb();
  if (!db) return;
  const summaryJson = JSON.stringify(project.summary ?? []);
  const dataJson = JSON.stringify(project.data ?? {});
  await db.runAsync(
    `INSERT INTO projects (id, type, title, created_at, summary_json, data_json)
     VALUES (?, ?, ?, ?, ?, ?);`,
    project.id,
    project.type,
    project.title,
    project.createdAt,
    summaryJson,
    dataJson
  );
}

export async function updateProjectInDb(project: Project): Promise<void> {
  if (IS_WEB) {
    const list = getWebStorage();
    const idx = list.findIndex((p) => p.id === project.id);
    if (idx >= 0) {
      list[idx] = project;
      setWebStorage(list);
    }
    return;
  }
  const db = await getDb();
  if (!db) return;
  const summaryJson = JSON.stringify(project.summary ?? []);
  const dataJson = JSON.stringify(project.data ?? {});
  await db.runAsync(
    `UPDATE projects SET type = ?, title = ?, summary_json = ?, data_json = ? WHERE id = ?;`,
    [project.type, project.title, summaryJson, dataJson, project.id]
  );
}

export async function deleteProjectFromDb(id: string): Promise<void> {
  if (IS_WEB) {
    const list = getWebStorage().filter((p) => p.id !== id);
    setWebStorage(list);
    return;
  }
  const db = await getDb();
  if (!db) return;
  const result = await db.runAsync('DELETE FROM projects WHERE id = ?', [id]);
  if (__DEV__ && result.changes === 0) {
    console.warn('[projects] deleteProjectFromDb: no rows deleted for id', id);
  }
}

export async function clearAllProjectsFromDb(): Promise<void> {
  if (IS_WEB) {
    setWebStorage([]);
    return;
  }
  const db = await getDb();
  if (!db) return;
  await db.runAsync('DELETE FROM projects;');
}

// Intentionally no demo seeding logic in this module.
