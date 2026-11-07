import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { SelectUserType } from './components/SelectUserType';
import { AdminVerification } from './components/AdminVerification';
import { DoctorLogin } from './components/DoctorLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { DoctorDashboard } from './components/DoctorDashboard';
import { PatientDashboard } from './components/PatientDashboard';
import { SpecialistBooking } from './components/SpecialistBooking';
import { BookingForm } from './components/BookingForm';
import { BookingPatientInfo } from './components/BookingPatientInfo';
import { BookingConfirmation } from './components/BookingConfirmation';
import { BookingMoMoPayment } from './components/BookingMoMoPayment';
import { BookingMoMoSuccess } from './components/BookingMoMoSuccess';
import { BookingOnsiteSuccess } from './components/BookingOnsiteSuccess';
import { PharmacyShop } from './components/PharmacyShop';
import { PharmacyCheckout, DeliveryInfo } from './components/PharmacyCheckout';
import { PharmacyBankPayment } from './components/PharmacyBankPayment';
import { PharmacyCODSuccess } from './components/PharmacyCODSuccess';
import { PharmacyOrders, PharmacyOrder, PharmacyOrderStatus } from './components/PharmacyOrders';
import { OnlineConsultation } from './components/OnlineConsultation';
import { AppointmentsList } from './components/AppointmentsList';
import { HealthProfile } from './components/HealthProfile';
import { UpdateHealthInfo, HealthInfo } from './components/UpdateHealthInfo';
import { HealthProfileWelcomeModal } from './components/HealthProfileWelcomeModal';
import { PaymentSuccessModal } from './components/PaymentSuccessModal';
import { BookingSuccessModal } from './components/BookingSuccessModal';
import { VideoCallBooking } from './components/VideoCallBooking';
import { VideoCallForm } from './components/VideoCallForm';
import { VideoCallPatientInfo } from './components/VideoCallPatientInfo';
import logo from 'figma:asset/9762ac6aaff743488633e15c34d9ecd8b57a71c0.png';

type UserData = {
  email?: string;
  phone?: string;
  password: string;
};

export type Appointment = {
  id: string;
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
  paymentMethod: 'momo' | 'onsite';
  price: number;
  status: 'pending' | 'confirmed' | 'completed';
};

export type DoctorInfo = {
  id: string;
  name: string;
  specialty: string;
  account: string;
  password: string;
};

export type Message = {
  id: string;
  text: string;
  sender: 'patient' | 'doctor';
  timestamp: Date;
  image?: string;
  appointmentId: string;
};

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'select-user' | 'login' | 'register' | 'forgot' | 'admin-verify' | 'admin-dashboard' | 'doctor-login' | 'doctor-dashboard' | 'patient-dashboard' | 'appointments-list' | 'health-profile' | 'update-health-info' | 'specialist-booking' | 'booking-form' | 'booking-patient-info' | 'booking-confirmation' | 'booking-momo' | 'booking-momo-success' | 'booking-onsite-success' | 'pharmacy-shop' | 'pharmacy-checkout' | 'pharmacy-bank-payment' | 'pharmacy-cod-success' | 'pharmacy-orders' | 'online-consultation' | 'video-call-booking' | 'video-call-form' | 'video-call-patient-info'>('home');
  const [registeredUsers, setRegisteredUsers] = useState<UserData[]>([]);
  
  // Current logged in user ID
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  
  // Data stored per user
  const [userAppointmentsMap, setUserAppointmentsMap] = useState<Record<string, Appointment[]>>({});
  const [userPharmacyOrdersMap, setUserPharmacyOrdersMap] = useState<Record<string, PharmacyOrder[]>>({});
  const [userPharmacyCartMap, setUserPharmacyCartMap] = useState<Record<string, any[]>>({});
  const [userMessagesMap, setUserMessagesMap] = useState<Record<string, Message[]>>({});
  const [userHasCompletedProfileMap, setUserHasCompletedProfileMap] = useState<Record<string, boolean>>({});
  const [userHealthInfoMap, setUserHealthInfoMap] = useState<Record<string, HealthInfo>>({});

  // Load data from localStorage on mount
  useEffect(() => {
    const savedAppointments = localStorage.getItem('userAppointmentsMap');
    const savedPharmacyOrders = localStorage.getItem('userPharmacyOrdersMap');
    const savedPharmacyCart = localStorage.getItem('userPharmacyCartMap');
    const savedMessages = localStorage.getItem('userMessagesMap');
    const savedProfileStatus = localStorage.getItem('userHasCompletedProfileMap');
    const savedHealthInfo = localStorage.getItem('userHealthInfoMap');
    const savedRegisteredUsers = localStorage.getItem('registeredUsers');
    const savedCurrentUserId = localStorage.getItem('currentUserId');
    const savedUserName = localStorage.getItem('userName');

    if (savedAppointments) {
      try {
        setUserAppointmentsMap(JSON.parse(savedAppointments));
      } catch (e) {
        console.error('Error loading appointments:', e);
      }
    }

    if (savedPharmacyOrders) {
      try {
        setUserPharmacyOrdersMap(JSON.parse(savedPharmacyOrders));
      } catch (e) {
        console.error('Error loading pharmacy orders:', e);
      }
    }

    if (savedPharmacyCart) {
      try {
        setUserPharmacyCartMap(JSON.parse(savedPharmacyCart));
      } catch (e) {
        console.error('Error loading pharmacy cart:', e);
      }
    }

    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        // Convert timestamp strings back to Date objects
        const messagesWithDates = Object.keys(parsed).reduce((acc, userId) => {
          acc[userId] = parsed[userId].map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          return acc;
        }, {} as Record<string, Message[]>);
        setUserMessagesMap(messagesWithDates);
      } catch (e) {
        console.error('Error loading messages:', e);
      }
    }

    if (savedProfileStatus) {
      try {
        setUserHasCompletedProfileMap(JSON.parse(savedProfileStatus));
      } catch (e) {
        console.error('Error loading profile status:', e);
      }
    }

    if (savedHealthInfo) {
      try {
        const parsedHealthInfo = JSON.parse(savedHealthInfo);
        
        // CRITICAL FIX: Clean up phone number keys automatically on app load
        console.log('🧹 Cleaning up userHealthInfoMap...');
        console.log('📦 Original keys:', Object.keys(parsedHealthInfo));
        
        const cleanedHealthInfo = Object.keys(parsedHealthInfo).reduce((acc, key) => {
          // Keep only if key is NOT a phone number pattern (all digits)
          if (!/^\d+$/.test(key)) {
            acc[key] = parsedHealthInfo[key];
            console.log('✅ Keeping key:', key);
          } else {
            console.log('🗑️ Removing phone number key:', key);
          }
          return acc;
        }, {} as Record<string, HealthInfo>);
        
        console.log('📦 Cleaned keys:', Object.keys(cleanedHealthInfo));
        setUserHealthInfoMap(cleanedHealthInfo);
      } catch (e) {
        console.error('Error loading health info:', e);
      }
    }

    if (savedRegisteredUsers) {
      try {
        setRegisteredUsers(JSON.parse(savedRegisteredUsers));
      } catch (e) {
        console.error('Error loading registered users:', e);
      }
    }

    if (savedCurrentUserId) {
      setCurrentUserId(savedCurrentUserId);
    }

    if (savedUserName) {
      setUserName(savedUserName);
    }
  }, []);

  // Save data to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userAppointmentsMap', JSON.stringify(userAppointmentsMap));
  }, [userAppointmentsMap]);

  useEffect(() => {
    localStorage.setItem('userPharmacyOrdersMap', JSON.stringify(userPharmacyOrdersMap));
  }, [userPharmacyOrdersMap]);

  useEffect(() => {
    localStorage.setItem('userPharmacyCartMap', JSON.stringify(userPharmacyCartMap));
  }, [userPharmacyCartMap]);

  useEffect(() => {
    localStorage.setItem('userMessagesMap', JSON.stringify(userMessagesMap));
  }, [userMessagesMap]);

  useEffect(() => {
    localStorage.setItem('userHasCompletedProfileMap', JSON.stringify(userHasCompletedProfileMap));
  }, [userHasCompletedProfileMap]);

  useEffect(() => {
    localStorage.setItem('userHealthInfoMap', JSON.stringify(userHealthInfoMap));
  }, [userHealthInfoMap]);

  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem('currentUserId', currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);
  
  // Current user data (computed from maps) - with validation to ensure arrays
  const appointments = Array.isArray(userAppointmentsMap[currentUserId]) ? userAppointmentsMap[currentUserId] : [];
  const pharmacyOrders = Array.isArray(userPharmacyOrdersMap[currentUserId]) ? userPharmacyOrdersMap[currentUserId] : [];
  const pharmacyCart = Array.isArray(userPharmacyCartMap[currentUserId]) ? userPharmacyCartMap[currentUserId] : [];
  const messages = Array.isArray(userMessagesMap[currentUserId]) ? userMessagesMap[currentUserId] : [];
  const hasCompletedProfile = userHasCompletedProfileMap[currentUserId] || false;
  
  // Helper functions to update user-specific data
  const setAppointments = (newAppointments: Appointment[]) => {
    setUserAppointmentsMap(prev => ({ ...prev, [currentUserId]: newAppointments }));
  };
  
  const setPharmacyOrders = (newOrders: PharmacyOrder[]) => {
    setUserPharmacyOrdersMap(prev => ({ ...prev, [currentUserId]: newOrders }));
  };
  
  const setPharmacyCart = (newCart: any[]) => {
    setUserPharmacyCartMap(prev => ({ ...prev, [currentUserId]: newCart }));
  };
  
  const setMessages = (newMessages: Message[]) => {
    setUserMessagesMap(prev => ({ ...prev, [currentUserId]: newMessages }));
  };
  
  const setHasCompletedProfile = (completed: boolean) => {
    setUserHasCompletedProfileMap(prev => ({ ...prev, [currentUserId]: completed }));
  };
  
  const [healthInfo, setHealthInfo] = useState<HealthInfo | undefined>(undefined);
  const [showHealthProfileWelcome, setShowHealthProfileWelcome] = useState<boolean>(false);
  const [selectedHospital, setSelectedHospital] = useState<string>('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'momo' | 'onsite'>('momo');
  const [bookingServiceType, setBookingServiceType] = useState<'specialist' | 'home-health' | 'video-call'>('specialist'); // Track booking flow type
  const [pharmacyDeliveryInfo, setPharmacyDeliveryInfo] = useState<DeliveryInfo | null>(null);
  const [showPharmacyCODSuccess, setShowPharmacyCODSuccess] = useState<boolean>(false);
  const [currentDoctorId, setCurrentDoctorId] = useState<string>('');
  const [returnView, setReturnView] = useState<string>('health-profile'); // Track where to return after editing health info
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState<boolean>(false);
  const [showBookingSuccessModal, setShowBookingSuccessModal] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState({
    doctorName: '',
    specialty: '',
    service: '',
    date: '',
    time: ''
  });
  const [patientData, setPatientData] = useState({
    name: '',
    phone: '',
    birthDate: '',
    gender: ''
  });

  // Danh sách 5 bác sĩ
  const doctors: DoctorInfo[] = [
    { id: '1', name: 'BS Dương Gia', specialty: 'Da liễu', account: '1', password: '1' },
    { id: '2', name: 'BS Trần Thị Khánh Linh', specialty: 'Da liễu', account: '2', password: '2' },
    { id: '3', name: 'BS Võ Tấn Huy', specialty: 'Da liễu', account: '3', password: '3' },
    { id: '4', name: 'BS Nguyễn Thị Huỳnh Như', specialty: 'Da liễu', account: '4', password: '4' },
    { id: '5', name: 'BS Lê Thanh Xin', specialty: 'Da liễu', account: '5', password: '5' }
  ];

  // Map hospital names to addresses
  const hospitalAddresses: { [key: string]: string } = {
    'Phòng Khám Đa Khoa Vigor Health': '100-102-102A-104-106-108 Trương Định, Phường 9, Quận 3, TP. Hồ Chí Minh',
    'Phòng Khám Đa Khoa An Khang': '123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh',
    'Phòng Khám Đa Khoa Sài Gòn': '456 Lê Lợi, Quận 1, TP. Hồ Chí Minh'
  };

  const handleRegisterSuccess = (userData: UserData) => {
    setRegisteredUsers(prev => [...prev, userData]);
    console.log('Registered users:', [...registeredUsers, userData]);
  };

  const getTitle = () => {
    switch (currentView) {
      case 'select-user':
      case 'login':
      case 'register':
      case 'forgot':
      case 'admin-verify':
      case 'doctor-login':
      default:
    }
  };

  const getSubtitle = () => {
    switch (currentView) {
      case 'login':
        return 'Chào mừng trở lại';
      case 'register':
        return 'Tạo tài khoản mới';
      case 'forgot':
        return 'Khôi phục tài khoản của bạn';
      default:
        return '';
    }
  };

  // Show homepage
  if (currentView === 'home') {
    return <HomePage onNavigateToAuth={() => setCurrentView('select-user')} />;
  }

  // Show admin dashboard
  if (currentView === 'admin-dashboard') {
    return <AdminDashboard onLogout={() => setCurrentView('home')} />;
  }

  // Show doctor dashboard
  if (currentView === 'doctor-dashboard') {
    const currentDoctor = doctors.find(d => d.id === currentDoctorId);
    if (!currentDoctor) return null;
    
    // Aggregate all appointments from all users for doctor to see
    const allAppointments = Object.values(userAppointmentsMap).flat();
    
    // Aggregate all messages from all users for doctor to see
    const allMessages = Object.values(userMessagesMap).flat();
    
    return (
      <DoctorDashboard 
        doctorInfo={currentDoctor}
        appointments={allAppointments}
        messages={allMessages}
        userHealthInfoMap={userHealthInfoMap}
        onLogout={() => {
          setCurrentDoctorId('');
          setCurrentView('home');
        }}
        onSendMessage={(message) => {
          // Find which user this appointment belongs to
          for (const [userId, userAppointments] of Object.entries(userAppointmentsMap)) {
            if (userAppointments.some(apt => apt.id === message.appointmentId)) {
              // Add message to that user's messages
              setUserMessagesMap(prev => ({
                ...prev,
                [userId]: [...(prev[userId] || []), message]
              }));
              break;
            }
          }
        }}
      />
    );
  }

  // Show patient dashboard
  if (currentView === 'patient-dashboard') {
    return (
      <>
        <PatientDashboard 
          appointments={appointments} 
          onLogout={() => setCurrentView('home')} 
          onNavigateToSpecialist={() => {
            setBookingServiceType('specialist');
            setCurrentView('specialist-booking');
          }}
          onNavigateToHomeHealth={() => {
            setBookingServiceType('home-health');
            setCurrentView('specialist-booking'); // Use same component
          }}
          onNavigateToPharmacy={() => setCurrentView('pharmacy-shop')}
          onNavigateToAppointments={() => setCurrentView('appointments-list')} 
          onNavigateToHealthProfile={() => {
            console.log('🔍 Navigating to Health Profile');
            console.log('Current userName:', userName);
            console.log('Current userHealthInfoMap:', userHealthInfoMap);
            setCurrentView('health-profile');
          }}
          onNavigateToPharmacyOrders={() => setCurrentView('pharmacy-orders')}
          onNavigateToOnlineConsultation={() => setCurrentView('online-consultation')}
          onNavigateToVideoCall={() => setCurrentView('video-call-booking')}
        />
        
        {/* DEBUG BUTTON - Click to check localStorage */}
        <button
          onClick={() => {
            const data = JSON.parse(localStorage.getItem('userHealthInfoMap') || '{}');
            console.log('=== DEBUG: localStorage userHealthInfoMap ===');
            console.log('Keys:', Object.keys(data));
            console.log('Full data:', data);
            console.log('Current userName:', userName);
            console.log('Current userId:', currentUserId);
            alert(`🔍 DEBUG\n\nKeys in userHealthInfoMap: ${Object.keys(data).join(', ') || '(empty)'}\n\nCurrent userName: ${userName}\nCurrent userId: ${currentUserId}\n\nCheck Console (F12) for full data!`);
          }}
          className="fixed bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-bold"
        >
          🔍 DEBUG
        </button>
        
        {/* Show welcome modal for first-time users without health info */}
        {showHealthProfileWelcome && !userHealthInfoMap[currentUserId] && (
          <HealthProfileWelcomeModal 
            userName={userName}
            onClose={() => {
              setShowHealthProfileWelcome(false);
              setHasCompletedProfile(true); // Mark as dismissed
            }}
            onNavigateToProfile={() => {
              setShowHealthProfileWelcome(false);
              setCurrentView('health-profile');
            }}
          />
        )}
      </>
    );
  }

  // Show appointments list
  if (currentView === 'appointments-list') {
    return (
      <AppointmentsList 
        appointments={appointments} 
        messages={messages}
        onBack={() => setCurrentView('patient-dashboard')} 
        onLogout={() => setCurrentView('home')}
        onSendMessage={(message) => {
          // Update userMessagesMap for current user (doctor will see this via allMessages)
          setUserMessagesMap(prev => ({
            ...prev,
            [currentUserId]: [...(prev[currentUserId] || []), message]
          }));
        }}
      />
    );
  }

  // Show health profile
  if (currentView === 'health-profile') {
    // CRITICAL: Load health info by userName (patient name) - this is the fullName from registration
    const currentHealthInfo = userHealthInfoMap[userName] || healthInfo;
    
    console.log('🔍 Health Profile - Loading health info...');
    console.log('👤 userName:', userName);
    console.log('🗺️ All keys in userHealthInfoMap:', Object.keys(userHealthInfoMap));
    console.log('💊 Found health info:', currentHealthInfo);
    
    return (
      <HealthProfile 
        onBack={() => setCurrentView('patient-dashboard')} 
        onLogout={() => setCurrentView('home')} 
        onUpdateInfo={() => {
          // Set current health info before editing
          setHealthInfo(currentHealthInfo);
          setCurrentView('update-health-info');
        }}
        userName={userName || 'Người dùng'}
        healthInfo={currentHealthInfo}
        appointments={appointments}
      />
    );
  }

  // Show update health info
  if (currentView === 'update-health-info') {
    return (
      <UpdateHealthInfo 
        onBack={() => setCurrentView('health-profile')} 
        onLogout={() => setCurrentView('home')} 
        onSave={(info) => {
          console.log('💾 Saving health info...');
          console.log('👤 Current userName:', userName);
          console.log('👤 Current userId (email/phone):', currentUserId);
          console.log('📋 Health info fullName:', info.fullName);
          console.log('📋 Health info:', info);
          
          // CRITICAL: Use info.fullName as the storage key (the real patient name)
          const storageKey = info.fullName.trim();
          
          if (!storageKey) {
            alert('⚠️ Vui lòng nhập họ và tên!');
            return;
          }
          
          setHealthInfo(info);
          
          // Update userName to the fullName from health info
          setUserName(storageKey);
          
          // Clean up old keys and save with new key
          setUserHealthInfoMap(prev => {
            // Remove all entries where key looks like a phone number or email
            const cleaned = Object.keys(prev).reduce((acc, key) => {
              // Keep only if key is NOT a phone number pattern and NOT matching currentUserId
              if (!/^\d+$/.test(key) && key !== currentUserId) {
                acc[key] = prev[key];
              } else {
                console.log('🗑️ Removing old key:', key);
              }
              return acc;
            }, {} as Record<string, HealthInfo>);
            
            // Add new entry with fullName as key
            const updated = { ...cleaned, [storageKey]: info };
            console.log('🗺️ Updated userHealthInfoMap:', updated);
            console.log('🔑 Storage key used:', storageKey);
            console.log('📦 All keys in map:', Object.keys(updated));
            return updated;
          });
          
          alert(`✅ Đã lưu thông tin sức khỏe!\n\n🔑 Key lưu trữ: "${storageKey}"\n\nDữ liệu sẽ được tự động tải khi bạn đăng nhập lại.`);
          setCurrentView(returnView);
        }}
        currentInfo={healthInfo || { 
          fullName: userName, // Auto-fill with userName
          phoneNumber: '',
          birthDate: '',
          gender: '',
          email: '',
          address: '',
          bloodType: '',
          height: '',
          weight: '',
          bloodPressure: '',
          heartRate: '',
          bloodSugar: '',
          allergies: [],
          medications: [],
          medicalHistory: []
        }} 
      />
    );
  }

  // Show specialist booking
  if (currentView === 'specialist-booking') {
    return (
      <SpecialistBooking 
        onBack={() => setCurrentView('patient-dashboard')} 
        onLogout={() => setCurrentView('home')}
        onBookNow={(hospitalName) => {
          setSelectedHospital(hospitalName);
          setCurrentView('booking-form');
        }}
      />
    );
  }

  // Show booking form
  if (currentView === 'booking-form') {
    return (
      <BookingForm 
        hospitalName={selectedHospital} 
        serviceType={bookingServiceType}
        onBack={() => setCurrentView('specialist-booking')} 
        onLogout={() => setCurrentView('home')} 
        onContinue={(data) => {
          setBookingData(data);
          setCurrentView('booking-patient-info');
        }} 
      />
    );
  }

  // Show booking patient info
  if (currentView === 'booking-patient-info') {
    return (
      <BookingPatientInfo 
        hospitalName={selectedHospital}
        doctorName={bookingData.doctorName}
        specialty={bookingData.specialty}
        service={bookingData.service}
        date={bookingData.date}
        time={bookingData.time}
        healthInfo={healthInfo}
        onBack={() => setCurrentView('booking-form')} 
        onContinue={(data) => {
          setPatientData(data);
          setCurrentView('booking-confirmation');
        }}
        onLogout={() => setCurrentView('home')} 
        onNavigateToHealthProfile={() => {
          setReturnView('booking-patient-info');
          setCurrentView('update-health-info');
        }}
      />
    );
  }

  // Show booking confirmation
  if (currentView === 'booking-confirmation') {
    return (
      <>
        <BookingConfirmation 
          hospitalName={selectedHospital}
          hospitalAddress={hospitalAddresses[selectedHospital] || ''}
          doctorName={bookingData.doctorName}
          specialty={bookingData.specialty}
          service={bookingData.service}
          date={bookingData.date}
          time={bookingData.time}
          patientName={patientData.name}
          patientPhone={patientData.phone}
          patientBirthDate={patientData.birthDate}
          patientGender={patientData.gender}
          isVideoCall={bookingServiceType === 'video-call'}
          onBack={() => setCurrentView(bookingServiceType === 'video-call' ? 'video-call-patient-info' : 'booking-patient-info')} 
          onContinue={(paymentMethod) => {
            setSelectedPaymentMethod(paymentMethod);
            if (paymentMethod === 'momo') {
              setCurrentView('booking-momo');
            } else {
              // Create appointment and show success modal
              const newAppointment: Appointment = {
                id: Date.now().toString(),
                hospitalName: selectedHospital,
                hospitalAddress: hospitalAddresses[selectedHospital] || '',
                doctorName: bookingData.doctorName,
                specialty: bookingData.specialty,
                service: bookingData.service,
                date: bookingData.date,
                time: bookingData.time,
                patientName: patientData.name,
                patientPhone: patientData.phone,
                patientBirthDate: patientData.birthDate,
                patientGender: patientData.gender,
                paymentMethod: 'onsite',
                price: bookingServiceType === 'video-call' ? 300000 : 320000,
                status: 'pending'
              };
              // Save to current user's appointments
              setUserAppointmentsMap(prev => ({
                ...prev,
                [currentUserId]: [...(prev[currentUserId] || []), newAppointment]
              }));
              setShowBookingSuccessModal(true);
            }
          }}
          onLogout={() => setCurrentView('home')} 
        />
        
        {/* Show booking success modal */}
        {showBookingSuccessModal && (
          <BookingSuccessModal 
            onClose={() => {
              setShowBookingSuccessModal(false);
              setCurrentView('patient-dashboard');
            }}
          />
        )}
      </>
    );
  }

  // Show booking MoMo payment
  if (currentView === 'booking-momo') {
    const momoPrice = bookingServiceType === 'video-call' ? 300000 : 320000;
    return (
      <>
        <BookingMoMoPayment 
          price={momoPrice}
          onSuccess={() => {
            // Create appointment
            const newAppointment: Appointment = {
              id: Date.now().toString(),
              hospitalName: selectedHospital,
              hospitalAddress: hospitalAddresses[selectedHospital] || '',
              doctorName: bookingData.doctorName,
              specialty: bookingData.specialty,
              service: bookingData.service,
              date: bookingData.date,
              time: bookingData.time,
              patientName: patientData.name,
              patientPhone: patientData.phone,
              patientBirthDate: patientData.birthDate,
              patientGender: patientData.gender,
              paymentMethod: 'momo',
              price: momoPrice,
              status: 'confirmed'
            };
            // Save to current user's appointments
            setUserAppointmentsMap(prev => ({
              ...prev,
              [currentUserId]: [...(prev[currentUserId] || []), newAppointment]
            }));
            setShowPaymentSuccessModal(true);
          }}
          onLogout={() => setCurrentView('home')} 
        />
        
        {/* Show payment success modal */}
        {showPaymentSuccessModal && (
          <PaymentSuccessModal 
            onClose={() => {
              setShowPaymentSuccessModal(false);
              setCurrentView('patient-dashboard');
            }}
          />
        )}
      </>
    );
  }

  // Show booking MoMo success
  if (currentView === 'booking-momo-success') {
    return (
      <BookingMoMoSuccess 
        onBackToDashboard={() => setCurrentView('patient-dashboard')}
        onLogout={() => setCurrentView('home')} 
      />
    );
  }

  // Show booking onsite success
  if (currentView === 'booking-onsite-success') {
    return (
      <BookingOnsiteSuccess 
        onBackToDashboard={() => setCurrentView('patient-dashboard')}
        onLogout={() => setCurrentView('home')} 
      />
    );
  }

  // Show pharmacy shop
  if (currentView === 'pharmacy-shop') {
    return (
      <PharmacyShop 
        onBack={() => setCurrentView('patient-dashboard')}
        onLogout={() => setCurrentView('home')}
        onCheckout={(cart) => {
          setPharmacyCart(cart);
          setCurrentView('pharmacy-checkout');
        }}
      />
    );
  }

  // Show pharmacy checkout
  if (currentView === 'pharmacy-checkout') {
    const totalPrice = pharmacyCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    const createPharmacyOrder = (paymentMethod: 'cod' | 'bank', deliveryInfo: DeliveryInfo) => {
      console.log('🛒 Creating pharmacy order for user:', currentUserId);
      console.log('📦 Current pharmacy orders before:', pharmacyOrders);
      console.log('🗺️ Full userPharmacyOrdersMap before:', userPharmacyOrdersMap);
      
      if (!currentUserId) {
        alert('⚠️ LỖI: Không tìm thấy thông tin người dùng! Vui lòng đăng xuất và đăng nhập lại.');
        console.error('❌ currentUserId is empty!');
        return;
      }
      
      const newOrder: PharmacyOrder = {
        id: Date.now().toString(),
        items: pharmacyCart,
        totalPrice,
        deliveryInfo,
        paymentMethod,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      console.log('✅ New order created:', newOrder);
      
      setPharmacyOrders(prev => {
        const updated = [...prev, newOrder];
        console.log('📋 Updated pharmacy orders for user', currentUserId, ':', updated);
        return updated;
      });
      
      // Also directly update the map to ensure it's saved
      setUserPharmacyOrdersMap(prev => {
        // Ensure prev[currentUserId] is an array
        const currentOrders = Array.isArray(prev[currentUserId]) ? prev[currentUserId] : [];
        const updated = {
          ...prev,
          [currentUserId]: [...currentOrders, newOrder]
        };
        console.log('🗺️ Updated userPharmacyOrdersMap:', updated);
        return updated;
      });
    };
    
    return (
      <>
        <PharmacyCheckout 
          cart={pharmacyCart}
          onBack={() => setCurrentView('pharmacy-shop')}
          onLogout={() => setCurrentView('home')}
          onCODCheckout={(deliveryInfo) => {
            createPharmacyOrder('cod', deliveryInfo);
            setPharmacyDeliveryInfo(deliveryInfo);
            setShowPharmacyCODSuccess(true);
          }}
          onBankCheckout={(deliveryInfo) => {
            createPharmacyOrder('bank', deliveryInfo);
            setPharmacyDeliveryInfo(deliveryInfo);
            setCurrentView('pharmacy-bank-payment');
          }}
        />
        
        {/* Show pharmacy COD success modal overlay */}
        {showPharmacyCODSuccess && pharmacyDeliveryInfo && (
          <PharmacyCODSuccess 
            deliveryInfo={pharmacyDeliveryInfo}
            onGoHome={() => {
              setShowPharmacyCODSuccess(false);
              setCurrentView('patient-dashboard');
            }}
          />
        )}
      </>
    );
  }

  // Show pharmacy bank payment
  if (currentView === 'pharmacy-bank-payment' && pharmacyDeliveryInfo) {
    const totalPrice = pharmacyCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return (
      <PharmacyBankPayment 
        price={totalPrice}
        deliveryInfo={pharmacyDeliveryInfo}
        onSuccess={() => setCurrentView('patient-dashboard')}
        onLogout={() => setCurrentView('home')} 
      />
    );
  }

  // Show pharmacy orders
  if (currentView === 'pharmacy-orders') {
    return (
      <PharmacyOrders 
        orders={pharmacyOrders}
        onBack={() => setCurrentView('patient-dashboard')}
        onLogout={() => setCurrentView('home')}
        onUpdateOrderStatus={(orderId, newStatus) => {
          const updatedOrders = pharmacyOrders.map(order => 
            order.id === orderId 
              ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
              : order
          );
          setPharmacyOrders(updatedOrders);
        }}
      />
    );
  }

  // Show online consultation
  if (currentView === 'online-consultation') {
    return (
      <OnlineConsultation 
        onBack={() => setCurrentView('patient-dashboard')}
        onLogout={() => setCurrentView('home')}
      />
    );
  }

  // Show video call booking
  if (currentView === 'video-call-booking') {
    return (
      <VideoCallBooking 
        onBack={() => setCurrentView('patient-dashboard')} 
        onLogout={() => setCurrentView('home')}
        onBookNow={() => {
          setBookingServiceType('video-call');
          setCurrentView('video-call-form');
        }}
      />
    );
  }

  // Show video call form
  if (currentView === 'video-call-form') {
    return (
      <VideoCallForm 
        onBack={() => setCurrentView('video-call-booking')} 
        onLogout={() => setCurrentView('home')} 
        onContinue={(data) => {
          setBookingData(data);
          setCurrentView('video-call-patient-info');
        }} 
      />
    );
  }

  // Show video call patient info
  if (currentView === 'video-call-patient-info') {
    return (
      <VideoCallPatientInfo 
        doctorName={bookingData.doctorName}
        specialty={bookingData.specialty}
        service={bookingData.service}
        date={bookingData.date}
        time={bookingData.time}
        healthInfo={healthInfo}
        onBack={() => setCurrentView('video-call-form')} 
        onContinue={(data) => {
          setPatientData(data);
          setBookingServiceType('video-call');
          setCurrentView('booking-confirmation');
        }}
        onLogout={() => setCurrentView('home')} 
        onNavigateToHealthProfile={() => {
          setReturnView('video-call-patient-info');
          setCurrentView('update-health-info');
        }}
      />
    );
  }

  // Show auth forms
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
          {/* Header with Logo */}
          <div className="p-8 pb-6">
            {/* Logo and Brand Name */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <img src={logo} alt="YTeXanh" className="h-14 w-auto" />
              <span className="text-3xl font-bold text-cyan-500">YTeXanh</span>
            </div>
            
            {getTitle() && (
              <h1 className="text-center mb-2 text-cyan-600 text-3xl">
                {getTitle()}
              </h1>
            )}
          </div>

          {/* Forms */}
          <div className="px-8 pb-8">
            {currentView === 'select-user' ? (
              <SelectUserType
                onSelectPatient={() => setCurrentView('login')}
                onSelectAdmin={() => setCurrentView('admin-verify')}
                onSelectDoctor={() => setCurrentView('doctor-login')}
                onBackToHome={() => setCurrentView('home')}
              />
            ) : currentView === 'admin-verify' ? (
              <AdminVerification
                onVerified={() => setCurrentView('admin-dashboard')}
                onBack={() => setCurrentView('select-user')}
              />
            ) : currentView === 'doctor-login' ? (
              <DoctorLogin
                onLoginSuccess={(doctorId) => {
                  setCurrentDoctorId(doctorId);
                  setCurrentView('doctor-dashboard');
                }}
                onBack={() => setCurrentView('select-user')}
              />
            ) : currentView === 'login' ? (
              <LoginForm 
                onSwitchToRegister={() => setCurrentView('register')}
                onSwitchToForgot={() => setCurrentView('forgot')}
                onBackToHome={() => setCurrentView('select-user')}
                onLoginSuccess={(userId, userName) => {
                  // Set current user
                  setCurrentUserId(userId);
                  
                  console.log('🔐 Login successful!');
                  console.log('👤 userId (email/phone):', userId);
                  console.log('🗺️ userHealthInfoMap keys:', Object.keys(userHealthInfoMap));
                  
                  // Try to find health info - search through all values to find matching email/phone
                  let userHealth: HealthInfo | undefined;
                  let foundName = '';
                  
                  // Search through all health info to find one with matching email or phone
                  for (const [name, healthData] of Object.entries(userHealthInfoMap)) {
                    if (healthData.email === userId || healthData.phoneNumber === userId) {
                      userHealth = healthData;
                      foundName = name; // This is the fullName from health info
                      console.log('✅ Found health info for user:', name);
                      break;
                    }
                  }
                  
                  // Set userName from health info, or empty if not found yet
                  setUserName(foundName);
                  console.log('📝 userName (from health info):', foundName || '(not set yet)');
                  console.log('💊 Loaded health info:', userHealth);
                  
                  setHealthInfo(userHealth);
                  
                  // Check if user has completed profile or dismissed welcome
                  if (!userHasCompletedProfileMap[userId] && !userHealth) {
                    setShowHealthProfileWelcome(true);
                  }
                  setCurrentView('patient-dashboard');
                }}
                registeredUsers={registeredUsers}
              />
            ) : currentView === 'register' ? (
              <RegisterForm 
                onSwitchToLogin={() => setCurrentView('login')}
                onBackToHome={() => setCurrentView('select-user')}
                onRegisterSuccess={handleRegisterSuccess}
              />
            ) : (
              <ForgotPasswordForm
                onSwitchToLogin={() => setCurrentView('login')}
                onSwitchToRegister={() => setCurrentView('register')}
                onBackToHome={() => setCurrentView('select-user')}
              />
            )}
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center mt-6 text-gray-600 text-sm">
     
        </p>
      </div>
    </div>
  );
}