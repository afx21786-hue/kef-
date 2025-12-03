import { useState } from 'react';
import { useLocation } from 'wouter';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowRight, 
  Palette, 
  Calculator, 
  Megaphone, 
  Scale, 
  Users2, 
  Settings,
  Handshake,
  TrendingUp,
  Calendar,
  GraduationCap,
  FileText,
  Download,
  Rocket,
  ExternalLink
} from 'lucide-react';
import { AdvisorySessionModal } from '@/components/FormModals';

const advisoryServices = [
  {
    icon: Palette,
    title: 'Branding Support',
    description: 'Logo design, brand identity, positioning strategy, and visual guidelines',
    color: 'from-kef-red to-rose-500',
  },
  {
    icon: Calculator,
    title: 'Financial Advisory',
    description: 'Cash flow management, projections, costing, and unit economics analysis',
    color: 'from-kef-blue to-cyan-500',
  },
  {
    icon: Megaphone,
    title: 'Marketing Advisory',
    description: 'Digital marketing, content strategy, and customer outreach planning',
    color: 'from-kef-yellow to-orange-500',
  },
  {
    icon: Scale,
    title: 'Legal & Compliance',
    description: 'Business structure, registrations, contracts, and regulatory guidance',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Users2,
    title: 'HR & Team Building',
    description: 'Hiring strategies, team culture development, and training programs',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Settings,
    title: 'Operational Consulting',
    description: 'Workflow optimization, systems setup, and automation implementation',
    color: 'from-amber-500 to-yellow-500',
  },
];

const fundingSupport = [
  {
    icon: Handshake,
    title: 'Angel Connect',
    description: 'Direct introductions to Kerala\'s active angel investors and HNI networks. We facilitate warm connections based on startup stage and sector alignment.',
  },
  {
    icon: TrendingUp,
    title: 'VC Connect',
    description: 'Partnerships with venture capital firms looking to invest in Kerala-based startups. Regular investor meets and pitch opportunities.',
  },
  {
    icon: Calendar,
    title: 'Pitch Days',
    description: 'Monthly pitch events where selected startups present to a curated panel of investors. Intensive pitch preparation support included.',
  },
  {
    icon: GraduationCap,
    title: 'Funding Readiness',
    description: 'Workshops covering pitch deck creation, financial projections, due diligence preparation, and term sheet negotiations.',
  },
];

const templates = [
  { name: 'Business Plan Template', type: 'DOCX', size: '2.4 MB' },
  { name: 'Pitch Deck Template', type: 'PPTX', size: '5.1 MB' },
  { name: 'Financial Model', type: 'XLSX', size: '1.8 MB' },
  { name: 'SWOT Analysis Template', type: 'DOCX', size: '890 KB' },
  { name: 'Market Validation Toolkit', type: 'ZIP', size: '12.3 MB' },
];

const featuredStartups = [
  { name: 'TechFlow Solutions', sector: 'SaaS', stage: 'Series A', founded: '2022' },
  { name: 'GreenLeaf Organics', sector: 'AgriTech', stage: 'Seed', founded: '2023' },
  { name: 'EduBridge Kerala', sector: 'EdTech', stage: 'Pre-Seed', founded: '2024' },
  { name: 'HealthFirst AI', sector: 'HealthTech', stage: 'Series A', founded: '2021' },
];

export default function StartupSupport() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [, setLocation] = useLocation();
  const [isAdvisoryModalOpen, setIsAdvisoryModalOpen] = useState(false);

  return (
    <main className="pt-20" data-testid="page-startup-support">
      <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-3xl mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-kef-blue/10 text-kef-blue text-sm font-medium mb-6">
              Startup Support
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Startup Support &{' '}
              <span className="bg-gradient-to-r from-kef-blue to-kef-yellow bg-clip-text text-transparent">
                Advisory
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We help startups at every stage—validation, creation, launch, growth, and scaling. 
              Get expert guidance and resources to accelerate your startup journey.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-kef-red/10 text-kef-red text-sm font-medium mb-4">
              Business Advisory
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Expert{' '}
              <span className="bg-gradient-to-r from-kef-red to-kef-blue bg-clip-text text-transparent">
                Advisory Services
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisoryServices.map((service, index) => (
              <Card key={index} className="border-border hover-elevate cursor-default group">
                <CardContent className="p-6">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              className="bg-gradient-to-r from-kef-red to-kef-blue text-white border-0"
              onClick={() => setIsAdvisoryModalOpen(true)}
              data-testid="button-advisory-session"
            >
              Book Advisory Session
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-kef-yellow/10 text-kef-yellow text-sm font-medium mb-4">
              Funding Support
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Investor{' '}
              <span className="bg-gradient-to-r from-kef-yellow to-kef-red bg-clip-text text-transparent">
                Connect
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {fundingSupport.map((item, index) => (
              <Card key={index} className="border-border hover-elevate cursor-default">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-kef-yellow/20 to-kef-red/20">
                      <item.icon className="w-6 h-6 text-kef-yellow" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium mb-4">
                Resources
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tools &{' '}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Templates
                </span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Download our curated collection of business templates and tools to kickstart your startup journey.
              </p>
            </div>

            <div className="space-y-4">
              {templates.map((template, index) => (
                <Card key={index} className="border-border hover-elevate cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-muted">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">{template.name}</h4>
                          <p className="text-sm text-muted-foreground">{template.type} • {template.size}</p>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-500 text-sm font-medium mb-4">
              Startup Showcase
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured{' '}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Startups
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStartups.map((startup, index) => (
              <Card key={index} className="border-border hover-elevate cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Rocket className="w-8 h-8 text-purple-500" />
                  </div>
                  <h3 className="font-semibold mb-1">{startup.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{startup.sector}</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {startup.stage}
                    </span>
                    <span className="text-xs text-muted-foreground">Est. {startup.founded}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline"
              onClick={() => setLocation('/startups')}
              data-testid="button-view-startups"
            >
              View All Startups
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <AdvisorySessionModal open={isAdvisoryModalOpen} onOpenChange={setIsAdvisoryModalOpen} />
    </main>
  );
}
