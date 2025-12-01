import { ThemeProvider } from '@/lib/ThemeContext';
import WelcomeSection from '../sections/WelcomeSection';

export default function WelcomeSectionExample() {
  return (
    <ThemeProvider>
      <WelcomeSection />
    </ThemeProvider>
  );
}
