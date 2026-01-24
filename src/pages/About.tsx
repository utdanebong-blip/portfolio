import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { useAboutData, useResumeData } from '@/hooks/usePortfolioData';
import { useCountUp } from '@/hooks/useCountUp';
import { Briefcase, Award, GraduationCap, BadgeCheck, Download, Calendar, Folder, Users, Zap, Code, Palette, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';

function AnimatedSkillBar({
  name,
  level,
  delay,
  icon
}: {
  name: string;
  level: number;
  delay: number;
  icon?: React.ReactNode;
}) {
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        setTimeout(() => setWidth(level), delay);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level, delay]);
  
  return (
    <div 
      ref={ref} 
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/30 p-6 transition-all duration-700 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          {icon && <span className="text-primary">{icon}</span>}
          <span className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{name}</span>
        </div>
        <span className="font-mono text-2xl font-bold text-primary">{level}%</span>
      </div>
      
      <div className="relative h-3 bg-secondary/30 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        <div 
          className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-1000 ease-out relative" 
          style={{ width: `${width}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-primary/50" />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  suffix = '',
}: {
  icon: any;
  value: number;
  label: string;
  suffix?: string;
}) {
  const { count } = useCountUp(value, 2500);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group cursor-default" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 rounded-3xl blur-2xl transition-all duration-500 ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`} />
      
      <div className="relative bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl border border-border/40 rounded-3xl p-8 text-center hover:border-primary/50 transition-all duration-500 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative">
          <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center transition-all duration-500 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <div className="font-display text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
            {count}{suffix}
          </div>
          <div className="font-body text-sm text-muted-foreground uppercase tracking-widest">{label}</div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({
  exp,
  index,
  isLast
}: {
  exp: any;
  index: number;
  isLast: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div 
      ref={ref} 
      className={`relative flex gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} 
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background shadow-lg shadow-primary/50 z-10" />
        {!isLast && <div className="w-0.5 flex-1 bg-gradient-to-b from-primary via-primary/30 to-transparent" />}
      </div>
      
      <div className="flex-1 pb-12 group">
        <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/30 rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h4 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">{exp.title}</h4>
              <p className="text-primary font-mono text-sm mt-1">{exp.company}</p>
            </div>
            <span className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full font-mono text-xs text-primary">
              {exp.startDate} - {exp.endDate}
            </span>
          </div>
          
          <ul className="space-y-3">
            {exp.achievements.map((a: string, i: number) => (
              <li key={i} className="text-muted-foreground font-body text-sm flex items-start gap-3">
                <Star size={12} className="text-primary mt-1.5 flex-shrink-0" /> 
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const { aboutData } = useAboutData();
  const { resumeData } = useResumeData();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<'about' | 'resume'>('about');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skillIcons: Record<string, React.ReactNode> = {
    'Blender': <Palette size={18} />,
    'ZBrush': <Zap size={18} />,
    'Substance Painter': <Palette size={18} />,
    'Maya': <Code size={18} />
  };

  return (
    <Layout>
      {/* Cursor Follow Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[150px] transition-all duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[120px] transition-all duration-1500 ease-out"
          style={{
            background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)',
            left: mousePosition.x - 200 + 100,
            top: mousePosition.y - 200 + 100,
          }}
        />
      </div>

      {/* Immersive Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute inset-0 scanlines opacity-10" />
        </div>

        <div className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-5xl mx-auto">
            {/* Profile header - artistic layout */}
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              {/* Profile Image - Artistic frame */}
              <div className="lg:col-span-2 relative group mx-auto lg:mx-0">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 animate-pulse" />
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary/50 rounded-tl-3xl" />
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-accent/50 rounded-br-3xl" />
                  
                  <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden border-2 border-border/50 group-hover:border-primary/50 transition-all duration-700">
                    <img src={aboutData.profileImage} alt="Utibe Ebong" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="lg:col-span-3 text-center lg:text-left">
                <div className="inline-block mb-6">
                  <span className="px-5 py-2.5 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-full font-mono text-sm text-primary flex items-center gap-2">
                    <Zap size={14} className="animate-pulse" />
                    Creative Professional
                  </span>
                </div>
                
                <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="block text-foreground">Utibe</span>
                  <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Ebong</span>
                </h1>
                
                <p className="font-body text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
                  3D Prop Artist & Digital Creator crafting immersive worlds with precision and passion
                </p>

                {/* Quick action buttons */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <a href="/assets/UTIBE%20DANIEL%20EBONG%20CV.pdf" download="UTIBE DANIEL EBONG CV.pdf" className="inline-block">
                      <Button className="group gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-display px-6 py-6 rounded-xl">
                        <Download size={18} className="group-hover:animate-bounce" />
                        Download Resume
                      </Button>
                    </a>
                  <Link to="/contact">
                    <Button variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10 font-display px-6 py-6 rounded-xl">
                      <Users size={18} />
                      Let's Connect
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative -mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={Calendar} value={5} label="Years Experience" suffix="+" />
            <StatCard icon={Folder} value={50} label="Projects Done" suffix="+" />
            <StatCard icon={Users} value={30} label="Happy Clients" suffix="+" />
            <StatCard icon={Award} value={12} label="Awards Won" />
          </div>
        </div>
      </section>

      {/* Try AI Enhancer CTA */}
      <section className="py-12 px-4 relative">
        <div className="container mx-auto">
          <Link to="/ai-render-enhancer">
            <div className="group relative bg-gradient-to-r from-primary/10 via-neon-cyan/10 to-primary/10 border border-primary/30 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">Try AI Render Enhancer</h3>
                    <p className="text-muted-foreground">Free tool to enhance your archviz renders with AI</p>
                  </div>
                </div>
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  Try It Free <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Section Toggle */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="inline-flex bg-card/50 backdrop-blur-xl border border-border/30 rounded-2xl p-2">
              {(['about', 'resume'] as const).map(section => (
                <button 
                  key={section} 
                  onClick={() => setActiveSection(section)} 
                  className={`px-8 py-4 font-display font-semibold rounded-xl transition-all duration-500 capitalize ${activeSection === section ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {section === 'about' ? 'About Me' : 'Resume'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        {activeSection === 'about' ? (
          <div className="space-y-20 animate-fade-in">
            {/* Bio Section */}
            <section className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute -left-8 top-0 w-1 h-full bg-gradient-to-b from-primary via-accent to-transparent rounded-full" />
                <div className="pl-8">
                  <h2 className="font-display text-4xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    My Story
                  </h2>
                  <p className="font-body text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
                    {aboutData.bio}
                  </p>
                </div>
              </div>
            </section>

            {/* Experience Timeline */}
            <section className="max-w-4xl mx-auto">
              <h2 className="font-display text-4xl font-bold mb-12 text-center">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Journey</span>
              </h2>
              <div className="relative">
                {aboutData.experiences.map((exp, index) => (
                  <TimelineItem key={exp.id} exp={exp} index={index} isLast={index === aboutData.experiences.length - 1} />
                ))}
              </div>
            </section>

            {/* Skills Grid */}
            <section>
              <h2 className="font-display text-4xl font-bold mb-12 text-center">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Expertise</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {aboutData.skills.map((skill, index) => (
                  <AnimatedSkillBar key={skill.id} name={skill.name} level={skill.level} delay={index * 100} icon={skillIcons[skill.name]} />
                ))}
              </div>
            </section>

            {/* Certifications */}
            {resumeData.certifications.length > 0 && (
              <section className="max-w-4xl mx-auto">
                <h2 className="font-display text-4xl font-bold mb-12 text-center">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Certifications</span>
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {resumeData.certifications.map((cert, index) => (
                    <div 
                      key={cert} 
                      className="group px-6 py-4 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/30 rounded-2xl hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 flex items-center gap-3" 
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <BadgeCheck className="text-primary" size={24} />
                      <span className="font-body font-medium text-foreground">{cert}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="space-y-20 animate-fade-in max-w-5xl mx-auto">
            {/* Education */}
            <section>
              <div className="flex items-center gap-4 mb-12">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <GraduationCap size={28} className="text-primary" />
                </div>
                <h2 className="font-display text-3xl font-bold">Education</h2>
              </div>
              
              <div className="space-y-6">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="group bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/30 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{edu.degree}</h3>
                        <p className="text-primary font-mono text-sm mt-2">{edu.institution}</p>
                      </div>
                      <span className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full font-mono text-sm text-primary">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      {edu.location}
                    </p>
                    {edu.description && <p className="mt-4 text-muted-foreground font-body leading-relaxed">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* Work Experience */}
            <section>
              <div className="flex items-center gap-4 mb-12">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Briefcase size={28} className="text-primary" />
                </div>
                <h2 className="font-display text-3xl font-bold">Work Experience</h2>
              </div>
              
              <div className="relative">
                {resumeData.experiences.map((exp, index) => (
                  <TimelineItem key={exp.id} exp={exp} index={index} isLast={index === resumeData.experiences.length - 1} />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </Layout>
  );
}
