import { useState } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingBag, Tag, Trash2, Truck } from 'lucide-react';
import { ProductImage } from '../components/ProductImage';
import { formatToman, PRODUCTS, toPersianDigits } from '../data/catalog';
import { CartItem } from '../types/store';

interface CartScreenProps {
  items: CartItem[];
  promoCode: string;
  onApplyPromo: (code: string) => void;
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onBrowseProducts: () => void;
  onProceedToCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD = 20000000;

export function CartScreen({
  items,
  promoCode,
  onApplyPromo,
  onUpdateQuantity,
  onRemoveItem,
  onBrowseProducts,
  onProceedToCheckout,
}: CartScreenProps) {
  const [promoInput, setPromoInput] = useState(promoCode);
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shippingFee = hasFreeShipping ? 0 : 250000;
  const discountAmount = promoCode.trim().toUpperCase() === 'NOVIN10' ? Math.round(subtotal * 0.05) : 0;
  const payableTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = promoInput.trim().toUpperCase();
    if (!cleaned) {
      onApplyPromo('');
      setPromoFeedback(null);
      return;
    }
    if (cleaned === 'NOVIN10') {
      onApplyPromo('NOVIN10');
      setPromoFeedback('کد تخفیف ۵ درصدی اعمال شد.');
    } else {
      setPromoFeedback('کد تخفیف معتبر نیست. می‌توانید از کد NOVIN10 استفاده کنید.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="pb-28 md:pb-32">
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-8 sm:p-14 text-center max-w-2xl mx-auto space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-zinc-100 text-zinc-500 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-7 h-7 stroke-[1.6]" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-950">
              سبد خرید شما خالی است
            </h1>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              برای شروع خرید می‌توانید جدیدترین گوشی‌ها، لپ‌تاپ‌ها و گجت‌های دیجیتال نوین‌تک را بررسی کنید.
            </p>
          </div>
          <button
            type="button"
            onClick={onBrowseProducts}
            className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>مشاهده لیست محصولات</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-28 md:pb-32">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
            سبد خرید شما
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 tabular-nums">
            {toPersianDigits(totalCount)} کالا آماده تکمیل و ثبت سفارش
          </p>
        </div>
      </div>

      {/* Free Shipping Status Bar */}
      <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 flex items-center gap-3 text-xs sm:text-sm text-zinc-700">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
          <Truck className="w-4 h-4" />
        </div>
        <div className="flex-1">
          {hasFreeShipping ? (
            <span>
              تبریک! سفارش شما مشمول <strong className="text-zinc-950">ارسال رایگان و بیمه‌شده</strong> است.
            </span>
          ) : (
            <span className="tabular-nums">
              با افزودن {formatToman(FREE_SHIPPING_THRESHOLD - subtotal)} دیگر ارسال شما رایگان می‌شود.
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => {
            const product = PRODUCTS.find((p) => p.id === item.productId);
            if (!product) return null;

            return (
              <div
                key={item.key}
                className="bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center"
              >
                <div className="w-full sm:w-28 aspect-[4/3] sm:aspect-square rounded-xl bg-zinc-100 overflow-hidden shrink-0">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    fallbackLabel={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="text-base font-bold text-zinc-950 truncate">
                        {product.name}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mt-1">
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="w-3 h-3 rounded-full border border-zinc-300 inline-block"
                            style={{ backgroundColor: item.colorHex }}
                          />
                          {item.colorName}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.storageLabel}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label={`حذف ${product.name}`}
                      onClick={() => onRemoveItem(item.key)}
                      className="w-10 h-10 rounded-xl text-zinc-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    {/* Quantity Stepper */}
                    <div className="inline-flex items-center border border-zinc-200 rounded-xl bg-zinc-50 p-0.5">
                      <button
                        type="button"
                        aria-label="افزایش تعداد"
                        onClick={() => onUpdateQuantity(item.key, 1)}
                        className="w-10 h-9 rounded-lg flex items-center justify-center text-zinc-700 hover:bg-white hover:shadow-xs transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <span className="w-9 text-center text-sm font-bold text-zinc-950 tabular-nums">
                        {toPersianDigits(item.quantity)}
                      </span>
                      <button
                        type="button"
                        aria-label="کاهش تعداد"
                        onClick={() => onUpdateQuantity(item.key, -1)}
                        className="w-10 h-9 rounded-lg flex items-center justify-center text-zinc-700 hover:bg-white hover:shadow-xs transition-all cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-left">
                      <span className="block text-sm sm:text-base font-extrabold text-zinc-950 tabular-nums">
                        {formatToman(item.unitPrice * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="block text-[11px] text-zinc-400 tabular-nums">
                          هر عدد {formatToman(item.unitPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Summary & Checkout Action */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-6 space-y-5">
            <h2 className="text-base font-bold text-zinc-950">خلاصه فاکتور</h2>

            {/* Promo Code Form */}
            <form onSubmit={handlePromoSubmit} className="space-y-2">
              <label htmlFor="promoInput" className="block text-xs font-medium text-zinc-600">
                کد تخفیف (پیشنهاد: NOVIN10)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="promoInput"
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="کد تخفیف را وارد کنید"
                    className="w-full h-11 pr-9 pl-3 rounded-xl border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-blue-600"
                    dir="ltr"
                  />
                </div>
                <button
                  type="submit"
                  className="h-11 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
                >
                  اعمال
                </button>
              </div>
              {promoFeedback && (
                <p className="text-xs text-zinc-600">{promoFeedback}</p>
              )}
            </form>

            <div className="border-t border-zinc-100 pt-4 space-y-2.5 text-sm">
              <div className="flex items-center justify-between text-zinc-600">
                <span>جمع کل کالاها ({toPersianDigits(totalCount)})</span>
                <span className="font-semibold text-zinc-900 tabular-nums">
                  {formatToman(subtotal)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-700">
                  <span>تخفیف کد NOVIN10</span>
                  <span className="font-semibold tabular-nums">
                    -{formatToman(discountAmount)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-zinc-600">
                <span>هزینه ارسال و بیمه</span>
                <span className="font-semibold text-zinc-900 tabular-nums">
                  {shippingFee === 0 ? 'رایگان' : formatToman(shippingFee)}
                </span>
              </div>

              <div className="border-t border-zinc-100 pt-3 flex items-center justify-between">
                <span className="font-bold text-zinc-950">مبلغ قابل پرداخت</span>
                <span className="text-lg font-extrabold text-zinc-950 tabular-nums">
                  {formatToman(payableTotal)}
                </span>
              </div>
            </div>

            {/* Matches XPath: //button[contains(., 'ادامه فرآیند خرید')] */}
            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/15 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <span>ادامه فرآیند خرید</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
