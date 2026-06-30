import React, { useState } from 'react';
import { Landmark, Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState(''); // '', 'error', 'success'

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubStatus('error');
      return;
    }
    setSubStatus('success');
    setEmail('');
    setTimeout(() => {
      setSubStatus('');
    }, 4000);
  };

  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer id="contact" className="bg-primary text-white border-t border-slate-800 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Logo & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-br from-gold to-gold-dark rounded-xl shadow-gold-glow">
                <Landmark className="h-5 w-5 text-primary" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                Shree Mahalaxmi <span className="text-gold">Finance</span>
              </span>
            </a>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Shree Mahalaxmi Finance is India's leading digital financial marketplace. We provide a fully digital infrastructure connecting borrowers with top-tier banking institutions.
            </p>
            
            {/* Social Icons (Custom Inline SVGs) */}
            <div className="flex space-x-3 pt-2">
              <a href="#" aria-label="Facebook" className="p-2 rounded-lg bg-secondary/50 hover:bg-gold hover:text-primary transition-all text-slate-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="p-2 rounded-lg bg-secondary/50 hover:bg-gold hover:text-primary transition-all text-slate-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 rounded-lg bg-secondary/50 hover:bg-gold hover:text-primary transition-all text-slate-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="p-2 rounded-lg bg-secondary/50 hover:bg-gold hover:text-primary transition-all text-slate-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-gold">Quick Links</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-400">
              <li><a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="hover:text-gold transition-colors">Home</a></li>
              <li><a href="#loans" onClick={(e) => handleLinkClick(e, '#loans')} className="hover:text-gold transition-colors">Loan Products</a></li>
              <li><a href="#cards" onClick={(e) => handleLinkClick(e, '#cards')} className="hover:text-gold transition-colors">Credit Cards</a></li>
              <li><a href="#emi" onClick={(e) => handleLinkClick(e, '#emi')} className="hover:text-gold transition-colors">EMI Calculator</a></li>
              <li><a href="#faq" onClick={(e) => handleLinkClick(e, '#faq')} className="hover:text-gold transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Directory (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-gold">Get In Touch</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>8th Floor, Signature Tower, Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>+91 1800 572 8899 (Toll Free)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>support@mahalaxmifinance.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-gold">Newsletter</h4>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
              Subscribe to receive updates on interest rate drops, financial tips, and new reward credit card releases.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-2 relative">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold transition-all"
                />
                <button
                  type="submit"
                  className="p-2.5 btn-gold rounded-xl flex items-center justify-center shrink-0 shadow-gold-glow"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {subStatus === 'error' && (
                <p className="text-red-400 text-[10px] font-bold">Please enter a valid email address.</p>
              )}
              {subStatus === 'success' && (
                <p className="text-green-400 text-[10px] font-bold">Subscribed successfully! Thank you.</p>
              )}
            </form>
          </div>

        </div>

        {/* Disclaimer / Copyright bottom */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-semibold uppercase tracking-wider gap-4">
          <p>© {currentYear} Shree Mahalaxmi Finance. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-gold transition-colors">Disclaimer</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
