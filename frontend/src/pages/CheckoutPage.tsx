import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createOrder } from '../api';
import { formatCurrency } from '../lib/currency';
import { buttons, fields, panel, statusPanel } from '../lib/styles';
import { useAuth } from '../state/AuthContext';
import { useCart } from '../state/CartContext';

export default function CheckoutPage() {
  const { items, total, updateQuantity, remove, clear } = useCart();
  const { token, user } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleCheckout() {
    setMessage('');
    setError('');
    if (!token) {
      setError('Login is required to place an order.');
      return;
    }

    try {
      await createOrder(
        items.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity
        })),
        token
      );
      clear();
      setMessage('Order placed successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to place order');
    }
  }

  return (
    <section>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-emerald-700">
            Checkout
          </p>
          <h1 className="font-serif text-5xl font-bold tracking-tight text-slate-950">
            Your cart
          </h1>
        </div>
      </div>

      {message && <div className={`${statusPanel} text-emerald-700`}>{message}</div>}
      {error && <div className={`${statusPanel} text-red-700`}>{error}</div>}

      {!items.length ? (
        <div className={statusPanel}>
          Your cart is empty. <Link to="/">Browse products</Link>
        </div>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_280px]">
          <div className="grid gap-3">
            {items.map((item) => (
              <div
                className={`${panel} grid items-center gap-3 p-3 md:grid-cols-[74px_1fr_86px_100px_44px]`}
                key={item.product._id}
              >
                <img
                  className="aspect-square w-16 rounded-md object-cover md:w-[74px]"
                  src={item.product.imageUrl}
                  alt={item.product.name}
                />
                <div>
                  <Link
                    className="font-bold text-slate-950"
                    to={`/products/${item.product._id}`}
                  >
                    {item.product.name}
                  </Link>
                  <span className="block text-slate-500">
                    {formatCurrency(item.product.price)}
                  </span>
                </div>
                <input
                  className={fields}
                  aria-label={`Quantity for ${item.product.name}`}
                  min="1"
                  type="number"
                  value={item.quantity}
                  onChange={(event) => {
                    updateQuantity(item.product._id, Number(event.target.value));
                  }}
                />
                <strong className="text-slate-950">
                  {formatCurrency(item.product.price * item.quantity)}
                </strong>
                <button
                  className={buttons.icon}
                  onClick={() => remove(item.product._id)}
                  type="button"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          <aside className={`${panel} sticky top-24 grid gap-4 p-5`}>
            <span className="text-slate-500">Total</span>
            <strong className="font-serif text-4xl text-slate-950">
              {formatCurrency(total)}
            </strong>
            <button className={buttons.primary} onClick={handleCheckout} type="button">
              {user ? 'Place order' : 'Login to checkout'}
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}
