import { useEffect, useRef, useState } from 'react';
import { Trophy, Briefcase } from 'lucide-react';

const achievements = [
  {
    id: 1,
    title: 'Hackathon Winner',
    description: 'First place in national IoT hackathon for innovative smart agriculture solution',
    icon: Trophy,
    color: 'from-yellow-500/20 to-yellow-600/10',
    iconColor: 'text-yellow-500',
    borderColor: 'border-yellow-500/30',
  },
  {
    id: 2,
    title: 'Data Analyst Internship',
    description: 'Completed intensive data analysis internship at leading tech company',
    icon: Briefcase,
    color: 'from-primary/20 to-primary/10',
    iconColor: 'text-primary',
    borderColor: 'border-primary/30',
  },
];

const Achievements = () => {
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
      id="achievements"
      ref={sectionRef}
      className="py-24 md:py-32 bg-muted/20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <h2 className={`section-title ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="text-gradient-secondary">Achievements</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className={`relative group ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`card-tech p-8 border ${achievement.borderColor} bg-gradient-to-br ${achievement.color}`}>
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-muted/50 mb-6 ${achievement.iconColor}`}>
                  <achievement.icon size={36} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {achievement.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>

                {/* Decorative corner */}
                <div className={`absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 ${achievement.borderColor} rounded-tr-lg opacity-50`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
