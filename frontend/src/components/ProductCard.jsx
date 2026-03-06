import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [wished, setWished] = useState(false);
  const { addItem, openCart } = useCartStore();
  const nav = useNavigate();

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added`);
    openCart();
  };

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => nav(`/product/${product._id}`)}
    >
      {/* Image */}
      <div className="relative h-80 overflow-hidden flex items-center justify-center rounded-t-2xl" style={{ background: product.bgColor || '#f8fafc' }}>
        <span className={`text-8xl transition-all duration-500 ${hovered ? 'scale-110 rotate-3' : 'scale-100'}`}>{product.emoji}</span>

        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 tracking-widest uppercase rounded-full ${product.badge === 'sale' ? 'bg-red-500' : product.badge === 'new' ? 'bg-accent' : 'bg-primary'}`}>
            {product.badge}
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); setWished(!wished); toast.success(wished ? 'Removed from wishlist' : 'Added to wishlist ❤️'); }}
          className={`absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 border border-gray-200 hover:bg-accent hover:text-white hover:border-accent rounded-full ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        >
          {wished ? '❤️' : '🤍'}
        </button>

        {/* Hover overlay */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-all duration-400 bg-gradient-to-t from-black/80 to-transparent ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <button onClick={e => { e.stopPropagation(); nav(`/product/${product._id}`); }} className="bg-white text-tanz-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Quick View</button>
          <button onClick={handleAdd} className="btn-secondary">Add to Cart</button>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">{product.category}</p>
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-primary">${product.price}</span>
          {product.oldPrice && <span className="text-gray-400 text-sm line-through">${product.oldPrice}</span>}
        </div>
      </div>
    </div>
  );
}