import { Menu, ChevronDown, Facebook, Mail, Phone, MapPin, Clock, User, Download, ArrowLeft, ShoppingCart, Plus, Minus, X, Trash2 } from 'lucide-react';
import { useState } from 'react';
import logo from 'figma:asset/9762ac6aaff743488633e15c34d9ecd8b57a71c0.png';
import { ProductDetailModal } from './ProductDetailModal';
import { CartModal, CartItem as CartModalItem } from './CartModal';

interface PharmacyShopProps {
  onBack: () => void;
  onLogout: () => void;
  onCheckout: (cart: CartItem[]) => void;
}

interface Medicine {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  packaging: string[];
  image: string;
  priceRange?: string; // Optional price range display
}

interface CartItem extends Medicine {
  quantity: number;
}

export function PharmacyShop({ onBack, onLogout, onCheckout }: PharmacyShopProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showCartModal, setShowCartModal] = useState(false);

  const medicines: Medicine[] = [
    {
      id: 1,
      name: 'Telfast BD',
      description: 'Trị viêm mũi dị ứng, mày đay',
      price: 126000,
      unit: '3 Vỉ x 10 Viên',
      packaging: ['Vỉ', 'Hộp'],
      image: 'https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/mwg-static/ankhang/Products/Images/10036/292598/telfast-bd-60mg-hop-30v-fix-thumb-638693591760795255-600x600.jpg'
    },
    {
      id: 2,
      name: 'Alorax',
      description: 'Trị dị ứng (hắt hơi, ngứa, sổ mũi)',
      price: 90000,
      unit: '10 Vỉ x 10 viên',
      packaging: ['Vỉ', 'Hộp'],
      image: 'https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/mwg-static/ankhang/Products/Images/10036/194819/thuoc-dieu-tri-di-ung-alorax-10mg-100-vien-fix-thumb-638684068219486066-600x600.jpg'
    },
    {
      id: 3,
      name: 'Lorastad',
      description: 'Trị dị ứng (viêm mũi dị ứng, mề đay)',
      price: 9000,
      unit: '10 Vỉ x 10 Viên',
      packaging: ['Hộp', 'Vỉ'],
      image: 'https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/mwg-static/ankhang/Products/Images/10036/160774/fexostad-60-fix-thumb-638684059561843201-300x300.jpg'
    },
    {
      id: 4,
      name: 'Dimenhydrinat Traphaco',
      description: 'Trị buồn nôn, chóng mặt, say tàu xe.',
      price: 40000,
      unit: '10 Vỉ x 10 vVên',
      packaging: ['Hộp', 'Viên'],
      image: 'https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/mwg-static/ankhang/Products/Images/10036/129918/dimenhydrinat-50mg-thumb-638682317267151999-600x600.jpg'
    },
    {
      id: 5,
      name: 'Vaco Pola',
      description: 'Trị sổ mũi dị ứng, viêm mũi',
      price: 160000,
      unit: '3 vỉ x 10 viên',
      packaging: ['Hộp', 'Viên'],
      image: 'https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/mwg-static/ankhang/Products/Images/10036/299766/vacopola-2mg-thumb-638677841285992558-300x300.jpg'
    },
    {
      id: 6,
      name: 'Cồn Alcool 70 độ',
      description: 'Sat trùng ngoài da',
      price: 3000,
      unit: '60ml',
      packaging: ['Chai'],
      image: 'https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdn.tgdd.vn/Products/Images/12119/131024/alcool-70-60ml-thumb01-600x600.jpg'
    },
    {
     id: 7,
      name: 'Cồn Alcool 70 độ',
      description: 'Sat trùng ngoài da',
      price: 5000,
      unit: '60ml',
      packaging: ['Chai'],
      image: 'https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdn.tgdd.vn/Products/Images/12119/130201/alcool-xanh-90-thumb-1-600x600.jpg'
    },
    {
      id: 8,
      name: 'Antanazalo',
      description: 'Trị nấm da',
      price: 26000,
      unit: '10g',
      packaging: ['Tuýt'],
      image: 'https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdn.tgdd.vn/Products/Images/10037/243380/antanazol-cream-10g-thumb-01-600x600.jpg'
    },
    {
      id: 9,
      name: 'Bacterocin Oint',
      description: 'Trị nhiễm trùng',
      price: 36000,
      unit: '10g',
      packaging: ['Tuýt'],
      image: 'https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdn.tgdd.vn/Products/Images/10037/284398/bacterocin-oint-tube-15g-thumb-1-600x600.jpg'
    },
    {
      id: 10,
      name: 'Biroxime',
      description: 'Trị nấm da',
      price: 28000,
      unit: '10g',
      packaging: ['Tuýt'],
      image: 'https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdn.tgdd.vn/Products/Images/10037/313090/kem-boi-biroxime-tri-nam-da-tuyp-20g-thumb-1-600x600.jpg'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const addToCart = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setShowQuantityModal(true);
  };

  const handleAddToCart = () => {
    if (selectedMedicine) {
      const existingItem = cart.find(item => item.id === selectedMedicine.id);
      if (existingItem) {
        setCart(cart.map(item => item.id === selectedMedicine.id ? { ...item, quantity: item.quantity + quantity } : item));
      } else {
        setCart([...cart, { ...selectedMedicine, quantity }]);
      }
      setShowQuantityModal(false);
      setQuantity(1); // Reset quantity to 1
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Nhà thuốc YTeXanh</h1>
                <p className="text-gray-600">Chọn thuốc bạn cần</p>
              </div>
              <button 
                onClick={() => setShowCartModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors shadow-md"
              >
                <ShoppingCart size={20} />
                <span>Giỏ hàng</span>
                <span className="bg-white text-cyan-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">{totalItems}</span>
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Da liễu, dị ứng</h3>
          </div>

          {/* Medicines Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {medicines.map((medicine) => (
              <div key={medicine.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                {/* Product Image */}
                <div className="aspect-square bg-gray-100 flex items-center justify-center p-4">
                  <img src={medicine.image} alt={medicine.name} className="w-full h-full object-contain" />
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 h-10">
                    {medicine.name}
                  </h4>
                  {medicine.description && (
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {medicine.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mb-2">{medicine.unit}</p>

                  {/* Packaging badges */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {medicine.packaging.map((pkg, index) => (
                      <span key={index} className="px-2 py-0.5 bg-green-50 border border-green-200 text-green-700 rounded text-xs">
                        {pkg}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <span className="text-red-600 font-bold text-lg">{formatPrice(medicine.price)}</span>
                  </div>

                  {/* Add to cart button */}
                  <button
                    onClick={() => addToCart(medicine)}
                    className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-1 text-sm"
                  >
                    <Plus size={16} />
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
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

      {/* Product Detail Modal */}
      {showQuantityModal && selectedMedicine && (
        <ProductDetailModal
          product={{
            id: selectedMedicine.id,
            name: selectedMedicine.name,
            price: selectedMedicine.price,
            description: selectedMedicine.description,
            category: 'medicine',
            imageUrl: selectedMedicine.image
          }}
          onClose={() => {
            setShowQuantityModal(false);
            setQuantity(1);
          }}
          onAddToCart={(qty, type) => {
            const existingItem = cart.find(item => item.id === selectedMedicine.id);
            if (existingItem) {
              setCart(cart.map(item => item.id === selectedMedicine.id ? { ...item, quantity: item.quantity + qty } : item));
            } else {
              setCart([...cart, { ...selectedMedicine, quantity: qty }]);
            }
            setShowQuantityModal(false);
            setQuantity(1);
          }}
          onBuyNow={(qty, type) => {
            const buyNowCart = [{ ...selectedMedicine, quantity: qty }];
            onCheckout(buyNowCart);
            setShowQuantityModal(false);
            setQuantity(1);
          }}
        />
      )}

      {/* Cart Modal */}
      {showCartModal && (
        <CartModal
          cartItems={cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            type: 'vi' as const,
            description: item.unit,
            imageUrl: item.image
          }))}
          onClose={() => setShowCartModal(false)}
          onUpdateQuantity={(id, newQuantity) => {
            updateQuantity(id, newQuantity);
          }}
          onRemoveItem={(id) => {
            removeFromCart(id);
          }}
          onCheckout={() => {
            if (cart.length > 0) {
              onCheckout(cart);
              setShowCartModal(false);
            }
          }}
        />
      )}
    </div>
  );
}