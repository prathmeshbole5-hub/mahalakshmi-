import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Rajesh Kumar',
    role: 'Founder, RK Exports',
    location: 'Mumbai',
    quote: 'Shree Mahalaxmi Finance helped me secure a collateral-free Business Loan of ₹45 Lakhs. The documentation was paperless, and the funds were credited to my account in 48 hours. Excellent service!',
    rating: 5,
    avatar: 'RK',
    gradient: 'from-amber-400 to-gold',
  },
  {
    name: 'Priya Sharma',
    role: 'Tech Lead, FinSoft',
    location: 'Bengaluru',
    quote: 'I needed a quick Personal Loan for my wedding preparations. The interest rates were very competitive, and their customer support guided me through the digital verification instantly. Amazing experience.',
    rating: 5,
    avatar: 'PS',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Amit Patel',
    role: 'Consultant',
    location: 'Ahmedabad',
    quote: 'Checking my credit score and comparing credit cards was a breeze. I opted for the Mahalaxmi Elevate Card and got my approval instantly. The rewards and airport lounge access are top-notch.',
    rating: 5,
    avatar: 'AP',
    gradient: 'from-emerald-400 to-teal-600',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden scroll-reveal">
      <div className="absolute top-0 left-0 w-72 h-72 bg-neutralBg rounded-full -translate-x-12 -translate-y-12 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-gold font-extrabold">Success Stories</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            Loved By Over 10 Lakh Customers
          </h3>
          <p className="text-slate-500 text-base font-medium">
            Hear from our satisfied borrowers and credit card holders about how we helped them achieve their milestones.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div 
              key={rev.name}
              className="group relative rounded-2xl bg-neutralBg border border-slate-200/60 p-8 hover:border-gold/50 hover:bg-white hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
            >
              {/* Quote Mark Decoration */}
              <Quote className="absolute top-6 right-8 w-10 h-10 text-slate-200 group-hover:text-gold/20 transition-colors pointer-events-none" />

              <div className="space-y-6">
                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-600 text-sm font-medium leading-relaxed italic relative z-10">
                  "{rev.quote}"
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-200/50">
                {/* Avatar Badge */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${rev.gradient} text-white font-bold flex items-center justify-center text-sm shadow-md shrink-0`}>
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="text-base font-bold text-primary flex items-center gap-1.5">
                    {rev.name}
                    <ShieldCheck className="w-4 h-4 text-green-500 fill-green-100" />
                  </h4>
                  <p className="text-xs text-slate-400 font-bold">{rev.role} • {rev.location}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
