import { useState } from 'react';
import { useLocation } from 'wouter';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, MapPin, Users, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import eventImage from '@assets/generated_images/business_conference_networking_scene.png';

const events = [
  {
    title: 'Kerala Startup Fest',
    date: 'January 2025',
    location: 'Kochi',
    type: 'Flagship',
    description: 'Two-day power-packed festival with 1000+ student entrepreneurs, investors, experts, workshops, and real-time pitch battles.',
    attendees: '1000+',
    image: eventImage,
  },
  {
    title: 'KEF Founder Roundtable',
    date: 'February 2025',
    location: 'Thiruvananthapuram',
    type: 'Networking',
    description: 'Closed-door networking session for selected founders and business leaders. Intimate conversations, real connections.',
    attendees: '50',
    image: eventImage,
  },
  {
    title: 'Startup Boot Camp',
    date: 'March 2025',
    location: 'Kozhikode',
    type: 'Residential',
    description: 'Residential startup camp with intensive workshops, mentoring sessions, and pitch practice.',
    attendees: '100',
    image: eventImage,
  },
];

export default function EventsSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleRegister = (eventTitle: string) => {
    toast({
      title: "Registration Started",
      description: `You're registering for ${eventTitle}. Please complete your profile to finish registration.`,
    });
    setLocation('/membership');
  };

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
      data-testid="section-events"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-kef-red/10 text-kef-red text-sm font-medium mb-4">
              Upcoming Events
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Upcoming{' '}
              <span className="bg-gradient-to-r from-kef-red to-kef-yellow bg-clip-text text-transparent">
                Events
              </span>
            </h2>
          </div>
          <Button 
            variant="outline"
            className="self-start md:self-auto"
            onClick={() => setLocation('/events')}
            data-testid="button-explore-events"
          >
            Explore All Events
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Card
              key={index}
              className={`group overflow-hidden border-border hover-elevate transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              data-testid={`event-card-${index}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <Badge 
                  className="absolute top-4 left-4 bg-kef-red/90 text-white border-0"
                >
                  {event.type}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-kef-red transition-colors">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-kef-blue" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-kef-red" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-kef-yellow" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleRegister(event.title)}
                  data-testid={`button-register-${index}`}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
