import React, { useState } from 'react';
import { 
  ArrowRight, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Ruler, 
  Calculator, 
  Info, 
  Share2, 
  ShoppingBag,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Product, GoldColor } from '../types';
import { useMarket } from '../context/MarketContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { PRODUCTS } from '../data/products';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onOpenSizer: () => void;
  onOpenCalculator: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onSelectProduct,
  onOpenSizer,
  onOpenCalculator,
}) => {
  const { isDark } = useTheme();
  const { calculateJewelryPrice, lastUpdated } = useMarket();
  const { addToCart, isInWishlist, toggleWishlist, setIsCartOpen } = useCart();

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<GoldColor>(product.defaultColor);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [showFormulaBreakdown, setShowFormulaBreakdown] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const priceInfo = calculateJewelryPrice(
    product.weightGrams,
    product.karat,
    product.craftsmanshipPercent
  );

  const inWish = isInWishlist(product.id);

  const colorLabels: Record<GoldColor, { name: string; bg: string }> = {
    yellow: { name: 'طلای زرد ۱۸ عیار', bg: 'bg-amber-400' },
    rose: { name: 'طلای رزگلد', bg: 'bg-rose-300' },
    white: { name: 'طلای سفید (رودیوم)', bg: 'bg-stone-200' },
    dual: { name: 'طلای دو رنگ (زرد و سفید)', bg: 'bg-gradient-to-r from-amber-300 to-stone-200' },
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsCartOpen(true);
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* 1. BREADCRUMBS & NAVIGATION */}
      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400 font-semibold transition"
          >
            <ArrowRight className="w-4 h-4" />
            <span>بازگشت به ویترین</span>
          </button>
          <span>/</span>
          <span>{product.categoryFa}</span>
          <span>/</span>
          <span className="text-stone-900 dark:text-stone-200 font-bold truncate max-w-xs">
            {product.title}
          </span>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          title="اشتراک‌گذاری این محصول"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">{copiedLink ? 'لینک کپی شد' : 'اشتراک‌گذاری'}</span>
        </button>
      </div>

      {/* 2. MAIN PRODUCT HERO DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column (Images Gallery - Col 6) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main Stage Image */}
          <div className={`relative aspect-square w-full rounded-3xl border overflow-hidden p-6 flex items-center justify-center transition ${
            isDark ? 'bg-[#15141B] border-stone-800' : 'bg-white border-stone-200'
          }`}>
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-950 shadow-md">
                {product.karatFa}
              </span>
              {product.isInvestment && (
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-md">
                  کم‌اجرت سرمایه‌گذاری
                </span>
              )}
            </div>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 left-4 p-3 rounded-full backdrop-blur-md transition shadow-md ${
                inWish
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/90 dark:bg-stone-900/90 text-stone-600 dark:text-stone-300 hover:text-rose-500'
              }`}
            >
              <Heart className="w-5 h-5" fill={inWish ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl border-2 overflow-hidden shrink-0 transition p-1 ${
                    activeImage === img
                      ? 'border-amber-500 shadow-md'
                      : 'border-transparent hover:border-amber-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="نمای محصول" className="w-full h-full object-cover rounded-lg" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right Column (Specs & Purchase Panel - Col 6) */}
        <div className="lg:col-span-6 space-y-6 text-right">
          
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold font-serif">
              {product.englishTitle}
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900 dark:text-stone-100 mt-1">
              {product.title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 mt-2">
              <span className="font-mono">کد کالا: {product.id}</span>
              <span>•</span>
              <span>کد ری‌گیری: {product.specs.gaugeCode}</span>
            </div>
          </div>

          {/* LIVE PRICE PANEL WITH REAL-TIME INDICATOR */}
          <div className={`p-5 rounded-2xl border transition ${
            isDark 
              ? 'bg-gradient-to-r from-[#171520] to-[#14131A] border-amber-900/40 text-stone-100' 
              : 'bg-gradient-to-r from-[#FAF4EC] to-[#F7EFE4] border-amber-300/80 text-stone-900'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-stone-800 dark:text-stone-300 font-semibold">
                  قیمت تمام شده لحظه‌ای (با اجرت، سود و مالیات):
                </span>
                <div className="text-2xl sm:text-3xl font-bold text-amber-700 dark:text-amber-400 font-mono mt-0.5">
                  {(priceInfo.totalPrice * quantity).toLocaleString('fa-IR')} تومان
                </div>
              </div>

              <div className="text-left">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  محاسبه آنلاین با نرخ روز
                </span>
                <div className="text-[10px] text-stone-700 dark:text-stone-300 font-medium mt-1 text-left">
                  وزن: <strong className="text-stone-900 dark:text-stone-100">{product.weightGrams} گرم</strong>
                </div>
              </div>
            </div>

            {/* Expandable Transparent Formula Breakdown */}
            <div className="mt-4 pt-3 border-t border-amber-500/20">
              <button
                type="button"
                onClick={() => setShowFormulaBreakdown(!showFormulaBreakdown)}
                className="w-full flex items-center justify-between text-xs font-semibold text-amber-800 dark:text-amber-300 hover:opacity-80 transition"
              >
                <span className="flex items-center gap-1">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>تفکیک و فرمول رسمی محاسبه قیمت این قطعه طلا</span>
                </span>
                {showFormulaBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showFormulaBreakdown && (
                <div className={`mt-3 p-3 rounded-xl text-xs space-y-2 ${
                  isDark ? 'bg-black/40' : 'bg-white/90'
                }`}>
                  <div className="flex justify-between text-stone-700 dark:text-stone-300 font-medium">
                    <span>۱. ارزش خام طلا ({product.weightGrams} گرم × {priceInfo.rawMaterialRate.toLocaleString('fa-IR')} ت):</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      {(priceInfo.rawPrice * quantity).toLocaleString('fa-IR')} تومان
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-700 dark:text-stone-300 font-medium">
                    <span>۲. اجرت ساخت طلاسازی ({product.craftsmanshipPercent}٪):</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      {(priceInfo.craftsmanshipFee * quantity).toLocaleString('fa-IR')} تومان
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-700 dark:text-stone-300 font-medium">
                    <span>۳. سود مصوب فروشنده (۷٪ اتحادیه):</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      {(priceInfo.sellerProfit * quantity).toLocaleString('fa-IR')} تومان
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-700 dark:text-stone-300 font-medium">
                    <span>۴. مالیات بر ارزش افزوده ۹٪ (معافیت اصل طلا):</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      {(priceInfo.tax * quantity).toLocaleString('fa-IR')} تومان
                    </span>
                  </div>

                  <div className="text-[10px] text-amber-700 dark:text-amber-400 font-medium pt-1 border-t border-dashed border-stone-300 dark:border-stone-700">
                    * قیمت فاکتور نهایی هنگام خرید، بر اساس آخرین نوسان ثانیه‌ای تابلو قطعی می‌شود.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* COLOR SELECTION */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
              رنگ آبکاری طلا:
            </label>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition ${
                    selectedColor === c
                      ? isDark
                        ? 'bg-amber-950/60 border-amber-500 text-amber-300 ring-1 ring-amber-500'
                        : 'bg-amber-100 border-amber-600 text-amber-900 ring-1 ring-amber-600'
                      : isDark
                      ? 'border-stone-800 text-stone-400 hover:border-stone-700'
                      : 'border-stone-200 text-stone-600 hover:border-stone-400'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full ${colorLabels[c].bg} border border-stone-400/50`} />
                  <span>{colorLabels[c].name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SIZES (IF APPLICABLE) & SIZER BUTTON */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  انتخاب سایز:
                </label>
                <button
                  type="button"
                  onClick={onOpenSizer}
                  className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>راهنمای تعیین سایز دقیق</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-10 px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                      selectedSize === s
                        ? 'bg-amber-500 text-stone-950 border-amber-600'
                        : isDark
                        ? 'border-stone-800 text-stone-300 hover:border-amber-400'
                        : 'border-stone-300 text-stone-700 hover:border-amber-500'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY & ACTIONS */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-xl p-1 bg-white dark:bg-stone-900">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 font-bold"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs sm:text-sm shadow-lg transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>افزودن به سبد خرید و صدور فاکتور</span>
              </button>
            </div>
          </div>

          {/* TRUST BADGES ROW */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-200 dark:border-stone-800 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-stone-600 dark:text-stone-300">{product.specs.certificateType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-stone-600 dark:text-stone-300">ارسال بیمه‌شده رایگان</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-stone-600 dark:text-stone-300">۷ روز ضمانت تعویض</span>
            </div>
          </div>

        </div>

      </div>

      {/* 3. TECHNICAL SPECIFICATIONS & STORY */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition ${
        isDark ? 'bg-[#15141B] border-stone-800 text-stone-200' : 'bg-white border-stone-200 text-stone-800'
      }`}>
        <h2 className="text-lg font-bold font-serif-luxury text-stone-900 dark:text-stone-100 mb-4">
          شناسنامه فنی و مشخصات کارشناسی
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
          <div className="space-y-3">
            <p className="text-stone-600 dark:text-stone-400">{product.description}</p>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-900 dark:text-amber-300">
              <strong>پکیجینگ و هدیه:</strong> {product.specs.giftBox}
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden divide-y divide-stone-200 dark:divide-stone-800">
            <div className="p-2.5 flex justify-between">
              <span className="text-stone-500">عیار رسمی:</span>
              <span className="font-bold">{product.karatFa}</span>
            </div>
            <div className="p-2.5 flex justify-between">
              <span className="text-stone-500">وزن دقیق:</span>
              <span className="font-bold font-mono">{product.weightGrams} گرم</span>
            </div>
            <div className="p-2.5 flex justify-between">
              <span className="text-stone-500">اجرت ساخت:</span>
              <span className="font-bold">{product.craftsmanshipPercent} درصد</span>
            </div>
            <div className="p-2.5 flex justify-between">
              <span className="text-stone-500">سنگ و نگین:</span>
              <span className="font-bold">{product.stoneFa}</span>
            </div>
            {product.specs.dimensions && (
              <div className="p-2.5 flex justify-between">
                <span className="text-stone-500">ابعاد و ساختار:</span>
                <span>{product.specs.dimensions}</span>
              </div>
            )}
            <div className="p-2.5 flex justify-between">
              <span className="text-stone-500">کد استاندارد و ری‌گیری:</span>
              <span className="font-mono text-amber-600">{product.specs.gaugeCode}</span>
            </div>
            <div className="p-2.5 flex justify-between">
              <span className="text-stone-500">گارانتی و خدمات:</span>
              <span>{product.specs.warranty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. RELATED PRODUCTS ROW */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold font-serif-luxury text-stone-900 dark:text-stone-100">
          محصولات مکمل و هم‌نشین با این قطعه
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => {
            const relPrice = calculateJewelryPrice(
              rel.weightGrams,
              rel.karat,
              rel.craftsmanshipPercent
            );
            return (
              <div
                key={rel.id}
                onClick={() => onSelectProduct(rel)}
                className={`p-4 rounded-2xl border transition hover:shadow-xl cursor-pointer ${
                  isDark ? 'bg-[#15141B] border-stone-800' : 'bg-white border-stone-200'
                }`}
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 p-4 mb-3">
                  <img src={rel.image} alt={rel.title} className="w-full h-full object-contain" />
                </div>
                <h4 className="text-xs font-bold line-clamp-1">{rel.title}</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] text-stone-400 font-mono">{rel.weightGrams} گرم</span>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                    {relPrice.formattedTotal} ت
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
