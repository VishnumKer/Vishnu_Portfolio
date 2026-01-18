import { useEffect, useRef, useState } from 'react';
import { Cpu, Wifi, Plane, Wrench } from 'lucide-react';

const highlights = [
  { icon: Cpu, label: 'Embedded Systems', color: 'text-primary' },
  { icon: Wifi, label: 'IoT Solutions', color: 'text-secondary' },
  { icon: Plane, label: 'Drone Technology', color: 'text-primary' },
  { icon: Wrench, label: 'Hardware Integration', color: 'text-secondary' },
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className={`section-title ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          About <span className="text-gradient-primary">Me</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`space-y-6 ${isVisible ? 'animate-slide-right' : 'opacity-0'}`}>
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/30">
              <span className="font-mono text-sm text-primary">Professional Freelancer</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Crafting Tomorrow's Technology,{' '}
              <span className="text-gradient-secondary">Today</span>
            </h3>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I’m <span className="text-foreground font-semibold">Vishnu Sivasamy</span>,
                an Embedded Software Engineer passionate about turning ideas into real-world solutions.
                <span className="text-secondary font-semibold"> From Code to Circuit, I Build It All</span> reflects
                my ability to design, develop, and deploy complete systems from scratch. I focus on creating reliable,
                efficient, and innovative technology that solves practical problems.
              </p>
              <p>
                With hands-on experience in embedded systems, IoT development, and drone technology,
                I work at the intersection of hardware and software. From designing custom PCBs and writing
                firmware to building automation systems and smart devices, I follow an end-to-end development approach.
                My goal is to engineer intelligent, connected solutions that are scalable, high-performing, and future-ready.
              </p>
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Let's Work Together
              </a>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className={`grid grid-cols-2 gap-4 ${isVisible ? 'animate-slide-left' : 'opacity-0'}`}>
            {highlights.map((item, index) => (
              <div
                key={item.label}
                className={`card-tech p-6 text-center stagger-${index + 1}`}
              >
                <div className={`inline-flex p-4 rounded-lg bg-muted/50 mb-4 ${item.color}`}>
                  <item.icon size={32} />
                </div>
                <h4 className="font-semibold text-foreground">{item.label}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
