import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Clock, 
  ShieldCheck, 
  Info, 
  Calculator, 
  Sparkles, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { useTheme } from '../context/ThemeContext';
import { LiveRate } from '../types';

export const LiveRatesView: React.FC = () => {
  const { isDark } = useTheme();
  const {
    rates,
    lastUpdated,
    refreshRates,
    isLiveActive,
    toggleLiveActive,
    gold18kRate,
    gold24kRate,
    silver925Rate,
  } = useMarket();

  const [activeTab, setActiveTab] = useState<'all' | 'gold' | 'silver' | 'coin' | 'currency'>('all');

  // Calculator State inside Live Board
  const [calcWeight, setCalcWeight] = useState<number>(4.5);
  const [calcKarat, setCalcKarat] = useState<'18K' | '24K' | '925_SILVER'>('18K');
  const [calcCraftsmanship, setCalcCraftsmanship] = useState<number>(14);
  const [calcProfit, setCalcProfit] = useState<number>(7);
  const [calcTax, setCalcTax] = useState<number>(9);
  const [calcCopied, setCalcCopied] = useState<boolean>(false);

  const selectedBaseRate = calcKarat === '18K'
    ? gold18kRate
    : calcKarat === '24K'
    ? gold24kRate
    : silver925Rate;

  const rawTotal = calcWeight * selectedBaseRate;
  const craftTotal = rawTotal * (calcCraftsmanship / 100);
  const profitTotal = (rawTotal + craftTotal) * (calcProfit / 100);
  const taxTotal = (craftTotal + profitTotal) * (calcTax / 100);
  const finalPrice = Math.round(rawTotal + craftTotal + profitTotal + taxTotal);

  const filteredRates = activeTab === 'all' ? rates : rates.filter((r) => r.category === activeTab);

  // Key hero rates
  const keyRates = rates.filter((r) =>
    ['gold_18k', 'silver_999', 'gold_ounce', 'coin_emami', 'curr_usd'].includes(r.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* 1. HEADER & LIVE STATUS BAR */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition ${
        isDark 
          ? 'bg-gradient-to-r from-[#171520] via-[#14131A] to-[#0F0E14] border-stone-800 text-stone-100' 
          : 'bg-gradient-to-r from-[#FAF3EB] via-[#FDFBF7] to-[#F5ECE1] border-amber-200 text-stone-900'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>تابلو رسمی و لحظه‌ای بورس طلا، نقره و ارز</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif-luxury font-bold">
              نرخ آنلاین طلا، نقره، مسکوکات و ارز
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl">
              تمامی قیمت‌ها مستقیماً بر اساس آخرین اعلام اتحادیه صنف طلا و جواهر و قیمت انس جهانی به‌روزرسانی می‌شوند.
            </p>
          </div>

          {/* Controls: Live toggle & Manual Refresh */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={toggleLiveActive}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition ${
                isLiveActive
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                  : 'bg-stone-500/10 border-stone-500/40 text-stone-500'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>جریان زنده: {isLiveActive ? 'فعال (خودکار)' : 'متوقف'}</span>
            </button>

            <button
              onClick={refreshRates}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-2 transition shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>به‌روزرسانی آنی</span>
            </button>

            <div className="text-[11px] text-stone-400 flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>آخرین پایش: {lastUpdated.toLocaleTimeString('fa-IR')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. KEY HERO MARKET CARDS (GOLD 18K, SILVER 999, GOLD OUNCE, EMAMI COIN, DOLLAR) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {keyRates.map((rate) => {
          const isPos = rate.changePercent >= 0;
          return (
            <div
              key={rate.id}
              className={`p-4 rounded-2xl border transition hover:shadow-lg flex flex-col justify-between ${
                isDark ? 'bg-[#15141B] border-stone-800' : 'bg-white border-stone-200'
              }`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold text-stone-800 dark:text-stone-300">
                    {rate.title}
                  </span>
                  <span className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isPos
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                      : 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40'
                  }`}>
                    {isPos ? <ArrowUpRight className="w-3 h-3 ml-0.5" /> : <ArrowDownRight className="w-3 h-3 ml-0.5" />}
                    {rate.changePercent.toLocaleString('fa-IR')}%
                  </span>
                </div>

                <div className="mt-2">
                  <div className="text-lg sm:text-xl font-bold font-mono text-stone-900 dark:text-stone-100">
                    {rate.price.toLocaleString('fa-IR')}
                    <span className="text-xs text-stone-600 dark:text-stone-400 mr-1 font-sans">
                      {rate.unit.includes('دلار') ? '$' : 'ت'}
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-600 dark:text-stone-400 mt-0.5 font-mono font-medium">
                    بیشترین: {rate.high24h.toLocaleString('fa-IR')}
                  </div>
                </div>
              </div>

              {/* Mini Sparkline Simulation */}
              <div className="mt-3 pt-2 border-t border-stone-200 dark:border-stone-800/80 flex items-center justify-between">
                <span className="text-[10px] text-stone-700 dark:text-stone-400 font-medium">{rate.unit}</span>
                <div className="flex items-end gap-1 h-5">
                  {rate.history.map((val, i) => {
                    const min = Math.min(...rate.history);
                    const max = Math.max(...rate.history);
                    const range = max - min || 1;
                    const heightPercent = Math.max(20, ((val - min) / range) * 100);
                    return (
                      <div
                        key={i}
                        className={`w-1 rounded-t ${isPos ? 'bg-emerald-500' : 'bg-rose-500'}`}
                        style={{ height: `${heightPercent}%` }}
                        title={`${val.toLocaleString('fa-IR')}`}
                      />
                    );
                  })}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 3. TABS & DETAILED RATES TABLE */}
      <div className={`rounded-3xl border overflow-hidden transition ${
        isDark ? 'bg-[#15141B] border-stone-800' : 'bg-white border-stone-200'
      }`}>
        {/* Table Header Tabs */}
        <div className="p-4 sm:p-6 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            <h2 className="font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">فهرست کامل مظنه‌ها و شاخص‌های مالی</h2>
          </div>

          <div className="flex gap-2 overflow-x-auto text-xs font-semibold">
            {[
              { id: 'all', label: 'همه شاخص‌ها' },
              { id: 'gold', label: 'طلا و مظنه تهران' },
              { id: 'silver', label: 'نقره خام و استرلینگ' },
              { id: 'coin', label: 'انواع مسکوکات بانکی' },
              { id: 'currency', label: 'ارز و تتر' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-amber-600 text-white'
                    : isDark
                    ? 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                    : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Table */}
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-right">
            <thead className={isDark ? 'bg-stone-900/60 text-stone-300' : 'bg-stone-100 text-stone-800 font-bold'}>
              <tr>
                <th className="p-4">عنوان شاخص</th>
                <th className="p-4">نماد بین‌المللی</th>
                <th className="p-4">نرخ لحظه‌ای</th>
                <th className="p-4">واحد</th>
                <th className="p-4">تغییر ۲۴ ساعته</th>
                <th className="p-4">کمترین ۲۴س</th>
                <th className="p-4">بیشترین ۲۴س</th>
                <th className="p-4">حباب قیمتی</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {filteredRates.map((r) => {
                const isPos = r.changePercent >= 0;
                return (
                  <tr
                    key={r.id}
                    className="hover:bg-amber-500/5 transition cursor-pointer"
                  >
                    <td className="p-4 font-bold text-stone-900 dark:text-stone-100">
                      {r.title}
                    </td>
                    <td className="p-4 font-mono text-stone-500 dark:text-stone-400 text-[11px]">{r.symbol}</td>
                    <td className="p-4 font-bold font-mono text-amber-700 dark:text-amber-400 text-sm">
                      {r.price.toLocaleString('fa-IR')}
                    </td>
                    <td className="p-4 text-stone-800 dark:text-stone-300 font-medium">{r.unit}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center font-bold px-2 py-0.5 rounded text-[11px] ${
                        isPos
                          ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                          : 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40'
                      }`}>
                        {isPos ? '+' : ''}{r.changePercent.toLocaleString('fa-IR')}%
                      </span>
                    </td>
                    <td className="p-4 font-mono text-stone-800 dark:text-stone-300 font-medium">{r.low24h.toLocaleString('fa-IR')}</td>
                    <td className="p-4 font-mono text-stone-800 dark:text-stone-300 font-medium">{r.high24h.toLocaleString('fa-IR')}</td>
                    <td className="p-4 font-mono text-stone-700 dark:text-stone-400">
                      {r.bubble ? `${r.bubble.toLocaleString('fa-IR')} ت` : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. ONLINE GOLD CALCULATOR MODULE EMBEDDED IN THIS PAGE */}
      <div className={`p-6 sm:p-10 rounded-3xl border transition ${
        isDark ? 'bg-[#15141B] border-stone-800 text-stone-100' : 'bg-[#FAF7F2] border-amber-200 text-stone-900'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <Calculator className="w-4 h-4" />
              <span>محاسبه‌گر تعاملی و شفاف قیمت طلا بر اساس تابلوی فوق</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold leading-snug">
              پیش از خرید یا فروش، ارزش دقیق طلای خود را در ثانیه بسنجید
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              با استفاده از فرمول رسمی اتحادیه، وزن و درصد اجرت دلخواه خود را مشخص کنید تا تفکیک ریالی ارزش خام، اجرت، سود قانونی و مالیات را فوراً ملاحظه فرمایید.
            </p>

            {/* Karat Toggle */}
            <div className="flex gap-2 pt-2">
              {[
                { id: '18K', label: 'طلای ۱۸ عیار' },
                { id: '24K', label: 'طلای ۲۴ عیار' },
                { id: '925_SILVER', label: 'نقره ۹۲۵' },
              ].map((k) => (
                <button
                  key={k.id}
                  onClick={() => setCalcKarat(k.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                    calcKarat === k.id
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'border border-stone-300 dark:border-stone-800 hover:border-amber-400 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  {k.label}
                </button>
              ))}
            </div>

            {/* Sliders */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>وزن طلا (گرم):</span>
                  <span className="font-mono text-amber-600">{calcWeight} گرم</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="30"
                  step="0.1"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>درصد اجرت ساخت:</span>
                  <span className="font-mono text-amber-600">{calcCraftsmanship}٪</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="28"
                  step="1"
                  value={calcCraftsmanship}
                  onChange={(e) => setCalcCraftsmanship(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

          </div>

          {/* Right: Calculated Result Card */}
          <div className="lg:col-span-6">
            <div className={`p-6 rounded-2xl border space-y-3 shadow-xl ${
              isDark ? 'bg-stone-900/90 border-amber-900/40' : 'bg-white border-amber-300'
            }`}>
              <div className="font-bold text-xs text-amber-600 dark:text-amber-400 flex items-center justify-between border-b pb-2">
                <span>پیش‌فاکتور محاسبه آنلاین زرنشان</span>
                <span className="font-mono text-[11px]">
                  نرخ پایه: {selectedBaseRate.toLocaleString('fa-IR')} ت
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-stone-700 dark:text-stone-300 font-medium">
                  <span>ارزش خالص طلای خام:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {Math.round(rawTotal).toLocaleString('fa-IR')} تومان
                  </span>
                </div>

                <div className="flex justify-between text-stone-700 dark:text-stone-300 font-medium">
                  <span>اجرت ساخت ({calcCraftsmanship}٪):</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {Math.round(craftTotal).toLocaleString('fa-IR')} تومان
                  </span>
                </div>

                <div className="flex justify-between text-stone-700 dark:text-stone-300 font-medium">
                  <span>سود مصوب فروشنده (۷٪):</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {Math.round(profitTotal).toLocaleString('fa-IR')} تومان
                  </span>
                </div>

                <div className="flex justify-between text-stone-700 dark:text-stone-300 font-medium">
                  <span>مالیات بر ارزش افزوده ۹٪ (فقط اجرت و سود):</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {Math.round(taxTotal).toLocaleString('fa-IR')} تومان
                  </span>
                </div>

                <div className="pt-3 border-t border-dashed border-stone-300 dark:border-stone-700 flex justify-between font-bold text-sm sm:text-base">
                  <span className="text-amber-800 dark:text-amber-400">قیمت نهایی قابل پرداخت:</span>
                  <span className="text-amber-700 dark:text-amber-300 font-mono text-lg">
                    {finalPrice.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`محاسبه طلای زرنشان: ${calcWeight} گرم طلا، قیمت نهایی: ${finalPrice.toLocaleString('fa-IR')} تومان`);
                    setCalcCopied(true);
                    setTimeout(() => setCalcCopied(false), 2000);
                  }}
                  className="w-full py-2.5 rounded-xl border border-amber-500/50 hover:bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  {calcCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Sparkles className="w-4 h-4" />}
                  <span>{calcCopied ? 'جزئیات فاکتور کپی شد' : 'کپی مشخصات پیش‌فاکتور'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
