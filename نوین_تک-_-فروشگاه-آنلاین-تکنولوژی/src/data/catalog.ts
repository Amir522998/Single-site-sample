import { CategoryId, OrderRecord, Product, ScreenId, UserProfile } from '../types/store';

export const SCREEN_TITLES: Record<ScreenId, string> = {
  home: 'خانه - فروشگاه آنلاین تکنولوژی',
  'product-listing': 'لیست محصولات - فروشگاه تکنولوژی',
  cart: 'سبد خرید - فروشگاه تکنولوژی',
  checkout: 'تکمیل و ثبت سفارش',
  profile: 'پروفایل کاربر - حساب کاربری',
  'product-detail': 'جزئیات کالا - iPhone 16 Pro Max',
};

export const CATEGORIES: { id: CategoryId; label: string; count: number }[] = [
  { id: 'all', label: 'همه محصولات', count: 5 },
  { id: 'mobile', label: 'گوشی موبایل', count: 1 },
  { id: 'laptop', label: 'لپ‌تاپ حرفه‌ای', count: 1 },
  { id: 'audio', label: 'هدفون و صوتی', count: 1 },
  { id: 'wearable', label: 'ساعت هوشمند', count: 1 },
  { id: 'tablet', label: 'تبلت و آیپد', count: 1 },
];

export const PRODUCTS: Product[] = [
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    persianSubtitle: 'آیفون ۱۶ پرو مکس · تراشه A18 Pro و بدنه تیتانیوم',
    brand: 'Apple',
    category: 'mobile',
    categoryLabel: 'گوشی موبایل',
    basePrice: 89500000,
    originalPrice: 93000000,
    rating: '4.9',
    reviewCount: 248,
    inStock: true,
    stockNote: 'آماده ارسال فوری',
    image: '/src/assets/images/hero_iphone_16_pro_1795448098300.jpg',
    description:
      'پرچمدار جدید اپل با نمایشگر ۶.۹ اینچی Super Retina XDR، دکمه اختصاصی کنترل دوربین، فیلم‌برداری 4K Dolby Vision با نرخ ۱۲۰ فریم بر ثانیه و باتری با شارژدهی بی‌سابقه.',
    colors: [
      { id: 'desert', name: 'تیتانیوم صحرایی', hex: '#C2A88B' },
      { id: 'natural', name: 'تیتانیوم طبیعی', hex: '#9A9893' },
      { id: 'black', name: 'تیتانیوم مشکی', hex: '#232426' },
      { id: 'white', name: 'تیتانیوم سفید', hex: '#EBEAE6' },
    ],
    storageOptions: [
      { label: '256 گیگابایت', priceDelta: 0 },
      { label: '512 گیگابایت', priceDelta: 11500000 },
      { label: '1 ترابایت', priceDelta: 24000000 },
    ],
    specs: [
      { label: 'نمایشگر', value: '۶.۹ اینچ LTPO OLED · 120Hz' },
      { label: 'پردازنده', value: 'Apple A18 Pro (۳ نانومتری)' },
      { label: 'دوربین اصلی', value: '۴۸ مگاپیکسل + زوم اپتیکال ۵x' },
      { label: 'جنس بدنه', value: 'تیتانیوم گرید ۵ و Ceramic Shield' },
      { label: 'درگاه اتصال', value: 'USB-C 3 با سرعت ۱۰ گیگابیت' },
      { label: 'گارانتی', value: '۱۸ ماه گارانتی شرکتی معتبر + رجیستری' },
    ],
    featured: true,
  },
  {
    id: 'macbook-pro-m4',
    name: 'MacBook Pro 14 M4 Pro',
    persianSubtitle: 'مک‌بوک پرو ۱۴ اینچ · تراشه M4 Pro و نمایشگر Liquid Retina XDR',
    brand: 'Apple',
    category: 'laptop',
    categoryLabel: 'لپ‌تاپ حرفه‌ای',
    basePrice: 124000000,
    rating: '4.9',
    reviewCount: 112,
    inStock: true,
    stockNote: 'موجود در انبار',
    image: '/src/assets/images/product_macbook_pro_1795448097707.jpg',
    description:
      'قدرت بی‌رقیب برای تدوین، کدنویسی و مدل‌سازی سه‌بعدی با معماری M4 Pro، ۲۴ گیگابایت حافظه یکپارچه و تا ۲۲ ساعت شارژدهی باتری در بدنه آلومینیومی Space Black.',
    colors: [
      { id: 'space-black', name: 'مشکی فضایی', hex: '#1E1F22' },
      { id: 'silver', name: 'نقره‌ای', hex: '#D6D8DC' },
    ],
    storageOptions: [
      { label: '512 گیگابایت SSD', priceDelta: 0 },
      { label: '1 ترابایت SSD', priceDelta: 14000000 },
    ],
    specs: [
      { label: 'نمایشگر', value: '۱۴.۲ اینچ Liquid Retina XDR' },
      { label: 'پردازنده', value: 'Apple M4 Pro · ۱۲ هسته CPU' },
      { label: 'حافظه رم', value: '۲۴ گیگابایت Unified Memory' },
      { label: 'پورت‌ها', value: '۳× Thunderbolt 5 · HDMI · MagSafe 3' },
    ],
    featured: true,
  },
  {
    id: 'airpods-max-usbc',
    name: 'AirPods Max USB-C',
    persianSubtitle: 'هدفون بی‌سیم روگوشی · حذف نویز فعال و صدای فضایی',
    brand: 'Apple',
    category: 'audio',
    categoryLabel: 'هدفون و صوتی',
    basePrice: 31800000,
    originalPrice: 33500000,
    rating: '4.8',
    reviewCount: 184,
    inStock: true,
    stockNote: 'ارسال امروز',
    image: '/src/assets/images/product_airpods_max_1795448097802.jpg',
    description:
      'تجربه صدای استودیویی با درایورهای اختصاصی اپل، حذف نویز تطبیقی در سطح حرفه‌ای، بالشتک‌های مموری‌فوم تنفس‌پذیر و پورت شارژ USB-C.',
    colors: [
      { id: 'starlight', name: 'ستاره‌ای (Starlight)', hex: '#E3DDD3' },
      { id: 'midnight', name: 'سرمه‌ای تیره', hex: '#282E3A' },
      { id: 'blue', name: 'آبی تیتانیومی', hex: '#637A91' },
    ],
    storageOptions: [{ label: 'نسخه استاندارد USB-C', priceDelta: 0 }],
    specs: [
      { label: 'نوع اتصال', value: 'بلوتوث ۵.۳ + کابل USB-C' },
      { label: 'حذف نویز', value: 'Pro-level Active Noise Cancellation' },
      { label: 'عمر باتری', value: 'تا ۲۰ ساعت پخش مداوم با ANC' },
      { label: 'وزن', value: '۳۸۶ گرم · بدنه آلومینیوم آنودایز' },
    ],
    featured: true,
  },
  {
    id: 'watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    persianSubtitle: 'اپل واچ اولترا ۲ · بدنه تیتانیوم ۴۹ میلی‌متری',
    brand: 'Apple',
    category: 'wearable',
    categoryLabel: 'ساعت هوشمند',
    basePrice: 46500000,
    rating: '4.9',
    reviewCount: 95,
    inStock: true,
    stockNote: 'موجود در انبار',
    image: '/src/assets/images/product_watch_ultra_1795448097993.jpg',
    description:
      'ساعت هوشمند ماجراجویی و ورزش حرفه‌ای با روشنایی ۳۰۰۰ نیت، GPS دوفرکانسه دقیق، مقاومت در برابر آب تا عمق ۱۰۰ متر و بند بافته Alpine.',
    colors: [
      { id: 'natural-ti', name: 'تیتانیوم طبیعی · بند آلپاین', hex: '#B4ACA1' },
      { id: 'black-ti', name: 'تیتانیوم مشکی · بند اوشن', hex: '#1F2022' },
    ],
    storageOptions: [{ label: '۴۹ میلی‌متر GPS + Cellular', priceDelta: 0 }],
    specs: [
      { label: 'سایز قاب', value: '۴۹ میلی‌متر تیتانیوم' },
      { label: 'روشنایی صفحه', value: '۳۰۰۰ نیت Retina همیشه روشن' },
      { label: 'باتری', value: 'تا ۳۶ ساعت (۷۲ ساعت در حالت کم‌مصرف)' },
      { label: 'مقاومت', value: 'استاندارد نظامی MIL-STD 810H · 100m' },
    ],
  },
  {
    id: 'ipad-pro-m4',
    name: 'iPad Pro 13 M4',
    persianSubtitle: 'آیپد پرو ۱۳ اینچ · نمایشگر Tandem OLED و ضخامت ۵.۱ میلی‌متر',
    brand: 'Apple',
    category: 'tablet',
    categoryLabel: 'تبلت و آیپد',
    basePrice: 74200000,
    rating: '4.8',
    reviewCount: 67,
    inStock: true,
    stockNote: 'آماده ارسال فوری',
    image: '/src/assets/images/product_ipad_pro_1795448097864.jpg',
    description:
      'باریک‌ترین محصول تاریخ اپل با نمایشگر بی‌نظیر Ultra Retina XDR Tandem OLED و قدرت پردازش تراشه M4 برای طراحان، معماران و تولیدکنندگان محتوا.',
    colors: [
      { id: 'space-black', name: 'مشکی فضایی', hex: '#1D1E21' },
      { id: 'silver', name: 'نقره‌ای', hex: '#D8DADF' },
    ],
    storageOptions: [
      { label: '256 گیگابایت', priceDelta: 0 },
      { label: '512 گیگابایت', priceDelta: 10500000 },
    ],
    specs: [
      { label: 'نمایشگر', value: '۱۳ اینچ Tandem OLED · ProMotion' },
      { label: 'تراشه', value: 'Apple M4 با موتور عصبی ۱۶ هسته‌ای' },
      { label: 'ضخامت', value: '۵.۱ میلی‌متر · وزن ۵۷۹ گرم' },
      { label: 'پشتیبانی قلم', value: 'سازگار با Apple Pencil Pro' },
    ],
  },
];

export const INITIAL_PROFILE: UserProfile = {
  fullName: 'امیرحسین رضایی',
  email: 'amir.rezaei@novintech.ir',
  phone: '۰۹۱۲۳۴۵۶۷۸۹',
  city: 'تهران',
  address: 'تهران، خیابان ولیعصر، بالاتر از پارک ساعی، پلاک ۲۴۸، واحد ۴',
  postalCode: '۱۵۱۱۷۴۳۸۱۱',
  memberSince: 'عضویت از دی ۱۴۰۲',
};

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'NT-403892',
    date: '۲۸ آبان ۱۴۰۳',
    status: 'تحویل داده شده',
    total: 31800000,
    itemsSummary: 'AirPods Max USB-C — ستاره‌ای',
    itemCount: 1,
  },
  {
    id: 'NT-403514',
    date: '۱۱ مهر ۱۴۰۳',
    status: 'تکمیل شده',
    total: 46500000,
    itemsSummary: 'Apple Watch Ultra 2 — تیتانیوم طبیعی',
    itemCount: 1,
  },
];

export function formatToman(amount: number): string {
  return `${new Intl.NumberFormat('fa-IR').format(amount)} تومان`;
}

export function toPersianDigits(val: number | string): string {
  return String(val).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
}
