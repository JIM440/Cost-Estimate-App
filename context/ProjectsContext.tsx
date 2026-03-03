import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  initProjectsTable,
  loadProjectsFromDb,
  insertProjectToDb,
  updateProjectInDb,
  deleteProjectFromDb,
  clearAllProjectsFromDb,
} from '../db/projects';

export type ProjectType =
  | 'block'
  | 'concrete'
  | 'paint'
  | 'roofing'
  | 'excavation'
  | 'rod'
  | 'single-house'
  | 'multi-house'
  | 'custom';

export interface ProjectSummaryItem {
  label: string;
  value: string;
  unit?: string;
}

export interface Project {
  id: string;
  type: ProjectType;
  title: string;
  createdAt: string;
  summary: ProjectSummaryItem[];
  data: Record<string, any>;
}

interface ProjectsContextValue {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  loading: boolean;
  clearAllProjects: () => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextValue | undefined>(undefined);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await initProjectsTable();
        if (cancelled) return;
        const list = await loadProjectsFromDb();
        if (cancelled) return;
        setProjects(list);
      } catch (error) {
        console.warn('Failed to load projects from db', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const addProject = async (projectInput: Omit<Project, 'id' | 'createdAt'>) => {
    const now = new Date();
    const project: Project = {
      ...projectInput,
      id: `${now.getTime()}-${Math.random().toString(36).slice(2, 10)}`,
      createdAt: now.toISOString(),
    };
    setProjects((prev) => [project, ...prev]);
    try {
      await insertProjectToDb(project);
    } catch (error) {
      console.warn('Failed to save project to db', error);
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
    }
  };

  const updateProject = async (project: Project) => {
    const previous = projects.find((p) => p.id === project.id);
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? project : p))
    );
    try {
      await updateProjectInDb(project);
    } catch (error) {
      console.warn('Failed to update project in db', error);
      if (previous) {
        setProjects((prev) =>
          prev.map((p) => (p.id === project.id ? previous : p))
        );
      }
    }
  };

  const deleteProject = async (id: string) => {
    const removed = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    try {
      await deleteProjectFromDb(id);
    } catch (error) {
      console.warn('Failed to delete project from db', error);
      if (removed) setProjects((prev) => [removed, ...prev]);
    }
  };

  const clearAllProjects = async () => {
    const previous = [...projects];
    setProjects([]);
    try {
      await clearAllProjectsFromDb();
    } catch (error) {
      console.warn('Failed to clear projects table', error);
      setProjects(previous);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, updateProject, deleteProject, loading, clearAllProjects }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }
  return ctx;
}

