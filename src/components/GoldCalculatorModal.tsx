import React, { useState } from 'react';
import { X, Calculator, RefreshCw, CheckCircle2, ShieldCheck, Info, Sparkles } from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { useTheme } from '../context/ThemeContext';

interface GoldCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialWeight?: number;
  initialCraftsmanship?: number;
}

export const GoldCalculatorModal: React.FC<GoldCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialWeight = 3.5,
  initialCraftsmanship = 14,
}) => {
  const { isDark } = useTheme();
  const { gold18kRate, gold24kRate, silver925Rate } = useMarket();

  const [weight, setWeight] = useState<number>(initialWeight);
  const [craftsmanship, setCraftsmanship] = useState<number>(initialCraftsmanship);
  const [karat, setKarat] = useState<'18K' | '24K' | '925_SILVER'>('18K');
  const [profitPercent, setProfitPercent] = useState<number>(7);
  const [taxPercent, setTaxPercent] = useState<number>(9);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  // Selected base raw material rate
  const currentBaseRate = karat === '18K' 
    ? gold18kRate 
    : karat === '24K' 
    ? gold24kRate 
    : silver925Rate;

  // Formula calculations
  const rawPrice = weight * currentBaseRate;
  const craftsmanshipAmount = rawPrice * (craftsmanship / 100);
  const profitAmount = (rawPrice + craftsmanshipAmount) * (profitPercent / 100);
  // طبق مصوبه جدید مجلس و اتحادیه، مالیات فقط به سود و اجرت تعلق می‌گیرد و اصل طلا معاف است
  const taxAmount = (craftsmanshipAmount + profitAmount) * (taxPercent / 100);
  const totalPrice = Math.round(rawPrice + craftsmanshipAmount + profitAmount + taxAmount);

  const handleCopyEstimate = () => {
    const text = `پیش‌فاکتور محاسبه شفاف زرنشان:
وزن: ${weight} گرم
عیار: ${karat === '18K' ? '۱۸ عیار' : karat === '24K' ? '۲۴ عیار' : 'نقره ۹۲۵'}
نرخ پایه هر گرم: ${currentBaseRate.toLocaleString('fa-IR')} تومان
اجرت ساخت: ${craftsmanship}٪ (${Math.round(craftsmanshipAmount).toLocaleString('fa-IR')} ت)
سود طلافروش: ${profitPercent}٪ (${Math.round(profitAmount).toLocaleString('fa-IR')} ت)
مالیات بر ارزش افزوده: ${taxPercent}٪ (${Math.round(taxAmount).toLocaleString('fa-IR')} ت)
قیمت نهایی قابل پرداخت: ${totalPrice.toLocaleString('fa-IR')} تومان`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`relative w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden transition-all ${
        isDark 
          ? 'bg-[#14131A] border-amber-900/40 text-stone-100' 
          : 'bg-[#FCF9F4] border-amber-200 text-stone-900'
      }`}>
        
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDark ? 'border-stone-800 bg-[#1A1922]' : 'border-stone-200 bg-[#F5ECE0]'
        }`}>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-500">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">محاسبه‌گر رسمی و شفاف قیمت طلا و جواهر</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                بر اساس فرمول مصوب اتحادیه طلا، جواهر و نقره کشور
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Karat selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2">
              انتخاب عیار فلز:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: '18K', label: 'طلای ۱۸ عیار (۷۵۰)', rate: gold18kRate },
                { id: '24K', label: 'طلای ۲۴ عیار خالص', rate: gold24kRate },
                { id: '925_SILVER', label: 'نقره استرلینگ ۹۲۵', rate: silver925Rate },
              ].map((k) => (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => setKarat(k.id as any)}
                  className={`p-3 rounded-xl border text-center transition ${
                    karat === k.id
                      ? isDark
                        ? 'bg-amber-950/50 border-amber-500 text-amber-300 font-bold shadow-sm'
                        : 'bg-amber-100 border-amber-600 text-amber-900 font-bold shadow-sm'
                      : isDark
                      ? 'border-stone-800 hover:bg-stone-800/40 text-stone-400'
                      : 'border-stone-200 hover:bg-stone-100 text-stone-600'
                  }`}
                >
                  <div className="text-xs sm:text-sm">{k.label}</div>
                  <div className="text-[11px] font-mono mt-1 opacity-80">
                    {k.rate.toLocaleString('fa-IR')} ت
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Weight Controls */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                وزن قطعه طلا (گرم):
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  max="100"
                  value={weight}
                  onChange={(e) => setWeight(Math.max(0.01, parseFloat(e.target.value) || 0))}
                  className={`w-24 px-2 py-1 text-center font-bold text-sm rounded-lg border focus:outline-none ${
                    isDark ? 'bg-stone-900 border-stone-700 text-amber-400' : 'bg-white border-stone-300 text-amber-700'
                  }`}
                />
                <span className="text-xs text-stone-500">گرم</span>
              </div>
            </div>
            <input
              type="range"
              min="0.5"
              max="25"
              step="0.05"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            {/* Quick Presets */}
            <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1 text-xs">
              {[1.25, 2.5, 3.45, 5.0, 7.8, 12.0, 18.5].map((w) => (
                <button
                  key={w}
                  onClick={() => setWeight(w)}
                  className={`px-2 py-0.5 rounded-full border transition shrink-0 ${
                    weight === w
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-600'
                      : 'border-stone-300 dark:border-stone-800 text-stone-500 hover:border-amber-400'
                  }`}
                >
                  {w.toLocaleString('fa-IR')} گرم
                </button>
              ))}
            </div>
          </div>

          {/* Craftsmanship percentage slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                درصد اجرت ساخت (کارمزد طلاسازی):
              </label>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400 font-mono">
                {craftsmanship.toLocaleString('fa-IR')}٪
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="28"
              step="0.5"
              value={craftsmanship}
              onChange={(e) => setCraftsmanship(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>بدون اجرت (شمش/طلای آبشده)</span>
              <span>کم‌اجرت النگو (۷ الی ۹٪)</span>
              <span>کارهای لوکس و برلیان (۱۴ الی ۲۲٪)</span>
            </div>
          </div>

          {/* Transparent Formula Breakdown Cards */}
          <div className={`p-4 rounded-xl border space-y-2.5 text-xs ${
            isDark ? 'bg-stone-900/70 border-stone-800' : 'bg-white border-stone-200'
          }`}>
            <div className="flex items-center justify-between text-stone-700 dark:text-stone-300 font-medium">
              <span>۱. ارزش خالص طلای خام ({weight} گرم × {currentBaseRate.toLocaleString('fa-IR')} ت):</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100 font-mono">
                {Math.round(rawPrice).toLocaleString('fa-IR')} تومان
              </span>
            </div>

            <div className="flex items-center justify-between text-stone-700 dark:text-stone-300 font-medium">
              <span>۲. هزینه اجرت ساخت ({craftsmanship}٪):</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100 font-mono">
                {Math.round(craftsmanshipAmount).toLocaleString('fa-IR')} تومان
              </span>
            </div>

            <div className="flex items-center justify-between text-stone-700 dark:text-stone-300 font-medium">
              <span>۳. سود مجاز فروشنده ({profitPercent}٪ اتحادیه):</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100 font-mono">
                {Math.round(profitAmount).toLocaleString('fa-IR')} تومان
              </span>
            </div>

            <div className="flex items-center justify-between text-stone-700 dark:text-stone-300 font-medium">
              <span className="flex items-center gap-1">
                ۴. مالیات بر ارزش افزوده ۹٪ (فقط روی اجرت و سود):
                <span title="طبق قانون مصوب مجلس، اصل طلا از مالیات معاف است" className="cursor-help text-amber-500">
                  <Info className="w-3 h-3" />
                </span>
              </span>
              <span className="font-semibold text-stone-900 dark:text-stone-100 font-mono">
                {Math.round(taxAmount).toLocaleString('fa-IR')} تومان
              </span>
            </div>

            <div className="pt-3 border-t border-dashed border-stone-300 dark:border-stone-700 flex items-center justify-between text-sm sm:text-base">
              <span className="font-bold text-amber-800 dark:text-amber-400">مجموع قیمت تمام شده نهایی:</span>
              <span className="font-bold text-amber-700 dark:text-amber-300 text-base sm:text-lg font-mono">
                {totalPrice.toLocaleString('fa-IR')} تومان
              </span>
            </div>
          </div>

          {/* Trust note */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
            <span>
              تمامی فاکتورهای گالری زرنشان بر اساس این فرمول دقیق صادر شده و در زمان خرید، فاکتور رسمی هولوگرام‌دار با مهر صنف به خریدار تقدیم می‌گردد.
            </span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className={`px-6 py-4 border-t flex items-center justify-between ${
          isDark ? 'border-stone-800 bg-[#1A1922]' : 'border-stone-200 bg-[#F5ECE0]'
        }`}>
          <button
            onClick={handleCopyEstimate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-amber-500/40 hover:bg-amber-500/10 transition text-amber-700 dark:text-amber-300"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>کپی شد!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>کپی جزئیات پیش‌فاکتور</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white transition"
          >
            بستن پنجره
          </button>
        </div>

      </div>
    </div>
  );
};
