import { Link } from 'react-router-dom';
import { formatCurrency } from '../lib/currency';
import { getPrimaryProductImage } from '../lib/products';
import { buttons, panel } from '../lib/styles';
import type { Product } from '../types';

type ProductCardProps = {
  product: Product;
  onAdd: () => void;
};

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className={`${panel} overflow-hidden`}>
      <Link
        to={`/products/${product._id}`}
        className="block aspect-[4/3] bg-stone-100"
      >
        <img
          className="h-full w-full object-cover"
          src={getPrimaryProductImage(product)}
          alt={product.name}
        />
      </Link>
      <div className="flex min-h-64 flex-col gap-3 p-4">
        <div>
          <p className="mb-1 text-[0.68rem] font-black uppercase tracking-[0.18em] text-emerald-700">
            {product.category}
          </p>
          <Link to={`/products/${product._id}`}>
            <h2 className="font-serif text-xl font-bold leading-tight text-slate-950">
              {product.name}
            </h2>
          </Link>
        </div>
        <p className="text-sm leading-6 text-slate-600">{product.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3">
          <strong className="text-slate-950">{formatCurrency(product.price)}</strong>
          <button className={buttons.primary} onClick={onAdd} type="button">
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
