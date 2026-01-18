import { Github, Linkedin, Instagram, Youtube, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Mail, href: '#', label: 'Email' },
];

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <a
            href="#hero"
            className="font-mono text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            <span className="text-primary">&lt;</span>
            VS
            <span className="text-primary">/&gt;</span>
          </a>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="social-icon"
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>

          {/* Tagline */}
          <p className="text-muted-foreground font-mono text-sm">
            "<span className="text-secondary">From Code to Circuit, I Build It All</span>"
          </p>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} Vishnu Sivasamy | Embedded Engineer Portfolio
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
