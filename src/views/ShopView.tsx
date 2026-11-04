import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  Search, 
  RotateCcw, 
  Heart, 
  Eye, 
  Check, 
  Filter, 
  X, 
  Sparkles,
  ChevronDown,
  Layers,
  Scale,
  Gem,
  Award
} from 'lucide-react';
import { Product, ProductCategory, KaratType, StoneType, GoldColor } from '../types';
import { PRODUCTS } from '../data/products';
import { useMarket } from '../context/MarketContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

interface ShopViewProps {
  onSelectProduct: (product: Product) => void;
  initialCategory?: ProductCategory;
  initialSearchQuery?: string;
}

export const ShopView: React.FC<ShopViewProps> = ({
  onSelectProduct,
  initialCategory = 'all',
  initialSearchQuery = '',
}) => {
  const { isDark } = useTheme();
  const { calculateJewelryPrice } = useMarket();
  const { addToCart, isInWishlist, toggleWishlist } = useCart();

  // Filters State
  const [category, setCategory] = useState<ProductCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [selectedKarats, setSelectedKarats] = useState<KaratType[]>([]);
  const [maxWeight, setMaxWeight] = useState<number>(30); // in grams
  const [minWeight, setMinWeight] = useState<number>(0);
  const [weightPreset, setWeightPreset] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(150000000); // 150 million Tomans
  const [selectedStones, setSelectedStones] = useState<StoneType[]>([]);
  const [selectedColors, setSelectedColors] = useState<GoldColor[]>([]);
  const [investmentOnly, setInvestmentOnly] = useState<boolean>(false);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Quick weight presets handler
  const handleWeightPreset = (preset: string) => {
    setWeightPreset(preset);
    if (preset === 'all') {
      setMinWeight(0);
      setMaxWeight(30);
    } else if (preset === 'light') {
      setMinWeight(0);
      setMaxWeight(2.5);
    } else if (preset === 'medium') {
      setMinWeight(2.5);
      setMaxWeight(6.0);
    } else if (preset === 'heavy') {
      setMinWeight(6.0);
      setMaxWeight(12.0);
    } else if (preset === 'super_heavy') {
      setMinWeight(12.0);
      setMaxWeight(30.0);
    }
  };

  const toggleKarat = (k: KaratType) => {
    setSelectedKarats((prev) =>
      prev.includes(k) ? prev.filter((item) => item !== k) : [...prev, k]
    );
  };

  const toggleStone = (s: StoneType) => {
    setSelectedStones((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]
    );
  };

  const toggleColor = (c: GoldColor) => {
    setSelectedColors((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
    );
  };

  const resetAllFilters = () => {
    setCategory('all');
    setSearchQuery('');
    setSelectedKarats([]);
    setMinWeight(0);
    setMaxWeight(30);
    setWeightPreset('all');
    setMaxPrice(150000000);
    setSelectedStones([]);
    setSelectedColors([]);
    setInvestmentOnly(false);
    setInStockOnly(false);
    setSortBy('featured');
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Category
      if (category !== 'all' && product.category !== category) return false;

      // 2. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesEn = product.englishTitle.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesEn && !matchesDesc) return false;
      }

      // 3. Karat
      if (selectedKarats.length > 0 && !selectedKarats.includes(product.karat)) return false;

      // 4. Weight Range
      if (product.weightGrams < minWeight || product.weightGrams > maxWeight) return false;

      // 5. Price
      const price = calculateJewelryPrice(
        product.weightGrams,
        product.karat,
        product.craftsmanshipPercent
      ).totalPrice;
      if (price > maxPrice) return false;

      // 6. Stone Type
      if (selectedStones.length > 0 && !selectedStones.includes(product.stoneType)) return false;

      // 7. Colors
      if (
        selectedColors.length > 0 &&
        !selectedColors.some((c) => product.colors.includes(c))
      )
        return false;

      // 8. Investment (Low craftsmanship / bullion)
      if (investmentOnly && !product.isInvestment) return false;

      // 9. In Stock Only
      if (inStockOnly && !product.inStock) return false;

      return true;
    }).sort((a, b) => {
      const priceA = calculateJewelryPrice(a.weightGrams, a.karat, a.craftsmanshipPercent).totalPrice;
      const priceB = calculateJewelryPrice(b.weightGrams, b.karat, b.craftsmanshipPercent).totalPrice;

      if (sortBy === 'price_asc') return priceA - priceB;
      if (sortBy === 'price_desc') return priceB - priceA;
      if (sortBy === 'weight_asc') return a.weightGrams - b.weightGrams;
      if (sortBy === 'weight_desc') return b.weightGrams - a.weightGrams;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    category,
    searchQuery,
    selectedKarats,
    minWeight,
    maxWeight,
    maxPrice,
    selectedStones,
    selectedColors,
    investmentOnly,
    inStockOnly,
    sortBy,
    calculateJewelryPrice,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* 1. SHOP HEADER & SEARCH BAR */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 border-stone-200 dark:border-stone-800">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold font-serif">
              Fine Jewelry & Bullion Boutique
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900 dark:text-stone-100 mt-1">
              ویترین تخصصی طلا، جواهرات و مسکوکات
            </h1>
            <p className="text-xs text-stone-700 dark:text-stone-300 font-medium mt-1">
              دارای محاسبه‌گر زنده بر اساس نرخ روز اتحادیه و فیلترهای دقیق عیار، وزن و سنگ
            </p>
          </div>

          {/* Quick Search in Shop */}
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو بر اساس نام، مدل یا سنگ..."
                className={`w-full pl-9 pr-4 py-2.5 rounded-full text-xs border focus:outline-none transition ${
                  isDark
                    ? 'bg-[#15141B] border-stone-800 text-stone-100 focus:border-amber-500'
                    : 'bg-white border-stone-300 text-stone-900 focus:border-amber-600'
                }`}
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            </div>

            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2.5 rounded-full bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 shrink-0"
            >
              <Filter className="w-4 h-4" />
              <span>فیلترها</span>
            </button>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-4 pb-1 text-xs">
          {[
            { id: 'all', label: 'همه محصولات' },
            { id: 'ring', label: 'انگشتر و حلقه' },
            { id: 'bracelet', label: 'دستبند و النگو' },
            { id: 'necklace', label: 'گردنبند و مدال' },
            { id: 'earring', label: 'گوشواره' },
            { id: 'set', label: 'سرویس و نیم‌ست' },
            { id: 'bullion_coin', label: 'شمش و سرمایه‌گذاری' },
            { id: 'silver', label: 'جواهرات نقره ۹۲۵' },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id as ProductCategory)}
              className={`px-4 py-2 rounded-full font-medium transition shrink-0 ${
                category === c.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : isDark
                  ? 'bg-stone-900/60 text-stone-300 hover:bg-stone-800 border border-stone-800'
                  : 'bg-stone-100 text-stone-700 hover:bg-amber-100/60 border border-stone-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. MAIN LAYOUT (Sidebar Filters + Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* DESKTOP SIDEBAR FILTERS (Col 3) */}
        <div className={`hidden lg:block lg:col-span-3 rounded-2xl border p-5 space-y-6 transition-colors sticky top-28 ${
          isDark ? 'bg-[#14131A] border-stone-800 text-stone-200' : 'bg-[#FAF7F2] border-stone-200 text-stone-800'
        }`}>
          <div className="flex items-center justify-between border-b pb-3 border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2 font-bold text-sm">
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>فیلترهای پیشرفته طلا</span>
            </div>
            <button
              onClick={resetAllFilters}
              className="text-[11px] text-stone-400 hover:text-amber-600 flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>بازنشانی</span>
            </button>
          </div>

          {/* Filter: عیار طلا و نقره */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>عیار استاندارد فلز:</span>
            </label>
            <div className="space-y-1.5 text-xs">
              {[
                { id: '18K', label: 'طلای ۱۸ عیار استاندارد (۷۵۰)' },
                { id: '24K', label: 'طلای ۲۴ عیار خالص (شمش ۹۹۹)' },
                { id: '925_SILVER', label: 'نقره استرلینگ ۹۲۵ عیار' },
              ].map((k) => (
                <label
                  key={k.id}
                  className="flex items-center gap-2 cursor-pointer hover:opacity-80"
                >
                  <input
                    type="checkbox"
                    checked={selectedKarats.includes(k.id as KaratType)}
                    onChange={() => toggleKarat(k.id as KaratType)}
                    className="accent-amber-500 rounded"
                  />
                  <span>{k.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter: فیلتر دقیق وزن به گرم (درخواستی کاربر) */}
          <div className="space-y-3 border-t pt-4 border-stone-200 dark:border-stone-800">
            <div className="flex justify-between items-center text-xs font-bold text-stone-700 dark:text-stone-300">
              <span className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-500" />
                <span>محدوده وزن (گرم):</span>
              </span>
              <span className="font-mono text-amber-600 dark:text-amber-400">
                {minWeight} تا {maxWeight} گرم
              </span>
            </div>

            {/* Quick Weight Chips */}
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              {[
                { id: 'all', label: 'همه وزن‌ها' },
                { id: 'light', label: 'ظریف (زیر ۲.۵ گرم)' },
                { id: 'medium', label: 'متوسط (۲.۵ تا ۶ گرم)' },
                { id: 'heavy', label: 'سنگین (۶ تا ۱۲ گرم)' },
                { id: 'super_heavy', label: 'خاص (بالای ۱۲ گرم)' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleWeightPreset(p.id)}
                  className={`p-1.5 rounded-lg border text-center transition ${
                    weightPreset === p.id
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-600'
                      : 'border-stone-300 dark:border-stone-800 hover:border-amber-400 text-stone-700 dark:text-stone-300 font-medium'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <input
              type="range"
              min="0.5"
              max="25"
              step="0.5"
              value={maxWeight}
              onChange={(e) => {
                setMaxWeight(parseFloat(e.target.value));
                setWeightPreset('custom');
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Filter: سقف بودجه و قیمت (درخواستی کاربر) */}
          <div className="space-y-2.5 border-t pt-4 border-stone-200 dark:border-stone-800">
            <div className="flex justify-between items-center text-xs font-bold text-stone-700 dark:text-stone-300">
              <span>سقف قیمت خرید:</span>
              <span className="font-mono text-amber-600 dark:text-amber-400">
                {maxPrice >= 150000000 ? 'نامحدود' : `${(maxPrice / 1000000).toLocaleString('fa-IR')} م تومان`}
              </span>
            </div>
            <input
              type="range"
              min="2000000"
              max="150000000"
              step="2000000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-600 dark:text-stone-400 font-mono font-medium">
              <span>۲ میلیون</span>
              <span>۷۵ میلیون</span>
              <span>۱۵۰+ میلیون</span>
            </div>
          </div>

          {/* Filter: نوع نگین و سنگ */}
          <div className="space-y-2 border-t pt-4 border-stone-200 dark:border-stone-800">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <Gem className="w-3.5 h-3.5 text-amber-500" />
              <span>نوع سنگ و نگین:</span>
            </label>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'none', label: 'بدون نگین (تمام طلا)' },
                { id: 'diamond', label: 'برلیان طبیعی شناسنامه‌دار' },
                { id: 'zirconia', label: 'اتمی / زیرکونیای سواروسکی' },
                { id: 'ruby_emerald', label: 'سنگ‌های رنگی (یاقوت، زمرد)' },
                { id: 'pearl', label: 'مروارید باروک و طبیعی' },
              ].map((st) => (
                <label key={st.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStones.includes(st.id as StoneType)}
                    onChange={() => toggleStone(st.id as StoneType)}
                    className="accent-amber-500 rounded"
                  />
                  <span>{st.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter: رنگ طلا */}
          <div className="space-y-2 border-t pt-4 border-stone-200 dark:border-stone-800">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
              رنگ پایه طلا:
            </label>
            <div className="flex gap-2">
              {[
                { id: 'yellow', label: 'طلای زرد', colorClass: 'bg-amber-400' },
                { id: 'rose', label: 'رزگلد', colorClass: 'bg-rose-300' },
                { id: 'white', label: 'طلای سفید', colorClass: 'bg-stone-200' },
                { id: 'dual', label: 'دو رنگ', colorClass: 'bg-gradient-to-r from-amber-300 to-stone-200' },
              ].map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => toggleColor(col.id as GoldColor)}
                  title={col.label}
                  className={`w-7 h-7 rounded-full ${col.colorClass} border-2 transition ${
                    selectedColors.includes(col.id as GoldColor)
                      ? 'border-amber-600 scale-110 shadow-md ring-2 ring-amber-400'
                      : 'border-transparent hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quick Flags */}
          <div className="space-y-2 border-t pt-4 border-stone-200 dark:border-stone-800 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={investmentOnly}
                onChange={(e) => setInvestmentOnly(e.target.checked)}
                className="accent-amber-500 rounded"
              />
              <span className="font-semibold text-amber-700 dark:text-amber-400">
                فقط طلاهای کم‌اجرت و شمش سرمایه‌گذاری
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-amber-500 rounded"
              />
              <span>فقط کالاهای آماده ارسال فوری</span>
            </label>
          </div>

        </div>

        {/* PRODUCTS GRID (Col 9) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Top Sort & Count Bar */}
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs transition ${
            isDark ? 'bg-[#14131A] border-stone-800' : 'bg-white border-stone-200'
          }`}>
            <div className="text-stone-700 dark:text-stone-300 font-medium">
              نمایش <span className="font-bold text-stone-900 dark:text-stone-100 font-mono">{filteredProducts.length.toLocaleString('fa-IR')}</span> شاهکار جواهر زرنشان
            </div>

            <div className="flex items-center gap-2">
              <span className="text-stone-700 dark:text-stone-300 font-medium shrink-0">مرتب‌سازی:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-3 py-1.5 rounded-lg border focus:outline-none font-medium transition ${
                  isDark
                    ? 'bg-stone-900 border-stone-700 text-stone-200'
                    : 'bg-stone-50 border-stone-300 text-stone-900'
                }`}
              >
                <option value="featured">برگزیده و محبوب‌ترین</option>
                <option value="newest">جدیدترین کالکشن</option>
                <option value="price_asc">ارزان‌ترین قیمت</option>
                <option value="price_desc">گران‌ترین و فاخرترین</option>
                <option value="weight_asc">سبک‌ترین وزن طلا</option>
                <option value="weight_desc">سنگین‌ترین وزن طلا</option>
              </select>
            </div>
          </div>

          {/* Grid Cards */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 p-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
                هیچ محصولی با فیلترهای انتخابی شما یافت نشد.
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                می‌توانید بازه وزن یا قیمت را گسترش دهید یا فیلترها را ریست کنید.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition"
              >
                بازنشانی تمامی فیلترها
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
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
                    className={`group rounded-2xl border p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl cursor-pointer ${
                      isDark
                        ? 'bg-[#15141B] border-stone-800/90 hover:border-amber-500/60'
                        : 'bg-white border-stone-200 hover:border-amber-400'
                    }`}
                  >
                    {/* Image Area */}
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900/60 p-4 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-108"
                      />

                      {/* Wishlist Button */}
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

                      {/* Weight Badge */}
                      <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-stone-900/80 text-amber-300 backdrop-blur-sm">
                        {product.weightGrams.toLocaleString('fa-IR')} گرم • {product.karatFa}
                      </span>

                      {/* Craftsmanship Flag */}
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[9px] font-semibold bg-amber-500/90 text-stone-950 backdrop-blur-sm">
                        اجرت {product.craftsmanshipPercent}٪
                      </span>
                    </div>

                    {/* Info */}
                    <div className="mt-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
                          {product.categoryFa}
                        </div>
                        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition mt-0.5">
                          {product.title}
                        </h3>
                        <p className="text-[11px] text-stone-700 dark:text-stone-300 font-medium line-clamp-1 mt-1">
                          {product.stoneFa}
                        </p>
                      </div>

                      {/* Price & Action */}
                      <div className="pt-3 border-t border-stone-200 dark:border-stone-800/80 flex items-center justify-between mt-2">
                        <div>
                          <div className="text-[10px] text-stone-600 dark:text-stone-400 font-medium">قیمت روز با اجرت و مالیات:</div>
                          <div className="font-bold text-sm text-amber-700 dark:text-amber-300 font-mono">
                            {priceInfo.formattedTotal} تومان
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, product.defaultColor);
                          }}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white transition shadow-sm"
                        >
                          خرید
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* MOBILE FLOATING FILTER MODAL */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className={`relative w-4/5 max-w-sm h-full p-5 overflow-y-auto space-y-6 ${
            isDark ? 'bg-[#15141B] text-stone-100' : 'bg-white text-stone-900'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-sm">فیلترهای پیشرفته</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            {/* Mobile Weight */}
            <div className="space-y-2">
              <label className="text-xs font-bold">محدوده وزن ({minWeight} تا {maxWeight} گرم):</label>
              <input
                type="range"
                min="0.5"
                max="25"
                step="0.5"
                value={maxWeight}
                onChange={(e) => setMaxWeight(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Mobile Karat */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold block">عیار فلز:</label>
              {['18K', '24K', '925_SILVER'].map((k) => (
                <label key={k} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedKarats.includes(k as KaratType)}
                    onChange={() => toggleKarat(k as KaratType)}
                    className="accent-amber-500"
                  />
                  <span>{k === '18K' ? '۱۸ عیار' : k === '24K' ? '۲۴ عیار' : 'نقره ۹۲۵'}</span>
                </label>
              ))}
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs"
            >
              مشاهده نتایج ({filteredProducts.length.toLocaleString('fa-IR')} مورد)
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
