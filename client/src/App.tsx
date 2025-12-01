import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/ThemeContext";
import { AuthProvider } from "@/lib/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Programs from "@/pages/Programs";
import StartupSupport from "@/pages/StartupSupport";
import Campus from "@/pages/Campus";
import Events from "@/pages/Events";
import Membership from "@/pages/Membership";
import Contact from "@/pages/Contact";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/programs" component={Programs} />
      <Route path="/startup-support" component={StartupSupport} />
      <Route path="/campus" component={Campus} />
      <Route path="/events" component={Events} />
      <Route path="/membership" component={Membership} />
      <Route path="/contact" component={Contact} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Navbar />
              <Router />
              <Footer />
            </div>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
