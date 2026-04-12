import { useState, useRef, useCallback } from 'react';
import { X, Upload, Trash2, Plus, Loader2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '../../../components/ui/select';
import { housingApi } from '../../../api/housing';
import type { HousingType } from '../types/housing';

// ── Types ────────────────────────────────────────────────────────────────────

interface Charge {
  label: string;
  amount: number | '';
}

interface FormState {
  title:       string;
  description: string;
  address:     string;
  city:        string;
  location:    string;
  type:        HousingType | '';
  bedrooms:    number | '';
  bathrooms:   number | '';
  size:        number | '';
  price:       number | '';
  available:   boolean;
  notes:       string;
  charges:     Charge[];
}

interface Props {
  onClose:   () => void;
  onCreated: () => void;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const toBase64 = (file: File): Promise<string> =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });

const INITIAL: FormState = {
  title: '', description: '', address: '', city: '', location: '',
  type: '', bedrooms: '', bathrooms: '', size: '', price: '',
  available: true, notes: '', charges: [],
};

// ── Component ────────────────────────────────────────────────────────────────

export function CreateHousingModal({ onClose, onCreated }: Props) {
  const [form,        setForm]        = useState<FormState>(INITIAL);
  const [imageFiles,  setImageFiles]  = useState<File[]>([]);
  const [previews,    setPreviews]    = useState<string[]>([]);
  const [submitting,  setSubmitting]  = useState(false);
  const [errors,      setErrors]      = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Field helpers ──────────────────────────────────────────────────────────

  const set = (field: keyof FormState, value: any) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const numericField = (field: keyof FormState) => ({
    value: form[field] as number | '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      set(field, v === '' ? '' : Number(v));
    },
  });

  // ── Image handling ─────────────────────────────────────────────────────────

  const addImages = useCallback((files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files).filter(f => f.type.startsWith('image/'));
    setImageFiles(prev => [...prev, ...arr]);
    arr.forEach(f => {
      const url = URL.createObjectURL(f);
      setPreviews(prev => [...prev, url]);
    });
  }, []);

  const removeImage = (idx: number) => {
    URL.revokeObjectURL(previews[idx]);
    setImageFiles(prev => prev.filter((_, i) => i !== idx));
    setPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    addImages(e.dataTransfer.files);
  };

  // ── Charges ────────────────────────────────────────────────────────────────

  const addCharge    = () => setForm(p => ({ ...p, charges: [...p.charges, { label: '', amount: '' }] }));
  const removeCharge = (i: number) => setForm(p => ({ ...p, charges: p.charges.filter((_, idx) => idx !== i) }));
  const setCharge    = (i: number, field: 'label' | 'amount', value: string) =>
    setForm(p => {
      const charges = [...p.charges];
      charges[i] = { ...charges[i], [field]: field === 'amount' ? (value === '' ? '' : Number(value)) : value };
      return { ...p, charges };
    });

  // ── Validation ─────────────────────────────────────────────────────────────

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.title.trim())       e.title       = 'Title is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.address.trim())     e.address     = 'Address is required';
    if (!form.city.trim())        e.city        = 'City is required';
    if (!form.type)               e.type        = 'Type is required';
    if (form.price === '')        e.price       = 'Price is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Submit ─────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const images = await Promise.all(imageFiles.map(toBase64));
      await housingApi.create({
        title:       form.title,
        description: form.description,
        address:     form.address,
        city:        form.city,
        location:    form.location,
        type:        form.type as HousingType,
        bedrooms:    Number(form.bedrooms)  || 0,
        bathrooms:   Number(form.bathrooms) || 0,
        size:        Number(form.size)      || 0,
        price:       Number(form.price),
        available:   form.available,
        notes:       form.notes,
        charges:     form.charges
          .filter(c => c.label && c.amount !== '')
          .map(c => ({ label: c.label, amount: Number(c.amount) })),
        images,
      });
      onCreated();
      onClose();
    } catch (err: any) {
      const msg = err?.data?.error?.message ?? 'Failed to create listing';
      setErrors({ _global: msg });
    } finally {
      setSubmitting(false);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-card border border-border shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <h2 className="text-lg font-semibold">New Housing Listing</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">

          {errors._global && (
            <div className="rounded-md bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
              {errors._global}
            </div>
          )}

          {/* Title */}
          <Field label="Title" error={errors.title} required>
            <Input
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="e.g. Bright studio near campus"
              className="bg-background"
            />
          </Field>

          {/* Description */}
          <Field label="Description" error={errors.description} required>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Describe the accommodation…"
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
            />
          </Field>

          {/* Address + City */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Address" error={errors.address} required>
              <Input
                value={form.address}
                onChange={e => set('address', e.target.value)}
                placeholder="123 Rue de la Paix"
                className="bg-background"
              />
            </Field>
            <Field label="City" error={errors.city} required>
              <Input
                value={form.city}
                onChange={e => set('city', e.target.value)}
                placeholder="Paris"
                className="bg-background"
              />
            </Field>
          </div>

          {/* Location (optional) */}
          <Field label="Google Maps link / coordinates">
            <Input
              value={form.location}
              onChange={e => set('location', e.target.value)}
              placeholder="https://maps.google.com/…"
              className="bg-background"
            />
          </Field>

          {/* Type + Available */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Type" error={errors.type} required>
              <Select
                value={form.type || ''}
                onValueChange={v => set('type', v)}
              >
                <SelectTrigger className="bg-background border-input">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {(['Studio', 'Apartment', 'Room', 'Colocation'] as HousingType[]).map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Availability">
              <Select
                value={String(form.available)}
                onValueChange={v => set('available', v === 'true')}
              >
                <SelectTrigger className="bg-background border-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Available</SelectItem>
                  <SelectItem value="false">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          {/* Price / Size / Bedrooms / Bathrooms */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Field label="Price (€/mo)" error={errors.price} required>
              <Input type="number" min={0} {...numericField('price')} className="bg-background" />
            </Field>
            <Field label="Size (m²)">
              <Input type="number" min={0} {...numericField('size')} className="bg-background" />
            </Field>
            <Field label="Bedrooms">
              <Input type="number" min={0} {...numericField('bedrooms')} className="bg-background" />
            </Field>
            <Field label="Bathrooms">
              <Input type="number" min={0} {...numericField('bathrooms')} className="bg-background" />
            </Field>
          </div>

          {/* Notes */}
          <Field label="Notes">
            <textarea
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="Any additional notes…"
              rows={2}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
            />
          </Field>

          {/* Charges */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Additional charges</label>
              <button
                type="button"
                onClick={addCharge}
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <Plus className="size-3" /> Add charge
              </button>
            </div>
            <div className="space-y-2">
              {form.charges.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    placeholder="Label (e.g. Water)"
                    value={c.label}
                    onChange={e => setCharge(i, 'label', e.target.value)}
                    className="bg-background flex-1"
                  />
                  <Input
                    type="number"
                    placeholder="Amount (€)"
                    value={c.amount}
                    onChange={e => setCharge(i, 'amount', e.target.value)}
                    className="bg-background w-32"
                    min={0}
                  />
                  <button
                    type="button"
                    onClick={() => removeCharge(i)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="text-sm font-medium mb-2 block">Photos</label>
            <div
              onDrop={onDrop}
              onDragOver={e => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-background/50 px-4 py-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
            >
              <Upload className="size-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drag & drop images or <span className="text-primary font-medium">browse</span>
              </p>
              <p className="text-xs text-muted-foreground">JPEG, PNG, WEBP</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={e => addImages(e.target.files)}
            />
            {previews.length > 0 && (
              <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
                {previews.map((src, i) => (
                  <div key={i} className="relative group aspect-square rounded-md overflow-hidden border border-border">
                    <img src={src} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="size-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 -mx-6 -mb-5 border-t border-border bg-card px-6 py-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="min-w-30">
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" /> Creating…
                </span>
              ) : 'Create listing'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}

// ── Field helper ─────────────────────────────────────────────────────────────

function Field({
  label, error, required, children,
}: {
  label: string; error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">
        {label}{required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}