import React, { useState } from 'react';
import { Landmark, Check, Gift, Plane, Award, ArrowRight, Sparkles, Wallet, ShieldCheck } from 'lucide-react';

const cardsData = [
  {
    id: 'aura',
    name: 'Mahalaxmi Aura',
    type: 'Cashback & Spends',
    tagline: 'Best for Everyday Shoppers',
    fee: '₹499 (Waived on spending ₹1 Lakh)',
    cashback: '5% Unlimited Cashback on online platforms',
    rewards: '2x Reward Points on utility bill payments',
    travel: 'Dining discount partner benefits',
    bonus: '₹500 Amazon Gift Voucher on activation',
    gradient: 'from-slate-800 to-slate-950',
    iconColor: 'text-blue-400',
    features: ['5% Online Cashback', '2x Utility Rewards', 'Zero Fuel Surcharge', 'Instant Virtual Card'],
    chartData: { online: 5, dining: 3, travel: 1, utilities: 4 },
  },
  {
    id: 'elevate',
    name: 'Mahalaxmi Elevate',
    type: 'Rewards & Lifestyle',
    tagline: 'Best for Travel & Shopping',
    fee: '₹1,499 (Waived on spending ₹3 Lakhs)',
    cashback: '10% Cash rewards on flights & hotel bookings',
    rewards: '5x Reward Points on dining & department stores',
    travel: '4 Free Domestic Lounge Visits per year',
    bonus: '2,500 Reward Points upon joining',
    gradient: 'from-slate-900 via-secondary to-primary',
    iconColor: 'text-amber-405',
    features: ['10% Travel Cashback', '5x Retail Rewards', '4 Domestic Lounges/Yr', 'Comprehensive Insurance'],
    isPopular: true,
    chartData: { online: 8, dining: 6, travel: 10, utilities: 2 },
  },
  {
    id: 'reserve',
    name: 'Mahalaxmi Reserve',
    type: 'Elite Luxury & Travel',
    tagline: 'The Ultimate Elite Experience',
    fee: '₹4,999 (Waived on spending ₹8 Lakhs)',
    cashback: 'Flat 2% Cashback on all international spends',
    rewards: '10x Reward Points on luxury stays & fine dining',
    travel: 'Unlimited International & Domestic Lounge Access',
    bonus: 'Complimentary Luxury Hotel Stay Voucher',
    gradient: 'from-amber-950 via-slate-900 to-black',
    iconColor: 'text-gold',
    features: ['Flat 2% Int\'l Cashback', '10x Luxury Rewards', 'Unlimited Lounges', 'Golf Privilege Access'],
    chartData: { online: 4, dining: 10, travel: 15, utilities: 5 },
  },
];

export default function CreditCards({ onOpenApply }) {
  const [selectedCard, setSelectedCard] = useState(cardsData[1]); // Default to Elevate
  const [showComparison, setShowComparison] = useState(false);

  return (
    <section id="cards" className="py-24 bg-primary text-white relative overflow-hidden scroll-reveal border-t border-slate-800">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-gold font-extrabold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Luxury Card Hub
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Premium Card Showcase & Rewards Analytics
          </h3>
          <p className="text-slate-400 text-base font-medium">
            Click on a card to inspect its rewards structure. Unlock cashbacks, luxury dining benefits, airport lounge access, and exclusive partner vouchers.
          </p>
        </div>

        {/* Cards Grid / Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {cardsData.map((card) => {
            const isSelected = selectedCard.id === card.id;
            return (
              <div 
                key={card.name}
                onClick={() => setSelectedCard(card)}
                className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative border cursor-pointer hover:-translate-y-1 ${
                  isSelected 
                    ? 'bg-secondary/70 border-gold shadow-navy-glow lg:scale-105' 
                    : 'bg-secondary/35 border-slate-700/60 hover:bg-secondary/50'
                }`}
              >
                {card.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-primary text-[10px] font-extrabold uppercase tracking-wider shadow-gold-glow">
                    Most Popular
                  </span>
                )}

                <div>
                  {/* Visual Card Representation */}
                  <div className={`w-full h-44 rounded-2xl bg-gradient-to-br ${card.gradient} p-5 flex flex-col justify-between shadow-premium mb-6 overflow-hidden relative border ${
                    isSelected ? 'border-gold/50' : 'border-slate-800'
                  }`}>
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full pointer-events-none"></div>
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">{card.type}</p>
                        <h4 className="text-white font-bold text-sm mt-0.5">{card.name}</h4>
                      </div>
                      <Landmark className="w-5 h-5 text-gold" />
                    </div>

                    <div className="my-auto">
                      <div className="w-8 h-6 rounded bg-gradient-to-r from-gold/75 to-gold-dark/60 border border-gold/45 mb-3"></div>
                      <p className="text-white/80 font-mono text-sm tracking-widest">••••  ••••  ••••  {card.id === 'aura' ? '2345' : card.id === 'elevate' ? '6789' : '8899'}</p>
                    </div>

                    <div className="flex justify-between items-end text-[9px] text-slate-400 uppercase font-semibold">
                      <div>
                        <p className="text-white text-[10px]">VALUED MEMBER</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white">12 / 30</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Title Info */}
                  <div className="mb-6 space-y-1.5">
                    <h4 className="text-lg font-bold text-white">{card.name}</h4>
                    <p className="text-xs text-gold-light font-bold uppercase tracking-wider">{card.tagline}</p>
                    <p className="text-xs text-slate-400 font-medium">{card.fee} Annual Fee</p>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-2.5 mb-8">
                    {card.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                        <div className="p-0.5 rounded-full bg-green-500/10 text-green-400">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Apply Trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenApply(card.name + ' Credit Card');
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'btn-gold text-primary shadow-gold-glow'
                      : 'border border-slate-700 text-white hover:bg-slate-800'
                  }`}
                >
                  Apply Card <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Card Reward Analytics Panel (Interactive Feature) */}
        <div className="bg-secondary/40 border border-slate-750 p-6 rounded-3xl mb-12 shadow-navy-glow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
          {/* Left: Analytics description */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <span className="text-[9px] uppercase font-bold tracking-widest text-gold flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5" /> Reward breakdown
            </span>
            <h4 className="text-xl font-extrabold text-white">{selectedCard.name} Benefit Ratios</h4>
            <p className="text-slate-450 text-xs leading-relaxed font-medium">
              We analyze category multipliers based on your spending. Compare point distributions below to maximize saving cashbacks.
            </p>
            <div className="bg-primary/50 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <span>Complimentary lounge transfers and airport rewards are verified upon activation spends.</span>
            </div>
          </div>

          {/* Right: SVG Bar Chart Renders */}
          <div className="lg:col-span-7 bg-primary/40 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h5 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-2">Category Multipliers (Rates %)</h5>
            
            {/* Bar 1: Online */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Online Spends</span>
                <span className="text-gold font-bold">{selectedCard.chartData.online}%</span>
              </div>
              <div className="w-full bg-slate-850 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gold-gradient h-full rounded-full transition-all duration-750 ease-out" 
                  style={{ width: `${selectedCard.chartData.online * 6.6}%` }} // Maps percentage to visual scale
                ></div>
              </div>
            </div>

            {/* Bar 2: Dining */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Dining & Lifestyle</span>
                <span className="text-gold font-bold">{selectedCard.chartData.dining}%</span>
              </div>
              <div className="w-full bg-slate-850 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gold-gradient h-full rounded-full transition-all duration-750 ease-out" 
                  style={{ width: `${selectedCard.chartData.dining * 6.6}%` }}
                ></div>
              </div>
            </div>

            {/* Bar 3: Travel */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Travel & Bookings</span>
                <span className="text-gold font-bold">{selectedCard.chartData.travel}%</span>
              </div>
              <div className="w-full bg-slate-850 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gold-gradient h-full rounded-full transition-all duration-750 ease-out" 
                  style={{ width: `${selectedCard.chartData.travel * 6.6}%` }}
                ></div>
              </div>
            </div>

            {/* Bar 4: Utilities */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Utility Payments</span>
                <span className="text-gold font-bold">{selectedCard.chartData.utilities}%</span>
              </div>
              <div className="w-full bg-slate-850 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gold-gradient h-full rounded-full transition-all duration-750 ease-out" 
                  style={{ width: `${selectedCard.chartData.utilities * 6.6}%` }}
                ></div>
              </div>
            </div>

          </div>
        </div>

        {/* Comparison Table Toggle */}
        <div className="text-center">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-secondary text-slate-300 font-bold text-xs hover:bg-white hover:text-primary transition-all shadow-premium uppercase tracking-wider"
          >
            {showComparison ? 'Hide Card Comparison' : 'Compare Card Specifications'}
          </button>
        </div>

        {/* Detailed Comparison Grid */}
        <div className={`mt-8 overflow-hidden transition-all duration-500 ${showComparison ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-secondary/40 border border-slate-750 rounded-2xl overflow-x-auto p-4 md:p-6 shadow-navy-glow">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="py-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-1/4">Key Features</th>
                  {cardsData.map((card) => (
                    <th key={card.name} className="py-4 px-4 text-white font-extrabold text-base w-1/4">
                      {card.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs font-semibold text-slate-400">
                <tr>
                  <td className="py-4 font-bold text-slate-300">Joining Benefit</td>
                  {cardsData.map((card) => (
                    <td key={card.name} className="py-4 px-4 flex items-center gap-1.5"><Gift className="w-4 h-4 text-gold shrink-0" /> {card.bonus}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-300">Cashback Reward</td>
                  {cardsData.map((card) => (
                    <td key={card.name} className="py-4 px-4">{card.cashback}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-300">Reward Rate</td>
                  {cardsData.map((card) => (
                    <td key={card.name} className="py-4 px-4 flex items-center gap-1.5"><Award className="w-4 h-4 text-gold shrink-0" /> {card.rewards}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-300">Lounge & Travel</td>
                  {cardsData.map((card) => (
                    <td key={card.name} className="py-4 px-4 flex items-center gap-1.5"><Plane className="w-4 h-4 text-gold shrink-0" /> {card.travel}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-300">Annual Fee</td>
                  {cardsData.map((card) => (
                    <td key={card.name} className="py-4 px-4 text-gold font-bold">{card.fee}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
