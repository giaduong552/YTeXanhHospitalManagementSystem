import { Menu, Search, ChevronDown, Facebook, Mail, Phone, MapPin, Clock, User, Download, CheckCircle2, FileText, Navigation, UserCheck, Package } from 'lucide-react';
import logo from 'figma:asset/9762ac6aaff743488633e15c34d9ecd8b57a71c0.png';
import appStoreButtons from 'figma:asset/a6803d5e4fe83aa90b157229041ca3e711da33a5.png';
import bannerImage from 'figma:asset/e1e8ea12354df4f483e5c0255274a3df4425d7d5.png';
import ctTimImage from 'figma:asset/f56d28bcfecd974a0d5052baf39bc070c1c39c81.png';
import ctSoNaoImage from 'figma:asset/c59528890ddaf2fef5851324a663fec647fa5e3e.png';
import tiemViemGanBImage from 'figma:asset/5eabaa6aeebcefec4d510c71e25ce36293dac79c.png';
import phauThuatTriNoiImage from 'figma:asset/c38fdd5e93dbdee9e29a156b0dae97844e984e5c.png';

interface HomePageProps {
  onNavigateToAuth: () => void;
}

export function HomePage({ onNavigateToAuth }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
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
                  onClick={onNavigateToAuth}
                  className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full text-sm transition-colors flex items-center gap-1.5"
                >
                  <User size={14} />
                  <span>Tài khoản</span>
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
              <a href="#" className="text-gray-700 hover:text-cyan-600 transition-colors"></a>
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-cyan-600 transition-colors">
                
              </a>
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-cyan-600 transition-colors">
                Dịch vụ y tế <ChevronDown size={16} />
              </a>
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-cyan-600 transition-colors">
                
              </a>
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-cyan-600 transition-colors">
                Tin tức
              </a>
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-cyan-600 transition-colors">
               <ChevronDown size={16} />
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

      {/* Banner Section */}
      <section className="bg-gradient-to-r from-orange-50 via-amber-50 to-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="leading-tight">
                <div className="text-6xl font-extrabold mb-3">
                  <span className="text-orange-500 drop-shadow-sm">GIÚP VIỆC CÁ NHÂN</span>
                </div>
                <div className="text-5xl font-extrabold">
                  <span className="text-green-600 drop-shadow-sm">ĐI KHÁM CÙNG BẠN</span>
                </div>
              </h1>
              
              <ul className="space-y-4 my-8">
                <li className="flex items-start gap-3 text-gray-700">
                  <div className="flex-shrink-0 mt-1">
                    <FileText className="w-5 h-5 text-cyan-600" />
                  </div>
                  <span className="text-lg leading-relaxed">Hướng dẫn quy trình, giấy tờ, BHYT</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <div className="flex-shrink-0 mt-1">
                    <Navigation className="w-5 h-5 text-cyan-600" />
                  </div>
                  <span className="text-lg leading-relaxed">Hỗ trợ di chuyển trong bệnh viện</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <div className="flex-shrink-0 mt-1">
                    <UserCheck className="w-5 h-5 text-cyan-600" />
                  </div>
                  <span className="text-lg leading-relaxed">Theo dõi vật bác sĩ</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <div className="flex-shrink-0 mt-1">
                    <Package className="w-5 h-5 text-cyan-600" />
                  </div>
                  <span className="text-lg leading-relaxed">Xếp hàng nhận và gọi thuốc về nhà</span>
                </li>
              </ul>
              
              <button className="group mt-8 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  GỌI 1900 2267
                </span>
              </button>
            </div>
            
            <div className="flex-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-200 to-green-200 rounded-3xl blur-xl opacity-30"></div>
                <img 
                  src={bannerImage}
                  alt="Medical care"
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Giới thiệu hệ thống y tế từ xa (Telemedicine)
            </h2>
            <p className="text-sm text-gray-500 mb-6">
             
            </p>

            <div className="bg-blue-50 border-l-4 border-cyan-500 p-4 mb-6 rounded">
              <p className="text-gray-700">
                Hệ thống y tế từ xa (Telemedicine) là mô hình cung cấp dịch vụ chăm sóc sức khỏe thông qua các nền tảng công nghệ số, cho phép bệnh nhân và bác sĩ tương tác với nhau mà không cần gặp mặt trực tiếp.
              </p>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Thông qua các thiết bị kết nối Internet như máy tính, điện thoại thông minh và các thiết bị y tế thông minh, bệnh nhân có thể được tư vấn, theo dõi và hỗ trợ điều trị từ xa một cách liên tục và thuận tiện.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Trong bối cảnh nhu cầu chăm sóc sức khỏe ngày càng tăng, đặc biệt tại các khu vực xa trung tâm y tế hoặc trong các tình huống hạn chế tiếp xúc trực tiếp (như dịch bệnh), y tế từ xa đóng vai trò quan trọng trong việc:
            </p>

            <ul className="space-y-2 mb-6 ml-6">
              <li className="flex items-start gap-2 text-gray-700">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                <span>Giảm tải cho các cơ sở y tế</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                <span>Tiết kiệm thời gian và chi phí cho bệnh nhân</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                <span>Nâng cao khả năng tiếp cận dịch vụ y tế chất lượng cao</span>
              </li>
            </ul>

            <p className="text-gray-700 mb-8 leading-relaxed">
              Hệ thống y tế từ xa hiện đại không chỉ dừng lại ở việc tư vấn trực tuyến, mà còn tích hợp các chức năng quản lý hồ sơ y tế điện tử, theo dõi chỉ số sức khỏe theo thời gian thực và hỗ trợ ra quyết định lâm sàng dựa trên dữ liệu.
            </p>

            {/* AI Section */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">
              Lợi ích của phân tích dữ liệu & trí tuệ nhân tạo (AI) trong y tế từ xa
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Phân tích dữ liệu và trí tuệ nhân tạo (AI) đóng vai trò quan trọng trong việc nâng cao chất lượng chăm sóc bệnh nhân trong y tế từ xa. Thông qua việc thu thập và xử lý khối lượng lớn dữ liệu y tế như chỉ số sinh tồn, lịch sử bệnh án và phản hồi của bệnh nhân, hệ thống có khả năng theo dõi tình trạng sức khỏe một cách liên tục và toàn diện. Nhờ đó, các dấu hiệu bất thường có thể được phát hiện sớm, giúp bác sĩ can thiệp kịp thời và giảm thiểu nguy cơ biến chứng.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Bên cạnh đó, AI hỗ trợ phân tích dữ liệu y tế một cách thông minh, giúp bác sĩ trong quá trình chẩn đoán và ra quyết định điều trị. Các mô hình học máy có thể đề xuất chẩn đoán ban đầu, gợi ý phác đồ điều trị phù hợp và dự đoán nguy cơ tái phát bệnh dựa trên dữ liệu lịch sử. Điều này không chỉ giúp nâng cao độ chính xác trong chăm sóc y tế mà còn tiết kiệm thời gian cho đội ngũ y tế.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Ngoài ra, việc ứng dụng phân tích dữ liệu và AI còn cho phép cá nhân hóa quá trình chăm sóc sức khỏe theo đặc điểm riêng của từng bệnh nhân. Hệ thống có thể đưa ra các khuyến nghị về lối sống, chế độ theo dõi và tuân thủ điều trị, từ đó cải thiện hiệu quả điều trị và trải nghiệm người dùng. Đồng thời, dữ liệu tổng hợp và ẩn danh cũng giúp các cơ sở y tế đánh giá hiệu quả của mô hình y tế từ xa, tối ưu hóa quy trình vận hành và không ngừng nâng cao chất lượng dịch vụ chăm sóc sức khỏe.
            </p>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Phòng khám Sơn Tâm</h3>
              <img 
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F7bde5b68-ff56-43cb-a4a8-53b43e1723c9-phaang_khaam_saan_taacentm_720_x_360_px_copy.jpg&w=750&q=75"
                alt="Phòng khám"
                className="rounded-xl mb-4 w-full h-auto"
              />
              <button className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors">
                Đặt khám ngay
              </button>
            </div>

            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Tải App YTeXanh</h3>
              <p className="text-sm mb-4">Để đặt lịch nhanh chóng</p>
              <img 
                src="https://tse3.mm.bing.net/th/id/OIP.Y0GABe2QLMu4nHuWLXR1CwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Mobile app"
                className="rounded-xl mb-4 w-full h-auto"
              />
              <img 
                src={appStoreButtons}
                alt="App Store and Google Play"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Trải nghiệm Y Tế thông minh với <span className="text-cyan-500">YTeXanh</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: 'Top 1 ứng dụng y tế sử dụng nhiều nhất',
                icon: '📱'
              },
              {
                title: 'Ứng dụng với hơn 100 cơ sở y tế',
                icon: '🏥'
              },
              {
                title: 'Đa dạng dịch khám,cơ sở khớp hẹn',
                icon: '📋'
              },
              {
                title: 'Kết nối với Y Bác sĩ hơn 500 chuyên khoa',
                icon: '👨‍⚕️'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="text-gray-700">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-cyan-500 mb-8">Tin liên quan</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              title: 'Chụp CT tim',
              subtitle: 'bao nhiêu tiền?',
              description: 'Chụp CT tim bao nhiêu tiền? Top 2 địa chỉ uy tín...',
              date: '14/01/2026',
              image: ctTimImage,
              category: ''
            },
            {
              title: 'Chụp CT sọ não',
              subtitle: 'bao nhiêu tiền?',
              description: 'Chụp CT sọ não bao nhiêu tiền? Top 3 địa chỉ uy tín...',
              date: '14/01/2026',
              image: ctSoNaoImage,
              category: ''
            },
            {
              title: 'Tiêm viêm gan B',
              subtitle: 'ở đâu?',
              description: 'Tiêm viêm gan B ở đâu? Gợi ý 5 địa chỉ tiêm uy tín...',
              date: '14/01/2026',
              image: tiemViemGanBImage,
              category: ''
            },
            {
              title: 'Phẫu thuật trĩ nội',
              subtitle: 'ở đâu?',
              description: 'Phẫu thuật trĩ nội ở đâu? Gợi ý 5 địa chỉ bệnh viện...',
              date: '14/01/2026',
              image: phauThuatTriNoiImage,
              category: ''
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-xs">
                  {item.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {item.title}
                  <br />
                  <span className="text-cyan-500">{item.subtitle}</span>
                </h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{item.date}</span>
                  <a href="#" className="text-cyan-500 hover:text-cyan-600 text-sm font-semibold">
                    Xem tiếp →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full font-semibold transition-colors">
            Xem tất cả →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
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