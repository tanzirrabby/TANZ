const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const Product = require('../models/Product');

const products = [
  {
    name: 'Floral Maxi Dress',
    description: 'Elegant floral print maxi dress with a flattering wrap design. Made from breathable cotton blend, perfect for summer occasions. Features adjustable tie waist and hidden side pockets.',
    price: 89.99,
    category: 'Women',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop'],
    sizes: ['XS','S','M','L','XL'],
    stock: 50,
    badge: 'new',
    isFeatured: true
  },
  {
    name: 'Tailored Blazer',
    description: 'Professional tailored blazer in premium wool blend. Single-breasted design with notch lapels, functional buttons, and structured shoulders. Perfect for office wear or formal events.',
    price: 159.99,
    category: 'Women',
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop'],
    sizes: ['XS','S','M','L','XL'],
    stock: 30,
    isFeatured: true
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Ultra-soft organic cotton t-shirt with a relaxed fit. Pre-shrunk and durable, featuring a ribbed crew neck and reinforced shoulder seams. Available in multiple colors.',
    price: 29.99,
    category: 'Men',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop'],
    sizes: ['S','M','L','XL','XXL'],
    stock: 100
  },
  {
    name: 'Slim Fit Chinos',
    description: 'Premium slim fit chinos in stretch cotton. Features a modern tapered leg, front slant pockets, and back welt pockets. Perfect for both casual and smart casual looks.',
    price: 79.99,
    oldPrice: 99.99,
    category: 'Men',
    images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop'],
    sizes: ['28','30','32','34','36'],
    stock: 45,
    badge: 'sale',
    isFeatured: true
  },
  {
    name: 'Leather Tote Bag',
    description: 'Genuine leather tote bag with structured design. Features top zip closure, interior pockets, and adjustable shoulder straps. Spacious enough for daily essentials.',
    price: 129.99,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop'],
    sizes: ['One Size'],
    stock: 25
  },
  {
    name: 'Classic White Sneakers',
    description: 'Timeless white canvas sneakers with rubber sole. Features cushioned insole, lace-up design, and reinforced toe cap. A versatile staple for any wardrobe.',
    price: 89.99,
    category: 'Men',
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop'],
    sizes: ['7','8','9','10','11','12'],
    stock: 40,
    badge: 'hot',
    isFeatured: true
  },
  {
    name: 'Denim Jacket',
    description: 'Classic indigo denim jacket with button front closure. Features chest pockets, side pockets, and adjustable cuffs. Made from 100% cotton for authentic look and feel.',
    price: 119.99,
    category: 'Men',
    images: ['https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=800&fit=crop'],
    sizes: ['S','M','L','XL','XXL'],
    stock: 35
  },
  {
    name: 'Midi Wrap Skirt',
    description: 'Flowy midi wrap skirt in soft jersey fabric. Features adjustable tie closure and asymmetric hem. Perfect for both casual and dressy occasions.',
    price: 54.99,
    category: 'Women',
    images: ['https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa?w=600&h=800&fit=crop'],
    sizes: ['XS','S','M','L','XL'],
    stock: 60,
    badge: 'new'
  },
  {
    name: 'Kids Hooded Sweatshirt',
    description: 'Cozy cotton blend hooded sweatshirt for kids. Features kangaroo pocket, ribbed cuffs and hem, and a fun graphic print. Perfect for playtime and school.',
    price: 39.99,
    category: 'Kids',
    images: ['https://images.unsplash.com/photo-1503944168849-c1246463c59c?w=600&h=800&fit=crop'],
    sizes: ['4','6','8','10','12'],
    stock: 70
  },
  {
    name: 'Silk Scarf',
    description: 'Luxurious 100% silk scarf with artistic print. Measures 90x90cm, perfect for adding elegance to any outfit. Lightweight and breathable.',
    price: 49.99,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1601762603332-db5e4b90cca7?w=600&h=800&fit=crop'],
    sizes: ['One Size'],
    stock: 50
  },
  {
    name: 'Cable Knit Sweater',
    description: 'Warm cable knit sweater in merino wool blend. Features crew neck, long sleeves, and ribbed hem. A cozy essential for cooler weather.',
    price: 89.99,
    category: 'Women',
    images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop'],
    sizes: ['XS','S','M','L','XL'],
    stock: 40
  },
  {
    name: 'Kids Active Set',
    description: 'Comfortable activewear set for kids including moisture-wicking t-shirt and jogger pants. Perfect for sports, play, and everyday comfort.',
    price: 42.99,
    category: 'Kids',
    images: ['https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=600&h=800&fit=crop'],
    sizes: ['4','6','8','10','12'],
    stock: 55
  },
  {
    name: 'Leather Ankle Boots',
    description: 'Stylish leather ankle boots with block heel. Features side zip closure, cushioned insole, and durable rubber sole. Elevate any outfit.',
    price: 149.99,
    category: 'Women',
    images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=800&fit=crop'],
    sizes: ['6','7','8','9','10'],
    stock: 25,
    badge: 'hot'
  },
  {
    name: 'Minimalist Watch',
    description: 'Clean minimalist watch with stainless steel case and leather strap. Features quartz movement, water resistance to 50m, and a simple elegant design.',
    price: 199.99,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop'],
    sizes: ['One Size'],
    stock: 15
  },
  {
    name: 'Linen Button-Down',
    description: 'Breathable linen button-down shirt in relaxed fit. Features mother-of-pearl buttons, patch pocket, and rolled sleeves. Perfect for warm weather.',
    price: 69.99,
    category: 'Men',
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop'],
    sizes: ['S','M','L','XL','XXL'],
    stock: 65
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log('✅ Products seeded!');
  process.exit();
}

seed();