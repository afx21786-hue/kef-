import { useState } from 'react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowRight, 
  Tent, 
  Building2, 
  Coffee, 
  Stethoscope, 
  FlaskConical,
  Rocket,
  Users,
  CheckCircle,
  GraduationCap
} from 'lucide-react';
import { ApplyFormModal, ConsultationModal } from '@/components/FormModals';

const programs = [
  {
    id: 'bootcamp',
    icon: Tent,
    title: 'Startup Boot Camp',
    tagline: 'Transforming Mindsets',
    description: 'Both residential and day camps where participants learn to think like entrepreneurs. The camp includes powerful workshops, business model creation, idea validation, field assignments, pitching sessions, and mentor interactions.',
    whoCanJoin: 'Students, founders, aspirants',
    outcome: 'Mindset → Idea → Action → Pitch',
    features: [
      'Intensive entrepreneurship workshops',
      'Business model canvas training',
      'Idea validation techniques',
      'Real-world field assignments',
      'Pitch preparation and practice',
      'One-on-one mentor sessions',
    ],
    color: 'from-kef-red to-rose-500',
  },
  {
    id: 'conclaves',
    icon: Building2,
    title: 'Business Conclaves',
    tagline: 'Connect. Collaborate. Grow.',
    description: 'Large-scale gatherings where founders, investors, mentors, thought leaders, and students connect and collaborate. These events create lasting partnerships and open doors to new opportunities.',
    whoCanJoin: 'Entrepreneurs, investors, students, mentors',
    outcome: 'Network → Collaborate → Scale',
    features: [
      'Keynote sessions by industry leaders',
      'Panel discussions on trending topics',
      'Startup exhibition and demos',
      'Investor meet and greet',
      'Networking dinners',
      'B2B matchmaking sessions',
    ],
    color: 'from-kef-blue to-cyan-500',
  },
  {
    id: 'founder-circle',
    icon: Coffee,
    title: 'Founder Circle Meets',
    tagline: 'Exclusive Conversations',
    description: 'Exclusive curated networking dinners and tea sessions bringing entrepreneurs and experts together for honest conversations and opportunities. Intimate settings for meaningful connections.',
    whoCanJoin: 'Selected founders, business leaders',
    outcome: 'Connect → Share → Support',
    features: [
      'Curated guest lists',
      'Intimate dinner settings',
      'No-agenda networking',
      'Experience sharing sessions',
      'Peer mentoring opportunities',
      'Investment discussions',
    ],
    color: 'from-kef-yellow to-orange-500',
  },
  {
    id: 'advisory',
    icon: Stethoscope,
    title: 'Startup Advisory Clinics',
    tagline: 'Expert Guidance',
    description: 'One-on-one mentoring and business advisory sessions covering all aspects of running a business. Get expert advice on finance, branding, HR, legal, marketing, and operations.',
    whoCanJoin: 'Startups at any stage',
    outcome: 'Diagnose → Advise → Transform',
    features: [
      'Financial planning & cash flow',
      'Brand identity & positioning',
      'Digital marketing strategy',
      'Legal & compliance guidance',
      'HR & team building',
      'Operations optimization',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'campus-labs',
    icon: FlaskConical,
    title: 'Campus Innovation Labs',
    tagline: 'Nurturing Campus Entrepreneurs',
    description: 'Building entrepreneurship clubs, innovation cells, startup labs, and student incubators in colleges across Kerala. Creating the next generation of founders from within campuses.',
    whoCanJoin: 'Educational institutions, students',
    outcome: 'Learn → Innovate → Launch',
    features: [
      'Entrepreneurship club setup',
      'Innovation cell guidance',
      'Student incubator programs',
      'Faculty development training',
      'Inter-college competitions',
      'Industry mentorship connections',
    ],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'accelerator',
    icon: Rocket,
    title: 'Entrepreneurship Accelerator',
    tagline: '12-Week Intensive Program',
    description: 'A comprehensive 12-week accelerator program designed to take early-stage startups to the next level with structured curriculum, intensive mentorship, and a final demo day.',
    whoCanJoin: 'Early-stage startups with MVP',
    outcome: 'Build → Validate → Scale',
    features: [
      'Structured 12-week curriculum',
      'Weekly mentor sessions',
      'Product development support',
      'Go-to-market strategy',
      'Investor pitch preparation',
      'Demo day with investors',
    ],
    color: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'student-forum',
    icon: GraduationCap,
    title: 'KEF Student Entrepreneurs Forum',
    tagline: 'Student Entrepreneur Network',
    description: 'A dedicated forum for student entrepreneurs to connect, learn, and grow together. Access to resources, mentors, and opportunities specifically designed for campus entrepreneurs.',
    whoCanJoin: 'College students with startup ideas',
    outcome: 'Learn → Connect → Launch',
    features: [
      'Student entrepreneur network',
      'Access to resources & tools',
      'Mentorship programs',
      'Startup challenges & competitions',
      'Campus ambassador program',
      'Internship opportunities',
    ],
    color: 'from-rose-500 to-red-500',
  },
];

export default function Programs() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  return (
    <main className="pt-20" data-testid="page-programs">
      <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-kef-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-kef-red/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`max-w-3xl mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-kef-yellow/10 text-kef-yellow text-sm font-medium mb-6">
              Our Programs
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-kef-yellow via-kef-red to-kef-blue bg-clip-text text-transparent">
                Programs
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We offer a range of programs designed to empower entrepreneurs, students, 
              businesses, and institutions. Each program is crafted to create real impact, 
              practical learning, and meaningful opportunities.
            </p>
          </div>

          <Tabs defaultValue="bootcamp" className="w-full">
            <TabsList className="flex flex-wrap gap-2 h-auto bg-transparent p-0 mb-12">
              {programs.map((program) => (
                <TabsTrigger
                  key={program.id}
                  value={program.id}
                  className="px-4 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <program.icon className="w-4 h-4 mr-2" />
                  {program.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {programs.map((program) => (
              <TabsContent key={program.id} value={program.id} className="mt-0">
                <Card className="border-border">
                  <CardContent className="p-8 md:p-12">
                    <div className="grid lg:grid-cols-2 gap-12">
                      <div>
                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${program.color} mb-6`}>
                          <program.icon className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">{program.title}</h2>
                        <p className="text-lg text-muted-foreground mb-6">{program.tagline}</p>
                        <p className="text-foreground leading-relaxed mb-6">
                          {program.description}
                        </p>
                        <div className="space-y-3 mb-8">
                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-kef-blue" />
                            <span className="text-muted-foreground">
                              <strong>Who can join:</strong> {program.whoCanJoin}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Rocket className="w-5 h-5 text-kef-red" />
                            <span className="text-muted-foreground">
                              <strong>Outcome:</strong> {program.outcome}
                            </span>
                          </div>
                        </div>
                        <Button 
                          className="bg-gradient-to-r from-kef-red to-kef-blue text-white border-0"
                          onClick={() => setIsApplyModalOpen(true)}
                          data-testid={`button-apply-${program.id}`}
                        >
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-6">What's Included</h3>
                        <div className="grid gap-4">
                          {program.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-kef-red/10 via-kef-blue/10 to-kef-yellow/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Not Sure Which Program is{' '}
            <span className="bg-gradient-to-r from-kef-red to-kef-blue bg-clip-text text-transparent">
              Right for You
            </span>
            ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Schedule a free consultation with our team to find the perfect program for your needs
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-kef-yellow to-kef-red text-white border-0"
            onClick={() => setIsConsultationModalOpen(true)}
            data-testid="button-programs-consultation"
          >
            Book a Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <ApplyFormModal open={isApplyModalOpen} onOpenChange={setIsApplyModalOpen} />
      <ConsultationModal open={isConsultationModalOpen} onOpenChange={setIsConsultationModalOpen} />
    </main>
  );
}
