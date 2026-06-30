import React, { useState } from 'react';
import { Landmark, ArrowRight, Percent, ArrowUpDown, Sparkles } from 'lucide-react';

const lendersData = [
  {
    name: 'IDFC First Bank',
    rateNum: 10.49,
    rateText: '10.49% p.a.',
    emiNum: 10745,
    emiText: '₹10,745 / mo',
    tenure: '5 Years',
    feeNum: 0,
    feeText: 'Zero Processing Fee',
    rating: '4.8 ★',
  },
  {
    name: 'HDFC Bank',
    rateNum: 10.50,
    rateText: '10.50% p.a.',
    emiNum: 10747,
    emiText: '₹10,747 / mo',
    tenure: '5 Years',
    feeNum: 999,
    feeText: 'Flat ₹999 fee',
    rating: '4.7 ★',
  },
  {
    name: 'ICICI Bank',
    rateNum: 10.75,
    rateText: '10.75% p.a.',
    emiNum: 10808,
    emiText: '₹10,808 / mo',
    tenure: '5 Years',
    feeNum: 1499,
    feeText: 'Flat ₹1,499 fee',
    rating: '4.6 ★',
  },
  {
    name: 'Axis Bank',
    rateNum: 10.99,
    rateText: '10.99% p.a.',
    emiNum: 10866,
    emiText: '₹10,866 / mo',
    tenure: '5 Years',
    feeNum: 5000, // 1% of 5 Lakhs is ₹5,000
    feeText: '1% of loan amount',
    rating: '4.5 ★',
  },
];

export default function LoanComparison({ onOpenApply }) {
  const [sortBy, setSortBy] = useState('rate'); // 'rate', 'emi', 'fee'

  const getSortedLenders = () => {
    return [...lendersData].sort((a, b) => {
      if (sortBy === 'rate') return a.rateNum - b.rateNum;
      if (sortBy === 'emi') return a.emiNum - b.emiNum;
      if (sortBy === 'fee') return a.feeNum - b.feeNum;
      return 0;
    });
  };

  const sortedLenders = getSortedLenders();

  return (
    <section className="py-24 bg-neutralBg relative overflow-hidden scroll-reveal">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-gold font-extrabold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Market Comparison
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            Compare Top Personal Loan Offers
          </h3>
          <p className="text-slate-500 text-base font-medium">
            Compare live rates, monthly instalments, and fees for a ₹5 Lakhs loan across our authorized lending partners.
          </p>
        </div>

        {/* Sorting Controller Row */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-premium">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Showing 4 partner banks
          </span>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort By:
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setSortBy('rate')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  sortBy === 'rate' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                Interest Rate
              </button>
              <button
                onClick={() => setSortBy('emi')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  sortBy === 'emi' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                Monthly EMI
              </button>
              <button
                onClick={() => setSortBy('fee')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  sortBy === 'fee' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                Processing Fee
              </button>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-premium overflow-hidden">
          
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary text-white text-xs uppercase tracking-wider">
                  <th className="py-5 px-6">Lending Partner</th>
                  <th className="py-5 px-6">Interest Rate (p.a.)</th>
                  <th className="py-5 px-6">Monthly EMI</th>
                  <th className="py-5 px-6">Tenure</th>
                  <th className="py-5 px-6">Processing Fee</th>
                  <th className="py-5 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-600">
                {sortedLenders.map((lender) => (
                  <tr key={lender.name} className="hover:bg-neutralBg/40 transition-colors">
                    {/* Bank Name */}
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 text-primary flex items-center justify-center font-bold">
                          <Landmark className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-extrabold text-primary">{lender.name}</p>
                          <span className="text-[10px] text-green-600 font-extrabold uppercase bg-green-50 px-2 py-0.5 rounded border border-green-150">
                            {lender.rating} Recommended
                          </span>
                        </div>
                      </div>
                    </td>
                    {/* Interest Rate */}
                    <td className="py-5 px-6 text-primary font-extrabold text-base">
                      <span className="flex items-center gap-1">
                        <Percent className="w-4 h-4 text-gold shrink-0" />
                        {lender.rateText}
                      </span>
                    </td>
                    {/* EMI */}
                    <td className="py-5 px-6 font-extrabold text-slate-700">{lender.emiText}</td>
                    {/* Tenure */}
                    <td className="py-5 px-6 text-slate-500">{lender.tenure}</td>
                    {/* Processing Fee */}
                    <td className="py-5 px-6 text-slate-500 text-xs">{lender.feeText}</td>
                    {/* Action button */}
                    <td className="py-5 px-6 text-center">
                      <button
                        onClick={() => onOpenApply('Personal Loan')}
                        className="btn-gold text-xs px-4.5 py-2.5 rounded-xl shadow-gold-glow inline-flex items-center gap-1"
                      >
                        Apply <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Card View */}
          <div className="block md:hidden divide-y divide-slate-100">
            {sortedLenders.map((lender) => (
              <div key={lender.name} className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-primary flex items-center justify-center font-bold">
                      <Landmark className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm">{lender.name}</h4>
                      <p className="text-[9px] text-green-600 font-bold uppercase tracking-wider">{lender.rating} Recommended</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gold-dark bg-gold/10 px-2 py-1 rounded border border-gold/15">
                    {lender.rateText}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-medium text-slate-400">
                  <div>
                    <span className="block uppercase tracking-wider text-[9px] font-bold text-slate-400">Monthly EMI</span>
                    <span className="text-primary font-bold text-sm">{lender.emiText.split(' ')[0]}</span>
                  </div>
                  <div>
                    <span className="block uppercase tracking-wider text-[9px] font-bold text-slate-400">Tenure</span>
                    <span className="text-primary font-semibold">{lender.tenure}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block uppercase tracking-wider text-[9px] font-bold text-slate-400">Processing Fee</span>
                    <span className="text-slate-500 font-semibold">{lender.feeText}</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenApply('Personal Loan')}
                  className="w-full btn-gold py-3 rounded-xl text-xs flex justify-center items-center gap-1 shadow-gold-glow"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
