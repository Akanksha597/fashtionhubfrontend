import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Checkout from "./components/Newcheckout/Newcheckout.jsx";
import Home from "./pages/Home";
import Section1 from "./components/section1";
import Homecategory from "./components/category/homecategory.jsx";

import Banner from "./components/banner/banner.jsx";
import Treding from "./components/homeTreding.jsx";
import Logo from "./components/homelogo.jsx";
import Deals from "./components/Deals/homedeals.jsx";
import Selling from "./components/homeselling";
import ProductPage from "./components/Product/product.jsx";
import Herbicides from "./pages/category pages/Herbicides.jsx";
import Micronutrient from "./pages/category pages/micronutrient.jsx";
import WaterSoluble from "./pages/category pages/WaterSolublePage.jsx";
import Footer from "./components/footer/Footer.jsx";
import ProductDescription from "./components/Productdescription";
import Cart from "./components/cart/cart.jsx";
import { CartProvider } from "./context/CartContext.jsx";
// import Checkout from "./components/checkout/checkout.jsx";
import Loginsignup from "./components/loginsignup.jsx";
import ReviewPage from "./components/Review.jsx";
import Campaign from "./components/campaign/campaign.jsx";
import Coupons from "./components/coupen/coupen.jsx";
import ContactForm from "./components/Help/Help.jsx";
import WishlistPage from "./components/wishlist.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import BlogDescription from "./pages/Blogcards/Blogdesc.jsx";
import Blogcard from "./pages/Blogcards/Blogcards.jsx";
import Blog from "./pages/Blogcards/Blog.jsx";
import OrderHistory from "./components/order/orderpage.jsx";
import OrderDetails from "./components/order/orderdetails.jsx";
import AddAddress from "./components/Address/Address.jsx";
import Videos from "./pages/video.jsx";
import CampaignPage from "./pages/campaign/campaign.jsx";
import BulkOrderForm from "./components/Bullkorderform/Bullkorder.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import StepBar from "./components/stepbars/stepbar.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import AddItemPopup from "./components/AddItemPopup.jsx";
import CheckoutPage from "./components/deliveryAddress/delivery.jsx";
import PaymentPage from "./components/payment/payment.jsx";
import WhatsApp from "./components/Whatsapp/Whatsapp.jsx";
import ProfilePage from "./components/Profile/Profile.jsx"
import LoginSignupPopup from "./components/loginform/Loginform.jsx";
import CropsPage from "./components/Rural farmer/ruralFarmer.jsx";
import OrderConfirmation from "./components/Orderconfirmation/orderconfirmation.jsx";
import DeliveryPolicy from "./components/Deliverpolicys/Deliverpolicy.jsx";
import Refundpolicy from "./components/Refundpolicy/Refundpolicy.jsx";
import Orderstatus from "./components/Orderstatus/Orderstatus.jsx";
import OfferZone from "./components/Offerzone/OfferZone.jsx";
import Features from "./components/Features/Features.jsx";
import Whychoose from "./components/whychoose/whychoose.jsx";
import CartPage from "./components/cart/Newcart.jsx";
import OfferCard from "./components/Offercard/Offercard.jsx";
import Header from "./components/KisanCrate/Home/Header.jsx";
import About from "./pages/About.jsx";
import Category from "./pages/Category.jsx";
const App = () => {

  return (
    <GoogleOAuthProvider clientId="605987572103-brkli44lqji6bj428kiv73r4cpuhdf0j.apps.googleusercontent.com">
    <CartProvider>
      <WishlistProvider>
        <Router>
        <ScrollToTop />
          <WhatsApp/>
         <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/category" element={<Category />} />
            <Route path="/section1" element={<Section1 />} />
            <Route path="/homecategory" element={<Homecategory />} />
            <Route path="/banner" element={<Banner />} />
            <Route path="/Treding" element={<Treding />} />
            <Route path="/logo" element={<Logo />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/selling" element={<Selling />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/herbicides" element={<Herbicides />} />
            <Route path="/watersoluble" element={<WaterSoluble />} />
            <Route path="/micronutrient" element={<Micronutrient />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/productdescription/:id" element={<ProductDescription />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<Loginsignup />} />
            <Route path="/campaign" element={<Campaign />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/Help" element={<ContactForm />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/BlogD/:id" element={<BlogDescription />} />
            <Route path="/Blogc" element={<Blogcard />} />
            <Route path="/order" element={<OrderHistory />} />
            <Route path="/orderdetails" element={<OrderDetails />} />
            <Route path="/Address" element={<AddAddress />} />
            <Route path="/Video" element={<Videos />} />
            <Route path="/campaigns/:festival" element={<CampaignPage />} />
            <Route path="/stepbar" element={<StepBar />} />
            <Route path="/checkoutpage" element={<CheckoutPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/Whatsapp" element={<WhatsApp />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginSignupPopup />} />
            <Route path="/newcheckout" element={<Checkout />} />
            <Route path="/crop" element={<CropsPage />} />
            <Route path="/Orderconfirmation" element={<OrderConfirmation />} />
            <Route path="/Bullkorder" element={<BulkOrderForm />} />
            <Route path="/Shipping/Delivery Policy" element={<DeliveryPolicy/>} />
            <Route path="/Return & Refund Policy" element={<Refundpolicy/>} />
            <Route path="/orderstatus" element={<Orderstatus/>} />
            <Route path="/OfferZone" element={<OfferZone/>} />
            <Route path="/Features" element={<Features/>} />
            <Route path="/Whychoose" element={<Whychoose/>} />
            <Route path="/cartpage" element={<CartPage/>} />
            <Route path="/offercard" element={<OfferCard/>} />
     
          </Routes>
          <Footer />
        </Router>
      </WishlistProvider>
    </CartProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
