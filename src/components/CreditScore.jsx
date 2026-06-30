import React, { useState } from 'react';
import { ShieldCheck, Info, Sparkles, TrendingUp, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

export default function CreditScore({ onOpenEligibility }) {
  const [simulatedScore, setSimulatedScore] = useState(750);

  // CIBIL Range math: 300 to 900 maps to -90deg to +90deg
  const needleAngle = ((simulatedScore - 300) / 600) * 180 - 90;

  // AI Advice mappings
  const getCreditAdvice = () => {
    if (simulatedScore < 550) {
      return {
        rating: 'Poor Credit Health',
        color: 'text-red-400 bg-red-500/10 border-red-500/20',
        icon: AlertTriangle,
        advice: 'High card utilization or missed repayments detected. Avoid launching new loan inquiries, clear outstanding credit card dues immediately, and keep card spend under 30%.',
        impact: 'Standard loans may be rejected or charged high interest rates (16%+).',
      };
    } else if (simulatedScore < 650) {
      return {
        rating: 'Fair Credit Health',
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        icon: AlertTriangle,
        advice: 'Moderate repayment history. Ensure you pay bills before statement deadlines. We recommend setting up auto-debit payments for monthly utility bills and outstanding EMIs.',
        impact: 'Eligible for loans but with moderate interest rates (12% to 15% p.a.).',
      };
    } else if (simulatedScore < 750) {
      return {
        rating: 'Good Credit Health',
        color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
        icon: CheckCircle,
        advice: 'Healthy borrowing patterns! You maintain a low credit utilization ratio. Clear credit balances a few days before statement cycles to push your score into the elite tier.',
        impact: 'Eligible for fast approval standard loans and primary reward cards.',
      };
    } else {
      return {
        rating: 'Excellent Credit Health',
        color: 'text-green-400 bg-green-500/10 border-green-500/20',
        icon: CheckCircle,
        advice: 'Stellar credit profile! You represent the lowest risk category. You qualify for our prime interest rates starting at 8.40% p.a. and high-limit reserve credit cards.',
        impact: 'Pre-approved for instant disbursals and elite luxury card benefits.',
      };
    }
  };

  const currentAdvice = getCreditAdvice();
  const AdviceIcon = currentAdvice.icon;

  return (
    <section id="credit-score" className="py-24 bg-primary relative overflow-hidden scroll-reveal border-t border-slate-800">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-secondary/50 to-primary/80 border border-slate-700/60 rounded-3xl p-8 md:p-12 shadow-navy-glow backdrop-blur-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column - Score Marketing & Simulation Slider */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold-light text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>CIBIL Simulation Dashboard</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Simulate Your Credit Standing
              </h3>

              <p className="text-slate-350 text-sm font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Move the slider to simulate different credit scores. Inspect how lenders view your profile and read recommendations to improve your CIBIL rating.
              </p>

              {/* Slider Controller */}
              <div className="bg-primary/40 border border-slate-800 rounded-2xl p-5 max-w-lg mx-auto lg:mx-0 space-y-4">
                <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                  <span className="uppercase tracking-wider">Simulate CIBIL Score</span>
                  <span className="text-white text-lg font-extrabold">{simulatedScore}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="900"
                  step="5"
                  value={simulatedScore}
                  onChange={(e) => setSimulatedScore(Number(e.target.value))}
                  className="w-full h-2 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                  <span>300 (Poor)</span>
                  <span>600 (Fair)</span>
                  <span>750 (Good)</span>
                  <span>900 (Excellent)</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
                <button
                  onClick={onOpenEligibility}
                  className="w-full sm:w-auto btn-gold px-8 py-4 rounded-xl text-base shadow-gold-glow flex items-center justify-center gap-2"
                >
                  Verify Real Score <TrendingUp className="w-5 h-5" />
                </button>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" /> Zero impact check
                </span>
              </div>
            </div>

            {/* Right Column - Speedometer & AI Advice Display */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
              
              {/* SVG Speedometer Gauge */}
              <div className="relative w-64 h-44 flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 200 130">
                  <defs>
                    <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#EF4444" />
                      <stop offset="50%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                  
                  <path
                    d="M 20 110 A 80 80 0 0 1 180 110"
                    fill="transparent"
                    className="stroke-slate-800"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />

                  <path
                    d="M 20 110 A 80 80 0 0 1 180 110"
                    fill="transparent"
                    stroke="url(#gauge-grad)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="251.3"
                    strokeDashoffset="0"
                  />

                  <circle cx="100" cy="110" r="7" className="fill-gold" />
                  <circle cx="100" cy="110" r="3" className="fill-primary" />

                  <polygon
                    points="97,110 100,28 103,110"
                    className="fill-gold transition-transform duration-500 ease-out origin-bottom"
                    style={{
                      transform: `rotate(${needleAngle}deg)`,
                      transformOrigin: '100px 110px',
                    }}
                  />

                  <text x="20" y="125" className="fill-slate-500 font-extrabold text-[9px] uppercase tracking-wider" textAnchor="middle">300</text>
                  <text x="100" y="22" className="fill-slate-500 font-extrabold text-[9px] uppercase tracking-wider" textAnchor="middle">600</text>
                  <text x="180" y="125" className="fill-slate-500 font-extrabold text-[9px] uppercase tracking-wider" textAnchor="middle">900</text>
                </svg>

                <div className="absolute bottom-1 text-center">
                  <h4 className="text-3xl font-extrabold text-white tracking-tight">{simulatedScore}</h4>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">CIBIL Rating</span>
                </div>
              </div>

              {/* AI Advice Box */}
              <div className={`w-full max-w-sm rounded-2xl border p-4.5 space-y-2.5 text-left transition-all duration-300 ${currentAdvice.color}`}>
                <div className="flex items-center gap-2">
                  <AdviceIcon className="w-5 h-5 shrink-0" />
                  <h4 className="text-sm font-extrabold uppercase tracking-wide">{currentAdvice.rating}</h4>
                </div>
                
                <p className="text-xs text-white leading-relaxed font-medium">
                  {currentAdvice.advice}
                </p>
                
                <div className="pt-2 border-t border-white/10 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 opacity-90">
                  <Activity className="w-3.5 h-3.5 shrink-0" /> {currentAdvice.impact}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
