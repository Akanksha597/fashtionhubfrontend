import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './cart.css';
import { FaTrash } from "react-icons/fa";
import { Button , InputGroup ,Form  } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Notavalible from "../../assets/image/Notavailable.png";
import axios from 'axios';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const [discountAmt, setdiscountAmt] = useState(0);
  const [couponData, setcouponData] = useState({});
  const [code, setcode] = useState('');
  const [finalAmt, setfinalAmt] = useState(0);

  // ✅ Quantity handler
  const handleQuantityChange = (id, size, quantity) => {
    if (quantity > 0) {
      updateQuantity(id, size, quantity);
    } else {
      removeFromCart(id, size);
    }
  };

  // ✅ Total calculation
  const calculateTotal = () => {
    let subtotal = 0;

    cartItems.forEach(item => {
      const price = item.selectPprice || 0;
      const quantity = item.quantity || 1;
      subtotal += price * quantity;
    });

    return subtotal;
  };

  const total = calculateTotal();

  // ✅ Coupon logic
  useEffect(() => {
    if (couponData?.discount) {
      if (couponData.discountType === 'percentage') {
        const discount = (total * couponData.discount) / 100;
        setdiscountAmt(discount);
        setfinalAmt(total - discount);
      } else {
        setdiscountAmt(couponData.discount);
        setfinalAmt(total - couponData.discount);
      }
    } else {
      setfinalAmt(total);
    }
  }, [total, couponData]);

  // ✅ Apply coupon
  const handleAddItem = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3500/api/v1/coupons/varify/${code}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const coupon = response.data?.data?.coupon;

      if (coupon) {
        setcouponData(coupon);
        toast.success("Coupon applied!");
      } else {
        toast.error("Invalid coupon");
      }
    } catch (err) {
      toast.error("Error applying coupon");
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="container py-4">
        {cartItems.length === 0 ? (
          <p className="text-center">
            <img className="image-emtycard" src={Notavalible} />
            <Link to="/" style={{ color: "black" }}>
              <h5>Start shopping</h5>
            </Link>
          </p>
        ) : (
          <div className="row">
            {/* LEFT */}
            <div className="col-md-8">
              <h4>Cart</h4>

              {cartItems.map(item => (
              <div
  key={item._id + item.selectPunit}
  className="cart-card d-flex align-items-center justify-content-between"
>
  <div className="cart-left d-flex align-items-center">
    <img src={item.gallery} className="cart-img" />

    <div className="cart-info">
      <h6>{item.name}</h6>
      <p>{item.selectPunit}</p>
    </div>
  </div>

  <div className="cart-price">
    ₹{item.selectPprice * item.quantity}
  </div>

  <div className="cart-qty">
    <button onClick={() =>
      handleQuantityChange(item._id, item.selectPunit, item.quantity - 1)
    }>-</button>

    <input
      value={item.quantity}
      onChange={(e) =>
        handleQuantityChange(
          item._id,
          item.selectPunit,
          parseInt(e.target.value) || 1
        )
      }
    />

    <button onClick={() =>
      handleQuantityChange(item._id, item.selectPunit, item.quantity + 1)
    }>+</button>
  </div>

  <FaTrash
    className="cart-delete"
    onClick={() =>
      removeFromCart(item._id, item.selectPunit)
    }
  />
</div>
              ))}
            </div>

            {/* RIGHT */}
            <div className="col-md-4 py-5">
              <h4>Order Summary</h4>

              {/* <InputGroup>
                <Form.Control
                  placeholder="Coupon code"
                  value={code}
                  onChange={(e) => setcode(e.target.value)}
                />
                <Button onClick={handleAddItem}>Apply</Button>
              </InputGroup> */}

              <h5 className="mb-3">Total: ₹{finalAmt}</h5>

              {finalAmt >= 100 ? (
  <Link
    to="/stepbar"
    state={{ cartItems, discountAmt }}
    className="w-100 checkout-link"
  >
<Button 
  className="btn btn-continue btn-sm w-100 " 
  style={{ backgroundColor: "rgb(0, 0, 0)", borderColor: "rgb(0, 0, 0)", color: "#fff" }}
>
  Checkout
</Button>


  </Link>
) : (
  <Button
    className="btn btn-continue btn-secondary btn-sm w-100"
    disabled
  >
    Minimum order ₹100 required
  </Button>
)}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;