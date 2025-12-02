import { useLocation } from 'wouter';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Landmark, GraduationCap, Rocket, Briefcase, Globe } from 'lucide-react';

const partnerCategories = [
  { icon: Building, name: 'Corporates', count: '25+' },
  { icon: Landmark, name: 'Government Bodies', count: '10+' },
  { icon: GraduationCap, name: 'Educational Institutions', count: '50+' },
  { icon: Rocket, name: 'Incubators', count: '15+' },
  { icon: Briefcase, name: 'Industry Leaders', count: '30+' },
  { icon: Globe, name: 'Global Partners', count: '5+' },
];

export default function PartnersSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [, setLocation] = useLocation();

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden"
      data-testid="section-partners"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-kef-blue/10 text-kef-blue text-sm font-medium mb-4">
            Our Partners
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Partners &{' '}
            <span className="bg-gradient-to-r from-kef-blue to-kef-yellow bg-clip-text text-transparent">
              Collaborators
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We collaborate with institutions, corporates, incubators, accelerators, and industry leaders 
            to build Kerala's entrepreneurial ecosystem
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {partnerCategories.map((category, index) => (
            <div
              key={index}
              className={`group p-8 rounded-2xl bg-card border border-border hover-elevate cursor-default text-center transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              data-testid={`partner-category-${index}`}
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-kef-blue/20 to-kef-yellow/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <category.icon className="w-8 h-8 text-kef-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-kef-red to-kef-blue bg-clip-text text-transparent">
                {category.count}
              </p>
            </div>
          ))}
        </div>

        <div className={`text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-muted-foreground mb-6">
            Interested in partnering with Kerala Economic Forum?
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-kef-blue to-kef-yellow text-white border-0"
            onClick={() => setLocation('/contact')}
            data-testid="button-partner-with-us"
          >
            Partner With Us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
