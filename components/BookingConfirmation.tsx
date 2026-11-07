import { useState } from 'react';
import { Menu, ChevronDown, Facebook, Mail, Phone, MapPin, Clock, User, Download, Calendar, Stethoscope, Wallet, CreditCard, Building2, ChevronRight, ArrowLeft } from 'lucide-react';
import logo from 'figma:asset/9762ac6aaff743488633e15c34d9ecd8b57a71c0.png';

interface BookingConfirmationProps {
  hospitalName: string;
  hospitalAddress: string;
  doctorName: string;
  specialty: string;
  service: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  patientBirthDate: string;
  patientGender: string;
  isVideoCall?: boolean; // Add flag for video call
  onBack: () => void;
  onContinue: (paymentMethod: 'momo' | 'onsite') => void;
  onLogout: () => void;
}

export function BookingConfirmation({ 
  hospitalName,
  hospitalAddress,
  doctorName, 
  specialty, 
  service, 
  date, 
  time,
  patientName,
  patientPhone,
  patientBirthDate,
  patientGender,
  isVideoCall = false,
  onBack, 
  onContinue,
  onLogout 
}: BookingConfirmationProps) {
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'onsite' | ''>('');

  const price = isVideoCall ? 300000 : 320000;

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

        {/* Progress bar */}
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-0 max-w-4xl mx-auto">
              {/* Step 1 - Completed */}
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Stethoscope className="text-cyan-600" size={24} />
                  </div>
                  <div className="text-white text-xs mt-1">Chọn h sơ</div>
                </div>
                <div className="h-0.5 w-24 lg:w-32 bg-white"></div>
              </div>

              {/* Step 2 - Completed */}
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                    <User className="text-cyan-600" size={24} />
                  </div>
                  <div className="text-white text-xs mt-1">Thông tin</div>
                </div>
                <div className="h-0.5 w-24 lg:w-32 bg-white"></div>
              </div>

              {/* Step 3 - Active */}
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-600">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div className="text-white text-xs mt-1 font-semibold">Xác nhận</div>
                </div>
                <div className="h-0.5 w-24 lg:w-32 bg-white/40"></div>
              </div>

              {/* Step 4 - Inactive */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white/40 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div className="text-white/60 text-xs mt-1">Hoàn thành</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Quay lại</span>
          </button>

          {/* Phòng khám */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <div className="flex items-start gap-3">
              <Building2 className="text-cyan-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="font-bold text-gray-900 text-lg mb-1">{hospitalName}</h2>
                <p className="text-gray-600 text-sm">{hospitalAddress}</p>
              </div>
            </div>
          </div>

          {/* Thông tin bệnh nhân */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <h2 className="text-gray-900 font-semibold mb-3">Thông tin bệnh nhân</h2>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <User className="text-cyan-500" size={20} />
                <span className="text-gray-700 font-medium">{patientName}</span>
              </div>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
            <div className="pt-3 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="text-gray-400" size={16} />
                <span>{patientPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="text-gray-400" size={16} />
                <span>Ngày sinh: {patientBirthDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="text-gray-400" size={16} />
                <span>Giới tính: {patientGender === 'male' ? 'Nam' : patientGender === 'female' ? 'Nữ' : 'Khác'}</span>
              </div>
            </div>
          </div>

          {/* Thông tin đặt khám */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <h2 className="text-gray-900 font-semibold mb-4">Thông tin đặt khám</h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="text-cyan-500" size={20} />
                <span className="text-gray-700">{doctorName}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Stethoscope className="text-cyan-500" size={20} />
                <span className="text-gray-700">{specialty}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <svg className="text-cyan-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span className="text-gray-700">{service}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="text-cyan-500" size={20} />
                <span className="text-gray-700">{date} ({time})</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Wallet className="text-cyan-500" size={20} />
                <span className="text-gray-700 font-semibold">{price.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>
          </div>

          {/* Phương thức thanh toán */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <h2 className="text-gray-900 font-semibold mb-4">Phương thức thanh toán</h2>
            
            <div className="space-y-3">
              {/* MoMo */}
              <button
                onClick={() => setPaymentMethod('momo')}
                className={`w-full p-4 border-2 rounded-xl transition-all flex items-center gap-4 ${
                  paymentMethod === 'momo'
                    ? 'border-cyan-500 bg-cyan-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'momo' ? 'border-cyan-500' : 'border-gray-300'
                }`}>
                  {paymentMethod === 'momo' && (
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                      <rect width="48" height="48" rx="8" fill="#A50064"/>
                      <text x="24" y="20" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">mo</text>
                      <text x="24" y="35" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">mo</text>
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Ví MoMo</span>
                </div>
              </button>

              {/* Thanh toán tại cơ sở */}
              {!isVideoCall && (
                <button
                  onClick={() => setPaymentMethod('onsite')}
                  className={`w-full p-4 border-2 rounded-xl transition-all flex items-center gap-4 ${
                    paymentMethod === 'onsite'
                      ? 'border-cyan-500 bg-cyan-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'onsite' ? 'border-cyan-500' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'onsite' && (
                      <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="text-cyan-600" size={24} />
                    </div>
                    <span className="font-medium text-gray-900">Thanh toán tại cơ sở y tế</span>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Tổng tiền */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-semibold text-lg">Thanh toán tạm tính</span>
              <span className="text-cyan-500 font-bold text-xl">{price.toLocaleString('vi-VN')} đ</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onBack}
              className="py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
            >
              Quay lại
            </button>
            <button
              onClick={() => onContinue(paymentMethod)}
              disabled={!paymentMethod}
              className={`py-3 rounded-lg font-medium transition-all ${
                paymentMethod
                  ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </main>

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