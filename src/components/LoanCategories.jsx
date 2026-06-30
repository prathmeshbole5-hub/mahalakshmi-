import React, { useState, useEffect } from 'react';
import { User, Home, Car, Briefcase, GraduationCap, Coins, ArrowRight, Sparkles } from 'lucide-react';

const loansData = [
  {
    title: 'Personal Loan',
    rateNum: 10.49,
    rateText: '10.49% p.a.',
    description: 'Quick collateral-free funds up to ₹40 Lakhs for personal needs.',
    icon: User,
    color: 'from-blue-500/10 to-indigo-500/10',
    maxAmt: 4000000,
  },
  {
    title: 'Home Loan',
    rateNum: 8.40,
    rateText: '8.40% p.a.',
    description: 'Long-term property financing up to ₹10 Crores with easy transfers.',
    icon: Home,
    color: 'from-emerald-500/10 to-teal-500/10',
    maxAmt: 100000000,
  },
  {
    title: 'Business Loan',
    rateNum: 13.00,
    rateText: '13.00% p.a.',
    description: 'Hassle-free expansion capital up to ₹75 Lakhs for MSMEs.',
    icon: Briefcase,
    color: 'from-purple-500/10 to-pink-500/10',
    maxAmt: 7500000,
  },
  {
    title: 'Car Loan',
    rateNum: 8.75,
    rateText: '8.75% p.a.',
    description: 'Up to 100% on-road funding for new and pre-owned cars.',
    icon: Car,
    color: 'from-amber-500/10 to-orange-500/10',
    maxAmt: 5000000,
  },
  {
    title: 'Gold Loan',
    rateNum: 8.90,
    rateText: '8.90% p.a.',
    description: 'Leverage physical gold jewelry at lower interest rates.',
    icon: Coins,
    color: 'from-yellow-500/10 to-amber-600/10',
    maxAmt: 2500000,
  },
  {
    title: 'Education Loan',
    rateNum: 9.50,
    rateText: '9.50% p.a.',
    description: 'Fund domestic/global premier academics with 100% covers.',
    icon: GraduationCap,
    color: 'from-rose-500/10 to-red-500/10',
    maxAmt: 15000000,
  },
];

export default function LoanCategories({ onOpenApply }) {
  const [selectedLoan, setSelectedLoan] = useState(loansData[0]);
  const [calcAmount, setCalcAmount] = useState(1000000); // 10 Lakhs
  const [calcTenure, setCalcTenure] = useState(5); // 5 Years
  const [estimatedEmi, setEstimatedEmi] = useState(0);

  // EMI mathematics
  useEffect(() => {
    const P = calcAmount;
    const r = selectedLoan.rateNum / 12 / 100;
    const n = calcTenure * 12;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEstimatedEmi(Math.round(emi));
  }, [calcAmount, calcTenure, selectedLoan]);

  const formatRupee = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="loans" className="py-24 bg-primary text-white relative overflow-hidden scroll-reveal border-t border-slate-800">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-secondary/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-gold font-extrabold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> High-Limit Borrowing
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Premium Loan Solutions at Low Rates
          </h3>
          <p className="text-slate-450 text-base font-medium">
            Acquire pre-approved credit lines from leading public/private banks and NbFC partners through our digital marketplace ecosystem.
          </p>
        </div>

        {/* Dynamic Split Layout: Cards (Left) & Inline Tool (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Cards Grid (Left 7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {loansData.map((loan) => {
              const Icon = loan.icon;
              const isSelected = selectedLoan.title === loan.title;
              return (
                <div 
                  key={loan.title}
                  onClick={() => {
                    setSelectedLoan(loan);
                    if (calcAmount > loan.maxAmt) {
                      setCalcAmount(loan.maxAmt);
                    }
                  }}
                  className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-0.5 ${
                    isSelected 
                      ? 'bg-secondary/75 border-gold shadow-navy-glow' 
                      : 'bg-secondary/35 border-slate-700/60 hover:border-slate-500/70 hover:bg-secondary/50'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      {/* Icon */}
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${loan.color} text-white flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <Icon className="w-5.5 h-5.5 text-white" />
                      </div>
                      
                      {/* Rate tag */}
                      <span className="text-[10px] font-bold text-gold-light bg-gold/15 border border-gold/25 px-2.5 py-0.5 rounded">
                        {loan.rateText}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2">{loan.title}</h4>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">{loan.description}</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenApply(loan.title);
                    }}
                    className="w-full py-2.5 rounded-xl border border-gold/50 text-gold hover:bg-gold hover:text-primary transition-all text-xs font-bold flex items-center justify-center gap-1 group/btn"
                  >
                    Quick Apply <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Quick Tool Panel (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-secondary/50 to-primary/80 border border-slate-750 p-6 md:p-8 rounded-3xl shadow-navy-glow flex flex-col justify-between h-full relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full pointer-events-none"></div>

            <div className="space-y-6">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-gold">Estimation tool</span>
                <h4 className="text-lg font-bold text-white mt-1">Live {selectedLoan.title} Calculator</h4>
                <p className="text-slate-450 text-[11px] font-semibold uppercase mt-0.5">Rates starting at {selectedLoan.rateText}</p>
              </div>

              {/* Amount Slider */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Loan Amount</span>
                  <span className="text-white font-extrabold">{formatRupee(calcAmount)}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max={selectedLoan.maxAmt}
                  step="50000"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                  <span>{formatRupee(50000)}</span>
                  <span>{formatRupee(selectedLoan.maxAmt)}</span>
                </div>
              </div>

              {/* Tenure Slider */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Tenure (Years)</span>
                  <span className="text-white font-extrabold">{calcTenure} Yrs</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={calcTenure}
                  onChange={(e) => setCalcTenure(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                  <span>1 Year</span>
                  <span>10 Years</span>
                </div>
              </div>
            </div>

            {/* Results block */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-4">
              <div className="flex justify-between items-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-500 font-extrabold">Estimated EMI</p>
                  <p className="text-xl font-extrabold text-gold-gradient tracking-tight">{formatRupee(estimatedEmi)} <span className="text-[10px] text-slate-400 font-medium">/mo</span></p>
                </div>
                <span className="text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 font-bold uppercase">
                  Soft Interest
                </span>
              </div>

              <button
                onClick={() => onOpenApply(selectedLoan.title, calcAmount)}
                className="w-full btn-gold py-4 rounded-xl font-bold text-sm flex justify-center items-center gap-1.5 shadow-gold-glow uppercase tracking-wider"
              >
                Apply for {selectedLoan.title} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
