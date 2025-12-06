import { useState } from 'react';
import { useLocation } from 'wouter';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Rocket, TrendingUp, LayoutDashboard } from 'lucide-react';
import heroImage from '@assets/generated_images/kef_hero_entrepreneurship_background.png';
import AuthModal from '@/components/auth/AuthModal';

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [, setLocation] = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      data-testid="section-hero"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z" fill="currentColor" className="text-kef-blue" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-kef-red via-kef-blue to-kef-yellow bg-clip-text text-transparent">
              Where Kerala's
            </span>
            <br />
            <span className="text-foreground">Entrepreneurs Rise Together</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            A statewide non-profit movement empowering entrepreneurs, startups, students, 
            institutions, and innovators to build, grow, and transform Kerala's economic future.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            {isAuthenticated ? (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-kef-red to-kef-blue text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-kef-red/25 hover:shadow-kef-red/40 transition-all border-0"
                onClick={() => setLocation('/dashboard')}
                data-testid="button-hero-dashboard"
              >
                Go to Dashboard
                <LayoutDashboard className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-kef-red to-kef-blue text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-kef-red/25 hover:shadow-kef-red/40 transition-all border-0"
                onClick={() => setIsAuthModalOpen(true)}
                data-testid="button-hero-join"
              >
                Join the Forum
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
              onClick={() => setLocation('/programs')}
              data-testid="button-hero-programs"
            >
              Explore Our Programs
            </Button>
            <Button 
              size="lg" 
              variant="ghost"
              className="text-lg"
              onClick={() => setLocation('/contact')}
              data-testid="button-hero-partner"
            >
              Partner With Us
            </Button>
          </div>

          <p className="text-sm text-muted-foreground italic">
            Where ideas grow. Where founders rise. Where Kerala transforms.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { icon: Rocket, label: 'Startups Supported', value: '2,000+', color: 'from-kef-red to-rose-600' },
            { icon: Users, label: 'Entrepreneurs Connected', value: '10,000+', color: 'from-kef-blue to-cyan-500' },
            { icon: TrendingUp, label: 'Funding Target', value: '₹100Cr+', color: 'from-kef-yellow to-orange-500' },
          ].map((stat, index) => (
            <div 
              key={index}
              className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover-elevate cursor-default"
              style={{ animationDelay: `${index * 100}ms` }}
              data-testid={`stat-card-${index}`}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>
  );
}
