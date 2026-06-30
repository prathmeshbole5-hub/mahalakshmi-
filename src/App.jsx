import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PartnerBanks from './components/PartnerBanks';
import FinancialProducts from './components/FinancialProducts';
import CreditPaymentServices from './components/CreditPaymentServices';
import LoanCategories from './components/LoanCategories';
import LoanComparison from './components/LoanComparison';
import CreditCards from './components/CreditCards';
import FinancialTools from './components/FinancialTools';
import InvestmentsInsurance from './components/InvestmentsInsurance';
import CreditScore from './components/CreditScore';
import WhyChooseUs from './components/WhyChooseUs';
import TrustSecurity from './components/TrustSecurity';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

// Modals
import ApplyModal from './components/ApplyModal';
import EligibilityModal from './components/EligibilityModal';
import LoginModal from './components/LoginModal';

export default function App() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [preApprovedAmount, setPreApprovedAmount] = useState('');

  // Scroll reveal animation handler
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const targets = document.querySelectorAll('.scroll-reveal');
    targets.forEach((target) => observer.observe(target));

    return () => {
      targets.forEach((target) => observer.unobserve(target));
    };
  }, []);

  // Modal open handlers
  const handleOpenApply = (product = 'Personal Loan', amount = '') => {
    setSelectedProduct(product);
    if (amount) {
      setPreApprovedAmount(amount);
    } else {
      setPreApprovedAmount('');
    }
    setIsApplyOpen(true);
  };

  const handleOpenEligibility = () => {
    setIsEligibilityOpen(true);
  };

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutralBg text-primary flex flex-col justify-between selection:bg-gold selection:text-primary">
      {/* Sticky Top Navbar */}
      <Navbar 
        onOpenApply={() => handleOpenApply('Personal Loan')} 
        onOpenLogin={handleOpenLogin} 
      />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero 
          onOpenApply={() => handleOpenApply('General')} 
          onOpenEligibility={handleOpenEligibility} 
        />

        {/* 2. Partner Banks horizontal marquee */}
        <PartnerBanks />

        {/* 3. 3x3 Financial Products Grid (loans, cards, FD, Insurance, UPI) */}
        <FinancialProducts onOpenApply={handleOpenApply} />

        {/* 4. Credit & Payment Utility Services */}
        <CreditPaymentServices 
          onOpenApply={handleOpenApply} 
          onOpenEligibility={handleOpenEligibility} 
        />

        {/* 5. Detailed Loan Categories (Starting rates & features) */}
        <LoanCategories onOpenApply={handleOpenApply} />

        {/* 6. Bank Comparison Matrix */}
        <LoanComparison onOpenApply={handleOpenApply} />

        {/* 7. Premium Credit Cards Showcase with Comparison */}
        <CreditCards onOpenApply={handleOpenApply} />

        {/* 8. Tabbed Financial Estimators (EMI, SIP FD, Eligibility) */}
        <FinancialTools onOpenApply={handleOpenApply} />

        {/* 9. Score Checker Speedometer */}
        <CreditScore onOpenEligibility={handleOpenEligibility} />

        {/* 10. Compounding Wealth & Protection Coverages */}
        <InvestmentsInsurance onOpenApply={handleOpenApply} />

        {/* 11. Core Features Grid */}
        <WhyChooseUs />

        {/* 12. Regulated Trust Certifications */}
        <TrustSecurity />

        {/* 13. Customer reviews */}
        <Testimonials />

        {/* 14. QA accordion */}
        <FAQ />
      </main>

      {/* Footer Directory */}
      <Footer />

      {/* Popup Forms / Modals */}
      <ApplyModal 
        isOpen={isApplyOpen} 
        onClose={() => setIsApplyOpen(false)} 
        defaultProduct={selectedProduct}
        defaultAmount={preApprovedAmount}
      />

      <EligibilityModal 
        isOpen={isEligibilityOpen} 
        onClose={() => setIsEligibilityOpen(false)} 
        onOpenApply={handleOpenApply}
      />

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </div>
  );
}
