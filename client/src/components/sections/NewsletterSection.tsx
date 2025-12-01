import { useState } from 'react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function NewsletterSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our latest updates and news.",
      });
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section 
      ref={ref}
      className="py-24 relative overflow-hidden"
      data-testid="section-newsletter"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-kef-red/10 via-kef-blue/10 to-kef-yellow/10" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`p-8 md:p-12 rounded-3xl bg-card/80 backdrop-blur-xl border border-border text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-kef-red/20 to-kef-blue/20 mb-6">
            <Mail className="w-8 h-8 text-kef-blue" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated with{' '}
            <span className="bg-gradient-to-r from-kef-red to-kef-blue bg-clip-text text-transparent">
              KEF
            </span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter for the latest updates on events, programs, 
            and opportunities in Kerala's startup ecosystem.
          </p>

          {isSubmitted ? (
            <div className="flex items-center justify-center gap-3 text-emerald-500">
              <CheckCircle className="w-6 h-6" />
              <span className="font-medium">Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
                data-testid="input-newsletter-email-section"
              />
              <Button 
                type="submit"
                className="bg-gradient-to-r from-kef-red to-kef-blue text-white border-0"
                data-testid="button-newsletter-subscribe-section"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
