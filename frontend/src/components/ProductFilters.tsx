import { Search, SlidersHorizontal } from 'lucide-react';
import type { FormEvent } from 'react';
import { buttons, fields, panel } from '../lib/styles';
import type { ProductFiltersState } from '../types';

type ProductFiltersProps = {
  categories: string[];
  filters: ProductFiltersState;
  onChange: (filters: ProductFiltersState) => void;
};

export default function ProductFilters({
  categories,
  filters,
  onChange
}: ProductFiltersProps) {
  function updateFilter(patch: Partial<ProductFiltersState>) {
    onChange({ ...filters, ...patch });
  }

  function applyFilters(event: FormEvent) {
    event.preventDefault();
    updateFilter({ page: 1 });
  }

  return (
    <form
      className={[
        panel,
        'mb-6 grid items-center gap-3 p-3',
        'lg:grid-cols-[minmax(240px,2fr)_minmax(150px,1fr)_1fr_1fr_auto]'
      ].join(' ')}
      onSubmit={applyFilters}
    >
      <label className="flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3">
        <Search size={18} />
        <input
          className="min-h-10 w-full border-0 bg-transparent outline-none"
          placeholder="Search products"
          value={filters.search}
          onChange={(event) => updateFilter({ search: event.target.value })}
        />
      </label>
      <select
        className={fields}
        value={filters.category}
        onChange={(event) => {
          updateFilter({ category: event.target.value, page: 1 });
        }}
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>
      <input
        className={fields}
        inputMode="decimal"
        placeholder="Min price"
        value={filters.minPrice}
        onChange={(event) => updateFilter({ minPrice: event.target.value })}
      />
      <input
        className={fields}
        inputMode="decimal"
        placeholder="Max price"
        value={filters.maxPrice}
        onChange={(event) => updateFilter({ maxPrice: event.target.value })}
      />
      <button className={buttons.secondary} type="submit">
        <SlidersHorizontal size={18} />
        Filter
      </button>
    </form>
  );
}
