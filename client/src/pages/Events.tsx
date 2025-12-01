import { useState } from 'react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Users, Clock, ArrowRight, Filter } from 'lucide-react';
import eventImage from '@assets/generated_images/business_conference_networking_scene.png';

const allEvents = [
  {
    id: 1,
    title: 'Kerala Startup Fest 2025',
    date: 'January 15-16, 2025',
    location: 'Kochi',
    type: 'Flagship',
    category: 'upcoming',
    description: 'Two-day power-packed festival with 1000+ student entrepreneurs, investors, experts, workshops, and real-time pitch battles.',
    attendees: '1000+',
    image: eventImage,
  },
  {
    id: 2,
    title: 'KEF Founder Roundtable',
    date: 'February 8, 2025',
    location: 'Thiruvananthapuram',
    type: 'Networking',
    category: 'upcoming',
    description: 'Closed-door networking session for selected founders and business leaders. Intimate conversations, real connections.',
    attendees: '50',
    image: eventImage,
  },
  {
    id: 3,
    title: 'Startup Boot Camp - Kozhikode',
    date: 'March 1-3, 2025',
    location: 'Kozhikode',
    type: 'Boot Camp',
    category: 'upcoming',
    description: 'Residential startup camp with intensive workshops, mentoring sessions, and pitch practice.',
    attendees: '100',
    image: eventImage,
  },
  {
    id: 4,
    title: 'Campus Innovation Challenge',
    date: 'April 2025',
    location: 'Multiple Colleges',
    type: 'Campus',
    category: 'upcoming',
    description: 'Inter-college startup competition to identify and nurture young entrepreneurial talent.',
    attendees: '500+',
    image: eventImage,
  },
  {
    id: 5,
    title: 'Investor Connect Summit 2024',
    date: 'November 2024',
    location: 'Kochi',
    type: 'Flagship',
    category: 'past',
    description: 'Annual summit connecting startups with angel investors and VCs.',
    attendees: '300',
    image: eventImage,
  },
  {
    id: 6,
    title: 'Women Entrepreneurs Conclave',
    date: 'October 2024',
    location: 'Thrissur',
    type: 'Networking',
    category: 'past',
    description: 'Celebrating and supporting women-led startups in Kerala.',
    attendees: '200',
    image: eventImage,
  },
];

const eventTypes = ['All', 'Flagship', 'Networking', 'Boot Camp', 'Campus'];

export default function Events() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedType, setSelectedType] = useState('All');

  const filteredEvents = allEvents
    .filter(event => event.category === activeTab)
    .filter(event => selectedType === 'All' || event.type === selectedType);

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

          <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <TabsList className="h-auto bg-muted p-1">
                <TabsTrigger value="upcoming" className="px-6">Upcoming</TabsTrigger>
                <TabsTrigger value="past" className="px-6">Past Events</TabsTrigger>
              </TabsList>

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
            </div>

            <TabsContent value="upcoming" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="border-border hover-elevate cursor-default group overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-kef-red/90 text-white border-0">
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
                          <span>{event.attendees}</span>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-kef-red to-kef-blue text-white border-0">
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
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-muted text-muted-foreground border-0">
                        {event.type}
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
                          <span>{event.date}</span>
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

          {filteredEvents.length === 0 && (
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
          >
            Partner With Us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </main>
  );
}
