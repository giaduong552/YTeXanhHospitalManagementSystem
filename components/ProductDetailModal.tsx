import { X, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

interface ProductDetailModalProps {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    imageUrl?: string;
  };
  onClose: () => void;
  onAddToCart: (quantity: number, type: 'vi' | 'hop') => void;
  onBuyNow: (quantity: number, type: 'vi' | 'hop') => void;
}

export function ProductDetailModal({ product, onClose, onAddToCart, onBuyNow }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [type, setType] = useState<'vi' | 'hop'>('vi');

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 animate-in fade-in zoom-in duration-300 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={28} />
        </button>

        {/* Product image */}
        <div className="flex justify-center mb-6">
          <div className="w-48 h-48 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain" />
            ) : (
              <div className="text-gray-400 text-center p-4">
                <div className="text-4xl mb-2">💊</div>
                <p className="text-sm">{product.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Product name */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          {product.name}
        </h2>

        {/* Price */}
        <p className="text-3xl font-bold text-red-500 text-center mb-6">
          {product.price.toLocaleString('vi-VN')}đ
        </p>

        {/* Type selection */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-3">Phân loại:</label>
          <div className="flex gap-3">
            <button
              onClick={() => setType('vi')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                type === 'vi'
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Vỉ
            </button>
            <button
              onClick={() => setType('hop')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                type === 'hop'
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Hộp
            </button>
          </div>
        </div>

        {/* Quantity selector */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-3">Số lượng:</label>
          <div className="flex items-center gap-4 justify-center">
            <button
              onClick={handleDecrease}
              className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
            >
              <Minus size={20} className="text-gray-700" />
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-20 h-12 text-center text-xl font-semibold border-2 border-gray-200 rounded-xl"
            />
            <button
              onClick={handleIncrease}
              className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
            >
              <Plus size={20} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onAddToCart(quantity, type)}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            THÊM VÀO GIỎ
          </button>
        </div>
      </div>
    </div>
  );
}