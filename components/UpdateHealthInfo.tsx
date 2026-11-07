import { Menu, ChevronDown, Facebook, Download, User, ArrowLeft, Plus, X } from 'lucide-react';
import { useState } from 'react';
import logo from 'figma:asset/9762ac6aaff743488633e15c34d9ecd8b57a71c0.png';

export type HealthInfo = {
  fullName: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  email: string;
  address: string;
  bloodType: string;
  height: string;
  weight: string;
  bloodPressure: string;
  heartRate: string;
  bloodSugar: string;
  allergies: { title: string; note: string }[];
  medications: { title: string; note: string }[];
  medicalHistory: { title: string; note: string }[];
};

interface UpdateHealthInfoProps {
  onBack: () => void;
  onLogout: () => void;
  onSave: (healthInfo: HealthInfo) => void;
  currentInfo?: HealthInfo;
}

export function UpdateHealthInfo({ onBack, onLogout, onSave, currentInfo }: UpdateHealthInfoProps) {
  const [fullName, setFullName] = useState(currentInfo?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(currentInfo?.phoneNumber || '');
  const [birthDate, setBirthDate] = useState(currentInfo?.birthDate || '');
  const [gender, setGender] = useState(currentInfo?.gender || '');
  const [email, setEmail] = useState(currentInfo?.email || '');
  const [address, setAddress] = useState(currentInfo?.address || '');
  const [bloodType, setBloodType] = useState(currentInfo?.bloodType || '');
  const [height, setHeight] = useState(currentInfo?.height || '');
  const [weight, setWeight] = useState(currentInfo?.weight || '');
  const [bloodPressure, setBloodPressure] = useState(currentInfo?.bloodPressure || '');
  const [heartRate, setHeartRate] = useState(currentInfo?.heartRate || '');
  const [bloodSugar, setBloodSugar] = useState(currentInfo?.bloodSugar || '');
  const [allergies, setAllergies] = useState<{ title: string; note: string }[]>(currentInfo?.allergies || []);
  const [medications, setMedications] = useState<{ title: string; note: string }[]>(currentInfo?.medications || []);
  const [medicalHistory, setMedicalHistory] = useState<{ title: string; note: string }[]>(currentInfo?.medicalHistory || []);

  const handleSave = () => {
    onSave({
      fullName,
      phoneNumber,
      birthDate,
      gender,
      email,
      address,
      bloodType,
      height,
      weight,
      bloodPressure,
      heartRate,
      bloodSugar,
      allergies,
      medications,
      medicalHistory
    });
  };

  const addAllergy = () => {
    setAllergies([...allergies, { title: '', note: '' }]);
  };

  const removeAllergy = (index: number) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  const updateAllergy = (index: number, field: 'title' | 'note', value: string) => {
    const updated = [...allergies];
    updated[index][field] = value;
    setAllergies(updated);
  };

  const addMedication = () => {
    setMedications([...medications, { title: '', note: '' }]);
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const updateMedication = (index: number, field: 'title' | 'note', value: string) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const addMedicalHistory = () => {
    setMedicalHistory([...medicalHistory, { title: '', note: '' }]);
  };

  const removeMedicalHistory = (index: number) => {
    setMedicalHistory(medicalHistory.filter((_, i) => i !== index));
  };

  const updateMedicalHistory = (index: number, field: 'title' | 'note', value: string) => {
    const updated = [...medicalHistory];
    updated[index][field] = value;
    setMedicalHistory(updated);
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
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Cập nhật thông tin sức khỏe</h1>
            <p className="text-gray-600">Điền đầy đủ thông tin để quản lý sức khỏe tốt hơn</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 space-y-6">
            {/* Thông tin cơ bản */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">
                Thông tin cơ bản
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="VD: Nguyễn Văn A"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="VD: 0901234567"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Giới tính
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer bg-white"
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="VD: example@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="VD: 123 Đường ABC, Quận XYZ"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Chỉ số sức khỏe */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Chỉ số sức khỏe</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Chiều cao (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="VD: 170"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Cân nặng (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="VD: 65"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Huyết áp (mmHg)</label>
                  <input
                    type="text"
                    value={bloodPressure}
                    onChange={(e) => setBloodPressure(e.target.value)}
                    placeholder="VD: 120/80"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Nhịp tim (BPM)</label>
                  <input
                    type="number"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                    placeholder="VD: 72"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Nhóm máu</label>
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer bg-white"
                  >
                    <option value="">Chọn nhóm máu</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Đường huyết (mg/dL)</label>
                  <input
                    type="number"
                    value={bloodSugar}
                    onChange={(e) => setBloodSugar(e.target.value)}
                    placeholder="VD: 100"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Dị ứng thuốc */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-lg">Dị ứng thuốc</h3>
                <button
                  onClick={addAllergy}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  <Plus size={16} />
                  Thêm
                </button>
              </div>
              {allergies.length === 0 ? (
                <p className="text-gray-500 text-sm italic">Chưa có thông tin dị ứng thuốc</p>
              ) : (
                <div className="space-y-3">
                  {allergies.map((allergy, index) => (
                    <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <input
                          type="text"
                          value={allergy.title}
                          onChange={(e) => updateAllergy(index, 'title', e.target.value)}
                          placeholder="Tên thuốc (VD: Penicillin)"
                          className="flex-1 px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:border-red-500 text-sm"
                        />
                        <button
                          onClick={() => removeAllergy(index)}
                          className="ml-2 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <textarea
                        value={allergy.note}
                        onChange={(e) => updateAllergy(index, 'note', e.target.value)}
                        placeholder="Ghi chú (VD: Phản ứng - Nổi mẩn đỏ)"
                        rows={2}
                        className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:border-red-500 text-sm"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Thuốc đang dùng */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-lg">Thuốc đang dùng</h3>
                <button
                  onClick={addMedication}
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                >
                  <Plus size={16} />
                  Thêm
                </button>
              </div>
              {medications.length === 0 ? (
                <p className="text-gray-500 text-sm italic">Chưa có thông tin thuốc đang dùng</p>
              ) : (
                <div className="space-y-3">
                  {medications.map((medication, index) => (
                    <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <input
                          type="text"
                          value={medication.title}
                          onChange={(e) => updateMedication(index, 'title', e.target.value)}
                          placeholder="Tên thuốc (VD: Vitamin D3)"
                          className="flex-1 px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-500 text-sm"
                        />
                        <button
                          onClick={() => removeMedication(index)}
                          className="ml-2 p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <textarea
                        value={medication.note}
                        onChange={(e) => updateMedication(index, 'note', e.target.value)}
                        placeholder="Ghi chú (VD: 1 viên/ngày - Buổi sáng)"
                        rows={2}
                        className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-500 text-sm"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tiền sử bệnh */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-lg">Tiền sử bệnh</h3>
                <button
                  onClick={addMedicalHistory}
                  className="flex items-center gap-1 px-3 py-1.5 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm"
                >
                  <Plus size={16} />
                  Thêm
                </button>
              </div>
              {medicalHistory.length === 0 ? (
                <p className="text-gray-500 text-sm italic">Chưa có thông tin tiền sử bệnh</p>
              ) : (
                <div className="space-y-3">
                  {medicalHistory.map((history, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <input
                          type="text"
                          value={history.title}
                          onChange={(e) => updateMedicalHistory(index, 'title', e.target.value)}
                          placeholder="Tên bệnh (VD: Viêm amidan)"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 text-sm"
                        />
                        <button
                          onClick={() => removeMedicalHistory(index)}
                          className="ml-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <textarea
                        value={history.note}
                        onChange={(e) => updateMedicalHistory(index, 'note', e.target.value)}
                        placeholder="Ghi chú (VD: Đã phẫu thuật cắt amidan năm 2015)"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 text-sm"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button
                onClick={onBack}
                className="py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSave}
                className="py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700 shadow-lg transition-all"
              >
                Lưu thông tin
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}