import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Cpu, Wifi, Plane, Activity, CircuitBoard, Terminal } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Smart IoT System',
    description: 'A comprehensive IoT platform for real-time data monitoring and device control with cloud integration.',
    techStack: ['Python', 'MQTT', 'AWS IoT', 'React'],
    icon: Wifi,
    color: 'text-primary',
  },
  {
    id: 2,
    title: 'Embedded Control Platform',
    description: 'Custom embedded controller for industrial automation with real-time processing capabilities.',
    techStack: ['C++', 'FreeRTOS', 'STM32', 'CAN Bus'],
    icon: Cpu,
    color: 'text-secondary',
  },
  {
    id: 3,
    title: 'Drone Automation Module',
    description: 'Autonomous flight controller with GPS navigation and obstacle avoidance systems.',
    techStack: ['C', 'Python', 'ROS', 'OpenCV'],
    icon: Plane,
    color: 'text-primary',
  },
  {
    id: 4,
    title: 'Sensor Monitoring System',
    description: 'Multi-sensor data acquisition system with web-based dashboard for environmental monitoring.',
    techStack: ['Arduino', 'ESP32', 'Node.js', 'InfluxDB'],
    icon: Activity,
    color: 'text-secondary',
  },
  {
    id: 5,
    title: 'PCB Design Project',
    description: 'Custom 4-layer PCB design for power management system with advanced thermal management.',
    techStack: ['KiCad', 'SPICE', 'Eagle', '3D Modeling'],
    icon: CircuitBoard,
    color: 'text-primary',
  },
  {
    id: 6,
    title: 'Python Automation Tool',
    description: 'Automated testing and deployment pipeline for embedded firmware development.',
    techStack: ['Python', 'GitHub Actions', 'Docker', 'Jenkins'],
    icon: Terminal,
    color: 'text-secondary',
  },
];

const ProjectCard = ({ project, index, isVisible }: { project: typeof projects[0]; index: number; isVisible: boolean }) => {
  return (
    <div
      className={`card-tech group ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Project Icon/Image Area */}
      <div className="relative h-48 bg-muted/30 flex items-center justify-center overflow-hidden">
        <div className={`p-6 rounded-full bg-muted/50 ${project.color} transition-transform duration-500 group-hover:scale-110`}>
          <project.icon size={48} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs text-primary">Project 0{project.id}</span>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono bg-muted/50 text-muted-foreground rounded border border-border"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-muted/50 text-foreground rounded-md border border-border hover:border-primary hover:text-primary transition-all duration-300">
            <Github size={16} />
            <span className="text-sm font-medium">GitHub</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-md border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            <ExternalLink size={16} />
            <span className="text-sm font-medium">Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute top-1/4 right-0 w-1/4 h-1/4 bg-secondary/5 rounded-full blur-3xl translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className={`section-title ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          My <span className="text-gradient-primary">Projects</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
