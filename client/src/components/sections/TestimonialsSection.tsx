import { useState } from 'react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: 'Anand Kumar',
    role: 'Founder, TechStart Kerala',
    content: 'KEF has been instrumental in our startup journey. The mentorship and networking opportunities have helped us scale from a small team to a company with 50+ employees.',
    initials: 'AK',
    color: 'from-kef-red to-rose-500',
  },
  {
    name: 'Priya Menon',
    role: 'CEO, EcoInnovate',
    content: 'The Startup Boot Camp transformed my approach to business. The practical workshops and mentor connections gave me the confidence to launch my sustainable products venture.',
    initials: 'PM',
    color: 'from-kef-blue to-cyan-500',
  },
  {
    name: 'Rahul Nair',
    role: 'Co-founder, FinEdge',
    content: 'Through KEF\'s investor connect program, we secured our seed funding. The guidance on pitch preparation and investor relations was invaluable.',
    initials: 'RN',
    color: 'from-kef-yellow to-orange-500',
  },
  {
    name: 'Sneha Thomas',
    role: 'Student Entrepreneur',
    content: 'As a college student, KEF\'s campus initiatives opened doors I never knew existed. Now I run my own edtech startup while completing my degree.',
    initials: 'ST',
    color: 'from-purple-500 to-pink-500',
  },
];

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
      data-testid="section-testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-500 text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What Our{' '}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Community Says
            </span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className={`border-border transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <CardContent className="p-8 md:p-12 text-center">
                      <Quote className="w-12 h-12 text-muted-foreground/30 mx-auto mb-6" />
                      <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      <div className="flex flex-col items-center">
                        <Avatar className="w-16 h-16 mb-4">
                          <AvatarFallback className={`bg-gradient-to-br ${testimonial.color} text-white text-lg font-medium`}>
                            {testimonial.initials}
                          </AvatarFallback>
                        </Avatar>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              size="icon"
              variant="outline"
              onClick={prev}
              className="rounded-full"
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'w-6 bg-kef-red' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  data-testid={`button-testimonial-dot-${index}`}
                />
              ))}
            </div>
            <Button
              size="icon"
              variant="outline"
              onClick={next}
              className="rounded-full"
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
