import React, { useState } from 'react';
import { X, Lock, Phone, Loader2, CheckCircle, ShieldCheck } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    mobile: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({ mobile: '', password: '' });
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
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-navy-glow relative z-10 animate-fade-in border border-slate-200">
        
        {/* Close Button */}
        <button 
          onClick={handleReset}
          className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
        >
          <X className="w-6 h-6" />
        </button>

        {!isSuccess ? (
          /* Form Content */
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-primary">Customer Portal</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Enter your credentials to log in to your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Mobile Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Registered Mobile</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    name="mobile"
                    maxLength="10"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="10-Digit mobile number"
                    className={`w-full bg-slate-55 border ${errors.mobile ? 'border-red-400' : 'border-slate-200'} rounded-xl pl-11 pr-4 py-3 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-gold transition-colors`}
                  />
                </div>
                {errors.mobile && <p className="text-[10px] text-red-500 font-bold">{errors.mobile}</p>}
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                  <a href="#" className="text-[10px] font-bold text-gold-dark hover:underline">Forgot Password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className={`w-full bg-slate-55 border ${errors.password ? 'border-red-400' : 'border-slate-200'} rounded-xl pl-11 pr-4 py-3 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-gold transition-colors`}
                  />
                </div>
                {errors.password && <p className="text-[10px] text-red-500 font-bold">{errors.password}</p>}
              </div>

              {/* Secure tag */}
              <div className="flex items-center gap-1.5 py-1 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Encrypted authentication portal</span>
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
                    Authenticating credentials...
                  </>
                ) : (
                  'Secure Login'
                )}
              </button>

              <div className="pt-2 text-center">
                <p className="text-xs text-slate-500 font-semibold">
                  New to Mahalaxmi?{' '}
                  <button 
                    type="button" 
                    onClick={handleReset} 
                    className="text-gold-dark font-extrabold hover:underline"
                  >
                    Register here
                  </button>
                </p>
              </div>

            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="p-8 text-center space-y-6 animate-fade-in-up">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-primary">Login Successful!</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Redirecting to customer dashboard</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-xs mx-auto text-left space-y-2">
              <p className="text-xs font-semibold text-slate-400 uppercase">Welcome Back</p>
              <h4 className="text-base font-extrabold text-primary">Valued Customer ({formData.mobile})</h4>
              <p className="text-[10px] text-slate-400 font-semibold">Active Loan Account: **SMF-558299**</p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 bg-primary hover:bg-secondary text-white font-bold rounded-xl transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
