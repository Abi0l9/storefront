export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const buttons = {
  primary: [
    'inline-flex min-h-10 items-center justify-center gap-2 rounded-lg',
    'border border-emerald-800 bg-emerald-800 px-3.5 py-2',
    'font-bold text-white transition hover:bg-emerald-900',
    'disabled:cursor-not-allowed disabled:opacity-55'
  ].join(' '),
  secondary: [
    'inline-flex min-h-10 items-center justify-center gap-2 rounded-lg',
    'border border-stone-300 bg-emerald-50 px-3.5 py-2',
    'font-bold text-slate-800 transition hover:bg-emerald-100',
    'disabled:cursor-not-allowed disabled:opacity-55'
  ].join(' '),
  ghost: [
    'inline-flex min-h-10 items-center justify-center gap-2 rounded-lg',
    'border border-stone-200 bg-white px-3.5 py-2',
    'font-bold text-slate-800 transition hover:border-stone-300'
  ].join(' '),
  danger: [
    'inline-flex min-h-10 items-center justify-center gap-2 rounded-lg',
    'border border-red-200 bg-red-50 px-3.5 py-2',
    'font-bold text-red-700 transition hover:bg-red-100'
  ].join(' '),
  icon: [
    'inline-flex h-10 w-10 items-center justify-center rounded-lg',
    'border border-stone-200 bg-white text-slate-800 transition',
    'hover:border-stone-300'
  ].join(' ')
};

export const fields = [
  'min-h-10 w-full rounded-lg border border-stone-300 bg-white px-3 py-2',
  'text-slate-900 outline-none transition focus:border-emerald-700',
  'focus:ring-4 focus:ring-emerald-800/10'
].join(' ');

export const panel = 'rounded-lg border border-stone-200 bg-white';

export const statusPanel = `${panel} my-5 p-5`;
