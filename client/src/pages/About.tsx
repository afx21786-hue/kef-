import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  ArrowRight, 
  Target, 
  Eye, 
  Rocket, 
  Users, 
  GraduationCap, 
  TrendingUp,
  Lightbulb,
  Handshake,
  Globe,
  Award,
  Heart
} from 'lucide-react';
import teamImage from '@assets/generated_images/startup_team_collaboration_scene.png';

const missionPoints = [
  'To empower startups at every stage—from idea to scale',
  'To build Kerala\'s largest interconnected entrepreneur community',
  'To strengthen student entrepreneurship and campus innovation',
  'To conduct transformative business events and conclaves',
  'To offer continuous business advisory and expert mentorship',
  'To connect entrepreneurs with angel investors and venture capital',
  'To support local and rural businesses with branding and market access',
  'To promote collaboration, partnerships, and growth opportunities',
  'To provide economic insights and policy recommendations',
];

const objectives = [
  { icon: Rocket, title: 'Startup Ecosystem', desc: 'Build a comprehensive support system for startups at every stage' },
  { icon: Users, title: 'Community Building', desc: 'Create Kerala\'s largest network of entrepreneurs and founders' },
  { icon: GraduationCap, title: 'Campus Innovation', desc: 'Foster entrepreneurship culture in educational institutions' },
  { icon: TrendingUp, title: 'Economic Growth', desc: 'Drive Kerala\'s economic development through innovation' },
  { icon: Lightbulb, title: 'Mentorship', desc: 'Provide expert guidance in all aspects of business building' },
  { icon: Handshake, title: 'Investor Connect', desc: 'Bridge the gap between startups and funding sources' },
  { icon: Globe, title: 'Market Access', desc: 'Help local businesses reach wider markets' },
  { icon: Award, title: 'Recognition', desc: 'Celebrate and promote successful Kerala entrepreneurs' },
];

const team = [
  { name: 'Dr. Arun Menon', role: 'Founder & Chairman', initials: 'AM', color: 'from-kef-red to-rose-500' },
  { name: 'Lakshmi Nair', role: 'Executive Director', initials: 'LN', color: 'from-kef-blue to-cyan-500' },
  { name: 'Suresh Kumar', role: 'Head of Programs', initials: 'SK', color: 'from-kef-yellow to-orange-500' },
  { name: 'Deepa Thomas', role: 'Campus Relations', initials: 'DT', color: 'from-purple-500 to-pink-500' },
  { name: 'Rajesh Pillai', role: 'Investor Relations', initials: 'RP', color: 'from-emerald-500 to-teal-500' },
  { name: 'Meera Krishnan', role: 'Events & Operations', initials: 'MK', color: 'from-amber-500 to-yellow-500' },
];

export default function About() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.1);
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation(0.1);
  const { ref: objectivesRef, isVisible: objectivesVisible } = useScrollAnimation(0.1);
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation(0.1);

  return (
    <main className="pt-20" data-testid="page-about">
      <section 
        ref={heroRef}
        className="py-24 lg:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img 
            src={teamImage} 
            alt="Team collaboration" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`max-w-3xl transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-kef-red/10 text-kef-red text-sm font-medium mb-6">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About{' '}
              <span className="bg-gradient-to-r from-kef-red via-kef-blue to-kef-yellow bg-clip-text text-transparent">
                Kerala Economic Forum
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Kerala Economic Forum (KEF) is a non-profit movement formed with a single mission: 
              to uplift Kerala's entrepreneurial landscape by building a powerful, interconnected 
              ecosystem where entrepreneurs, students, professionals, institutions, and investors 
              can grow together.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We exist to help Kerala move forward—economically, socially, and technologically—through 
              innovation, entrepreneurship, collaboration, and opportunities for all.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-border overflow-hidden">
              <CardContent className="p-8">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-kef-blue/20 to-cyan-500/20 mb-6">
                  <Eye className="w-8 h-8 text-kef-blue" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To position Kerala as a globally recognised entrepreneurial state where every 
                  aspiring founder receives the support, network, and resources needed to build 
                  and scale meaningful businesses.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border overflow-hidden">
              <CardContent className="p-8">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-kef-red/20 to-rose-500/20 mb-6">
                  <Target className="w-8 h-8 text-kef-red" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <ul className="space-y-3">
                  {missionPoints.slice(0, 5).map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <Heart className="w-4 h-4 text-kef-red mt-1 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section ref={objectivesRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${objectivesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-kef-yellow/10 text-kef-yellow text-sm font-medium mb-4">
              Core Objectives
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Our Core{' '}
              <span className="bg-gradient-to-r from-kef-yellow to-kef-red bg-clip-text text-transparent">
                Objectives
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map((obj, index) => (
              <div
                key={index}
                className={`group p-6 rounded-2xl bg-card border border-border hover-elevate cursor-default transition-all duration-500 ${
                  objectivesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-kef-blue/20 to-kef-yellow/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <obj.icon className="w-6 h-6 text-kef-blue" />
                </div>
                <h3 className="font-semibold mb-2">{obj.title}</h3>
                <p className="text-sm text-muted-foreground">{obj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-kef-blue/10 text-kef-blue text-sm font-medium mb-4">
              The Need
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Kerala Needs{' '}
              <span className="bg-gradient-to-r from-kef-blue to-kef-red bg-clip-text text-transparent">
                KEF
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Untapped Youth Talent', desc: 'Kerala has exceptional youth talent waiting to be channeled into entrepreneurship' },
              { title: 'Fragmented Ecosystem', desc: 'Lack of a unified platform connecting all stakeholders in the startup ecosystem' },
              { title: 'Investor Access Gap', desc: 'Difficulty for startups to connect with angel investors and venture capital' },
              { title: 'Campus to Startup Gap', desc: 'Campus ideas not converting to startups due to lack of support and guidance' },
              { title: 'Mentorship Scarcity', desc: 'Need for experienced mentors and networks to guide new entrepreneurs' },
              { title: 'Economic Potential', desc: 'Enormous potential for economic upliftment through entrepreneurship' },
            ].map((item, index) => (
              <Card key={index} className="border-border hover-elevate cursor-default">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section ref={teamRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-500 text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Leadership{' '}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Team
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className={`group text-center transition-all duration-500 ${
                  teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Avatar className="w-24 h-24 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <AvatarFallback className={`bg-gradient-to-br ${member.color} text-white text-2xl font-medium`}>
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-kef-red/10 via-kef-blue/10 to-kef-yellow/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join the{' '}
            <span className="bg-gradient-to-r from-kef-red to-kef-blue bg-clip-text text-transparent">
              Movement
            </span>
            ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Become part of Kerala's largest entrepreneurial community
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-kef-red to-kef-blue text-white border-0"
            >
              Join the Forum
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Partner With Us
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
