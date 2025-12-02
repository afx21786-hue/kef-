import { useState } from 'react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare,
  Users,
  Building,
  GraduationCap,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'info@keralaeconomicforum.org', color: 'from-kef-red to-rose-500' },
  { icon: Phone, label: 'Phone', value: '+91 XXX XXX XXXX', color: 'from-kef-blue to-cyan-500' },
  { icon: MapPin, label: 'Location', value: 'Kochi, Kerala, India', color: 'from-kef-yellow to-orange-500' },
];

const inquiryTypes = [
  { icon: MessageSquare, label: 'General Inquiry', value: 'general' },
  { icon: Users, label: 'Partnership', value: 'partnership' },
  { icon: Building, label: 'Corporate', value: 'corporate' },
  { icon: GraduationCap, label: 'Campus', value: 'campus' },
];

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedType, setSelectedType] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
  });

  const contactMutation = useMutation({
    mutationFn: async (data: { fullName: string; email: string; phone: string; category: string; subject: string; message: string }) => {
      const response = await apiRequest('POST', '/api/contact', data);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit');
      }
      return result;
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24-48 hours.",
      });
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', organization: '', message: '' });
      }, 3000);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate({
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      category: selectedType,
      subject: `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Inquiry from ${formData.name}`,
      message: formData.message,
    });
  };

  return (
    <main className="pt-20" data-testid="page-contact">
      <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-kef-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-kef-red/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`max-w-3xl mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-kef-blue/10 text-kef-blue text-sm font-medium mb-6">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get in{' '}
              <span className="bg-gradient-to-r from-kef-blue to-kef-red bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions or want to collaborate? We'd love to hear from you. 
              Reach out and let's build Kerala's entrepreneurial future together.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border-border">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                      <p className="text-muted-foreground">
                        Your message has been sent. We'll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label className="text-sm font-medium mb-3 block">
                          What can we help you with?
                        </Label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {inquiryTypes.map((type) => (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => setSelectedType(type.value)}
                              className={`p-4 rounded-xl border text-center transition-all hover-elevate ${
                                selectedType === type.value
                                  ? 'border-primary bg-primary/10'
                                  : 'border-border'
                              }`}
                            >
                              <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                                selectedType === type.value ? 'text-primary' : 'text-muted-foreground'
                              }`} />
                              <span className="text-sm font-medium">{type.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            data-testid="input-contact-name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            data-testid="input-contact-email"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 XXX XXX XXXX"
                            data-testid="input-contact-phone"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="organization">Organization</Label>
                          <Input
                            id="organization"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            placeholder="Your company or institution"
                            data-testid="input-contact-organization"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your inquiry..."
                          data-testid="input-contact-message"
                        />
                      </div>

                      <Button 
                        type="submit"
                        size="lg"
                        disabled={contactMutation.isPending}
                        className="w-full bg-gradient-to-r from-kef-red to-kef-blue text-white border-0"
                        data-testid="button-contact-submit"
                      >
                        {contactMutation.isPending ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4 mr-2" />
                        )}
                        {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-border hover-elevate cursor-default">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${info.color}`}>
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                        <p className="font-medium">{info.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-border bg-gradient-to-br from-kef-red/10 via-kef-blue/10 to-kef-yellow/10">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden h-[400px] bg-muted flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Map integration coming soon</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
