import { getProducts } from '../api';
import Pagination from '../components/Pagination';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import { statusPanel } from '../lib/styles';
import { useCart } from '../state/CartContext';
import type { ProductFiltersState, ProductResponse } from '../types';
import { useEffect, useMemo, useState } from 'react';

const defaultFilters: ProductFiltersState = {
  search: '',
  category: '',
  minPrice: '',
  maxPrice: '',
  page: 1
};

export default function ProductsPage() {
  const { add } = useCart();
  const [data, setData] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<ProductFiltersState>(defaultFilters);

  const params = useMemo(() => {
    const next = new URLSearchParams({ page: String(filters.page), limit: '8' });
    if (filters.search) next.set('search', filters.search);
    if (filters.category) next.set('category', filters.category);
    if (filters.minPrice) next.set('minPrice', filters.minPrice);
    if (filters.maxPrice) next.set('maxPrice', filters.maxPrice);
    return next;
  }, [filters]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProducts(params)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setError('');
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load products');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [params]);

  return (
    <section>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-emerald-700">
            Product listing
          </p>
          <h1 className="font-serif text-5xl font-bold tracking-tight text-slate-950">
            Shop the catalog
          </h1>
        </div>
      </div>

      <ProductFilters
        categories={data?.categories || []}
        filters={filters}
        onChange={setFilters}
      />

      {loading && <div className={statusPanel}>Loading products...</div>}
      {error && <div className={`${statusPanel} text-red-700`}>{error}</div>}
      {!loading && !error && data?.items.length === 0 && (
        <div className={statusPanel}>No products found.</div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {data?.items.map((product) => (
          <ProductCard key={product._id} product={product} onAdd={() => add(product)} />
        ))}
      </div>

      {data && (
        <Pagination
          page={data.page}
          pages={data.pages}
          onChange={(page) => setFilters((current) => ({ ...current, page }))}
        />
      )}
    </section>
  );
}
