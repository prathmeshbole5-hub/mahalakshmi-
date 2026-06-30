import React, { useState } from 'react';
import { X, ShieldCheck, Loader2, Sparkles, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

export default function EligibilityModal({ isOpen, onClose, onOpenApply }) {
  const [formData, setFormData] = useState({
    income: '',
    emis: '0',
    desiredAmount: '',
    age: '',
    scoreRange: '750+',
  });

  const [errors, setErrors] = useState({});
  const [loadingStep, setLoadingStep] = useState(0); // 0: Form, 1: Step 1, 2: Step 2, 3: Step 3, 4: Approved screen
  const [approvalResult, setApprovalResult] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.income || Number(formData.income) <= 0) newErrors.income = 'Enter your net monthly income';
    if (Number(formData.emis) < 0) newErrors.emis = 'Cannot be negative';
    if (!formData.desiredAmount || Number(formData.desiredAmount) <= 0) newErrors.desiredAmount = 'Enter desired loan amount';
    if (!formData.age || Number(formData.age) < 21 || Number(formData.age) > 65) {
      newErrors.age = 'Age must be between 21 and 65 years';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const runEligibilityCheck = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Start loading steps
    setLoadingStep(1);

    setTimeout(() => {
      setLoadingStep(2);
      setTimeout(() => {
        setLoadingStep(3);
        setTimeout(() => {
          // Calculate mock eligibility
          calculateEligibility();
          setLoadingStep(4);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const calculateEligibility = () => {
    const income = Number(formData.income);
    const emis = Number(formData.emis);
    const desired = Number(formData.desiredAmount);
    const score = formData.scoreRange;

    // Debt to income ratio assessment
    const disposableIncome = income - emis;
    if (disposableIncome <= 10000) {
      setApprovalResult({
        approved: false,
        reason: 'Low disposable income. Try clearing existing outstanding dues first.',
      });
      return;
    }

    let multiplier = 8;
    let rate = '11.5%';
    let tenure = 60; // Months

    if (score === '300-600') {
      setApprovalResult({
        approved: false,
        reason: 'Credit Score requires improvement. We recommend paying off outstanding credit card dues and checking back in 3 months.',
      });
      return;
    } else if (score === '600-650') {
      multiplier = 5;
      rate = '14.25%';
      tenure = 36;
    } else if (score === '650-750') {
      multiplier = 10;
      rate = '10.99%';
      tenure = 60;
    } else if (score === '750+') {
      multiplier = 15;
      rate = '8.40%';
      tenure = 84;
    }

    let limit = disposableIncome * multiplier;
    if (limit > desired) {
      limit = desired;
    }
    
    // Cap at a max of 25 Lakhs for this mock assessment
    if (limit > 2500000) {
      limit = 2500000;
    }

    setApprovalResult({
      approved: true,
      amount: Math.round(limit),
      rate,
      tenure: tenure / 12,
    });
  };

  const handleReset = () => {
    setFormData({
      income: '',
      emis: '0',
      desiredAmount: '',
      age: '',
      scoreRange: '750+',
    });
    setErrors({});
    setLoadingStep(0);
    setApprovalResult(null);
    onClose();
  };

  const formatRupee = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleProceedApply = () => {
    const approvedAmount = approvalResult?.amount || formData.desiredAmount;
    handleReset();
    onOpenApply('Personal Loan', approvedAmount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-primary/80 backdrop-blur-sm transition-opacity" 
        onClick={handleReset}
      ></div>

      {/* Modal Dialog Content */}
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-navy-glow relative z-10 animate-fade-in border border-slate-200">
        
        {/* Close Button */}
        <button 
          onClick={handleReset}
          className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
        >
          <X className="w-6 h-6" />
        </button>

        {loadingStep === 0 && (
          /* Eligibility check form view */
          <div className="p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold" />
              <h3 className="text-2xl font-extrabold text-primary">Eligibility Checker</h3>
            </div>

            <form onSubmit={runEligibilityCheck} className="space-y-4">
              
              {/* Income & Existing EMIs (2-col) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Net Monthly Income (₹)</label>
                  <input
                    type="number"
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    placeholder="e.g. 50000"
                    className={`w-full bg-slate-50 border ${errors.income ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-gold transition-colors`}
                  />
                  {errors.income && <p className="text-[10px] text-red-500 font-bold">{errors.income}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Existing Monthly EMIs (₹)</label>
                  <input
                    type="number"
                    name="emis"
                    value={formData.emis}
                    onChange={handleChange}
                    placeholder="e.g. 5000 (0 if none)"
                    className={`w-full bg-slate-50 border ${errors.emis ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-gold transition-colors`}
                  />
                  {errors.emis && <p className="text-[10px] text-red-500 font-bold">{errors.emis}</p>}
                </div>
              </div>

              {/* Desired Amount & Age (2-col) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Desired Loan Amount (₹)</label>
                  <input
                    type="number"
                    name="desiredAmount"
                    value={formData.desiredAmount}
                    onChange={handleChange}
                    placeholder="e.g. 300000"
                    className={`w-full bg-slate-50 border ${errors.desiredAmount ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-gold transition-colors`}
                  />
                  {errors.desiredAmount && <p className="text-[10px] text-red-500 font-bold">{errors.desiredAmount}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Age (Years)</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g. 28 (21 - 65)"
                    className={`w-full bg-slate-50 border ${errors.age ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-gold transition-colors`}
                  />
                  {errors.age && <p className="text-[10px] text-red-500 font-bold">{errors.age}</p>}
                </div>
              </div>

              {/* Credit Score Range Selection */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Estimated Credit Score (CIBIL)</label>
                <select
                  name="scoreRange"
                  value={formData.scoreRange}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-primary focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="750+">750 or above (Excellent)</option>
                  <option value="650-750">650 to 749 (Good)</option>
                  <option value="600-650">600 to 649 (Fair)</option>
                  <option value="300-600">Below 600 (Needs Improvement)</option>
                </select>
              </div>

              {/* SSL Security Info */}
              <div className="flex items-center gap-2 py-1 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Zero impact check. Soft credit-pull verification</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full btn-gold py-4 rounded-xl flex items-center justify-center gap-2 shadow-gold-glow text-base"
              >
                Check Loan Eligibility
              </button>

            </form>
          </div>
        )}

        {/* Loading Step 1 */}
        {loadingStep === 1 && (
          <div className="p-8 text-center space-y-6">
            <Loader2 className="w-12 h-12 text-gold animate-spin mx-auto" />
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-primary">Accessing Bureau Databases...</h4>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Fetching live credit scores from Experian & CIBIL</p>
            </div>
          </div>
        )}

        {/* Loading Step 2 */}
        {loadingStep === 2 && (
          <div className="p-8 text-center space-y-6">
            <Loader2 className="w-12 h-12 text-gold animate-spin mx-auto" />
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-primary">Analyzing Financial Health...</h4>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Evaluating Debt-to-Income (DTI) metrics</p>
            </div>
          </div>
        )}

        {/* Loading Step 3 */}
        {loadingStep === 3 && (
          <div className="p-8 text-center space-y-6">
            <Loader2 className="w-12 h-12 text-gold animate-spin mx-auto" />
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-primary">Negotiating Partner Offers...</h4>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Matching with lower interest lending options</p>
            </div>
          </div>
        )}

        {/* Final Approval Screen */}
        {loadingStep === 4 && approvalResult && (
          <div className="p-6 sm:p-8 text-center space-y-6 animate-fade-in-up">
            
            {approvalResult.approved ? (
              /* Congratulations Box */
              <>
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
                  <CheckCircle className="w-10 h-10" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-2xl font-extrabold text-primary">You are Eligible!</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Pre-Approved Offer Calculated</p>
                </div>

                <div className="bg-gradient-to-br from-primary to-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-navy-glow max-w-sm mx-auto space-y-4">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Approved Limit</p>
                    <h4 className="text-3xl font-extrabold text-gold-gradient tracking-tight">{formatRupee(approvalResult.amount)}</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-t border-slate-800/80 pt-3 text-left">
                    <div>
                      <p className="text-[9px] text-slate-500 font-bold uppercase">ROI (Fixed)</p>
                      <p className="text-sm font-bold text-gold">{approvalResult.rate} p.a.</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-500 font-bold uppercase">Tenure</p>
                      <p className="text-sm font-bold text-white">{approvalResult.tenure} Years</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-md mx-auto">
                  Click below to lock in this special pre-approved rate. This pre-approval is valid for the next 24 hours.
                </p>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={handleProceedApply}
                    className="w-full btn-gold py-4 rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-gold-glow text-base"
                  >
                    Proceed to Application <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-primary font-bold rounded-xl transition-all"
                  >
                    Close Window
                  </button>
                </div>
              </>
            ) : (
              /* Soft Rejection/Advice Screen */
              <>
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500">
                  <AlertCircle className="w-10 h-10" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-2xl font-extrabold text-primary">Ineligible at Present</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Offer Calculation Deferred</p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-left max-w-sm mx-auto">
                  <h4 className="text-sm font-bold text-amber-800 mb-1">Reason:</h4>
                  <p className="text-xs text-amber-900 font-medium leading-relaxed">
                    {approvalResult.reason}
                  </p>
                </div>

                <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-md mx-auto">
                  We care about your credit health. Taking on too many loans when debt indicators are high can permanently impact your bureau profile.
                </p>

                <button
                  onClick={handleReset}
                  className="w-full py-3.5 bg-primary hover:bg-secondary text-white font-bold rounded-xl transition-all"
                >
                  Acknowledge & Close
                </button>
              </>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
