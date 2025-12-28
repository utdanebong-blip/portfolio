export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: {
    rendered: string;
    wireframe: string;
    uv: string;
  };
  modelUrl?: string;
  specs: {
    polyCount: number;
    vertexCount: number;
    texelDensity: string;
    materialSlots: number;
    textureResolution: string;
    fileSize: string;
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
