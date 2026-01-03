import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded border border-primary flex items-center justify-center">
                <span className="font-display font-bold text-primary text-lg">UE</span>
              </div>
              <span className="font-display text-lg text-foreground">UTIBE EBONG</span>
            </div>
            <p className="text-muted-foreground font-body text-sm">
              3D Prop Artist crafting immersive game assets with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm text-primary uppercase tracking-wider">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {['Home', 'About', 'Gallery', 'Blog', 'Contact'].map((link) => (
                <Link
                  key={link}
                  to={link.toLowerCase() === 'home' ? '/' : `/${link.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors font-body text-sm"
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm text-primary uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3">
              <a
                href="https://artstation.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                aria-label="ArtStation"
              >
                <ExternalLink size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-center text-muted-foreground font-mono text-xs">
            © {currentYear} Utibe Ebong. All rights reserved. Built with passion.
          </p>
        </div>
      </div>
    </footer>
  );
}
