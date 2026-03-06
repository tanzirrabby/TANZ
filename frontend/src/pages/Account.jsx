import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

export default function Account() {
  const { user, logout } = useAuthStore();
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <main className="pt-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-8 py-16">
        {/* Banner */}
        <div className="bg-black p-12 flex items-center gap-7 mb-0.5">
          <div className="w-16 h-16 bg-gold flex items-center justify-center text-2xl font-black text-white flex-shrink-0">{initials}</div>
          <div>
            <p className="text-white text-xl font-black tracking-wide">{user?.name}</p>
            <p className="text-white/40 text-sm mt-1">{user?.email}</p>
            <span className="bg-gold text-white text-xs font-bold px-3 py-1 tracking-widest uppercase mt-2 inline-block">Gold Member</span>
          </div>
        </div>

        {/* Tiles */}
        <div className="grid grid-cols-2 gap-0.5">
          {[
            { icon: '📦', name: 'My Orders', desc: 'Track and manage orders', action: () => toast.success('No orders yet') },
            { icon: '❤️', name: 'Wishlist', desc: 'Your saved items', action: () => toast.success('Wishlist empty') },
            { icon: '⚙️', name: 'Settings', desc: 'Edit profile preferences', action: () => {} },
            { icon: '→', name: 'Sign Out', desc: 'See you next time', action: () => { logout(); toast.success('Signed out'); } },
          ].map(tile => (
            <button key={tile.name} onClick={tile.action} className="relative bg-cream p-8 text-left group overflow-hidden">
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(.25,.46,.45,.94)]" />
              <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                <div className="text-3xl mb-4">{tile.icon}</div>
                <p className="font-bold tracking-widest uppercase text-sm mb-1">{tile.name}</p>
                <p className="text-gray-400 text-xs group-hover:text-white/50 transition-colors">{tile.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
