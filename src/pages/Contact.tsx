import { Layout } from '@/components/layout';
import { useContactInfo } from '@/hooks/usePortfolioData';
import { Mail, MapPin, ExternalLink, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function Contact() {
  const { contactInfo } = useContactInfo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! (Demo - no actual email sent)');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h1>
        <p className="text-center text-muted-foreground font-body mb-12">
          Interested in working together? Let's chat!
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
              <div className="w-12 h-12 rounded bg-primary/20 flex items-center justify-center">
                <Mail className="text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-body">Email</p>
                <p className="font-mono text-foreground">{contactInfo.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
              <div className="w-12 h-12 rounded bg-primary/20 flex items-center justify-center">
                <MapPin className="text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-body">Location</p>
                <p className="font-mono text-foreground">{contactInfo.location}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              {contactInfo.social.artstation && (
                <a href={contactInfo.social.artstation} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <ExternalLink size={20} />
                </a>
              )}
              {contactInfo.social.linkedin && (
                <a href={contactInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <Linkedin size={20} />
                </a>
              )}
              {contactInfo.social.twitter && (
                <a href={contactInfo.social.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <Twitter size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Your Name" required className="bg-card" />
            <Input type="email" placeholder="Your Email" required className="bg-card" />
            <Input placeholder="Subject" required className="bg-card" />
            <Textarea placeholder="Your Message" rows={5} required className="bg-card" />
            <Button type="submit" className="w-full font-display">Send Message</Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
