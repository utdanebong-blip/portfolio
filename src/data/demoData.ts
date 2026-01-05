import { Project, AboutData, ResumeData, ContactInfo, Plugin, BlogPost } from '@/types/portfolio';

// Import canonical demo data from JSON so it can be consumed by both the app and build scripts.
import demo from './demoData.json';

export const demoProjects: Project[] = (demo.projects || []) as Project[];
export const demoAboutData: AboutData = (demo.about as any) as AboutData;
export const demoResumeData: ResumeData = (demo.resume as any) as ResumeData;
export const demoContactInfo: ContactInfo = (demo.contact as any) as ContactInfo;
export const demoPlugins: Plugin[] = (demo.plugins || []) as Plugin[];
export const demoBlogPosts: BlogPost[] = (demo.posts || []) as BlogPost[];
export const demoShowreel = (demo.showreel || []) as Array<{
  id?: string;
  videoUrl?: string;
  title?: string;
  description?: string;
  poster?: string;
}>;

export const demoArchvizProjects: Project[] = (demo.archvizProjects || []) as unknown as Project[];

export const ADMIN_PASSCODE = 'admin123';
