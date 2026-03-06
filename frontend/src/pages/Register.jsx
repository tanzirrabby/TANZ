import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { register, loading } = useAuthStore();
  const nav = useNavigate();
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password);
      toast.success('Welcome to TANZ ✦');
      nav('/account');
    } catch {}
  };

  return (
    <main className="pt-20 min-h-screen flex items-center justify-center bg-cream">
      <div className="w-full max-w-md px-8 py-12 bg-white">
        <div className="text-2xl font-black tracking-widest mb-10">T<span className="text-gold">A</span>NZ</div>
        <h1 className="text-3xl font-black mb-2">Create Account</h1>
        <p className="text-gray-400 text-sm mb-8">Join the TANZ community</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          {[['name','Full Name','text','John Doe'],['email','Email','email','you@example.com'],['password','Password','password','••••••••']].map(([k,l,t,p]) => (
            <div key={k}><label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">{l}</label>
              <input value={form[k]} onChange={set(k)} type={t} placeholder={p} className="w-full px-4 py-3 border border-gray-200 bg-cream text-sm outline-none focus:border-black transition-colors" required /></div>
          ))}
          <button type="submit" disabled={loading} className="w-full bg-black text-white text-xs font-bold tracking-widest uppercase py-4 hover:bg-gray-900 transition-colors disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Account →'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">Already have an account? <Link to="/login" className="text-black font-bold underline">Sign In</Link></p>
      </div>
    </main>
  );
}
