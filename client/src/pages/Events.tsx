import { useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, ArrowRight, Filter, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import eventImage from '@assets/generated_images/business_conference_networking_scene.png';
import type { Event } from '@shared/schema';
import { format, isPast } from 'date-fns';

export default function Events() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedType, setSelectedType] = useState('All');
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  const handleRegister = (eventTitle: string) => {
    toast({
      title: "Registration Started",
      description: `You're registering for ${eventTitle}. Please complete your profile to finish registration.`,
    });
    setLocation('/membership');
  };

  const upcomingEvents = events.filter(event => !isPast(new Date(event.date)));
  const pastEvents = events.filter(event => isPast(new Date(event.date)));
  
  const eventTypes = ['All', ...Array.from(new Set(events.map(e => e.category).filter(Boolean)))];

  const filteredEvents = (activeTab === 'upcoming' ? upcomingEvents : pastEvents)
    .filter(event => selectedType === 'All' || event.category === selectedType);

  return (
    <main className="pt-20" data-testid="page-events">
      <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-3xl mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-kef-red/10 text-kef-red text-sm font-medium mb-6">
              Events & Conclaves
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Events &{' '}
              <span className="bg-gradient-to-r from-kef-red to-kef-yellow bg-clip-text text-transparent">
                Conclaves
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We conduct statewide and district-level events designed to build networks, 
              inspire founders, and create real opportunities.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-kef-red" />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No events available at the moment.</p>
              <p className="text-sm text-muted-foreground">Check back soon for upcoming events!</p>
            </div>
          ) : (
            <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <TabsList className="h-auto bg-muted p-1">
                  <TabsTrigger value="upcoming" className="px-6">Upcoming</TabsTrigger>
                  <TabsTrigger value="past" className="px-6">Past Events</TabsTrigger>
                </TabsList>

                {eventTypes.length > 1 && (
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <div className="flex flex-wrap gap-2">
                      {eventTypes.map((type) => (
                        <Button
                          key={type}
                          size="sm"
                          variant={selectedType === type ? 'default' : 'outline'}
                          onClick={() => setSelectedType(type)}
                          className={selectedType === type ? 'bg-primary' : ''}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <TabsContent value="upcoming" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <Card key={event.id} className="border-border hover-elevate cursor-default group overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={event.imageUrl || eventImage} 
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                        <Badge className="absolute top-4 left-4 bg-kef-red/90 text-white border-0">
                          {event.category}
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
                            <span>{format(new Date(event.date), 'MMMM dd, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-kef-red" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-gradient-to-r from-kef-red to-kef-blue text-white border-0"
                          onClick={() => handleRegister(event.title)}
                          data-testid={`button-register-${event.id}`}
                        >
                          Register Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="past" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <Card key={event.id} className="border-border hover-elevate cursor-default group overflow-hidden">
                      <div className="relative h-48 overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                        <img 
                          src={event.imageUrl || eventImage} 
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                        <Badge className="absolute top-4 left-4 bg-muted text-muted-foreground border-0">
                          {event.category}
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-3">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(event.date), 'MMMM dd, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}

          {events.length > 0 && filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No events found for the selected filter.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-kef-red/10 via-kef-blue/10 to-kef-yellow/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to Host an Event with{' '}
            <span className="bg-gradient-to-r from-kef-red to-kef-blue bg-clip-text text-transparent">
              KEF
            </span>
            ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Partner with us to bring entrepreneurship events to your institution or organization
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-kef-red to-kef-blue text-white border-0"
            onClick={() => setLocation('/contact')}
            data-testid="button-partner-events"
          >
            Partner With Us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </main>
  );
}
