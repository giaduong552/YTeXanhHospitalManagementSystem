import { User, Shield, Stethoscope, ArrowLeft } from 'lucide-react';

interface SelectUserTypeProps {
  onSelectPatient: () => void;
  onSelectAdmin: () => void;
  onSelectDoctor: () => void;
  onBackToHome: () => void;
}

export function SelectUserType({ onSelectPatient, onSelectAdmin, onSelectDoctor, onBackToHome }: SelectUserTypeProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Chọn đối tượng đăng nhập</h2>
        <p className="text-sm text-gray-600">Vui lòng chọn loại tài khoản của bạn</p>
      </div>

      <div className="space-y-4">
        {/* Bệnh nhân */}
        <button
          onClick={onSelectPatient}
          className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <User size={32} />
            </div>
            <div className="text-left flex-1">
              <h3 className="font-bold text-lg mb-1">Bệnh nhân</h3>
              <p className="text-sm text-cyan-50">Đặt lịch khám, tư vấn sức khỏe từ xa</p>
            </div>
          </div>
        </button>

        {/* Bác sĩ */}
        <button
          onClick={onSelectDoctor}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Stethoscope size={32} />
            </div>
            <div className="text-left flex-1">
              <h3 className="font-bold text-lg mb-1">Bác sĩ</h3>
              <p className="text-sm text-blue-50">Quản lý bệnh nhân, tư vấn trực tuyến</p>
            </div>
          </div>
        </button>

        {/* Quản trị viên */}
        <button
          onClick={onSelectAdmin}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Shield size={32} />
            </div>
            <div className="text-left flex-1">
              <h3 className="font-bold text-lg mb-1">Quản trị viên</h3>
              <p className="text-sm text-orange-50">Quản lý hệ thống, cài đặt ứng dụng</p>
            </div>
          </div>
        </button>
      </div>

      <button
        onClick={onBackToHome}
        className="w-full flex items-center justify-center gap-2 py-3 text-gray-600 hover:text-cyan-600 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Quay lại trang chủ</span>
      </button>
    </div>
  );
}
