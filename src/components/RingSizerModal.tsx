import React, { useState } from 'react';
import { X, Ruler, Check, HelpCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface RingSizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: string) => void;
}

export const RingSizerModal: React.FC<RingSizerModalProps> = ({
  isOpen,
  onClose,
  onSelectSize,
}) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'ring' | 'bracelet'>('ring');
  const [selectedCircumference, setSelectedCircumference] = useState<number>(54);

  if (!isOpen) return null;

  const ringSizes = [
    { size: '48', mmCircumference: 48.0, mmDiameter: 15.3, standard: 'زنانه بسیار ظریف' },
    { size: '50', mmCircumference: 50.0, mmDiameter: 15.9, standard: 'زنانه ظریف' },
    { size: '52', mmCircumference: 52.0, mmDiameter: 16.5, standard: 'زنانه متداول' },
    { size: '54', mmCircumference: 54.0, mmDiameter: 17.2, standard: 'زنانه متوسط' },
    { size: '56', mmCircumference: 56.0, mmDiameter: 17.8, standard: 'زنانه درشت / مردانه ظریف' },
    { size: '58', mmCircumference: 58.0, mmDiameter: 18.5, standard: 'مردانه متوسط' },
    { size: '60', mmCircumference: 60.0, mmDiameter: 19.1, standard: 'مردانه متداول' },
    { size: '62', mmCircumference: 62.0, mmDiameter: 19.7, standard: 'مردانه درشت' },
  ];

  const bangleSizes = [
    { size: 'سایز ۱', circumference: '۱۵ الی ۱۶.۵ سانتی‌متر', note: 'مناسب مچ دست‌های بسیار لاغر و باریک' },
    { size: 'سایز ۲', circumference: '۱۶.۵ الی ۱۸ سانتی‌متر', note: 'استاندارد‌ترین سایز مچ بانوان ایرانی' },
    { size: 'سایز ۳', circumference: '۱۸ الی ۱۹.۵ سانتی‌متر', note: 'مناسب مچ دست‌های تپل‌تر یا استفاده آزادتر' },
    { size: 'سایز ۴', circumference: '۱۹.۵ الی ۲۱ سانتی‌متر', note: 'سایز بزرگ زنانه و دستبندهای زنجیری مردانه' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`relative w-full max-w-xl rounded-2xl shadow-2xl border overflow-hidden transition-all ${
        isDark ? 'bg-[#15141B] border-stone-800 text-stone-100' : 'bg-[#FDFBF7] border-stone-200 text-stone-900'
      }`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDark ? 'border-stone-800 bg-[#1A1922]' : 'border-stone-200 bg-[#F4ECE1]'
        }`}>
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-base">راهنمای هوشمند تعیین سایز جواهرات</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('ring')}
            className={`flex-1 py-3 text-center transition ${
              activeTab === 'ring'
                ? 'border-b-2 border-amber-500 text-amber-600 dark:text-amber-400'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
            }`}
          >
            راهنمای سایز انگشتر و حلقه
          </button>
          <button
            onClick={() => setActiveTab('bracelet')}
            className={`flex-1 py-3 text-center transition ${
              activeTab === 'bracelet'
                ? 'border-b-2 border-amber-500 text-amber-600 dark:text-amber-400'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
            }`}
          >
            راهنمای سایز دستبند و النگو
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5">
          {activeTab === 'ring' ? (
            <>
              {/* Instructions */}
              <div className="p-3 rounded-xl bg-amber-500/10 text-xs text-amber-900 dark:text-amber-300 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  چگونه سایز دقیق انگشت خود را پیدا کنیم؟
                </div>
                <p>
                  ۱. یک نوار کاغذی یا نخ را دور برجسته‌ترین بند انگشت خود بپیچید.<br />
                  ۲. نقطه اتصال دو سر نخ را با خودکار علامت زده و با خط‌کش اندازه بگیرید (به میلی‌متر).<br />
                  ۳. عدد به دست آمده محیط انگشت شماست. از جدول زیر سایز متناظر را انتخاب کنید:
                </p>
              </div>

              {/* Table */}
              <div className="rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden text-xs">
                <table className="w-full text-right">
                  <thead className={isDark ? 'bg-stone-900 text-amber-400' : 'bg-amber-100/70 text-amber-900'}>
                    <tr>
                      <th className="p-2.5">سایز انگشتر</th>
                      <th className="p-2.5">محیط انگشت (mm)</th>
                      <th className="p-2.5">قطر داخلی (mm)</th>
                      <th className="p-2.5">توضیحات</th>
                      <th className="p-2.5">انتخاب</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                    {ringSizes.map((row) => (
                      <tr 
                        key={row.size}
                        className={`hover:bg-amber-500/5 transition cursor-pointer ${
                          selectedCircumference === row.mmCircumference ? 'bg-amber-500/15' : ''
                        }`}
                        onClick={() => setSelectedCircumference(row.mmCircumference)}
                      >
                        <td className="p-2.5 font-bold font-mono text-amber-700 dark:text-amber-400">
                          {row.size}
                        </td>
                        <td className="p-2.5 font-mono text-stone-900 dark:text-stone-100">{row.mmCircumference.toLocaleString('fa-IR')}</td>
                        <td className="p-2.5 font-mono text-stone-900 dark:text-stone-100">{row.mmDiameter.toLocaleString('fa-IR')}</td>
                        <td className="p-2.5 text-stone-800 dark:text-stone-300 font-medium">{row.standard}</td>
                        <td className="p-2.5">
                          {onSelectSize && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectSize(row.size);
                                onClose();
                              }}
                              className="px-2 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white text-[11px]"
                            >
                              انتخاب
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-xs text-amber-900 dark:text-amber-300">
                <p>
                  برای دستبند، نوار متر را دور باریک‌ترین بخش مچ دست بپیچید و ۲ سانتی‌متر به آن اضافه کنید تا دستبند روی دست به راحتی حرکت کند.
                </p>
              </div>

              <div className="grid gap-2.5">
                {bangleSizes.map((b) => (
                  <div
                    key={b.size}
                    className={`p-3.5 rounded-xl border flex items-center justify-between text-xs transition ${
                      isDark ? 'border-stone-800 bg-stone-900/60' : 'border-stone-200 bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-amber-600 dark:text-amber-400 mb-0.5">
                        {b.size}
                      </div>
                      <div className="text-stone-600 dark:text-stone-300 font-mono">
                        محیط مچ: {b.circumference}
                      </div>
                      <div className="text-[11px] text-stone-400 mt-1">{b.note}</div>
                    </div>
                    {onSelectSize && (
                      <button
                        onClick={() => {
                          onSelectSize(b.size);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition text-xs"
                      >
                        انتخاب این سایز
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`px-6 py-3 border-t text-xs flex justify-between items-center ${
          isDark ? 'border-stone-800 bg-[#1A1922]' : 'border-stone-200 bg-[#F4ECE1]'
        }`}>
          <span className="text-stone-400 text-[11px]">
            * تغییر سایز اول پس از خرید در گالری زرنشان به صورت کاملاً رایگان انجام می‌پذیرد.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-300 dark:bg-stone-700 text-stone-800 dark:text-stone-200 font-medium"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
