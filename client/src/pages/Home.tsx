import HeroSection from '@/components/sections/HeroSection';
import WelcomeSection from '@/components/sections/WelcomeSection';
import WhatWeDoSection from '@/components/sections/WhatWeDoSection';
import ProgramsSection from '@/components/sections/ProgramsSection';
import ImpactSection from '@/components/sections/ImpactSection';
import EventsSection from '@/components/sections/EventsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import PartnersSection from '@/components/sections/PartnersSection';
import NewsletterSection from '@/components/sections/NewsletterSection';

export default function Home() {
  return (
    <main data-testid="page-home">
      <HeroSection />
      <WelcomeSection />
      <WhatWeDoSection />
      <ProgramsSection />
      <ImpactSection />
      <EventsSection />
      <TestimonialsSection />
      <PartnersSection />
      <NewsletterSection />
    </main>
  );
}
