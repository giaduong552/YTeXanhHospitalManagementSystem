import { useState } from 'react';
import { 
  Shield, LogOut, Users, Stethoscope, Calendar, FileText, 
  Settings, BarChart3, Activity, TrendingUp, Clock, CheckCircle 
} from 'lucide-react';
import logo from 'figma:asset/9762ac6aaff743488633e15c34d9ecd8b57a71c0.png';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Tổng bệnh nhân', value: '1,234', icon: Users, color: 'cyan', trend: '+12%' },
    { label: 'Bác sĩ hoạt động', value: '45', icon: Stethoscope, color: 'blue', trend: '+3%' },
    { label: 'Lịch hẹn hôm nay', value: '89', icon: Calendar, color: 'green', trend: '+8%' },
    { label: 'Tổng doanh thu', value: '₫245M', icon: TrendingUp, color: 'orange', trend: '+15%' },
  ];

  const recentActivities = [
    { user: 'BS Nguyễn Văn A', action: 'đã hoàn thành cuộc hẹn', time: '5 phút trước', icon: CheckCircle, color: 'green' },
    { user: 'Bệnh nhân Trần B', action: 'đã đặt lịch khám', time: '10 phút trước', icon: Calendar, color: 'blue' },
    { user: 'BS Lê Thị C', action: 'đã cập nhật hồ sơ', time: '15 phút trước', icon: FileText, color: 'cyan' },
    { user: 'Hệ thống', action: 'sao lưu dữ liệu thành công', time: '30 phút trước', icon: Activity, color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="YTeXanh" className="h-10 w-auto" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-cyan-500">YTeXanh</span>
                  <span className="px-2 py-0.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-full">
                    ADMIN
                  </span>
                </div>
                <p className="text-xs text-gray-500">Quản trị hệ thống</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Tổng quan', icon: BarChart3 },
              { id: 'users', label: 'Người dùng', icon: Users },
              { id: 'doctors', label: 'Bác sĩ', icon: Stethoscope },
              { id: 'appointments', label: 'Lịch hẹn', icon: Calendar },
              { id: 'settings', label: 'Cài đặt', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon size={18} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                  <stat.icon className={`text-${stat.color}-600`} size={24} />
                </div>
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                  {stat.trend}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Activity size={20} className="text-cyan-600" />
              Hoạt động trong tuần
            </h3>
            <div className="space-y-3">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, index) => {
                const value = Math.floor(Math.random() * 100) + 20;
                return (
                  <div key={day} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600 w-8">{day}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full flex items-center justify-end pr-3"
                        style={{ width: `${value}%` }}
                      >
                        <span className="text-xs font-semibold text-white">{value}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock size={20} className="text-orange-600" />
              Hoạt động gần đây
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className={`p-2 bg-${activity.color}-100 rounded-lg h-fit`}>
                    <activity.icon className={`text-${activity.color}-600`} size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-bold mb-4">Thao tác nhanh</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Thêm bác sĩ', icon: Stethoscope },
              { label: 'Quản lý người dùng', icon: Users },
              { label: 'Xem báo cáo', icon: FileText },
              { label: 'Cài đặt hệ thống', icon: Settings },
            ].map((action, index) => (
              <button
                key={index}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all transform hover:scale-105"
              >
                <action.icon size={24} className="mx-auto mb-2" />
                <p className="text-sm font-medium">{action.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
