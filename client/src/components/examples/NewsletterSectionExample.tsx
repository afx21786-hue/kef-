import { ThemeProvider } from '@/lib/ThemeContext';
import NewsletterSection from '../sections/NewsletterSection';

export default function NewsletterSectionExample() {
  return (
    <ThemeProvider>
      <NewsletterSection />
    </ThemeProvider>
  );
}
