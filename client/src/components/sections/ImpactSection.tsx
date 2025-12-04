import { useCountUp, useScrollAnimation } from '@/lib/useScrollAnimation';
import { Rocket, Users, Building2, Calendar, IndianRupee } from 'lucide-react';

const metrics = [
  { icon: Rocket, value: 2000, suffix: '+', label: 'Startups to be supported', color: 'from-kef-red to-rose-500' },
  { icon: Users, value: 10000, suffix: '+', label: 'Entrepreneurs in our network', color: 'from-kef-blue to-cyan-500' },
  { icon: Building2, value: 200, suffix: '+', label: 'Campus partnerships', color: 'from-kef-yellow to-orange-500' },
  { icon: Calendar, value: 100, suffix: '+', label: 'Events in pipeline', color: 'from-purple-500 to-pink-500' },
  { icon: IndianRupee, value: 100, suffix: 'Cr+', label: 'Funding enablement target', color: 'from-emerald-500 to-teal-500' },
];

function MetricCard({ metric, index, isVisible }: { metric: typeof metrics[0]; index: number; isVisible: boolean }) {
  const { count, ref } = useCountUp(metric.value, 2000);

  return (
    <div
      ref={ref}
      className={`group relative p-6 rounded-2xl bg-card border border-border text-center hover-elevate cursor-default transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      data-testid={`metric-card-${index}`}
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
      
      <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${metric.color} mb-4 group-hover:scale-110 transition-transform`}>
        <metric.icon className="w-6 h-6 text-white" />
      </div>
      
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent whitespace-nowrap">
        {count.toLocaleString()}{metric.suffix}
      </div>
      
      <p className="text-sm text-muted-foreground">{metric.label}</p>
    </div>
  );
}

export default function ImpactSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden"
      data-testid="section-impact"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-kef-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-kef-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-kef-blue/10 text-kef-blue text-sm font-medium mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our Vision.{' '}
            <span className="bg-gradient-to-r from-kef-blue to-kef-yellow bg-clip-text text-transparent">
              Our Impact.
            </span>{' '}
            Our Future.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ambitious goals to transform Kerala into a thriving entrepreneurial hub
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
