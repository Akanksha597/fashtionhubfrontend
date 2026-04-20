import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from './productcard'; 
import './wishlist.css';

const WishlistPage = () => {
  const { wishlistItems } = useWishlist();

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      {wishlistItems.length > 0 ? (
        <div className="wishlist-items">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} isInWishlist={true} />
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default WishlistPage;