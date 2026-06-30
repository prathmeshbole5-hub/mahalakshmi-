import React from 'react';
import { ShieldCheck, Landmark, Lock, CheckCircle, Award, Sparkles } from 'lucide-react';

export default function TrustSecurity() {
  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden scroll-reveal border-t border-slate-800">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Trust stats columns (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold-light text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Certified Fintech Platform</span>
            </div>

            <h3 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
              A Platform Built On Absolute Trust
            </h3>

            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Shree Mahalaxmi Finance connects you with NBFC partners and public/private banks officially registered and regulated by the Reserve Bank of India (RBI).
            </p>

            <div className="border-t border-slate-800 pt-6 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-2xl font-extrabold text-gold">45+</h4>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Bank Partners</p>
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-gold">₹2.5K Cr+</h4>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Loans Disbursed</p>
              </div>
            </div>
          </div>

          {/* Secure Badges cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 1: Bank regulated */}
            <div className="bg-gradient-to-br from-secondary/50 to-primary/80 border border-slate-700/60 p-6 rounded-2xl space-y-4 shadow-navy-glow">
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
                <Landmark className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">RBI Registered Partners</h4>
              <p className="text-slate-400 text-xs font-medium leading-relaxed">
                All borrowing options and lending limits follow fair-practice codes declared under RBI directions.
              </p>
            </div>

            {/* Card 2: Security SSL */}
            <div className="bg-gradient-to-br from-secondary/50 to-primary/80 border border-slate-700/60 p-6 rounded-2xl space-y-4 shadow-navy-glow">
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Bank-Grade Encryption</h4>
              <p className="text-slate-400 text-xs font-medium leading-relaxed">
                Your credentials and credit statements are encrypted with 256-Bit SSL channels, keeping data secure.
              </p>
            </div>

            {/* Card 3: Privacy */}
            <div className="bg-gradient-to-br from-secondary/50 to-primary/80 border border-slate-700/60 p-6 rounded-2xl space-y-4 shadow-navy-glow">
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Privacy Assured</h4>
              <p className="text-slate-400 text-xs font-medium leading-relaxed">
                We never share your personal numbers or CIBIL histories with unauthorized third parties.
              </p>
            </div>

            {/* Card 4: Quality */}
            <div className="bg-gradient-to-br from-secondary/50 to-primary/80 border border-slate-700/60 p-6 rounded-2xl space-y-4 shadow-navy-glow">
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">ISO Certified Standards</h4>
              <p className="text-slate-400 text-xs font-medium leading-relaxed">
                Platform protocols align with ISO-27001 parameters ensuring data governance compliance.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
