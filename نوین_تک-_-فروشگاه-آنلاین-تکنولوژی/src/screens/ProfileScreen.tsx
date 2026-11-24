import { useState } from 'react';
import {
  ChevronLeft,
  Edit3,
  LogOut,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  User,
} from 'lucide-react';
import { ProductImage } from '../components/ProductImage';
import { formatToman, PRODUCTS, toPersianDigits } from '../data/catalog';
import { OrderRecord, UserProfile } from '../types/store';

interface ProfileScreenProps {
  profile: UserProfile;
  orders: OrderRecord[];
  onUpdateProfile: (next: UserProfile) => void;
  onOpenProduct: (productId: string) => void;
  onLogout: () => void;
}

export function ProfileScreen({
  profile,
  orders,
  onUpdateProfile,
  onOpenProduct,
  onLogout,
}: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(profile.fullName);
  const [draftPhone, setDraftPhone] = useState(profile.phone);
  const [draftAddress, setDraftAddress] = useState(profile.address);

  const flagship = PRODUCTS[0];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      fullName: draftName.trim() || profile.fullName,
      phone: draftPhone.trim() || profile.phone,
      address: draftAddress.trim() || profile.address,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 pb-28 md:pb-32">
      {/* User Identity Banner */}
      <section className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shrink-0">
            <User className="w-7 h-7 stroke-[1.8]" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-950">
              {profile.fullName}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
              <span className="tabular-nums">{profile.phone}</span>
              <span aria-hidden="true">·</span>
              <span>{profile.memberSince}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-medium">حساب تاییدشده</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing((prev) => !prev)}
          className="h-11 px-4 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-xs sm:text-sm font-semibold text-zinc-800 inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? 'انصراف از ویرایش' : 'ویرایش اطلاعات'}</span>
        </button>
      </section>

      {isEditing && (
        <form
          onSubmit={handleSaveProfile}
          className="bg-white border border-zinc-200/90 rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-base font-bold text-zinc-950">به‌روزرسانی اطلاعات حساب</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="profileName" className="block text-xs font-semibold text-zinc-700">
                نام و نام خانوادگی
              </label>
              <input
                id="profileName"
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="profilePhone" className="block text-xs font-semibold text-zinc-700">
                شماره موبایل
              </label>
              <input
                id="profilePhone"
                type="tel"
                value={draftPhone}
                onChange={(e) => setDraftPhone(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 text-sm text-zinc-900 tabular-nums focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <label htmlFor="profileAddress" className="block text-xs font-semibold text-zinc-700">
                نشانی پیش‌فرض ارسال
              </label>
              <input
                id="profileAddress"
                type="text"
                value={draftAddress}
                onChange={(e) => setDraftAddress(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              ذخیره تغییرات
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Saved/Viewed Items & Orders */}
        <div className="lg:col-span-8 space-y-6">
          {/* Saved / Flagship Shortcut */}
          <section className="bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-zinc-950">
                علاقه‌مندی‌ها و بازدیدهای اخیر
              </h2>
              <span className="text-xs text-zinc-500">۱ کالا</span>
            </div>

            {/* Matches XPath: //span[contains(text(), 'آیفون ۱۶ پرو')]/ancestor::div[contains(@class, 'rounded-xl')] */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => onOpenProduct('iphone-16-pro-max')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenProduct('iphone-16-pro-max');
                }
              }}
              className="rounded-xl border border-zinc-200 bg-zinc-50/70 hover:bg-white p-3.5 flex items-center gap-4 hover:border-zinc-300 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                <ProductImage
                  src={flagship.image}
                  alt={flagship.name}
                  fallbackLabel={flagship.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-sm font-bold text-zinc-950 truncate">
                  آیفون ۱۶ پرو مکس — ۲۵۶ گیگابایت تیتانیوم صحرایی
                </span>
                <p className="text-xs text-zinc-500 mt-1 tabular-nums">
                  {formatToman(flagship.basePrice)} · آماده ارسال فوری
                </p>
              </div>
              <ChevronLeft className="w-5 h-5 text-zinc-400 shrink-0" />
            </div>
          </section>

          {/* Order History */}
          <section className="bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-zinc-950">
                تاریخچه سفارش‌های من
              </h2>
              <span className="text-xs text-zinc-500 tabular-nums">
                {toPersianDigits(orders.length)} سفارش
              </span>
            </div>

            <div className="divide-y divide-zinc-100">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="py-4 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <span className="font-bold text-zinc-900 tabular-nums" dir="ltr">
                          {order.id}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{order.date}</span>
                      </div>
                      <p className="text-sm font-semibold text-zinc-900 mt-1">
                        {order.itemsSummary}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1">
                    <span className="text-sm font-bold text-zinc-950 tabular-nums">
                      {formatToman(order.total)}
                    </span>
                    <span className="text-xs font-medium text-emerald-700">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Account Details & Sign-Out */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-6 space-y-4">
            <h2 className="text-base font-bold text-zinc-950">نشانی و اطلاعات تماس</h2>
            <div className="space-y-3 text-xs sm:text-sm text-zinc-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{profile.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                <span className="tabular-nums">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>احراز هویت دو مرحله‌ای فعال است</span>
              </div>
            </div>
          </div>

          {/* Matches XPath: //button[contains(., 'خروج از حساب کاربری')] */}
          <button
            type="button"
            onClick={onLogout}
            className="w-full h-12 rounded-2xl border border-red-200 bg-white hover:bg-red-50 text-red-600 text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <LogOut className="w-4 h-4" />
            <span>خروج از حساب کاربری</span>
          </button>
        </div>
      </div>
    </div>
  );
}
