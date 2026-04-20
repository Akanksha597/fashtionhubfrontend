import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./homeselling.css";
import { Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
const Selling = (category) => {
  const { products } = category;
  const dispatch = useDispatch();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [addedToCartId, setAddedToCartId] = useState(null);
  // let {products,loading}=useSelector((state)=>state.product)
  const [productData, setProductData] = useState([]);

  const handleBuyNowClick = (product) => {
    addToCart({
      id: product._id,
      name: product.productName,
      price: product.price,
      size: "1kg",
      quantity: 1,
      image: product.image,
    });
    setAddedToCartId(product.id);
  };
  const handelClick = (productId) => {
    console.log("this is my Id", productId);
    navigate(`/productdescription/${productId}`);
  };
  const handleImageClick = (productId) => {
    navigate(`/productdescription/${productId}`);
  };
  return (
    <div className="container " >

     
          <h3 style={{textAlign:"center", marginTop:"30px"}}>Similar Products</h3>
     
  
      <div className="wraper w-100 overflow-x-auto row scroll-container">
        {products?.map((product) => (
          <div className=" col-md-3 col-sm-4 col-6 mb-4" key={product.id}>
            <div className="product-section">
              <div className="pro-cardss">
                <img
                  src={product?.thumbnail}
                  alt={product?.productName}
                  className="product-image"
                />
                <div className="product-details">
                  <h4 className="product-details">{product?.productName}</h4>
                  {/* <div className="home-sellingp">
                    <p className="product-weight">{product.weight}</p>
                    <p className="">₹ {product.price}</p>
                    </div> */}
<Button 
  className="custom-outline-success"
  onClick={() => handleImageClick(product._id)}
>
  {addedToCartId === product._id ? "View Product" : "View Product"}
</Button>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Selling;