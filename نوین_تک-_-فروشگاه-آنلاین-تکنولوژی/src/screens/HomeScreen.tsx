import {
  ChevronLeft,
  Headphones,
  Laptop,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Truck,
  Watch,
  RotateCcw,
} from 'lucide-react';
import { ProductImage } from '../components/ProductImage';
import { formatToman, PRODUCTS, toPersianDigits } from '../data/catalog';
import { CategoryId, Product } from '../types/store';

interface HomeScreenProps {
  onOpenProduct: (productId: string) => void;
  onOpenCategory: (category: CategoryId) => void;
  onQuickAdd: (product: Product) => void;
}

const HOME_CATEGORIES: {
  id: Exclude<CategoryId, 'all'>;
  label: string;
  subtitle: string;
  Icon: typeof Smartphone;
}[] = [
  { id: 'mobile', label: 'گوشی موبایل', subtitle: 'آیفون ۱۶ و پرچمداران', Icon: Smartphone },
  { id: 'laptop', label: 'لپ‌تاپ حرفه‌ای', subtitle: 'سری مک‌بوک پرو M4', Icon: Laptop },
  { id: 'audio', label: 'هدفون و صوتی', subtitle: 'استودیویی و بی‌سیم', Icon: Headphones },
  { id: 'wearable', label: 'ساعت هوشمند', subtitle: 'اپل واچ اولترا ۲', Icon: Watch },
];

export function HomeScreen({
  onOpenProduct,
  onOpenCategory,
  onQuickAdd,
}: HomeScreenProps) {
  const heroProduct = PRODUCTS[0];
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="space-y-12 pb-28 md:pb-32">
      {/* Section 1: Flagship Storefront Hero */}
      <section className="rounded-3xl bg-zinc-950 text-white overflow-hidden border border-zinc-800/80 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span>نسل جدید پرچمدار اپل</span>
                <span aria-hidden="true">·</span>
                <span>تیتانیوم صحرایی</span>
                <span aria-hidden="true">·</span>
                <span>رجیستری رسمی</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-[1.25] text-balance text-white">
                iPhone 16 Pro Max
                <span className="block text-xl sm:text-2xl font-medium text-zinc-300 mt-2">
                  قدرت مطلق در قاب تیتانیوم
                </span>
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-md">
                نمایشگر ۶.۹ اینچی Super Retina XDR، تراشه A18 Pro و کنترل لمسی حرفه‌ای دوربین با ۱۸ ماه گارانتی معتبر و ارسال فوری.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 border-t border-zinc-800">
              <div>
                <span className="block text-xs text-zinc-400">شروع قیمت نسخه ۲۵۶ گیگابایت</span>
                <span className="text-lg sm:text-xl font-bold text-white tabular-nums">
                  {formatToman(heroProduct.basePrice)}
                </span>
              </div>

              {/* Matches XPath: //button[contains(., 'همین حالا بخرید')] */}
              <button
                type="button"
                onClick={() => onOpenProduct('iphone-16-pro-max')}
                className="sm:mr-auto inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span>همین حالا بخرید</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 relative min-h-[240px] sm:min-h-[340px] lg:min-h-[420px] bg-zinc-900">
            <ProductImage
              src={heroProduct.image}
              alt="iPhone 16 Pro Max Desert Titanium"
              fallbackLabel="iPhone 16 Pro Max"
              className="w-full h-full object-cover object-center lg:h-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent lg:bg-gradient-to-l lg:from-zinc-950/50 lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </section>

      {/* Section 2: Categories Row */}
      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
              دسته‌بندی محصولات
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              انتخاب سریع بر اساس نیاز و اکوسیستم دیجیتال شما
            </p>
          </div>

          {/* Matches XPath: //span[contains(text(), 'همه دستهها')]/ancestor::span */}
          <span
            role="button"
            tabIndex={0}
            onClick={() => onOpenCategory('all')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenCategory('all');
              }
            }}
            className="inline-flex items-center gap-1 min-h-[44px] px-2 text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg"
          >
            <span>همه دستهها</span>
            <ChevronLeft className="w-4 h-4" />
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {HOME_CATEGORIES.map(({ id, label, subtitle, Icon }) => (
            <a
              key={id}
              href={`#category-${id}`}
              onClick={(e) => {
                e.preventDefault();
                onOpenCategory(id);
              }}
              className="group bg-white border border-zinc-200/90 hover:border-zinc-300 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-zinc-900/5 min-h-[76px]"
            >
              <div className="w-11 h-11 rounded-xl bg-zinc-100 group-hover:bg-blue-50 text-zinc-800 group-hover:text-blue-600 flex items-center justify-center transition-colors shrink-0">
                <Icon className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div className="min-w-0">
                <span className="block text-sm font-semibold text-zinc-900 truncate">
                  {label}
                </span>
                <span className="block text-xs text-zinc-500 mt-0.5 truncate">
                  {subtitle}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Section 3: Featured Flagships Grid */}
      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
              محصولات برگزیده
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              منتخب جدیدترین سخت‌افزارهای ۲۰۲۵ با موجودی انبار تهران
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenCategory('all')}
            className="min-h-[44px] px-3 text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            مشاهده همه ({toPersianDigits(PRODUCTS.length)})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              role="button"
              tabIndex={0}
              onClick={() => onOpenProduct(product.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenProduct(product.id);
                }
              }}
              className="group bg-white border border-zinc-200/90 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-900/5 transition-all cursor-pointer text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <div className="aspect-[4/3] bg-zinc-100 overflow-hidden">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  fallbackLabel={product.name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="font-medium text-zinc-700">{product.brand}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.stockNote}</span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-950 leading-snug" dir="ltr">
                    <span className="block text-right">{product.name}</span>
                  </h3>

                  <p className="text-xs text-zinc-500 line-clamp-1">
                    {product.persianSubtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
                  <div>
                    {product.originalPrice && (
                      <span className="block text-[11px] text-zinc-400 line-through tabular-nums">
                        {formatToman(product.originalPrice)}
                      </span>
                    )}
                    <span className="text-sm sm:text-base font-bold text-zinc-950 tabular-nums">
                      {formatToman(product.basePrice)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(product);
                    }}
                    className="h-10 px-3.5 rounded-xl bg-zinc-900 hover:bg-blue-600 text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    افزودن سریع
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Store Guarantees Strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-zinc-200 pt-8">
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900">ضمانت اصالت و رجیستری</h3>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              کلیه کالاها با پلمپ کارخانه، کد رجیستری سامانه همتا و ۱۸ ماه گارانتی معتبر ارائه می‌شوند.
            </p>
          </div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-800 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900">ارسال اکسپرس ۳ ساعته</h3>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              تحویل فوری در شهر تهران و ارسال بیمه‌شده هوایی به سراسر کشور برای سفارش‌های بالای ۲۰ میلیون تومان.
            </p>
          </div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-800 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900">۷ روز مهلت تست فنی</h3>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              تضمین سلامت سخت‌افزاری و امکان تعویض کالا در صورت هرگونه مغایرت فنی بدون قید و شرط.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
