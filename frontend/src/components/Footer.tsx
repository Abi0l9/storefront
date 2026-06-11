import { Github, Mail, ShieldCheck, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="max-w-xl">
          <Link className="inline-flex items-center gap-2 font-serif text-2xl font-bold" to="/">
            <Store size={24} />
            Storefront
          </Link>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            A polished MERN take-home store with secure product management,
            responsive shopping flows, and production-aware API structure.
          </p>
        </div>

        <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3 lg:text-right">
          <span className="inline-flex items-center gap-2 lg:justify-end">
            <ShieldCheck size={17} />
            JWT auth
          </span>
          <span className="inline-flex items-center gap-2 lg:justify-end">
            <Github size={17} />
            Modular API
          </span>
          <span className="inline-flex items-center gap-2 lg:justify-end">
            <Mail size={17} />
            Deploy ready
          </span>
        </div>
      </div>
    </footer>
  );
}
