export type KaratType = '18K' | '24K' | '925_SILVER';

export type GoldColor = 'yellow' | 'rose' | 'white' | 'dual';

export type StoneType = 'none' | 'diamond' | 'zirconia' | 'ruby_emerald' | 'pearl';

export type ProductCategory = 
  | 'all'
  | 'ring'
  | 'necklace'
  | 'bracelet'
  | 'earring'
  | 'set'
  | 'bullion_coin'
  | 'silver';

export interface Product {
  id: string;
  title: string;
  englishTitle: string;
  category: ProductCategory;
  categoryFa: string;
  karat: KaratType;
  karatFa: string;
  weightGrams: number; // in grams e.g. 3.45
  craftsmanshipPercent: number; // e.g. 14 (%)
  stoneType: StoneType;
  stoneFa: string;
  colors: GoldColor[];
  defaultColor: GoldColor;
  basePrice: number; // calculated dynamically or fixed base in Tomans
  image: string;
  gallery: string[];
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  isInvestment?: boolean; // کم‌اجرت یا شمش سرمایه‌گذاری
  description: string;
  specs: {
    dimensions?: string;
    gaugeCode: string; // کد استاندارد اتحادیه / ری‌گیری
    certificateType: string;
    warranty: string;
    giftBox: string;
  };
  sizes?: string[]; // e.g. ['50', '52', '54', '56']
}

export interface LiveRate {
  id: string;
  title: string;
  englishTitle: string;
  symbol: string;
  price: number; // in Tomans or USD for Ounce
  unit: string;
  changePercent: number;
  high24h: number;
  low24h: number;
  bubble?: number; // حباب قیمتی برای سکه‌ها
  category: 'gold' | 'silver' | 'coin' | 'currency';
  history: number[]; // 7 points for mini sparkline
}

export interface CartItem {
  product: Product;
  selectedColor: GoldColor;
  selectedSize?: string;
  quantity: number;
  calculatedPricePerUnit: number;
}

export interface FilterState {
  category: ProductCategory;
  minPrice: number;
  maxPrice: number;
  minWeight: number;
  maxWeight: number;
  karats: KaratType[];
  stoneTypes: StoneType[];
  colors: GoldColor[];
  investmentOnly: boolean;
  inStockOnly: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'newest' | 'price_asc' | 'price_desc' | 'weight_asc' | 'weight_desc';
}
