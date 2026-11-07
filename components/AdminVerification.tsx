import { useState } from 'react';
import { Shield, ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react';

interface AdminVerificationProps {
  onVerified: () => void;
  onBack: () => void;
}

export function AdminVerification({ onVerified, onBack }: AdminVerificationProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate verification delay
    setTimeout(() => {
      if (password === 'admin') {
        onVerified();
      } else {
        setError('Mật khẩu không đúng. Vui lòng thử lại.');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full mb-4">
          <Shield className="text-orange-600" size={32} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Xác thực quản trị viên</h2>
        <p className="text-sm text-gray-600">Vui lòng nhập mật khẩu quản trị viên để tiếp tục</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mật khẩu quản trị viên
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
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
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
        >
          {isLoading ? 'Đang xác thực...' : 'Xác thực'}
        </button>
      </form>

      <button
        onClick={onBack}
        className="w-full flex items-center justify-center gap-2 py-3 text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Quay lại</span>
      </button>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-xs text-yellow-800 text-center">
          🔒 Khu vực này chỉ dành cho quản trị viên hệ thống
        </p>
      </div>
    </div>
  );
}