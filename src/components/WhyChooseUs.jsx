import React from 'react';
import { Zap, Users, ShieldCheck, Percent, Headphones, FileText } from 'lucide-react';

const features = [
  {
    title: 'Fast Approval',
    description: 'Our digital credit assessment engine processes loan applications instantly, enabling approvals in under 5 minutes.',
    icon: Zap,
    color: 'text-yellow-500 bg-yellow-500/10',
  },
  {
    title: 'Trusted Partners',
    description: 'We partner with over 40+ leading public/private banks and top NBFCs to bring you the best possible financial offers.',
    icon: Users,
    color: 'text-blue-500 bg-blue-500/10',
  },
  {
    title: 'Secure Process',
    description: 'Your data privacy is our highest priority. All data transfers are protected with bank-grade 256-bit SSL encryption.',
    icon: ShieldCheck,
    color: 'text-green-500 bg-green-500/10',
  },
  {
    title: 'Low Interest Rates',
    description: 'Get options starting from 8.40% p.a. our algorithms scan and negotiate lower rates with partners automatically.',
    icon: Percent,
    color: 'text-purple-500 bg-purple-500/10',
  },
  {
    title: '24/7 Support',
    description: 'Dedicated relationship managers and chat support agents are available around the clock to guide you through your journey.',
    icon: Headphones,
    color: 'text-pink-500 bg-pink-500/10',
  },
  {
    title: 'Easy Documentation',
    description: 'Zero physical paperwork. Complete your application journey with paperless e-KYC, e-Sign, and automated bank verification.',
    icon: FileText,
    color: 'text-cyan-500 bg-cyan-500/10',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden scroll-reveal">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-neutralBg rounded-full -translate-x-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-gold font-extrabold">Why Choose Us</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            Financial Access Made Simpler & Smarter
          </h3>
          <p className="text-slate-500 text-base font-medium">
            We are redefining how Indians borrow money and access credit. Our technological infrastructure allows instant processing with absolute transparency.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.title}
                className="group relative rounded-2xl bg-neutralBg border border-slate-200/60 p-6 md:p-8 flex flex-col justify-start hover:border-gold/50 hover:bg-white hover:shadow-premium transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Icon wrapper */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h4 className="text-lg font-bold text-primary mb-3 group-hover:text-gold-dark transition-colors duration-300">
                  {feat.title}
                </h4>

                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
