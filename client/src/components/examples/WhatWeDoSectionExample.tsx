import { ThemeProvider } from '@/lib/ThemeContext';
import WhatWeDoSection from '../sections/WhatWeDoSection';

export default function WhatWeDoSectionExample() {
  return (
    <ThemeProvider>
      <WhatWeDoSection />
    </ThemeProvider>
  );
}
