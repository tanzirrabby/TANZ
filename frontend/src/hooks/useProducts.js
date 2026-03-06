import { useState, useEffect } from 'react'
import api from '../utils/api'

export function useProducts(query = '') {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`/products${query ? `?keyword=${query}` : ''}`)
        setProducts(data.products || data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [query])

  return { products, loading, error }
}

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    const fetch = async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`/products/${id}`)
        setProduct(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  return { product, loading, error }
}
