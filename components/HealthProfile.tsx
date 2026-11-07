import { Menu, ChevronDown, Facebook, Mail, Phone, MapPin, Clock, User, Download, ArrowLeft, Activity, Heart, Droplet, Scale, Ruler, Stethoscope, Pill, AlertCircle, FileText } from 'lucide-react';
import logo from 'figma:asset/9762ac6aaff743488633e15c34d9ecd8b57a71c0.png';
import { Appointment } from '../App';
import { HealthInfo } from './UpdateHealthInfo';

interface HealthProfileProps {
  onBack: () => void;
  onLogout: () => void;
  onUpdateInfo: () => void;
  userName: string;
  healthInfo?: HealthInfo;
  appointments: Appointment[];
  isDoctorView?: boolean; // Hide edit button when doctor is viewing
}

export function HealthProfile({ onBack, onLogout, onUpdateInfo, userName, healthInfo, appointments, isDoctorView = false }: HealthProfileProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Only show for patients */}
      {!isDoctorView && (
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
      )}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Quay lại</span>
          </button>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hồ sơ sức khỏe</h1>
            <p className="text-gray-600">Quản lý thông tin sức khỏe cá nhân của bạn</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Personal Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4">
                    <User className="w-12 h-12 text-cyan-600" />
                  </div>
                  <h2 className="text-xl font-bold mb-1">{userName}</h2>
                  <p className="text-cyan-100 text-sm mb-4">Mã BN: BN123456</p>
                  <div className="w-full space-y-2 text-sm">
                    <div className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2">
                      <span className="text-cyan-100">Ngày sinh:</span>
                      <span className="font-semibold">{healthInfo?.birthDate ? new Date(healthInfo.birthDate).toLocaleDateString('vi-VN') : '---'}</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2">
                      <span className="text-cyan-100">Giới tính:</span>
                      <span className="font-semibold">{healthInfo?.gender || '---'}</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2">
                      <span className="text-cyan-100">Nhóm máu:</span>
                      <span className="font-semibold">{healthInfo?.bloodType || '---'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="text-cyan-500" size={20} />
                  Thông tin liên hệ
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-gray-500 mb-1">Email</div>
                    <div className="font-semibold text-gray-800">{healthInfo?.email || <span className="text-orange-500 italic">Cần cập nhật</span>}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Địa chỉ</div>
                    <div className="font-semibold text-gray-800">{healthInfo?.address || <span className="text-orange-500 italic">Cần cập nhật</span>}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Health Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Health Metrics */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="text-cyan-500" size={20} />
                  Chỉ số sức khỏe
                </h3>
                {!healthInfo?.height && !healthInfo?.weight && !healthInfo?.bloodPressure && !healthInfo?.heartRate ? (
                  <div className="text-center py-8">
                    <div className="text-orange-500 font-semibold mb-2">Chưa có thông tin chỉ số sức khỏe</div>
                    <p className="text-gray-500 text-sm">Vui lòng cập nhật thông tin để theo dõi sức khỏe</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Ruler className="text-blue-600" size={18} />
                        <span className="text-xs text-gray-600">Chiều cao</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {healthInfo?.height ? `${healthInfo.height} cm` : <span className="text-base text-orange-500">Cần cập nhật</span>}
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Scale className="text-green-600" size={18} />
                        <span className="text-xs text-gray-600">Cân nặng</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {healthInfo?.weight ? `${healthInfo.weight} kg` : <span className="text-base text-orange-500">Cần cập nhật</span>}
                      </div>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="text-red-600" size={18} />
                        <span className="text-xs text-gray-600">Huyết áp</span>
                      </div>
                      <div className="text-2xl font-bold text-red-600">
                        {healthInfo?.bloodPressure || <span className="text-base text-orange-500">Cần cập nhật</span>}
                      </div>
                      {healthInfo?.bloodPressure && <div className="text-xs text-red-600 mt-1">mmHg</div>}
                    </div>
                    <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="text-pink-600" size={18} />
                        <span className="text-xs text-gray-600">Nhịp tim</span>
                      </div>
                      <div className="text-2xl font-bold text-pink-600">
                        {healthInfo?.heartRate || <span className="text-base text-orange-500">Cần cập nhật</span>}
                      </div>
                      {healthInfo?.heartRate && <div className="text-xs text-pink-600 mt-1">BPM</div>}
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplet className="text-orange-600" size={18} />
                        <span className="text-xs text-gray-600">Nhóm máu</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-600">
                        {healthInfo?.bloodType || <span className="text-base text-orange-500">---</span>}
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplet className="text-purple-600" size={18} />
                        <span className="text-xs text-gray-600">Đường huyết</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">
                        {healthInfo?.bloodSugar || <span className="text-base text-orange-500">Cần cập nhật</span>}
                      </div>
                      {healthInfo?.bloodSugar && <div className="text-xs text-purple-600 mt-1">mg/dL</div>}
                    </div>
                  </div>
                )}
              </div>

              {/* Medical History from Appointments */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Stethoscope className="text-cyan-500" size={20} />
                  Lịch sử khám bệnh
                </h3>
                {appointments.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-500 font-semibold mb-2">Chưa có lịch sử khám bệnh</div>
                    <p className="text-gray-400 text-sm">Lịch sử khám bệnh sẽ được cập nhật sau khi bạn đặt lịch</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {appointments.map((appointment, index) => (
                      <div key={appointment.id} className={`border-l-4 ${index === 0 ? 'border-cyan-500' : index === 1 ? 'border-blue-500' : 'border-green-500'} bg-gray-50 rounded-lg p-4`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="font-semibold text-gray-900">{appointment.specialty} - {appointment.service}</div>
                          <span className="text-sm text-gray-500">{new Date(appointment.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">BS. {appointment.doctorName} - {appointment.hospitalName}</div>
                        <div className="text-sm text-gray-500">Trạng thái: {appointment.status === 'confirmed' ? 'Đã xác nhận' : appointment.status === 'completed' ? 'Hoàn thành' : 'Chờ xác nhận'}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Medical Conditions - Only show if has data */}
              {(healthInfo?.allergies && healthInfo.allergies.length > 0) || (healthInfo?.medications && healthInfo.medications.length > 0) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Allergies */}
                  {healthInfo?.allergies && healthInfo.allergies.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <AlertCircle className="text-red-500" size={20} />
                        Dị ứng thuốc
                      </h3>
                      <div className="space-y-2">
                        {healthInfo.allergies.map((allergy, index) => (
                          <div key={index} className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                            <div className="font-semibold text-red-700 text-sm">{allergy.title}</div>
                            {allergy.note && <div className="text-xs text-red-600">{allergy.note}</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Current Medications */}
                  {healthInfo?.medications && healthInfo.medications.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Pill className="text-green-500" size={20} />
                        Thuốc đang dùng
                      </h3>
                      <div className="space-y-2">
                        {healthInfo.medications.map((medication, index) => (
                          <div key={index} className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                            <div className="font-semibold text-green-700 text-sm">{medication.title}</div>
                            {medication.note && <div className="text-xs text-green-600">{medication.note}</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Medical History Notes - Only show if has data */}
              {healthInfo?.medicalHistory && healthInfo.medicalHistory.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="text-cyan-500" size={20} />
                    Tiền sử bệnh
                  </h3>
                  <div className="space-y-2">
                    {healthInfo.medicalHistory.map((history, index) => (
                      <div key={index} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full mt-1.5"></div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{history.title}</div>
                          {history.note && <div className="text-xs text-gray-600">{history.note}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {!isDoctorView && (
                <div className="grid grid-cols-2 gap-4">
                  <button className="py-3 px-6 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-md flex items-center justify-center gap-2">
                    <FileText size={18} />
                    Tải hồ sơ PDF
                  </button>
                  <button 
                    onClick={onUpdateInfo}
                    className="py-3 px-6 border-2 border-cyan-500 text-cyan-600 rounded-lg font-semibold hover:bg-cyan-50 transition-all flex items-center justify-center gap-2"
                  >
                    <User size={18} />
                    Cập nhật thông tin
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Only show for patients */}
      {!isDoctorView && (
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
      )}
    </div>
  );
}