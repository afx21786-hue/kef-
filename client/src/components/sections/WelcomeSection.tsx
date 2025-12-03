import { useLocation } from 'wouter';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Lightbulb, Network, TrendingUp } from 'lucide-react';

export default function WelcomeSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const [, setLocation] = useLocation();

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
      data-testid="section-welcome"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-kef-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-kef-red/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-kef-blue/10 text-kef-blue text-sm font-medium mb-6">
              About KEF
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-kef-red to-kef-blue bg-clip-text text-transparent">
                Kerala Economic Forum
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Kerala Economic Forum (KEF) is a non-profit organisation dedicated to building a strong 
              entrepreneurial ecosystem across Kerala.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We bring together entrepreneurs, students, institutions, experts, investors, and thought 
              leaders to create opportunities, build networks, and support new ideas. Our mission is to 
              help Kerala become a leading hub for startups, innovation, and economic development.
            </p>
            <Button 
              className="bg-gradient-to-r from-kef-red to-kef-blue text-white border-0"
              onClick={() => setLocation('/about')}
              data-testid="button-learn-more"
            >
              Learn More About Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {[
              { icon: Target, title: 'Mission Driven', desc: 'Focused on Kerala\'s economic growth' },
              { icon: Lightbulb, title: 'Innovation First', desc: 'Supporting breakthrough ideas' },
              { icon: Network, title: 'Connected Network', desc: 'Linking entrepreneurs statewide' },
              { icon: TrendingUp, title: 'Growth Focused', desc: 'Scaling startups to success' },
            ].map((item, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-card border border-border hover-elevate cursor-default"
                data-testid={`welcome-card-${index}`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-kef-blue/20 to-kef-yellow/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-kef-blue" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
