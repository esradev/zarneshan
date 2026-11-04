import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Heart, 
  Eye, 
  Check, 
  Play, 
  Calculator,
  ChevronLeft,
  ChevronRight,
  Gem
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useMarket } from '../context/MarketContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

interface HomeViewProps {
  onSelectProduct: (product: Product) => void;
  setCurrentView: (view: string) => void;
  onOpenCalculator: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectProduct,
  setCurrentView,
  onOpenCalculator,
}) => {
  const { isDark } = useTheme();
  const { calculateJewelryPrice, gold18kRate, rates } = useMarket();
  const { addToCart, isInWishlist, toggleWishlist } = useCart();

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Latest collection items for slider (similar to image 1 "Lastest Collection")
  const sliderProducts = PRODUCTS.slice(0, 6);

  const nextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % Math.max(1, sliderProducts.length - 3));
  };

  const prevSlide = () => {
    setActiveSlideIndex((prev) => (prev === 0 ? Math.max(0, sliderProducts.length - 4) : prev - 1));
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO SECTION (Directly inspired by the Haute Editorial Layout of Image 1) */}
      <section className={`relative overflow-hidden transition-colors ${
        isDark 
          ? 'bg-gradient-to-b from-[#141219] via-[#0E0D12] to-[#0A090D]' 
          : 'bg-gradient-to-b from-[#F9EFE9] via-[#FAF6F0] to-[#FAF7F2]'
      }`}>
        {/* Subtle decorative glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-rose-400/10 dark:bg-amber-600/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column (Editorial Typography & Call to Action) */}
            <div className="lg:col-span-6 space-y-6 text-right">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>کالکشن جدید طلا و جواهرات ۲۰۲۶</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold leading-[1.25] text-stone-900 dark:text-amber-100">
                درخشش بی‌همتا، <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500">
                  فراتر از مرزهای زمان
                </span>
              </h1>

              <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 max-w-xl leading-relaxed">
                گالری زرنشان با بهره‌گیری از اصیل‌ترین طلاهای ۱۸ و ۲۴ عیار، سنگ‌های قیمتی شناسنامه‌دار و فرمول رسمی و صددرصد شفاف محاسبه قیمت، تجربه‌ای مدرن و متفاوتی از خرید طلا رقم می‌زند.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setCurrentView('shop')}
                  className="px-7 py-3.5 rounded-full bg-stone-900 dark:bg-gradient-to-r dark:from-amber-500 dark:to-amber-600 hover:bg-amber-700 text-white dark:text-stone-950 font-bold text-sm transition shadow-lg flex items-center gap-2 group"
                >
                  <span>ورود به ویترین و خرید</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onOpenCalculator}
                  className="px-6 py-3.5 rounded-full border border-stone-300 dark:border-stone-700 hover:border-amber-500 dark:hover:border-amber-400 text-stone-900 dark:text-stone-100 text-sm font-semibold transition flex items-center gap-2 bg-white/70 dark:bg-stone-900/60 backdrop-blur-sm"
                >
                  <Calculator className="w-4 h-4 text-amber-500" />
                  <span>محاسبه‌گر آنلاین طلا</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-stone-300 dark:border-stone-800/80 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base font-mono">
                    ۱۰۰٪
                  </div>
                  <div className="text-stone-700 dark:text-stone-300 font-medium mt-0.5">ضمانت رسمی عیار ۱۸</div>
                </div>
                <div>
                  <div className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base font-mono">
                    ۴,۴۵۰,۰۰۰
                  </div>
                  <div className="text-stone-700 dark:text-stone-300 font-medium mt-0.5">نرخ لحظه‌ای طلا (ت)</div>
                </div>
                <div>
                  <div className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base font-mono">
                    ۰ تومان
                  </div>
                  <div className="text-stone-700 dark:text-stone-300 font-medium mt-0.5">ارسال بیمه‌شده رایگان</div>
                </div>
              </div>

            </div>

            {/* Right Column (Hero Jewel Feature Showcase echoing Image 1) */}
            <div className="lg:col-span-6 relative flex justify-center">
              
              {/* Floating Frame */}
              <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
                {/* Decorative Circular Rings */}
                <div className="absolute inset-0 rounded-full border border-amber-500/20 animate-spin" style={{ animationDuration: '60s' }} />
                <div className="absolute inset-6 rounded-full border border-dashed border-amber-500/30" />
                <div className="absolute inset-14 rounded-full bg-gradient-to-tr from-amber-500/10 via-rose-300/10 to-transparent blur-xl" />

                {/* Primary Hero Ring Image (Using User Uploaded Image 1) */}
                <div 
                  onClick={() => onSelectProduct(PRODUCTS[0])}
                  className="relative z-10 w-4/5 h-4/5 cursor-pointer group transition-transform duration-500 hover:scale-105"
                >
                  <img
                    src="/public/assets/aistudio/original-e088db252f0df6ce1e4a2ff483657722_1e2e4201.webp"
                    alt="انگشتر تک‌تخمه جواهر آریا زرنشان"
                    className="w-full h-full object-contain filter drop-shadow-2xl transition duration-500 group-hover:rotate-2"
                  />

                  {/* Interactive Floating Price Tag Tag */}
                  <div className={`absolute bottom-4 right-4 backdrop-blur-md px-4 py-2.5 rounded-2xl border shadow-xl transition ${
                    isDark 
                      ? 'bg-stone-950/85 border-amber-500/40 text-stone-100' 
                      : 'bg-white/90 border-amber-200 text-stone-900'
                  }`}>
                    <div className="text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
                      شاهکار دست‌ساز • ۴.۸۵ گرم
                    </div>
                    <div className="text-xs sm:text-sm font-bold mt-0.5">
                      انگشتر جواهر اشکی آریا
                    </div>
                    <div className="text-xs text-amber-600 dark:text-amber-300 font-mono font-bold mt-0.5">
                      {calculateJewelryPrice(4.85, '18K', 16).formattedTotal} تومان
                    </div>
                  </div>

                  {/* Fast badge */}
                  <div className="absolute top-4 left-4 bg-amber-500 text-stone-950 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                    عیار ۱۸ استاندارد
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. CURATED COLLECTION SLIDER (Echoing "Lastest Collection" from Image 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold font-serif">
              Lastest Collection
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900 dark:text-stone-100 mt-1">
              جدیدترین شاهکارهای گالری زرنشان
            </h2>
          </div>

          {/* Slider Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-full border border-stone-300 dark:border-stone-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-500/10 transition text-stone-700 dark:text-stone-300"
              title="قبلی"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-full border border-stone-300 dark:border-stone-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-500/10 transition text-stone-700 dark:text-stone-300"
              title="بعدی"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sliderProducts.slice(activeSlideIndex, activeSlideIndex + 4).map((product) => {
            const priceInfo = calculateJewelryPrice(
              product.weightGrams,
              product.karat,
              product.craftsmanshipPercent
            );
            const inWish = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className={`group rounded-2xl border p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl cursor-pointer ${
                  isDark
                    ? 'bg-[#15141B] border-stone-800/80 hover:border-amber-500/50'
                    : 'bg-white border-stone-200/90 hover:border-amber-300'
                }`}
              >
                {/* Image & Wishlist Button */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900/60 p-4 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-108"
                  />

                  {/* Wishlist button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
                      inWish
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/80 dark:bg-stone-900/80 text-stone-600 dark:text-stone-300 hover:text-rose-500'
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={inWish ? 'currentColor' : 'none'} />
                  </button>

                  {/* Weight Tag */}
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-stone-900/80 text-amber-300 backdrop-blur-sm">
                    {product.weightGrams.toLocaleString('fa-IR')} گرم • {product.karatFa}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                      {product.title}
                    </h3>
                    <p className="text-[11px] text-stone-700 dark:text-stone-300 font-medium line-clamp-1">
                      {product.stoneFa}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-stone-200 dark:border-stone-800/80 mt-2">
                    <div>
                      <div className="text-[10px] text-stone-600 dark:text-stone-400 font-medium">قیمت نهایی روز:</div>
                      <div className="font-bold text-sm text-amber-700 dark:text-amber-300 font-mono">
                        {priceInfo.formattedTotal} تومان
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, product.defaultColor);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500 text-amber-700 dark:text-amber-300 hover:text-stone-950 transition border border-amber-500/20"
                    >
                      خرید
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Browse all button */}
        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentView('shop')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-stone-300 dark:border-stone-700 hover:border-amber-500 text-xs sm:text-sm font-semibold transition"
          >
            <span>مشاهده تمامی محصولات در ویترین</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. TRIPLE EDITORIAL SHOWCASE (Directly echoing the 3 photo blocks from Image 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Emerald Velvet Ring */}
          <div 
            onClick={() => setCurrentView('shop?cat=ring')}
            className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
              alt="انگشترهای تک تخمه"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-serif">
                Royalty Collection
              </span>
              <h3 className="text-xl font-bold font-serif-luxury mt-1">
                انگشترهای فاخر تک‌تخمه برلیان
              </h3>
              <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                تراش اختصاصی قلب، اشک و امرالد با شناسنامه GIA و پایه طلای ۱۸ عیار
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-amber-300 font-semibold">
                <span>مشاهده کالکشن</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 2: Wedding Bands in Sunlight */}
          <div 
            onClick={() => setCurrentView('shop?cat=ring')}
            className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80"
              alt="حلقه های ست ازدواج"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-serif">
                Wedding & Union
              </span>
              <h3 className="text-xl font-bold font-serif-luxury mt-1">
                ست حلقه‌های پیوند و نامزدی
              </h3>
              <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                طراحی ماندگار، راحتی آناتومیک با حکاکی لیزری رایگان اسامی و تاریخ
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-amber-300 font-semibold">
                <span>مشاهده حلقه‌ها</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 3: Sapphire Ring (Using User Uploaded Image 2) */}
          <div 
            onClick={() => onSelectProduct(PRODUCTS[1])}
            className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg"
          >
            <img
              src="/public/assets/aistudio/original-1ef4649b93e9da3d727a9792391d15b2_cf4e52bf.webp"
              alt="سافایر و یاقوت اشرافی"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-serif">
                European Heritage
              </span>
              <h3 className="text-xl font-bold font-serif-luxury mt-1">
                جواهرات سلطنتی یاقوت و سافایر
              </h3>
              <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                الهام‌گرفته از گنجینه‌های جواهر اشرافی با سنگ‌های طبیعی اصل
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-amber-300 font-semibold">
                <span>جزئیات محصول</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. CATEGORIES TILES (Echoing Image 2 Category Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
            دسته‌بندی‌های اختصاصی
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900 dark:text-stone-100 mt-1">
            کاوش در گالری زرنشان بر اساس سلیقه شما
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { id: 'ring', name: 'انگشتر و حلقه', count: '۲۴ مدل', icon: '💍', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80' },
            { id: 'necklace', name: 'گردنبند و مدال', count: '۱۸ مدل', icon: '📿', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80' },
            { id: 'bracelet', name: 'دستبند و النگو', count: '۱۵ مدل', icon: '✨', image: 'https://images.unsplash.com/photo-1611591475152-47eac984b7c6?auto=format&fit=crop&w=400&q=80' },
            { id: 'earring', name: 'گوشواره', count: '۱۴ مدل', icon: '💎', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=400&q=80' },
            { id: 'bullion_coin', name: 'شمش و سرمایه', count: '۸ مدل', icon: '🪙', image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=400&q=80' },
            { id: 'silver', name: 'نقره استرلینگ', count: '۱۲ مدل', icon: '🌟', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80' },
          ].map((cat) => (
            <div
              key={cat.id}
              onClick={() => setCurrentView(`shop?cat=${cat.id}`)}
              className={`group p-4 rounded-2xl border text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                isDark ? 'bg-[#15141B] border-stone-800 hover:border-amber-500' : 'bg-white border-stone-200 hover:border-amber-400'
              }`}
            >
              <div className="w-16 h-16 mx-auto rounded-full overflow-hidden mb-3 border-2 border-amber-500/30 group-hover:border-amber-500 transition">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                {cat.name}
              </h4>
              <span className="text-[11px] text-stone-600 dark:text-stone-400 font-medium mt-0.5 block">{cat.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LIFESTYLE SPLIT (Echoing Image 1 Model Portrait & Bespoke Jewelry Crafting) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-3xl border overflow-hidden p-6 sm:p-12 transition ${
          isDark 
            ? 'bg-gradient-to-r from-[#171520] to-[#121118] border-stone-800' 
            : 'bg-gradient-to-r from-[#F7EFE9] to-[#FAF5F0] border-amber-200'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt="استایل لوکس با جواهرات زرنشان"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 text-right">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
                <Gem className="w-4 h-4" />
                <span>سفارشی‌سازی اختصاصی (Bespoke Atelier)</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-stone-900 dark:text-stone-100 leading-snug">
                رویای جواهر منحصر‌به‌فرد شما را با دست می‌آفرینیم
              </h2>

              <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-normal">
                آیا طرح خاصی در ذهن دارید یا مایلید طلایی متناسب با بودجه و وزن دلخواه شما ساخته شود؟ کارگاه زرگری و طلاسازی اختصاصی زرنشان آماده است تا از مرحله طراحی سه‌بعدی تا عیارسنجی ری‌گیری و ساخت نهایی، اثر هنری مختص شما را خلق نماید.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/40 text-xs">
                  <div className="font-bold text-amber-700 dark:text-amber-400 mb-1">
                    طراحی سه بعدی رایگان
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 font-medium">
                    مشاهده مدل رایانه‌ای رندر شده پیش از آغاز فرآیند ریخته‌گری طلا
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/40 text-xs">
                  <div className="font-bold text-amber-700 dark:text-amber-400 mb-1">
                    تعیین وزن دقیق با ترازو زرگری
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 font-medium">
                    ساخت دقیق با تلورانس ۰.۰۱ گرم و متناسب با سقف بودجه شما
                  </p>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={onOpenCalculator}
                  className="px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition"
                >
                  محاسبه آنلاین قیمت ساخت سفارشی
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
