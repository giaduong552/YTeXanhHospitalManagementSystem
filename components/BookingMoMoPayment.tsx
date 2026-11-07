import { useState, useEffect } from 'react';
import { Menu, ChevronDown, Facebook, Mail, Phone, MapPin, Clock, User, Download, Home } from 'lucide-react';
import logo from 'figma:asset/9762ac6aaff743488633e15c34d9ecd8b57a71c0.png';
import momoLogo from 'figma:asset/b4143a5ded8534388f3dccb8c481e12342f49722.png';
import momoQRCode from 'figma:asset/8654f7eeca6a379a5e3bf7a6941390bd0635736e.png';

interface BookingMoMoPaymentProps {
  price: number;
  onSuccess: () => void;
  onLogout: () => void;
}

export function BookingMoMoPayment({ price, onSuccess, onLogout }: BookingMoMoPaymentProps) {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes = 600 seconds
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Show success after 10 seconds
    const successTimer = setTimeout(() => {
      setShowSuccess(true);
    }, 10000);

    // Countdown timer
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(successTimer);
      clearInterval(interval);
    };
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        {/* Top bar */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3 text-gray-600">
                {/* Tiktok */}
                <a href="#" className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  <span>Tiktok</span>
                </a>
                <span className="text-gray-400">|</span>
                
                {/* Facebook */}
                <a href="#" className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors">
                  <Facebook size={14} />
                  <span>Facebook</span>
                </a>
                <span className="text-gray-400">|</span>
                
                {/* Zalo */}
                <a href="#" className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 15.735c-.15.428-.794.794-1.294.868-.5.074-1.146.074-1.867-.057-1.064-.188-2.39-.562-3.77-1.42-2.637-1.644-4.352-4.567-4.483-7.578-.037-.874.318-1.608.886-1.945.568-.337 1.325-.337 1.893.169.568.506 1.42 1.945 1.42 2.526 0 .581-.225 1.162-.787 1.668-.562.506-.75.9-.562 1.418.3.825 1.275 2.076 2.32 2.857.862.644 1.78 1.063 2.507 1.232.518.12.975-.075 1.38-.637.406-.562.844-1.344 1.425-1.344.581 0 1.8.844 2.451 1.238.651.394.862.656.712 1.084z"/>
                  </svg>
                  <span>Zalo</span>
                </a>
                <span className="text-gray-400">|</span>
                
                {/* Youtube */}
                <a href="#" className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>Youtube</span>
                </a>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-1.5 bg-orange-400 hover:bg-orange-500 text-white rounded-full text-sm transition-colors flex items-center gap-1.5">
                  <Download size={14} />
                  <span>Tải ứng dụng</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm transition-colors flex items-center gap-1.5"
                >
                  <User size={14} />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="YTeXanh" className="h-12 w-auto" style={{ mixBlendMode: 'multiply' }} />
              <span className="text-2xl font-bold text-cyan-500">YTeXanh</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-700 hover:text-cyan-600 transition-colors">Trang chủ</a>
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-cyan-600 transition-colors">
                Dịch vụ y tế <ChevronDown size={16} />
              </a>
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-cyan-600 transition-colors">
                Tin tức
              </a>
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-cyan-600 transition-colors">
                Liên hệ hợp tác <ChevronDown size={16} />
              </a>
            </nav>
            <button className="md:hidden">
              <Menu className="text-gray-700" size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* MoMo Header */}
          <div className="bg-white rounded-t-2xl p-4 border-b border-gray-200 flex items-center gap-3">
            <img src={momoLogo} alt="MoMo" className="h-10 w-10" />
            <span className="text-lg font-semibold text-gray-900">Cổng thanh toán MoMo</span>
          </div>

          {/* Payment Content */}
          <div className="bg-white rounded-b-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left - Order Info */}
              <div className="p-8 bg-gray-50 border-r border-gray-200">
                <h3 className="font-bold text-gray-900 mb-6">Thông tin đơn hàng</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Nhà cung cấp</div>
                    <div className="flex items-center gap-2">
                      <img src={logo} alt="YTeXanh" className="h-8 w-auto" />
                      <span className="font-semibold text-gray-900">Y Tế Xanh</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Mã đơn hàng</div>
                    <div className="font-semibold text-gray-900">TT2601173FT73Q1QM...</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Mô tả</div>
                    <div className="font-semibold text-gray-900">Thanh toán T260117F...</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Số tiền</div>
                    <div className="font-bold text-2xl text-gray-900">{price.toLocaleString('vi-VN')}đ</div>
                  </div>
                </div>

                {/* Countdown */}
                <div className="bg-pink-50 rounded-xl p-4 border-2 border-pink-200">
                  <div className="text-pink-600 font-semibold text-sm mb-3">Đơn hàng sẽ hết hạn sau:</div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="bg-white rounded-lg px-3 py-2 shadow-sm min-w-[60px]">
                      <div className="text-2xl font-bold text-pink-600 text-center">{String(minutes).padStart(2, '0')}</div>
                      <div className="text-xs text-gray-500 text-center mt-0.5">Phút</div>
                    </div>
                    <div className="bg-white rounded-lg px-3 py-2 shadow-sm min-w-[60px]">
                      <div className="text-2xl font-bold text-pink-600 text-center">{String(seconds).padStart(2, '0')}</div>
                      <div className="text-xs text-gray-500 text-center mt-0.5">Giây</div>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 py-3 border-2 border-pink-500 text-pink-600 rounded-lg font-semibold hover:bg-pink-50 transition-all">
                  Quay về
                </button>
              </div>

              {/* Right - QR Code */}
              <div className="p-8 bg-gradient-to-br from-pink-500 to-pink-600">
                <h3 className="font-bold text-white text-center mb-6 text-xl">Quét mã QR để thanh toán</h3>
                
                {/* QR Code Container */}
                <div className="bg-white rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <img src={momoLogo} alt="MoMo" className="h-8 w-8" />
                    <span className="font-bold text-gray-900">MoMo</span>
                    <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
                      <rect width="60" height="30" rx="4" fill="#E8F5E9"/>
                      <text x="30" y="20" fontSize="12" fontWeight="bold" fill="#4CAF50" textAnchor="middle">VIET QR</text>
                    </svg>
                    <span className="font-bold text-blue-600">napas 247</span>
                  </div>

                  {/* QR Code */}
                  <div className="bg-white border-4 border-pink-500 rounded-2xl p-6 mb-4">
                    <div className="relative">
                      <img src={momoQRCode} alt="MoMo QR Code" className="w-full h-full" />
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-white text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                      <line x1="12" y1="18" x2="12.01" y2="18"></line>
                    </svg>
                    <span className="font-semibold">Sử dụng MoMo hoặc ứng dụng ngân hàng để quét mã</span>
                  </div>
                  <div className="text-sm text-pink-100">
                    Gặp khó khăn khi thanh toán? <a href="#" className="underline font-semibold">Xem Hướng dẫn</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300 border-4 border-cyan-400">
            <div className="text-center">
              {/* Success Icon */}
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Chuyển Khoản Thành Công</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Giao dịch của bạn đã được xử lý thành công. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
              </p>
              
              <button
                onClick={onSuccess}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="YTeXanh" className="h-10 w-auto" />
                <span className="text-xl font-bold text-cyan-400">YTeXanh</span>
              </div>
              <p className="text-sm mb-4">
                Nền tảng y tế thông minh hàng đầu Việt Nam, kết nối bệnh nhân với các cơ sở y tế uy tín.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors">
                  <Mail size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors">
                  <Phone size={18} />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="font-bold text-white mb-4">Liên kết nhanh</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Về chúng tôi</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Dịch vụ y tế</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Đặt lịch khám</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Tin tức sức khỏe</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Hợp tác doanh nghiệp</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-white mb-4">Dịch vụ</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Khám từ xa (Telemedicine)</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Đặt lịch khám bệnh</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Xét nghiệm tại nhà</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Tư vấn sức khỏe</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Gói khám sức khỏe</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-white mb-4">Liên hệ</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin size={18} className="text-cyan-400 flex-shrink-0 mt-1" />
                  <span>266 Hoàng Diệu, Phường Nam Dương, Quận Hải Châu, TP Đà Nẵng.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={18} className="text-cyan-400" />
                  <span>Hotline: 1900 2267</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={18} className="text-cyan-400" />
                  <span>support@ytexanh.vn</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={18} className="text-cyan-400" />
                  <span>24/7 - Cả tuần</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
              <p>© 2026 YTeXanh. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-cyan-400 transition-colors">Điều khoản sử dụng</a>
                <span className="text-gray-700">|</span>
                <a href="#" className="hover:text-cyan-400 transition-colors">Chính sách bảo mật</a>
                <span className="text-gray-700">|</span>
                <a href="#" className="hover:text-cyan-400 transition-colors">Hỗ trợ</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}