import { ReactNode } from "react";

export interface Project {
  highlights: any;
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: {
    rendered: string;
    wireframe: string;
    uv: string;
    // Optional array of extra rendered images with optional direct links
    renderedExtras?: Array<{
    // Optional fields used by archviz projects
    status?: string;
    location?: string;
    area?: string;
    type?: string;
    style?: string;
    year?: string;
      src: string;
      link?: string;
    }>;
  };
  glb?: string;
  // Optional concept used by some archviz entries
  concept?: string;
  modelUrl?: string;
  specs: {
    status?: string;
    year?: string | number;
    location?: string | ReactNode;
    area?: string | number;
    type?: string;
    polyCount?: number;
    vertexCount?: number;
    texelDensity?: string;
    materialSlots?: number;
    textureResolution?: string;
    fileSize?: string;
    client?: string;
    deliverables?: string;
    industry?: string;
    [key: string]: any;
  };
  software: string[];
  category: string;
  createdAt: string;
  process?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-100
  category: 'software' | 'skill' | 'language';
}

export interface AboutData {
  bio: string;
  profileImage: string;
  experiences: Experience[];
  skills: Skill[];
}

export interface ResumeData {
  education: Education[];
  experiences: Experience[];
  skills: Skill[];
  certifications: string[];
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  social: {
    artstation?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface Plugin {
  id: string;
  name: string;
  description: string;
  icon: string;
  downloadUrl: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
}
