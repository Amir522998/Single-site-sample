import { useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { Check } from 'lucide-react';
import { BottomNav } from './components/BottomNav';
import { Header } from './components/Header';
import {
  INITIAL_ORDERS,
  INITIAL_PROFILE,
  PRODUCTS,
  SCREEN_TITLES,
} from './data/catalog';
import { CartScreen } from './screens/CartScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { ProductListingScreen } from './screens/ProductListingScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import {
  CartItem,
  CategoryId,
  OrderRecord,
  Product,
  ScreenId,
  TransitionType,
  UserProfile,
} from './types/store';

const INITIAL_CART: CartItem[] = [
  {
    key: 'iphone-16-pro-max__تیتانیوم صحرایی__256 گیگابایت',
    productId: 'iphone-16-pro-max',
    colorName: 'تیتانیوم صحرایی',
    colorHex: '#C2A88B',
    storageLabel: '256 گیگابایت',
    unitPrice: 89500000,
    quantity: 1,
  },
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [transitionType, setTransitionType] = useState<TransitionType>('none');
  const [activeProductId, setActiveProductId] = useState<string>('iphone-16-pro-max');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('novintech_cart_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return INITIAL_CART;
  });
  const [promoCode, setPromoCode] = useState('');
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [toast, setToast] = useState<string | null>(null);

  const activeProduct =
    PRODUCTS.find((p) => p.id === activeProductId) ?? PRODUCTS[0];

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    try {
      localStorage.setItem('novintech_cart_v1', JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    if (activeScreen === 'product-detail') {
      document.title = `جزئیات کالا - ${activeProduct.name}`;
    } else {
      document.title = SCREEN_TITLES[activeScreen];
    }
  }, [activeScreen, activeProduct.name]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => {
      setToast((current) => (current === message ? null : current));
    }, 2600);
  };

  const navigate = (target: ScreenId, transition: TransitionType) => {
    setTransitionType(transition);
    setActiveScreen(target);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleOpenProduct = (productId: string) => {
    setActiveProductId(productId);
    navigate('product-detail', 'push');
  };

  const handleOpenCategory = (category: CategoryId) => {
    setSelectedCategory(category);
    navigate('product-listing', 'push');
  };

  const addItemToCart = (
    product: Product,
    colorName: string,
    colorHex: string,
    storageLabel: string,
    unitPrice: number,
    navigateToCart: boolean
  ) => {
    const key = `${product.id}__${colorName}__${storageLabel}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          colorName,
          colorHex,
          storageLabel,
          unitPrice,
          quantity: 1,
        },
      ];
    });

    if (navigateToCart) {
      navigate('cart', 'push');
    } else {
      showToast(`${product.name} به سبد خرید اضافه شد`);
    }
  };

  const handleQuickAdd = (product: Product) => {
    const defaultColor = product.colors[0];
    const defaultStorage = product.storageOptions[0];
    addItemToCart(
      product,
      defaultColor.name,
      defaultColor.hex,
      defaultStorage.label,
      product.basePrice + defaultStorage.priceDelta,
      false
    );
  };

  const handleUpdateQuantity = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const handleCompleteOrder = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setPromoCode('');
  };

  const handleBack = () => {
    if (activeScreen === 'checkout') {
      navigate('cart', 'push_back');
    } else if (activeScreen === 'product-detail') {
      navigate('product-listing', 'push_back');
    } else {
      navigate('home', 'push_back');
    }
  };

  const handleLogout = () => {
    navigate('home', 'push_back');
    showToast('از حساب کاربری خارج شدید');
  };

  const showBottomNav =
    activeScreen === 'home' ||
    activeScreen === 'product-listing' ||
    activeScreen === 'cart' ||
    activeScreen === 'profile';

  const screenHeading =
    activeScreen === 'product-detail'
      ? `جزئیات کالا - ${activeProduct.name}`
      : SCREEN_TITLES[activeScreen];

  const getMotionProps = () => {
    if (transitionType === 'none') {
      return {
        initial: { opacity: 1, x: 0 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 1, x: 0 },
        transition: { duration: 0 },
      };
    }
    if (transitionType === 'push') {
      return {
        initial: { opacity: 0, x: -24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 16 },
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
      };
    }
    return {
      initial: { opacity: 0, x: 24 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -16 },
      transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
    };
  };

  const motionProps = getMotionProps();

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex flex-col">
        <Header
          activeScreen={activeScreen}
          screenHeading={screenHeading}
          cartCount={totalCartCount}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNavigate={navigate}
          onBack={handleBack}
        />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={motionProps.initial}
              animate={motionProps.animate}
              exit={motionProps.exit}
              transition={motionProps.transition}
            >
              {activeScreen === 'home' && (
                <HomeScreen
                  onOpenProduct={handleOpenProduct}
                  onOpenCategory={handleOpenCategory}
                  onQuickAdd={handleQuickAdd}
                />
              )}

              {activeScreen === 'product-listing' && (
                <ProductListingScreen
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onOpenProduct={handleOpenProduct}
                  onQuickAdd={handleQuickAdd}
                />
              )}

              {activeScreen === 'product-detail' && (
                <ProductDetailScreen
                  product={activeProduct}
                  onAddToCart={(product, colorName, colorHex, storageLabel, unitPrice) =>
                    addItemToCart(
                      product,
                      colorName,
                      colorHex,
                      storageLabel,
                      unitPrice,
                      true
                    )
                  }
                />
              )}

              {activeScreen === 'cart' && (
                <CartScreen
                  items={cart}
                  promoCode={promoCode}
                  onApplyPromo={setPromoCode}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onBrowseProducts={() => navigate('product-listing', 'push')}
                  onProceedToCheckout={() => navigate('checkout', 'push')}
                />
              )}

              {activeScreen === 'checkout' && (
                <CheckoutScreen
                  items={cart}
                  promoCode={promoCode}
                  profile={profile}
                  onBackToCart={() => navigate('cart', 'push_back')}
                  onCompleteOrder={handleCompleteOrder}
                  onGoHome={() => navigate('home', 'push_back')}
                  onViewProfile={() => navigate('profile', 'push')}
                />
              )}

              {activeScreen === 'profile' && (
                <ProfileScreen
                  profile={profile}
                  orders={orders}
                  onUpdateProfile={(next) => {
                    setProfile(next);
                    showToast('اطلاعات کاربری ذخیره شد');
                  }}
                  onOpenProduct={handleOpenProduct}
                  onLogout={handleLogout}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {showBottomNav && (
          <BottomNav
            activeScreen={activeScreen}
            cartCount={totalCartCount}
            onNavigate={navigate}
          />
        )}

        {/* Transient Feedback Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.18 }}
              className="fixed bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-50 bg-zinc-950 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs sm:text-sm font-medium whitespace-nowrap"
            >
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
