import { Project, AboutData, ResumeData, ContactInfo, Plugin, BlogPost } from '@/types/portfolio';
import { useState, useEffect } from 'react';
import { demoProjects, demoAboutData, demoResumeData, demoContactInfo, demoPlugins, demoBlogPosts, demoShowreel, demoArchvizProjects, demoProductVizProjects } from '@/data/demoData';

export const projects: Project[] = demoProjects;
export const aboutData: AboutData = demoAboutData;
export const resumeData: ResumeData = demoResumeData;
export const contactInfo: ContactInfo = demoContactInfo;
export const plugins: Plugin[] = demoPlugins;
export const posts: BlogPost[] = demoBlogPosts;
export const showreel = demoShowreel;

export const archvizProjects: Project[] = demoArchvizProjects;
export let productVizProjects: Project[] = demoProductVizProjects.map(p => ({ ...p }));

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

