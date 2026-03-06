import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQty } = useCartStore();

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = total > 50 ? 0 : 5;

  return (
    <>
      {/* Overlay */}
      <div onClick={closeCart} className={`fixed inset-0 bg-black/50 backdrop-blur z-40 transition-opacity duration-400 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 w-[460px] h-full bg-white z-50 flex flex-col shadow-2xl transition-transform duration-400 ease-[cubic-bezier(.25,.46,.45,.94)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-8 border-b border-gray-100">
          <span className="text-sm font-black tracking-widest uppercase">Cart ({items.reduce((a,b)=>a+b.qty,0)})</span>
          <button onClick={closeCart} className="text-gray-400 hover:text-primary text-2xl transition-colors">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {!items.length ? (
            <div className="text-center py-20">
              <div className="text-5xl opacity-20 mb-4">🛍</div>
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-6">Your cart is empty</p>
              <button onClick={closeCart} className="btn-dark text-xs px-8 py-3">Start Shopping</button>
            </div>
          ) : items.map(item => (
            <div key={`${item._id}-${item.size}`} className="flex gap-4 items-center py-5 border-b border-gray-100">
              <div className="w-20 h-24 bg-cream flex items-center justify-center text-4xl flex-shrink-0">{item.emoji}</div>
              <div className="flex-1">
                <p className="font-bold text-sm mb-1">{item.name}</p>
                <p className="text-gray-400 text-xs mb-3">Size: {item.size} · ${item.price}</p>
                <div className="inline-flex border border-gray-200">
                  <button onClick={() => updateQty(item._id, item.size, item.qty - 1)} className="w-7 h-7 hover:bg-gray-50 transition-colors">−</button>
                  <span className="w-8 h-7 flex items-center justify-center text-xs font-bold border-x border-gray-200">{item.qty}</span>
                  <button onClick={() => updateQty(item._id, item.size, item.qty + 1)} className="w-7 h-7 hover:bg-gray-50 transition-colors">+</button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <span className="font-black text-sm">${(item.price * item.qty).toFixed(2)}</span>
                <button onClick={() => removeItem(item._id, item.size)} className="text-gray-300 hover:text-black text-sm transition-colors">✕</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-8 bg-cream border-t border-gray-200">
            <div className="flex justify-between text-sm text-gray-500 tracking-widest uppercase mb-3">
              <span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-black text-xl mb-6">
              <span>Total</span><span>${(total + shipping).toFixed(2)}</span>
            </div>
            <Link to="/checkout" onClick={closeCart} className="block w-full btn-primary text-center text-sm font-bold tracking-widest uppercase py-4 hover:bg-blue-900 transition-colors">
              Checkout →
            </Link>
            <p className="text-center text-sm text-gray-400 tracking-widest uppercase mt-4">🔒 Secure SSL Checkout</p>
          </div>
        )}
      </div>
    </>
  );
}