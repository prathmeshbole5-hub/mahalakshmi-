import React from 'react';
import { BarChart3, LineChart, Award, DollarSign, Heart, Car, Shield, ArrowRight } from 'lucide-react';

const products = [
  {
    title: 'Mutual Funds',
    subtitle: 'Wealth Accumulation',
    description: 'Invest in hand-picked equity, debt, and hybrid mutual fund assets.',
    icon: BarChart3,
    color: 'text-blue-500 bg-blue-500/10',
    stat: '15%+ Historic CAGR',
    category: 'Mutual Funds',
  },
  {
    title: 'SIP Planner',
    subtitle: 'Disciplined Savings',
    description: 'Automate monthly savings starting from ₹500 in top funds.',
    icon: LineChart,
    color: 'text-indigo-500 bg-indigo-500/10',
    stat: 'Flexible Pause Options',
    category: 'SIP',
  },
  {
    title: 'Bonds & NCDs',
    subtitle: 'Fixed Corporate Income',
    description: 'Get steady yield returns up to 11% with AAA certified bonds.',
    icon: Award,
    color: 'text-amber-500 bg-amber-500/10',
    stat: 'Yields up to 11.20% p.a.',
    category: 'Bonds',
  },
  {
    title: 'Fixed Deposits',
    subtitle: 'Guaranteed Growth',
    description: 'Lock savings with premier banking partners for assured maturity payouts.',
    icon: DollarSign,
    color: 'text-emerald-500 bg-emerald-500/10',
    stat: 'Returns up to 8.60% p.a.',
    category: 'Fixed Deposit',
  },
  {
    title: 'Health Insurance',
    subtitle: 'Medical Safety Net',
    description: 'Cashless claims across 10,000+ network hospitals for your family.',
    icon: Heart,
    color: 'text-red-500 bg-red-500/10',
    stat: 'Premium from ₹350/mo',
    category: 'Health Insurance',
  },
  {
    title: 'Car Insurance',
    subtitle: 'Motor Damage Shield',
    description: 'Zero depreciation motor insurance with instant claim assistance.',
    icon: Car,
    color: 'text-orange-500 bg-orange-500/10',
    stat: 'Save up to 85% on premium',
    category: 'Car Insurance',
  },
  {
    title: 'Term Insurance',
    subtitle: 'Family Income Protection',
    description: 'High cover payout limits safeguarding your dependents future.',
    icon: Shield,
    color: 'text-teal-500 bg-teal-500/10',
    stat: '1 Cr Cover from ₹490/mo',
    category: 'Term Insurance',
  },
];

export default function InvestmentsInsurance({ onOpenApply }) {
  return (
    <section id="investments" className="py-24 bg-white relative overflow-hidden scroll-reveal">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neutralBg rounded-full translate-x-20 translate-y-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-gold font-extrabold">Wealth & Protection</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            Investments & Safety Covers
          </h3>
          <p className="text-slate-500 text-base font-medium">
            Accumulate compounding wealth with high-interest investments or protect your family with premium insurance covers.
          </p>
        </div>

        {/* Products Grid (Responsive 7 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod) => {
            const Icon = prod.icon;
            return (
              <div 
                key={prod.title}
                className="group relative rounded-3xl bg-neutralBg border border-slate-200/60 p-8 flex flex-col justify-between hover:border-gold/50 hover:bg-white hover:shadow-premium transition-all duration-300 transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${prod.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    {/* Return tag */}
                    <span className="text-[10px] font-bold text-gold-dark px-2.5 py-1 rounded-lg bg-gold/10 border border-gold/15">
                      {prod.stat}
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
                  onClick={() => onOpenApply(prod.category)}
                  className="w-full py-3 px-4 rounded-xl border border-secondary text-primary font-bold text-xs hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-1 group/btn"
                >
                  Invest / Cover Now <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
