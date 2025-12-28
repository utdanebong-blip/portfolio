import { useNavigate, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { useAuth, useProjects, useAboutData, useResumeData, useTools } from '@/hooks/usePortfolioData';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { LogOut, FolderOpen, User, FileText, Image as ImageIcon, Grid, Layers } from 'lucide-react';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth();
  const { projects, deleteProject, addProject, updateProject, reorderProjects } = useProjects();
  const { aboutData } = useAboutData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // keep effect for side-effectful navigation if needed
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggingId(id);
    try { e.dataTransfer.setData('text/plain', id); } catch (err) { /* ignore */ }
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (dragOverId !== id) setDragOverId(id);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const fromId = e.dataTransfer.getData('text/plain') || draggingId || '';
    if (fromId && fromId !== targetId) {
      reorderProjects(fromId, targetId);
    }
    setDraggingId(null);
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverId(null);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/admin');
  };

  if (!isAuthenticated) return <Navigate to="/admin" replace />;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold">Admin <span className="text-primary">Dashboard</span></h1>
          <div className="flex items-center gap-2">
            <EditPluginsDialog />
            {/* Controlled Add dialog so we can close it after save */}
            <AddProjectDialog onSaved={() => { /* placeholder */ }} />
            <EditResumeDialog />
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut size={16} /> Logout
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <FolderOpen className="text-primary" />
              <span className="font-display text-lg">Projects</span>
            </div>
            <p className="text-3xl font-bold font-mono text-foreground">{projects.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <User className="text-primary" />
              <span className="font-display text-lg">Experiences</span>
            </div>
            <p className="text-3xl font-bold font-mono text-foreground">{aboutData.experiences.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="text-primary" />
              <span className="font-display text-lg">Skills</span>
            </div>
            <p className="text-3xl font-bold font-mono text-foreground">{aboutData.skills.length}</p>
          </div>
        </div>

        {/* Projects List */}
        <section>
          <h2 className="font-display text-xl font-semibold mb-4">Manage Projects</h2>
          {/* Add / Edit Form */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <p className="text-sm text-muted-foreground">Use the Add Project button to create new projects. You can upload images (rendered, wireframe, UV) and a .glb file; uploads are stored in localStorage as data URLs.</p>
          </div>

          <div className="space-y-3">
            {projects.map((p) => (
              <div
                key={p.id}
                draggable
                onDragStart={(e) => handleDragStart(e, p.id)}
                onDragOver={(e) => handleDragOver(e, p.id)}
                onDrop={(e) => handleDrop(e, p.id)}
                onDragEnd={handleDragEnd}
                className={"flex items-center justify-between rounded-lg p-4 transition-all " + (draggingId === p.id ? 'opacity-60 scale-95' : 'bg-card border border-border') + (dragOverId === p.id ? ' ring-2 ring-primary/40' : '')}
              >
                <div className="flex items-center gap-4">
                  <img src={p.thumbnail} alt={p.title} className="w-16 h-12 object-cover rounded" />
                  <div>
                    <h3 className="font-display font-semibold">{p.title}</h3>
                    <p className="text-muted-foreground text-sm font-mono">{p.specs.polyCount.toLocaleString()} polys</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <EditProjectButton project={p} onUpdate={(id, updates) => { updateProject(id, updates); toast.success('Project updated'); }} />
                  <Button variant="destructive" size="sm" onClick={() => { deleteProject(p.id); toast.success('Project deleted'); }}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-4 font-body">
            Note: Full add/edit forms would be implemented in a complete version.
          </p>
        </section>
      </div>
    </Layout>
  );
}

function EditSkillsDialog() {
  const { aboutData, addSkill, updateSkill, deleteSkill } = useAboutData();
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState<any[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setSkills((aboutData.skills || []).map((s) => ({ ...s })));
      setDeletedIds([]);
    }
  }, [open, aboutData]);

  const addRow = () => setSkills((s) => [...s, { id: undefined, name: '', level: 50, category: 'software' }]);
  const removeRow = (i: number) => {
    const sk = skills[i];
    setSkills((s) => s.filter((_, idx) => idx !== i));
    if (sk?.id) setDeletedIds((d) => Array.from(new Set([...d, sk.id])));
  };

  const handleSave = () => {
    try {
      deletedIds.forEach((id) => deleteSkill(id));
      for (const s of skills) {
        const payload = { name: s.name || 'Skill', level: Number(s.level) || 0, category: s.category || 'software' };
        if (s.id) updateSkill(s.id, payload);
        else addSkill(payload);
      }
      toast.success('Skills updated');
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save skills');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Edit Skills</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl p-0 [&_button.absolute.right-4.top-4]:hidden">
        <div className="relative w-full bg-card dark:bg-surface-dark rounded-xl shadow-2xl border border-border flex flex-col max-h-[80vh]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/5 rounded-t-xl">
            <h2 className="text-lg font-semibold">Edit Skills</h2>
            <DialogClose asChild>
              <button className="text-muted-foreground hover:text-foreground rounded-full p-1">✕</button>
            </DialogClose>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Skills</h3>
              <Button size="sm" onClick={addRow}>Add Skill</Button>
            </div>
            <div className="space-y-3">
              {skills.map((sk, i) => (
                <div key={sk.id ?? `new-skill-${i}`} className="border border-border rounded p-3 flex items-center gap-3">
                  <input value={sk.name} onChange={(e) => setSkills((s) => { const c = [...s]; c[i] = { ...c[i], name: e.target.value }; return c; })} placeholder="Skill name" className="flex-1 block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
                  <input value={sk.level} onChange={(e) => setSkills((s) => { const c = [...s]; c[i] = { ...c[i], level: Number(e.target.value) }; return c; })} placeholder="Level %" type="number" min={0} max={100} className="w-24 rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5 text-center" />
                  <Button variant="destructive" size="sm" onClick={() => removeRow(i)}>Remove</Button>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-4 border-t border-border bg-secondary/5 rounded-b-xl flex flex-col sm:flex-row justify-end gap-3">
            <DialogClose asChild>
              <button className="w-full sm:w-auto px-5 py-2.5 rounded text-sm font-medium text-muted-foreground border border-border hover:bg-secondary">Cancel</button>
            </DialogClose>
            <button onClick={handleSave} type="button" className="w-full sm:w-auto px-5 py-2.5 rounded text-sm font-medium text-white bg-primary hover:bg-primary-hover">Save Skills</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EditCertEduDialog() {
  const { resumeData, addEducation, updateEducation, deleteEducation, addCertification, removeCertification } = useResumeData();
  const [open, setOpen] = useState(false);
  const [educations, setEducations] = useState<any[]>([]);
  const [deletedEduIds, setDeletedEduIds] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setEducations((resumeData.education || []).map((e) => ({ ...e })));
      setCertifications(resumeData.certifications?.slice() || []);
      setDeletedEduIds([]);
    }
  }, [open, resumeData]);

  const addEduRow = () => setEducations((s) => [...s, { id: undefined, degree: '', institution: '', location: '', startDate: '', endDate: '', description: '' }]);
  const removeEduRow = (i: number) => {
    const ed = educations[i];
    setEducations((s) => s.filter((_, idx) => idx !== i));
    if (ed?.id) setDeletedEduIds((d) => Array.from(new Set([...d, ed.id])));
  };

  const addCertRow = () => setCertifications((s) => [...s, '']);
  const removeCertRow = (i: number) => setCertifications((s) => s.filter((_, idx) => idx !== i));

  const handleSave = () => {
    try {
      // process education deletions
      deletedEduIds.forEach((id) => deleteEducation(id));

      for (const e of educations) {
        const payload = { degree: e.degree || '', institution: e.institution || '', location: e.location || '', startDate: e.startDate || '', endDate: e.endDate || '', description: e.description || '' };
        if (e.id) updateEducation(e.id, payload);
        else addEducation(payload);
      }

      // reset certifications: remove all existing and add current list
      (resumeData.certifications || []).forEach((c) => removeCertification(c));
      certifications.forEach((c) => { if (c && c.trim()) addCertification(c.trim()); });

      toast.success('Education & certifications updated');
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save education & certifications');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">CE</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl p-0 [&_button.absolute.right-4.top-4]:hidden">
        <div className="relative w-full bg-card dark:bg-surface-dark rounded-xl shadow-2xl border border-border flex flex-col max-h-[80vh]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/5 rounded-t-xl">
            <h2 className="text-lg font-semibold">Education & Certifications</h2>
            <DialogClose asChild>
              <button className="text-muted-foreground hover:text-foreground rounded-full p-1">✕</button>
            </DialogClose>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Education</h3>
                <Button size="sm" onClick={addEduRow}>Add Education</Button>
              </div>
              <div className="space-y-4">
                {educations.map((ed, i) => (
                  <div key={ed.id ?? `edu-${i}`} className="border border-border rounded p-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <input value={ed.degree} onChange={(e) => setEducations((s) => { const c = [...s]; c[i] = { ...c[i], degree: e.target.value }; return c; })} placeholder="Degree" className="block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
                      <input value={ed.institution} onChange={(e) => setEducations((s) => { const c = [...s]; c[i] = { ...c[i], institution: e.target.value }; return c; })} placeholder="Institution" className="block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <input value={ed.startDate} onChange={(e) => setEducations((s) => { const c = [...s]; c[i] = { ...c[i], startDate: e.target.value }; return c; })} placeholder="Start" className="block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
                      <input value={ed.endDate} onChange={(e) => setEducations((s) => { const c = [...s]; c[i] = { ...c[i], endDate: e.target.value }; return c; })} placeholder="End" className="block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
                    </div>
                    <textarea value={ed.description} onChange={(e) => setEducations((s) => { const c = [...s]; c[i] = { ...c[i], description: e.target.value }; return c; })} placeholder="Description" className="block w-full mt-2 rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
                    <div className="flex justify-end mt-2">
                      <Button variant="destructive" size="sm" onClick={() => removeEduRow(i)}>Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Certifications</h3>
                <Button size="sm" onClick={addCertRow}>Add Certification</Button>
              </div>
              <div className="space-y-2">
                {certifications.map((c, i) => (
                  <div key={`cert-${i}`} className="flex items-center gap-2">
                    <input value={c} onChange={(e) => setCertifications((s) => { const cpy = [...s]; cpy[i] = e.target.value; return cpy; })} placeholder="Certification name" className="flex-1 block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
                    <Button variant="destructive" size="sm" onClick={() => removeCertRow(i)}>Remove</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-border bg-secondary/5 rounded-b-xl flex flex-col sm:flex-row justify-end gap-3">
            <DialogClose asChild>
              <button className="w-full sm:w-auto px-5 py-2.5 rounded text-sm font-medium text-muted-foreground border border-border hover:bg-secondary">Cancel</button>
            </DialogClose>
            <button onClick={handleSave} type="button" className="w-full sm:w-auto px-5 py-2.5 rounded text-sm font-medium text-white bg-primary hover:bg-primary-hover">Save</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EditResumeDialog() {
  const { aboutData, updateBio, updateProfileImage, addExperience, updateExperience, deleteExperience } = useAboutData();
  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [experiences, setExperiences] = useState<any[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  useEffect(() => {
    setBio(aboutData.bio || '');
    setProfileImage(aboutData.profileImage || '');
    setExperiences((aboutData.experiences || []).map((e) => ({
      ...e,
      achievementsText: (e.achievements || []).map((a) => (a.startsWith('•') ? a : `• ${a}`)).join('\n'),
    })));
    setDeletedIds([]);
  }, [aboutData, open]);

  const readFileAsDataUrl = (file: File): Promise<string> => new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result as string);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });

  const handleProfileFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    try {
      const url = await readFileAsDataUrl(f);
      setProfileImage(url);
    } catch (err) {
      console.error(err);
      toast.error('Failed to read image');
    }
  };

  const handleAddExperience = () => {
    setExperiences((s) => [...s, { id: undefined, title: '', company: '', location: '', startDate: '', endDate: '', description: '', achievementsText: '' }]);
  };

  const handleRemoveExperience = (idx: number) => {
    const exp = experiences[idx];
    setExperiences((s) => s.filter((_, i) => i !== idx));
    if (exp?.id) setDeletedIds((d) => Array.from(new Set([...d, exp.id])));
  };

  const handleSave = async () => {
    try {
      if (profileImage !== aboutData.profileImage) updateProfileImage(profileImage);
      if (bio !== aboutData.bio) updateBio(bio);

      // process deletions
      deletedIds.forEach((id) => deleteExperience(id));

      // add or update experiences (parse achievementsText into array)
      for (const e of experiences) {
        const raw = e.achievementsText || '';
        const lines = raw.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0);
        const achievements = lines.map((l: string) => l.replace(/^\s*•\s*/, '').trim());

        const payload = {
          title: e.title || 'Untitled',
          company: e.company || '',
          location: e.location || '',
          startDate: e.startDate || '',
          endDate: e.endDate || '',
          description: e.description || '',
          achievements: achievements,
        };
        if (e.id) {
          updateExperience(e.id, payload);
        } else {
          addExperience(payload);
        }
      }

      // skills are managed in the separate EditSkillsDialog

      toast.success('Profile updated');
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save profile');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">Edit Resume</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl p-0 [&_button.absolute.right-4.top-4]:hidden">
        <div className="relative w-full bg-card dark:bg-surface-dark rounded-xl shadow-2xl border border-border flex flex-col max-h-[90vh]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/5 rounded-t-xl">
            <div>
              <h2 className="text-xl font-bold text-foreground">Edit Resume</h2>
              <p className="text-sm text-muted-foreground">Update profile image, biography, and experiences.</p>
            </div>
            <DialogClose asChild>
              <button className="text-muted-foreground hover:text-foreground rounded-full p-1">✕</button>
            </DialogClose>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 flex flex-col items-center gap-3">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-muted-foreground">
                  {profileImage ? <img src={profileImage} alt="profile" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>}
                </div>
                <label className="mt-2">
                  <span className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-primary-hover shadow-lg ring-2 ring-primary/40">
                    Change Photo
                    <input accept="image/*" type="file" onChange={handleProfileFile} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full" />
                  </span>
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-muted-foreground mb-1">Biography</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3" rows={6} />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Experiences</h3>
                <div className="flex items-center gap-2">
                  <EditCertEduDialog />
                  <EditSkillsDialog />
                  <Button size="sm" onClick={handleAddExperience}>Add Experience</Button>
                </div>
              </div>
              <div className="space-y-4">
                {experiences.map((ex, idx) => (
                  <div key={ex.id ?? `new-${idx}`} className="border border-border rounded p-3">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <input value={ex.title} onChange={(e) => setExperiences((s) => { const c = [...s]; c[idx] = { ...c[idx], title: e.target.value }; return c; })} placeholder="Title" className="block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5 mb-2" />
                        <input value={ex.company} onChange={(e) => setExperiences((s) => { const c = [...s]; c[idx] = { ...c[idx], company: e.target.value }; return c; })} placeholder="Company" className="block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5 mb-2" />
                        <input value={ex.location} onChange={(e) => setExperiences((s) => { const c = [...s]; c[idx] = { ...c[idx], location: e.target.value }; return c; })} placeholder="Location" className="block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5 mb-2" />
                        <div className="grid grid-cols-2 gap-2">
                          <input value={ex.startDate} onChange={(e) => setExperiences((s) => { const c = [...s]; c[idx] = { ...c[idx], startDate: e.target.value }; return c; })} placeholder="Start" className="block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
                          <input value={ex.endDate} onChange={(e) => setExperiences((s) => { const c = [...s]; c[idx] = { ...c[idx], endDate: e.target.value }; return c; })} placeholder="End" className="block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
                        </div>
                        <textarea value={ex.description} onChange={(e) => setExperiences((s) => { const c = [...s]; c[idx] = { ...c[idx], description: e.target.value }; return c; })} placeholder="Description" className="block w-full mt-2 rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
                        <label className="text-sm text-muted-foreground mt-2">Job Description / Achievements (one per line, bullets optional)</label>
                        <textarea value={ex.achievementsText || ''} onChange={(e) => setExperiences((s) => { const c = [...s]; c[idx] = { ...c[idx], achievementsText: e.target.value }; return c; })} placeholder="• Created over 200 game-ready props\n• Established prop art pipeline and style guide" className="block w-full mt-1 rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
                      </div>
                      <div className="flex flex-col gap-2 ml-2">
                        <Button variant="destructive" size="sm" onClick={() => handleRemoveExperience(idx)}>Remove</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          

          <div className="px-6 py-4 border-t border-border bg-secondary/5 rounded-b-xl flex flex-col sm:flex-row justify-end gap-3">
            <DialogClose asChild>
              <button className="w-full sm:w-auto px-5 py-2.5 rounded text-sm font-medium text-muted-foreground border border-border hover:bg-secondary">Cancel</button>
            </DialogClose>
            <button onClick={handleSave} type="button" className="w-full sm:w-auto px-5 py-2.5 rounded text-sm font-medium text-white bg-primary hover:bg-primary-hover">Save Changes</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EditPluginsDialog() {
  const { tools, setTools, addTool, updateTool, deleteTool } = useTools();
  const [open, setOpen] = useState(false);
  const [localTools, setLocalTools] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      setLocalTools((tools || []).map((t) => ({ ...t })));
    }
  }, [open, tools]);

  const addRow = () => setLocalTools((s) => [...s, { id: undefined, name: '', ver: '', desc: '', url: '', actionLabel: 'Visit' }]);
  const removeRow = (i: number) => setLocalTools((s) => s.filter((_, idx) => idx !== i));

  const handleSave = () => {
    try {
      const normalized = localTools.map((t, idx) => ({ ...t, id: t.id ?? `${Date.now()}-${idx}` }));
      setTools(normalized);
      toast.success('Plugins updated');
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save plugins');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Plugins</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl p-0 [&_button.absolute.right-4.top-4]:hidden">
        <div className="relative w-full bg-card dark:bg-surface-dark rounded-xl shadow-2xl border border-border flex flex-col max-h-[80vh]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/5 rounded-t-xl">
            <h2 className="text-lg font-semibold">Edit Tools & Plugins</h2>
            <DialogClose asChild>
              <button className="text-muted-foreground hover:text-foreground rounded-full p-1">✕</button>
            </DialogClose>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Plugins</h3>
              <Button size="sm" onClick={addRow}>Add Plugin</Button>
            </div>
            <div className="space-y-3">
              {localTools.map((t, i) => (
                <div key={t.id ?? `new-tool-${i}`} className="border border-border rounded p-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input value={t.name} onChange={(e) => setLocalTools((s) => { const c = [...s]; c[i] = { ...c[i], name: e.target.value }; return c; })} placeholder="Name" className="block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
                    <input value={t.ver} onChange={(e) => setLocalTools((s) => { const c = [...s]; c[i] = { ...c[i], ver: e.target.value }; return c; })} placeholder="Version" className="block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
                    <input value={t.actionLabel} onChange={(e) => setLocalTools((s) => { const c = [...s]; c[i] = { ...c[i], actionLabel: e.target.value }; return c; })} placeholder="Action label" className="block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
                  </div>
                  <input value={t.url} onChange={(e) => setLocalTools((s) => { const c = [...s]; c[i] = { ...c[i], url: e.target.value }; return c; })} placeholder="URL" className="block w-full mt-2 rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
                  <textarea value={t.desc} onChange={(e) => setLocalTools((s) => { const c = [...s]; c[i] = { ...c[i], desc: e.target.value }; return c; })} placeholder="Description" className="block w-full mt-2 rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
                  <div className="flex justify-end mt-2">
                    <Button variant="destructive" size="sm" onClick={() => removeRow(i)}>Remove</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-4 border-t border-border bg-secondary/5 rounded-b-xl flex flex-col sm:flex-row justify-end gap-3">
            <DialogClose asChild>
              <button className="w-full sm:w-auto px-5 py-2.5 rounded text-sm font-medium text-muted-foreground border border-border hover:bg-secondary">Cancel</button>
            </DialogClose>
            <button onClick={handleSave} type="button" className="w-full sm:w-auto px-5 py-2.5 rounded text-sm font-medium text-white bg-primary hover:bg-primary-hover">Save</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const ProjectForm = forwardRef(function ProjectForm({ onAdd, onUpdate, initialProject, onSaved, formId = 'add-project-form' }: { onAdd: (p: any) => void; onUpdate?: (id: string, updates: any) => void; initialProject?: any; onSaved?: () => void; formId?: string }, ref: React.ForwardedRef<{ submit: () => Promise<void> } | null>) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [rendered, setRendered] = useState('');
  const [wireframe, setWireframe] = useState('');
  const [uvmap, setUvmap] = useState('');
  const [glb, setGlb] = useState('');
  const [polyCount, setPolyCount] = useState<number>(1000);
  const [category, setCategory] = useState('Props');
  const [software, setSoftware] = useState<string[]>([]);

  useEffect(() => {
    if (initialProject) {
      setTitle(initialProject.title || '');
      setDescription(initialProject.description || '');
      setThumbnail(initialProject.thumbnail || '');
      setRendered(initialProject.images?.rendered?.url ?? initialProject.images?.rendered ?? '');
      setWireframe(initialProject.images?.wireframe?.url ?? initialProject.images?.wireframe ?? '');
      setUvmap(initialProject.images?.uv?.url ?? initialProject.images?.uv ?? '');
      setGlb(initialProject.images?.glb?.url ?? initialProject.images?.glb ?? '');
      setPolyCount(initialProject.specs?.polyCount || 1000);
      setCategory(initialProject.category || 'Props');
      setSoftware(initialProject.software || []);
    }
  }, [initialProject]);

  const readFileAsDataUrl = (file: File): Promise<string> => new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result as string);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });

  const generateSlug = (text: string) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  const resizeImage = (file: File, maxDim = 1200, quality = 0.8): Promise<string> => new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      if (width > height) {
        if (width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return rej(new Error('Canvas not supported'));
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      res(dataUrl);
    };
    img.onerror = rej;
    const fr = new FileReader();
    fr.onload = () => { img.src = fr.result as string; };
    fr.onerror = rej;
    fr.readAsDataURL(file);
  });

  const processImageFile = async (file: File, slug: string, kind: 'rendered' | 'wireframe' | 'uv' | 'thumbnail') => {
    const ext = 'jpg';
    const name = `${slug}-${kind}.${ext}`;
    const dataUrl = await resizeImage(file, 1200, 0.8);
    return { name, url: dataUrl };
  };

  const handleAdd = useCallback(async () => {
    console.log('ProjectForm.handleAdd', { title });
    if (!title) {
      toast.error('Please provide a project title');
      return;
    }
    const slug = generateSlug(title || `project-${Date.now()}`);

    // If user provided File data URLs (from uploads) they are plain data URLs in state
    // But if they selected File inputs we already converted them to data URLs earlier.
    // Here ensure naming and structure: store objects {name, url}
    const images: any = {};
    if (rendered && rendered.startsWith('data:')) images.rendered = { name: `${slug}-rendered.jpg`, url: rendered };
    else if (rendered) images.rendered = { name: `${slug}-rendered.jpg`, url: rendered };
    if (wireframe && wireframe.startsWith('data:')) images.wireframe = { name: `${slug}-wireframe.jpg`, url: wireframe };
    else if (wireframe) images.wireframe = { name: `${slug}-wireframe.jpg`, url: wireframe };
    if (uvmap && uvmap.startsWith('data:')) images.uv = { name: `${slug}-uv.jpg`, url: uvmap };
    else if (uvmap) images.uv = { name: `${slug}-uv.jpg`, url: uvmap };
    if (glb && glb.startsWith('data:')) images.glb = { name: `${slug}.glb`, url: glb };
    else if (glb) images.glb = { name: `${slug}.glb`, url: glb };

    // If thumbnail is a file/data URL prefer it, else fallback to rendered
    const thumbObj = thumbnail && thumbnail.startsWith('data:') ? { name: `${slug}-thumb.jpg`, url: thumbnail } : (images.rendered || { name: `${slug}-thumb.jpg`, url: thumbnail || (images.rendered && images.rendered.url) || 'https://via.placeholder.com/400x300' });

    const payload = {
      title,
      description,
      thumbnail: thumbObj.url,
      images,
      specs: { polyCount: polyCount, vertexCount: Math.round(polyCount * 0.7), texelDensity: '512 px/m', materialSlots: 1, textureResolution: '2K', fileSize: '1 MB' },
      software,
      category,
      createdAt: new Date().toISOString().slice(0,10),
      process: '',
    };

    try {
      if (initialProject && onUpdate) {
        onUpdate(initialProject.id, payload);
        toast.success('Project updated');
      } else {
        onAdd(payload);
        toast.success('Project added');
      }
      setTitle(''); setDescription(''); setThumbnail(''); setRendered(''); setWireframe(''); setUvmap(''); setGlb(''); setPolyCount(1000);
      onSaved?.();
    } catch (err) {
      console.error('Failed saving project', err);
      toast.error('Failed to save project');
    }
  }, [title, description, thumbnail, rendered, wireframe, uvmap, glb, polyCount, category, software, initialProject, onUpdate, onAdd, onSaved]);

  // Expose a stable submit method to parent components via ref
  useImperativeHandle(ref, () => ({
    submit: async () => {
      await handleAdd();
    },
  }), [handleAdd]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    try {
      // For image files, resize and convert to jpeg data URL and name it later using slug
      if (f.type.startsWith('image/')) {
        const dataUrl = await resizeImage(f, 1200, 0.8);
        setter(dataUrl);
        return;
      }
      // For .glb or other binary files, read as data URL directly
      const dataUrl = await readFileAsDataUrl(f);
      setter(dataUrl);
    } catch (err) {
      console.error(err);
      toast.error('Failed to read file');
    }
  };

  return (
    <div>
      <form id={formId} className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <label className="block text-sm font-medium text-muted-foreground mb-1" htmlFor="project-name">Project Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                <ImageIcon size={18} />
              </span>
              <input id="project-name" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Cyberpunk Vending Machine" className="pl-10 block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
            </div>
          </div>
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-muted-foreground mb-1" htmlFor="poly-count">Poly Count</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                <Grid size={18} />
              </span>
              <input id="poly-count" value={polyCount} onChange={(e) => setPolyCount(Number(e.target.value))} placeholder="e.g. 8,900" type="number" className="pl-10 block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5" />
            </div>
          </div>
          <div className="md:col-span-12">
            <label className="block text-sm font-medium text-muted-foreground mb-1" htmlFor="description">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2" rows={3} placeholder="Describe the techniques, tools used, and inspiration behind this prop..." />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Software Used</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
            {[
              '3ds Max',
              'Substance Painter',
              'Unreal Engine',
              'Rizom UV',
              'Blender',
              'Maya',
            ].map((opt) => (
              <label key={opt} className="inline-flex items-center gap-2 p-2 rounded border border-border bg-background">
                <Checkbox checked={software.includes(opt)} onCheckedChange={(v) => {
                  const checked = Boolean(v);
                  if (checked) setSoftware((s) => Array.from(new Set([...s, opt])));
                  else setSoftware((s) => s.filter((x) => x !== opt));
                }} />
                <span className="text-sm">{opt}</span>
              </label>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full inline-block" />
            Asset Uploads
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/** Rendered */}
            <label className="group relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer bg-background hover:border-primary">
              <input accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" onChange={(e) => handleFileChange(e, setRendered)} />
              <div className="w-10 h-10 rounded-full bg-muted-foreground/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon size={18} className="text-primary" />
              </div>
              <h4 className="text-sm font-medium text-foreground">Rendered View</h4>
              <p className="text-xs text-muted-foreground mt-1">.JPG, .PNG</p>
              {rendered && <img src={rendered} alt="rendered" className="mt-3 w-24 h-16 object-cover rounded" />}
            </label>

            {/** Wireframe */}
            <label className="group relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer bg-background hover:border-primary">
              <input accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" onChange={(e) => handleFileChange(e, setWireframe)} />
              <div className="w-10 h-10 rounded-full bg-muted-foreground/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Grid size={18} className="text-primary" />
              </div>
              <h4 className="text-sm font-medium text-foreground">Wireframe</h4>
              <p className="text-xs text-muted-foreground mt-1">.JPG, .PNG</p>
              {wireframe && <img src={wireframe} alt="wireframe" className="mt-3 w-24 h-16 object-cover rounded" />}
            </label>

            {/** UV Map */}
            <label className="group relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer bg-background hover:border-primary">
              <input accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" onChange={(e) => handleFileChange(e, setUvmap)} />
              <div className="w-10 h-10 rounded-full bg-muted-foreground/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Layers size={18} className="text-primary" />
              </div>
              <h4 className="text-sm font-medium text-foreground">UV Map</h4>
              <p className="text-xs text-muted-foreground mt-1">.JPG, .PNG</p>
              {uvmap && <img src={uvmap} alt="uv" className="mt-3 w-24 h-16 object-cover rounded" />}
            </label>

            {/** GLB */}
            <label className="group relative border-2 rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer bg-primary/5 hover:bg-primary/10">
              <input accept=".glb,.gltf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" onChange={(e) => handleFileChange(e, setGlb)} />
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Layers size={18} className="text-primary" />
                </div>
              <h4 className="text-sm font-bold text-primary">3D Model File</h4>
              <p className="text-xs text-muted-foreground mt-1">.GLB only</p>
              {glb && <div className="mt-3 text-xs text-muted-foreground font-mono truncate">uploaded.glb</div>}
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <input value={polyCount} onChange={(e) => setPolyCount(Number(e.target.value))} placeholder="Poly Count" type="number" className="input bg-background border-border p-2 rounded" />
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="input bg-background border-border p-2 rounded" />
        </div>
      </form>
    </div>
  );
});

function EditProjectButton({ project, onUpdate }: { project: any; onUpdate: (id: string, updates: any) => void }) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<{ submit: () => Promise<void> } | null>(null);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-6xl p-0 [&_button.absolute.right-4.top-4]:hidden">
        <div className="relative w-full max-w-5xl bg-card dark:bg-surface-dark rounded-xl shadow-2xl border border-border flex flex-col max-h-[90vh]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/5 dark:bg-[#161b22]/50 rounded-t-xl">
            <div>
              <h2 className="text-xl font-bold text-foreground">Edit Project</h2>
              <p className="text-sm text-muted-foreground">Modify details and assets for this 3D prop.</p>
            </div>
            <DialogClose asChild>
              <button className="text-muted-foreground hover:text-foreground rounded-full p-1">✕</button>
            </DialogClose>
          </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <ProjectForm
              ref={formRef}
              initialProject={project}
              formId={`edit-project-form-${project.id}`}
              onAdd={() => {}}
              onUpdate={(id, updates) => { onUpdate(id, updates); }}
              onSaved={() => setOpen(false)}
            />
          </div>

          <div className="px-6 py-4 border-t border-border bg-secondary/5 dark:bg-[#161b22]/50 rounded-b-xl flex flex-col sm:flex-row justify-end gap-3">
            <DialogClose asChild>
              <button className="w-full sm:w-auto px-5 py-2.5 rounded text-sm font-medium text-muted-foreground border border-border hover:bg-secondary">Cancel</button>
            </DialogClose>
            <button onClick={async () => {
              try {
                if (formRef.current?.submit) {
                  await formRef.current.submit();
                } else {
                  const f = document.getElementById(`edit-project-form-${project.id}`) as HTMLFormElement | null;
                  if (f) {
                    if (typeof f.requestSubmit === 'function') f.requestSubmit();
                    else f.submit();
                  }
                }
              } catch (err) {
                console.error('Save failed', err);
                toast.error('Failed to save changes');
              }
            }} type="button" className="w-full sm:w-auto px-5 py-2.5 rounded text-sm font-medium text-white bg-primary hover:bg-primary-hover">Save Changes
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AddProjectDialog({ onSaved }: { onSaved?: () => void }) {
  const { addProject } = useProjects();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">Add Project</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-6xl p-0 [&_button.absolute.right-4.top-4]:hidden">
        <div className="relative w-full max-w-5xl bg-card dark:bg-surface-dark rounded-xl shadow-2xl border border-border flex flex-col max-h-[90vh]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/5 dark:bg-[#161b22]/50 rounded-t-xl">
            <div>
              <h2 className="text-xl font-bold text-foreground">Add New Project</h2>
              <p className="text-sm text-muted-foreground">Enter details and upload assets for your 3D prop.</p>
            </div>
            <DialogClose asChild>
              <button className="text-muted-foreground hover:text-foreground rounded-full p-1">✕</button>
            </DialogClose>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <ProjectForm onAdd={(p) => { addProject(p); toast.success('Project added'); }} onSaved={() => { setOpen(false); onSaved?.(); }} />
          </div>

          <div className="px-6 py-4 border-t border-border bg-secondary/5 dark:bg-[#161b22]/50 rounded-b-xl flex flex-col sm:flex-row justify-end gap-3">
              <DialogClose asChild>
                <button className="w-full sm:w-auto px-5 py-2.5 rounded text-sm font-medium text-muted-foreground border border-border hover:bg-secondary">Cancel</button>
              </DialogClose>
              <button form="add-project-form" type="submit" className="w-full sm:w-auto px-5 py-2.5 rounded text-sm font-medium text-white bg-primary hover:bg-primary-hover">Save Project</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
