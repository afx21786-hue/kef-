import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useAuth as useServerAuth } from '@/hooks/useAuth';
import { logOut } from '@/lib/firebase';
import { useLocation, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ApplyFormModal, AdvisorySessionModal } from '@/components/FormModals';
import { 
  User, 
  LogOut, 
  Calendar, 
  Rocket, 
  GraduationCap, 
  Trophy,
  ArrowRight,
  Shield
} from 'lucide-react';
import type { Program, Event } from '@shared/schema';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const { isAdmin } = useServerAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAdvisoryModalOpen, setIsAdvisoryModalOpen] = useState(false);

  const { data: programs = [] } = useQuery<Program[]>({
    queryKey: ['/api/programs'],
  });

  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  const handleLogout = async () => {
    const { error } = await logOut();
    if (error) {
      toast({
        title: "Logout failed",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "See you next time!",
      });
      setLocation('/');
    }
  };

  // Redirect to home if not logged in (using useEffect to avoid render warning)
  useEffect(() => {
    if (!loading && !user) {
      setLocation('/');
    }
  }, [loading, user, setLocation]);

  if (loading) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-kef-red border-t-transparent rounded-full" />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const userInitials = user.displayName 
    ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.email?.charAt(0).toUpperCase() || 'U';

  return (
    <main className="pt-20 min-h-screen" data-testid="page-dashboard">
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.photoURL || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-kef-red to-kef-blue text-white text-2xl">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Welcome, {user.displayName || 'Member'}!
                </h1>
                <p className="text-muted-foreground">{user.email}</p>
                <Badge className="mt-2 bg-kef-blue/10 text-kef-blue border-0">
                  KEF Member
                </Badge>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {isAdmin && (
                <Link href="/admin">
                  <Button 
                    variant="outline"
                    className="bg-gradient-to-r from-kef-red/10 to-kef-blue/10 border-kef-red/30"
                    data-testid="button-admin-panel"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Panel
                  </Button>
                </Link>
              )}
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="text-destructive"
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Calendar, title: 'Upcoming Events', value: String(events.filter(e => e.isActive).length), color: 'from-kef-red to-rose-500' },
              { icon: Rocket, title: 'Active Programs', value: String(programs.filter(p => p.isActive).length), color: 'from-kef-blue to-cyan-500' },
              { icon: GraduationCap, title: 'Total Programs', value: String(programs.length), color: 'from-kef-yellow to-orange-500' },
              { icon: Trophy, title: 'KEF Member', value: '1', color: 'from-purple-500 to-pink-500' },
            ].map((stat, index) => (
              <Card key={index} className="border-border hover-elevate cursor-default">
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-kef-red" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.filter(e => e.isActive).length > 0 ? (
                  events.filter(e => e.isActive).slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center justify-between gap-2 p-4 rounded-lg bg-muted/50">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.date ? new Date(event.date).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : 'Date TBA'}
                        </p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">No upcoming events</p>
                )}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setLocation('/events')}
                >
                  View All Events
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-kef-blue" />
                  Available Programs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {programs.filter(p => p.isActive).length > 0 ? (
                  programs.filter(p => p.isActive).slice(0, 3).map((program) => (
                    <div key={program.id} className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <p className="font-medium truncate">{program.title}</p>
                        <Badge variant="secondary">{program.category || 'Program'}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{program.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">No active programs</p>
                )}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setLocation('/programs')}
                  data-testid="button-explore-programs"
                >
                  Explore Programs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border mt-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-2">Ready to take the next step?</h3>
              <p className="text-muted-foreground mb-6">
                Explore our programs and accelerate your entrepreneurial journey
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  className="bg-gradient-to-r from-kef-red to-kef-blue text-white border-0"
                  onClick={() => setIsApplyModalOpen(true)}
                  data-testid="button-apply-accelerator"
                >
                  Apply to Accelerator
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsAdvisoryModalOpen(true)}
                  data-testid="button-book-advisory"
                >
                  Book Advisory Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <ApplyFormModal 
        open={isApplyModalOpen} 
        onOpenChange={setIsApplyModalOpen} 
      />
      <AdvisorySessionModal 
        open={isAdvisoryModalOpen} 
        onOpenChange={setIsAdvisoryModalOpen} 
      />
    </main>
  );
}
