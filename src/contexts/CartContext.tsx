import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Cart, CartContextType, Product } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('mobileStoreCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('mobileStoreCart', JSON.stringify(cart));
  }, [cart]);

  // Calculate totals whenever items change
  useEffect(() => {
    const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    
    setCart(prev => ({
      ...prev,
      total,
      itemCount,
    }));
  }, [cart.items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existingItemIndex = prev.items.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = [...prev.items];
        updatedItems[existingItemIndex].quantity += quantity;
        return {
          ...prev,
          items: updatedItems,
        };
      } else {
        // Add new item
        return {
          ...prev,
          items: [...prev.items, { product, quantity }],
        };
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(item => item.product.id !== productId),
    }));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prev => {
      const updatedItems = prev.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0,
    });
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};