import { Layout } from '@/components/layout';
import { aboutData, resumeData } from '@/hooks/usePortfolioData';
import { Briefcase, Award, GraduationCap, BadgeCheck, Download, Calendar, Folder, Users } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import { useEffect, useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import React from 'react';

function AnimatedSkillBar({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const inViewRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !inViewRef.current) {
            inViewRef.current = true;
            setTimeout(() => setWidth(level), delay);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [level, delay]);

  return (
    <div ref={ref} className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10">
      <div className="flex justify-between mb-3">
        <span className="font-body text-foreground group-hover:text-primary transition-colors">{name}</span>
        <span className="font-mono text-primary text-sm">{level}%</span>
      </div>
      <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary via-primary/80 to-accent rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }} 
        />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, suffix = '' }: { icon: any; value: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { count, start } = useCountUp(value, 1500, false);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            start();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [start]);

  return (
    <div ref={ref} className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-500">
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <div className="font-display text-4xl font-bold text-foreground mb-1">
          {count}{suffix}
        </div>
        <div className="font-body text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

export default function About() {
  const about = aboutData;
  const resume = resumeData;
   const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);


  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
         <div className={`container mx-auto px-4 text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full font-mono text-sm text-primary">
              Creative Professional
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            About <span className="text-primary text-glow-green">Me</span>
          </h1>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
            Crafting digital worlds with precision and passion
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard icon={Calendar} value={6} label="Years Experience" suffix="+" />
            <StatCard icon={Folder} value={100} label="Projects Completed" suffix="+" />
            <StatCard icon={Users} value={60} label="Happy Clients" suffix="+" />
            <StatCard icon={Award} value={12} label="Awards Won" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Profile Sidebar */}
          <div className={`lg:col-span-1 transition-all duration-1000 delay-300 opacity-100 translate-x-0`}>
            <div className="sticky top-24 space-y-6">
              {/* Profile Image */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-border/50 group-hover:border-primary/50 transition-colors duration-700">
                  <img src={about.profileImage} alt="Utibe Ebong" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              
              {/* Name & Title */}
              <div className="text-center lg:text-left">
                <h2 className="font-display text-3xl font-bold text-foreground mb-2">Utibe Ebong</h2>
                <p className="text-primary font-mono text-sm">3D Prop Artist & Digital Creator</p>
              </div>
              
              {/* Quick Skills */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5">
                <h3 className="font-display text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">Top Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.slice(0, 6).map((skill, index) => (
                    <span 
                      key={skill.id} 
                      className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary font-mono text-xs hover:bg-primary/20 transition-colors cursor-default"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {resume.certifications.length > 0 && (
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5">
                  <h3 className="font-display text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <BadgeCheck size={14} className="text-primary" /> Certifications
                  </h3>
                  <div className="space-y-2">
                    {resume.certifications.map((cert) => (
                      <div key={cert} className="text-sm text-foreground font-body flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-card/50 backdrop-blur-sm border border-border/50 p-1 rounded-xl">
                <TabsTrigger value="about" className="font-display rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">About</TabsTrigger>
                <TabsTrigger value="resume" className="font-display rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Resume</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-8">
                {/* Bio */}
                <section className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
                  <h3 className="font-display text-2xl font-semibold mb-6 text-foreground flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users size={20} className="text-primary" />
                    </span>
                    Biography
                  </h3>
                  <p className="font-body text-muted-foreground whitespace-pre-line leading-relaxed text-lg">{about.bio}</p>
                </section>

                {/* Experience */}
                <section>
                  <h3 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase size={20} className="text-primary" />
                    </span>
                    Experience
                  </h3>
                  <div className="space-y-6">
                    {about.experiences.map((exp, index) => (
                      <div 
                        key={exp.id} 
                        className="relative pl-8 pb-8 border-l-2 border-primary/30 hover:border-primary transition-colors last:pb-0 animate-fade-in"
                        style={{ animationDelay: `${index * 0.15}s` }}
                      >
                        <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary ring-4 ring-background" />
                        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                          <h4 className="font-display text-lg font-semibold text-foreground">{exp.title}</h4>
                          <p className="text-primary font-mono text-sm mt-1">{exp.company}</p>
                          <p className="text-muted-foreground text-sm font-body mt-1 mb-4">{exp.startDate} - {exp.endDate}</p>
                          <ul className="space-y-2">
                            {exp.achievements.map((a, i) => (
                              <li key={i} className="text-muted-foreground font-body text-sm flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" /> {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Skills Grid */}
                <section>
                  <h3 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Award size={20} className="text-primary" />
                    </span>
                    Skills
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {about.skills.map((skill, index) => (
                      <AnimatedSkillBar key={skill.id} name={skill.name} level={skill.level} />
                    ))}
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="resume" className="space-y-8 animate-fade-in">
                {/* Download Resume Button */}
                    <div className="flex justify-end">
                      <a href="/assets/resume.pdf" download className="inline-block">
                        <Button className="group gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-display">
                          <Download size={18} className="group-hover:animate-bounce" />
                          Download Resume
                        </Button>
                      </a>
                    </div>

                {/* Education */}
                <section>
                  <h3 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <GraduationCap size={20} className="text-primary" />
                    </span>
                    Education
                  </h3>
                  <div className="space-y-4">
                      {resumeData.education.map((edu, index) => (
                      <div 
                        key={edu.id} 
                        className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <h4 className="font-display text-lg font-semibold text-foreground">{edu.degree}</h4>
                        <p className="text-primary font-mono text-sm mt-1">{edu.institution}</p>
                        <p className="text-muted-foreground text-sm mt-1">{edu.startDate} - {edu.endDate} | {edu.location}</p>
                        {edu.description && <p className="mt-3 text-muted-foreground font-body">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Work Experience */}
                <section>
                  <h3 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase size={20} className="text-primary" />
                    </span>
                    Work Experience
                  </h3>
                  <div className="space-y-4">
                      {(resumeData.experiences && resumeData.experiences.length ? resumeData.experiences : about.experiences || []).map((exp, index) => (
                      <div 
                        key={exp.id} 
                        className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <h4 className="font-display text-lg font-semibold text-foreground">{exp.title}</h4>
                        <p className="text-primary font-mono text-sm mt-1">{exp.company}</p>
                        <p className="text-muted-foreground text-sm mt-1">{exp.startDate} - {exp.endDate}</p>
                        <ul className="mt-4 space-y-2">
                          {exp.achievements.map((a, i) => (
                            <li key={i} className="text-muted-foreground font-body text-sm flex gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" /> {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Technical Skills */}
                <section>
                  <h3 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Award size={20} className="text-primary" />
                    </span>
                    Technical Skills
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(resumeData.skills && resumeData.skills.length ? resumeData.skills : about.skills || []).map((skill, index) => (
                      <AnimatedSkillBar key={skill.id} name={skill.name} level={skill.level} delay={index * 80} />
                    ))}
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
