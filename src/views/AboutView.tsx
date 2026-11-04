import React from 'react';
import { Award, ShieldCheck, CheckCircle2, MapPin, Phone, Clock, FileText, Gem, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AboutViewProps {
  setCurrentView: (view: string) => void;
  onOpenCalculator: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setCurrentView, onOpenCalculator }) => {
  const { isDark } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. HERO */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
          <Award className="w-4 h-4" />
          <span>اصالت، هنر و تخصص با بیش از ۳ دهه سابقه</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-stone-900 dark:text-stone-100">
          داستان شکوه و اصالت گالری زرنشان
        </h1>
        <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed">
          ما در زرنشان، طلا را صرفاً یک فلز گرانبها یا ابزار سرمایه‌گذاری نمی‌دانیم؛ بلکه آن را راوی پیوندها، یادگارهای ماندگار خانوادگی و تجلی هنر اصیل ایرانی در عصر مدرن می‌شناسیم.
        </p>
      </div>

      {/* 2. THE 4 PILLARS OF AUTHENTICITY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl border transition ${
          isDark ? 'bg-[#15141B] border-stone-800' : 'bg-white border-stone-200'
        }`}>
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">
            عیارسنجی آزمایشگاهی (ری‌گیری رسمی)
          </h3>
          <p className="text-xs text-stone-700 dark:text-stone-300 font-medium leading-relaxed">
            تمامی مصنوعات گالری زرنشان پیش از عرضه، در آزمایشگاه‌های معتبر ری‌گیری تهران مورد سنجش کوپلاسیون قرار گرفته و دارای کد رهگیری استاندارد (T) بر روی فاکتور رسمی هستند.
          </p>
        </div>

        <div className={`p-6 rounded-2xl border transition ${
          isDark ? 'bg-[#15141B] border-stone-800' : 'bg-white border-stone-200'
        }`}>
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center mb-4">
            <Gem className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">
            شناسنامه الماس و گوهرشناسی
          </h3>
          <p className="text-xs text-stone-700 dark:text-stone-300 font-medium leading-relaxed">
            برلیان‌ها و سنگ‌های قیمتی به کار رفته در زیورآلات، دارای دفترچه شناسنامه مشخصات تراش (Cut)، رنگ (Color)، پاکی (Clarity) و وزن قیراط همراه با گارانتی مادام‌العمر می‌باشند.
          </p>
        </div>

        <div className={`p-6 rounded-2xl border transition ${
          isDark ? 'bg-[#15141B] border-stone-800' : 'bg-white border-stone-200'
        }`}>
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">
            شفافیت مالیاتی و حذف واسطه‌ها
          </h3>
          <p className="text-xs text-stone-700 dark:text-stone-300 font-medium leading-relaxed">
            با اجرای دقیق قانون معافیت اصل طلا از ارزش افزوده و فرمول مصوب اتحادیه طلا و جواهر کشور، شما دقیقاً می‌دانید بابت هر گرم طلا و اجرت چه مبلغی پرداخت می‌کنید.
          </p>
        </div>
      </div>

      {/* 3. SHOWROOM & VISIT */}
      <div className={`p-8 sm:p-12 rounded-3xl border transition ${
        isDark ? 'bg-[#15141B] border-stone-800' : 'bg-[#FAF6F0] border-amber-200'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold">
              بازدید حضوری از شوروم مرکزی زرنشان
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              علاقه‌مندان به مشاهده از نزدیک جواهرات و مشاوره سرمایه‌گذاری شمش می‌توانند با هماهنگی قبلی یا مراجعه در ساعات کاری، میهمان فضای آرامش‌بخش شوروم VIP زرنشان باشند.
            </p>

            <div className="space-y-2.5 text-xs text-stone-700 dark:text-stone-300 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>تهران، خیابان کریمخان زند، تقاطع نجات‌اللهی، برج طلای زرنشان، طبقه ۲</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>شماره تماس هماهنگی: ۰۲۱-۸۸۹۹۰۰۱۱ و ۰۲۱-۸۸۹۹۰۰۲۲</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>ساعات پذیرایی: شنبه تا پنج‌شنبه ۱۰:۰۰ صبح الی ۲۰:۳۰ عصر</span>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => setCurrentView('shop')}
                className="px-6 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition"
              >
                مشاهده ویترین آنلاین
              </button>
              <button
                onClick={onOpenCalculator}
                className="px-6 py-2.5 rounded-xl border border-amber-600 text-amber-700 dark:text-amber-300 font-semibold text-xs hover:bg-amber-500/10 transition"
              >
                محاسبه‌گر قیمت طلا
              </button>
            </div>
          </div>

          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-amber-500/20">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
              alt="شوروم طلای زرنشان"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
