import { AlertCircle, X, ArrowRight } from 'lucide-react';
import logo from 'figma:asset/9762ac6aaff743488633e15c34d9ecd8b57a71c0.png';

interface HealthProfileWelcomeModalProps {
  onClose: () => void;
  onNavigateToProfile: () => void;
  userName: string;
}

export function HealthProfileWelcomeModal({ onClose, onNavigateToProfile, userName }: HealthProfileWelcomeModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <img src={logo} alt="YTeXanh" className="w-16 h-16 object-contain" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center">
            Chào mừng bạn đến với YTeXanh!
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
              <div className="text-sm">
                <p className="font-semibold text-amber-900 mb-1">
                  Quan trọng: Hoàn thành hồ sơ sức khỏe
                </p>
                <p className="text-amber-800">
                  Để sử dụng đầy đủ các dịch vụ y tế, bạn cần cập nhật thông tin sức khỏe của mình.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-gray-900">Thông tin cần cập nhật:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                <span>Thông tin cơ bản (Họ tên, ngày sinh, giới tính...)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                <span>Chỉ số sức khỏe (Chiều cao, cân nặng, huyết áp...)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                <span>Dị ứng thuốc, thuốc đang dùng, tiền sử bệnh</span>
              </li>
            </ul>
          </div>

          <div className="bg-cyan-50 rounded-lg p-4">
            <p className="text-sm text-cyan-800 text-center">
              💡 <strong>Lưu ý:</strong> Thông tin này giúp bác sĩ tư vấn và điều trị chính xác hơn
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 space-y-3">
          <button
            onClick={onNavigateToProfile}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Cập nhật ngay</span>
            <ArrowRight size={20} />
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
          >
            Để sau
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}