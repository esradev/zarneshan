import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  Phone, 
  MapPin, 
  Mail, 
  Instagram, 
  Send, 
  Clock,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  setCurrentView: (view: string) => void;
  onOpenCalculator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView, onOpenCalculator }) => {
  const { isDark } = useTheme();

  return (
    <footer className={`border-t transition-colors duration-300 ${
      isDark ? 'bg-[#0A090D] border-stone-800 text-stone-300' : 'bg-[#F5EFE6] border-stone-200 text-stone-800'
    }`}>
      {/* 1. LUXURY TRUST PILLARS (برگرفته از استانداردهای فاخر تصویر ۲) */}
      <div className={`border-b ${isDark ? 'border-stone-800/80 bg-[#0F0E14]' : 'border-amber-200/50 bg-[#EFE6D8]'}`}>
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                ضمانت اصالت ۱۸ و ۲۴ عیار
              </h4>
              <p className="text-[11px] text-stone-700 dark:text-stone-300 font-medium mt-0.5">
                تاییدیه رسمی ری‌گیری و کد استاندارد ملی
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                ارسال امن و بیمه‌شده
              </h4>
              <p className="text-[11px] text-stone-700 dark:text-stone-300 font-medium mt-0.5">
                پوشش کامل ۱۰۰٪ خسارت با مامور اختصاصی
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                فاکتور رسمی هولوگرام‌دار
              </h4>
              <p className="text-[11px] text-stone-700 dark:text-stone-300 font-medium mt-0.5">
                معتبر در سراسر اتحادیه طلا و جواهر کشور
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                ۷ روز ضمانت تعویض و بازخرید
              </h4>
              <p className="text-[11px] text-stone-700 dark:text-stone-300 font-medium mt-0.5">
                خرید مجدد به نرخ آنلاین لحظه‌ای تابلو
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-amber-500/60 flex items-center justify-center bg-amber-500/10">
                <span className="font-serif-luxury text-lg font-bold text-amber-500">ZN</span>
              </div>
              <div>
                <span className="font-serif-luxury text-xl font-bold text-stone-900 dark:text-amber-300">
                  زرنشان
                </span>
                <span className="block text-[9px] tracking-widest uppercase text-amber-600 dark:text-amber-400">
                  Haute Joaillerie & Gold Boutique
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-300 leading-relaxed font-normal">
              گالری طلای زرنشان، پیشگام در طراحی اختصاصی طلا و جواهرات لوکس با بیش از سه دهه اصالت و فعالیت مستمر. تلفیق هنر دست استادکاران فاخر با تکنولوژی روز تراش برلیان و محاسبه آنلاین و شفاف قیمت طلا.
            </p>

            <div className="pt-2 flex items-center gap-3 text-stone-500 dark:text-stone-400">
              <a href="#instagram" className="p-2 rounded-full border border-stone-300 dark:border-stone-800 hover:text-amber-500 hover:border-amber-500 transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#telegram" className="p-2 rounded-full border border-stone-300 dark:border-stone-800 hover:text-amber-500 hover:border-amber-500 transition">
                <Send className="w-4 h-4" />
              </a>
              <a href="tel:02188990011" className="p-2 rounded-full border border-stone-300 dark:border-stone-800 hover:text-amber-500 hover:border-amber-500 transition">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400">
              دسترسی سریع
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView('home')}
                  className="hover:text-amber-600 dark:hover:text-amber-300 transition"
                >
                  صفحه اصلی
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="hover:text-amber-600 dark:hover:text-amber-300 transition"
                >
                  ویترین تمام طلا و جواهرات
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('rates')}
                  className="hover:text-amber-600 dark:hover:text-amber-300 transition"
                >
                  تابلو زنده قیمت طلا و نقره
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCalculator}
                  className="hover:text-amber-600 dark:hover:text-amber-300 transition"
                >
                  محاسبه‌گر شفاف قیمت طلا
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-amber-600 dark:hover:text-amber-300 transition"
                >
                  شناسنامه اصالت و عیارسنجی
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400">
              کالکشن‌ها
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView('shop?cat=ring')}
                  className="hover:text-amber-600 dark:hover:text-amber-300 transition"
                >
                  انگشتر و حلقه‌های ست ازدواج
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('shop?cat=bracelet')}
                  className="hover:text-amber-600 dark:hover:text-amber-300 transition"
                >
                  دستبندهای النگویی و کارتیه
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('shop?cat=necklace')}
                  className="hover:text-amber-600 dark:hover:text-amber-300 transition"
                >
                  گردنبند، مدال و مروارید
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('shop?cat=bullion_coin')}
                  className="hover:text-amber-600 dark:hover:text-amber-300 transition"
                >
                  شمش ۲۴ عیار و طلای سرمایه‌گذاری
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('shop?cat=silver')}
                  className="hover:text-amber-600 dark:hover:text-amber-300 transition"
                >
                  زیورآلات دست‌ساز نقره استرلینگ ۹۲۵
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom & Contact Info */}
          <div className="space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400">
              دفتر مرکزی و شوروم حضوری
            </h5>
            <div className="space-y-2.5 text-xs text-stone-600 dark:text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>تهران، خیابان کریمخان زند، تقاطع نجات‌اللهی، برج طلای زرنشان، طبقه ۲</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-mono">۰۲۱-۸۸۹۹۰۰۱۱ | ۰۲۱-۸۸۹۹۰۰۲۲</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>شنبه تا پنج‌شنبه: ۱۰:۰۰ الی ۲۰:۳۰</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="p-2.5 rounded-xl border border-dashed border-amber-500/40 text-[11px] text-amber-800 dark:text-amber-300">
                امکان رزرو وقت بازدید اختصاصی و مشاوره حضوری سرمایه‌گذاری طلا
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. COPYRIGHT */}
      <div className={`py-4 border-t text-center text-xs text-stone-500 ${
        isDark ? 'border-stone-800/80 bg-black/40' : 'border-stone-200 bg-[#EBE2D4]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} تمامی حقوق مادی و معنوی متعلق به گالری طلای زرنشان است.
          </span>
          <span className="text-[11px]">
            عضو رسمی اتحادیه طلا، جواهر، نقره و سکه تهران • مجوز صنفی ۹۸۲۴
          </span>
        </div>
      </div>
    </footer>
  );
};
