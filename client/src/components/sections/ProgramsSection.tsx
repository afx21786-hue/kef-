import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Tent, Building2, Coffee, Stethoscope, FlaskConical } from 'lucide-react';

const programs = [
  {
    icon: Tent,
    title: 'Startup Boot Camp',
    description: 'Both residential and day camps where participants learn to think like entrepreneurs. Includes workshops, business model creation, pitching sessions, and mentor interactions.',
    outcome: 'Mindset → Idea → Action → Pitch',
    color: 'kef-red',
    gradient: 'from-kef-red/20 to-rose-500/20',
  },
  {
    icon: Building2,
    title: 'Business Conclaves',
    description: 'Large-scale gatherings where founders, investors, mentors, thought leaders, and students connect, collaborate, and build lasting partnerships.',
    outcome: 'Network → Collaborate → Grow',
    color: 'kef-blue',
    gradient: 'from-kef-blue/20 to-cyan-500/20',
  },
  {
    icon: Coffee,
    title: 'Founder Circle Meets',
    description: 'Exclusive curated networking dinners and tea sessions bringing entrepreneurs and experts for honest conversations and opportunities.',
    outcome: 'Connect → Share → Support',
    color: 'kef-yellow',
    gradient: 'from-kef-yellow/20 to-orange-500/20',
  },
  {
    icon: Stethoscope,
    title: 'Startup Advisory Clinics',
    description: 'One-on-one mentoring and business advisory sessions in finance, branding, HR, legal, marketing, and operations.',
    outcome: 'Diagnose → Advise → Transform',
    color: 'kef-red',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: FlaskConical,
    title: 'Campus Innovation Labs',
    description: 'Building entrepreneurship clubs, innovation cells, startup labs, and student incubators in colleges across Kerala.',
    outcome: 'Learn → Innovate → Launch',
    color: 'kef-blue',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
];

export default function ProgramsSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
      data-testid="section-programs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-kef-yellow/10 text-kef-yellow text-sm font-medium mb-4">
            Signature Programs
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-kef-yellow to-kef-red bg-clip-text text-transparent">
              Signature Programs
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transformative programs designed to ignite entrepreneurial spirits and build successful ventures
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {programs.map((program, index) => (
            <Card
              key={index}
              className={`group relative overflow-visible border-border hover-elevate transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              data-testid={`program-card-${index}`}
            >
              <CardContent className="p-6">
                <div className={`absolute -top-5 left-6 p-4 rounded-xl bg-gradient-to-br ${program.gradient} border border-border shadow-lg`}>
                  <program.icon className={`w-6 h-6 text-${program.color}`} />
                </div>
                
                <div className="pt-8">
                  <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {program.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-kef-blue">{program.outcome}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={`text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-kef-yellow to-kef-red text-white border-0"
            data-testid="button-view-all-programs"
          >
            View All Programs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
