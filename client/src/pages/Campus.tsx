import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  GraduationCap, 
  Users, 
  Trophy, 
  Lightbulb, 
  Building, 
  Award,
  BookOpen,
  Mic,
  Rocket,
  Star,
  CheckCircle
} from 'lucide-react';

const workshops = [
  { title: 'Business Model Canvas', duration: '4 hours', level: 'Beginner' },
  { title: 'Branding for Success', duration: '3 hours', level: 'Intermediate' },
  { title: 'Marketing on Zero Budget', duration: '4 hours', level: 'All levels' },
  { title: 'Pitching Skills', duration: '3 hours', level: 'Intermediate' },
  { title: 'Startup Mindset', duration: '2 hours', level: 'Beginner' },
  { title: 'Leadership for Young Entrepreneurs', duration: '4 hours', level: 'Advanced' },
];

const ambassadorBenefits = [
  'Official KEF Ambassador certificate',
  'Priority access to all KEF events',
  'Direct mentorship from industry experts',
  'Networking with founders and investors',
  'Internship opportunities at partner startups',
  'Letter of recommendation for top performers',
];

export default function Campus() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <main className="pt-20" data-testid="page-campus">
      <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-3xl mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium mb-6">
              Campus Initiatives
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Campus{' '}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Entrepreneurship
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We believe the next generation of Kerala's entrepreneurs is sitting in classrooms today. 
              KEF supports colleges and institutions to build entrepreneurship culture inside campuses.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-kef-blue/10 text-kef-blue text-sm font-medium mb-4">
              Management Fest Support
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              College{' '}
              <span className="bg-gradient-to-r from-kef-blue to-kef-red bg-clip-text text-transparent">
                Event Support
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Trophy, title: 'Competition Judging', desc: 'Expert judges for startup and business competitions' },
              { icon: Lightbulb, title: 'Event Planning', desc: 'Guidance on structuring entrepreneurship events and games' },
              { icon: Mic, title: 'Expert Lectures', desc: 'Industry leaders sharing real-world experiences' },
              { icon: BookOpen, title: 'Workshop Modules', desc: 'Ready-to-deploy workshop content and trainers' },
              { icon: Users, title: 'Sponsorship Connect', desc: 'Help connect with potential event sponsors' },
              { icon: Building, title: 'Industry Partnerships', desc: 'Facilitate industry-academia collaborations' },
            ].map((item, index) => (
              <Card key={index} className="border-border hover-elevate cursor-default group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-kef-blue/20 to-kef-red/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-kef-blue" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-kef-blue to-kef-red text-white border-0">
              Invite KEF to Your Campus
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-kef-yellow/10 text-kef-yellow text-sm font-medium mb-4">
              Workshops
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Entrepreneurship{' '}
              <span className="bg-gradient-to-r from-kef-yellow to-kef-red bg-clip-text text-transparent">
                Workshops
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((workshop, index) => (
              <Card key={index} className="border-border hover-elevate cursor-default">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <GraduationCap className="w-8 h-8 text-kef-yellow" />
                    <Badge variant="secondary" className="text-xs">
                      {workshop.level}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{workshop.title}</h3>
                  <p className="text-sm text-muted-foreground">Duration: {workshop.duration}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-500 text-sm font-medium mb-4">
                Campus Startup Challenges
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Compete.{' '}
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Innovate.
                </span>{' '}
                Win.
              </h2>
              <p className="text-muted-foreground mb-8">
                Participate in inter-college startup competitions designed to identify, 
                nurture, and celebrate young entrepreneurial talent across Kerala.
              </p>
              <div className="space-y-4">
                {[
                  'Idea pitching competitions',
                  'Business plan contests',
                  'Hackathons and innovation challenges',
                  'Social entrepreneurship awards',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-kef-yellow" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="border-border">
              <CardContent className="p-8 text-center">
                <Rocket className="w-16 h-16 mx-auto text-purple-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Campus Incubation Support</h3>
                <p className="text-muted-foreground mb-6">
                  We help institutions set up startup labs, innovation cells, 
                  mini incubators, and entrepreneurship clubs.
                </p>
                <Button variant="outline">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-kef-red/10 text-kef-red text-sm font-medium mb-4">
                Ambassador Program
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                KEF{' '}
                <span className="bg-gradient-to-r from-kef-red to-kef-blue bg-clip-text text-transparent">
                  Ambassador
                </span>{' '}
                Program
              </h2>
              <p className="text-muted-foreground mb-8">
                Become a KEF Campus Ambassador and lead the entrepreneurship movement 
                in your college. Build your network, develop leadership skills, and 
                get exclusive opportunities.
              </p>
              <div className="space-y-3 mb-8">
                {ambassadorBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button className="bg-gradient-to-r from-kef-red to-kef-blue text-white border-0">
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Star, value: '200+', label: 'Ambassadors' },
                { icon: Building, value: '100+', label: 'Colleges' },
                { icon: Users, value: '50K+', label: 'Students Reached' },
                { icon: Award, value: '14', label: 'Districts' },
              ].map((stat, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="w-8 h-8 mx-auto text-kef-blue mb-3" />
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
