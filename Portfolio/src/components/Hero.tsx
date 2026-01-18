import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Cpu, Wifi, Plane, Code2, Terminal, Camera, FileCode2, Zap, Radio, Database, Server, Smartphone, Globe, Bot } from 'lucide-react';
import { PythonIcon, CIcon } from './Icons';
import { useFloatingIcons } from '../hooks/useFloatingIcons';

const titles = [
  'Embedded Software Engineer',
  'IoT Developer',
  'Drone Pilot',
];

// Extended list of icons for density
const iconTypes = [
  { Icon: Code2, color: 'text-primary' },
  { Icon: Plane, color: 'text-secondary' },
  { Icon: Wifi, color: 'text-primary/70' },
  { Icon: PythonIcon, color: 'text-yellow-500' },
  { Icon: CIcon, color: 'text-blue-500' },
  { Icon: Cpu, color: 'text-primary' },
  { Icon: Camera, color: 'text-muted-foreground' },
  { Icon: Zap, color: 'text-secondary' },
  { Icon: Radio, color: 'text-primary' },
  { Icon: Server, color: 'text-muted-foreground' },
  { Icon: Database, color: 'text-secondary/70' },
  { Icon: Smartphone, color: 'text-primary/60' },
  { Icon: Globe, color: 'text-emerald-500' },
  { Icon: Bot, color: 'text-orange-500' },
];

const Hero = () => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Use physics hook with profile exclusion
  const physicsIcons = useFloatingIcons(iconTypes.length, containerRef, profileRef);

  useEffect(() => {
    const title = titles[currentTitle];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < title.length) {
            setDisplayText(title.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentTitle((prev) => (prev + 1) % titles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTitle]);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden pt-20"
      ref={containerRef}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

        {/* Physics-based Floating Space Icons */}
        {physicsIcons.map((state, index) => {
          const { Icon, color } = iconTypes[index % iconTypes.length];
          return (
            <div
              key={state.id}
              className="absolute transition-colors duration-300 hover:text-white cursor-pointer z-0 opacity-40 hover:opacity-100"
              style={{
                transform: `translate(${state.x}px, ${state.y}px)`,
                willChange: 'transform',
              }}
            >
              <Icon className={color} size={32} />
            </div>
          );
        })}

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), 
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 pointer-events-none">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="text-center md:text-left order-2 md:order-1 pointer-events-auto">
            {/* Terminal-style greeting */}
            <div className="inline-block mb-6 px-4 py-2 bg-muted/50 rounded-full border border-border animate-fade-up">
              <span className="font-mono text-sm text-muted-foreground">
                <span className="text-primary">$</span> Welcome to my portfolio
              </span>
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up stagger-1">
              <span className="text-foreground">Vishnu</span>{' '}
              <span className="text-gradient-primary">Sivasamy</span>
            </h1>

            {/* Animated Title */}
            <div className="h-12 md:h-16 mb-8 animate-fade-up stagger-2 flex justify-center md:justify-start">
              <h2 className="text-xl md:text-3xl lg:text-4xl font-mono">
                <span className="text-muted-foreground">&gt; </span>
                <span className="text-foreground">{displayText}</span>
                <span className="text-primary animate-pulse">|</span>
              </h2>
            </div>

            {/* Tagline */}
            <p className="text-xl md:text-2xl font-semibold mb-12 animate-fade-up stagger-3">
              <span className="text-muted-foreground">"</span>
              <span className="text-gradient-secondary">From Code to Circuit, I Build It All</span>
              <span className="text-muted-foreground">"</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-up stagger-4">
              <button onClick={scrollToProjects} className="btn-primary pointer-events-auto">
                View Projects
              </button>
              <button onClick={scrollToContact} className="btn-outline pointer-events-auto">
                Contact Me
              </button>
            </div>

            {/* Location */}
            <p className="mt-12 text-sm text-muted-foreground animate-fade-up stagger-5">
              📍 Tamil Nadu, India
            </p>
          </div>

          {/* Right Column: Profile Image */}
          <div className="order-1 md:order-2 flex justify-center animate-fade-up stagger-2 pointer-events-auto">
            <div className="relative group" ref={profileRef}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-muted/50 shadow-2xl">
                <img
                  src="/profile.png"
                  alt="Vishnu Sivasamy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Decorative Elements around image - Floating freely now, handled by physics engine if added to list, or static decorative */}
              {/* Keeping these static/CSS animated relative to image for framing focus, as user liked them minus box */}
              <div className="absolute -top-4 -right-4 animate-float-slow delay-100">
                <Cpu className="text-primary opacity-60" size={32} />
              </div>
              <div className="absolute -bottom-4 -left-4 animate-float-medium delay-300">
                <Wifi className="text-secondary opacity-60" size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-muted-foreground" size={32} />
      </div>
    </section>
  );
};

export default Hero;
