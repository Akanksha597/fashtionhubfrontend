// Cart Context
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = {
  cartItems: (() => {
    try {
      return JSON.parse(localStorage.getItem('cartItems')) || [];
    } catch (e) {
      console.error("Error parsing cartItems from localStorage", e);
      return [];
    }
  })(),
};

const CartContext = createContext();

const cartReducer = (state, action) => {
// /varify/:code
  console.log("Action Received:", action);
  console.log("Current State:", state);

  switch (action.type) {
    case 'ADD_TO_CART':
      {

        const existingItem = state.cartItems.find(
          (item) => item.selectPunit === action.payload.selectPunit && item._id === action.payload._id
        );
        console.log("existingItem :::", existingItem);
        if (existingItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((item) =>
              item._id === action.payload._id && item.selectPunit === action.payload.selectPunit
                ? { ...item, quantity: Math.max(1, item.quantity + action.payload.quantity) } // Update quantity
                : item
            ),
          };
        }else{
          console.log("Current cart items else:");
          const updatedCartItems = [
            ...state.cartItems,
            { ...action.payload, quantity: Math.max(1, action.payload.quantity) },
          ];
        
          console.log("Current cart items:", updatedCartItems);
        
          return {
            ...state,
            cartItems: updatedCartItems,
          };
        }
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => !(item._id === action.payload.id && item.selectPunit === action.payload.size)
        ),
      };

    case 'UPDATE_QUANTITY':
      // console.log('::::::UPDATE_QUANTITY::::',state)
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload.id && item.selectPunit === action.payload.size
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addToCart = (item) => {
    console.log("this is addTocart",item )
    
    if (item.quantity > 0) {
     console.log("before dispatch....")
      dispatch({ type: 'ADD_TO_CART', payload: item });
    }
  };

  const removeFromCart = (id, size) =>
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id, size } });

  const updateQuantity = (id, size, quantity) => {
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity } });
    } else {
      removeFromCart(id, size);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);