import { ThemeProvider } from '@/lib/ThemeContext';
import HeroSection from '../sections/HeroSection';

export default function HeroSectionExample() {
  return (
    <ThemeProvider>
      <HeroSection />
    </ThemeProvider>
  );
}
