import { Check } from 'lucide-react';

interface PaymentSuccessModalProps {
  onClose: () => void;
}

export function PaymentSuccessModal({ onClose }: PaymentSuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300 border-4 border-cyan-400">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-lg">
            <Check className="text-green-600" size={48} strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Chuyển Khoản Thành Công
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          Giao dịch của bạn đã được xử lý thành công. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
