import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, ExternalLink, Mail, MapPin, Sparkles, Download } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: ExternalLink, href: 'https://artstation.com', label: 'ArtStation' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
  ];

  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="relative bg-gradient-to-b from-background/80 to-card/50 backdrop-blur-sm">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-14 h-14 rounded-lg border border-primary/50 flex items-center justify-center bg-gradient-to-br from-primary/20 to-transparent group-hover:border-primary transition-colors duration-300">
                    <span className="font-display font-bold text-primary text-xl">UE</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground tracking-wide">UTIBE EBONG</h3>
                  <p className="text-xs text-primary font-mono uppercase tracking-widest">3D Prop Artist</p>
                </div>
              </div>
              
              <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-sm">
                Crafting immersive game assets with passion and precision. Transforming concepts into 
                stunning 3D realities that bring virtual worlds to life.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 pt-2">
                <a href="mailto:hello@utibeebong.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
                  <div className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                    <Mail size={14} />
                  </div>
                  <span className="text-sm font-mono">captionstudioz@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center">
                    <MapPin size={14} />
                  </div>
                  <span className="text-sm font-mono">Lagos, Nigeria</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-primary" />
                <h4 className="font-display text-sm text-foreground uppercase tracking-widest">Explore</h4>
              </div>
              <nav className="grid grid-cols-2 gap-x-4 gap-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors font-body text-sm relative group"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* AI Enhancer Promo */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-primary" />
                <h4 className="font-display text-sm text-foreground uppercase tracking-widest">Free Tool</h4>
              </div>
              
              <Link to="/ai-render-enhancer" className="group block">
                <div className="p-4 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-neon-cyan/5 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={`${import.meta.env.BASE_URL}assets/archviz-enhancer-logo.png`} alt="Archviz Enhancer" className="h-10" />
                  </div>
                  <p className="text-sm text-foreground font-medium mb-1">AI Render Enhancer</p>
                  <p className="text-xs text-muted-foreground mb-3">Enhance your archviz renders with AI</p>
                  <div className="flex items-center gap-2 text-primary text-xs font-mono">
                    <Download size={12} />
                    <span>Download Free</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Social & Connect */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-primary" />
                <h4 className="font-display text-sm text-foreground uppercase tracking-widest">Connect</h4>
              </div>
              
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    aria-label={social.label}
                  >
                    <div className="w-12 h-12 rounded-xl border border-border/50 flex items-center justify-center text-muted-foreground bg-card/50 backdrop-blur-sm group-hover:text-primary group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300">
                      <social.icon size={18} />
                    </div>
                    {/* Tooltip */}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-mono bg-card border border-border rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>

              {/* Newsletter hint */}
              <div className="pt-4">
                <div className="p-4 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 to-transparent">
                  <p className="text-xs text-muted-foreground font-mono mb-2">Stay Updated</p>
                  <p className="text-sm text-foreground/80">Follow my journey in 3D art and game development.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-muted-foreground font-mono text-xs tracking-wide">
                © {currentYear} Utibe Ebong. All rights reserved.
              </p>
              
              <div className="flex items-center gap-6 text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Available for projects
                </span>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline">Built with passion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}