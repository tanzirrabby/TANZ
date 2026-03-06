import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct, useProducts } from '../hooks/useProducts';
import useCartStore from '../store/cartStore';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading } = useProduct(id);
  const { products: related } = useProducts({ category: product?.category, limit: 4, exclude: id });
  const [size, setSize] = useState('M');
  const [qty, setQty] = useState(1);
  const { addItem, openCart } = useCartStore();

  if (loading) return <div className="pt-24 flex items-center justify-center h-screen"><div className="text-2xl animate-pulse">Loading...</div></div>;
  if (!product) return <div className="pt-24 text-center">Product not found</div>;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product, size, 1);
    toast.success(`${product.name} added to cart`);
    openCart();
  };

  return (
    <main className="pt-20 min-h-screen">
      <div className="px-12 py-16">
        <Link to="/shop" className="inline-flex items-center gap-3 text-gray-500 hover:text-primary text-sm font-bold tracking-widest uppercase mb-16 transition-colors">← Back to Shop</Link>

        <div className="grid grid-cols-2 gap-20 items-start">
          {/* Images */}
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <div className="flex flex-col gap-3">
              {[0,1,2].map(i => (
                <div key={i} className="w-24 h-24 bg-cream flex items-center justify-center text-4xl border-2 border-transparent hover:border-accent cursor-pointer transition-all rounded-lg">{product.emoji}</div>
              ))}
            </div>
            <div className="bg-cream flex items-center justify-center h-[600px] relative overflow-hidden group rounded-2xl" style={{background: product.bgColor || '#f8fafc'}}>
              <span className="text-[160px] transition-transform duration-500 group-hover:scale-110">{product.emoji}</span>
              <span className="absolute bottom-6 right-6 text-sm tracking-widest text-gray-400 uppercase bg-white/80 px-3 py-1 rounded-full">Hover to zoom</span>
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-accent text-sm font-bold tracking-widest uppercase mb-4">{product.category}</p>
            <h1 className="text-5xl font-black leading-tight mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-black text-primary">${product.price}</span>
              {product.oldPrice && <span className="text-gray-400 text-xl line-through">${product.oldPrice}</span>}
              {product.badge === 'sale' && <span className="bg-red-50 text-red-500 text-sm font-bold px-4 py-2 tracking-widest uppercase rounded-lg">Sale</span>}
            </div>
            <div className="flex items-center gap-3 text-base text-gray-500 mb-8">
              <span className="text-accent">★★★★★</span> {product.rating?.toFixed(1) || '4.9'} · {product.numReviews || 0} reviews
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">{product.description}</p>
            <div className="h-px bg-gray-200 mb-8" />

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <>
                <p className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-4">Select Size</p>
                <div className="flex gap-3 mb-8 flex-wrap">
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSize(s)} className={`w-14 h-14 border-2 text-sm font-bold transition-all rounded-lg ${size === s ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-accent'}`}>{s}</button>
                  ))}
                </div>
              </>
            )}

            {/* Qty */}
            <p className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-4">Quantity</p>
            <div className="inline-flex border-2 border-gray-200 mb-8 rounded-lg">
              <button onClick={() => setQty(q => Math.max(1, q-1))} className="w-12 h-12 hover:bg-gray-50 text-xl transition-colors">−</button>
              <span className="w-16 h-12 flex items-center justify-center font-black text-lg border-x-2 border-gray-200">{qty}</span>
              <button onClick={() => setQty(q => q+1)} className="w-12 h-12 hover:bg-gray-50 text-xl transition-colors">+</button>
            </div>

            <div className="h-px bg-gray-200 mb-8" />
            <div className="flex gap-4 mb-8">
              <button onClick={handleAdd} className="flex-1 btn-primary">Add to Cart</button>
              <button className="border-2 border-gray-200 px-6 hover:bg-tanz-black hover:text-white hover:border-tanz-black transition-all text-xl rounded-lg">🤍</button>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-3 border-2 border-gray-100 rounded-lg overflow-hidden">
              {[['🚚','Free over $150'],['↩','30-day returns'],['♻️','Eco-made']].map(([icon, label]) => (
                <div key={label} className="p-6 text-center text-sm tracking-widest text-gray-500 uppercase border-r-2 last:border-r-0 border-gray-100">
                  <div className="text-2xl mb-2">{icon}</div>{label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="px-12 py-32 bg-cream">
          <h2 className="text-5xl font-black tracking-tight mb-16 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      )}
    </main>
  );
}
