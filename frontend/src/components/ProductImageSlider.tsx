import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { buttons, cx } from '../lib/styles';
import type { Product } from '../types';
import { getProductImages } from '../lib/products';

type ProductImageSliderProps = {
  product: Product;
};

export default function ProductImageSlider({ product }: ProductImageSliderProps) {
  const images = useMemo(() => getProductImages(product), [product]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] || '/placeholder.png';

  function move(direction: number) {
    setActiveIndex((current) => {
      return (current + direction + images.length) % images.length;
    });
  }

  return (
    <div className="grid gap-3">
      <div className="group relative overflow-hidden rounded-2xl bg-stone-100">
        <img
          className="aspect-square w-full object-cover"
          src={activeImage}
          alt={product.name}
        />
        {images.length > 1 && (
          <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
            <button className={buttons.icon} onClick={() => move(-1)} type="button">
              <ChevronLeft size={19} />
            </button>
            <button className={buttons.icon} onClick={() => move(1)} type="button">
              <ChevronRight size={19} />
            </button>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              className={cx(
                'overflow-hidden rounded-xl border bg-white p-1',
                index === activeIndex ? 'border-emerald-800' : 'border-stone-200'
              )}
              key={image}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <img
                className="aspect-square w-full rounded-lg object-cover"
                src={image}
                alt={`${product.name} view ${index + 1}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
