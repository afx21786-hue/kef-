import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  Rocket,
  Users,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { ApplyFormModal, ConsultationModal } from '@/components/FormModals';
import type { Program } from '@shared/schema';

const gradients = [
  'from-kef-red to-rose-500',
  'from-kef-blue to-cyan-500',
  'from-kef-yellow to-orange-500',
  'from-purple-500 to-pink-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-yellow-500',
  'from-rose-500 to-red-500',
];

export default function Programs() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const { data: programs = [], isLoading } = useQuery<Program[]>({
    queryKey: ['/api/programs'],
  });

  const handleProgramClick = (program: Program) => {
    setSelectedProgram(program);
  };

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

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-kef-blue" />
            </div>
          ) : programs.length === 0 ? (
            <div className="text-center py-20">
              <Rocket className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Programs Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're preparing exciting programs for you. Check back soon or contact us for more information.
              </p>
              <Button 
                className="mt-6 bg-gradient-to-r from-kef-red to-kef-blue text-white border-0"
                onClick={() => setIsConsultationModalOpen(true)}
                data-testid="button-contact-programs"
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {programs.map((program, index) => (
                  <Card
                    key={program.id}
                    className={`group relative overflow-visible border-border hover-elevate cursor-pointer transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    } ${selectedProgram?.id === program.id ? 'ring-2 ring-kef-blue' : ''}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    onClick={() => handleProgramClick(program)}
                    data-testid={`program-card-${program.id}`}
                  >
                    <CardContent className="p-6">
                      <div className={`absolute -top-5 left-6 p-4 rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} border border-border shadow-lg`}>
                        <Rocket className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="pt-8">
                        <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
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

              {selectedProgram && (
                <Card className={`border-border mb-12 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <CardContent className="p-8 md:p-12">
                    <div className="grid lg:grid-cols-2 gap-12">
                      <div>
                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradients[programs.findIndex(p => p.id === selectedProgram.id) % gradients.length]} mb-6`}>
                          <Rocket className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">{selectedProgram.title}</h2>
                        {selectedProgram.category && (
                          <p className="text-lg text-muted-foreground mb-6">{selectedProgram.category}</p>
                        )}
                        <p className="text-foreground leading-relaxed mb-6">
                          {selectedProgram.description}
                        </p>
                        <div className="space-y-3 mb-8">
                          {selectedProgram.eligibility && (
                            <div className="flex items-center gap-3">
                              <Users className="w-5 h-5 text-kef-blue" />
                              <span className="text-muted-foreground">
                                <strong>Eligibility:</strong> {selectedProgram.eligibility}
                              </span>
                            </div>
                          )}
                          {selectedProgram.duration && (
                            <div className="flex items-center gap-3">
                              <Rocket className="w-5 h-5 text-kef-red" />
                              <span className="text-muted-foreground">
                                <strong>Duration:</strong> {selectedProgram.duration}
                              </span>
                            </div>
                          )}
                        </div>
                        <Button 
                          className="bg-gradient-to-r from-kef-red to-kef-blue text-white border-0"
                          onClick={() => setIsApplyModalOpen(true)}
                          data-testid={`button-apply-${selectedProgram.id}`}
                        >
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      <div>
                        {selectedProgram.benefits && selectedProgram.benefits.length > 0 && (
                          <>
                            <h3 className="font-semibold mb-6">What's Included</h3>
                            <div className="grid gap-4">
                              {selectedProgram.benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-3">
                                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-muted-foreground">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
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
