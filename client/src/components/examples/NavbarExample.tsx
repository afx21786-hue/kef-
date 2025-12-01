import { ThemeProvider } from '@/lib/ThemeContext';
import Navbar from '../layout/Navbar';

export default function NavbarExample() {
  return (
    <ThemeProvider>
      <div className="min-h-[120px] bg-background relative">
        <Navbar />
      </div>
    </ThemeProvider>
  );
}
