import { createContext, useContext, useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { CartItem, Product } from '../types';

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  add: (product: Product) => void;
  updateQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const storageKey = 'storefront-cart';

function readInitialCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readInitialCart);

  function commit(next: CartItem[]) {
    setItems(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  }

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

    return {
      items,
      count,
      total,
      add(product) {
        const existing = items.find((item) => item.product._id === product._id);
        const next = existing
          ? items.map((item) =>
              item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...items, { product, quantity: 1 }];
        commit(next);
        toast.success(`${product.name} added to cart`);
      },
      updateQuantity(id, quantity) {
        const product = items.find((item) => item.product._id === id)?.product;
        const next = items
          .map((item) => (item.product._id === id ? { ...item, quantity: Math.max(quantity, 1) } : item))
          .filter((item) => item.quantity > 0);
        commit(next);
        if (product) toast.message(`${product.name} quantity updated`);
      },
      remove(id) {
        const product = items.find((item) => item.product._id === id)?.product;
        commit(items.filter((item) => item.product._id !== id));
        if (product) toast.warning(`${product.name} removed`);
      },
      clear() {
        commit([]);
        toast.success('Cart cleared');
      }
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
