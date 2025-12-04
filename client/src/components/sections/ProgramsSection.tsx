import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Rocket, Loader2 } from 'lucide-react';
import type { Program } from '@shared/schema';

const gradients = [
  'from-kef-red/20 to-rose-500/20',
  'from-kef-blue/20 to-cyan-500/20',
  'from-kef-yellow/20 to-orange-500/20',
  'from-purple-500/20 to-pink-500/20',
  'from-emerald-500/20 to-teal-500/20',
];

export default function ProgramsSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [, setLocation] = useLocation();

  const { data: programs = [], isLoading } = useQuery<Program[]>({
    queryKey: ['/api/programs'],
  });

  if (programs.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
      data-testid="section-programs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-kef-yellow/10 text-kef-yellow text-sm font-medium mb-4">
            Our Programs
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-kef-yellow to-kef-red bg-clip-text text-transparent">
              Programs
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transformative programs designed to ignite entrepreneurial spirits and build successful ventures
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-kef-blue" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {programs.map((program, index) => (
              <Card
                key={program.id}
                className={`group relative overflow-visible border-border hover-elevate transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                data-testid={`program-card-${program.id}`}
              >
                <CardContent className="p-6">
                  <div className={`absolute -top-5 left-6 p-4 rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} border border-border shadow-lg`}>
                    <Rocket className="w-6 h-6 text-kef-blue" />
                  </div>
                  
                  <div className="pt-8">
                    <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {program.description}
                    </p>
                    {program.category && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-kef-blue">{program.category}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className={`text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-kef-yellow to-kef-red text-white border-0"
            onClick={() => setLocation('/programs')}
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
