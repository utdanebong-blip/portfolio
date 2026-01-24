import { Project, AboutData, ResumeData, ContactInfo, Plugin, BlogPost } from '@/types/portfolio';
import { useState, useEffect } from 'react';
import { demoProjects, demoAboutData, demoResumeData, demoContactInfo, demoPlugins, demoBlogPosts, demoShowreel, demoArchvizProjects, demoProductVizProjects } from '@/data/demoData';

// Ensure public asset paths resolve correctly when the app is deployed
// (e.g. GitHub Pages serves from a repo base). Prefix non-external paths
// with `import.meta.env.BASE_URL` at runtime.
const BASE = import.meta.env.BASE_URL || '/';

function normalizePaths(obj: any) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => normalizePaths(item));
  }
  const out: any = Array.isArray(obj) ? [] : {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (typeof val === 'string') {
      const s = val as string;
      const isExternal = s.startsWith('http') || s.startsWith('mailto:') || s.startsWith('data:');
      const alreadyBase = s.startsWith(BASE);
      if (!isExternal && !alreadyBase) {
        // prefix relative or root paths with BASE
        out[key] = `${BASE}${s.replace(/^\/?/, '')}`;
        continue;
      }
      out[key] = val;
    } else if (typeof val === 'object' && val !== null) {
      out[key] = normalizePaths(val);
    } else {
      out[key] = val;
    }
  }
  return out;
}

// Create normalized copies so we don't mutate original imports
const _demoProjects = normalizePaths(demoProjects);
const _demoAboutData = normalizePaths(demoAboutData);
const _demoResumeData = normalizePaths(demoResumeData);
const _demoContactInfo = normalizePaths(demoContactInfo);
const _demoPlugins = normalizePaths(demoPlugins);
const _demoBlogPosts = normalizePaths(demoBlogPosts);
const _demoShowreel = normalizePaths(demoShowreel);
const _demoArchvizProjects = normalizePaths(demoArchvizProjects);
const _demoProductVizProjects = normalizePaths(demoProductVizProjects);

export const projects: Project[] = _demoProjects as Project[];
export const aboutData: AboutData = _demoAboutData as AboutData;
export const resumeData: ResumeData = _demoResumeData as ResumeData;
export const contactInfo: ContactInfo = _demoContactInfo as ContactInfo;
export const plugins: Plugin[] = _demoPlugins as Plugin[];
export const posts: BlogPost[] = _demoBlogPosts as BlogPost[];
export const showreel = _demoShowreel as any;

export const archvizProjects: Project[] = _demoArchvizProjects as Project[];
export let productVizProjects: Project[] = (_demoProductVizProjects as Project[]).map(p => ({ ...p }));

// Simple subscriber list so hooks can stay in sync when projects are updated at runtime
const productVizSubscribers: Array<(projects: Project[]) => void> = [];

export function updateProductVizProject(id: string, patch: Partial<Project>) {
  const idx = productVizProjects.findIndex(p => p.id === id);
  if (idx === -1) return undefined;
  productVizProjects[idx] = { ...productVizProjects[idx], ...patch };
  // notify subscribers
  productVizSubscribers.forEach((cb) => cb(productVizProjects));
  return productVizProjects[idx];
}

export function useArchvizProjects() {
  function getProject(id: string) {
    return archvizProjects.find((p) => p.id === id);
  }

  return { projects: archvizProjects, getProject };
}

export function useProductVizProjects() {
  // local state so consuming components re-render on updates
  const [projectsState, setProjectsState] = useState<Product[]>(productVizProjects);

  useEffect(() => {
    productVizSubscribers.push(setProjectsState);
    return () => {
      const idx = productVizSubscribers.indexOf(setProjectsState);
      if (idx !== -1) productVizSubscribers.splice(idx, 1);
    };
  }, []);

  function getProject(id: string) {
    return projectsState.find((p) => p.id === id);
  }

  return { projects: projectsState, getProject, updateProject: updateProductVizProject };
}

export function getProject(id: string) {
  return projects.find((p) => p.id === id);
}

export function getPost(id: string) {
  return posts.find((p) => p.id === id);
}

export function useProjects() {
  function getProjectById(id: string) {
    return projects.find((p) => p.id === id);
  }

  return { projects, getProject: getProjectById };
}

// Convenience hooks used by pages/components expecting hook-style access
export function useAboutData() {
  return { aboutData };
}

export function useResumeData() {
  return { resumeData };
}

