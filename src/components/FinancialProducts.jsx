import React from 'react';
import { User, CreditCard, Briefcase, Home, Car, Coins, Landmark, ShieldCheck, Smartphone, ArrowRight } from 'lucide-react';

const products = [
  {
    title: 'Personal Loan',
    subtitle: 'Zero Collateral',
    description: 'Instant cash up to ₹40 Lakhs with minimum digital docs.',
    icon: User,
    color: 'from-blue-500/10 to-indigo-500/10',
    rate: 'Rates from 10.49%',
  },
  {
    title: 'Credit Cards',
    subtitle: 'High Cashback',
    description: 'Compare and apply for top reward credit cards instantly.',
    icon: CreditCard,
    color: 'from-amber-500/10 to-orange-500/10',
    rate: 'Up to 5% Cashback',
  },
  {
    title: 'Business Loan',
    subtitle: 'Expand Enterprise',
    description: 'Hassle-free business finance up to ₹75 Lakhs for MSMEs.',
    icon: Briefcase,
    color: 'from-purple-500/10 to-pink-500/10',
    rate: 'Rates from 13.00%',
  },
  {
    title: 'Home Loan',
    subtitle: 'Dream Property',
    description: 'Long-term housing loans up to ₹10 Crores with easy transfers.',
    icon: Home,
    color: 'from-emerald-500/10 to-teal-500/10',
    rate: 'Rates from 8.40%',
  },
  {
    title: 'Car Loan',
    subtitle: 'On-Road Funding',
    description: 'Get up to 100% on-road funding for your new set of wheels.',
    icon: Car,
    color: 'from-red-500/10 to-rose-500/10',
    rate: 'Rates from 8.75%',
  },
  {
    title: 'Gold Loan',
    subtitle: 'Instant Cash',
    description: 'Leverage physical gold ornaments at lowest interest rates.',
    icon: Coins,
    color: 'from-yellow-500/10 to-amber-600/10',
    rate: 'Rates from 8.90%',
  },
  {
    title: 'Fixed Deposit',
    subtitle: 'Secure Wealth',
    description: 'Grow savings with high-interest bank FD partners.',
    icon: Landmark,
    color: 'from-cyan-500/10 to-blue-500/10',
    rate: 'Returns up to 8.60%',
  },
  {
    title: 'Insurance Plans',
    subtitle: 'Family Protection',
    description: 'Health, life, and motor policies from top insurers.',
    icon: ShieldCheck,
    color: 'from-green-500/10 to-emerald-500/10',
    rate: 'Premium from ₹300/mo',
  },
  {
    title: 'UPI Services',
    subtitle: 'Instant Payments',
    description: 'Fast QR transfers, bill utility pays, and digital wallets.',
    icon: Smartphone,
    color: 'from-violet-500/10 to-purple-600/10',
    rate: 'Zero Fee Transfers',
  },
];

export default function FinancialProducts({ onOpenApply }) {
  return (
    <section id="products" className="py-24 bg-white relative overflow-hidden scroll-reveal">
      <div className="absolute top-0 right-0 w-96 h-96 bg-neutralBg rounded-full translate-x-20 -translate-y-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-gold font-extrabold">Marketplace Ecosystem</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            One-Stop Shop For All Financial Products
          </h3>
          <p className="text-slate-500 text-base font-medium">
            Browse through our extensive catalog of personal lending, wealth accumulation, payment utility, and risk protection tools.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod) => {
            const Icon = prod.icon;
            return (
              <div 
                key={prod.title}
                className="group relative rounded-3xl bg-neutralBg border border-slate-200/60 p-6 flex flex-col justify-between hover:border-gold/50 hover:bg-white hover:shadow-premium transition-all duration-300 transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    {/* Icon wrapper */}
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${prod.color} text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    {/* Rate/Returns Tag */}
                    <span className="text-[10px] font-bold text-gold-dark px-2.5 py-1 rounded-lg bg-gold/10 border border-gold/15">
                      {prod.rate}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {prod.subtitle}
                  </span>
                  
                  <h4 className="text-lg font-bold text-primary mt-1 mb-2 group-hover:text-gold-dark transition-colors">
                    {prod.title}
                  </h4>
                  
                  <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6">
                    {prod.description}
                  </p>
                </div>

                <button
                  onClick={() => onOpenApply(prod.title)}
                  className="w-full py-3 px-4 rounded-xl border border-secondary text-primary font-bold text-xs hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-1 group/btn"
                >
                  Get Started <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
