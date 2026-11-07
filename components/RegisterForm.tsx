import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Phone, ArrowLeft } from 'lucide-react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onBackToHome: () => void;
  onRegisterSuccess: (userData: { email?: string; phone?: string; password: string }) => void;
}

export function RegisterForm({ onSwitchToLogin, onBackToHome, onRegisterSuccess }: RegisterFormProps) {
  const [registerMethod, setRegisterMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    
    if (password.length < 6) {
      alert('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    if (registerMethod === 'email') {
      if (!email) {
        alert('Vui lòng nhập email!');
        return;
      }
      console.log('Đăng ký với email:', { email, password });
      onRegisterSuccess({ email, password });
    } else {
      if (!phone) {
        alert('Vui lòng nhập số điện thoại!');
        return;
      }
      console.log('Đăng ký với số điện thoại:', { phone, password });
      onRegisterSuccess({ phone, password });
    }
    
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    onSwitchToLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Back to home button */}
      <button
        type="button"
        onClick={onBackToHome}
        className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-cyan-600 transition-colors"
      >
        <ArrowLeft size={16} />
        Quay lại
      </button>

      {/* Register method radio buttons */}
      <div className="space-y-2">
        <label className="block text-sm text-gray-700">
          Phương thức đăng ký
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label
            className={`relative flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all duration-300 ${
              registerMethod === 'email'
                ? 'border-cyan-400 bg-cyan-50 shadow-md shadow-cyan-500/20'
                : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name="registerMethod"
              value="email"
              checked={registerMethod === 'email'}
              onChange={() => setRegisterMethod('email')}
              className="w-3.5 h-3.5 text-cyan-500 border-gray-400 bg-white focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-0"
            />
            <Mail
              size={18}
              className={
                registerMethod === 'email'
                  ? 'text-cyan-600'
                  : 'text-gray-500'
              }
            />
            <span
              className={`text-sm transition-colors ${
                registerMethod === 'email' ? 'text-cyan-700' : 'text-gray-600'
              }`}
            >
              Email
            </span>
          </label>

          <label
            className={`relative flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all duration-300 ${
              registerMethod === 'phone'
                ? 'border-cyan-400 bg-cyan-50 shadow-md shadow-cyan-500/20'
                : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name="registerMethod"
              value="phone"
              checked={registerMethod === 'phone'}
              onChange={() => setRegisterMethod('phone')}
              className="w-3.5 h-3.5 text-cyan-500 border-gray-400 bg-white focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-0"
            />
            <Phone
              size={18}
              className={
                registerMethod === 'phone'
                  ? 'text-cyan-600'
                  : 'text-gray-500'
              }
            />
            <span
              className={`text-sm transition-colors ${
                registerMethod === 'phone' ? 'text-cyan-700' : 'text-gray-600'
              }`}
            >
              Số điện thoại
            </span>
          </label>
        </div>
      </div>

      {/* Email/Phone input */}
      {registerMethod === 'email' ? (
        <div className="space-y-2">
          <label htmlFor="register-email" className="block text-sm text-gray-700">
            Email
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600">
              <Mail size={20} />
            </div>
            <input
              id="register-email"
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
          <label htmlFor="register-phone" className="block text-sm text-gray-700">
            Số điện thoại
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600">
              <Phone size={20} />
            </div>
            <input
              id="register-phone"
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

      {/* Password input */}
      <div className="space-y-2">
        <label htmlFor="register-password" className="block text-sm text-gray-700">
          Mật khẩu
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600">
            <Lock size={20} />
          </div>
          <input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Confirm Password input */}
      <div className="space-y-2">
        <label htmlFor="confirm-password" className="block text-sm text-gray-700">
          Xác nhận mật khẩu
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600">
            <Lock size={20} />
          </div>
          <input
            id="confirm-password"
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

      {/* Submit button */}
      <button
        type="submit"
        className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
      >
        Đăng Ký
      </button>

      {/* Login link */}
      <div className="text-center pt-2">
        <p className="text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-cyan-600 hover:text-cyan-700 transition-colors font-medium"
          >
            Đăng nhập ngay
          </button>
        </p>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Hoặc tiếp tục với</span>
        </div>
      </div>

      {/* Social login buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="py-3 px-4 bg-white hover:bg-gray-50 border border-gray-300 hover:border-cyan-400 rounded-xl text-gray-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="py-3 px-4 bg-white hover:bg-gray-50 border border-gray-300 hover:border-cyan-400 rounded-xl text-gray-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>
      </div>
    </form>
  );
}