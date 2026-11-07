import { useState } from 'react';
import { Stethoscope, ArrowLeft, User, Lock, Eye, EyeOff } from 'lucide-react';

interface DoctorLoginProps {
  onLoginSuccess: (doctorId: string) => void;
  onBack: () => void;
}

export function DoctorLogin({ onLoginSuccess, onBack }: DoctorLoginProps) {
  const [doctorCode, setDoctorCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      // Kiểm tra tài khoản bác sĩ (1-5)
      const validAccounts = ['1', '2', '3', '4', '5'];
      if (validAccounts.includes(doctorCode) && doctorCode === password) {
        onLoginSuccess(doctorCode);
      } else {
        setError('Tài khoản hoặc mật khẩu không đúng');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-4">
          <Stethoscope className="text-blue-600" size={32} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Đăng nhập Bác sĩ</h2>
        <p className="text-sm text-gray-600">Vui lòng nhập mã đăng nhập và mật khẩu</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mã đăng nhập bác sĩ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mã đăng nhập bác sĩ
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <User size={20} />
            </div>
            <input
              type="text"
              value={doctorCode}
              onChange={(e) => setDoctorCode(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Ví dụ: BS001234"
              required
            />
          </div>
        </div>

        {/* Mật khẩu */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mật khẩu
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Nhập mật khẩu"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
        >
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Quay lại</span>
        </button>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
          Quên mật khẩu?
        </a>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-xs text-blue-800 text-center">
          👨‍⚕️ Khu vực dành cho bác sĩ và nhân viên y tế
        </p>
      </div>
    </div>
  );
}