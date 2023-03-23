import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
      { ...cartItem, quantity: cartItem.quantity + 1 } :
      cartItem
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ?
      { ...cartItem, quantity: cartItem.quantity - 1 } :
      cartItem
    )
}

const clearCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  total: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newCount = cartItems.reduce((acc, item) =>  acc + item.quantity, 0);
    setCartCount(newCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) =>  acc + item.quantity * item.price, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }

  const clearItemFromCart = (cartItemToRemove) => {
    setCartItems(clearCartItem(cartItems, cartItemToRemove));
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    total
  };

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  )
}
