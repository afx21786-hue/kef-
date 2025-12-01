import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { 
  Rocket, 
  Banknote, 
  GraduationCap, 
  Users, 
  HeadphonesIcon, 
  MapPin 
} from 'lucide-react';

const focusAreas = [
  {
    icon: Rocket,
    title: 'Startup Support & Mentoring',
    description: 'End-to-end guidance for startups from ideation to scaling',
    color: 'from-kef-red to-rose-500',
  },
  {
    icon: Banknote,
    title: 'Funding & Investor Connect',
    description: 'Connecting founders with angel investors and VCs',
    color: 'from-kef-blue to-cyan-500',
  },
  {
    icon: GraduationCap,
    title: 'Campus Entrepreneurship',
    description: 'Building startup culture in colleges across Kerala',
    color: 'from-kef-yellow to-orange-500',
  },
  {
    icon: Users,
    title: 'Business Conclaves & Summits',
    description: 'Large-scale networking events for founders and experts',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: HeadphonesIcon,
    title: 'Advisory & Skill Development',
    description: 'Expert consultations in finance, marketing, and operations',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: MapPin,
    title: 'Local Entrepreneur Development',
    description: 'Supporting small businesses across all districts',
    color: 'from-amber-500 to-yellow-500',
  },
];

export default function WhatWeDoSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden"
      data-testid="section-what-we-do"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border border-kef-blue rounded-full" />
        <div className="absolute bottom-20 right-20 w-60 h-60 border border-kef-red rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-20 h-20 border border-kef-yellow rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-kef-red/10 text-kef-red text-sm font-medium mb-4">
            Our Focus Areas
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What We{' '}
            <span className="bg-gradient-to-r from-kef-red to-kef-blue bg-clip-text text-transparent">
              Do
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We empower Kerala's entrepreneurial community through comprehensive programs and initiatives
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {focusAreas.map((area, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl bg-card border border-border hover-elevate cursor-default transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              data-testid={`focus-area-${index}`}
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${area.color} mb-6 group-hover:scale-110 transition-transform`}>
                <area.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{area.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              
              <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r ${area.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
