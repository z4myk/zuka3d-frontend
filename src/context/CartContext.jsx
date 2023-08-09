import React from 'react'
import { createContext, useContext, useState} from "react";
import {useProductStore} from '../hooks/useProductStore';
export const CartContext = createContext();



export function useCartContext() {
    return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item._id === product._id);
    if (existingProduct) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId
          ? item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : null // Devuelve null si la cantidad es 1 para eliminarlo del carrito
          : item
      ).filter((item) => item !== null) // Filtra y elimina los elementos con cantidad 1
    );
  };

  const handleQuantityChange = (productId, value) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity + value } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const incrementCart = (productId) => {
    setCartItems((prevItems) =>
    prevItems.map((item) =>
      item._id === productId
        ? item.quantity > 1 || item.quantity === 1
          ? { ...item, quantity: item.quantity + 1 }
          : null // Devuelve null si la cantidad es 1 para eliminarlo del carrito
        : item))


  }


  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalPrice,
        getTotalQuantity,
        handleQuantityChange,
        incrementCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};