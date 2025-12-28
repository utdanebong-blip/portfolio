import { Layout } from '@/components/layout';
import { useAboutData } from '@/hooks/usePortfolioData';
import { Briefcase, Award } from 'lucide-react';

export default function About() {
  const { aboutData } = useAboutData();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-12">
          About <span className="text-primary">Me</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Profile */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="aspect-square rounded-lg overflow-hidden border border-border mb-6">
                <img src={aboutData.profileImage} alt="Utibe Ebong" className="w-full h-full object-cover" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Utibe Ebong</h2>
              <p className="text-primary font-mono text-sm">3D Prop Artist</p>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Bio */}
            <section>
              <h3 className="font-display text-xl font-semibold mb-4 text-foreground">Biography</h3>
              <p className="font-body text-muted-foreground whitespace-pre-line leading-relaxed">{aboutData.bio}</p>
            </section>

            {/* Experience */}
            <section>
              <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                <Briefcase size={20} className="text-primary" /> Experience
              </h3>
              <div className="space-y-6">
                {aboutData.experiences.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-primary/30 pl-6 hover:border-primary transition-colors">
                    <h4 className="font-display font-semibold text-foreground">{exp.title}</h4>
                    <p className="text-primary font-mono text-sm">{exp.company}</p>
                    <p className="text-muted-foreground text-sm font-body">{exp.startDate} - {exp.endDate}</p>
                    <ul className="mt-2 space-y-1">
                      {exp.achievements.map((a, i) => (
                        <li key={i} className="text-muted-foreground font-body text-sm flex items-start gap-2">
                          <span className="text-primary mt-1">•</span> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section>
              <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                <Award size={20} className="text-primary" /> Skills
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {aboutData.skills.map((skill) => (
                  <div key={skill.id} className="bg-secondary/30 rounded p-4 border border-border">
                    <div className="flex justify-between mb-2">
                      <span className="font-body text-foreground">{skill.name}</span>
                      <span className="font-mono text-primary text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
