import { Edit, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteProduct, getProduct } from '../api';
import ProductImageSlider from '../components/ProductImageSlider';
import { formatCurrency } from '../lib/currency';
import { buttons, statusPanel } from '../lib/styles';
import { useAuth } from '../state/AuthContext';
import { useCart } from '../state/CartContext';
import type { Product } from '../types';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { add } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getProduct(id)
      .then((result) => setProduct(result))
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Product not found');
      });
  }, [id]);

  async function handleDelete() {
    if (!product || !token || !confirm(`Delete ${product.name}?`)) return;
    await deleteProduct(product._id, token);
    navigate('/');
  }

  if (error) return <div className={`${statusPanel} text-red-700`}>{error}</div>;
  if (!product) return <div className={statusPanel}>Loading product...</div>;

  return (
    <section className="grid items-start gap-10 lg:grid-cols-[1.04fr_0.96fr]">
      <ProductImageSlider product={product} />
      <div className="grid gap-6 pt-1">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-700">
          {product.category}
        </p>
        <h1 className="font-serif text-5xl font-bold leading-[0.95] text-slate-950">
          {product.name}
        </h1>
        <p className="max-w-prose text-lg leading-8 text-slate-600">
          {product.description}
        </p>
        <div className="flex items-center justify-between border-y border-stone-200 py-5">
          <strong className="font-serif text-4xl text-slate-950">
            {formatCurrency(product.price)}
          </strong>
          <span className="text-slate-600">{product.stock} in stock</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className={buttons.primary} onClick={() => add(product)} type="button">
            Add to cart
          </button>
          {user && (
            <>
              <Link className={buttons.secondary} to={`/products/${product._id}/edit`}>
                <Edit size={18} />
                Edit
              </Link>
              <button className={buttons.danger} onClick={handleDelete} type="button">
                <Trash2 size={18} />
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
