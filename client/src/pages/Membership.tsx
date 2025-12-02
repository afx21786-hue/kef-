import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  GraduationCap, 
  Lightbulb, 
  Building2, 
  TrendingUp, 
  Building,
  Calendar,
  UserCheck,
  Wallet,
  Network,
  BookOpen,
  School,
  Award,
  Check,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { insertRegisterFormSchema, type InsertRegisterForm } from '@shared/schema';

const membershipTypes = [
  'entrepreneur',
  'student',
  'campus_innovator',
  'business',
  'investor',
  'institutional'
] as const;

const benefits = [
  { icon: Calendar, title: 'Access to all events', description: 'Exclusive invitations to conferences, workshops, and networking sessions' },
  { icon: UserCheck, title: 'Mentorship & advisory', description: 'Connect with experienced entrepreneurs and industry experts' },
  { icon: Wallet, title: 'Funding support', description: 'Access to investor networks and funding opportunities' },
  { icon: Network, title: 'Networking circles', description: 'Join curated groups of like-minded professionals' },
  { icon: BookOpen, title: 'Startup resources', description: 'Tools, templates, and guides to accelerate your venture' },
  { icon: School, title: 'Campus opportunities', description: 'Special programs for students and educational institutions' },
  { icon: Award, title: 'Recognition badges', description: 'Earn badges and certifications for your achievements' },
];

const membershipTypeCards = [
  {
    id: 'entrepreneur' as const,
    icon: Users,
    title: 'Entrepreneur Membership',
    description: 'For founders, business owners, and aspiring entrepreneurs looking to grow their ventures.',
    features: [
      'Priority access to investor meetups',
      'Business development workshops',
      'One-on-one mentorship sessions',
      'Pitch competition opportunities',
      'Co-founder matching platform'
    ],
    gradient: 'from-kef-red to-orange-500',
    popular: false
  },
  {
    id: 'student' as const,
    icon: GraduationCap,
    title: 'Student Membership',
    description: 'Designed for students eager to explore entrepreneurship and build skills for the future.',
    features: [
      'Free access to student events',
      'Internship opportunities',
      'Startup bootcamps',
      'Academic project support',
      'Career guidance sessions'
    ],
    gradient: 'from-kef-blue to-cyan-500',
    popular: true
  },
  {
    id: 'campus_innovator' as const,
    icon: Lightbulb,
    title: 'Campus Innovator Membership',
    description: 'For student innovators leading campus initiatives and entrepreneurship clubs.',
    features: [
      'Campus ambassador program',
      'Event hosting support',
      'Innovation lab access',
      'Leadership training',
      'Inter-college networking'
    ],
    gradient: 'from-purple-500 to-pink-500',
    popular: false
  },
  {
    id: 'business' as const,
    icon: Building2,
    title: 'Business Membership',
    description: 'For established businesses seeking growth opportunities and strategic partnerships.',
    features: [
      'B2B networking events',
      'Corporate workshops',
      'Talent acquisition support',
      'Market expansion guidance',
      'Strategic partnership facilitation'
    ],
    gradient: 'from-emerald-500 to-teal-500',
    popular: false
  },
  {
    id: 'investor' as const,
    icon: TrendingUp,
    title: 'Investor Membership',
    description: 'For angel investors, VCs, and HNIs looking to discover promising startups.',
    features: [
      'Curated deal flow access',
      'Exclusive investor roundtables',
      'Due diligence support',
      'Co-investment opportunities',
      'Portfolio company support'
    ],
    gradient: 'from-kef-yellow to-amber-500',
    popular: false
  },
  {
    id: 'institutional' as const,
    icon: Building,
    title: 'Institutional Membership',
    description: 'For educational institutions, incubators, and accelerators partnering with KEF.',
    features: [
      'Institutional partnership benefits',
      'Joint program development',
      'Student placement support',
      'Research collaboration',
      'Brand visibility opportunities'
    ],
    gradient: 'from-indigo-500 to-violet-500',
    popular: false
  },
];

const membershipTypeLabels: Record<typeof membershipTypes[number], string> = {
  entrepreneur: 'Entrepreneur Membership',
  student: 'Student Membership',
  campus_innovator: 'Campus Innovator Membership',
  business: 'Business Membership',
  investor: 'Investor Membership',
  institutional: 'Institutional Membership',
};

export default function Membership() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<typeof membershipTypes[number] | null>(null);
  const { toast } = useToast();

  const form = useForm<InsertRegisterForm>({
    resolver: zodResolver(insertRegisterFormSchema),
    defaultValues: {
      membershipType: 'entrepreneur',
      fullName: '',
      email: '',
      phone: '',
      organization: '',
      designation: '',
      linkedIn: '',
      reason: '',
    },
  });

  const applyMutation = useMutation({
    mutationFn: async (data: InsertRegisterForm) => {
      const response = await apiRequest('POST', '/api/forms/register', data);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Thank you for applying! We'll review your application and get back to you soon.",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleApplyClick = (typeId: typeof membershipTypes[number]) => {
    setSelectedType(typeId);
    form.setValue('membershipType', typeId);
    setIsDialogOpen(true);
  };

  const onSubmit = (data: InsertRegisterForm) => {
    applyMutation.mutate(data);
  };

  return (
    <main className="min-h-screen pt-20" data-testid="page-membership">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-kef-red/5 via-kef-blue/5 to-kef-yellow/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-kef-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-kef-blue/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Become a Member of{' '}
              <span className="bg-gradient-to-r from-kef-red via-kef-blue to-kef-yellow bg-clip-text text-transparent">
                Kerala Economic Forum
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join the movement and become part of Kerala's most vibrant entrepreneurial network.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Membership Benefits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unlock exclusive opportunities and resources to accelerate your entrepreneurial journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-border/50 bg-background/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-kef-red/20 to-kef-blue/20 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Membership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the membership type that best fits your profile and goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {membershipTypeCards.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {type.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-kef-red to-kef-blue text-white text-xs font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <Card className={`h-full hover:shadow-xl transition-all duration-300 ${type.popular ? 'ring-2 ring-kef-blue' : 'border-border/50'} bg-background/80 backdrop-blur-sm`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${type.gradient} flex items-center justify-center mx-auto mb-4`}>
                      <type.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                    <CardDescription className="text-sm">{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {type.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full bg-gradient-to-r ${type.gradient} text-white border-0 hover:opacity-90`}
                      onClick={() => handleApplyClick(type.id)}
                      data-testid={`button-apply-${type.id}`}
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-kef-red/10 via-kef-blue/10 to-kef-yellow/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take the first step towards becoming part of Kerala's largest entrepreneurial community. 
              Connect with innovators, access exclusive resources, and grow your network.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-kef-red via-kef-blue to-kef-yellow text-white border-0 hover:opacity-90"
              onClick={() => handleApplyClick('entrepreneur')}
              data-testid="button-get-started"
            >
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Apply for {selectedType ? membershipTypeLabels[selectedType] : 'Membership'}
            </DialogTitle>
            <DialogDescription>
              Fill out the form below to apply for membership. We'll review your application and get back to you within 48 hours.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} data-testid="input-fullname" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 98765 43210" {...field} data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization / Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Your organization name" {...field} value={field.value ?? ''} data-testid="input-organization" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation / Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Founder, Student, Manager" {...field} value={field.value ?? ''} data-testid="input-designation" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/yourprofile" {...field} value={field.value ?? ''} data-testid="input-linkedin" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why do you want to join KEF? *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about yourself and what you hope to achieve as a member..."
                        className="min-h-[100px]"
                        {...field}
                        data-testid="input-reason"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={applyMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-kef-red to-kef-blue text-white"
                  data-testid="button-submit-application"
                >
                  {applyMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
