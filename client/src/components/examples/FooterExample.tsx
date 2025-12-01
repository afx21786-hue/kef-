import { ThemeProvider } from '@/lib/ThemeContext';
import Footer from '../layout/Footer';

export default function FooterExample() {
  return (
    <ThemeProvider>
      <Footer />
    </ThemeProvider>
  );
}
