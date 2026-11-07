import { Home } from 'lucide-react';
import { DeliveryInfo } from './PharmacyCheckout';

interface PharmacyCODSuccessProps {
  deliveryInfo: DeliveryInfo;
  onGoHome: () => void;
}

export function PharmacyCODSuccess({ deliveryInfo, onGoHome }: PharmacyCODSuccessProps) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300 border-4 border-cyan-400">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Đặt hàng thành công</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến bạn.
          </p>

          {/* Delivery Info */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
            <h3 className="font-bold text-gray-900 mb-4">Thông tin giao hàng</h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-gray-600 mb-1">Người nhận:</div>
                <div className="font-semibold text-gray-900">{deliveryInfo.fullName}</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Số điện thoại:</div>
                <div className="font-semibold text-gray-900">{deliveryInfo.phoneNumber}</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Địa chỉ:</div>
                <div className="font-semibold text-gray-900">{deliveryInfo.address}</div>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="text-gray-600 mb-1">Phương thức thanh toán:</div>
                <div className="font-semibold text-orange-600">Thanh toán khi nhận hàng (COD)</div>
              </div>
            </div>
          </div>
          
          <button
            onClick={onGoHome}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Home size={20} />
            <span>Về trang chủ</span>
          </button>
        </div>
      </div>
    </div>
  );
}