import { Link, useParams } from 'react-router-dom';

export default function OrderSuccess() {
  const { id } = useParams();
  return (
    <main className="pt-20 min-h-screen flex items-center justify-center">
      <div className="max-w-lg text-center px-8">
        <div className="w-24 h-24 border-2 border-black rounded-full flex items-center justify-center text-4xl mx-auto mb-8 animate-[popIn_.5s_cubic-bezier(.34,1.56,.64,1)_forwards]">✓</div>
        <h1 className="text-4xl font-black mb-3">Order Confirmed!</h1>
        <p className="text-gray-400 leading-relaxed mb-7">Thank you for shopping with TANZ. You'll receive a confirmation email with your tracking details shortly.</p>
        <div className="bg-cream px-6 py-4 text-sm text-gray-400 tracking-widest uppercase mb-8">Order #TZ-<strong className="text-black">{id?.slice(-6).toUpperCase()}</strong></div>
        <Link to="/shop" className="inline-block bg-black text-white text-xs font-bold tracking-widest uppercase px-12 py-4 hover:bg-gray-900 transition-colors">Continue Shopping</Link>
      </div>
    </main>
  );
}