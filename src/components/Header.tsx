import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  ShoppingBag, 
  Heart, 
  TrendingUp, 
  Search, 
  Menu, 
  X, 
  RefreshCw, 
  Sparkles,
  Calculator,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useMarket } from '../context/MarketContext';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onOpenCalculator: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, onOpenCalculator }) => {
  const { isDark, toggleTheme } = useTheme();
  const { rates, lastUpdated, refreshRates, isLiveActive } = useMarket();
  const { totalItems, totalAmount, setIsCartOpen, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');

  // Primary ticker items: gold 18k, emami coin, silver, dollar, ounce
  const tickerItems = rates.filter((r) =>
    ['gold_18k', 'coin_emami', 'silver_999', 'gold_ounce', 'curr_usd', 'curr_usdt'].includes(r.id)
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearchQuery.trim()) {
      setCurrentView(`shop?q=${encodeURIComponent(headerSearchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-300">
      {/* 1. TOP LIVE TICKER (نوار نرخ لحظه‌ای ارز، طلا و نقره) */}
      <div className={`w-full text-xs border-b transition-colors ${
        isDark 
          ? 'bg-[#121117] text-stone-300 border-amber-950/40' 
          : 'bg-[#F4ECE1] text-stone-800 border-amber-200/60'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between gap-4">
          
          {/* Right Status (RTL start): Live Badge & Last Updated */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isLiveActive ? 'bg-emerald-400' : 'bg-amber-400'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                isLiveActive ? 'bg-emerald-500' : 'bg-amber-500'
              }`}></span>
            </span>
            <span className="font-medium text-[11px] hidden sm:inline text-amber-700 dark:text-amber-400">
              نرخ زنده اتحادیه:
            </span>
            <button
              onClick={refreshRates}
              title="به‌روزرسانی دستی نرخ‌ها"
              className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition text-stone-500 hover:text-amber-600 dark:hover:text-amber-300"
            >
              <RefreshCw className="w-3 h-3 hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>

          {/* Marquee / Scrollable Live Rates Bar */}
          <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-6 py-0.5 whitespace-nowrap text-[11px] font-sans">
            {tickerItems.map((item) => {
              const isPositive = item.changePercent >= 0;
              return (
                <div 
                  key={item.id} 
                  onClick={() => setCurrentView('rates')}
                  className="inline-flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition group shrink-0"
                >
                  <span className="text-stone-500 dark:text-stone-400 group-hover:text-amber-600 dark:group-hover:text-amber-300">
                    {item.title}:
                  </span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 font-sans">
                    {item.price.toLocaleString('fa-IR')}
                    <span className="text-[10px] text-stone-400 mr-0.5">{item.unit.includes('دلار') ? '$' : 'ت'}</span>
                  </span>
                  <span className={`inline-flex items-center text-[10px] font-medium px-1 py-0.2 rounded ${
                    isPositive 
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40' 
                      : 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40'
                  }`}>
                    {isPositive ? '+' : ''}{item.changePercent.toLocaleString('fa-IR')}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* Left Action: Quick link to full market rates & Smart Calculator */}
          <div className="flex items-center gap-3 shrink-0 text-[11px]">
            <button
              onClick={onOpenCalculator}
              className="hidden md:inline-flex items-center gap-1 text-amber-700 dark:text-amber-300 hover:underline font-medium"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>محاسبه‌گر طلا</span>
            </button>
            <button
              onClick={() => setCurrentView('rates')}
              className="inline-flex items-center gap-1 text-stone-600 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-300 transition"
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">تابلو کامل نرخ‌ها</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. MAIN BRAND HEADER & NAV */}
      <div className={`w-full backdrop-blur-md transition-colors border-b ${
        isDark 
          ? 'bg-[#0E0D12]/95 border-stone-800/80 text-stone-100' 
          : 'bg-[#FAF7F2]/95 border-stone-200/80 text-stone-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Right: Brand Emblem & Monogram (Inspired by WS crest & Jewell) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 text-right group text-inherit focus:outline-none"
            >
              <div className="w-12 h-12 rounded-full border-2 border-amber-500/60 p-0.5 flex items-center justify-center bg-gradient-to-br from-amber-200/30 via-amber-500/20 to-amber-700/30 group-hover:border-amber-400 transition-all duration-300 shadow-sm">
                <div className="w-full h-full rounded-full border border-amber-400/40 flex items-center justify-center bg-amber-500/10">
                  <span className="font-serif-luxury text-xl font-bold tracking-tighter text-amber-600 dark:text-amber-400">
                    ZN
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-2xl font-bold tracking-tight text-stone-900 dark:text-amber-300">
                  زرنشان
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-serif text-amber-700/80 dark:text-amber-400/80">
                  Haute Joaillerie
                </span>
              </div>
            </button>
          </div>

          {/* Center: Desktop Navigation Bar */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium">
            <button
              onClick={() => setCurrentView('home')}
              className={`transition relative py-1 ${
                currentView === 'home'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-300'
              }`}
            >
              صفحه نخست
              {currentView === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setCurrentView('shop')}
              className={`transition relative py-1 flex items-center gap-1 ${
                currentView.startsWith('shop')
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-300'
              }`}
            >
              ویترین جواهرات
              {currentView.startsWith('shop') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setCurrentView('rates')}
              className={`transition relative py-1 flex items-center gap-1.5 ${
                currentView === 'rates'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-300'
              }`}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              تابلو زنده طلا و نقره
              {currentView === 'rates' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
              )}
            </button>

            <button
              onClick={onOpenCalculator}
              className="text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-300 transition py-1 flex items-center gap-1"
            >
              <Calculator className="w-4 h-4 text-amber-500" />
              محاسبه‌گر شفاف قیمت
            </button>

            <button
              onClick={() => setCurrentView('about')}
              className={`transition relative py-1 ${
                currentView === 'about'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-300'
              }`}
            >
              اصالت و شناسنامه
              {currentView === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
              )}
            </button>
          </nav>

          {/* Left: Utilities (Search, Theme Toggle, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Search */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={headerSearchQuery}
                    onChange={(e) => setHeaderSearchQuery(e.target.value)}
                    placeholder="جستجوی انگشتر، برلیان، شمش..."
                    autoFocus
                    className={`w-48 sm:w-64 px-3 py-1.5 text-xs rounded-full border focus:outline-none transition ${
                      isDark
                        ? 'bg-stone-900 border-amber-900/60 text-white placeholder-stone-500 focus:border-amber-500'
                        : 'bg-white border-amber-300 text-stone-900 placeholder-stone-400 focus:border-amber-600'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="p-1.5 text-stone-400 hover:text-stone-600 mr-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition"
                  title="جستجو در جواهرات"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Bespoke Dark / Light Mode Switch */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                isDark
                  ? 'bg-amber-950/40 text-amber-300 hover:bg-amber-900/50 border border-amber-800/40'
                  : 'bg-amber-100/60 text-amber-800 hover:bg-amber-200/70 border border-amber-300/50'
              }`}
              title={isDark ? 'تغییر به قالب روشن (روز زرین)' : 'تغییر به قالب تاریک (شب مخملین)'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-300 transition-transform rotate-0 hover:rotate-90" />
              ) : (
                <Moon className="w-5 h-5 text-amber-800 transition-transform -rotate-12 hover:rotate-0" />
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setCurrentView('shop?filter=wishlist')}
              className="p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-rose-500 relative transition"
              title="علاقه‌مندی‌ها"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-1 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length.toLocaleString('fa-IR')}
                </span>
              )}
            </button>

            {/* Cart Button with Total & Count */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 shadow-sm ${
                isDark
                  ? 'bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-stone-950 border-amber-400 font-medium'
                  : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white border-amber-500 font-medium'
              }`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-stone-950 text-amber-300 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-amber-400">
                    {totalItems.toLocaleString('fa-IR')}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-xs font-semibold">
                {totalAmount > 0 ? `${totalAmount.toLocaleString('fa-IR')} ت` : 'سبد خرید'}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* 3. MOBILE SLIDE-DOWN DRAWER MENU */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b p-4 space-y-3 transition-colors ${
          isDark ? 'bg-[#15141B] border-stone-800 text-stone-200' : 'bg-[#FAF6F0] border-stone-200 text-stone-900'
        }`}>
          <div className="flex flex-col gap-2 font-medium text-sm">
            <button
              onClick={() => {
                setCurrentView('home');
                setMobileMenuOpen(false);
              }}
              className="text-right py-2 px-3 rounded hover:bg-amber-500/10 transition"
            >
              صفحه نخست
            </button>
            <button
              onClick={() => {
                setCurrentView('shop');
                setMobileMenuOpen(false);
              }}
              className="text-right py-2 px-3 rounded hover:bg-amber-500/10 transition"
            >
              ویترین محصولات و فیلترهای پیشرفته
            </button>
            <button
              onClick={() => {
                setCurrentView('rates');
                setMobileMenuOpen(false);
              }}
              className="text-right py-2 px-3 rounded hover:bg-amber-500/10 transition flex items-center justify-between"
            >
              <span>تابلو زنده طلا، نقره و ارز</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">زنده</span>
            </button>
            <button
              onClick={() => {
                onOpenCalculator();
                setMobileMenuOpen(false);
              }}
              className="text-right py-2 px-3 rounded hover:bg-amber-500/10 transition text-amber-600 dark:text-amber-400"
            >
              محاسبه‌گر آنلاین اجرت و قیمت طلا
            </button>
            <button
              onClick={() => {
                setCurrentView('about');
                setMobileMenuOpen(false);
              }}
              className="text-right py-2 px-3 rounded hover:bg-amber-500/10 transition"
            >
              ضمانت و شناسنامه اصالت عیار
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
