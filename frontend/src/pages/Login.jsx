import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuthStore();
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Welcome back ✦');
      nav('/account');
    } catch {}
  };

  return (
    <main className="pt-20 min-h-screen flex items-center justify-center bg-cream">
      <div className="w-full max-w-md px-8 py-12 bg-white">
        <div className="text-2xl font-black tracking-widest mb-10">T<span className="text-gold">A</span>NZ</div>
        <h1 className="text-3xl font-black mb-2">Welcome Back</h1>
        <p className="text-gray-400 text-sm mb-8">Sign in to your TANZ account</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@example.com" className="w-full px-4 py-3 border border-gray-200 bg-cream text-sm outline-none focus:border-black transition-colors" required /></div>
          <div><label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-200 bg-cream text-sm outline-none focus:border-black transition-colors" required /></div>
          <button type="submit" disabled={loading} className="w-full bg-black text-white text-xs font-bold tracking-widest uppercase py-4 hover:bg-gray-900 transition-colors disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">Don't have an account? <Link to="/register" className="text-black font-bold underline">Sign Up</Link></p>
      </div>
    </main>
  );
}