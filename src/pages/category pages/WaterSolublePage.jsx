import React from 'react';
import ProductCard from '../../components/productcard';
import { product } from '../../data/product';
import { Link } from 'react-router-dom'; 
import './WaterSolublePage.css'; 
import Footer from '../../components/footer/Footer';
import Soluble from '../../assets/image/water soluable.png';

const WaterSoluble = () => {
  const waterSolubleProducts = product.filter(product => product.category === 'Water Soluble');

  return (
    <>
 
      <div className="container-ouvercompay" style={{ backgroundImage: `url(${Soluble})` }}>
        <div className="text-center mt-5">
          <h1 className="product-h1"></h1>
          <div class="product-div">
          
        </div>
      </div>
      </div>

 
      <div className="product-page">
        <h1>Water Soluble</h1>
        <div className="product-list">
          {waterSolubleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default WaterSoluble;