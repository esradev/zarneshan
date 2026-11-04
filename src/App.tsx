/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { MarketProvider } from './context/MarketContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { GoldCalculatorModal } from './components/GoldCalculatorModal';
import { RingSizerModal } from './components/RingSizerModal';

import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { LiveRatesView } from './views/LiveRatesView';
import { AboutView } from './views/AboutView';

import { Product, ProductCategory } from './types';
import { PRODUCTS } from './data/products';

export function AppContent() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [isSizerOpen, setIsSizerOpen] = useState<boolean>(false);

  // Parse view parameters like "shop?cat=ring" or "shop?q=..."
  const getShopParams = () => {
    if (!currentView.startsWith('shop')) return { cat: 'all' as ProductCategory, q: '' };
    const queryIdx = currentView.indexOf('?');
    if (queryIdx === -1) return { cat: 'all' as ProductCategory, q: '' };
    
    const params = new URLSearchParams(currentView.substring(queryIdx));
    const cat = (params.get('cat') as ProductCategory) || ('all' as ProductCategory);
    const q = params.get('q') || '';
    return { cat, q };
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView(`product-${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToShop = () => {
    setSelectedProduct(null);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateView = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find product if view is "product-[id]"
  useEffect(() => {
    if (currentView.startsWith('product-')) {
      const prodId = currentView.replace('product-', '');
      const found = PRODUCTS.find((p) => p.id === prodId);
      if (found) {
        setSelectedProduct(found);
      }
    }
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#0C0B0E] text-stone-900 dark:text-stone-100 transition-colors duration-300">
      {/* Global Header with Live Ticker & Monogram */}
      <Header
        currentView={currentView}
        setCurrentView={navigateView}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onSelectProduct={handleSelectProduct}
            setCurrentView={navigateView}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        )}

        {currentView.startsWith('shop') && (
          <ShopView
            onSelectProduct={handleSelectProduct}
            initialCategory={getShopParams().cat}
            initialSearchQuery={getShopParams().q}
          />
        )}

        {currentView.startsWith('product-') && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            onBack={handleBackToShop}
            onSelectProduct={handleSelectProduct}
            onOpenSizer={() => setIsSizerOpen(true)}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        )}

        {currentView === 'rates' && <LiveRatesView />}

        {currentView === 'about' && (
          <AboutView
            setCurrentView={navigateView}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        )}
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      
      <GoldCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        initialWeight={selectedProduct ? selectedProduct.weightGrams : 3.5}
        initialCraftsmanship={selectedProduct ? selectedProduct.craftsmanshipPercent : 14}
      />

      <RingSizerModal
        isOpen={isSizerOpen}
        onClose={() => setIsSizerOpen(false)}
      />

      {/* Global Footer */}
      <Footer
        setCurrentView={navigateView}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MarketProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </MarketProvider>
    </ThemeProvider>
  );
}
