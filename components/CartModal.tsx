import { X, Minus, Plus, Trash2 } from 'lucide-react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  type: 'vi' | 'hop';
  description: string;
  imageUrl?: string;
}

interface CartModalProps {
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export function CartModal({ cartItems, onClose, onUpdateQuantity, onRemoveItem, onCheckout }: CartModalProps) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300 relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Giỏ hàng của bạn</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500 text-lg">Giỏ hàng trống</p>
              <p className="text-gray-400 text-sm mt-2">Thêm sản phẩm vào giỏ hàng để tiếp tục</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
                  {/* Product image */}
                  <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-3xl">💊</div>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    <p className="font-bold text-red-500 text-lg">{item.price.toLocaleString('vi-VN')}đ</p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-9 h-9 bg-white hover:bg-gray-100 rounded-xl flex items-center justify-center transition-colors border border-gray-200"
                    >
                      <Minus size={16} className="text-gray-700" />
                    </button>
                    <div className="w-12 h-9 flex items-center justify-center font-semibold text-gray-900">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-9 h-9 bg-white hover:bg-gray-100 rounded-xl flex items-center justify-center transition-colors border border-gray-200"
                    >
                      <Plus size={16} className="text-gray-700" />
                    </button>
                  </div>

                  {/* Total price for this item */}
                  <div className="text-right min-w-[100px]">
                    <p className="text-sm text-gray-600 mb-1">Thành tiền</p>
                    <p className="font-bold text-cyan-600 text-lg">
                      {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                    </p>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-600 transition-colors p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with total and checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">Tổng số lượng:</p>
              <p className="font-semibold text-gray-900">{totalItems} sản phẩm</p>
            </div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xl font-bold text-gray-900">Tổng tiền:</p>
              <p className="text-3xl font-bold text-red-500">{totalPrice.toLocaleString('vi-VN')}đ</p>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Tiến hành thanh toán
            </button>
          </div>
        )}
      </div>
    </div>
  );
}