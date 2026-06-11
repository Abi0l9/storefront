import { buttons } from '../lib/styles';

type PaginationProps = {
  page: number;
  pages: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, pages, onChange }: PaginationProps) {
  if (pages <= 1) return null;

  return (
    <div className="mt-7 flex items-center justify-center gap-3">
      <button
        className={buttons.secondary}
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        type="button"
      >
        Previous
      </button>
      <span className="text-sm font-semibold text-slate-600">
        Page {page} of {pages}
      </span>
      <button
        className={buttons.secondary}
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
        type="button"
      >
        Next
      </button>
    </div>
  );
}
