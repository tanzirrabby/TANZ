import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore()
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-400 mb-8">Your cart is empty.</p>
        <Link to="/shop" className="bg-primary text-white px-8 py-3 rounded-full hover:bg-accent transition-colors inline-block text-sm font-medium">
          Shop Now
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <button onClick={clearCart} className="text-sm text-red-500 hover:underline">Clear all</button>
      </div>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item._id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm">
            <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-gray-100" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-accent font-bold text-sm mt-1">${item.price?.toFixed(2)}</p>
              <div className="flex items-center gap-2 mt-3">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="w-7 h-7 border rounded-full flex items-center justify-center text-sm hover:bg-gray-50">-</button>
                <span className="w-6 text-center text-sm">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="w-7 h-7 border rounded-full flex items-center justify-center text-sm hover:bg-gray-50">+</button>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <button onClick={() => removeItem(item._id)} className="text-gray-400 hover:text-red-500 transition-colors text-xs">✕</button>
              <p className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Total</span>
          <span className="text-accent">${total.toFixed(2)}</span>
        </div>
        <Link to="/checkout" className="block w-full bg-primary text-white text-center py-4 rounded-full font-medium hover:bg-accent transition-colors">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}
