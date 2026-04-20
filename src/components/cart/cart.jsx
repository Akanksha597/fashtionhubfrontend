import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './cart.css';
import { FaTrash } from "react-icons/fa";
import AddItemPopup from '../AddItemPopup';
import { Button , InputGroup ,Form  } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Notavalible from "../../assets/image/Notavailable.png"
const getProductDetails = (id , callData) => {
  return {
    id,
    availableSizes: [
      { size: "250 ml", price: 319 },
      { size: "500 ml", price: 559 },
      { size: "1 ltr", price: 999 },
      { size: "500 ml (pack of..)", price: 610 },
      { size: "1250 ml (pack of..)", price: 1449 },
    ]
  };
};

  const applyCoupon = () => {
    // Simulate a valid coupon (Replace this logic with an actual API call if needed)
    const dummyCoupon = { discount: 10, discountType: "percentage" };
    setCouponData(dummyCoupon);
    toast.success("Coupon applied successfully!", { position: "top-center" });
  };


const getSizeDetails = (product, size) => {
  return product.availableSizes.find(s => s.size === size);
};

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isPopupOpen, setIsPopupOpen] = useState(false);  // Ensure this state is initialized
  const [discountAmt, setdiscountAmt] = useState(0);
  const [couponData, setcouponData] = useState({});
    const [code, setcode] = useState('');
  

  const handleQuantityChange = (id, size, quantity) => {
    if (quantity > 0) {
      updateQuantity(id, size, quantity);
    } else {
      handleRemoveItem(id, size); // Remove the item if quantity is 0
    }
  };

  const handleRemoveItem = (id, size) => {
    removeFromCart(id, size);
  };

  const calculateTotal = () => {
    let subtotal = 0;
    cartItems.forEach(item => {
      const product = getProductDetails(item.id);
      const sizeDetail = getSizeDetails(product, item.size);
      const price = item?.selectPprice || 0;
      const quantity = item.quantity || 1;
      subtotal += price * quantity;
    });
    const tax = subtotal * 0.05;
    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: (subtotal + 0).toFixed(2)
    };
  };

  const  { subtotal, tax, total } = calculateTotal();
  const [finalAmt, setfinalAmt] = useState(total);
  const handleAddItemClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  useEffect(()=>{
    console.log('total useEffect::::', total)
    if (couponData && couponData.discount && couponData.discountType) {
      if (couponData.discountType == 'percentage') {
        const discountedTotal=(total * (couponData.discount / 100))
        let totalAmt = total - discountedTotal
        console.log('discountedTotal ::::', {discountedTotal,finalAmt})
        setdiscountAmt(discountedTotal)
        setfinalAmt(totalAmt)
      } else {
        const discountedTotal= couponData.discount
        let totalAmt = total - discountedTotal
        setdiscountAmt(discountedTotal)
        setfinalAmt(totalAmt)
        console.log('discountedTotal else::::', discountedTotal)
      }
    }else{
      setfinalAmt(total)
    }
  },[total])
  const callData = (data) => {
    console.log('data ::::', data)
    setcouponData(data)
    if (data && data.discount && data.discountType) {
      if (data.discountType == 'percentage') {
        const discountedTotal=(total * (data.discount / 100))
        let totalAmt = total - discountedTotal
        console.log('discountedTotal ::::', {discountedTotal,finalAmt})
        setdiscountAmt(discountedTotal)
        setfinalAmt(totalAmt)
        toast.success('Coupon applied successfully!', { position: 'top-center' })
      } else {
        const discountedTotal= data.discount
        let totalAmt = total - discountedTotal
        setdiscountAmt(discountedTotal)
        setfinalAmt(totalAmt)
        console.log('discountedTotal else::::', discountedTotal)
        toast.success('Coupon applied successfully!', { position: 'top-center' })
      }
    } 
    else {
      // toast.success('Google login successful!', { position: 'top-center' })
      console.log('dataelse ::::', data)
       toast.error('Coupon Not Found', { position: 'top-center' })
    }
  }

  const handleAddItem =async () => {
    let api =  `http://localhost:3500/api/v1/coupons/varify/${code}`
    console.log('make api:', api);
    console.log('make code:', code);
    try {
      const response = await axios.get(api, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add Bearer token
        },
      });
  
      console.log('API Response:', response.data);
      if (response.data.data && response.data.data.coupon) {
        callData(response.data.data.coupon)
      }else{
        callData(null)
      }
    } catch (error) {
      console.error('Error in API Call:', error.response ? error.response.data : error.message);
    }
    console.log(`Adding item with code: ${code}`);
    onClose();
  };

  const handleClose = () => {
    setcode(''); // Optionally reset the item code
    onClose();
  };
  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="text-center mt-5">
        </div>
        {cartItems.length === 0 ? (
          <p className="text-center">
            <img className="image-emtycard" src={Notavalible}/> 
            <Link to ="/" className='mt-4' style={{color:"black"}}>
            <h5>Start shopping</h5></Link>
            </p>

           
        ) : (
          <div className="row mb-5 mb-md-0">
            {/* Cart Table Section */}
            <div className="col-12 col-md-8">

              <div className="">
                <h4 className=" cart-heading"> Cart</h4>
                 <Link to="/" className="text-primary mb-3 d-block">Continue shopping</Link>
                <div className="scrollable-card-container">
                  <table className="table text-center cart-table">
                
                    <tbody className=''>
                      {cartItems.map(item => {
                        const product = getProductDetails(item.id);
                        const sizeDetail = getSizeDetails(product, item.selectPunit);
                        const price = sizeDetail?.price || 0;

                        return (
                          <tr key={item.id + item.selectPunit} className="  cart-item d-flex align-items-center justify-content-between border-bottom" style={{height:"150px"}}>
                            {console.log('::::::::::item.image::::',item)}
                            <td style={{border:"none"}}>
                              {item.gallery && <Link to={`/productdescription/${item.id}`} className="cart-item-link">
                                <img
                                  src={item.gallery ? item.gallery : '/images/placeholder.png'}
                                  alt={item.name}
                                  className="img-fluid cfinalAmtart-item-image"
                                  onError={(e) => (e.target.src = '/images/placeholder.png')}
                                  style={{  }}
                                />
                              </Link>}
                            </td>
                            <td className="cart-item-details text-start" style={{ flexGrow: 1,  border:"none"}}>
                            <p className="fw-bold mb-1" style={{ fontSize: '1.1rem', marginBottom: '0px' }}>{item.title || item.name}</p>
                            <p className="text-muted small" style={{ fontSize: '0.85rem' }}>{item.selectPunit}</p>
                          
                            </td>
                            <td  style={{ fontSize: '1.1rem', marginBottom: '0px', border:"none", fontWeight:"bold" }}>₹{(item.selectPprice * item.quantity).toFixed(2)}</td>
                            <td style={{border:"none"}}>
                              {/* {console.log(':::item:::',item)} */}
                              <div className="quantity-controls d-flex justify-content-center">
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => handleQuantityChange(item._id, item.selectPunit, item.quantity - 1)}
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  value={item.quantity === 0 ? "" : item.quantity} // Show empty when quantity is 0
                                  onChange={(e) => {
                                    const value = e.target.value;

                                    // Allow empty input or numeric input
                                    if (value === "" || /^[0-9]+$/.test(value)) {
                                      handleQuantityChange(
                                        item.id,
                                        item.size,
                                        value === "" ? 0 : parseInt(value, 10)
                                      );
                                    }
                                  }}
                                  className="form-control form-control-sm text-center mx-2"
                                  style={{ width: '50px' }}
                                />
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => handleQuantityChange(item._id, item.selectPunit, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>



                            </td>
                               


                    
                            <td style={{border:"none"}}>
                            
                                <FaTrash className="text-danger" style={{ cursor: "pointer" }}  onClick={() => handleRemoveItem(item._id, item.selectPunit)}/>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>

            {/* Coupon and Summary Section */}
            <div className="col-12 col-md-4 mb-5 mb-md-0">
              <div className="checkout-form-container p-4 rounded shadow-sm ">
                <h4 className="text-center cart-heading mb-3">Order Summary</h4>

                <div className="coupon-section mb-3">

             
                </div>

                <div className="coupon-section mb-3">
                  <div className="row ">
                
                      {/* <h5>Coupon Discount?</h5> */}
                    
                    {/* <div className="col-4 text-end">
                      <button className="add-to-button" onClick={handleAddItemClick} style={{width:"100%"}}>
                        Add Coupon
                      </button>
                    </div> */}
                       {/* <InputGroup className="">
                <Form.Control placeholder="Enter coupon code" 
                  value={code}
                  onChange={(e) => setcode(e.target.value)}
                
                
                />
                <Button variant="warning"   onClick={handleAddItem}>Apply</Button>
              </InputGroup> */}
                  </div>
                </div>
                {/* <div className="coupon-section mb-4">
                  <div className="row ">
                    <div className="col-6 text-start">
                      <h5>Discount Amount</h5>
                    </div>
                    <div className="col-6 text-end">
                      <h5>{discountAmt}</h5>
                    </div>
                  </div>
                </div> */}




                {/* <div className="coupon-section mb-4">
                  <div className="row ">
                    <div className="col-6 text-start">
                      <h4>Total:</h4>
                    </div>
                    <div className="col-6 text-end">

                     {finalAmt && <h4> ₹{finalAmt}</h4>}

                    </div>
                  </div>
                </div>
       
                      <Link to="/stepbar"  state={{cartItems ,discountAmt}}  className="w-100 checkout-link">
                        <Button className="btn btn-continue  btn-success btn-sm w-100">Checkout</Button>
                      </Link> */}
                      <div className="coupon-section mb-4">
  <div className="row">
    <div className="col-6 text-start">
      <h4>Total:</h4>
    </div>
    <div className="col-6 text-end">
      {finalAmt && <h4> ₹{finalAmt}</h4>}
    </div>
  </div>
</div>

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
                




              </div>
      

      
        )}
      </div>
   

      {/* Add Item Popup */}
      <AddItemPopup isOpen={isPopupOpen} onClose={handleClosePopup} callData={callData} />
    </>
  );
};

export default Cart;
