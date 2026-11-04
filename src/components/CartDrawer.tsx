import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, ShoppingBag, ArrowLeft, Check, Sparkles, Printer } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMarket } from '../context/MarketContext';
import { useTheme } from '../context/ThemeContext';
import { GoldColor } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalItems,
    clearCart,
  } = useCart();
  const { calculateJewelryPrice, lastUpdated } = useMarket();
  const { isDark } = useTheme();

  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  if (!isCartOpen) return null;

  const colorLabels: Record<GoldColor, string> = {
    yellow: 'طلای زرد ۱۸ عیار',
    rose: 'طلای رزگلد',
    white: 'طلای سفید (رودیوم)',
    dual: 'طلای دو رنگ (زرد و سفید)',
  };

  // Aggregated calculations
  let totalWeightGrams = 0;
  let totalRawPrice = 0;
  let totalCraftsmanship = 0;
  let totalProfit = 0;
  let totalTax = 0;
  let grandTotal = 0;

  cart.forEach((item) => {
    const breakdown = calculateJewelryPrice(
      item.product.weightGrams,
      item.product.karat,
      item.product.craftsmanshipPercent
    );
    totalWeightGrams += item.product.weightGrams * item.quantity;
    totalRawPrice += breakdown.rawPrice * item.quantity;
    totalCraftsmanship += breakdown.craftsmanshipFee * item.quantity;
    totalProfit += breakdown.sellerProfit * item.quantity;
    totalTax += breakdown.tax * item.quantity;
    grandTotal += breakdown.totalPrice * item.quantity;
  });

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    setOrderSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div
          className={`w-screen max-w-md shadow-2xl flex flex-col transition-colors ${
            isDark ? 'bg-[#131218] text-stone-100' : 'bg-[#FAF7F2] text-stone-900'
          }`}
        >
          {/* Header */}
          <div
            className={`p-4 sm:p-5 border-b flex items-center justify-between ${
              isDark ? 'border-stone-800 bg-[#191822]' : 'border-stone-200 bg-[#F4ECE1]'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base">سبد خرید و پیش‌فاکتور طلا</h2>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {totalItems > 0 ? `${totalItems.toLocaleString('fa-IR')} قلم کالا` : 'سبد شما خالی است'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {orderSubmitted ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  پیش‌فاکتور با موفقیت ثبت شد
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  جناب / سرکار خانم {customerName} عزیز، پیش‌فاکتور شما در اتوماسیون زرنشان ثبت گردید. کارشناسان تشریفات گالری جهت هماهنگی ارسال بیمه‌شده با شماره {customerPhone} تماس خواهند گرفت.
                </p>
                <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-amber-500/5 text-right text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">کد رهگیری فاکتور:</span>
                    <span className="font-mono font-bold text-amber-600">ZN-982410-IR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">مبلغ نهایی:</span>
                    <span className="font-bold">{grandTotal.toLocaleString('fa-IR')} تومان</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">بسته‌بندی:</span>
                    <span>جعبه هاردباکس لوکس + شناسنامه هولوگرام‌دار</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    clearCart();
                    setOrderSubmitted(false);
                    setIsCartOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition"
                >
                  تکمیل و بازگشت به فروشگاه
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium text-stone-500">سبد خرید شما در حال حاضر خالی است.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition"
                >
                  مشاهده ویترین طلا و جواهرات
                </button>
              </div>
            ) : (
              <>
                {/* List of items */}
                <div className="space-y-3">
                  {cart.map((item, idx) => {
                    const breakdown = calculateJewelryPrice(
                      item.product.weightGrams,
                      item.product.karat,
                      item.product.craftsmanshipPercent
                    );
                    const itemTotal = breakdown.totalPrice * item.quantity;

                    return (
                      <div
                        key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                        className={`p-3 rounded-xl border flex gap-3 transition ${
                          isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200'
                        }`}
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-20 h-20 object-cover rounded-lg shrink-0 border border-amber-500/20"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between">
                              <h4 className="text-xs font-bold line-clamp-1">{item.product.title}</h4>
                              <button
                                onClick={() =>
                                  removeFromCart(
                                    item.product.id,
                                    item.selectedColor,
                                    item.selectedSize
                                  )
                                }
                                className="text-stone-400 hover:text-rose-500 p-1 transition"
                                title="حذف"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 flex flex-wrap gap-2">
                              <span>عیار: {item.product.karatFa}</span>
                              <span>وزن: {item.product.weightGrams} گرم</span>
                              {item.selectedSize && <span>سایز: {item.selectedSize}</span>}
                            </div>
                            <div className="text-[10px] text-amber-700 dark:text-amber-400 mt-0.5">
                              {colorLabels[item.selectedColor]} • اجرت {item.product.craftsmanshipPercent}٪
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800/80">
                            <span className="font-bold text-xs text-amber-600 dark:text-amber-400">
                              {itemTotal.toLocaleString('fa-IR')} تومان
                            </span>
                            <div className="flex items-center gap-1.5 border border-stone-200 dark:border-stone-700 rounded-lg p-0.5">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.selectedColor,
                                    item.quantity - 1,
                                    item.selectedSize
                                  )
                                }
                                className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 rounded text-stone-500"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold px-1.5 font-mono">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.selectedColor,
                                    item.quantity + 1,
                                    item.selectedSize
                                  )
                                }
                                className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 rounded text-stone-500"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Clear Cart */}
                <div className="text-left">
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-stone-400 hover:text-rose-500 underline"
                  >
                    خالی کردن سبد خرید
                  </button>
                </div>

                {/* Real-time Detailed Invoice Breakdown */}
                <div
                  className={`p-4 rounded-xl border text-xs space-y-2 ${
                    isDark ? 'bg-stone-900/80 border-stone-800' : 'bg-[#F2ECE3] border-amber-200/80'
                  }`}
                >
                  <div className="font-bold text-xs text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-800 pb-2 flex justify-between">
                    <span>تفکیک فاکتور رسمی اتحادیه</span>
                    <span className="text-[10px] text-amber-600 font-normal">
                      وزن کل: {totalWeightGrams.toFixed(2)} گرم
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-700 dark:text-stone-300 font-medium">
                    <span>ارزش خالص طلای خام:</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 font-mono">{Math.round(totalRawPrice).toLocaleString('fa-IR')} تومان</span>
                  </div>

                  <div className="flex justify-between text-stone-700 dark:text-stone-300 font-medium">
                    <span>مجموع اجرت ساخت:</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 font-mono">{Math.round(totalCraftsmanship).toLocaleString('fa-IR')} تومان</span>
                  </div>

                  <div className="flex justify-between text-stone-700 dark:text-stone-300 font-medium">
                    <span>سود مصوب اتحادیه (۷٪):</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 font-mono">{Math.round(totalProfit).toLocaleString('fa-IR')} تومان</span>
                  </div>

                  <div className="flex justify-between text-stone-700 dark:text-stone-300 font-medium">
                    <span>مالیات بر ارزش افزوده ۹٪ (فقط اجرت و سود):</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 font-mono">{Math.round(totalTax).toLocaleString('fa-IR')} تومان</span>
                  </div>

                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                    <span>هزینه بیمه‌نامه و ارسال ویژه امنیتی:</span>
                    <span>رایگان (هدیه زرنشان)</span>
                  </div>

                  <div className="pt-2 border-t border-stone-300 dark:border-stone-700 flex justify-between font-bold text-sm">
                    <span className="text-amber-800 dark:text-amber-400">مبلغ کل قابل پرداخت:</span>
                    <span className="text-amber-700 dark:text-amber-300 font-mono text-base">
                      {grandTotal.toLocaleString('fa-IR')} تومان
                    </span>
                  </div>
                </div>

                {/* Customer Info Form for Quick Checkout */}
                <form onSubmit={handleCheckoutSubmit} className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-stone-600 dark:text-stone-300">
                    مشخصات تحویل‌گیرنده جهت صدور فاکتور:
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="نام و نام خانوادگی خریدار"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                        isDark ? 'bg-stone-900 border-stone-700 text-white' : 'bg-white border-stone-300 text-stone-900'
                      }`}
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="شماره تماس همراه (جهت احراز و پیامک بیمه)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                        isDark ? 'bg-stone-900 border-stone-700 text-white' : 'bg-white border-stone-300 text-stone-900'
                      }`}
                    />
                  </div>
                  <div>
                    <textarea
                      rows={2}
                      placeholder="آدرس دقیق پستی جهت ارسال با مامور ویژه"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                        isDark ? 'bg-stone-900 border-stone-700 text-white' : 'bg-white border-stone-300 text-stone-900'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>تایید و صدور فاکتور رسمی خرید</span>
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Footer note */}
          <div
            className={`p-3 text-center text-[10px] text-stone-400 border-t ${
              isDark ? 'border-stone-800 bg-[#16151E]' : 'border-stone-200 bg-[#F4ECE1]'
            }`}
          >
            گارانتی مرجوعی تا ۷ روز کاری و بازخرید دائمی طلا با قیمت روز تابلو
          </div>
        </div>
      </div>
    </div>
  );
};
