import { useState } from 'react';
import { Menu, ChevronDown, Facebook, Mail, Phone, MapPin, Clock, User, Download, ArrowLeft, ChevronRight, Calendar, Stethoscope } from 'lucide-react';
import logo from 'figma:asset/9762ac6aaff743488633e15c34d9ecd8b57a71c0.png';

interface BookingFormProps {
  hospitalName: string;
  serviceType?: 'specialist' | 'home-health'; // Add service type prop
  onBack: () => void;
  onLogout: () => void;
  onContinue: (bookingData: {
    doctorName: string;
    specialty: string;
    service: string;
    date: string;
    time: string;
  }) => void;
}

export function BookingForm({ hospitalName, serviceType = 'specialist', onBack, onLogout, onContinue }: BookingFormProps) {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Fixed values - change based on service type
  const selectedSpecialty = 'Da liễu';
  const selectedService = serviceType === 'home-health' ? 'Bác Sĩ Gia Đình' : 'Da liễu';

  const doctors = [
    { id: '1', name: 'BS Dương Gia' },
    { id: '2', name: 'BS Trần Thị Khánh Linh' },
    { id: '3', name: 'BS Võ Tấn Huy' },
    { id: '4', name: 'BS Nguyễn Thị Huỳnh Như' },
    { id: '5', name: 'BS Lê Thanh Xin' }
  ];

  const dates = [
    { date: '19/01', day: 'Thứ 2' },
    { date: '26/01', day: 'Thứ 2' },
    { date: '02/02', day: 'Thứ 2' }
  ];

  const morningSlots = [
    '07:30 - 08:30',
    '08:30 - 09:30',
    '09:30 - 10:30',
    '10:30 - 11:30'
  ];

  const afternoonSlots = [
    '13:30 - 14:30',
    '14:30 - 15:30',
    '15:30 - 16:30'
  ];

  const isFormComplete = selectedDoctor && selectedSpecialty && selectedService && selectedDate && selectedTime;

  const handleSubmit = () => {
    if (isFormComplete) {
      const doctor = doctors.find(d => d.id === selectedDoctor);
      onContinue({
        doctorName: doctor?.name || '',
        specialty: selectedSpecialty,
        service: selectedService,
        date: selectedDate === 'other' ? 'Chọn ngày khác' : selectedDate,
        time: selectedTime
      });
    }
  };

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
            {/* Progress steps */}
            <div className="flex items-center justify-center gap-0 max-w-4xl mx-auto">
              {/* Step 1 - Active */}
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Stethoscope className="text-cyan-600" size={24} />
                  </div>
                  <div className="text-white text-xs mt-1 font-semibold">Chọn thông tin</div>
                </div>
                <div className="h-0.5 w-24 lg:w-32 bg-white/40"></div>
              </div>

              {/* Step 2 - Inactive */}
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/40 rounded-full flex items-center justify-center">
                    <User className="text-white" size={24} />
                  </div>
                  <div className="text-white/60 text-xs mt-1">Thông tin</div>
                </div>
                <div className="h-0.5 w-24 lg:w-32 bg-white/40"></div>
              </div>

              {/* Step 3 - Inactive */}
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/40 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div className="text-white/60 text-xs mt-1">Xác nhận</div>
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
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Quay lại</span>
          </button>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              {serviceType === 'home-health' ? 'Đặt lịch khám tại nhà' : 'Đặt lịch khám chuyên khoa'}
            </h1>

            {/* Doctor Selection */}
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">
                Bác sĩ <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer bg-white"
                >
                  <option value="">Chọn bác sĩ</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 pointer-events-none" size={20} />
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

            {/* Specialty - Fixed */}
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">
                Chuyên khoa <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed">
                  Da liễu
                </div>
                <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" size={20} />
              </div>
            </div>

            {/* Service - Fixed */}
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">
                Dịch vụ <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed">
                  {selectedService}
                </div>
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">
                Ngày khám <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-4 gap-3">
                {dates.map((dateItem) => (
                  <button
                    key={dateItem.date}
                    onClick={() => setSelectedDate(dateItem.date)}
                    className={`py-3 px-2 rounded-lg border-2 transition-all ${
                      selectedDate === dateItem.date
                        ? 'border-cyan-500 bg-cyan-50 text-cyan-600'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-sm">({dateItem.date})</div>
                    <div className="text-xs text-gray-500">{dateItem.day}</div>
                  </button>
                ))}
                <button
                  onClick={() => setSelectedDate('other')}
                  className={`py-3 px-2 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                    selectedDate === 'other'
                      ? 'border-cyan-500 bg-cyan-50 text-cyan-600'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Calendar size={20} />
                  <div className="text-xs">Ngày khác</div>
                </button>
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">
                Giờ khám <span className="text-red-500">*</span>
              </label>
              
              {/* Morning slots */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-cyan-600 mb-2">Buổi sáng</div>
                <div className="grid grid-cols-3 gap-3">
                  {morningSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-3 px-4 rounded-lg border-2 transition-all text-sm font-medium ${
                        selectedTime === slot
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-600'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Afternoon slots */}
              <div>
                <div className="text-sm font-semibold text-cyan-600 mb-2">Buổi chiều</div>
                <div className="grid grid-cols-3 gap-3">
                  {afternoonSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-3 px-4 rounded-lg border-2 transition-all text-sm font-medium ${
                        selectedTime === slot
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-600'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isFormComplete}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                isFormComplete
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