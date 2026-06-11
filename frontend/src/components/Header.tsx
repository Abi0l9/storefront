import { LogOut, Plus, ShoppingCart, Store } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { buttons, cx } from '../lib/styles';
import { useAuth } from '../state/AuthContext';
import { useCart } from '../state/CartContext';

export default function Header() {
  const { count } = useCart();
  const { user, logout } = useAuth();

  return (
    <header
      className={[
        'sticky top-0 z-10 flex items-center justify-between gap-6',
        'border-b border-stone-200 bg-white/90 px-4 py-4 backdrop-blur',
        'sm:px-6 lg:px-12'
      ].join(' ')}
    >
      <Link className="inline-flex items-center gap-2 font-serif text-2xl font-bold" to="/">
        <Store size={24} />
        Storefront
      </Link>
      <nav className="hidden flex-wrap items-center justify-end gap-2 sm:flex">
        {user && (
          <NavLink className={buttons.ghost} to="/products/new" title="Create product">
            <Plus size={18} />
            <span>Product</span>
          </NavLink>
        )}
        <NavLink className={cx(buttons.ghost, 'relative')} to="/checkout" title="Checkout">
          <ShoppingCart size={19} />
          <span>Cart</span>
          {count > 0 && (
            <strong className="rounded-full bg-orange-600 px-2 py-1 text-xs text-white">
              {count}
            </strong>
          )}
        </NavLink>
        {user ? (
          <button className={buttons.ghost} onClick={logout} type="button">
            <LogOut size={18} />
            {user.username}
          </button>
        ) : (
          <NavLink className={buttons.primary} to="/login">
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}
