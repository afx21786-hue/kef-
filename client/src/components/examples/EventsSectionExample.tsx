import { ThemeProvider } from '@/lib/ThemeContext';
import EventsSection from '../sections/EventsSection';

export default function EventsSectionExample() {
  return (
    <ThemeProvider>
      <EventsSection />
    </ThemeProvider>
  );
}
