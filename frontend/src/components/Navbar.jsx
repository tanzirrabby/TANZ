import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuthStore();
  const { count, openCart } = useCartStore();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = scrolled || !isHome
    ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100'
    : 'bg-transparent';

  const textClass = scrolled || !isHome ? 'text-gray-600 hover:text-primary' : 'text-white/80 hover:text-accent';
  const logoClass = scrolled || !isHome ? 'text-tanz-black' : 'text-white';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-400 h-17 flex items-center justify-between px-12 ${navClass}`}>
      <Link to="/" className={`text-2xl font-black tracking-widest uppercase transition-colors ${logoClass}`}>
        T<span className="text-accent">A</span>NZ
      </Link>

      <ul className="flex gap-9 list-none">
        {['/', '/shop', '/dashboard'].map((path, i) => (
          <li key={path}>
            <Link to={path} className={`text-xs font-semibold tracking-widest uppercase transition-colors relative group ${textClass}`}>
              {['Home','Shop','Dashboard'][i]}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-5">
        <Link to="/account" className={`text-lg transition-colors hover:text-gold ${scrolled || !isHome ? 'text-gray-500' : 'text-white/80'}`}>👤</Link>
        <button onClick={openCart} className={`text-xl transition-colors hover:text-accent relative ${scrolled || !isHome ? 'text-gray-600' : 'text-white/80'}`}>
          🛍
          {count > 0 && <span className="absolute -top-1.5 -right-2 bg-accent text-white text-xs w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">{count}</span>}
        </button>
      </div>
    </nav>
  );
}