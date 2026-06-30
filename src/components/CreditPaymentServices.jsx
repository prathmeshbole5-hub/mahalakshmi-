import React, { useState } from 'react';
import { Wallet, Zap, Smartphone, Landmark, CheckCircle, Loader2, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export default function CreditPaymentServices() {
  const [activeService, setActiveService] = useState('card'); // 'card', 'fastag', 'mobile'
  
  // MOCK STATES
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // 1. Card Bill Pay State
  const [cardNo, setCardNo] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardAmt, setCardAmt] = useState('');

  // 2. FASTag State
  const [vehicleNo, setVehicleNo] = useState('');
  const [fastagAmt, setFastagAmt] = useState('');

  // 3. Mobile State
  const [phoneNo, setPhoneNo] = useState('');
  const [operator, setOperator] = useState('Jio');
  const [planAmt, setPlanAmt] = useState('299');

  const handleCardNoChange = (e) => {
    // Format card number as 4-4-4-4
    const input = e.target.value.replace(/\D/g, '');
    const trimmed = input.substring(0, 16);
    const matches = trimmed.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNo(parts.join(' '));
    } else {
      setCardNo(trimmed);
    }
  };

  const getCardType = () => {
    const firstDigit = cardNo.charAt(0);
    if (firstDigit === '4') return 'VISA';
    if (firstDigit === '5') return 'MASTERCARD';
    return 'CRED';
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (activeService === 'card') {
        setSuccessMsg(`Payment of ₹${Number(cardAmt).toLocaleString('en-IN')} to Credit Card ending in ${cardNo.slice(-4)} was successful!`);
        setCardNo(''); setCardName(''); setCardAmt('');
      } else if (activeService === 'fastag') {
        setSuccessMsg(`FASTag recharge of ₹${Number(fastagAmt).toLocaleString('en-IN')} for vehicle ${vehicleNo.toUpperCase()} was successful!`);
        setVehicleNo(''); setFastagAmt('');
      } else {
        setSuccessMsg(`Mobile top-up of ₹${planAmt} for operator ${operator} (${phoneNo}) was successful!`);
        setPhoneNo('');
      }
    }, 1800);
  };

  return (
    <section id="services" className="py-24 bg-neutralBg relative overflow-hidden scroll-reveal">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/5 rounded-full -translate-x-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-gold font-extrabold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Fintech Utility
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            Credit Services & Bill Payments
          </h3>
          <p className="text-slate-500 text-base font-medium">
            Clear credit card statements, recharge transport FASTags, or pay utility bills directly using our verified digital gateway.
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Side: Services Toggles (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Card Bill tab */}
            <div 
              onClick={() => { setActiveService('card'); setSuccess(false); }}
              className={`rounded-2xl p-5 border cursor-pointer transition-all flex items-start gap-4 ${
                activeService === 'card' 
                  ? 'bg-white border-gold shadow-premium' 
                  : 'bg-white/40 border-slate-200/60 hover:bg-white/80'
              }`}
            >
              <div className="p-3 bg-purple-500/10 text-purple-600 rounded-xl">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-primary text-sm">Credit Card Bills</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">Pay statements for any VISA, MasterCard, or RuPay card instantly.</p>
              </div>
            </div>

            {/* FASTag tab */}
            <div 
              onClick={() => { setActiveService('fastag'); setSuccess(false); }}
              className={`rounded-2xl p-5 border cursor-pointer transition-all flex items-start gap-4 ${
                activeService === 'fastag' 
                  ? 'bg-white border-gold shadow-premium' 
                  : 'bg-white/40 border-slate-200/60 hover:bg-white/80'
              }`}
            >
              <div className="p-3 bg-yellow-500/10 text-yellow-600 rounded-xl">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-primary text-sm">FASTag Recharge</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">Top-up national toll tags instantly to avoid toll-gate delays.</p>
              </div>
            </div>

            {/* Mobile tab */}
            <div 
              onClick={() => { setActiveService('mobile'); setSuccess(false); }}
              className={`rounded-2xl p-5 border cursor-pointer transition-all flex items-start gap-4 ${
                activeService === 'mobile' 
                  ? 'bg-white border-gold shadow-premium' 
                  : 'bg-white/40 border-slate-200/60 hover:bg-white/80'
              }`}
            >
              <div className="p-3 bg-pink-500/10 text-pink-600 rounded-xl">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-primary text-sm">Mobile & DTH Utility</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">Recharge prepaid plans or clear postpaid billing statements.</p>
              </div>
            </div>

          </div>

          {/* Right Side: Interactive Portal Mock (7 Cols) */}
          <div className="lg:col-span-7 bg-primary rounded-3xl p-6 md:p-8 shadow-navy-glow border border-slate-800 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full pointer-events-none"></div>

            {loading ? (
              /* Shimmer Loading State */
              <div className="min-h-[340px] flex flex-col items-center justify-center space-y-6">
                <Loader2 className="w-12 h-12 text-gold animate-spin" />
                <div className="text-center space-y-2">
                  <h4 className="text-lg font-bold">Securing Payment Channel...</h4>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Verifying billing statements with partner bank</p>
                </div>
              </div>
            ) : success ? (
              /* Success screen */
              <div className="min-h-[340px] flex flex-col items-center justify-center space-y-6 text-center animate-fade-in-up">
                <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-extrabold text-white">Transaction Success</h4>
                  <p className="text-slate-300 text-xs max-w-sm leading-relaxed">
                    {successMsg}
                  </p>
                </div>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Make Another Payment
                </button>
              </div>
            ) : (
              /* Payment Forms */
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                
                {/* 1. Credit Card Form layout */}
                {activeService === 'card' && (
                  <div className="space-y-5">
                    {/* Visual Mock Credit Card in form */}
                    <div className="w-full max-w-[320px] h-40 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 p-4 border border-slate-700/50 flex flex-col justify-between shadow-premium mx-auto">
                      <div className="flex justify-between items-start">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">VISA / MASTERCARD DETECT</span>
                        <span className="text-gold font-extrabold text-xs tracking-widest">{getCardType()}</span>
                      </div>
                      <p className="text-white font-mono text-sm tracking-widest text-center my-3">
                        {cardNo || '••••  ••••  ••••  ••••'}
                      </p>
                      <div className="flex justify-between items-end text-[8px] text-slate-500 uppercase font-bold">
                        <span>{cardName || 'CARDHOLDER NAME'}</span>
                        <span>EXP: 12/30</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Card Number</label>
                          <input
                            type="text"
                            placeholder="4000 1234 5678 9010"
                            value={cardNo}
                            onChange={handleCardNoChange}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Cardholder Name</label>
                          <input
                            type="text"
                            placeholder="e.g. MOHIT SHARMA"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value.toUpperCase())}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Bill Amount (₹)</label>
                        <input
                          type="number"
                          placeholder="e.g. 5000"
                          value={cardAmt}
                          onChange={(e) => setCardAmt(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. FASTag Form layout */}
                {activeService === 'fastag' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-slate-850">
                      <div className="flex items-center gap-2">
                        <Landmark className="w-5 h-5 text-gold" />
                        <span className="text-xs text-slate-300">National Highways Toll tag (NETC)</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Vehicle Registration Number</label>
                      <input
                        type="text"
                        placeholder="e.g. MH12AB1234"
                        value={vehicleNo}
                        onChange={(e) => setVehicleNo(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Recharge Amount (₹)</label>
                      <input
                        type="number"
                        placeholder="e.g. 500"
                        value={fastagAmt}
                        onChange={(e) => setFastagAmt(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* 3. Mobile Form layout */}
                {activeService === 'mobile' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Mobile Number</label>
                        <input
                          type="tel"
                          maxLength="10"
                          placeholder="e.g. 9876543210"
                          value={phoneNo}
                          onChange={(e) => setPhoneNo(e.target.value.replace(/\D/g, ''))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Operator</label>
                        <select
                          value={operator}
                          onChange={(e) => setOperator(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                        >
                          <option value="Jio">Jio Prepaid</option>
                          <option value="Airtel">Airtel Prepaid</option>
                          <option value="Vi">Vodafone Idea</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Select Voucher Pack</label>
                      <select
                        value={planAmt}
                        onChange={(e) => setPlanAmt(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                      >
                        <option value="299">₹299 (1.5 GB/Day, Unlimited Calls, 28 Days)</option>
                        <option value="719">₹719 (2.0 GB/Day, Unlimited Calls, 84 Days)</option>
                        <option value="2999">₹2,999 (2.5 GB/Day, Annual Pack, 365 Days)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Gateway Shield */}
                <div className="flex items-center gap-1.5 py-1.5 text-slate-500 text-[9px] font-bold uppercase tracking-wider border-t border-slate-850">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  <span>Verified by Bharat BillPay (BBPS) secure systems</span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full btn-gold py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-gold-glow"
                >
                  Authorize Payment <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
