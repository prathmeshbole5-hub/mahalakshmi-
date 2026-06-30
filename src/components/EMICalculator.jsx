import React, { useState, useEffect } from 'react';
import { Landmark, Calendar, Percent, IndianRupee } from 'lucide-react';

export default function EMICalculator() {
  const [amount, setAmount] = useState(1000000); // 10 Lakhs
  const [rate, setRate] = useState(10.5); // 10.5%
  const [tenure, setTenure] = useState(5); // 5 years

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const principal = amount;
    const monthlyRate = rate / 12 / 100;
    const numberOfMonths = tenure * 12;

    let calculatedEmi = 0;
    if (monthlyRate === 0) {
      calculatedEmi = principal / numberOfMonths;
    } else {
      calculatedEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / 
                      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
    }

    const calculatedTotalPayment = calculatedEmi * numberOfMonths;
    const calculatedTotalInterest = calculatedTotalPayment - principal;

    setEmi(Math.round(calculatedEmi));
    setTotalInterest(Math.round(calculatedTotalInterest));
    setTotalPayment(Math.round(calculatedTotalPayment));
  }, [amount, rate, tenure]);

  const formatRupee = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // SVG Donut Calculations
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~314.16
  const interestRatio = totalPayment > 0 ? totalInterest / totalPayment : 0.5;
  const principalRatio = totalPayment > 0 ? amount / totalPayment : 0.5;

  const principalOffset = 0;
  const interestOffset = circumference * principalRatio;

  const principalStroke = circumference * principalRatio;
  const interestStroke = circumference * interestRatio;

  return (
    <section id="emi" className="py-24 bg-white relative overflow-hidden scroll-reveal">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-gold font-extrabold">Instant Estimator</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            Calculate Your Monthly EMI
          </h3>
          <p className="text-slate-500 text-base font-medium">
            Plan your finance beforehand. Move the sliders to check your monthly instalments, total interest payable, and customize according to your monthly budget.
          </p>
        </div>

        {/* Calculator layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Sliders Container (Left) */}
          <div className="lg:col-span-7 bg-neutralBg border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-8 shadow-premium">
            
            {/* Amount Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-slate-700 font-bold text-sm flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-gold" />
                  Loan Amount
                </label>
                <span className="text-primary font-extrabold text-lg px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                  {formatRupee(amount)}
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="50000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
              />
              <div className="flex justify-between text-xs text-slate-400 font-semibold">
                <span>₹1 Lakh</span>
                <span>₹50 Lakhs</span>
                <span>₹1 Crore</span>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-slate-700 font-bold text-sm flex items-center gap-2">
                  <Percent className="w-4 h-4 text-gold" />
                  Interest Rate (p.a.)
                </label>
                <span className="text-primary font-extrabold text-lg px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                  {rate}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
              />
              <div className="flex justify-between text-xs text-slate-400 font-semibold">
                <span>5%</span>
                <span>12.5%</span>
                <span>20%</span>
              </div>
            </div>

            {/* Tenure Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-slate-700 font-bold text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold" />
                  Tenure (Years)
                </label>
                <span className="text-primary font-extrabold text-lg px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                  {tenure} Yrs
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
              />
              <div className="flex justify-between text-xs text-slate-400 font-semibold">
                <span>1 Year</span>
                <span>15 Years</span>
                <span>30 Years</span>
              </div>
            </div>

          </div>

          {/* Results & Visual Chart (Right) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-primary to-slate-950 text-white rounded-3xl p-8 shadow-navy-glow border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full pointer-events-none"></div>

            {/* EMI Display */}
            <div className="text-center mb-8">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Your Monthly EMI</p>
              <h4 className="text-3xl md:text-4xl font-extrabold text-gold-gradient tracking-tight">
                {formatRupee(emi)}
              </h4>
            </div>

            {/* SVG Donut Chart */}
            <div className="relative w-44 h-44 flex items-center justify-center mb-8">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-slate-800"
                  strokeWidth="12"
                  fill="transparent"
                />
                {/* Principal Segment */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-gold"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={`${principalStroke} ${circumference}`}
                  strokeDashoffset={principalOffset}
                  style={{ transition: 'stroke-dasharray 0.3s ease' }}
                />
                {/* Interest Segment */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-secondary"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={`${interestStroke} ${circumference}`}
                  strokeDashoffset={-interestOffset}
                  style={{ transition: 'stroke-dasharray 0.3s ease' }}
                />
              </svg>
              {/* Center Text */}
              <div className="absolute text-center">
                <Landmark className="w-6 h-6 text-gold mx-auto mb-1 animate-pulse" />
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Breakup</span>
              </div>
            </div>

            {/* Breakdown numbers */}
            <div className="w-full space-y-4 pt-4 border-t border-slate-800/80">
              <div className="flex justify-between items-center text-sm font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-gold"></div>
                  <span className="text-slate-300">Principal Amount</span>
                </div>
                <span className="font-bold">{formatRupee(amount)}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-secondary border border-slate-700"></div>
                  <span className="text-slate-300">Interest Payable</span>
                </div>
                <span className="font-bold">{formatRupee(totalInterest)}</span>
              </div>
              
              <div className="flex justify-between items-center text-base font-extrabold pt-3 border-t border-dashed border-slate-800">
                <span className="text-gold-light">Total Payable</span>
                <span className="text-gold-gradient">{formatRupee(totalPayment)}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
