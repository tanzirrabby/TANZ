import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products: featured } = useProducts({ featured: true, limit: 4 });
  const nav = useNavigate();

  return (
    <main>
      {/* Hero */}
      <section className="min-h-screen bg-gradient-to-br from-primary via-blue-700 to-blue-900 flex relative overflow-hidden">
        {/* Animated BG */}
        <div className="absolute inset-0 grid grid-cols-4 opacity-20">
          {['👗','🧥','👟','👜','👔','🧢','👕','👖'].map((e,i) => (
            <div key={i} className={`flex items-center justify-center text-6xl grayscale animate-float ${i%2===0 ? '' : 'animate-float-delay'}`}>{e}</div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

        <div className="relative px-12 max-w-3xl flex flex-col justify-center z-10">
          <div className="flex items-center gap-3 text-accent text-sm font-bold tracking-widest uppercase mb-8 opacity-0 animate-fadeUp" style={{animationDelay:'.3s',animationFillMode:'forwards'}}>
            <span className="w-10 h-px bg-accent" /> 
          </div>
          <h1 className="text-white font-black leading-none tracking-tight mb-10" style={{fontSize:'clamp(48px,10vw,120px)'}}>
            {['Elevate','Your','Style.'].map((w,i) => (
              <span key={w} className={`block opacity-0 animate-lineUp ${i===1 ? 'text-accent' : ''}`} style={{animationDelay:`${.5+i*.2}s`,animationFillMode:'forwards'}}>{w}</span>
            ))}
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-lg mb-12 opacity-0 animate-fadeUp" style={{animationDelay:'1.3s',animationFillMode:'forwards'}}>
            Discover timeless fashion that blends contemporary design with sustainable practices. TANZ – where quality meets innovation.
          </p>
          <div className="flex gap-4 opacity-0 animate-fadeUp" style={{animationDelay:'1.5s',animationFillMode:'forwards'}}>
            <Link to="/shop" className="btn-secondary">Explore Collection</Link>
            <Link to="/shop/Women" className="border-2 border-white/30 text-white text-sm font-bold tracking-widest uppercase px-8 py-3 hover:bg-white/10 transition-all duration-300 rounded-lg">Women's</Link>
            <Link to="/shop/Men" className="border-2 border-white/30 text-white text-sm font-bold tracking-widest uppercase px-8 py-3 hover:bg-white/10 transition-all duration-300 rounded-lg">Men's</Link>
          </div>
        </div>

        {/* Stats */}
        <div className="absolute right-12 bottom-20 flex flex-col gap-8 text-right">
          {[['500+','Products'],['75K+','Customers'],['4.9★','Rating']].map(([v,l]) => (
            <div key={l} className="text-white opacity-0 animate-fadeUp" style={{animationDelay:'1.7s',animationFillMode:'forwards'}}>
              <div className="text-3xl font-black text-accent">{v}</div>
              <div className="text-sm tracking-widest text-white/60 uppercase">{l}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/30 text-xs tracking-widest uppercase">
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <div className="absolute w-full h-full bg-gold animate-scrollLine" />
          </div>
          Scroll
        </div>
      </section>

      {/* Ticker */}
      <div className="bg-accent py-4 overflow-hidden">
        <span className="inline-block animate-ticker text-white text-sm font-bold tracking-widest uppercase">
          NEW ARRIVALS &nbsp;·&nbsp; FREE SHIPPING OVER $150 &nbsp;·&nbsp; TANZ SS 2026 &nbsp;·&nbsp; SHOP WOMEN &nbsp;·&nbsp; SHOP MEN &nbsp;·&nbsp; ACCESSORIES &nbsp;·&nbsp; KIDS &nbsp;·&nbsp; ETHICALLY MADE &nbsp;·&nbsp; 30-DAY RETURNS &nbsp;·&nbsp;
        </span>
      </div>

      {/* Categories */}
      <section className="px-12 py-32">
        <p className="text-accent text-sm font-bold tracking-widest uppercase mb-4 flex items-center gap-3"><span className="w-8 h-px bg-accent" />Collections</p>
        <h2 className="text-6xl font-black tracking-tight mb-16">Shop by Category</h2>
        <div className="grid grid-cols-4 gap-6">
          {[['Women','👗','124 Items'],['Men','👔','98 Items'],['Accessories','👜','56 Items'],['Kids','🧢','42 Items']].map(([cat,e,count]) => (
            <Link to={`/shop/${cat}`} key={cat} className="group relative h-80 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-blue-800 flex items-center justify-center text-8xl transition-transform duration-700 group-hover:scale-110">{e}</div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white text-xl font-black tracking-widest uppercase mb-2">{cat}</h3>
                <p className="text-accent text-sm tracking-widest uppercase">{count}</p>
                <p className="text-white text-2xl mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="px-12 py-32 bg-cream">
        <p className="text-accent text-sm font-bold tracking-widest uppercase mb-4 flex items-center gap-3"><span className="w-8 h-px bg-accent" />Trending</p>
        <h2 className="text-6xl font-black tracking-tight mb-16">Featured Picks</h2>
        <div className="grid grid-cols-4 gap-6">
          {featured.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
        <div className="text-center mt-16">
          <Link to="/shop" className="btn-primary">View All Products →</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-12 py-32 bg-gradient-to-r from-primary/5 to-accent/5">
        <p className="text-accent text-sm font-bold tracking-widest uppercase mb-4 flex items-center gap-3"><span className="w-8 h-px bg-accent" />Testimonials</p>
        <h2 className="text-6xl font-black tracking-tight mb-16">What Our Customers Say</h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            { name: 'Sarah M.', role: 'Fashion Blogger', text: 'TANZ has redefined my wardrobe. The quality and style are unmatched.', rating: 5 },
            { name: 'Alex K.', role: 'Designer', text: 'Ethically made, timeless pieces. I recommend TANZ to everyone.', rating: 5 },
            { name: 'Emma L.', role: 'Stylist', text: 'The attention to detail in every garment is incredible. Love it!', rating: 5 }
          ].map((t, i) => (
            <div key={i} className="card hover:scale-105 transition-transform duration-300">
              <div className="flex mb-4">
                {Array(t.rating).fill().map((_, j) => <span key={j} className="text-accent text-xl">★</span>)}
              </div>
              <p className="text-gray-600 mb-6 italic text-lg">"{t.text}"</p>
              <div>
                <p className="font-bold text-lg">{t.name}</p>
                <p className="text-accent text-sm tracking-widest uppercase">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-12 py-32 bg-tanz-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-black tracking-tight mb-8">Stay in the Loop</h2>
          <p className="text-white/70 text-lg mb-12">Get exclusive access to new arrivals, style tips, and special offers.</p>
          <div className="flex gap-4 max-w-lg mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-4 rounded-lg focus:outline-none focus:border-accent transition-colors text-lg" />
            <button className="btn-secondary">Subscribe</button>
          </div>
        </div>
      </section>
    </main>
  );
}