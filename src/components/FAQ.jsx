import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What are the basic eligibility criteria for a Personal Loan?',
    answer: 'To qualify for a Personal Loan, you must be a salaried or self-employed Indian citizen aged between 21 and 60. You should have a minimum monthly income of ₹25,000, and a healthy credit (CIBIL) score of 650 or above is highly recommended.',
  },
  {
    question: 'Does checking my credit score on Shree Mahalaxmi Finance lower my score?',
    answer: 'No! When you check your credit score through our platform, it is treated as a "soft inquiry" (or soft pull). Soft inquiries do not impact your credit score or credit rating in any way, unlike a hard pull which happens when lenders process active loan disbursements.',
  },
  {
    question: 'What documentation is required for a paperless loan application?',
    answer: 'Since our entire journey is 100% digital, you only need: (1) Identity Proof (PAN Card), (2) Address Proof (Aadhaar Card linked to your active mobile number), and (3) Financial Proof (Bank statements for the last 6 months or NetBanking login credentials).',
  },
  {
    question: 'How long does the loan approval and disbursement process take?',
    answer: 'Once you submit your application and verify your Aadhaar e-KYC, our digital assessment engine gives instant approval in under 5 minutes. Upon approval and automated e-Sign of the agreement, the loan amount is typically disbursed directly into your bank account within 1 to 2 hours.',
  },
  {
    question: 'Can I pay off my loan early? Are there any prepayment charges?',
    answer: 'Yes, you can prepay or foreclose your loan early. Part-prepayment or full foreclosure policies vary depending on the partner bank or NBFC lending partner. Many of our partner lenders offer zero foreclosure charges after the first 6 monthly EMI payments are completed.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faq" className="py-24 bg-neutralBg relative overflow-hidden scroll-reveal">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full -translate-x-20 translate-y-20 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-gold font-extrabold">Got Questions?</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            Frequently Asked Questions
          </h3>
          <p className="text-slate-500 text-base font-medium">
            Find quick answers to common queries regarding our products, interest rates, documentation, and verification processes.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-premium transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 px-6 flex justify-between items-center text-left hover:bg-neutralBg transition-colors"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? 'text-gold' : 'text-slate-400'}`} />
                    <span className="font-bold text-sm md:text-base text-primary">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-1 rounded-full ${isOpen ? 'bg-gold/15 text-gold-dark' : 'bg-slate-100 text-slate-500'}`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Content Section */}
                <div 
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[300px] border-t border-slate-100' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 text-sm md:text-base text-slate-500 font-medium leading-relaxed bg-white">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
