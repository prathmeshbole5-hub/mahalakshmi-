import React, { useState, useEffect } from 'react';
import { Landmark, Calendar, Percent, IndianRupee, BarChart3, Coins, ShieldCheck, Sparkles, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

export default function FinancialTools({ onOpenApply }) {
  const [activeTab, setActiveTab] = useState('emi'); // 'emi', 'sip', 'fd', 'eligibility'

  // Formatter helper
  const formatRupee = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // 1. EMI CALCULATOR STATE
  const [emiAmount, setEmiAmount] = useState(1000000); // 10 L
  const [emiRate, setEmiRate] = useState(10.5);
  const [emiTenure, setEmiTenure] = useState(5);
  const [emiResult, setEmiResult] = useState({ emi: 0, interest: 0, total: 0 });

  useEffect(() => {
    const principal = emiAmount;
    const monthlyRate = emiRate / 12 / 100;
    const months = emiTenure * 12;

    let calEmi = 0;
    if (monthlyRate > 0) {
      calEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    } else {
      calEmi = principal / months;
    }

    const totalPay = calEmi * months;
    const totalInt = totalPay - principal;

    setEmiResult({
      emi: Math.round(calEmi),
      interest: Math.round(totalInt),
      total: Math.round(totalPay),
    });
  }, [emiAmount, emiRate, emiTenure]);

  // 2. SIP CALCULATOR STATE
  const [sipAmount, setSipAmount] = useState(5000); // 5000/mo
  const [sipRate, setSipRate] = useState(12); // 12%
  const [sipTenure, setSipTenure] = useState(10); // 10 years
  const [sipResult, setSipResult] = useState({ invested: 0, gain: 0, total: 0 });

  useEffect(() => {
    const P = sipAmount;
    const i = sipRate / 12 / 100;
    const n = sipTenure * 12;

    let total = 0;
    if (i > 0) {
      total = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    } else {
      total = P * n;
    }

    const invested = P * n;
    const gain = total - invested;

    setSipResult({
      invested: Math.round(invested),
      gain: Math.round(gain),
      total: Math.round(total),
    });
  }, [sipAmount, sipRate, sipTenure]);

  // 3. FD CALCULATOR STATE
  const [fdAmount, setFdAmount] = useState(100000); // 1 L
  const [fdRate, setFdRate] = useState(7.1); // 7.1%
  const [fdTenure, setFdTenure] = useState(5); // 5 Yrs
  const [fdResult, setFdResult] = useState({ invested: 0, interest: 0, total: 0 });

  useEffect(() => {
    const P = fdAmount;
    const r = fdRate / 100;
    const t = fdTenure;

    // FD compound interest (assume annual compounding for simplicity)
    const total = P * Math.pow(1 + r, t);
    const interest = total - P;

    setFdResult({
      invested: P,
      interest: Math.round(interest),
      total: Math.round(total),
    });
  }, [fdAmount, fdRate, fdTenure]);

  // 4. ELIGIBILITY INLINE STATE
  const [elIncome, setElIncome] = useState(50000);
  const [elEmis, setElEmis] = useState(5000);
  const [elDesired, setElDesired] = useState(500000);
  const [elScore, setElScore] = useState('750+');
  const [elLoading, setElLoading] = useState(false);
  const [elResult, setElResult] = useState(null);

  const handleEligibilityCheck = (e) => {
    e.preventDefault();
    setElLoading(true);

    setTimeout(() => {
      setElLoading(false);
      const disposable = elIncome - elEmis;
      if (disposable <= 10000) {
        setElResult({
          approved: false,
          reason: 'Monthly disposable income is low. Clear existing EMIs first.',
        });
        return;
      }

      let multiplier = 8;
      let rate = '10.99%';
      if (elScore === '750+') { multiplier = 15; rate = '8.40%'; }
      else if (elScore === '650-750') { multiplier = 10; rate = '10.50%'; }
      else if (elScore === '600-650') { multiplier = 5; rate = '13.50%'; }
      else {
        setElResult({
          approved: false,
          reason: 'CIBIL score is below threshold. Pay dues to improve rating.',
        });
        return;
      }

      let limit = disposable * multiplier;
      if (limit > elDesired) limit = elDesired;
      if (limit > 2500000) limit = 2500000;

      setElResult({
        approved: true,
        amount: Math.round(limit),
        rate,
        tenure: multiplier === 15 ? 7 : 5,
      });
    }, 1200);
  };

  // SVG Donut Calculations
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~314.16

  const getDonutSegments = () => {
    let ratio1 = 0.5;
    let ratio2 = 0.5;
    let color1 = 'stroke-gold';
    let color2 = 'stroke-secondary';

    if (activeTab === 'emi') {
      ratio1 = emiResult.total > 0 ? emiAmount / emiResult.total : 0.5;
      ratio2 = emiResult.total > 0 ? emiResult.interest / emiResult.total : 0.5;
    } else if (activeTab === 'sip') {
      ratio1 = sipResult.total > 0 ? sipResult.invested / sipResult.total : 0.5;
      ratio2 = sipResult.total > 0 ? sipResult.gain / sipResult.total : 0.5;
      color2 = 'stroke-green-500'; // Wealth Gain green
    } else if (activeTab === 'fd') {
      ratio1 = fdResult.total > 0 ? fdAmount / fdResult.total : 0.5;
      ratio2 = fdResult.total > 0 ? fdResult.interest / fdResult.total : 0.5;
      color2 = 'stroke-cyan-500';
    }

    const stroke1 = circumference * ratio1;
    const stroke2 = circumference * ratio2;
    const offset2 = circumference * ratio1;

    return { stroke1, stroke2, offset2, color1, color2 };
  };

  const donut = getDonutSegments();

  return (
    <section id="emi" className="py-24 bg-white relative overflow-hidden scroll-reveal">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-gold font-extrabold">Interactive Calculators</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            Financial Planning & Estimator Tools
          </h3>
          <p className="text-slate-500 text-base font-medium">
            Calculate your loan repayments, compound mutual fund SIP wealth, secure FD earnings, or verify credit eligibility instantly.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1 bg-neutralBg border border-slate-200 rounded-2xl max-w-lg w-full justify-between shadow-premium overflow-x-auto">
            <button
              onClick={() => setActiveTab('emi')}
              className={`flex-grow py-3 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === 'emi' ? 'bg-primary text-white shadow-premium' : 'text-slate-400 hover:text-primary'}`}
            >
              Loan EMI
            </button>
            <button
              onClick={() => setActiveTab('sip')}
              className={`flex-grow py-3 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === 'sip' ? 'bg-primary text-white shadow-premium' : 'text-slate-400 hover:text-primary'}`}
            >
              SIP compounding
            </button>
            <button
              onClick={() => setActiveTab('fd')}
              className={`flex-grow py-3 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === 'fd' ? 'bg-primary text-white shadow-premium' : 'text-slate-400 hover:text-primary'}`}
            >
              Fixed Deposit
            </button>
            <button
              onClick={() => setActiveTab('eligibility')}
              className={`flex-grow py-3 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === 'eligibility' ? 'bg-primary text-white shadow-premium' : 'text-slate-400 hover:text-primary'}`}
            >
              Loan Eligibility
            </button>
          </div>
        </div>

        {/* Active Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Inputs Section (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-neutralBg border border-slate-200/60 rounded-3xl p-6 md:p-8 flex flex-col justify-center shadow-premium">
            
            {/* EMI CALC TOOL */}
            {activeTab === 'emi' && (
              <div className="space-y-8">
                {/* Amount */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-700 font-bold text-sm flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-gold" /> Loan Amount
                    </label>
                    <span className="text-primary font-extrabold text-lg px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                      {formatRupee(emiAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="50000"
                    value={emiAmount}
                    onChange={(e) => setEmiAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-bold">
                    <span>1 Lakh</span>
                    <span>1 Crore</span>
                  </div>
                </div>

                {/* Rate */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-700 font-bold text-sm flex items-center gap-2">
                      <Percent className="w-4 h-4 text-gold" /> Interest Rate (p.a.)
                    </label>
                    <span className="text-primary font-extrabold text-lg px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                      {emiRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="0.1"
                    value={emiRate}
                    onChange={(e) => setEmiRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-bold">
                    <span>5%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-700 font-bold text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gold" /> Loan Tenure (Years)
                    </label>
                    <span className="text-primary font-extrabold text-lg px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                      {emiTenure} Yrs
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={emiTenure}
                    onChange={(e) => setEmiTenure(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-bold">
                    <span>1 Yr</span>
                    <span>30 Yrs</span>
                  </div>
                </div>
              </div>
            )}

            {/* SIP CALC TOOL */}
            {activeTab === 'sip' && (
              <div className="space-y-8">
                {/* Monthly Investment */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-700 font-bold text-sm flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-gold" /> Monthly SIP Amount
                    </label>
                    <span className="text-primary font-extrabold text-lg px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                      {formatRupee(sipAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={sipAmount}
                    onChange={(e) => setSipAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-bold">
                    <span>₹500 /mo</span>
                    <span>₹1 Lakh /mo</span>
                  </div>
                </div>

                {/* Returns Rate */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-700 font-bold text-sm flex items-center gap-2">
                      <Percent className="w-4 h-4 text-gold" /> Expected Returns (p.a.)
                    </label>
                    <span className="text-primary font-extrabold text-lg px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                      {sipRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="0.5"
                    value={sipRate}
                    onChange={(e) => setSipRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-bold">
                    <span>5%</span>
                    <span>30%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-700 font-bold text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gold" /> Investment Duration
                    </label>
                    <span className="text-primary font-extrabold text-lg px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                      {sipTenure} Yrs
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={sipTenure}
                    onChange={(e) => setSipTenure(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-bold">
                    <span>1 Yr</span>
                    <span>30 Yrs</span>
                  </div>
                </div>
              </div>
            )}

            {/* FD CALC TOOL */}
            {activeTab === 'fd' && (
              <div className="space-y-8">
                {/* FD Principal */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-700 font-bold text-sm flex items-center gap-2">
                      <Coins className="w-4 h-4 text-gold" /> Fixed Deposit Principal
                    </label>
                    <span className="text-primary font-extrabold text-lg px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                      {formatRupee(fdAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="5000000"
                    step="10000"
                    value={fdAmount}
                    onChange={(e) => setFdAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-bold">
                    <span>₹10,000</span>
                    <span>₹50 Lakhs</span>
                  </div>
                </div>

                {/* FD Rate */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-700 font-bold text-sm flex items-center gap-2">
                      <Percent className="w-4 h-4 text-gold" /> Interest Rate (p.a.)
                    </label>
                    <span className="text-primary font-extrabold text-lg px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                      {fdRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    step="0.1"
                    value={fdRate}
                    onChange={(e) => setFdRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-bold">
                    <span>3%</span>
                    <span>15%</span>
                  </div>
                </div>

                {/* FD Tenure */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-700 font-bold text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gold" /> Duration (Years)
                    </label>
                    <span className="text-primary font-extrabold text-lg px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                      {fdTenure} Yrs
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={fdTenure}
                    onChange={(e) => setFdTenure(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-bold">
                    <span>1 Yr</span>
                    <span>15 Yrs</span>
                  </div>
                </div>
              </div>
            )}

            {/* INLINE ELIGIBILITY CHECK TOOL */}
            {activeTab === 'eligibility' && (
              <form onSubmit={handleEligibilityCheck} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Monthly Income (₹)</label>
                    <input
                      type="number"
                      value={elIncome}
                      onChange={(e) => setElIncome(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Existing EMIs (₹)</label>
                    <input
                      type="number"
                      value={elEmis}
                      onChange={(e) => setElEmis(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Desired Loan (₹)</label>
                    <input
                      type="number"
                      value={elDesired}
                      onChange={(e) => setElDesired(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Estimated CIBIL</label>
                    <select
                      value={elScore}
                      onChange={(e) => setElScore(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                    >
                      <option value="750+">750+ (Excellent)</option>
                      <option value="650-750">650-749 (Good)</option>
                      <option value="600-650">600-649 (Fair)</option>
                      <option value="300-600">Below 600 (Poor)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={elLoading}
                  className="w-full btn-gold py-3.5 rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-gold-glow mt-4"
                >
                  {elLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Calculating...
                    </>
                  ) : (
                    'Check Pre-Approved Limit'
                  )}
                </button>
              </form>
            )}

          </div>

          {/* Results Side Display (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-primary to-slate-950 text-white rounded-3xl p-8 shadow-navy-glow border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full pointer-events-none"></div>

            {/* Render results depending on activeTab */}
            {activeTab === 'emi' && (
              <>
                <div className="text-center mb-8">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Monthly Loan EMI</p>
                  <h4 className="text-3xl font-extrabold text-gold-gradient tracking-tight">
                    {formatRupee(emiResult.emi)}
                  </h4>
                </div>

                <div className="relative w-40 h-40 flex items-center justify-center mb-8">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r={radius} className="stroke-slate-800" strokeWidth="10" fill="transparent" />
                    <circle cx="60" cy="60" r={radius} className={donut.color1} strokeWidth="10" fill="transparent" strokeDasharray={`${donut.stroke1} ${circumference}`} />
                    <circle cx="60" cy="60" r={radius} className={donut.color2} strokeWidth="10" fill="transparent" strokeDasharray={`${donut.stroke2} ${circumference}`} strokeDashoffset={-donut.offset2} />
                  </svg>
                  <div className="absolute text-center">
                    <Landmark className="w-5 h-5 text-gold mx-auto mb-0.5" />
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">EMI Calc</span>
                  </div>
                </div>

                <div className="w-full space-y-3 pt-3 border-t border-slate-800/80 text-xs">
                  <div className="flex justify-between items-center font-medium">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-gold"></span> Principal</span>
                    <span className="font-bold">{formatRupee(emiAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center font-medium">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-secondary"></span> Interest Payable</span>
                    <span className="font-bold">{formatRupee(emiResult.interest)}</span>
                  </div>
                  <div className="flex justify-between items-center font-extrabold pt-2.5 border-t border-dashed border-slate-800 text-sm">
                    <span className="text-gold-light">Total Payable</span>
                    <span className="text-gold-gradient">{formatRupee(emiResult.total)}</span>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'sip' && (
              <>
                <div className="text-center mb-8">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Expected SIP Wealth</p>
                  <h4 className="text-3xl font-extrabold text-gold-gradient tracking-tight">
                    {formatRupee(sipResult.total)}
                  </h4>
                </div>

                <div className="relative w-40 h-40 flex items-center justify-center mb-8">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r={radius} className="stroke-slate-800" strokeWidth="10" fill="transparent" />
                    <circle cx="60" cy="60" r={radius} className={donut.color1} strokeWidth="10" fill="transparent" strokeDasharray={`${donut.stroke1} ${circumference}`} />
                    <circle cx="60" cy="60" r={radius} className={donut.color2} strokeWidth="10" fill="transparent" strokeDasharray={`${donut.stroke2} ${circumference}`} strokeDashoffset={-donut.offset2} />
                  </svg>
                  <div className="absolute text-center">
                    <BarChart3 className="w-5 h-5 text-gold mx-auto mb-0.5" />
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">SIP Growth</span>
                  </div>
                </div>

                <div className="w-full space-y-3 pt-3 border-t border-slate-800/80 text-xs">
                  <div className="flex justify-between items-center font-medium">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-gold"></span> Invested Amount</span>
                    <span className="font-bold">{formatRupee(sipResult.invested)}</span>
                  </div>
                  <div className="flex justify-between items-center font-medium">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-green-500"></span> Wealth Gain</span>
                    <span className="font-bold text-green-400">{formatRupee(sipResult.gain)}</span>
                  </div>
                  <div className="flex justify-between items-center font-extrabold pt-2.5 border-t border-dashed border-slate-800 text-sm">
                    <span className="text-gold-light">Total Maturity</span>
                    <span className="text-gold-gradient">{formatRupee(sipResult.total)}</span>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'fd' && (
              <>
                <div className="text-center mb-8">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Maturity Value</p>
                  <h4 className="text-3xl font-extrabold text-gold-gradient tracking-tight">
                    {formatRupee(fdResult.total)}
                  </h4>
                </div>

                <div className="relative w-40 h-40 flex items-center justify-center mb-8">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r={radius} className="stroke-slate-800" strokeWidth="10" fill="transparent" />
                    <circle cx="60" cy="60" r={radius} className={donut.color1} strokeWidth="10" fill="transparent" strokeDasharray={`${donut.stroke1} ${circumference}`} />
                    <circle cx="60" cy="60" r={radius} className={donut.color2} strokeWidth="10" fill="transparent" strokeDasharray={`${donut.stroke2} ${circumference}`} strokeDashoffset={-donut.offset2} />
                  </svg>
                  <div className="absolute text-center">
                    <Coins className="w-5 h-5 text-gold mx-auto mb-0.5" />
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">FD Gain</span>
                  </div>
                </div>

                <div className="w-full space-y-3 pt-3 border-t border-slate-800/80 text-xs">
                  <div className="flex justify-between items-center font-medium">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-gold"></span> FD Invested</span>
                    <span className="font-bold">{formatRupee(fdAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center font-medium">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-cyan-500"></span> Interest Earned</span>
                    <span className="font-bold text-cyan-400">{formatRupee(fdResult.interest)}</span>
                  </div>
                  <div className="flex justify-between items-center font-extrabold pt-2.5 border-t border-dashed border-slate-800 text-sm">
                    <span className="text-gold-light">Maturity Payout</span>
                    <span className="text-gold-gradient">{formatRupee(fdResult.total)}</span>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'eligibility' && (
              <div className="w-full h-full flex flex-col items-center justify-center min-h-[260px] text-center">
                {!elResult ? (
                  <div className="space-y-3">
                    <Sparkles className="w-10 h-10 text-gold mx-auto animate-pulse" />
                    <h4 className="text-lg font-bold">Input Details</h4>
                    <p className="text-slate-400 text-xs leading-relaxed max-w-[240px] mx-auto">
                      Fill out income, EMIs, and credit scores to verify loan limits on-screen.
                    </p>
                  </div>
                ) : elResult.approved ? (
                  <div className="space-y-6 animate-fade-in-up w-full">
                    <div className="w-12 h-12 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">Pre-Approved Loan Limit</p>
                      <h4 className="text-2xl font-extrabold text-gold-gradient tracking-tight">{formatRupee(elResult.amount)}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-t border-slate-850 pt-4 text-xs text-left max-w-xs mx-auto">
                      <div>
                        <span className="block text-slate-500 uppercase tracking-wider text-[9px] font-extrabold">ROI</span>
                        <span className="text-gold font-bold">{elResult.rate} p.a.</span>
                      </div>
                      <div>
                        <span className="block text-slate-500 uppercase tracking-wider text-[9px] font-extrabold">Tenure</span>
                        <span className="text-white font-bold">{elResult.tenure} Years</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenApply('Personal Loan', elResult.amount)}
                      className="w-full btn-gold py-3.5 rounded-xl font-bold text-xs flex justify-center items-center gap-1 shadow-gold-glow max-w-xs mx-auto"
                    >
                      Proceed to Apply <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-fade-in-up max-w-xs mx-auto text-center">
                    <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto">
                      <Landmark className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-red-400">Application Deferred</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {elResult.reason}
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
