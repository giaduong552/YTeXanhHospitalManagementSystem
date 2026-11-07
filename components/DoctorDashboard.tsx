import { useState, useRef, useEffect } from 'react';
import { 
  Stethoscope, LogOut, Calendar, Users, Video, 
  MessageSquare, Bell, Paperclip, Send, X, User,
  HeartPulse, MapPin, CreditCard, Phone, Mail, FileText,
  Activity, Droplet, Ruler, Weight, Heart, AlertCircle, Pill, History,
  Home, ClipboardList, AlertTriangle, TrendingUp, TrendingDown, Menu,
  CheckCircle, XCircle, Edit, Save, ChevronRight, Clock
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart, PieChart, Pie, Cell } from 'recharts';
import logo from 'figma:asset/9762ac6aaff743488633e15c34d9ecd8b57a71c0.png';
import type { Appointment, DoctorInfo, Message } from '../App';
import type { HealthInfo } from './UpdateHealthInfo';
import { HealthProfile } from './HealthProfile';

interface DoctorDashboardProps {
  doctorInfo: DoctorInfo;
  appointments: Appointment[];
  messages: Message[];
  userHealthInfoMap: Record<string, HealthInfo>;
  onLogout: () => void;
  onSendMessage: (message: Message) => void;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'patient' | 'doctor';
  timestamp: Date;
  image?: string;
}

interface PatientHealthData {
  patientName: string;
  patientPhone: string;
  birthDate: string;
  gender: string;
  age: number;
  email: string;
  address: string;
  bloodType: string;
  height: string;
  weight: string;
  mainCondition: string;
  healthStatus: 'normal' | 'warning' | 'critical';
  bloodPressure: { systolic: number; diastolic: number };
  heartRate: number;
  bloodSugar: number;
  allergies: { title: string; note: string }[];
  medications: { title: string; note: string }[];
  medicalHistory: { title: string; note: string }[];
  vitalsHistory: {
    date: string;
    bloodPressure: { systolic: number; diastolic: number };
    heartRate: number;
    weight: number;
  }[];
  consultationNotes: {
    date: string;
    note: string;
    treatment: string;
  }[];
}

type ViewType = 'dashboard' | 'patients' | 'patient-detail' | 'appointments' | 'appointment-detail' | 'notifications';

export function DoctorDashboard({ doctorInfo, appointments, messages, userHealthInfoMap, onLogout, onSendMessage }: DoctorDashboardProps) {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openChatId, setOpenChatId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({});
  const [currentMessage, setCurrentMessage] = useState('');
  const [readMessages, setReadMessages] = useState<Set<string>>(new Set());
  const [readAppointments, setReadAppointments] = useState<Set<string>>(new Set()); // NEW: Track read appointments
  const [readNotifications, setReadNotifications] = useState<Set<string>>(new Set()); // NEW: Track read notifications
  const [selectedPatient, setSelectedPatient] = useState<PatientHealthData | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointmentTab, setAppointmentTab] = useState<'specialist' | 'video' | 'home'>('specialist');
  const [appointmentHistoryTab, setAppointmentHistoryTab] = useState<'current' | 'history'>('current');
  const [completedAppointments, setCompletedAppointments] = useState<string[]>([]); // Store completed appointment IDs
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [consultationNote, setConsultationNote] = useState('');
  const [treatmentRecommendation, setTreatmentRecommendation] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate patient health data from appointments
  const generatePatientHealthData = (appointment: Appointment): PatientHealthData => {
    const birthDateParts = appointment.patientBirthDate?.split('/') || ['01', '01', '1990'];
    const birthYear = parseInt(birthDateParts[2] || '1990');
    const age = new Date().getFullYear() - birthYear;
    const patientNameKey = appointment.patientName.toLowerCase().replace(/\s/g, '');
    const randomSeed = patientNameKey.charCodeAt(0) % 100;
    
    const systolic = 110 + (randomSeed % 40);
    const diastolic = 70 + (randomSeed % 20);
    const heartRate = 60 + (randomSeed % 40);
    const bloodSugar = 80 + (randomSeed % 20);
    
    let healthStatus: 'normal' | 'warning' | 'critical' = 'normal';
    if (systolic > 140 || diastolic > 90 || heartRate > 100) {
      healthStatus = 'warning';
    }
    if (systolic > 160 || diastolic > 100 || heartRate > 110) {
      healthStatus = 'critical';
    }

    const vitalsHistory = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
        bloodPressure: {
          systolic: systolic + (Math.random() * 20 - 10),
          diastolic: diastolic + (Math.random() * 10 - 5)
        },
        heartRate: heartRate + (Math.random() * 20 - 10),
        weight: 60 + (randomSeed % 30) + (Math.random() * 2 - 1)
      };
    });

    return {
      patientName: appointment.patientName,
      patientPhone: appointment.patientPhone,
      birthDate: appointment.patientBirthDate,
      gender: appointment.patientGender,
      age,
      email: `${patientNameKey}@email.com`,
      address: 'Đà Nẵng, Việt Nam',
      bloodType: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'][randomSeed % 8],
      height: `${160 + (randomSeed % 30)} cm`,
      weight: `${60 + (randomSeed % 30)} kg`,
      mainCondition: ['Tiểu đường type 2', 'Cao huyết áp', 'Viêm da dị ứng', 'Đau dạ dày mãn tính', 'Viêm khớp'][randomSeed % 5],
      healthStatus,
      bloodPressure: { systolic, diastolic },
      heartRate,
      bloodSugar,
      allergies: [
        { title: 'Dị ứng thuốc', note: 'Penicillin, Aspirin' },
        { title: 'Dị ứng thực phẩm', note: 'Hải sản, đậu phộng' }
      ],
      medications: [
        { title: 'Metformin 500mg', note: '2 viên/ngày sau ăn' },
        { title: 'Amlodipine 5mg', note: '1 viên/ngày vào buổi sáng' },
        { title: 'Vitamin D3', note: '1 viên/tuần' }
      ],
      medicalHistory: [
        { title: 'Tiểu đường type 2', note: 'Được chẩn đoán năm 2020' },
        { title: 'Cao huyết áp', note: 'Được chẩn đoán năm 2018' },
        { title: 'Phẫu thuật ruột thừa', note: 'Năm 2015' }
      ],
      vitalsHistory,
      consultationNotes: [
        {
          date: '25/01/2026',
          note: 'Bệnh nhân than phiền đau đầu nhẹ, huyết áp cao hơn bình thường.',
          treatment: 'Tăng liều thuốc huyết áp, khuyên nghỉ ngơi và giảm stress. Tái khám sau 1 tuần.'
        }
      ]
    };
  };

  // Generate patient ID from name
  const generatePatientId = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `BN${String(hash).padStart(6, '0')}`;
  };

  // Format date to DD/MM (no trailing slash)
  const formatDateShort = (dateStr: string) => {
    if (!dateStr) return '';
    // Handle both "DD-MM-YYYY" and "DD/MM/YYYY" formats, and remove trailing slash
    const cleanStr = dateStr.trim().replace(/\/$/, ''); // Remove trailing slash
    const parts = cleanStr.includes('-') ? cleanStr.split('-') : cleanStr.split('/');
    if (parts.length >= 2) {
      return `${parts[0]}/${parts[1]}`;
    }
    return dateStr;
  };

  // Generate notifications
  const generateNotifications = () => {
    const notifications: any[] = [];
    
    // Appointment notifications
    doctorAppointments.forEach(apt => {
      if (!completedAppointments.includes(apt.id)) {
        notifications.push({
          id: `apt-${apt.id}`,
          type: 'appointment',
          patientName: apt.patientName,
          patientId: generatePatientId(apt.patientName),
          appointmentId: apt.id,
          message: `Bệnh nhân ${apt.patientName} đã đặt lịch khám ${apt.service}`,
          time: apt.date,
          isRead: readNotifications.has(`apt-${apt.id}`)
        });
      }
    });
    
    // Message notifications
    messages.forEach(msg => {
      const appointment = doctorAppointments.find(apt => apt.id === msg.appointmentId);
      if (appointment && msg.sender === 'patient' && !readMessages.has(msg.id)) {
        notifications.push({
          id: `msg-${msg.id}`,
          type: 'message',
          patientName: appointment.patientName,
          patientId: generatePatientId(appointment.patientName),
          appointmentId: msg.appointmentId,
          message: `Bệnh nhân ${appointment.patientName} đã gửi tin nhắn`,
          time: msg.timestamp.toLocaleString('vi-VN'),
          isRead: readNotifications.has(`msg-${msg.id}`)
        });
      }
    });
    
    return notifications.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  };

  // Sync messages - merge with existing messages instead of overwriting
  useEffect(() => {
    setChatMessages(prev => {
      const newChatMessages: Record<string, ChatMessage[]> = { ...prev };
      
      messages.forEach(msg => {
        const appointment = appointments.find(apt => apt.id === msg.appointmentId);
        if (appointment && appointment.doctorName === doctorInfo.name) {
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
        }
      });
      
      return newChatMessages;
    });
  }, [messages, appointments, doctorInfo.name]);

  const doctorAppointments = appointments.filter(apt => apt.doctorName === doctorInfo.name);
  // Use patientName + patientPhone as unique key to handle multiple patients correctly
  const uniquePatients = Array.from(
    new Map(doctorAppointments.map(apt => [`${apt.patientName}_${apt.patientPhone}`, apt])).values()
  );
  const patientsHealthData = uniquePatients.map(generatePatientHealthData);

  const normalPatients = patientsHealthData.filter(p => p.healthStatus === 'normal').length;
  const warningPatients = patientsHealthData.filter(p => p.healthStatus === 'warning').length;
  const criticalPatients = patientsHealthData.filter(p => p.healthStatus === 'critical').length;

  const todayAppointments = doctorAppointments.filter(apt => 
    apt.status === 'confirmed' || apt.status === 'pending'
  );

  // Count unread items - must be after doctorAppointments is defined
  const unreadAppointmentsCount = doctorAppointments.filter(apt => 
    !completedAppointments.includes(apt.id) && !readAppointments.has(apt.id)
  ).length;
  
  const unreadNotificationsCount = generateNotifications().filter(n => !n.isRead).length;

  // Categorize appointments
  const specialistAppointments = todayAppointments.filter(apt => apt.service === 'Da liễu');
  const videoCallAppointments = todayAppointments.filter(apt => apt.service === 'Tư Vấn Trực Tuyến');
  const homeHealthAppointments = todayAppointments.filter(apt => apt.service === 'Bác Sĩ Gia Đình');

  const handleSendMessage = (appointmentId: string, imageUrl?: string) => {
    if (!currentMessage.trim() && !imageUrl) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: 'doctor',
      timestamp: new Date(),
      image: imageUrl
    };
    setChatMessages(prev => ({
      ...prev,
      [appointmentId]: [...(prev[appointmentId] || []), newMessage]
    }));
    onSendMessage({
      id: newMessage.id,
      text: currentMessage,
      sender: 'doctor',
      timestamp: newMessage.timestamp,
      appointmentId,
      image: imageUrl
    });
    setCurrentMessage('');
  };

  const handleImageUpload = (appointmentId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSendMessage(appointmentId, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveConsultation = () => {
    if (selectedPatient && (consultationNote || treatmentRecommendation)) {
      alert('Đã lưu nhận xét và đề xuất điều trị!');
      setConsultationNote('');
      setTreatmentRecommendation('');
    }
  };

  // Check unread messages
  const hasUnreadMessages = (appointmentId: string) => {
    if (readMessages.has(appointmentId)) return false;
    const msgs = chatMessages[appointmentId] || [];
    return msgs.some(msg => msg.sender === 'patient');
  };

  const handleOpenChat = (appointmentId: string) => {
    setOpenChatId(openChatId === appointmentId ? null : appointmentId);
    if (openChatId !== appointmentId) {
      setReadMessages(prev => new Set(prev).add(appointmentId));
    }
  };

  // Sidebar Navigation
  const Sidebar = () => (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-600 to-indigo-700 text-white transition-all duration-300 flex flex-col h-screen fixed left-0 top-0 z-40`}>
      <div className="p-4 border-b border-blue-500">
        <div className="flex items-center gap-3">
          <img src={logo} alt="YTeXanh" className="h-10 w-10 rounded-lg" />
          {sidebarOpen && (
            <div>
              <h2 className="font-bold text-lg">YTeXanh</h2>
              <p className="text-xs text-blue-200">Hệ thống bác sĩ</p>
            </div>
          )}
        </div>
      </div>

      {sidebarOpen && (
        <div className="p-4 bg-blue-700 bg-opacity-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Stethoscope className="text-blue-600" size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate">{doctorInfo.name}</p>
              <p className="text-xs text-blue-200 truncate">{doctorInfo.specialty}</p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentView === 'dashboard' 
              ? 'bg-white text-blue-600 shadow-lg' 
              : 'hover:bg-blue-500 hover:bg-opacity-50'
          }`}
        >
          <Home size={20} />
          {sidebarOpen && <span className="font-semibold">Trang chủ</span>}
        </button>

        <button
          onClick={() => setCurrentView('patients')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentView === 'patients' || currentView === 'patient-detail'
              ? 'bg-white text-blue-600 shadow-lg' 
              : 'hover:bg-blue-500 hover:bg-opacity-50'
          }`}
        >
          <Users size={20} />
          {sidebarOpen && <span className="font-semibold">Bệnh nhân</span>}
          {sidebarOpen && (
            <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {uniquePatients.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setCurrentView('appointments')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentView === 'appointments'
              ? 'bg-white text-blue-600 shadow-lg' 
              : 'hover:bg-blue-500 hover:bg-opacity-50'
          }`}
        >
          <Calendar size={20} />
          {sidebarOpen && <span className="font-semibold">Lịch hẹn</span>}
          {sidebarOpen && unreadAppointmentsCount > 0 && (
            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadAppointmentsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setCurrentView('notifications')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentView === 'notifications'
              ? 'bg-white text-blue-600 shadow-lg' 
              : 'hover:bg-blue-500 hover:bg-opacity-50'
          }`}
        >
          <Bell size={20} />
          {sidebarOpen && <span className="font-semibold">Thông báo</span>}
          {sidebarOpen && unreadNotificationsCount > 0 && (
            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadNotificationsCount}
            </span>
          )}
        </button>
      </nav>

      <div className="p-4 border-t border-blue-500">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500 hover:bg-opacity-50 transition-colors"
        >
          <LogOut size={20} />
          {sidebarOpen && <span className="font-semibold">Đăng xuất</span>}
        </button>
      </div>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute -right-3 top-20 bg-white text-blue-600 rounded-full p-1 shadow-lg hover:shadow-xl transition-shadow"
      >
        <Menu size={20} />
      </button>
    </div>
  );

  // Dashboard View
  const DashboardView = () => {
    // Calculate today's hourly data for each patient
    const hourlyData = Array.from({ length: 24 }, (_, hour) => {
      const avgSystolic = patientsHealthData.reduce((sum, p) => sum + p.bloodPressure.systolic, 0) / patientsHealthData.length || 120;
      const avgDiastolic = patientsHealthData.reduce((sum, p) => sum + p.bloodPressure.diastolic, 0) / patientsHealthData.length || 80;
      const avgHeartRate = patientsHealthData.reduce((sum, p) => sum + p.heartRate, 0) / patientsHealthData.length || 75;
      
      return {
        hour: `${hour.toString().padStart(2, '0')}:00`,
        'Huyết áp tâm thu': Math.round(avgSystolic + (Math.random() * 10 - 5)),
        'Huyết áp tâm trương': Math.round(avgDiastolic + (Math.random() * 5 - 2.5)),
        'Nhịp tim': Math.round(avgHeartRate + (Math.random() * 10 - 5))
      };
    });

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Chào mừng trở lại, {doctorInfo.name}!</h1>
          <p className="text-blue-100">Hôm nay bạn có {todayAppointments.length} lịch hẹn đang chờ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="text-blue-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{uniquePatients.length}</p>
            <p className="text-sm text-gray-600">Bệnh nhân đang theo dõi</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {uniquePatients.length > 0 ? Math.round((normalPatients / uniquePatients.length) * 100) : 0}%
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{normalPatients}</p>
            <p className="text-sm text-gray-600">Trạng thái bình thường</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="text-yellow-600" size={24} />
              </div>
              <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                Cảnh báo
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{warningPatients}</p>
            <p className="text-sm text-gray-600">Cần theo dõi</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="text-red-600" size={24} />
              </div>
              <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                Khẩn cấp
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{criticalPatients}</p>
            <p className="text-sm text-gray-600">Tình trạng nghiêm trọng</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="text-blue-600" size={20} />
              Biểu đồ sức khỏe theo giờ (Hôm nay)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Huyết áp tâm thu" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="Huyết áp tâm trương" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="Nhịp tim" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HeartPulse className="text-red-600" size={20} />
              Phân bố trạng thái sức khỏe
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Bình thường', value: normalPatients, fill: '#10b981' },
                    { name: 'Cảnh báo', value: warningPatients, fill: '#f59e0b' },
                    { name: 'Nghiêm trọng', value: criticalPatients, fill: '#ef4444' }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[
                    { name: 'Bình thường', value: normalPatients, fill: '#10b981' },
                    { name: 'Cảnh báo', value: warningPatients, fill: '#f59e0b' },
                    { name: 'Nghiêm trọng', value: criticalPatients, fill: '#ef4444' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-orange-600" size={20} />
            Cảnh báo & Phân tích AI
          </h3>
          <div className="space-y-3">
            {patientsHealthData
              .filter(p => p.healthStatus !== 'normal')
              .slice(0, 3)
              .map((patient, index) => (
                <div key={index} className="bg-white rounded-lg p-4 flex items-start gap-4 border-l-4 border-orange-400">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    patient.healthStatus === 'critical' ? 'bg-red-100' : 'bg-yellow-100'
                  }`}>
                    <AlertCircle className={patient.healthStatus === 'critical' ? 'text-red-600' : 'text-yellow-600'} size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{patient.patientName}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {patient.healthStatus === 'critical' 
                        ? `⚠️ Huyết áp ${patient.bloodPressure.systolic}/${patient.bloodPressure.diastolic} mmHg - Vượt ngưỡng nguy hiểm!`
                        : `⚠️ Nhịp tim ${patient.heartRate} bpm - Cần theo dõi sát`
                      }
                    </p>
                    <button
                      onClick={() => {
                        setSelectedPatient(patient);
                        setCurrentView('patient-detail');
                      }}
                      className="text-xs text-blue-600 hover:text-blue-700 font-semibold mt-2 flex items-center gap-1"
                    >
                      Xem chi tiết <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Users className="text-blue-600" size={20} />
              Bệnh nhân gần đây
            </h3>
            <button
              onClick={() => setCurrentView('patients')}
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1"
            >
              Xem tất cả <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {patientsHealthData.slice(0, 5).map((patient, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedPatient(patient);
                  setCurrentView('patient-detail');
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  {patient.patientName.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{patient.patientName}</p>
                  <p className="text-sm text-gray-600">{patient.age} tuổi • {patient.mainCondition}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${
                    patient.healthStatus === 'normal' ? 'bg-green-500' :
                    patient.healthStatus === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></span>
                  <span className={`text-xs font-semibold ${
                    patient.healthStatus === 'normal' ? 'text-green-600' :
                    patient.healthStatus === 'warning' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {patient.healthStatus === 'normal' ? 'Bình thường' :
                     patient.healthStatus === 'warning' ? 'Cảnh báo' : 'Nghiêm trọng'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Appointments View
  const AppointmentsView = () => {
    const getFilteredAppointments = () => {
      let baseAppointments;
      switch (appointmentTab) {
        case 'specialist':
          baseAppointments = specialistAppointments;
          break;
        case 'video':
          baseAppointments = videoCallAppointments;
          break;
        case 'home':
          baseAppointments = homeHealthAppointments;
          break;
        default:
          baseAppointments = [];
      }

      // Filter by current/history
      if (appointmentHistoryTab === 'current') {
        return baseAppointments.filter(apt => !completedAppointments.includes(apt.id));
      } else {
        return baseAppointments.filter(apt => completedAppointments.includes(apt.id));
      }
    };

    const filteredAppointments = getFilteredAppointments().sort((a, b) => {
      // Sort by date ascending (earliest first)
      const dateA = a.date.split('-').reverse().join(''); // Convert DD-MM-YYYY to YYYYMMDD for comparison
      const dateB = b.date.split('-').reverse().join('');
      if (dateA !== dateB) return dateA.localeCompare(dateB);
      // If same date, sort by time
      return a.time.localeCompare(b.time);
    });
    
    const handleCompleteAppointment = (appointmentId: string) => {
      setCompletedAppointments(prev => [...prev, appointmentId]);
    };

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="text-blue-600" size={28} />
            Lịch hẹn
          </h2>

          {/* Service Type Tabs */}
          <div className="bg-gray-50 rounded-xl p-2 mb-6 flex gap-2">
            <button
              onClick={() => setAppointmentTab('specialist')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                appointmentTab === 'specialist' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Stethoscope size={18} />
              <span>Đặt khám chuyên khoa</span>
              {specialistAppointments.length > 0 && (
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                  appointmentTab === 'specialist' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                }`}>
                  {specialistAppointments.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setAppointmentTab('video')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                appointmentTab === 'video' 
                  ? 'bg-cyan-500 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Video size={18} />
              <span>Gọi video với bác sĩ</span>
              {videoCallAppointments.length > 0 && (
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                  appointmentTab === 'video' ? 'bg-cyan-600 text-white' : 'bg-cyan-100 text-cyan-600'
                }`}>
                  {videoCallAppointments.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setAppointmentTab('home')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                appointmentTab === 'home' 
                  ? 'bg-teal-500 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <HeartPulse size={18} />
              <span>Y tế tại nhà</span>
              {homeHealthAppointments.length > 0 && (
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                  appointmentTab === 'home' ? 'bg-teal-600 text-white' : 'bg-teal-100 text-teal-600'
                }`}>
                  {homeHealthAppointments.length}
                </span>
              )}
            </button>
          </div>

          {/* Current / History Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setAppointmentHistoryTab('current')}
              className={`pb-3 px-4 font-semibold transition-all ${
                appointmentHistoryTab === 'current'
                  ? 'text-cyan-600 border-b-2 border-cyan-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Lịch hẹn hiện tại
            </button>
            <button
              onClick={() => setAppointmentHistoryTab('history')}
              className={`pb-3 px-4 font-semibold transition-all ${
                appointmentHistoryTab === 'history'
                  ? 'text-cyan-600 border-b-2 border-cyan-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Lịch sử cuộc hẹn ({completedAppointments.length})
            </button>
          </div>

          {/* Appointments List */}
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto mb-4 text-gray-300" size={64} />
              <p className="text-gray-500">Không có lịch hẹn nào cho loại dịch vụ này</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`relative border-l-4 ${
                    appointmentTab === 'specialist' ? 'border-blue-500 bg-blue-50' :
                    appointmentTab === 'video' ? 'border-cyan-500 bg-cyan-50' :
                    'border-teal-500 bg-teal-50'
                  } rounded-lg p-5 hover:shadow-md transition-shadow ${
                    !readAppointments.has(appointment.id) && appointmentHistoryTab === 'current' ? 'ring-2 ring-red-200' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Date Display Only */}
                      <div className="relative text-center min-w-[80px] bg-white rounded-lg p-4 shadow-sm border-2 border-cyan-200">
                        <div className="text-3xl font-bold text-cyan-600">
                          {formatDateShort(appointment.date)}
                        </div>
                        {!readAppointments.has(appointment.id) && appointmentHistoryTab === 'current' && (
                          <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-gray-900 text-lg ${
                            !readAppointments.has(appointment.id) && appointmentHistoryTab === 'current' ? 'font-bold' : 'font-semibold'
                          }`}>{appointment.patientName}</h4>
                          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                            {appointment.id}
                          </span>
                          {!readAppointments.has(appointment.id) && appointmentHistoryTab === 'current' && (
                            <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                              Mới
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-cyan-600 font-semibold mb-1">{appointment.service}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            <span className="font-semibold">{appointment.time}</span>
                          </span>
                          {appointment.patientPhone && (
                            <span className="flex items-center gap-1">
                              <Phone size={14} />
                              <span>{appointment.patientPhone}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {appointment.service === 'Tư Vấn Trực Tuyến' && (
                        <button 
                          onClick={() => window.open('https://meet.google.com/djz-vbjq-jwn', '_blank')}
                          className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                          title="Tham gia cuộc gọi"
                        >
                          <Video size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleOpenChat(appointment.id)}
                        className="relative p-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                        title="Nhắn tin với bệnh nhân"
                      >
                        <MessageSquare size={18} />
                        {hasUnreadMessages(appointment.id) && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                        )}
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setCurrentView('appointment-detail');
                          // Mark appointment as read
                          setReadAppointments(prev => new Set(prev).add(appointment.id));
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold text-sm"
                      >
                        Chi tiết
                      </button>
                      {appointmentHistoryTab === 'current' && (
                        <button 
                          onClick={() => handleCompleteAppointment(appointment.id)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold text-sm flex items-center gap-2"
                        >
                          <CheckCircle size={18} />
                          Hoàn thành
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Patients View
  const PatientsView = () => {
    const filteredPatients = patientsHealthData.filter(patient => {
      const searchLower = patientSearchQuery.toLowerCase();
      const patientId = generatePatientId(patient.patientName);
      return patient.patientName.toLowerCase().includes(searchLower) || 
             patientId.toLowerCase().includes(searchLower);
    });

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="text-blue-600" size={28} />
              Danh sách bệnh nhân ({filteredPatients.length})
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc mã BN..."
                value={patientSearchQuery}
                onChange={(e) => setPatientSearchQuery(e.target.value)}
                className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPatients.map((patient, index) => {
              const patientId = generatePatientId(patient.patientName);
              // Find patient's latest appointment for chat
              const patientAppointment = doctorAppointments.find(apt => apt.patientName === patient.patientName);
              const hasUnread = patientAppointment && hasUnreadMessages(patientAppointment.id);
              
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border-2 border-blue-100 hover:border-cyan-300 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                        {patient.patientName.charAt(0)}
                      </div>
                      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg truncate mb-1">{patient.patientName}</h3>
                      <p className="text-sm text-blue-600 font-medium">{patientId}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {patientAppointment && (
                      <button 
                        onClick={() => handleOpenChat(patientAppointment.id)}
                        className="relative flex-1 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2"
                      >
                        <MessageSquare size={16} />
                        Nhắn tin
                        {hasUnread && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold">
                            !
                          </span>
                        )}
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        setSelectedPatient(patient);
                        setCurrentView('patient-detail');
                      }}
                      className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all"
                    >
                      Xem hồ sơ
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // [DEPRECATED] Old PatientDetailView - Not used anymore, replaced by renderPatientDetail() with HealthProfile
  const PatientDetailView = () => {
    if (!selectedPatient) return null;
    
    // Get real patient health info from userHealthInfoMap
    // Try exact match first, then case-insensitive match
    let patientHealthInfo = userHealthInfoMap[selectedPatient.patientName];
    if (!patientHealthInfo) {
      // Try case-insensitive match
      const patientNameLower = selectedPatient.patientName.toLowerCase();
      const matchingKey = Object.keys(userHealthInfoMap).find(
        key => key.toLowerCase() === patientNameLower
      );
      if (matchingKey) {
        patientHealthInfo = userHealthInfoMap[matchingKey];
      }
    }
    
    // Debug log
    console.log('=== PatientDetailView Debug ===');
    console.log('Selected Patient Name:', selectedPatient.patientName);
    console.log('Patient Health Info:', patientHealthInfo);
    console.log('userHealthInfoMap keys:', Object.keys(userHealthInfoMap));
    console.log('userHealthInfoMap:', userHealthInfoMap);
    
    // Calculate age from birthDate
    const calculateAge = (birthDate: string) => {
      const parts = birthDate?.split('/');
      if (!parts || parts.length !== 3) return null;
      const birthYear = parseInt(parts[2]);
      return new Date().getFullYear() - birthYear;
    };
    
    const age = calculateAge(selectedPatient.birthDate);
    
    return (
      <div className="space-y-6">
        <button onClick={() => setCurrentView('patients')} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
          <ChevronRight size={20} className="rotate-180" />
          Quay lại danh sách
        </button>

        {/* Debug Alert */}
        {!patientHealthInfo && (
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <p className="text-red-800 font-bold">⚠️ DEBUG: Không tìm thấy hồ sơ sức khỏe!</p>
            <p className="text-red-600 text-sm mt-1">Tên bệnh nhân: {selectedPatient.patientName}</p>
            <p className="text-red-600 text-sm">Keys trong map: {Object.keys(userHealthInfoMap).join(', ') || '(trống)'}</p>
          </div>
        )}

        {/* Patient Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-3xl flex-shrink-0">
              {selectedPatient.patientName.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{selectedPatient.patientName}</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-blue-200">Tuổi</p>
                  <p className="font-semibold">{age || '-'} tuổi</p>
                </div>
                <div>
                  <p className="text-blue-200">Giới tính</p>
                  <p className="font-semibold">{patientHealthInfo?.gender || selectedPatient.gender}</p>
                </div>
                <div>
                  <p className="text-blue-200">Nhóm máu</p>
                  <p className="font-semibold">{patientHealthInfo?.bloodType || '-'}</p>
                </div>
                <div>
                  <p className="text-blue-200">Trạng thái</p>
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-300 text-green-900">
                    {patientHealthInfo ? '✓ Đã cập nhật hồ sơ' : '⚠ Chưa cập nhật'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin cơ bản - Bắt buộc điền */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="text-blue-600" size={20} />
            Thông tin cơ bản
            <span className="text-xs text-red-500 ml-2">(Bắt buộc)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <User size={14} />
                Họ và tên
              </p>
              <p className="font-semibold text-gray-900">{patientHealthInfo?.fullName || selectedPatient.patientName}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <Calendar size={14} />
                Ngày sinh
              </p>
              <p className="font-semibold text-gray-900">{patientHealthInfo?.birthDate || selectedPatient.birthDate}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <User size={14} />
                Giới tính
              </p>
              <p className="font-semibold text-gray-900">{patientHealthInfo?.gender || selectedPatient.gender}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <Phone size={14} />
                Số điện thoại
              </p>
              <p className="font-semibold text-gray-900">{patientHealthInfo?.phoneNumber || selectedPatient.patientPhone}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <Mail size={14} />
                Email
              </p>
              <p className="font-semibold text-gray-900">{patientHealthInfo?.email || '-'}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <MapPin size={14} />
                Địa chỉ
              </p>
              <p className="font-semibold text-gray-900">{patientHealthInfo?.address || '-'}</p>
            </div>
          </div>
        </div>

        {/* Chỉ số sức khỏe */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="text-red-600" size={20} />
            Chỉ số sức khỏe
          </h3>
          {patientHealthInfo && (patientHealthInfo.height || patientHealthInfo.weight || patientHealthInfo.bloodPressure || patientHealthInfo.heartRate || patientHealthInfo.bloodType || patientHealthInfo.bloodSugar) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patientHealthInfo.height && (
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border-l-4 border-purple-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center">
                      <Ruler size={20} className="text-purple-700" />
                    </div>
                    <p className="text-sm text-gray-700 font-semibold">Chiều cao</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{patientHealthInfo.height}</p>
                </div>
              )}

              {patientHealthInfo.weight && (
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border-l-4 border-orange-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-orange-200 rounded-lg flex items-center justify-center">
                      <Weight size={20} className="text-orange-700" />
                    </div>
                    <p className="text-sm text-gray-700 font-semibold">Cân nặng</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{patientHealthInfo.weight}</p>
                </div>
              )}

              {patientHealthInfo.bloodPressure && (
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border-l-4 border-red-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-200 rounded-lg flex items-center justify-center">
                      <Activity size={20} className="text-red-700" />
                    </div>
                    <p className="text-sm text-gray-700 font-semibold">Huyết áp</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{patientHealthInfo.bloodPressure}</p>
                  <p className="text-xs text-gray-600 mt-1">mmHg</p>
                </div>
              )}

              {patientHealthInfo.heartRate && (
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-5 border-l-4 border-pink-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-pink-200 rounded-lg flex items-center justify-center">
                      <Heart size={20} className="text-pink-700" />
                    </div>
                    <p className="text-sm text-gray-700 font-semibold">Nhịp tim</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{patientHealthInfo.heartRate}</p>
                  <p className="text-xs text-gray-600 mt-1">bpm</p>
                </div>
              )}

              {patientHealthInfo.bloodType && (
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border-l-4 border-blue-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                      <Droplet size={20} className="text-blue-700" />
                    </div>
                    <p className="text-sm text-gray-700 font-semibold">Nhóm máu</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{patientHealthInfo.bloodType}</p>
                </div>
              )}

              {patientHealthInfo.bloodSugar && (
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-5 border-l-4 border-yellow-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-200 rounded-lg flex items-center justify-center">
                      <Droplet size={20} className="text-yellow-700" />
                    </div>
                    <p className="text-sm text-gray-700 font-semibold">Đường huyết</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{patientHealthInfo.bloodSugar}</p>
                  <p className="text-xs text-gray-600 mt-1">mg/dL</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <AlertCircle className="text-gray-400 mx-auto mb-2" size={32} />
              <p className="text-gray-500 text-sm">Bệnh nhân chưa nhập chỉ số sức khỏe</p>
            </div>
          )}
        </div>

        {/* Thông tin y tế (Dị ứng, Thuốc, Tiền sử) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dị ứng thuốc */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="text-yellow-600" size={20} />
              Dị ứng thuốc
            </h3>
            {patientHealthInfo?.allergies && patientHealthInfo.allergies.length > 0 ? (
              <div className="space-y-2">
                {patientHealthInfo.allergies.map((allergy, index) => (
                  <div key={index} className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                    <p className="font-semibold text-gray-900 text-sm">{allergy.title}</p>
                    {allergy.note && <p className="text-xs text-gray-600 mt-1">{allergy.note}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-gray-500 text-sm">Chưa có thông tin</p>
              </div>
            )}
          </div>

          {/* Thuốc đang dùng */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Pill className="text-green-600" size={20} />
              Thuốc đang dùng
            </h3>
            {patientHealthInfo?.medications && patientHealthInfo.medications.length > 0 ? (
              <div className="space-y-2">
                {patientHealthInfo.medications.map((medication, index) => (
                  <div key={index} className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <p className="font-semibold text-gray-900 text-sm">{medication.title}</p>
                    {medication.note && <p className="text-xs text-gray-600 mt-1">{medication.note}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-gray-500 text-sm">Chưa có thông tin</p>
              </div>
            )}
          </div>

          {/* Tiền sử bệnh */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <History className="text-purple-600" size={20} />
              Tiền sử bệnh
            </h3>
            {patientHealthInfo?.medicalHistory && patientHealthInfo.medicalHistory.length > 0 ? (
              <div className="space-y-2">
                {patientHealthInfo.medicalHistory.map((history, index) => (
                  <div key={index} className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                    <p className="font-semibold text-gray-900 text-sm">{history.title}</p>
                    {history.note && <p className="text-xs text-gray-600 mt-1">{history.note}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-gray-500 text-sm">Chưa có thông tin</p>
              </div>
            )}
          </div>
        </div>

      </div>
    );
  };

  // Notifications View
  const NotificationsView = () => {
    const notifications = generateNotifications();

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Bell className="text-cyan-600" size={28} />
            Thông báo ({notifications.length})
          </h2>

          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="mx-auto mb-4 text-gray-300" size={64} />
              <p className="text-gray-500">Không có thông báo mới</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative border-l-4 ${
                    notification.type === 'appointment' ? 'border-cyan-500 bg-cyan-50' : 'border-blue-500 bg-blue-50'
                  } rounded-lg p-5 hover:shadow-md transition-shadow ${
                    !notification.isRead ? 'ring-2 ring-red-200' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
                      notification.type === 'appointment' ? 'bg-cyan-100 text-cyan-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {notification.type === 'appointment' ? <Calendar size={24} /> : <MessageSquare size={24} />}
                      {!notification.isRead && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className={`text-gray-900 ${!notification.isRead ? 'font-bold' : 'font-semibold'}`}>
                          {notification.patientName}
                        </p>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                          {notification.patientId}
                        </span>
                        {!notification.isRead && (
                          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                            Mới
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {notification.time}
                        </span>
                        {notification.appointmentId && (
                          <span className="bg-gray-100 px-2 py-0.5 rounded">
                            Mã cuộc hẹn: {notification.appointmentId}
                          </span>
                        )}
                      </div>
                    </div>
                    {notification.type === 'message' && (
                      <button
                        onClick={() => {
                          handleOpenChat(notification.appointmentId);
                          setCurrentView('appointments');
                          // Mark notification as read
                          setReadNotifications(prev => new Set(prev).add(notification.id));
                        }}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        Trả lời
                      </button>
                    )}
                    {notification.type === 'appointment' && (
                      <button
                        onClick={() => {
                          const apt = doctorAppointments.find(a => a.id === notification.appointmentId);
                          if (apt) {
                            setSelectedAppointment(apt);
                            setCurrentView('appointment-detail');
                            // Mark appointment and notification as read
                            setReadAppointments(prev => new Set(prev).add(apt.id));
                            setReadNotifications(prev => new Set(prev).add(notification.id));
                          }
                        }}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        Xem chi tiết
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Appointment Detail View - Full Page
  const AppointmentDetailView = () => {
    if (!selectedAppointment) return null;
    
    // Get patient health info from userHealthInfoMap
    // Try exact match first, then case-insensitive match
    let patientHealthInfo = userHealthInfoMap[selectedAppointment.patientName];
    if (!patientHealthInfo) {
      // Try case-insensitive match
      const patientNameLower = selectedAppointment.patientName.toLowerCase();
      const matchingKey = Object.keys(userHealthInfoMap).find(
        key => key.toLowerCase() === patientNameLower
      );
      if (matchingKey) {
        patientHealthInfo = userHealthInfoMap[matchingKey];
      }
    }
    
    // Debug log
    console.log('AppointmentDetailView - Selected Patient:', selectedAppointment.patientName);
    console.log('AppointmentDetailView - Patient Health Info:', patientHealthInfo);
    console.log('AppointmentDetailView - All keys:', Object.keys(userHealthInfoMap));
    
    return (
      <div className="space-y-6">
        <button onClick={() => setCurrentView('appointments')} className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold">
          <ChevronRight size={20} className="rotate-180" />
          Quay lại danh sách lịch hẹn
        </button>

        {/* Appointment Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-cyan-600 font-bold text-3xl flex-shrink-0">
              {selectedAppointment.patientName.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{selectedAppointment.patientName}</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-cyan-200">Dịch vụ</p>
                  <p className="font-semibold">{selectedAppointment.service}</p>
                </div>
                <div>
                  <p className="text-cyan-200">Ngày hẹn</p>
                  <p className="font-semibold">{selectedAppointment.date}</p>
                </div>
                <div>
                  <p className="text-cyan-200">Giờ hẹn</p>
                  <p className="font-semibold">{selectedAppointment.time}</p>
                </div>
                <div>
                  <p className="text-cyan-200">Trạng thái</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedAppointment.status === 'confirmed' ? 'bg-green-300 text-green-900' :
                    selectedAppointment.status === 'pending' ? 'bg-yellow-300 text-yellow-900' : 'bg-blue-300 text-blue-900'
                  }`}>
                    {selectedAppointment.status === 'confirmed' ? 'Đã xác nhận' :
                     selectedAppointment.status === 'pending' ? 'Chờ xác nhận' : 'Hoàn thành'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {selectedAppointment.service === 'Tư Vấn Trực Tuyến' && (
            <button 
              onClick={() => window.open('https://meet.google.com/djz-vbjq-jwn', '_blank')}
              className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg"
            >
              <Video size={20} />
              Tham gia cuộc gọi
            </button>
          )}
          <button 
            onClick={() => {
              handleOpenChat(selectedAppointment.id);
              setCurrentView('appointments');
            }}
            className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageSquare size={20} />
            Nhắn tin
          </button>
        </div>

        {/* Thông tin cơ bản - Bắt buộc điền */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="text-cyan-600" size={20} />
            Thông tin cơ bản
            <span className="text-xs text-red-500 ml-2">(Bắt buộc)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-cyan-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <User size={14} />
                Họ và tên
              </p>
              <p className="font-semibold text-gray-900">{patientHealthInfo?.fullName || selectedAppointment.patientName}</p>
            </div>
            <div className="bg-cyan-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <Calendar size={14} />
                Ngày sinh
              </p>
              <p className="font-semibold text-gray-900">{patientHealthInfo?.birthDate || selectedAppointment.patientBirthDate}</p>
            </div>
            <div className="bg-cyan-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <User size={14} />
                Giới tính
              </p>
              <p className="font-semibold text-gray-900">{patientHealthInfo?.gender || selectedAppointment.patientGender}</p>
            </div>
            <div className="bg-cyan-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <Phone size={14} />
                Số điện thoại
              </p>
              <p className="font-semibold text-gray-900">{patientHealthInfo?.phoneNumber || selectedAppointment.patientPhone}</p>
            </div>
            <div className="bg-cyan-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <Mail size={14} />
                Email
              </p>
              <p className="font-semibold text-gray-900">{patientHealthInfo?.email || '-'}</p>
            </div>
            <div className="bg-cyan-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <MapPin size={14} />
                Địa chỉ
              </p>
              <p className="font-semibold text-gray-900">{patientHealthInfo?.address || '-'}</p>
            </div>
          </div>
        </div>

        {/* Chỉ số sức khỏe - Only show if patient has filled */}
        {patientHealthInfo && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="text-red-600" size={20} />
              Chỉ số sức khỏe
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patientHealthInfo.height && (
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border-l-4 border-purple-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center">
                      <Ruler size={20} className="text-purple-700" />
                    </div>
                    <p className="text-sm text-gray-700 font-semibold">Chiều cao</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{patientHealthInfo.height}</p>
                </div>
              )}

              {patientHealthInfo.weight && (
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border-l-4 border-orange-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-orange-200 rounded-lg flex items-center justify-center">
                      <Weight size={20} className="text-orange-700" />
                    </div>
                    <p className="text-sm text-gray-700 font-semibold">Cân nặng</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{patientHealthInfo.weight}</p>
                </div>
              )}

              {patientHealthInfo.bloodPressure && (
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border-l-4 border-red-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-200 rounded-lg flex items-center justify-center">
                      <Activity size={20} className="text-red-700" />
                    </div>
                    <p className="text-sm text-gray-700 font-semibold">Huyết áp</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{patientHealthInfo.bloodPressure}</p>
                  <p className="text-xs text-gray-600 mt-1">mmHg</p>
                </div>
              )}

              {patientHealthInfo.heartRate && (
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-5 border-l-4 border-pink-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-pink-200 rounded-lg flex items-center justify-center">
                      <Heart size={20} className="text-pink-700" />
                    </div>
                    <p className="text-sm text-gray-700 font-semibold">Nhịp tim</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{patientHealthInfo.heartRate}</p>
                  <p className="text-xs text-gray-600 mt-1">bpm</p>
                </div>
              )}

              {patientHealthInfo.bloodType && (
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border-l-4 border-blue-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                      <Droplet size={20} className="text-blue-700" />
                    </div>
                    <p className="text-sm text-gray-700 font-semibold">Nhóm máu</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{patientHealthInfo.bloodType}</p>
                </div>
              )}

              {patientHealthInfo.bloodSugar && (
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-5 border-l-4 border-yellow-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-200 rounded-lg flex items-center justify-center">
                      <Droplet size={20} className="text-yellow-700" />
                    </div>
                    <p className="text-sm text-gray-700 font-semibold">Đường huyết</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{patientHealthInfo.bloodSugar}</p>
                  <p className="text-xs text-gray-600 mt-1">mg/dL</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Thông tin y tế - Only show if patient has filled */}
        {patientHealthInfo && (patientHealthInfo.allergies?.length > 0 || patientHealthInfo.medications?.length > 0 || patientHealthInfo.medicalHistory?.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dị ứng thuốc */}
            {patientHealthInfo.allergies && patientHealthInfo.allergies.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="text-yellow-600" size={20} />
                  Dị ứng thuốc
                </h3>
                <div className="space-y-2">
                  {patientHealthInfo.allergies.map((allergy, index) => (
                    <div key={index} className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                      <p className="font-semibold text-gray-900 text-sm">{allergy.title}</p>
                      {allergy.note && <p className="text-xs text-gray-600 mt-1">{allergy.note}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Thuốc đang dùng */}
            {patientHealthInfo.medications && patientHealthInfo.medications.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Pill className="text-green-600" size={20} />
                  Thuốc đang dùng
                </h3>
                <div className="space-y-2">
                  {patientHealthInfo.medications.map((medication, index) => (
                    <div key={index} className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <p className="font-semibold text-gray-900 text-sm">{medication.title}</p>
                      {medication.note && <p className="text-xs text-gray-600 mt-1">{medication.note}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tiền sử bệnh */}
            {patientHealthInfo.medicalHistory && patientHealthInfo.medicalHistory.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <History className="text-purple-600" size={20} />
                  Tiền sử bệnh
                </h3>
                <div className="space-y-2">
                  {patientHealthInfo.medicalHistory.map((history, index) => (
                    <div key={index} className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                      <p className="font-semibold text-gray-900 text-sm">{history.title}</p>
                      {history.note && <p className="text-xs text-gray-600 mt-1">{history.note}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Show message if no health info */}
        {!patientHealthInfo && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <AlertCircle className="text-yellow-600 mx-auto mb-3" size={40} />
            <p className="text-gray-700 font-semibold mb-2">Bệnh nhân chưa cập nhật hồ sơ sức khỏe</p>
            <p className="text-sm text-gray-600">Chỉ hiển thị thông tin cơ bản từ lịch hẹn</p>
          </div>
        )}

        {/* Thông tin thanh toán */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard className="text-green-600" size={20} />
            Thông tin thanh toán
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Số tiền</p>
              <p className="font-semibold text-gray-900 text-xl">{selectedAppointment.price?.toLocaleString('vi-VN')}đ</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Phương thức</p>
              <p className="font-semibold text-gray-900">{selectedAppointment.paymentMethod === 'momo' ? 'MoMo' : 'Thanh toán tại chỗ'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Appointment Detail Modal - FULL VERSION
  const AppointmentDetailModal = () => {
    if (!selectedAppointment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between sticky top-0 z-10">
            <h2 className="text-xl font-bold">Chi tiết lịch hẹn</h2>
            <button onClick={() => setSelectedAppointment(null)} className="hover:bg-white hover:bg-opacity-20 rounded-full p-1">
              <X size={24} />
            </button>
          </div>
          <div className="p-6 space-y-6">
            {/* Service Info */}
            <div className="bg-cyan-50 rounded-xl p-5 border-l-4 border-cyan-500">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Stethoscope className="text-cyan-600" size={20} />
                Thông tin dịch vụ
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Dịch vụ</p>
                  <p className="font-semibold text-gray-900">{selectedAppointment.service}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày hẹn</p>
                  <p className="font-semibold text-gray-900">{selectedAppointment.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Giờ hẹn</p>
                  <p className="font-semibold text-gray-900">{selectedAppointment.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trạng thái</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedAppointment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    selectedAppointment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    selectedAppointment.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedAppointment.status === 'confirmed' ? 'Đã xác nhận' :
                     selectedAppointment.status === 'pending' ? 'Chờ xác nhận' :
                     selectedAppointment.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                  </span>
                </div>
              </div>
            </div>

            {/* Patient Info */}
            <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-500">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <User className="text-blue-600" size={20} />
                Thông tin bệnh nhân
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Họ tên</p>
                  <p className="font-semibold text-gray-900">{selectedAppointment.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Số điện thoại</p>
                  <p className="font-semibold text-gray-900">{selectedAppointment.patientPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Giới tính</p>
                  <p className="font-semibold text-gray-900">{selectedAppointment.patientGender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày sinh</p>
                  <p className="font-semibold text-gray-900">{selectedAppointment.patientBirthDate}</p>
                </div>
              </div>
            </div>

            {/* Doctor & Location Info */}
            <div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-500">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="text-purple-600" size={20} />
                Thông tin bác sĩ & Địa điểm
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Bác sĩ</p>
                  <p className="font-semibold text-gray-900">{selectedAppointment.doctorName}</p>
                </div>
                {selectedAppointment.location && (
                  <div>
                    <p className="text-sm text-gray-600">Địa điểm</p>
                    <p className="font-semibold text-gray-900">{selectedAppointment.location}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-green-50 rounded-xl p-5 border-l-4 border-green-500">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <CreditCard className="text-green-600" size={20} />
                Thông tin thanh toán
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Số tiền</p>
                  <p className="font-semibold text-gray-900">{selectedAppointment.price?.toLocaleString('vi-VN')}đ</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phương thức</p>
                  <p className="font-semibold text-gray-900">{selectedAppointment.paymentMethod || 'MoMo'}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {selectedAppointment.service === 'Tư Vấn Trực Tuyến' && (
                <button 
                  onClick={() => window.open('https://meet.google.com/djz-vbjq-jwn', '_blank')}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  <Video size={20} />
                  Tham gia cuộc gọi
                </button>
              )}
              <button 
                onClick={() => {
                  handleOpenChat(selectedAppointment.id);
                  setSelectedAppointment(null);
                }}
                className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <MessageSquare size={20} />
                Nhắn tin
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Chat Modal
  const ChatModal = () => {
    if (!openChatId) return null;
    const chatAppointment = todayAppointments.find(apt => apt.id === openChatId);
    if (!chatAppointment) return null;

    return (
      <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50">
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-3 rounded-t-2xl flex items-center justify-between">
          <div>
            <h3 className="font-bold">{chatAppointment.patientName}</h3>
            <p className="text-xs">Bệnh nhân</p>
          </div>
          <button onClick={() => setOpenChatId(null)}>
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {(!chatMessages[openChatId] || chatMessages[openChatId].length === 0) ? (
            <div className="text-center text-gray-500">Chưa có tin nhắn</div>
          ) : (
            chatMessages[openChatId].map((message) => (
              <div key={message.id} className={`mb-3 ${message.sender === 'doctor' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block px-4 py-2 rounded-lg max-w-[80%] ${
                  message.sender === 'doctor' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-900'
                }`}>
                  {message.image && (
                    <img 
                      src={message.image} 
                      alt="Uploaded" 
                      className="max-w-full rounded-lg mb-2 cursor-pointer hover:opacity-90"
                      onClick={() => window.open(message.image, '_blank')}
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
                <div className={`text-xs mt-1 ${
                  message.sender === 'doctor' ? 'text-gray-500 text-right' : 'text-gray-500 text-left'
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString('vi-VN', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    day: '2-digit',
                    month: '2-digit'
                  })}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-3 border-t">
          <div className="flex gap-2">
            <input
              type="file"
              id={`doctor-image-upload-${openChatId}`}
              accept="image/*"
              onChange={(e) => handleImageUpload(openChatId, e)}
              className="hidden"
            />
            <label 
              htmlFor={`doctor-image-upload-${openChatId}`}
              className="p-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full cursor-pointer transition-colors"
            >
              <Paperclip size={20} />
            </label>
            <input
              key={`chat-input-${openChatId}`}
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(openChatId)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button onClick={() => handleSendMessage(openChatId)} className="p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full transition-colors">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Patient Detail View using HealthProfile component (for doctor to view patient's health profile)
  const renderPatientDetail = () => {
    if (!selectedPatient) return null;
    
    // Get all keys in userHealthInfoMap
    const allKeys = Object.keys(userHealthInfoMap);
    
    // Get patient health info from userHealthInfoMap
    let patientHealthInfo = userHealthInfoMap[selectedPatient.patientName];
    let matchedKey = selectedPatient.patientName;
    
    // Try case-insensitive match if exact match fails
    if (!patientHealthInfo) {
      const patientNameLower = selectedPatient.patientName.toLowerCase();
      const foundKey = Object.keys(userHealthInfoMap).find(
        key => key.toLowerCase() === patientNameLower
      );
      if (foundKey) {
        patientHealthInfo = userHealthInfoMap[foundKey];
        matchedKey = foundKey;
      }
    }
    
    // Get patient's appointments
    const patientAppointments = appointments.filter(
      apt => apt.patientName.toLowerCase() === selectedPatient.patientName.toLowerCase()
    );
    
    console.log('🔍 Doctor viewing patient profile:');
    console.log('Patient Name:', selectedPatient.patientName);
    console.log('Health Info:', patientHealthInfo);
    console.log('All keys in userHealthInfoMap:', allKeys);
    console.log('Appointments:', patientAppointments);
    
    // DEBUG PANEL - Show if no health info found
    if (!patientHealthInfo) {
      return (
        <div className="space-y-6">
          <button onClick={() => setCurrentView('patients')} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
            <ChevronRight size={20} className="rotate-180" />
            Quay lại danh sách
          </button>
          
          <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
              <AlertCircle size={28} />
              ⚠️ KHÔNG TÌM THẤY HỒ SƠ SỨC KHỎE
            </h2>
            
            <div className="space-y-4 text-sm">
              <div className="bg-white rounded-lg p-4">
                <div className="font-bold text-gray-700 mb-2">🔍 Tên bệnh nhân trong lịch hẹn:</div>
                <div className="text-xl font-mono bg-yellow-100 p-2 rounded border-2 border-yellow-400">
                  "{selectedPatient.patientName}"
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <div className="font-bold text-gray-700 mb-2">📋 Tên có trong hệ thống (userHealthInfoMap):</div>
                {allKeys.length > 0 ? (
                  <div className="space-y-1">
                    {allKeys.map((key, idx) => (
                      <div key={idx} className="font-mono bg-green-100 p-2 rounded border border-green-400">
                        "{key}"
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-red-600 font-bold">❌ TRỐNG - Chưa có bệnh nhân nào nhập thông tin!</div>
                )}
              </div>
              
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
                <div className="font-bold text-yellow-800 mb-2">💡 NGUYÊN NHÂN:</div>
                <ul className="list-disc list-inside space-y-1 text-yellow-900">
                  <li>Tên khi <strong>đặt lịch</strong> khác với tên khi <strong>đăng ký/lưu thông tin</strong></li>
                  <li>Có thể có khoảng trắng thừa, viết hoa/thường khác nhau</li>
                  <li>Hoặc bệnh nhân chưa vào "Hồ sơ sức khỏe" → "Cập nhật thông tin"</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4">
                <div className="font-bold text-blue-800 mb-2">✅ GIẢI PHÁP:</div>
                <ol className="list-decimal list-inside space-y-1 text-blue-900">
                  <li>Đăng xuất bác sĩ → Đăng nhập bệnh nhân</li>
                  <li>Vào "Hồ sơ sức khỏe" → "Cập nhật thông tin"</li>
                  <li>Điền đầy đủ thông tin và lưu</li>
                  <li>Khi đặt lịch, nhập <strong>CHÍNH XÁC</strong> tên này: <span className="font-mono bg-yellow-100 px-2 py-1 rounded">"{allKeys[0] || 'tên đăng ký'}"</span></li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div>
        {/* Debug info banner at top */}
        <div className="bg-green-50 border border-green-300 rounded-lg p-3 mb-4 text-sm">
          <div className="flex items-center gap-2 text-green-800 font-semibold mb-1">
            <CheckCircle size={18} />
            ✅ Đã tìm thấy hồ sơ sức khỏe!
          </div>
          <div className="text-green-700 text-xs">
            Khớp với key: <span className="font-mono bg-green-100 px-2 py-0.5 rounded">"{matchedKey}"</span>
          </div>
        </div>
        
        <HealthProfile
          onBack={() => setCurrentView('patients')}
          onLogout={onLogout}
          onUpdateInfo={() => {
            // Doctors cannot update patient info (this won't be called since button is hidden)
            alert('Bác sĩ không thể chỉnh sửa thông tin bệnh nhân.');
          }}
          userName={selectedPatient.patientName}
          healthInfo={patientHealthInfo}
          appointments={patientAppointments}
          isDoctorView={true}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}>
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'patients' && <PatientsView />}
        {currentView === 'patient-detail' && renderPatientDetail()}
        {currentView === 'appointments' && <AppointmentsView />}
        {currentView === 'appointment-detail' && <AppointmentDetailView />}
        {currentView === 'notifications' && <NotificationsView />}
      </div>
      <ChatModal />
    </div>
  );
}
