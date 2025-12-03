import { useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useAuth as useServerAuth } from '@/hooks/useAuth';
import { logOut } from '@/lib/firebase';
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  LogOut, 
  Calendar, 
  Rocket, 
  GraduationCap, 
  Trophy,
  Bell,
  Settings,
  ArrowRight,
  Shield
} from 'lucide-react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const { isAdmin } = useServerAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

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
              <Button variant="outline" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
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
              { icon: Calendar, title: 'Upcoming Events', value: '3', color: 'from-kef-red to-rose-500' },
              { icon: Rocket, title: 'Programs Enrolled', value: '2', color: 'from-kef-blue to-cyan-500' },
              { icon: GraduationCap, title: 'Workshops Attended', value: '5', color: 'from-kef-yellow to-orange-500' },
              { icon: Trophy, title: 'Achievements', value: '1', color: 'from-purple-500 to-pink-500' },
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
                  Your Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'Kerala Startup Fest 2025', date: 'Jan 15-16, 2025', status: 'Registered' },
                  { title: 'Founder Roundtable', date: 'Feb 8, 2025', status: 'Waitlisted' },
                  { title: 'Startup Boot Camp', date: 'Mar 1-3, 2025', status: 'Registered' },
                ].map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                    <Badge variant={event.status === 'Registered' ? 'default' : 'secondary'}>
                      {event.status}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Events
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-kef-blue" />
                  Active Programs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'Entrepreneurship Accelerator', progress: 65, status: 'Week 8 of 12' },
                  { title: 'KEF Student Forum', progress: 100, status: 'Active Member' },
                ].map((program, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{program.title}</p>
                      <span className="text-sm text-muted-foreground">{program.status}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-kef-blue to-kef-yellow h-2 rounded-full transition-all"
                        style={{ width: `${program.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
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
                <Button className="bg-gradient-to-r from-kef-red to-kef-blue text-white border-0">
                  Apply to Accelerator
                </Button>
                <Button variant="outline">
                  Book Advisory Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
