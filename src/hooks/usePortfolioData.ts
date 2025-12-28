import { useLocalStorage } from './useLocalStorage';
import { Project, AboutData, ResumeData, ContactInfo } from '@/types/portfolio';
import { demoProjects, demoAboutData, demoResumeData, demoContactInfo, ADMIN_PASSCODE, demoTools } from '@/data/demoData';

export function useProjects() {
  const [projects, setProjects] = useLocalStorage<Project[]>('portfolio_projects', demoProjects);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const getProject = (id: string) => projects.find((p) => p.id === id);
  const reorderProjects = (idFrom: string, idTo: string) => {
    setProjects((prev) => {
      const fromIndex = prev.findIndex((p) => p.id === idFrom);
      const toIndex = prev.findIndex((p) => p.id === idTo);
      if (fromIndex === -1) return prev;
      // If dropping after last item (idTo not found), move to end
      if (toIndex === -1) {
        const copy = [...prev];
        const [item] = copy.splice(fromIndex, 1);
        copy.push(item);
        return copy;
      }
      const copy = [...prev];
      const [item] = copy.splice(fromIndex, 1);
      // adjust toIndex if removal occurred before target
      const insertIndex = fromIndex < toIndex ? toIndex : toIndex;
      copy.splice(insertIndex, 0, item);
      return copy;
    });
  };

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    getProject,
    reorderProjects,
  };
}

export function useAboutData() {
  const [aboutData, setAboutData] = useLocalStorage<AboutData>('portfolio_about', demoAboutData);

  const updateBio = (bio: string) => {
    setAboutData((prev) => ({ ...prev, bio }));
  };

  const updateProfileImage = (profileImage: string) => {
    setAboutData((prev) => ({ ...prev, profileImage }));
  };

  const addExperience = (experience: Omit<AboutData['experiences'][0], 'id'>) => {
    const newExperience = { ...experience, id: Date.now().toString() };
    setAboutData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }));
    return newExperience;
  };

  const updateExperience = (id: string, updates: Partial<AboutData['experiences'][0]>) => {
    setAboutData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) =>
        e.id === id ? { ...e, ...updates } : e
      ),
    }));
  };

  const deleteExperience = (id: string) => {
    setAboutData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
  };

  const addSkill = (skill: Omit<AboutData['skills'][0], 'id'>) => {
    const newSkill = { ...skill, id: Date.now().toString() };
    setAboutData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
    return newSkill;
  };

  const updateSkill = (id: string, updates: Partial<AboutData['skills'][0]>) => {
    setAboutData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
  };

  const deleteSkill = (id: string) => {
    setAboutData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  return {
    aboutData,
    updateBio,
    updateProfileImage,
    addExperience,
    updateExperience,
    deleteExperience,
    addSkill,
    updateSkill,
    deleteSkill,
  };
}

export function useResumeData() {
  const [resumeData, setResumeData] = useLocalStorage<ResumeData>('portfolio_resume', demoResumeData);

  const addEducation = (education: Omit<ResumeData['education'][0], 'id'>) => {
    const newEducation = { ...education, id: Date.now().toString() };
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
    return newEducation;
  };

  const updateEducation = (id: string, updates: Partial<ResumeData['education'][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }));
  };

  const deleteEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const addCertification = (cert: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, cert],
    }));
  };

  const removeCertification = (cert: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c !== cert),
    }));
  };

  return {
    resumeData,
    addEducation,
    updateEducation,
    deleteEducation,
    addCertification,
    removeCertification,
  };
}

export function useTools() {
  const [tools, setTools] = useLocalStorage<any[]>('portfolio_tools', demoTools);

  const addTool = (tool: Omit<any, 'id'>) => {
    const newTool = { ...tool, id: Date.now().toString() };
    setTools((prev) => [...prev, newTool]);
    return newTool;
  };

  const updateTool = (id: string, updates: Partial<any>) => {
    setTools((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTool = (id: string) => {
    setTools((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    tools,
    addTool,
    updateTool,
    deleteTool,
    setTools,
  };
}

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useLocalStorage<ContactInfo>('portfolio_contact', demoContactInfo);

  const updateContactInfo = (updates: Partial<ContactInfo>) => {
    setContactInfo((prev) => ({ ...prev, ...updates }));
  };

  return {
    contactInfo,
    updateContactInfo,
  };
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>('portfolio_auth', false);

  const login = (passcode: string): boolean => {
    // In production, verify against a secure backend
    const isValid = passcode === ADMIN_PASSCODE;
    if (isValid) {
      setIsAuthenticated(true);
    }
    return isValid;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
}
