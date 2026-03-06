import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

const CATS = ['All','Women','Men','Accessories','Kids'];

export default function Shop() {
  const { category } = useParams();
  const [filter, setFilter] = useState(category || 'All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');
  const [page, setPage] = useState(1);

  const params = {};
  if (filter !== 'All') params.category = filter;
  if (search) params.search = search;
  params.sort = sort;
  params.page = page;
  params.limit = 12;

  const { products, loading, total, pages } = useProducts(params);

  useEffect(() => { if (category) setFilter(category); }, [category]);

  return (
    <main className="pt-20 min-h-screen">
      <div className="px-12 py-16">
        <p className="text-accent text-sm font-bold tracking-widest uppercase mb-4 flex items-center gap-3"><span className="w-8 h-px bg-accent" />Collection</p>
        <h1 className="text-6xl font-black tracking-tight mb-4">All Products</h1>
        <p className="text-gray-500 text-lg mb-12">{total} products</p>

        {/* Filters */}
        <div className="flex gap-4 flex-wrap items-center mb-16 pb-8 border-b border-gray-200">
          <div className="relative flex-1 min-w-64">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">⌕</span>
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search products..." className="w-full pl-12 pr-4 py-4 border border-gray-200 bg-cream text-sm outline-none focus:border-accent transition-colors rounded-lg" />
          </div>
          <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }} className="px-4 py-4 border border-gray-200 bg-cream text-sm outline-none focus:border-accent transition-colors rounded-lg">
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="-createdAt">Newest First</option>
          </select>
          {CATS.map(c => (
            <button key={c} onClick={() => { setFilter(c); setPage(1); }} className={`px-6 py-3 border text-sm font-bold tracking-widest uppercase transition-all rounded-lg ${filter === c ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 hover:border-accent hover:bg-accent hover:text-white'}`}>{c}</button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-4 gap-6">
            {Array(8).fill(0).map((_,i) => <div key={i} className="h-96 bg-cream rounded-2xl animate-pulse" />)}
          </div>
        ) : products.length ? (
          <>
            <div className="grid grid-cols-4 gap-6">
              {products.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
            {/* Pagination */}
            {pages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({length: pages}, (_,i) => (
                  <button key={i} onClick={() => setPage(i+1)} className={`w-10 h-10 text-xs font-bold transition-all ${page === i+1 ? 'bg-black text-white' : 'border border-gray-200 hover:border-black'}`}>{i+1}</button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl opacity-20 mb-4">🔍</div>
            <p className="text-xs text-gray-400 tracking-widest uppercase mb-6">No products found</p>
            <button onClick={() => { setFilter('All'); setSearch(''); }} className="bg-black text-white text-xs font-bold tracking-widest uppercase px-8 py-3">View All</button>
          </div>
        )}
      </div>
    </main>
  );
}