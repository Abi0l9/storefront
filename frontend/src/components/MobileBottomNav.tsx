import { LogOut, Plus, ShoppingCart, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import { useCart } from "../state/CartContext";

const baseItem = [
  "flex min-h-12 flex-1 flex-col items-center justify-center gap-1",
  "rounded-xl px-3 text-[0.72rem] font-extrabold text-slate-600",
  "transition hover:bg-stone-100",
].join(" ");

export default function MobileBottomNav() {
  const { count } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="fixed inset-x-3 bottom-1 z-30 sm:hidden">
      <div
        className={[
          "flex items-center gap-2 rounded-2xl border border-stone-200",
          "bg-white/95 p-2 shadow-2xl shadow-slate-900/15 backdrop-blur",
        ].join(" ")}
      >
        {user && (
          <NavLink className={baseItem} to="/products/new">
            <Plus size={19} />
            Product
          </NavLink>
        )}

        <NavLink className={`${baseItem} relative`} to="/checkout">
          <ShoppingCart size={19} />
          Cart
          {count > 0 && (
            <strong
              className={[
                "absolute right-3 top-1 rounded-full bg-orange-600",
                "px-1.5 py-0.5 text-[0.62rem] text-white",
              ].join(" ")}
            >
              {count}
            </strong>
          )}
        </NavLink>

        {user ? (
          <button className={baseItem} onClick={logout} type="button">
            <LogOut size={19} />
            Logout
          </button>
        ) : (
          <NavLink className={baseItem} to="/login">
            <UserRound size={19} />
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}
