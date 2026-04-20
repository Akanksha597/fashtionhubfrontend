// import React from "react";
import Section1 from "../components/section1";
import Homecategory from "../components/category/homecategory";
// import Banner from "../components/banner/banner";
// import Treding from "../components/homeTreding";
// import Logo from "../components/homelogo";
// import Deals from "../components/Deals/homedeals";
import Banner2 from "../components/banner/banner2";
// import Blog from "./Blogcards/Blog";

// import Footer from "../components/footer/Footer";
import Whychoose from "../components/whychoose/whychoose";
import PromoBanners from "../components/KisanCrate/Home/PromoBanners";
import { ToastBody } from "react-bootstrap";
import Banner from "../components/KisanCrate/Home/Banner";
import FarmFreshness from "../components/KisanCrate/Home/FarmBanner";
import HotPicks from "../components/KisanCrate/Home/HotPicks";
import WhatWeOffer from "../components/KisanCrate/Home/WhatWeOffer";
import TodaysOffer from "../components/KisanCrate/Home/TodayOffer";
import FreshFruitBanner from "../components/KisanCrate/Home/FreshFruitBanner";
import ImageGrid from "../components/ImageGrid/ImageGrid";
import Videos from "./video";



const Home = () => {

  return (


    <div>

      <Section1 />

      <Homecategory />
      <ImageGrid />
      <Banner2 />
    


      <TodaysOffer />
      <FreshFruitBanner />
      <HotPicks />
      <PromoBanners />
      <Videos />




    </div>
  );
};

export default Home;
