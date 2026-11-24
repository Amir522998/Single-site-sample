import { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { formatToman, PRODUCTS, toPersianDigits } from '../data/catalog';
import { CartItem, OrderRecord, UserProfile } from '../types/store';

interface CheckoutScreenProps {
  items: CartItem[];
  promoCode: string;
  profile: UserProfile;
  onBackToCart: () => void;
  onCompleteOrder: (order: OrderRecord) => void;
  onGoHome: () => void;
  onViewProfile: () => void;
}

const DELIVERY_SLOTS = [
  { id: 'express-today', label: 'ارسال اکسپرس امروز', desc: 'بازه ۱۴:۰۰ تا ۱۸:۰۰ · پیک اختصاصی نوین‌تک' },
  { id: 'tomorrow-morning', label: 'تحویل فردا صبح', desc: 'بازه ۱۰:۰۰ تا ۱۴:۰۰ · هماهنگی تلفنی قبل از ارسال' },
  { id: 'air-post', label: 'پست ویژه هوایی (شهرستان)', desc: 'تحویل ۲ تا ۳ روز کاری با بیمه کامل مرسوله' },
];

const PAYMENT_METHODS = [
  { id: 'online', label: 'پرداخت اینترنتی (کلیه کارت‌های عضو شتاب)', desc: 'درگاه امن شاپرک با تایید آنی سفارش' },
  { id: 'cod', label: 'پرداخت در محل هنگام تحویل', desc: 'ویژه شهر تهران با کارت‌خوان سیار' },
];

export function CheckoutScreen({
  items,
  promoCode,
  profile,
  onBackToCart,
  onCompleteOrder,
  onGoHome,
  onViewProfile,
}: CheckoutScreenProps) {
  const [receiverName, setReceiverName] = useState(profile.fullName);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);
  const [postalCode, setPostalCode] = useState(profile.postalCode);
  const [selectedSlot, setSelectedSlot] = useState(DELIVERY_SLOTS[0].id);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].id);
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedOrder, setSubmittedOrder] = useState<OrderRecord | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shippingFee = subtotal >= 20000000 || subtotal === 0 ? 0 : 250000;
  const discountAmount = promoCode.trim().toUpperCase() === 'NOVIN10' ? Math.round(subtotal * 0.05) : 0;
  const payableTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiverName.trim() || !phone.trim() || !address.trim()) {
      setFormError('لطفاً نام تحویل‌گیرنده، شماره تماس و نشانی کامل را وارد کنید.');
      return;
    }
    setFormError(null);

    const firstItem = items[0];
    const firstProduct = firstItem
      ? PRODUCTS.find((p) => p.id === firstItem.productId)
      : undefined;
    const summaryText = firstProduct
      ? totalCount > 1
        ? `${firstProduct.name} و ${toPersianDigits(totalCount - 1)} کالای دیگر`
        : `${firstProduct.name} — ${firstItem.colorName}`
      : 'سفارش دیجیتال نوین‌تک';

    const newOrder: OrderRecord = {
      id: `NT-${Math.floor(404000 + Math.random() * 5999)}`,
      date: 'امروز',
      status: paymentMethod === 'cod' ? 'ثبت شده · پرداخت در محل' : 'تایید شده · در حال آماده‌سازی',
      total: payableTotal,
      itemsSummary: summaryText,
      itemCount: totalCount || 1,
    };

    setSubmittedOrder(newOrder);
    onCompleteOrder(newOrder);
  };

  if (submittedOrder) {
    return (
      <div className="pb-16 max-w-2xl mx-auto">
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-8 sm:p-10 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-zinc-950">
              سفارش شما با موفقیت ثبت شد
            </h1>
            <p className="text-sm text-zinc-600">
              کد پیگیری سفارش:{' '}
              <span className="font-bold text-zinc-950 tabular-nums" dir="ltr">
                {submittedOrder.id}
              </span>
            </p>
          </div>

          <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-5 text-right space-y-2.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">تحویل‌گیرنده:</span>
              <span className="font-semibold text-zinc-900">{receiverName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">خلاصه سفارش:</span>
              <span className="font-semibold text-zinc-900">{submittedOrder.itemsSummary}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">مبلغ کل:</span>
              <span className="font-bold text-zinc-950 tabular-nums">
                {formatToman(submittedOrder.total)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">وضعیت فعلی:</span>
              <span className="font-semibold text-emerald-700">{submittedOrder.status}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={onViewProfile}
              className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors cursor-pointer"
            >
              مشاهده در پروفایل کاربری
            </button>
            <button
              type="button"
              onClick={onGoHome}
              className="flex-1 h-12 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-sm font-semibold transition-colors cursor-pointer"
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* 3-Step Checkout Stepper */}
      <div className="bg-white border border-zinc-200/90 rounded-2xl px-4 py-4 sm:px-8">
        <div className="flex items-center justify-between max-w-xl mx-auto">
          {/* Matches XPath: //span[contains(text(), 'سبد خرید')]/ancestor::div[contains(@class, 'flex-col')] */}
          <div
            role="button"
            tabIndex={0}
            onClick={onBackToCart}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onBackToCart();
              }
            }}
            className="flex flex-col items-center gap-1.5 cursor-pointer group min-w-[68px]"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-zinc-600 group-hover:text-zinc-950">
              سبد خرید
            </span>
          </div>

          <div className="flex-1 h-px bg-blue-600/40 mx-2" />

          <div className="flex flex-col items-center gap-1.5 min-w-[68px]">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-blue-600">اطلاعات ارسال</span>
          </div>

          <div className="flex-1 h-px bg-zinc-200 mx-2" />

          <div className="flex flex-col items-center gap-1.5 min-w-[68px]">
            <div className="w-9 h-9 rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-zinc-500">پرداخت و ثبت</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Main Form Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-7 space-y-5">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h1 className="text-lg font-bold text-zinc-950">مشخصات تحویل‌گیرنده و نشانی</h1>
            </div>

            {formError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="receiverName" className="block text-xs font-semibold text-zinc-700">
                  نام و نام خانوادگی
                </label>
                <input
                  id="receiverName"
                  type="text"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-blue-600 text-sm text-zinc-900 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="receiverPhone" className="block text-xs font-semibold text-zinc-700">
                  شماره موبایل هماهنگی
                </label>
                <input
                  id="receiverPhone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-blue-600 text-sm text-zinc-900 tabular-nums focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label htmlFor="receiverAddress" className="block text-xs font-semibold text-zinc-700">
                  نشانی کامل پستی
                </label>
                <textarea
                  id="receiverAddress"
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-blue-600 text-sm text-zinc-900 focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="postalCode" className="block text-xs font-semibold text-zinc-700">
                  کد پستی ۱۰ رقمی
                </label>
                <input
                  id="postalCode"
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-blue-600 text-sm text-zinc-900 tabular-nums focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Delivery Slot */}
          <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-zinc-950">زمان و روش ارسال</h2>
            </div>

            <div className="space-y-2.5">
              {DELIVERY_SLOTS.map((slot) => {
                const isSelected = selectedSlot === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`w-full text-right p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div>
                      <span className="block text-sm font-bold text-zinc-950">{slot.label}</span>
                      <span className="block text-xs text-zinc-500 mt-0.5">{slot.desc}</span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 whitespace-nowrap">
                      {shippingFee === 0 ? 'رایگان' : formatToman(shippingFee)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-zinc-950">شیوه پرداخت</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAYMENT_METHODS.map((method) => {
                const isSelected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`text-right p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <span className="block text-sm font-bold text-zinc-950">{method.label}</span>
                    <span className="block text-xs text-zinc-500 mt-1">{method.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary Column */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-6 space-y-5">
            <h2 className="text-base font-bold text-zinc-950">خلاصه نهایی سفارش</h2>

            <div className="space-y-3 border-b border-zinc-100 pb-4 max-h-60 overflow-y-auto">
              {items.map((item) => {
                const p = PRODUCTS.find((prod) => prod.id === item.productId);
                if (!p) return null;
                return (
                  <div key={item.key} className="flex items-center justify-between gap-3 text-xs">
                    <div className="min-w-0">
                      <span className="block font-semibold text-zinc-900 truncate">{p.name}</span>
                      <span className="text-zinc-500">
                        {item.colorName} · {toPersianDigits(item.quantity)} عدد
                      </span>
                    </div>
                    <span className="font-bold text-zinc-900 tabular-nums shrink-0">
                      {formatToman(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>جمع کل کالاها</span>
                <span className="font-semibold tabular-nums">{formatToman(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>تخفیف</span>
                  <span className="font-semibold tabular-nums">-{formatToman(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-600">
                <span>هزینه ارسال</span>
                <span className="font-semibold tabular-nums">
                  {shippingFee === 0 ? 'رایگان' : formatToman(shippingFee)}
                </span>
              </div>
              <div className="border-t border-zinc-100 pt-3 flex justify-between items-center">
                <span className="font-bold text-zinc-950">مبلغ قابل پرداخت</span>
                <span className="text-lg font-extrabold text-zinc-950 tabular-nums">
                  {formatToman(payableTotal)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500 bg-zinc-50 p-3 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>پرداخت امن با تضمین اصالت و مهلت تست ۷ روزه</span>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm sm:text-base font-bold transition-all cursor-pointer shadow-lg shadow-blue-600/15"
            >
              ثبت نهایی و پرداخت
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
