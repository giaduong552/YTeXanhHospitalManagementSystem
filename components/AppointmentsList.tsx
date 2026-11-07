import { Menu, ChevronDown, Facebook, Mail, Phone, MapPin, Clock, User, Download, Calendar, ArrowLeft, Stethoscope, Video, HeartPulse, MessageCircle, Paperclip, Send, X, Image as ImageIcon } from 'lucide-react';
import logo from 'figma:asset/9762ac6aaff743488633e15c34d9ecd8b57a71c0.png';
import type { Appointment, Message } from '../App';
import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'patient' | 'doctor';
  timestamp: Date;
  image?: string;
}

interface AppointmentsListProps {
  appointments: Appointment[];
  messages: Message[];
  onBack: () => void;
  onLogout: () => void;
  onSendMessage: (message: Message) => void;
}

export function AppointmentsList({ appointments, messages, onBack, onLogout, onSendMessage }: AppointmentsListProps) {
  const [activeTab, setActiveTab] = useState<'specialist' | 'video-call' | 'home-health'>('specialist');
  const [openChatId, setOpenChatId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({});
  const [currentMessage, setCurrentMessage] = useState('');
  const [readMessages, setReadMessages] = useState<Set<string>>(new Set());
  const [readAppointments, setReadAppointments] = useState<Set<string>>(new Set()); // NEW: Track read appointments
  const [expandedAppointments, setExpandedAppointments] = useState<Set<string>>(new Set()); // NEW: Track expanded appointments
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync messages from App state to local chat - merge with existing
  useEffect(() => {
    setChatMessages(prev => {
      const newChatMessages: Record<string, ChatMessage[]> = { ...prev };
      
      messages.forEach(msg => {
        if (!newChatMessages[msg.appointmentId]) {
          newChatMessages[msg.appointmentId] = [];
        }
        // Only add if message doesn't already exist
        const exists = newChatMessages[msg.appointmentId].some(m => m.id === msg.id);
        if (!exists) {
          newChatMessages[msg.appointmentId].push({
            id: msg.id,
            text: msg.text,
            sender: msg.sender,
            timestamp: msg.timestamp,
            image: msg.image
          });
        }
      });
      
      return newChatMessages;
    });
  }, [messages]);

  // Check if appointment has unread messages from doctor
  const hasUnreadMessages = (appointmentId: string) => {
    if (readMessages.has(appointmentId)) return false;
    const msgs = chatMessages[appointmentId] || [];
    return msgs.some(msg => msg.sender === 'doctor');
  };

  // Mark messages as read when opening chat
  const handleOpenChat = (appointmentId: string) => {
    setOpenChatId(openChatId === appointmentId ? null : appointmentId);
    if (openChatId !== appointmentId) {
      setReadMessages(prev => new Set(prev).add(appointmentId));
    }
  };

  // Filter appointments by service type
  const specialistAppointments = appointments.filter(apt => apt.service === 'Da liễu');
  const videoCallAppointments = appointments.filter(apt => apt.service === 'Tư Vấn Trực Tuyến');
  const homeHealthAppointments = appointments.filter(apt => apt.service === 'Bác Sĩ Gia Đình');

  // Count unread appointments by type
  const unreadSpecialistCount = specialistAppointments.filter(apt => !readAppointments.has(apt.id)).length;
  const unreadVideoCallCount = videoCallAppointments.filter(apt => !readAppointments.has(apt.id)).length;
  const unreadHomeHealthCount = homeHealthAppointments.filter(apt => !readAppointments.has(apt.id)).length;

  // Count unread messages
  const getUnreadMessagesCount = (appointmentIds: string[]) => {
    return appointmentIds.filter(id => hasUnreadMessages(id)).length;
  };

  const unreadMessagesSpecialist = getUnreadMessagesCount(specialistAppointments.map(apt => apt.id));
  const unreadMessagesVideoCall = getUnreadMessagesCount(videoCallAppointments.map(apt => apt.id));
  const unreadMessagesHomeHealth = getUnreadMessagesCount(homeHealthAppointments.map(apt => apt.id));

  // Mark appointment as read when user clicks on it
  const handleAppointmentClick = (appointmentId: string) => {
    setReadAppointments(prev => new Set(prev).add(appointmentId));
    setExpandedAppointments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(appointmentId)) {
        newSet.delete(appointmentId);
      } else {
        newSet.add(appointmentId);
      }
      return newSet;
    });
  };

  // Get current filtered appointments
  const getFilteredAppointments = () => {
    switch (activeTab) {
      case 'specialist':
        return specialistAppointments;
      case 'video-call':
        return videoCallAppointments;
      case 'home-health':
        return homeHealthAppointments;
      default:
        return [];
    }
  };

  const filteredAppointments = getFilteredAppointments();

  // Get tab info
  const getTabInfo = () => {
    switch (activeTab) {
      case 'specialist':
        return { title: 'Đặt khám chuyên khoa', icon: Stethoscope, color: 'blue' };
      case 'video-call':
        return { title: 'Gọi video bác sĩ', icon: Video, color: 'cyan' };
      case 'home-health':
        return { title: 'Y tế tại nhà', icon: HeartPulse, color: 'teal' };
      default:
        return { title: '', icon: Calendar, color: 'gray' };
    }
  };

  const tabInfo = getTabInfo();

  // Chat functions
  const handleSendMessage = (appointmentId: string) => {
    if (!currentMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: 'patient',
      timestamp: new Date(),
      appointmentId: appointmentId
    };

    // Add to local state immediately for instant feedback
    setChatMessages(prev => ({
      ...prev,
      [appointmentId]: [...(prev[appointmentId] || []), {
        id: newMessage.id,
        text: newMessage.text,
        sender: newMessage.sender,
        timestamp: newMessage.timestamp,
        image: newMessage.image
      }]
    }));

    onSendMessage(newMessage);
    setCurrentMessage('');
  };

  const handleFileAttach = (appointmentId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newMessage: Message = {
          id: Date.now().toString(),
          text: '',
          sender: 'patient',
          timestamp: new Date(),
          image: e.target?.result as string,
          appointmentId: appointmentId
        };
        
        // Add to local state immediately for instant feedback
        setChatMessages(prev => ({
          ...prev,
          [appointmentId]: [...(prev[appointmentId] || []), {
            id: newMessage.id,
            text: newMessage.text,
            sender: newMessage.sender,
            timestamp: newMessage.timestamp,
            image: newMessage.image
          }]
        }));
        
        onSendMessage(newMessage);
      };
      reader.readAsDataURL(file);
    }
  };

  const getActiveChatAppointment = () => {
    return filteredAppointments.find(apt => apt.id === openChatId);
  };

  const activeChatAppointment = getActiveChatAppointment();

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch hẹn của bạn</h1>
            <p className="text-gray-600">Quản lý và theo dõi các cuộc hẹn khám bệnh của bạn</p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-6 flex gap-2">
            <button
              onClick={() => setActiveTab('specialist')}
              className={`relative flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'specialist' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Stethoscope size={18} />
              <span>Đặt khám chuyên khoa</span>
              {(unreadSpecialistCount + unreadMessagesSpecialist) > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center px-1.5 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white">
                  {unreadSpecialistCount + unreadMessagesSpecialist}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('video-call')}
              className={`relative flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'video-call' 
                  ? 'bg-cyan-500 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Video size={18} />
              <span>Gọi video bác sĩ</span>
              {(unreadVideoCallCount + unreadMessagesVideoCall) > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center px-1.5 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white">
                  {unreadVideoCallCount + unreadMessagesVideoCall}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('home-health')}
              className={`relative flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'home-health' 
                  ? 'bg-teal-500 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <HeartPulse size={18} />
              <span>Y tế tại nhà</span>
              {(unreadHomeHealthCount + unreadMessagesHomeHealth) > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center px-1.5 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white">
                  {unreadHomeHealthCount + unreadMessagesHomeHealth}
                </span>
              )}
            </button>
          </div>

          {/* Appointments List */}
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-md">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                activeTab === 'specialist' ? 'bg-blue-100' : 
                activeTab === 'video-call' ? 'bg-cyan-100' : 'bg-teal-100'
              }`}>
                {activeTab === 'specialist' && <Stethoscope className="w-12 h-12 text-blue-500" />}
                {activeTab === 'video-call' && <Video className="w-12 h-12 text-cyan-500" />}
                {activeTab === 'home-health' && <HeartPulse className="w-12 h-12 text-teal-500" />}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có lịch hẹn {tabInfo.title}</h3>
              <p className="text-gray-600 mb-6">Bạn chưa có lịch hẹn nào cho dịch vụ này. Hãy đặt lịch để được chăm sóc sức khỏe tốt nhất!</p>
              <button
                onClick={onBack}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all"
              >
                Đặt lịch khám ngay
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="bg-cyan-100 rounded-xl p-3 flex-shrink-0">
                      <Calendar className="w-8 h-8 text-cyan-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900 text-xl mb-1">{appointment.hospitalName}</h3>
                          <p className="text-sm text-gray-600 flex items-start gap-1">
                            <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                            {appointment.hospitalAddress}
                          </p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {appointment.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-gray-500 mb-1">Bác sĩ</div>
                          <div className="font-semibold text-gray-800">{appointment.doctorName}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-gray-500 mb-1">Chuyên khoa</div>
                          <div className="font-semibold text-gray-800">{appointment.specialty}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-gray-500 mb-1">Ngày khám</div>
                          <div className="font-semibold text-gray-800">{appointment.date}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-gray-500 mb-1">Giờ khám</div>
                          <div className="font-semibold text-gray-800">{appointment.time}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-blue-50 rounded-lg p-3">
                          <div className="text-xs text-gray-500 mb-1">Thông tin bệnh nhân</div>
                          <div className="font-semibold text-gray-800">{appointment.patientName}</div>
                          <div className="text-sm text-gray-600">{appointment.patientPhone}</div>
                          <div className="text-sm text-gray-600">{appointment.patientBirthDate} • {appointment.patientGender}</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3">
                          <div className="text-xs text-gray-500 mb-1">Dịch vụ</div>
                          <div className="font-semibold text-gray-800">{appointment.service}</div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-600">
                            Thanh toán: <span className="font-semibold text-gray-800">
                              {appointment.paymentMethod === 'momo' ? 'Đã thanh toán qua MoMo' : 'Thanh toán tại cơ sở'}
                            </span>
                          </div>
                          {(activeTab === 'video-call' || activeTab === 'specialist' || activeTab === 'home-health') && (
                            <>
                              {activeTab === 'video-call' && appointment.status === 'confirmed' && (
                                <button
                                  onClick={() => window.open('https://meet.google.com/djz-vbjq-jwn', '_blank')}
                                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                                >
                                  <Video size={20} />
                                  <span>Tham gia cuộc gọi</span>
                                </button>
                              )}
                              <button
                                onClick={() => handleOpenChat(appointment.id)}
                                className="relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                              >
                                <MessageCircle size={20} />
                                <span>Nhắn tin với bác sĩ</span>
                                {hasUnreadMessages(appointment.id) && (
                                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                                )}
                              </button>
                            </>
                          )}
                        </div>
                        <div className="text-2xl font-bold text-cyan-600">
                          {appointment.price.toLocaleString('vi-VN')} đ
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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

      {/* Chat Box Modal */}
      {openChatId && activeChatAppointment && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-3 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <User className="text-cyan-600" size={20} />
              </div>
              <div>
                <h3 className="font-bold">{activeChatAppointment.doctorName}</h3>
                <p className="text-xs text-cyan-100">Đang hoạt động</p>
              </div>
            </div>
            <button
              onClick={() => setOpenChatId(null)}
              className="hover:bg-cyan-600 rounded-full p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {(!chatMessages[openChatId] || chatMessages[openChatId].length === 0) ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-3">
                  <MessageCircle className="text-cyan-600" size={32} />
                </div>
                <p className="text-gray-500 text-sm">Chưa có tin nhắn nào</p>
                <p className="text-gray-400 text-xs mt-1">Gửi tin nhắn đầu tiên cho bác sĩ</p>
              </div>
            ) : (
              chatMessages[openChatId].map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${message.sender === 'patient' ? 'order-2' : 'order-1'}`}>
                    <div className={`rounded-2xl overflow-hidden ${
                      message.sender === 'patient' 
                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-600' 
                        : 'bg-gray-200'
                    }`}>
                      {message.image && (
                        <img 
                          src={message.image} 
                          alt="Attachment" 
                          className="max-w-full h-auto cursor-pointer hover:opacity-90" 
                          onClick={() => window.open(message.image, '_blank')}
                        />
                      )}
                      {message.text && (
                        <div className={`px-4 py-2 ${
                          message.sender === 'patient' ? 'text-white' : 'text-gray-800'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                        </div>
                      )}
                    </div>
                    <p className={`text-xs text-gray-400 mt-1 px-1 ${
                      message.sender === 'patient' ? 'text-right' : 'text-left'
                    }`}>
                      {message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-3 bg-white rounded-b-2xl">
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleFileAttach(openChatId, e)}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Paperclip className="text-cyan-600" size={20} />
              </button>
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(openChatId);
                  }
                }}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                onClick={() => handleSendMessage(openChatId)}
                disabled={!currentMessage.trim()}
                className={`p-2 rounded-full transition-colors ${
                  currentMessage.trim()
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700'
                    : 'bg-gray-200'
                }`}
              >
                <Send className={currentMessage.trim() ? 'text-white' : 'text-gray-400'} size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}