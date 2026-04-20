import React from 'react';
import ProductCard from '../../components/productcard';
import { product } from '../../data/product';
import { Link } from 'react-router-dom'; 
import './micronutrient.css'; 
import Footer from '../../components/footer/Footer';
import micro from '../../assets/image/Micronutrient.png';

const Micronutrient = () => {
  const otherCategory = product.filter(product => product.category === 'Micronutrient'); 

  return (
    <>
  
      <div className="container-ouvercompay" style={{ backgroundImage: `url(${micro})` }}>
        <div className="text-center mt-5">
          <h1 className="product-h1"></h1>
          <div class="product-div">
          
        </div>
      </div>
      </div>

    
      <div className="product-page">
        <h1>Micronutrient</h1>
        <div className="product-list">
          {otherCategory.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
      </div>
      <Footer></Footer>
    </>
  );
};

export default Micronutrient;