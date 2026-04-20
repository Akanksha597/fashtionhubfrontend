import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './homecard.css'; 
import product from "../assets/image/1.png";

const Card = () => {
    const cardsData = [
        {
            id: 1,
            text: '100% Pure Products',
            heading: 'The Key to Thriving Crops and Sustainable Farming',
            image: product,
            link: '/shop-now' 
        },
        {
            id: 2,
            text: '100% Pure Products',
            heading: 'The Key to Thriving Crops and Sustainable Farming',
            image: product,
            link: '/shop-now' 
        }
    ];

    return (
        <div className="container mt-4 card-container">
            <div className="row">
                {cardsData.map(card => (
                    <div className="col-md-6 " key={card.id}>
                        <div className="card1">
                            <div className="card-body d-flex">
                                <div className="text-section">
                                    <p className='p'>{card.text}</p>
                                    <h4 className='h4 mb-4'>{card.heading}</h4>
                                    <a href={card.link} className="Home-Card">Shop Now →</a>
                                </div>
                                <div className="image-section">
                                    <img src={card.image} alt="Product" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;
