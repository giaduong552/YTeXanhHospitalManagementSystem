import { Menu, ChevronDown, Facebook, Mail, Phone, MapPin, Clock, User, Download, ArrowLeft, Package, Truck, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import logo from 'figma:asset/9762ac6aaff743488633e15c34d9ecd8b57a71c0.png';

export type PharmacyOrderStatus = 'pending' | 'preparing' | 'shipping' | 'delivered' | 'returned' | 'cancelled';

export interface PharmacyOrderItem {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  quantity: number;
}

export interface PharmacyOrder {
  id: string;
  items: PharmacyOrderItem[];
  totalPrice: number;
  deliveryInfo: {
    fullName: string;
    phoneNumber: string;
    address: string;
  };
  paymentMethod: 'cod' | 'bank';
  status: PharmacyOrderStatus;
  createdAt: string;
  updatedAt: string;
}

interface PharmacyOrdersProps {
  orders: PharmacyOrder[];
  onBack: () => void;
  onLogout: () => void;
  onUpdateOrderStatus: (orderId: string, newStatus: PharmacyOrderStatus) => void;
}

export function PharmacyOrders({ orders, onBack, onLogout, onUpdateOrderStatus }: PharmacyOrdersProps) {
  const [activeTab, setActiveTab] = useState<PharmacyOrderStatus | 'all'>('all');

  // Ensure orders is always an array
  const safeOrders = Array.isArray(orders) ? orders : [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusInfo = (status: PharmacyOrderStatus) => {
    switch (status) {
      case 'pending':
        return { label: 'Chờ Xác Nhận', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200', icon: Clock };
      case 'preparing':
        return { label: 'Chờ Lấy Hàng', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', icon: Package };
      case 'shipping':
        return { label: 'Chờ Giao Hàng', color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200', icon: Truck };
      case 'delivered':
        return { label: 'Đã Giao', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200', icon: CheckCircle };
      case 'returned':
        return { label: 'Trả Hàng', color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200', icon: RotateCcw };
      case 'cancelled':
        return { label: 'Đã Hủy', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200', icon: XCircle };
    }
  };

  const filteredOrders = activeTab === 'all' 
    ? safeOrders 
    : safeOrders.filter(order => order.status === activeTab);

  const tabs = [
    { key: 'all', label: 'Tất cả', count: safeOrders.length },
    { key: 'pending', label: 'Chờ Xác Nhận', count: safeOrders.filter(o => o.status === 'pending').length },
    { key: 'preparing', label: 'Chờ Lấy Hàng', count: safeOrders.filter(o => o.status === 'preparing').length },
    { key: 'shipping', label: 'Chờ Giao Hàng', count: safeOrders.filter(o => o.status === 'shipping').length },
    { key: 'delivered', label: 'Đã Giao', count: safeOrders.filter(o => o.status === 'delivered').length },
    { key: 'returned', label: 'Trả Hàng', count: safeOrders.filter(o => o.status === 'returned').length },
    { key: 'cancelled', label: 'Đã Hủy', count: safeOrders.filter(o => o.status === 'cancelled').length },
  ];

  // Auto-progress order status for active orders
  useEffect(() => {
    const progressableOrders = safeOrders.filter(order => 
      ['pending', 'preparing', 'shipping'].includes(order.status)
    );

    if (progressableOrders.length === 0) return;

    const timers = progressableOrders.map(order => {
      const timeSinceUpdate = Date.now() - new Date(order.updatedAt).getTime();
      const timeToNextStatus = 5000 - timeSinceUpdate; // 5 seconds

      if (timeToNextStatus <= 0) {
        // Immediately progress if already past 5 seconds
        const nextStatus: PharmacyOrderStatus = 
          order.status === 'pending' ? 'preparing' :
          order.status === 'preparing' ? 'shipping' :
          'delivered';
        onUpdateOrderStatus(order.id, nextStatus);
        return null;
      }

      return setTimeout(() => {
        const nextStatus: PharmacyOrderStatus = 
          order.status === 'pending' ? 'preparing' :
          order.status === 'preparing' ? 'shipping' :
          'delivered';
        onUpdateOrderStatus(order.id, nextStatus);
      }, timeToNextStatus);
    });

    return () => {
      timers.forEach(timer => timer && clearTimeout(timer));
    };
  }, [safeOrders, onUpdateOrderStatus]);

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
        <div className="max-w-7xl mx-auto">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Đơn thuốc của tôi</h1>
            <p className="text-gray-600">Quản lý và theo dõi đơn hàng thuốc của bạn</p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-x-auto">
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as PharmacyOrderStatus | 'all')}
                  className={`flex-1 min-w-[140px] px-4 py-4 text-sm font-semibold transition-colors relative ${
                    activeTab === tab.key
                      ? 'text-cyan-600 bg-cyan-50'
                      : 'text-gray-600 hover:text-cyan-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        activeTab === tab.key
                          ? 'bg-cyan-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </div>
                  {activeTab === tab.key && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
              <Package size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có đơn hàng</h3>
              <p className="text-gray-600">Bạn chưa có đơn hàng nào trong mục này</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <div key={order.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    {/* Order Header */}
                    <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Mã đơn hàng</div>
                          <div className="font-semibold text-gray-900">#{order.id}</div>
                        </div>
                        <div className="h-8 w-px bg-gray-300"></div>
                        <div>
                          <div className="text-sm text-gray-600">Ngày đặt</div>
                          <div className="font-semibold text-gray-900">{formatDate(order.createdAt)}</div>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${statusInfo.bgColor} ${statusInfo.borderColor}`}>
                        <StatusIcon className={statusInfo.color} size={20} />
                        <span className={`font-semibold ${statusInfo.color}`}>{statusInfo.label}</span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-4">
                      <div className="space-y-3 mb-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-lg bg-gray-50 p-1" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.name}</h4>
                              <p className="text-xs text-gray-500 mb-1">{item.unit}</p>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">x{item.quantity}</span>
                                <span className="text-sm font-semibold text-red-600">{formatPrice(item.price)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer */}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Người nhận</div>
                            <div className="font-semibold text-gray-900">{order.deliveryInfo.fullName}</div>
                            <div className="text-sm text-gray-600">{order.deliveryInfo.phoneNumber}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600 mb-1">Tổng tiền</div>
                            <div className="text-xl font-bold text-red-600">{formatPrice(order.totalPrice)}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div className="font-semibold mb-1">Địa chỉ giao hàng:</div>
                          <div>{order.deliveryInfo.address}</div>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="text-sm text-gray-600">Thanh toán:</div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.paymentMethod === 'cod' 
                              ? 'bg-orange-100 text-orange-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản ngân hàng'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
    </div>
  );
}