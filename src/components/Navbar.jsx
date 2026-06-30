import React, { useState, useEffect } from 'react';
import { Menu, X, Landmark, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenApply, onOpenLogin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Products', href: '#products' },
    { name: 'Loans', href: '#loans' },
    { name: 'Credit Cards', href: '#cards' },
    { name: 'EMI Calculator', href: '#emi' },
    { name: 'Credit Score', href: '#credit-score' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-primary/90 border-b border-secondary/40 py-3 shadow-navy-glow backdrop-blur-xl text-white' 
        : 'bg-transparent py-5 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center space-x-2.5 group focus:outline-none"
          >
            <div className="p-2 bg-gradient-to-br from-gold to-gold-dark rounded-xl shadow-gold-glow group-hover:scale-105 transition-all duration-300">
              <Landmark className="h-5.5 w-5.5 text-primary" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-gold-light transition-colors duration-300">
              Shree Mahalaxmi <span className="text-gold">Finance</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-6 relative">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-semibold text-slate-300 hover:text-gold transition-colors duration-300 text-xs tracking-wider uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* CTA Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onOpenLogin}
                className="font-bold text-xs text-slate-300 hover:text-white px-4 py-2.5 rounded-xl border border-slate-600/80 hover:border-white transition-all duration-300 uppercase tracking-wider bg-secondary/30 hover:bg-secondary/60"
              >
                Login
              </button>
              <button
                onClick={() => onOpenApply('Personal Loan')}
                className="btn-gold text-xs px-5 py-3 rounded-xl flex items-center gap-1.5 uppercase tracking-widest shadow-gold-glow hover:shadow-premium-hover"
              >
                Apply Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mobile controllers */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={() => onOpenApply('Personal Loan')}
              className="btn-gold text-[10px] px-3.5 py-2 rounded-lg shadow-gold-glow uppercase tracking-wider"
            >
              Apply
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-secondary/40 focus:outline-none transition-all"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Slide down overlay) */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 bg-primary/95 min-h-screen transition-all duration-500 transform backdrop-blur-xl ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        style={{ top: '65px' }}
      >
        <div className="px-6 py-10 space-y-5 flex flex-col items-center justify-start h-full">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-base font-bold text-slate-300 hover:text-gold transition-colors duration-300 py-2.5 border-b border-secondary/30 w-full text-center uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-8 flex flex-col space-y-4 w-full px-4">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenLogin();
              }}
              className="w-full font-bold text-slate-300 hover:text-white py-4 rounded-xl border border-slate-600 hover:border-white transition-all bg-secondary/35 text-sm uppercase tracking-wider"
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenApply('Personal Loan');
              }}
              className="w-full btn-gold py-4.5 rounded-xl flex justify-center items-center gap-1.5 shadow-gold-glow text-sm uppercase tracking-widest"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
