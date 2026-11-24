import { useEffect, useState } from 'react';
import { Check, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react';
import { ProductImage } from '../components/ProductImage';
import { formatToman, toPersianDigits } from '../data/catalog';
import { Product } from '../types/store';

interface ProductDetailScreenProps {
  product: Product;
  onAddToCart: (
    product: Product,
    colorName: string,
    colorHex: string,
    storageLabel: string,
    unitPrice: number
  ) => void;
}

export function ProductDetailScreen({
  product,
  onAddToCart,
}: ProductDetailScreenProps) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedStorageIdx, setSelectedStorageIdx] = useState(0);

  useEffect(() => {
    setSelectedColorIdx(0);
    setSelectedStorageIdx(0);
  }, [product.id]);

  const activeColor = product.colors[selectedColorIdx] ?? product.colors[0];
  const activeStorage =
    product.storageOptions[selectedStorageIdx] ?? product.storageOptions[0];
  const finalPrice = product.basePrice + activeStorage.priceDelta;
  const originalFinalPrice = product.originalPrice
    ? product.originalPrice + activeStorage.priceDelta
    : undefined;

  return (
    <div className="space-y-8 pb-24 lg:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Right Column (Start in RTL): Product Image Gallery & Specs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-zinc-200/90 rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11]">
            <ProductImage
              src={product.image}
              alt={product.name}
              fallbackLabel={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description & Technical Specs */}
          <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-zinc-950">معرفی تخصصی کالا</h2>
              <p className="text-sm text-zinc-600 leading-7">{product.description}</p>
            </div>

            <div className="border-t border-zinc-100 pt-6 space-y-3">
              <h3 className="text-base font-bold text-zinc-950">مشخصات فنی کلیدی</h3>
              <dl className="divide-y divide-zinc-100">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm"
                  >
                    <dt className="text-zinc-500 font-medium">{spec.label}</dt>
                    <dd className="text-zinc-950 font-semibold">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Left Column (End in RTL): Contiguous Sticky Purchase Module */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 space-y-6">
            {/* Unboxed Metadata */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <span className="font-semibold text-zinc-800">{product.brand}</span>
                <span aria-hidden="true">·</span>
                <span>{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-medium">{product.stockNote}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
                {product.name}
              </h1>

              <p className="text-sm text-zinc-600">{product.persianSubtitle}</p>

              <div className="flex items-center gap-2 pt-1 text-xs text-zinc-600 tabular-nums">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-zinc-900">
                  {toPersianDigits(product.rating)}
                </span>
                <span aria-hidden="true">·</span>
                <span>{toPersianDigits(product.reviewCount)} دیدگاه کاربران</span>
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-5 space-y-5">
              {/* Color Selector */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-800">رنگ انتخابی:</span>
                  <span className="text-zinc-600">{activeColor.name}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  {product.colors.map((color, idx) => {
                    const isSelected = idx === selectedColorIdx;
                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => setSelectedColorIdx(idx)}
                        aria-label={color.name}
                        className={`h-11 px-3 rounded-xl border flex items-center gap-2 text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/60 text-blue-700 ring-1 ring-blue-600'
                            : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-zinc-300 shrink-0 flex items-center justify-center"
                          style={{ backgroundColor: color.hex }}
                        >
                          {isSelected && (
                            <Check className="w-2.5 h-2.5 text-white drop-shadow" />
                          )}
                        </span>
                        <span className="whitespace-nowrap">{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Storage / Capacity Selector */}
              <div className="space-y-2.5">
                <span className="block text-xs font-semibold text-zinc-800">
                  ظرفیت و پیکربندی:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.storageOptions.map((opt, idx) => {
                    const isSelected = idx === selectedStorageIdx;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setSelectedStorageIdx(idx)}
                        className={`min-h-[44px] px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/60 text-blue-700 ring-1 ring-blue-600'
                            : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {opt.priceDelta > 0 && (
                          <span className="text-[11px] text-zinc-500 tabular-nums">
                            +{toPersianDigits((opt.priceDelta / 1000000).toFixed(1))} م
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Pricing & Trust Summary */}
            <div className="border-t border-zinc-100 pt-5 space-y-4">
              <div className="flex items-end justify-between">
                <span className="text-xs font-medium text-zinc-500">قیمت مصرف‌کننده</span>
                <div className="text-left">
                  {originalFinalPrice && (
                    <span className="block text-xs text-zinc-400 line-through tabular-nums">
                      {formatToman(originalFinalPrice)}
                    </span>
                  )}
                  <span className="text-xl sm:text-2xl font-extrabold text-zinc-950 tabular-nums">
                    {formatToman(finalPrice)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-zinc-600 bg-zinc-50 rounded-2xl p-3.5 border border-zinc-200/70">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>۱۸ ماه گارانتی شرکتی معتبر و تضمین رجیستری</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>ارسال رایگان و بیمه‌شده از انبار مرکزی تهران</span>
                </div>
              </div>

              {/* Matches XPath: //button[@id='addToCartBtn'] */}
              <div className="sticky bottom-3 z-20 lg:static">
                <button
                  id="addToCartBtn"
                  type="button"
                  onClick={() =>
                    onAddToCart(
                      product,
                      activeColor.name,
                      activeColor.hex,
                      activeStorage.label,
                      finalPrice
                    )
                  }
                  className="w-full h-12 sm:h-13 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/20 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>افزودن به سبد خرید</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
