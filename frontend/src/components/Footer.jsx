import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="px-12 py-16 grid grid-cols-4 gap-8 border-b border-white/10">
        <div>
          <div className="text-xl font-black tracking-widest mb-4">T<span className="text-gold">A</span>NZ</div>
          <p className="text-white/40 text-sm leading-relaxed">Contemporary fashion for every body. Minimal by nature, bold by choice.</p>
        </div>
        {[
          { title: 'Shop', links: ['Women', 'Men', 'Accessories', 'Kids'] },
          { title: 'Company', links: ['About', 'Careers', 'Press', 'Sustainability'] },
          { title: 'Help', links: ['Shipping', 'Returns', 'Size Guide', 'Contact'] }
        ].map(col => (
          <div key={col.title}>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-4 text-white/60">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map(l => <li key={l}><Link to="/shop" className="text-white/40 hover:text-gold text-sm transition-colors">{l}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="px-12 py-6 flex justify-between items-center text-white/30 text-xs tracking-widest uppercase">
        <span>© 2026 TANZ. All rights reserved.</span>
        <span>Made with ✦</span>
      </div>
    </footer>
  );
}