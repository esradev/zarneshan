import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, GoldColor } from '../types';
import { useMarket } from './MarketContext';

interface CartContextType {
  cart: CartItem[];
  wishlist: string[]; // product IDs
  addToCart: (product: Product, selectedColor: GoldColor, selectedSize?: string, quantity?: number) => void;
  removeFromCart: (productId: string, selectedColor: GoldColor, selectedSize?: string) => void;
  updateQuantity: (productId: string, selectedColor: GoldColor, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  totalAmount: number;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { calculateJewelryPrice } = useMarket();

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zarneshan_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zarneshan_wishlist');
      return saved ? JSON.parse(saved) : ['zar-ring-01', 'zar-ring-02'];
    } catch {
      return ['zar-ring-01', 'zar-ring-02'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('zarneshan_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('zarneshan_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (
    product: Product,
    selectedColor: GoldColor,
    selectedSize?: string,
    quantity: number = 1
  ) => {
    const priceInfo = calculateJewelryPrice(
      product.weightGrams,
      product.karat,
      product.craftsmanshipPercent
    );

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        newCart[existingIndex].calculatedPricePerUnit = priceInfo.totalPrice;
        return newCart;
      }

      return [
        ...prevCart,
        {
          product,
          selectedColor,
          selectedSize: selectedSize || (product.sizes ? product.sizes[0] : undefined),
          quantity,
          calculatedPricePerUnit: priceInfo.totalPrice,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedColor: GoldColor, selectedSize?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          )
      )
    );
  };

  const updateQuantity = (
    productId: string,
    selectedColor: GoldColor,
    quantity: number,
    selectedSize?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor, selectedSize);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalAmount = cart.reduce((acc, item) => {
    const priceInfo = calculateJewelryPrice(
      item.product.weightGrams,
      item.product.karat,
      item.product.craftsmanshipPercent
    );
    return acc + priceInfo.totalPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        totalAmount,
        isCheckoutOpen,
        setIsCheckoutOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
