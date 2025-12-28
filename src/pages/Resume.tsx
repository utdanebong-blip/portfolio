import { Layout } from '@/components/layout';
import { useResumeData, useAboutData } from '@/hooks/usePortfolioData';
import { GraduationCap, Briefcase, Award, BadgeCheck } from 'lucide-react';

export default function Resume() {
  const { resumeData } = useResumeData();
  const { aboutData } = useAboutData();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-12 text-center">
          My <span className="text-primary">Resume</span>
        </h1>

        <div className="space-y-12">
          {/* Education */}
          <section>
            <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
              <GraduationCap className="text-primary" /> Education
            </h2>
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display font-semibold text-foreground">{edu.degree}</h3>
                <p className="text-primary font-mono text-sm">{edu.institution}</p>
                <p className="text-muted-foreground text-sm">{edu.startDate} - {edu.endDate} | {edu.location}</p>
                {edu.description && <p className="mt-2 text-muted-foreground font-body">{edu.description}</p>}
              </div>
            ))}
          </section>

          {/* Experience */}
          <section>
            <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
              <Briefcase className="text-primary" /> Experience
            </h2>
            <div className="space-y-4">
              {(aboutData.experiences || []).map((exp) => (
                <div key={exp.id} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-display font-semibold text-foreground">{exp.title}</h3>
                  <p className="text-primary font-mono text-sm">{exp.company}</p>
                  <p className="text-muted-foreground text-sm">{exp.startDate} - {exp.endDate}</p>
                  <ul className="mt-3 space-y-1">
                    {exp.achievements.map((a, i) => (
                      <li key={i} className="text-muted-foreground font-body text-sm flex gap-2">
                        <span className="text-primary">•</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
              <Award className="text-primary" /> Skills
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {(aboutData.skills || []).map((skill) => (
                <div key={skill.id} className="flex items-center justify-between bg-secondary/30 rounded p-3 border border-border">
                  <span className="font-body">{skill.name}</span>
                  <span className="font-mono text-primary text-sm">{skill.level}%</span>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
              <BadgeCheck className="text-primary" /> Certifications
            </h2>
            <div className="flex flex-wrap gap-3">
              {resumeData.certifications.map((cert) => (
                <div key={cert} className="px-4 py-2 bg-primary/10 border border-primary/30 rounded text-primary font-body text-sm">
                  {cert}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
