import { Menu, ChevronDown, Facebook, Mail, Phone, MapPin, Clock, User, Download, Video, Calendar, ShoppingBag, Home as HomeIcon, Stethoscope, Pill, HeartPulse, MessageCircle } from 'lucide-react';
import logo from 'figma:asset/9762ac6aaff743488633e15c34d9ecd8b57a71c0.png';
import type { Appointment } from '../App';

interface PatientDashboardProps {
  onLogout: () => void;
  onNavigateToSpecialist: () => void;
  onNavigateToHomeHealth: () => void;
  onNavigateToPharmacy: () => void;
  onNavigateToAppointments: () => void;
  onNavigateToHealthProfile: () => void;
  onNavigateToPharmacyOrders: () => void;
  onNavigateToOnlineConsultation: () => void;
  onNavigateToVideoCall: () => void;
  appointments?: Appointment[];
}

export function PatientDashboard({ onLogout, onNavigateToSpecialist, onNavigateToHomeHealth, onNavigateToPharmacy, onNavigateToAppointments, onNavigateToHealthProfile, onNavigateToPharmacyOrders, onNavigateToOnlineConsultation, onNavigateToVideoCall }: PatientDashboardProps) {
  const features = [
    {
      id: 1,
      title: 'Đặt khám chuyên khoa',
      icon: Stethoscope,
      color: 'from-blue-400 to-blue-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      borderColor: '',
      isHighlighted: false,
      onClick: onNavigateToSpecialist
    },
    {
      id: 2,
      title: 'Gọi video với bác sĩ',
      icon: Video,
      color: 'from-cyan-400 to-cyan-500',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      borderColor: '',
      isHighlighted: false,
      onClick: onNavigateToVideoCall
    },
    {
      id: 3,
      title: 'Mua thuốc tại YTeXanh',
      icon: ShoppingBag,
      color: 'from-green-400 to-green-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      borderColor: '',
      isHighlighted: false,
      onClick: onNavigateToPharmacy
    },
    {
      id: 4,
      title: 'Y tế tại nhà',
      icon: HeartPulse,
      color: 'from-teal-400 to-teal-500',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
      borderColor: '',
      isHighlighted: false,
      onClick: onNavigateToHomeHealth
    },
    {
      id: 5,
      title: 'Tư vấn trực tuyến',
      icon: MessageCircle,
      color: 'from-purple-400 to-purple-500',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      borderColor: '',
      isHighlighted: false,
      onClick: onNavigateToOnlineConsultation
    }
  ];

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
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Chào mừng bạn đến với <span className="text-cyan-500">YTeXanh</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Chọn dịch vụ bạn cần để bắt đầu
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.id}
                  className={`group relative bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                    feature.borderColor || 'border border-gray-200'
                  } ${feature.isHighlighted ? 'shadow-lg' : 'shadow-md'}`}
                  onClick={feature.onClick}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Icon Container */}
                    <div className={`relative ${feature.iconBg} rounded-2xl p-6 transition-transform group-hover:scale-110`}>
                      <Icon className={`w-10 h-10 ${feature.iconColor}`} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-gray-800 font-semibold text-base leading-snug">
                      {feature.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Additional Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              onClick={onNavigateToAppointments}
              className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100 hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-start gap-4">
                <div className="bg-cyan-500 rounded-lg p-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Lịch hẹn của bạn</h4>
                  <p className="text-sm text-gray-600">Xem và quản lý các cuộc hẹn khám bệnh</p>
                </div>
              </div>
            </button>

            <button 
              onClick={onNavigateToPharmacyOrders}
              className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-start gap-4">
                <div className="bg-green-500 rounded-lg p-3">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Đơn thuốc</h4>
                  <p className="text-sm text-gray-600">Theo dõi đơn thuốc của bạn</p>
                </div>
              </div>
            </button>

            <button 
              onClick={onNavigateToHealthProfile}
              className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100 hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 rounded-lg p-3">
                  <HeartPulse className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Hồ sơ sức khỏe</h4>
                  <p className="text-sm text-gray-600">Quản lý thông tin sức khỏe cá nhân</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-auto">
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