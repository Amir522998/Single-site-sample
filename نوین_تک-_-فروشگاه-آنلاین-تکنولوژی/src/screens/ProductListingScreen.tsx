import { useMemo, useState } from 'react';
import { ArrowUpDown, Search, Star } from 'lucide-react';
import { ProductImage } from '../components/ProductImage';
import { CATEGORIES, formatToman, PRODUCTS, toPersianDigits } from '../data/catalog';
import { CategoryId, Product } from '../types/store';

interface ProductListingScreenProps {
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onOpenProduct: (productId: string) => void;
  onQuickAdd: (product: Product) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export function ProductListingScreen({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenProduct,
  onQuickAdd,
}: ProductListingScreenProps) {
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.persianSubtitle.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.basePrice - b.basePrice);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.basePrice - a.basePrice);
    }
    if (sortBy === 'rating') {
      return [...list].sort((a, b) => Number(b.rating) - Number(a.rating));
    }
    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-6 pb-28 md:pb-32">
      {/* Page Title & Mobile Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
            فهرست محصولات تکنولوژی
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 tabular-nums">
            نمایش {toPersianDigits(filteredProducts.length)} کالا از مجموعه تخصصی نوین‌تک
          </p>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden relative">
          <Search className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="جستجوی نام محصول یا مدل..."
            className="w-full h-11 pr-10 pl-4 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>

      {/* Category Filter Tabs & Sort Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`h-10 px-3.5 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-300'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <ArrowUpDown className="w-4 h-4 text-zinc-500" />
          <label htmlFor="sortSelect" className="text-xs text-zinc-500 whitespace-nowrap">
            مرتب‌سازی:
          </label>
          <select
            id="sortSelect"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="h-10 px-3 rounded-xl bg-white border border-zinc-200 text-xs sm:text-sm font-medium text-zinc-800 focus:outline-none focus:border-blue-600 cursor-pointer"
          >
            <option value="featured">پیشنهاد نوین‌تک</option>
            <option value="price-asc">ارزان‌ترین</option>
            <option value="price-desc">گران‌ترین</option>
            <option value="rating">بیشترین امتیاز</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-10 text-center space-y-3">
          <p className="text-base font-semibold text-zinc-900">
            محصولی مطابق جستجوی شما یافت نشد
          </p>
          <p className="text-sm text-zinc-500">
            فیلتر دسته‌بندی را تغییر دهید یا عبارت دیگری را جستجو کنید.
          </p>
          <button
            type="button"
            onClick={() => {
              onSelectCategory('all');
              onSearchChange('');
            }}
            className="h-11 px-5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
          >
            نمایش همه محصولات
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            /* Matches XPath: //article[.//h2[contains(text(), 'iPhone 16 Pro Max')]] */
            <article
              key={product.id}
              onClick={() => onOpenProduct(product.id)}
              className="group bg-white border border-zinc-200/90 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-900/5 transition-all cursor-pointer"
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
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-zinc-700">{product.brand}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.categoryLabel}</span>
                    </div>
                    <div className="flex items-center gap-1 tabular-nums text-zinc-700 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{toPersianDigits(product.rating)}</span>
                    </div>
                  </div>

                  <h2 className="text-base font-bold text-zinc-950 leading-snug">
                    {product.name}
                  </h2>

                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {product.persianSubtitle}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-zinc-100">
                  <div className="flex items-center gap-1.5">
                    {product.colors.map((c) => (
                      <span
                        key={c.id}
                        title={c.name}
                        className="w-3.5 h-3.5 rounded-full border border-zinc-300 inline-block"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                    <span className="text-[11px] text-zinc-400 mr-1">
                      {toPersianDigits(product.colors.length)} رنگ موجود
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
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
                      className="h-10 px-3.5 rounded-xl bg-zinc-100 hover:bg-blue-600 text-zinc-900 hover:text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      افزودن به سبد
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
