import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, Sparkles, TrendingUp, Landmark } from 'lucide-react';

export default function Hero({ onOpenApply, onOpenEligibility }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    // Calculate mouse position relative to card center
    const x = e.clientX - card.left - card.width / 2;
    const y = e.clientY - card.top - card.height / 2;
    setCoords({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Convert coordinate offsets into rotational degrees
  const rotateX = isHovered ? -(coords.y / 12) : 0;
  const rotateY = isHovered ? (coords.x / 12) : 0;

  return (
    <section 
      id="home" 
      className="relative min-h-screen bg-primary pt-36 pb-24 overflow-hidden flex items-center justify-center grid-bg"
    >
      {/* Background Mesh Lighting and Gradient Blobs */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-secondary/35 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-10 right-20 w-[420px] h-[420px] bg-gold/10 rounded-full blur-3xl animate-blob animate-delay-200"></div>
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-blob animate-delay-500"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-primary pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Info */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left animate-fade-in-up">
            
            {/* Micro badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-secondary/60 border border-slate-700/60 text-gold-light text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-premium">
              <Sparkles className="w-4 h-4 text-gold animate-pulse" />
              <span>India's Premium Financial Hub</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
              Smart Financial <br />
              <span className="text-gold-gradient">Solutions</span> For Your Future
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Experience the next generation of credit. Get pre-approved personal loans, secure business credit lines, and compare elite cashback cards with zero physical paperwork.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4">
              <button
                onClick={() => onOpenApply('General')}
                className="w-full sm:w-auto btn-gold px-8 py-4.5 rounded-xl flex items-center justify-center gap-2 group text-base font-bold shadow-gold-glow hover:shadow-premium-hover uppercase tracking-wider"
              >
                Apply Now 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onOpenEligibility}
                className="w-full sm:w-auto px-8 py-4.5 rounded-xl bg-secondary/80 border border-slate-700 hover:border-gold/50 text-white font-bold transition-all duration-300 hover:bg-secondary flex items-center justify-center gap-2 backdrop-blur-md uppercase tracking-wider text-sm"
              >
                Check Eligibility
              </button>
            </div>

            {/* Live Statistics */}
            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-secondary/40 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <h3 className="text-gold text-2xl md:text-3xl font-extrabold tracking-tight">₹2,500 Cr+</h3>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mt-1">Disbursed</p>
              </div>
              <div className="text-center lg:text-left border-x border-secondary/40 px-4">
                <h3 className="text-gold text-2xl md:text-3xl font-extrabold tracking-tight">10 Lakh+</h3>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mt-1">Happy Users</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-gold text-2xl md:text-3xl font-extrabold tracking-tight">4.8 ★</h3>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mt-1">Google Score</p>
              </div>
            </div>

          </div>

          {/* Hero Right Graphic Container */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-[420px] md:h-[520px]">
            {/* Spinning decorative orbit */}
            <div className="absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full border border-slate-800/40 animate-spin-slow pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4.5 h-4.5 bg-gold rounded-full blur-xs shadow-gold-glow"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-secondary rounded-full"></div>
            </div>
            
            {/* 3D Tilt Card Wrapper */}
            <div 
              className="relative z-10 w-[290px] md:w-[370px] h-[240px] md:h-[280px] perspective-card cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.04 : 1})`,
                transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Premium Card Visual */}
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-secondary to-primary border border-gold/45 p-6 flex flex-col justify-between shadow-navy-glow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full pointer-events-none transform translate-x-8 -translate-y-8"></div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Premium Reserve</p>
                    <h3 className="text-gold font-bold text-lg md:text-xl mt-0.5">Shree Mahalaxmi</h3>
                  </div>
                  <Landmark className="w-6 h-6 text-gold" />
                </div>

                <div className="my-auto">
                  <div className="w-10 h-7 rounded bg-gradient-to-r from-gold/75 to-gold-dark/65 border border-gold/40 shadow-sm mb-4"></div>
                  <p className="text-white font-mono text-base md:text-lg tracking-widest">••••  ••••  ••••  8899</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-450">Cardholder</p>
                    <p className="text-white text-xs font-bold tracking-wide uppercase mt-0.5">MOHIT SHARMA</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-wider text-slate-450">Valid Thru</p>
                    <p className="text-white text-xs font-bold mt-0.5">08 / 31</p>
                  </div>
                </div>
              </div>

              {/* Floating Widget 1: Mock Approval */}
              <div className="absolute -top-10 -left-6 md:-left-12 glass px-4 py-3 rounded-2xl shadow-premium flex items-center gap-3 animate-bounce animate-delay-200 hover:scale-105 transition-transform">
                <div className="p-1.5 bg-green-500/10 text-green-600 rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Loan Approval</p>
                  <p className="text-xs text-primary font-extrabold">Instant & Verified</p>
                </div>
              </div>

              {/* Floating Widget 2: Speedometer dial link */}
              <div className="absolute -bottom-8 -right-6 md:-right-10 glass-dark border border-slate-700/60 px-5 py-4 rounded-2xl shadow-navy-glow flex items-center gap-3 hover:scale-105 transition-transform">
                <div className="p-2 bg-gold/10 text-gold rounded-xl">
                  <TrendingUp className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Credit Score</p>
                  <p className="text-sm text-white font-extrabold">795 <span className="text-[10px] text-green-400 font-bold">(Excellent)</span></p>
                </div>
              </div>

              {/* Floating Widget 3: ROI badge */}
              <div className="absolute top-1/2 -right-8 -translate-y-1/2 glass px-3.5 py-2.5 rounded-xl shadow-premium flex items-center gap-2 hover:scale-105 transition-transform">
                <Zap className="w-4 h-4 text-gold fill-gold" />
                <span className="text-xs text-primary font-bold">ROI from 8.4%</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
