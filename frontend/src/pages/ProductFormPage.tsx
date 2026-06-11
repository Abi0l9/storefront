import { FormEvent, useEffect, useState } from 'react';
import { ImagePlus, Link as LinkIcon, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProduct, updateProduct, uploadProductImages } from '../api';
import { buttons, fields, panel } from '../lib/styles';
import { useAuth } from '../state/AuthContext';
import type { ProductInput } from '../types';

const emptyProduct: ProductInput = {
  name: '',
  description: '',
  category: '',
  price: 0,
  imageUrl: '',
  imageUrls: [],
  stock: 0
};

export default function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [product, setProduct] = useState<ProductInput>(emptyProduct);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [manualUrl, setManualUrl] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!id) return;
    getProduct(id)
      .then(({ _id, ...result }) => {
        const urls = result.imageUrls?.length ? result.imageUrls : [result.imageUrl];
        setProduct({ ...result, imageUrls: urls.filter(Boolean) });
        setImageUrls(urls.filter(Boolean));
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unable to load product');
      });
  }, [id]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!token) return;

    setSaving(true);
    setError('');
    try {
      const payload = {
        ...product,
        imageUrl: imageUrls[0] || '',
        imageUrls
      };

      if (id) {
        await updateProduct(id, payload, token);
        navigate(`/products/${id}`);
      } else {
        const created = (await createProduct(payload, token)) as { _id: string };
        navigate(`/products/${created._id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save product');
    } finally {
      setSaving(false);
    }
  }

  async function handleUpload(files: FileList | null) {
    if (!files?.length || !token) return;

    setUploading(true);
    setError('');
    try {
      const result = await uploadProductImages(Array.from(files), token);
      addImageUrls(result.urls);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to upload images');
    } finally {
      setUploading(false);
    }
  }

  function addImageUrls(urls: string[]) {
    setImageUrls((current) => {
      const next = [...current, ...urls].map((url) => url.trim()).filter(Boolean);
      return [...new Set(next)];
    });
  }

  function addManualUrl() {
    if (!manualUrl.trim()) return;
    addImageUrls([manualUrl]);
    setManualUrl('');
  }

  function removeImage(url: string) {
    setImageUrls((current) => current.filter((item) => item !== url));
  }

  return (
    <form className={`${panel} mx-auto grid max-w-3xl gap-4 p-6`} onSubmit={handleSubmit}>
      <h1 className="font-serif text-4xl font-bold text-slate-950">
        {id ? 'Edit product' : 'Create product'}
      </h1>
      {error && <p className="text-red-700">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold text-slate-600">
          Name
          <input
            className={fields}
            required
            value={product.name}
            onChange={(event) => {
              setProduct((current) => ({ ...current, name: event.target.value }));
            }}
          />
        </label>
        <label className="grid gap-2 font-bold text-slate-600">
          Category
          <input
            className={fields}
            required
            value={product.category}
            onChange={(event) => {
              setProduct((current) => ({ ...current, category: event.target.value }));
            }}
          />
        </label>
        <label className="grid gap-2 font-bold text-slate-600">
          Price
          <input
            className={fields}
            required
            min="0"
            step="0.01"
            type="number"
            value={product.price}
            onChange={(event) => {
              const price = Number(event.target.value);
              setProduct((current) => ({ ...current, price }));
            }}
          />
        </label>
        <label className="grid gap-2 font-bold text-slate-600">
          Stock
          <input
            className={fields}
            required
            min="0"
            type="number"
            value={product.stock}
            onChange={(event) => {
              const stock = Number(event.target.value);
              setProduct((current) => ({ ...current, stock }));
            }}
          />
        </label>
      </div>
      <section className="grid gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-950">
              Product images
            </h2>
            <p className="text-sm text-slate-500">
              Upload images and manage the gallery visually.
            </p>
          </div>
          <label className={buttons.secondary}>
            <ImagePlus size={18} />
            {uploading ? 'Uploading...' : 'Upload'}
            <input
              className="sr-only"
              accept="image/png,image/jpeg,image/webp"
              multiple
              type="file"
              onChange={(event) => handleUpload(event.target.files)}
            />
          </label>
        </div>

        <ImagePreviewGrid imageUrls={imageUrls} onRemove={removeImage} />

        <div className="grid gap-2 rounded-xl border border-dashed border-stone-300 p-3">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            Add external image URL
          </span>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              className={fields}
              placeholder="https://..."
              value={manualUrl}
              onChange={(event) => setManualUrl(event.target.value)}
            />
            <button className={buttons.ghost} onClick={addManualUrl} type="button">
              <LinkIcon size={18} />
              Add
            </button>
          </div>
        </div>
      </section>
      <label className="grid gap-2 font-bold text-slate-600">
        Description
        <textarea
          className={fields}
          required
          rows={5}
          value={product.description}
          onChange={(event) => {
            setProduct((current) => ({ ...current, description: event.target.value }));
          }}
        />
      </label>
      <button className={buttons.primary} disabled={saving} type="submit">
        {saving ? 'Saving...' : 'Save product'}
      </button>
    </form>
  );
}

function ImagePreviewGrid({
  imageUrls,
  onRemove
}: {
  imageUrls: string[];
  onRemove: (url: string) => void;
}) {
  if (!imageUrls.length) {
    return (
      <div
        className={[
          'grid min-h-40 place-items-center rounded-2xl border',
          'border-dashed border-stone-300 bg-stone-50 text-sm text-slate-500'
        ].join(' ')}
      >
        No images yet. Upload product photos to build the gallery.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {imageUrls.map((url, index) => (
        <div
          className="group relative overflow-hidden rounded-2xl border border-stone-200"
          key={url}
        >
          <img
            className="aspect-square w-full object-cover"
            src={url}
            alt={`Product ${index + 1}`}
          />
          {index === 0 && (
            <span
              className={[
                'absolute left-2 top-2 rounded-full bg-emerald-800',
                'px-2 py-1 text-xs font-bold text-white'
              ].join(' ')}
            >
              Primary
            </span>
          )}
          <button
            className="absolute right-2 top-2 rounded-full bg-white/95 p-2 text-red-700 shadow"
            onClick={() => onRemove(url)}
            type="button"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
