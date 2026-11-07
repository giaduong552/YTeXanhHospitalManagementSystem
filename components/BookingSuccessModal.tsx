import { Check } from 'lucide-react';

interface BookingSuccessModalProps {
  onClose: () => void;
}

export function BookingSuccessModal({ onClose }: BookingSuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="text-green-600" size={48} strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Đặt Lịch Thành Công
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          Lịch khám của bạn đã được xác nhận. Vui lòng thanh toán tại cơ sở y tế khi đến khám.
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
