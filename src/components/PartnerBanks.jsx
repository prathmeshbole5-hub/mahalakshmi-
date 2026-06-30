import React from 'react';
import { ShieldAlert, Landmark, Sparkles } from 'lucide-react';

const partners = [
  { name: 'HDFC Bank', type: 'Private Bank' },
  { name: 'ICICI Bank', type: 'Private Bank' },
  { name: 'SBI Card', type: 'Credit Cards' },
  { name: 'Axis Bank', type: 'Private Bank' },
  { name: 'IDFC First', type: 'Digital Lending' },
  { name: 'Bajaj Finserv', type: 'NBFC Partner' },
  { name: 'Tata Capital', type: 'NBFC Partner' },
  { name: 'Aditya Birla', type: 'Lending Partner' }
];

export default function PartnerBanks() {
  return (
    <section className="py-16 bg-neutralBg border-y border-slate-200/50 scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-extrabold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Our Banking & Lending Partners
          </p>
        </div>

        {/* Responsive Flex Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 items-center justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="w-full max-w-[140px] h-16 rounded-xl bg-white border border-slate-200/50 p-2.5 flex flex-col justify-center items-center hover:border-gold/40 hover:shadow-premium transition-all duration-300 group cursor-pointer"
            >
              {/* Fake bank logo representation */}
              <div className="flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold transition-colors duration-300" />
                <span className="font-extrabold text-xs text-slate-700 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {partner.name}
                </span>
              </div>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 mt-1 font-bold">
                {partner.type}
              </span>
            </div>
          ))}
        </div>

        {/* Small disclosure info */}
        <div className="mt-8 text-center text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center justify-center gap-1">
          <ShieldAlert className="w-3.5 h-3.5 text-gold shrink-0" />
          Officially co-branded and authorized by lending institutions.
        </div>

      </div>
    </section>
  );
}
