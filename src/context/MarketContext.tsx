import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { LiveRate, KaratType } from '../types';
import { INITIAL_RATES } from '../data/liveRates';

export interface PriceBreakdown {
  rawMaterialRate: number; // نرخ خام طلا یا نقره به ازای هر گرم
  rawPrice: number; // قیمت ماده خام (وزن × نرخ)
  craftsmanshipFee: number; // اجرت ساخت
  sellerProfit: number; // سود طلافروش (۷٪)
  tax: number; // مالیات بر ارزش افزوده (۹٪ بر مجموع اجرت و سود)
  totalPrice: number; // قیمت نهایی
  formattedTotal: string;
}

interface MarketContextType {
  rates: LiveRate[];
  lastUpdated: Date;
  isLiveActive: boolean;
  toggleLiveActive: () => void;
  refreshRates: () => void;
  gold18kRate: number;
  gold24kRate: number;
  silver999Rate: number;
  silver925Rate: number;
  calculateJewelryPrice: (
    weightGrams: number,
    karat: KaratType,
    craftsmanshipPercent: number,
    profitPercent?: number,
    taxPercent?: number
  ) => PriceBreakdown;
  getRateById: (id: string) => LiveRate | undefined;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rates, setRates] = useState<LiveRate[]>(INITIAL_RATES);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);

  // Manual or auto simulated fluctuations for market realism
  const fluctuateRates = useCallback(() => {
    setRates((currentRates) =>
      currentRates.map((rate) => {
        // Subtle fluctuation: between -0.15% and +0.2%
        const deltaFactor = 1 + (Math.random() * 0.003 - 0.0012);
        const newPrice = rate.category === 'currency' && rate.unit === 'تومان'
          ? Math.round((rate.price * deltaFactor) / 50) * 50
          : rate.category === 'gold' && rate.unit.includes('تومان')
          ? Math.round((rate.price * deltaFactor) / 1000) * 1000
          : Number((rate.price * deltaFactor).toFixed(2));

        const baseInitial = INITIAL_RATES.find((r) => r.id === rate.id)?.price || rate.price;
        const newPercent = Number((((newPrice - baseInitial) / baseInitial) * 100).toFixed(2));
        
        // update 24h highs & lows
        const newHigh = Math.max(rate.high24h, newPrice);
        const newLow = Math.min(rate.low24h, newPrice);
        const newHistory = [...rate.history.slice(1), newPrice];

        return {
          ...rate,
          price: newPrice,
          changePercent: newPercent,
          high24h: newHigh,
          low24h: newLow,
          history: newHistory,
        };
      })
    );
    setLastUpdated(new Date());
  }, []);

  const refreshRates = () => {
    fluctuateRates();
  };

  useEffect(() => {
    if (!isLiveActive) return;
    const interval = setInterval(() => {
      fluctuateRates();
    }, 7000); // realistic gentle update interval
    return () => clearInterval(interval);
  }, [isLiveActive, fluctuateRates]);

  const gold18kRate = rates.find((r) => r.id === 'gold_18k')?.price || 4450000;
  const gold24kRate = rates.find((r) => r.id === 'gold_24k')?.price || 5933000;
  const silver999Rate = rates.find((r) => r.id === 'silver_999')?.price || 68500;
  const silver925Rate = rates.find((r) => r.id === 'silver_925')?.price || 63360;

  const calculateJewelryPrice = useCallback(
    (
      weightGrams: number,
      karat: KaratType,
      craftsmanshipPercent: number,
      profitPercent: number = 7, // 7% standard union rate
      taxPercent: number = 9 // 9% VAT on craftsmanship & profit
    ): PriceBreakdown => {
      let rawMaterialRate = gold18kRate;
      if (karat === '24K') rawMaterialRate = gold24kRate;
      if (karat === '925_SILVER') rawMaterialRate = silver925Rate;

      // 1. Raw Gold Value
      const rawPrice = weightGrams * rawMaterialRate;

      // 2. Craftsmanship Fee (اجرت ساخت)
      const craftsmanshipFee = rawPrice * (craftsmanshipPercent / 100);

      // 3. Seller's Profit (۷٪ سود مصوب اتحادیه طلا)
      const sellerProfit = (rawPrice + craftsmanshipFee) * (profitPercent / 100);

      // 4. VAT (۹٪ فقط بر اجرت ساخت و سود، طبق قانون جدید مالیات طلا در ایران اصل طلا معاف است)
      const tax = (craftsmanshipFee + sellerProfit) * (taxPercent / 100);

      // 5. Total Price
      const totalPrice = Math.round(rawPrice + craftsmanshipFee + sellerProfit + tax);

      return {
        rawMaterialRate,
        rawPrice: Math.round(rawPrice),
        craftsmanshipFee: Math.round(craftsmanshipFee),
        sellerProfit: Math.round(sellerProfit),
        tax: Math.round(tax),
        totalPrice,
        formattedTotal: totalPrice.toLocaleString('fa-IR'),
      };
    },
    [gold18kRate, gold24kRate, silver925Rate]
  );

  const getRateById = (id: string) => rates.find((r) => r.id === id);

  return (
    <MarketContext.Provider
      value={{
        rates,
        lastUpdated,
        isLiveActive,
        toggleLiveActive: () => setIsLiveActive((prev) => !prev),
        refreshRates,
        gold18kRate,
        gold24kRate,
        silver999Rate,
        silver925Rate,
        calculateJewelryPrice,
        getRateById,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) throw new Error('useMarket must be used within MarketProvider');
  return context;
};
