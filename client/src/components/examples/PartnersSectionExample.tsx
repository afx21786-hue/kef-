import { ThemeProvider } from '@/lib/ThemeContext';
import PartnersSection from '../sections/PartnersSection';

export default function PartnersSectionExample() {
  return (
    <ThemeProvider>
      <PartnersSection />
    </ThemeProvider>
  );
}
