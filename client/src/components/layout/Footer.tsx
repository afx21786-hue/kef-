import { useState } from 'react';
import { Link } from 'wouter';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import kefLogo from '@assets/KEF__1_-removebg-preview_1764600424285.png';

const footerLinks = {
  'Quick Links': [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Programs', href: '/programs' },
    { label: 'Events', href: '/events' },
    { label: 'Contact', href: '/contact' },
  ],
  'Programs': [
    { label: 'Startup Boot Camp', href: '/programs#bootcamp' },
    { label: 'Business Conclaves', href: '/programs#conclaves' },
    { label: 'Founder Circle', href: '/programs#founder-circle' },
    { label: 'Advisory Clinics', href: '/programs#advisory' },
    { label: 'Campus Labs', href: '/programs#campus' },
  ],
  'Resources': [
    { label: 'Startup Support', href: '/startup-support' },
    { label: 'Campus Initiatives', href: '/campus' },
    { label: 'Partner With Us', href: '/partner' },
    { label: 'Join as Ambassador', href: '/ambassador' },
    { label: 'Newsletter', href: '/newsletter' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our latest updates and news.",
      });
      setEmail('');
    }
  };

  return (
    <footer className="bg-muted/50 border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6" data-testid="link-footer-logo">
              <img src={kefLogo} alt="KEF" className="h-12 w-12" />
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-kef-red via-kef-blue to-kef-yellow bg-clip-text text-transparent">
                  Kerala Economic Forum
                </span>
                <p className="text-xs text-muted-foreground">Empowering Kerala's Entrepreneurs</p>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              A non-profit movement dedicated to building Kerala's entrepreneurial ecosystem 
              and empowering the next generation of founders.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-kef-red" />
                <span>info@keralaeconomicforum.org</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-kef-blue" />
                <span>+91 XXX XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-kef-yellow" />
                <span>Kochi, Kerala, India</span>
              </div>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-kef-red hover:border-kef-red/50 transition-colors"
                  aria-label={social.label}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links], index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center gap-4">
              <span className="text-sm text-muted-foreground">Subscribe to our newsletter</span>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-64"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="input-newsletter-email"
                />
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-kef-red to-kef-blue text-white border-0"
                  data-testid="button-newsletter-subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Kerala Economic Forum. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
