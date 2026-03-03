import * as SQLite from 'expo-sqlite';
import type { Project } from '../context/ProjectsContext';

let dbInstance: SQLite.SQLiteDatabase | null = null;

async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (dbInstance) return dbInstance;
  dbInstance = await SQLite.openDatabaseAsync('cost_estimate.db');
  return dbInstance;
}

export async function initProjectsTable(): Promise<void> {
  const db = await getDb();
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
  const db = await getDb();
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
  const db = await getDb();
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
  const db = await getDb();
  const summaryJson = JSON.stringify(project.summary ?? []);
  const dataJson = JSON.stringify(project.data ?? {});
  await db.runAsync(
    `UPDATE projects SET type = ?, title = ?, summary_json = ?, data_json = ? WHERE id = ?;`,
    [project.type, project.title, summaryJson, dataJson, project.id]
  );
}

export async function deleteProjectFromDb(id: string): Promise<void> {
  const db = await getDb();
  const result = await db.runAsync('DELETE FROM projects WHERE id = ?', [id]);
  if (__DEV__ && result.changes === 0) {
    console.warn('[projects] deleteProjectFromDb: no rows deleted for id', id);
  }
}

export async function clearAllProjectsFromDb(): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM projects;');
}
