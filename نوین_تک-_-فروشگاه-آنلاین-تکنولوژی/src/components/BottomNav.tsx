import { Home, LayoutGrid, ShoppingBag, User } from 'lucide-react';
import { ScreenId, TransitionType } from '../types/store';
import { toPersianDigits } from '../data/catalog';

interface BottomNavProps {
  activeScreen: ScreenId;
  cartCount: number;
  onNavigate: (target: ScreenId, transition: TransitionType) => void;
}

const NAV_ITEMS: {
  path: 'home' | 'product-listing' | 'cart' | 'profile';
  label: string;
  Icon: typeof Home;
}[] = [
  { path: 'home', label: 'خانه', Icon: Home },
  { path: 'product-listing', label: 'محصولات', Icon: LayoutGrid },
  { path: 'cart', label: 'سبد خرید', Icon: ShoppingBag },
  { path: 'profile', label: 'پروفایل', Icon: User },
];

export function BottomNav({ activeScreen, cartCount, onNavigate }: BottomNavProps) {
  return (
    <nav
      aria-label="منوی اصلی"
      className="fixed bottom-0 inset-x-0 z-40 h-[60px] bg-white/95 backdrop-blur-md border-t border-zinc-200/90 md:bottom-5 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[440px] md:h-16 md:rounded-2xl md:border md:border-zinc-200 md:shadow-xl md:shadow-zinc-900/10"
    >
      <div className="grid grid-cols-4 h-full items-center px-2">
        {NAV_ITEMS.map(({ path, label, Icon }) => {
          const isActive = activeScreen === path;
          return (
            <a
              key={path}
              href={`#${path}`}
              data-path={path}
              aria-current={isActive ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(path, 'none');
              }}
              className={`relative flex flex-col items-center justify-center min-h-[44px] h-full rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-zinc-500 hover:text-zinc-900 font-medium'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.3]' : 'stroke-[1.8]'}`} />
                {path === 'cart' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -left-2.5 min-w-[16px] h-4 px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                    {toPersianDigits(cartCount)}
                  </span>
                )}
              </div>
              <span className="text-[11px] leading-none mt-1 tracking-tight whitespace-nowrap shrink-0">
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
