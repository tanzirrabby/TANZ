import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { items, total, shipping, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: '', street: '', city: '', zip: '', country: 'United States' });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderItems = items.map(i => ({ product: i._id, name: i.name, emoji: i.emoji, price: i.price, qty: i.qty, size: i.size }));
      const { data } = await api.post('/orders', { orderItems, shippingAddress: form, paymentMethod: 'Stripe', itemsPrice: total, shippingPrice: shipping, totalPrice: total + shipping });
      clearCart();
      toast.success('Order placed!');
      nav(`/order-success/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, k, type='text', placeholder }) => (
    <div><label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">{label}</label>
      <input value={form[k]} onChange={set(k)} type={type} placeholder={placeholder} className="w-full px-4 py-3 border border-gray-200 bg-cream text-sm outline-none focus:border-black transition-colors" required /></div>
  );

  return (
    <main className="pt-20 min-h-screen">
      <div className="px-12 py-16">
        <p className="text-gold text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-3"><span className="w-6 h-px bg-gold" />Final Step</p>
        <h1 className="text-5xl font-black tracking-tight mb-12">Checkout</h1>

        <form onSubmit={handleOrder} className="grid grid-cols-[1fr_400px] gap-16 items-start">
          <div>
            <p className="text-xs font-black tracking-widest uppercase pb-3 border-b-2 border-black mb-5">Shipping Information</p>
            <div className="grid grid-cols-2 gap-4 mb-4"><Field label="First Name" k="name" placeholder="John" /><Field label="Email" k="email" type="email" placeholder="john@example.com" /></div>
            <div className="mb-4"><Field label="Phone" k="phone" placeholder="+1 234 567 8900" /></div>
            <div className="mb-4"><Field label="Street Address" k="street" placeholder="123 Main Street" /></div>
            <div className="grid grid-cols-2 gap-4 mb-4"><Field label="City" k="city" placeholder="New York" /><Field label="ZIP Code" k="zip" placeholder="10001" /></div>
            <div className="mb-8">
              <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">Country</label>
              <select value={form.country} onChange={set('country')} className="w-full px-4 py-3 border border-gray-200 bg-cream text-sm outline-none focus:border-black">
                {['United States','United Kingdom','Canada','Germany','France','Bangladesh','Australia'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <p className="text-xs font-black tracking-widest uppercase pb-3 border-b-2 border-black mb-5">Payment</p>
            <div className="bg-cream p-5 text-center text-sm text-gray-400 tracking-wide border border-dashed border-gray-300 mb-6">💳 Stripe payment integration — connect your Stripe keys in .env</div>
            <button type="submit" disabled={loading} className="w-full bg-black text-white text-xs font-bold tracking-widest uppercase py-5 hover:bg-gray-900 transition-colors disabled:opacity-50">
              {loading ? 'Placing Order...' : 'Confirm Order →'}
            </button>
            <p className="text-center text-xs text-gray-400 tracking-widest uppercase mt-4">🔒 SSL Encrypted · Secure Checkout</p>
          </div>

          {/* Summary */}
          <div className="bg-black text-white p-9 sticky top-24">
            <p className="text-xs font-bold tracking-widest uppercase mb-6 pb-4 border-b border-white/10">Order Summary ({items.reduce((a,b)=>a+b.qty,0)} items)</p>
            {items.map(i => <div key={`${i._id}-${i.size}`} className="flex justify-between text-sm mb-3 text-white/70"><span>{i.emoji} {i.name} ×{i.qty}</span><span className="text-white font-bold">${(i.price*i.qty).toFixed(2)}</span></div>)}
            <div className="flex justify-between text-sm text-white/50 mt-4 mb-1"><span>Shipping</span><span className="text-white">{shipping===0?'Free':'$'+shipping.toFixed(2)}</span></div>
            <div className="flex justify-between font-black text-xl border-t border-white/10 pt-4 mt-3 mb-6"><span>Total</span><span>${(total+shipping).toFixed(2)}</span></div>
          </div>
        </form>
      </div>
    </main>
  );
}