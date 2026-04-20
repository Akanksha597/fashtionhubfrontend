import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllBanners } from '../features/banner/bannerSlice';
import './section1.css';
import Features from './Features/Features';

const Section1 = () => {
  const dispatch = useDispatch();
  const { banners, loading, error } = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(fetchAllBanners({ page: 1, limit: 10 }));
  }, [dispatch]);

  if (loading) return <p>Loading banners...</p>;
  if (error) return <p>Error loading banners: {error}</p>;

  return (
    <div className="banner-section position-relative">
      <Carousel indicators={false} controls={false} interval={2000}>
        {banners.map((banner) => (
          <Carousel.Item key={banner._id}>
            <Link to={banner.redirectLink || '/product'}>
              <img
                src={banner.bannerImage}
                alt="Banner"
                className="banner-img"
              />
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Features overlay */}
      {/* <div className="features-overlay">
        <Features />
      </div> */}
    </div>
  );
};

export default Section1;