import { ArrowRight, Search, ShoppingBag } from 'lucide-react';
import { ScreenId, TransitionType } from '../types/store';
import { toPersianDigits } from '../data/catalog';

interface HeaderProps {
  activeScreen: ScreenId;
  screenHeading: string;
  cartCount: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNavigate: (target: ScreenId, transition: TransitionType) => void;
  onBack: () => void;
}

export function Header({
  activeScreen,
  screenHeading,
  cartCount,
  searchQuery,
  onSearchChange,
  onNavigate,
  onBack,
}: HeaderProps) {
  const showBackButton = activeScreen === 'checkout' || activeScreen === 'product-detail';
  const showSearch = activeScreen === 'home' || activeScreen === 'product-listing';

  return (
    <header className="sticky top-0 z-30 h-14 sm:h-16 bg-white/95 backdrop-blur-md border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sm:gap-8">
        {/* Right Zone (Start in RTL): Back Button or Brand Wordmark */}
        <div className="flex items-center gap-3 min-w-0">
          {showBackButton ? (
            <button
              type="button"
              aria-label="بازگشت"
              onClick={onBack}
              className="w-11 h-11 -mr-2 rounded-full flex items-center justify-center text-zinc-800 hover:bg-zinc-100 active:scale-95 transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('home', 'none')}
              className="text-lg sm:text-xl font-extrabold tracking-tight text-zinc-950 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md px-1"
            >
              نوین‌تک
            </button>
          )}

          {showBackButton && (
            <span className="text-sm sm:text-base font-semibold text-zinc-900 truncate">
              {screenHeading}
            </span>
          )}
        </div>

        {/* Center Zone: Functional Product Search on Home & Catalog */}
        {showSearch ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (activeScreen !== 'product-listing') {
                onNavigate('product-listing', 'push');
              }
            }}
            className="hidden md:flex flex-1 max-w-md items-center relative"
          >
            <Search className="w-4 h-4 text-zinc-400 absolute right-3.5 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (activeScreen === 'home' && e.target.value.trim().length > 0) {
                  onNavigate('product-listing', 'push');
                }
              }}
              placeholder="جستجو در آیفون، مک‌بوک، ساعت هوشمند..."
              className="w-full h-10 pr-10 pl-4 rounded-xl bg-zinc-100/90 border border-transparent focus:border-blue-600 focus:bg-white text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:outline-none"
            />
          </form>
        ) : (
          <div className="hidden md:block flex-1" />
        )}

        {/* Left Zone (End in RTL): Quick Cart Indicator + Profile Avatar */}
        <div className="flex items-center gap-2.5 shrink-0">
          {activeScreen !== 'cart' && (
            <button
              type="button"
              aria-label="مشاهده سبد خرید"
              onClick={() => onNavigate('cart', 'push')}
              className="relative w-11 h-11 rounded-full flex items-center justify-center text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 left-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {toPersianDigits(cartCount)}
                </span>
              )}
            </button>
          )}

          {/* Matches XPath: //header//span[contains(text(), 'person')]/ancestor::div[contains(@class, 'rounded-full')] */}
          <div
            role="button"
            tabIndex={0}
            aria-label="حساب کاربری"
            onClick={() => onNavigate('profile', activeScreen === 'profile' ? 'none' : 'push')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate('profile', activeScreen === 'profile' ? 'none' : 'push');
              }
            }}
            className={`w-11 h-11 rounded-full flex items-center justify-center border transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
              activeScreen === 'profile'
                ? 'bg-zinc-900 text-white border-zinc-900'
                : 'bg-zinc-100 text-zinc-800 border-zinc-200 hover:bg-zinc-200/80'
            }`}
          >
            <span className="material-symbols-outlined text-[21px] leading-none">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
