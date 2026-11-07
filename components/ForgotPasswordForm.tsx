import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield, Phone, ArrowLeft } from 'lucide-react';

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
  onSwitchToRegister: () => void;
  onBackToHome: () => void;
}

export function ForgotPasswordForm({ onSwitchToLogin, onSwitchToRegister, onBackToHome }: ForgotPasswordFormProps) {
  const [step, setStep] = useState<'email' | 'verify' | 'reset'>('email');
  const [recoveryMethod, setRecoveryMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [generatedCode, setGeneratedCode] = useState('');

  const handleSendCode = () => {
    if (recoveryMethod === 'email' && !email) {
      alert('Vui lòng nhập email!');
      return;
    }
    if (recoveryMethod === 'phone' && !phone) {
      alert('Vui lòng nhập số điện thoại!');
      return;
    }
    
    // Generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    
    if (recoveryMethod === 'email') {
      console.log('Gửi mã xác minh đến email:', email);
      alert(`Mã xác minh đã được gửi đến email ${email}:\n${code}`);
    } else {
      console.log('Gửi SMS đến số điện thoại:', phone);
      alert(`SMS đã được gửi đến số điện thoại ${phone}:\n${code}`);
    }
    
    setIsCodeSent(true);
    setCountdown(60);
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCodeSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    // Verify with generated code
    if (verificationCode === generatedCode) {
      setStep('reset');
    } else {
      alert('Mã xác minh không đúng!');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    if (newPassword.length < 6) {
      alert('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }
    console.log('Đặt lại mật khẩu thành công:', { email, newPassword });
    alert('Đặt lại mật khẩu thành công!');
    onSwitchToLogin();
  };

  return (
    <div className="space-y-6">
      {/* Back to home button */}
      <button
        type="button"
        onClick={onBackToHome}
        className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-cyan-600 transition-colors"
      >
        <ArrowLeft size={16} />
        Quay lại
      </button>

      {/* Step 1: Enter Email */}
      {step === 'email' && (
        <form onSubmit={(e) => { e.preventDefault(); setStep('verify'); }} className="space-y-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-100 mb-3">
              <Shield size={32} className="text-cyan-600" />
            </div>
            <p className="text-sm text-gray-600">
              Chọn phương thức khôi phục tài khoản của bạn
            </p>
          </div>

          {/* Recovery method radio buttons */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-700">
              Phương thức khôi phục
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label
                className={`relative flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all duration-300 ${
                  recoveryMethod === 'email'
                    ? 'border-cyan-400 bg-cyan-50 shadow-md shadow-cyan-500/20'
                    : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="recoveryMethod"
                  value="email"
                  checked={recoveryMethod === 'email'}
                  onChange={() => setRecoveryMethod('email')}
                  className="w-3.5 h-3.5 text-cyan-500 border-gray-400 bg-white focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-0"
                />
                <Mail
                  size={18}
                  className={
                    recoveryMethod === 'email'
                      ? 'text-cyan-600'
                      : 'text-gray-500'
                  }
                />
                <span
                  className={`text-sm transition-colors ${
                    recoveryMethod === 'email' ? 'text-cyan-700' : 'text-gray-600'
                  }`}
                >
                  Email
                </span>
              </label>

              <label
                className={`relative flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all duration-300 ${
                  recoveryMethod === 'phone'
                    ? 'border-cyan-400 bg-cyan-50 shadow-md shadow-cyan-500/20'
                    : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="recoveryMethod"
                  value="phone"
                  checked={recoveryMethod === 'phone'}
                  onChange={() => setRecoveryMethod('phone')}
                  className="w-3.5 h-3.5 text-cyan-500 border-gray-400 bg-white focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-0"
                />
                <Phone
                  size={18}
                  className={
                    recoveryMethod === 'phone'
                      ? 'text-cyan-600'
                      : 'text-gray-500'
                  }
                />
                <span
                  className={`text-sm transition-colors ${
                    recoveryMethod === 'phone' ? 'text-cyan-700' : 'text-gray-600'
                  }`}
                >
                  Số điện thoại
                </span>
              </label>
            </div>
          </div>

          {/* Email/Phone input */}
          {recoveryMethod === 'email' ? (
            <div className="space-y-2">
              <label htmlFor="forgot-email" className="block text-sm text-gray-700">
                Email
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600">
                  <Mail size={20} />
                </div>
                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
                  required
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label htmlFor="forgot-phone" className="block text-sm text-gray-700">
                Số điện thoại
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600">
                  <Phone size={20} />
                </div>
                <input
                  id="forgot-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0912345678"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            Tiếp tục
          </button>
        </form>
      )}

      {/* Step 2: Verify Code */}
      {step === 'verify' && (
        <form onSubmit={handleVerifyCode} className="space-y-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-100 mb-3">
              <Shield size={32} className="text-cyan-600" />
            </div>
            <p className="text-sm text-gray-600">
              {recoveryMethod === 'email' 
                ? `Mã xác minh đã được gửi đến ${email}`
                : `SMS đã được gửi đến ${phone}`
              }
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="verification-code" className="block text-sm text-gray-700">
              Mã xác minh
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600">
                  <Shield size={20} />
                </div>
                <input
                  id="verification-code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Nhập mã 6 số"
                  maxLength={6}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleSendCode}
                disabled={isCodeSent}
                className={`px-4 py-3.5 rounded-xl transition-all duration-300 whitespace-nowrap ${
                  isCodeSent
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-lg shadow-cyan-500/30'
                }`}
              >
                {isCodeSent ? `${countdown}s` : 'Gửi mã'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            Xác minh
          </button>

          <button
            type="button"
            onClick={() => setStep('email')}
            className="w-full py-2 text-sm text-gray-600 hover:text-cyan-600 transition-colors"
          >
            Quay lại
          </button>
        </form>
      )}

      {/* Step 3: Reset Password */}
      {step === 'reset' && (
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-3">
              <Shield size={32} className="text-green-600" />
            </div>
            <p className="text-sm text-gray-600">
              Xác minh thành công! Đặt mật khẩu mới cho tài khoản
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="new-password" className="block text-sm text-gray-700">
              Mật khẩu mới
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600">
                <Lock size={20} />
              </div>
              <input
                id="new-password"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-600 transition-colors"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirm-new-password" className="block text-sm text-gray-700">
              Nhập lại mật khẩu
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600">
                <Lock size={20} />
              </div>
              <input
                id="confirm-new-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            Đặt lại mật khẩu
          </button>
        </form>
      )}

      {/* Navigation buttons */}
      <div className="pt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-gray-500">Hoặc</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="py-2.5 px-4 bg-white hover:bg-gray-50 border border-gray-300 hover:border-cyan-400 rounded-lg text-gray-700 hover:text-cyan-600 transition-all duration-200 text-sm"
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="py-2.5 px-4 bg-white hover:bg-gray-50 border border-gray-300 hover:border-teal-400 rounded-lg text-gray-700 hover:text-teal-600 transition-all duration-200 text-sm"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}