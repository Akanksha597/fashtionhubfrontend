import React, { createContext, useState, useEffect, useContext } from "react";
const WishlistContext = createContext();
export const useWishlist = () => {
  return useContext(WishlistContext);
};
export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);
  const addToWishlist = (product) => {
    console.log("addToWishlist",product)
    if (!wishlistItems.some((item) => item.id === product.id)) {
      setWishlistItems((prevItems) => [...prevItems, product]);
    } else {
      console.log("Product is already in the wishlist");
    }
  };
  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(
      (item) => item.id !== productId
    );
    setWishlistItems(updatedWishlist);

    if (updatedWishlist.length === 0) {
      console.log("Wishlist is empty");
    }
  };
  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
