import React from 'react';
import ProductCard from '../../components/productcard';
import { product } from '../../data/product';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import herbicidesImage from '../../assets/image/herbicides.png';


const Herbicides = () => {
  const herbicides = product.filter(product => product.category === 'Herbicides');

  return (
    <>
  
      <div className="container-ouvercompay" style={{ backgroundImage: `url(${herbicidesImage})` }}>
        <div className="text-center mt-5">
          <h1 className="product-h1"></h1>
          <div class="product-div">
         
        </div>
        </div>
      </div>

   
      <div className="product-page">
        <h1>Herbicides</h1>
        <div className="product-list">
          {herbicides.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Herbicides;