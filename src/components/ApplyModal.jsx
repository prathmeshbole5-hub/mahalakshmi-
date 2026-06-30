import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShieldCheck, Loader2 } from 'lucide-react';

export default function ApplyModal({ isOpen, onClose, defaultProduct, defaultAmount }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    product: '',
    amount: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refId, setRefId] = useState('');

  // Prefill product and amount if defaults change
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        product: defaultProduct || prev.product,
        amount: defaultAmount ? String(defaultAmount) : prev.amount,
      }));
    }
  }, [defaultProduct, defaultAmount, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when editing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile Number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email ID is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.product) newErrors.product = 'Select a financial product';
    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = 'Enter a valid amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Mock API loading call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Generate mock ref ID
      const randomRef = 'SMF-' + Math.floor(100000 + Math.random() * 900000);
      setRefId(randomRef);
    }, 1800);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      mobile: '',
      email: '',
      product: '',
      amount: '',
    });
    setErrors({});
    setIsSuccess(false);
    onClose();
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

        {!isSuccess ? (
          /* Application Form view */
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-primary">Apply Online</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Fill out the application below, and our automated engine will review your request.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name (As per PAN)</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Mohit Sharma"
                  className={`w-full bg-slate-50 border ${errors.fullName ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-gold transition-colors`}
                />
                {errors.fullName && <p className="text-[10px] text-red-500 font-bold">{errors.fullName}</p>}
              </div>

              {/* Mobile Number & Email (2-col on small screens) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    maxLength="10"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="10-Digit number"
                    className={`w-full bg-slate-50 border ${errors.mobile ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-gold transition-colors`}
                  />
                  {errors.mobile && <p className="text-[10px] text-red-500 font-bold">{errors.mobile}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email ID</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@email.com"
                    className={`w-full bg-slate-50 border ${errors.email ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-gold transition-colors`}
                  />
                  {errors.email && <p className="text-[10px] text-red-500 font-bold">{errors.email}</p>}
                </div>
              </div>

              {/* Product Type & Amount (2-col) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Required Product</label>
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className={`w-full bg-slate-50 border ${errors.product ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm text-primary focus:outline-none focus:border-gold transition-colors`}
                  >
                    <option value="">Select Option</option>
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Home Loan">Home Loan</option>
                    <option value="Car Loan">Car Loan</option>
                    <option value="Business Loan">Business Loan</option>
                    <option value="Education Loan">Education Loan</option>
                    <option value="Mahalaxmi Aura Credit Card">Mahalaxmi Aura Credit Card</option>
                    <option value="Mahalaxmi Elevate Credit Card">Mahalaxmi Elevate Credit Card</option>
                    <option value="Mahalaxmi Reserve Credit Card">Mahalaxmi Reserve Credit Card</option>
                  </select>
                  {errors.product && <p className="text-[10px] text-red-500 font-bold">{errors.product}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Required Amount (₹)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="e.g. 500000"
                    className={`w-full bg-slate-50 border ${errors.amount ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-gold transition-colors`}
                  />
                  {errors.amount && <p className="text-[10px] text-red-500 font-bold">{errors.amount}</p>}
                </div>
              </div>

              {/* Secure tag */}
              <div className="flex items-center gap-2 py-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Your application is encrypted using 256-bit SSL security</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-gold py-4 rounded-xl flex items-center justify-center gap-2 shadow-gold-glow text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Application...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>

            </form>
          </div>
        ) : (
          /* Animated success modal view */
          <div className="p-8 text-center space-y-6 animate-fade-in-up">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
              <CheckCircle className="w-16 h-16 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-primary">Application Submitted!</h3>
              <p className="text-sm text-slate-500 font-medium">
                Congratulations! Your application for **{formData.product}** has been successfully registered.
              </p>
            </div>

            {/* Reference Card block */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm mx-auto space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase">
                <span>Application ID</span>
                <span className="text-primary font-bold">{refId}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase">
                <span>Status</span>
                <span className="text-green-600 font-bold">Verification Pending</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-md mx-auto">
              Our automated engine has initiated credit scoring. A dedicated relationship manager will contact you at **{formData.mobile}** within the next 30 minutes to complete the quick paperless documentation.
            </p>

            <button
              onClick={handleReset}
              className="w-full py-3.5 bg-primary hover:bg-secondary text-white font-bold rounded-xl transition-all"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
