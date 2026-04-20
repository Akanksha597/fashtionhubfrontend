import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { Button, Image, Form, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [discountAmt, setDiscountAmt] = useState(0);
  const [couponData, setCouponData] = useState({});
  const [finalAmt, setFinalAmt] = useState(0);

  // Dummy function placeholders for product details
  const getProductDetails = (id) => cartItems.find(item => item.id === id);
  const getSizeDetails = (product, size) => product?.sizes?.find(s => s.unit === size) || {};

  const handleQuantityChange = (id, size, quantity) => {
    if (quantity > 0) {
      updateQuantity(id, size, quantity);
    } else {
      removeFromCart(id, size);
    }
  };

  const calculateTotal = () => {
    let subtotal = cartItems.reduce((acc, item) => {
      const product = getProductDetails(item.id);
      const sizeDetail = getSizeDetails(product, item.size);
      const price = sizeDetail?.price || 0;
      return acc + price * (item.quantity || 1);
    }, 0);

    let discount = 0;
    if (couponData?.discount) {
      discount = couponData.discountType === "percentage" 
        ? (subtotal * couponData.discount) / 100 
        : couponData.discount;
    }

    const finalTotal = subtotal - discount;
    return {
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      total: finalTotal.toFixed(2),
    };
  };

  const { subtotal, discount, total } = calculateTotal();

  useEffect(() => {
    setFinalAmt(total);
  }, [total, couponData]);

  const applyCoupon = () => {
    // Simulate a valid coupon (Replace this logic with an actual API call if needed)
    const dummyCoupon = { discount: 10, discountType: "percentage" };
    setCouponData(dummyCoupon);
    toast.success("Coupon applied successfully!", { position: "top-center" });
  };

  return (
    <div className="container my-4">
      <ToastContainer />
      <h2 className="fw-bold">Cart</h2>
      <Link to="/" className="text-primary mb-3 d-block">Continue shopping</Link>
      
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="row">
          {/* Cart Items */}
          <div className="col-md-8">
            {cartItems.map(item => {
              const product = getProductDetails(item.id);
              const sizeDetail = getSizeDetails(product, item.size);
              const price = sizeDetail?.price || 0;

              return (
                <div key={item.id} className="d-flex align-items-center border p-3 rounded shadow-sm mb-3">
                  <Image src={item.gallery} alt={item.name} width={100} height={100} className="rounded me-3" />
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="text-muted">{item.weight}</p>
                  </div>
                  <h5 className="mx-3">Rs. {price.toFixed(2)}</h5>
                  <InputGroup className="me-3" style={{ width: "90px" }}>
                    <Form.Control
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => handleQuantityChange(item.id, item.size, parseInt(e.target.value))}
                    />
                  </InputGroup>
                  <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => removeFromCart(item.id)} />
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="col-md-4">
            <div className="border p-3 rounded shadow-sm bg-light">
              <h4>Order Summary</h4>
              <p>Total products ({cartItems.length}): <span className="fw-bold">Rs. {subtotal}</span></p>
              <p>Discount: <span className="fw-bold">Rs. {discount}</span></p>
              <h5>Total: Rs. {finalAmt}</h5>
              
              {/* Coupon Input */}
              <InputGroup className="mb-3">
                <Form.Control placeholder="Enter coupon code" />
                <Button variant="warning" onClick={applyCoupon}>Apply</Button>
              </InputGroup>
              
              {/* Checkout Button */}
              <Button variant="success" className="w-100">Checkout</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
