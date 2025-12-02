import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, CheckCircle } from 'lucide-react';

interface FormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplyFormModal({ open, onOpenChange }: FormModalProps) {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    programInterest: '',
    message: '',
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest('POST', '/api/forms/apply', data);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to submit');
      return result;
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({ title: "Application Submitted", description: "We'll get back to you soon!" });
      setTimeout(() => {
        onOpenChange(false);
        setIsSuccess(false);
        setFormData({ fullName: '', email: '', phone: '', organization: '', programInterest: '', message: '' });
      }, 2000);
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply Now</DialogTitle>
          <DialogDescription>
            Submit your application to join our programs and initiatives.
          </DialogDescription>
        </DialogHeader>
        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Thank You!</h3>
            <p className="text-muted-foreground">Your application has been submitted.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Full Name *</Label>
              <Input
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                data-testid="input-apply-fullname"
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                data-testid="input-apply-email"
              />
            </div>
            <div>
              <Label>Phone *</Label>
              <Input
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                data-testid="input-apply-phone"
              />
            </div>
            <div>
              <Label>Organization</Label>
              <Input
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="Your organization"
                data-testid="input-apply-organization"
              />
            </div>
            <div>
              <Label>Program Interest</Label>
              <Input
                value={formData.programInterest}
                onChange={(e) => setFormData({ ...formData, programInterest: e.target.value })}
                placeholder="Which program interests you?"
                data-testid="input-apply-program"
              />
            </div>
            <div>
              <Label>Additional Message</Label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us more about yourself..."
                data-testid="input-apply-message"
              />
            </div>
            <Button type="submit" className="w-full" disabled={mutation.isPending} data-testid="button-apply-submit">
              {mutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Submit Application
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function AdvisorySessionModal({ open, onOpenChange }: FormModalProps) {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    sessionTopic: '',
    preferredDate: '',
    message: '',
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest('POST', '/api/forms/advisory', data);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to submit');
      return result;
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({ title: "Request Submitted", description: "We'll contact you to schedule your session!" });
      setTimeout(() => {
        onOpenChange(false);
        setIsSuccess(false);
        setFormData({ fullName: '', email: '', phone: '', organization: '', sessionTopic: '', preferredDate: '', message: '' });
      }, 2000);
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Advisory Session</DialogTitle>
          <DialogDescription>
            Schedule a one-on-one advisory session with our experts.
          </DialogDescription>
        </DialogHeader>
        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Session Request Received!</h3>
            <p className="text-muted-foreground">We'll contact you to confirm your session.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Full Name *</Label>
              <Input
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                data-testid="input-advisory-fullname"
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                data-testid="input-advisory-email"
              />
            </div>
            <div>
              <Label>Phone *</Label>
              <Input
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                data-testid="input-advisory-phone"
              />
            </div>
            <div>
              <Label>Organization</Label>
              <Input
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="Your organization"
                data-testid="input-advisory-organization"
              />
            </div>
            <div>
              <Label>Session Topic</Label>
              <Input
                value={formData.sessionTopic}
                onChange={(e) => setFormData({ ...formData, sessionTopic: e.target.value })}
                placeholder="What would you like to discuss?"
                data-testid="input-advisory-topic"
              />
            </div>
            <div>
              <Label>Preferred Date</Label>
              <Input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                data-testid="input-advisory-date"
              />
            </div>
            <div>
              <Label>Additional Message</Label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Any additional details..."
                data-testid="input-advisory-message"
              />
            </div>
            <Button type="submit" className="w-full" disabled={mutation.isPending} data-testid="button-advisory-submit">
              {mutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Book Session
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ConsultationModal({ open, onOpenChange }: FormModalProps) {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    consultationType: '',
    preferredDate: '',
    message: '',
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest('POST', '/api/forms/consultation', data);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to submit');
      return result;
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({ title: "Request Submitted", description: "We'll contact you to schedule your consultation!" });
      setTimeout(() => {
        onOpenChange(false);
        setIsSuccess(false);
        setFormData({ fullName: '', email: '', phone: '', organization: '', consultationType: '', preferredDate: '', message: '' });
      }, 2000);
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book a Consultation</DialogTitle>
          <DialogDescription>
            Schedule a consultation with our team to discuss your needs.
          </DialogDescription>
        </DialogHeader>
        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Consultation Request Received!</h3>
            <p className="text-muted-foreground">We'll contact you to confirm your consultation.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Full Name *</Label>
              <Input
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                data-testid="input-consultation-fullname"
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                data-testid="input-consultation-email"
              />
            </div>
            <div>
              <Label>Phone *</Label>
              <Input
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                data-testid="input-consultation-phone"
              />
            </div>
            <div>
              <Label>Organization</Label>
              <Input
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="Your organization"
                data-testid="input-consultation-organization"
              />
            </div>
            <div>
              <Label>Consultation Type</Label>
              <Input
                value={formData.consultationType}
                onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
                placeholder="e.g., Business Strategy, Funding, Marketing"
                data-testid="input-consultation-type"
              />
            </div>
            <div>
              <Label>Preferred Date</Label>
              <Input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                data-testid="input-consultation-date"
              />
            </div>
            <div>
              <Label>Additional Message</Label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Any additional details..."
                data-testid="input-consultation-message"
              />
            </div>
            <Button type="submit" className="w-full" disabled={mutation.isPending} data-testid="button-consultation-submit">
              {mutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Book Consultation
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function CampusInviteModal({ open, onOpenChange }: FormModalProps) {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    designation: '',
    eventType: '',
    preferredDate: '',
    expectedAttendees: '',
    message: '',
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest('POST', '/api/forms/campus-invite', data);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to submit');
      return result;
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({ title: "Invitation Request Submitted", description: "We'll get back to you about your campus event!" });
      setTimeout(() => {
        onOpenChange(false);
        setIsSuccess(false);
        setFormData({ fullName: '', email: '', phone: '', institution: '', designation: '', eventType: '', preferredDate: '', expectedAttendees: '', message: '' });
      }, 2000);
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Invite KEF to Your Campus</DialogTitle>
          <DialogDescription>
            Request KEF to conduct an event, workshop, or session at your institution.
          </DialogDescription>
        </DialogHeader>
        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Invitation Request Received!</h3>
            <p className="text-muted-foreground">We'll contact you to discuss your campus event.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Full Name *</Label>
              <Input
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                data-testid="input-campus-fullname"
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                data-testid="input-campus-email"
              />
            </div>
            <div>
              <Label>Phone *</Label>
              <Input
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                data-testid="input-campus-phone"
              />
            </div>
            <div>
              <Label>Institution Name *</Label>
              <Input
                required
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="Your college or university"
                data-testid="input-campus-institution"
              />
            </div>
            <div>
              <Label>Designation</Label>
              <Input
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                placeholder="e.g., Faculty, Student Coordinator"
                data-testid="input-campus-designation"
              />
            </div>
            <div>
              <Label>Event Type</Label>
              <Input
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                placeholder="e.g., Workshop, Talk, Bootcamp"
                data-testid="input-campus-eventtype"
              />
            </div>
            <div>
              <Label>Preferred Date</Label>
              <Input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                data-testid="input-campus-date"
              />
            </div>
            <div>
              <Label>Expected Attendees</Label>
              <Input
                value={formData.expectedAttendees}
                onChange={(e) => setFormData({ ...formData, expectedAttendees: e.target.value })}
                placeholder="e.g., 100-200 students"
                data-testid="input-campus-attendees"
              />
            </div>
            <div>
              <Label>Additional Message</Label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Any additional details about the event..."
                data-testid="input-campus-message"
              />
            </div>
            <Button type="submit" className="w-full" disabled={mutation.isPending} data-testid="button-campus-submit">
              {mutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Submit Invitation Request
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function PartnerWithUsModal({ open, onOpenChange }: FormModalProps) {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    category: 'partnership' as const,
    subject: 'Partnership Inquiry',
    message: '',
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to submit');
      return result;
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({ title: "Partnership Inquiry Submitted", description: "We'll get back to you soon!" });
      setTimeout(() => {
        onOpenChange(false);
        setIsSuccess(false);
        setFormData({ fullName: '', email: '', phone: '', category: 'partnership', subject: 'Partnership Inquiry', message: '' });
      }, 2000);
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Partner With Us</DialogTitle>
          <DialogDescription>
            Interested in partnering with Kerala Economic Forum? Let us know how we can collaborate.
          </DialogDescription>
        </DialogHeader>
        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Thank You!</h3>
            <p className="text-muted-foreground">We'll review your partnership inquiry.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Full Name *</Label>
              <Input
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                data-testid="input-partner-fullname"
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                data-testid="input-partner-email"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                data-testid="input-partner-phone"
              />
            </div>
            <div>
              <Label>Partnership Details *</Label>
              <Textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your organization and how you'd like to partner..."
                className="min-h-[120px]"
                data-testid="input-partner-message"
              />
            </div>
            <Button type="submit" className="w-full" disabled={mutation.isPending} data-testid="button-partner-submit">
              {mutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Submit Partnership Inquiry
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
