import { useState } from 'react';
import api from '../utils/api';

export default function ProductManager() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Women',
    images: [],
    sizes: [''],
    stock: ''
  });
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        images: form.images.filter(img => img.trim()),
        sizes: form.sizes.filter(size => size.trim())
      });
      alert('Product added successfully!');
      setForm({
        name: '',
        description: '',
        price: '',
        category: 'Women',
        images: [],
        sizes: [''],
        stock: ''
      });
    } catch (error) {
      alert('Error adding product: ' + error.response?.data?.message);
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const base64 = await convertToBase64(file);
        // Test endpoint first
        const testResponse = await api.post('/upload/test', { image: base64 });
        console.log('Test response:', testResponse.data);

        const { data } = await api.post('/upload', { image: base64 });
        return data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setForm(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error.response?.data?.message ||
                          error.response?.data?.details ||
                          error.message ||
                          'Unknown upload error';
      alert('Error uploading images: ' + errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const removeImage = (index) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addSize = () => setForm(prev => ({ ...prev, sizes: [...prev.sizes, ''] }));

  return (
    <main className="pt-20 min-h-screen">
      <div className="px-12 py-16 max-w-2xl">
        <h1 className="text-4xl font-black tracking-tight mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">Product Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              className="w-full p-3 border rounded-lg h-32"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={e => setForm({...form, price: e.target.value})}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Stock</label>
              <input
                type="number"
                value={form.stock}
                onChange={e => setForm({...form, stock: e.target.value})}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Category</label>
            <select
              value={form.category}
              onChange={e => setForm({...form, category: e.target.value})}
              className="w-full p-3 border rounded-lg"
            >
              <option>Women</option>
              <option>Men</option>
              <option>Accessories</option>
              <option>Kids</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Product Images</label>
            <div className="mb-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="w-full p-3 border rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-accent file:text-white file:font-bold file:cursor-pointer"
              />
              {uploading && <p className="text-sm text-gray-500 mt-2">Uploading images...</p>}
            </div>

            {form.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {form.images.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Sizes</label>
            {form.sizes.map((size, i) => (
              <input
                key={i}
                type="text"
                placeholder="Size (e.g., S, M, L)"
                value={size}
                onChange={e => {
                  const newSizes = [...form.sizes];
                  newSizes[i] = e.target.value;
                  setForm({...form, sizes: newSizes});
                }}
                className="w-full p-3 border rounded-lg mb-2"
              />
            ))}
            <button type="button" onClick={addSize} className="text-accent hover:underline">+ Add Size</button>
          </div>

          <button type="submit" className="btn-primary w-full">Add Product</button>
        </form>
      </div>
    </main>
  );
}