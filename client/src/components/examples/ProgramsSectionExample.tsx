import { ThemeProvider } from '@/lib/ThemeContext';
import ProgramsSection from '../sections/ProgramsSection';

export default function ProgramsSectionExample() {
  return (
    <ThemeProvider>
      <ProgramsSection />
    </ThemeProvider>
  );
}
