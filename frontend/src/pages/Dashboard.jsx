import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders').then(r => { setOrders(r.data); setLoading(false); });
  }, []);

  const revenue = orders.reduce((s, o) => s + (o.isPaid ? o.totalPrice : 0), 0);
  const statusMap = { delivered: 'bg-green-50 text-green-700', processing: 'bg-orange-50 text-orange-600', shipped: 'bg-indigo-50 text-indigo-700', confirmed: 'bg-blue-50 text-blue-700', cancelled: 'bg-red-50 text-red-600' };

  return (
    <main className="pt-20 min-h-screen">
      <div className="px-12 py-16">
        <p className="text-gold text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-3"><span className="w-6 h-px bg-gold" />Analytics</p>
        <h1 className="text-5xl font-black tracking-tight mb-12">Dashboard</h1>

        <div className="mb-8">
          <Link to="/products/manage" className="btn-primary">Manage Products →</Link>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-0.5 mb-0.5">
          {[
            { label: 'Revenue', val: `$${revenue.toFixed(0)}`, icon: '💰', dark: true },
            { label: 'Orders', val: orders.length, icon: '📦' },
            { label: 'Paid', val: orders.filter(o=>o.isPaid).length, icon: '✅' },
            { label: 'Pending', val: orders.filter(o=>!o.isPaid).length, icon: '⏳' },
          ].map(k => (
            <div key={k.label} className={`p-8 ${k.dark ? 'bg-black text-white' : 'bg-cream'}`}>
              <div className="text-3xl mb-4 opacity-70">{k.icon}</div>
              <div className={`text-4xl font-black ${k.dark ? 'text-gold' : ''}`}>{k.val}</div>
              <div className={`text-xs tracking-widest uppercase mt-2 ${k.dark ? 'text-white/40' : 'text-gray-400'}`}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-cream p-8">
          <p className="text-xs font-black tracking-widest uppercase mb-6">Recent Orders</p>
          <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr] gap-4 pb-3 border-b-2 border-black text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">
            {['Customer','Items','Amount','Status','Date'].map(h=><span key={h}>{h}</span>)}
          </div>
          {loading ? <div className="text-center py-8 text-gray-400">Loading...</div> :
            orders.slice(0,10).map(o => (
              <div key={o._id} className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr] gap-4 py-4 border-b border-gray-200 text-sm items-center hover:bg-white/50 transition-colors">
                <span className="font-bold">{o.user?.name || 'Guest'}</span>
                <span className="text-gray-400 truncate">{o.orderItems.map(i=>i.name).join(', ')}</span>
                <span className="font-black">${o.totalPrice.toFixed(2)}</span>
                <span className={`inline-block px-2 py-1 text-xs font-bold tracking-wide uppercase ${statusMap[o.status] || 'bg-gray-100 text-gray-600'}`}>{o.status}</span>
                <span className="text-gray-400 text-xs">{new Date(o.createdAt).toLocaleDateString()}</span>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  );
}