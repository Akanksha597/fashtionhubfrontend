import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './homepost.css'; 



const recentPosts = [
  {
    title: "Your farming partner for effective growth solutions 🌱",
    description: "Improve soil texture and boost nutrition.\nEnhance crop weight and durability.\nSuitable for all crops—use 5 liters per care, twice.",
    
  },
  {
    title: "Boost your soybean yield and quality with Silico Star 🌾",
    description: "Boost drought resistance and keep fruits fresh.\nProtects against diseases and increases yield.",
  
  },
  {
    title: "Boost soil microbes with our natural booster 🌼",
    description: "Promotes vigorous growth for flowers, fruits, and crops.\nEnhances root development, nutrient uptake, and photosynthesis.",
  
  },
  {
    title: "Boost your soybean yield and quality with Silico Star 🌾",
    description: "Boost drought resistance and keep fruits fresh.\nProtects against diseases and increases yield.",
 
  },
  {
    title: "Boost soil microbes with our natural booster 🌼",
    description: "Promotes vigorous growth for flowers, fruits, and crops.\nEnhances root development, nutrient uptake, and photosynthesis.",
  
  },
  {
    title: "Boost soil microbes with our natural booster 🌼",
    description: "Promotes vigorous growth for flowers, fruits, and crops.\nEnhances root development, nutrient uptake, and photosynthesis.",

  }
];

const HomePost = () => {

  const postChunks = [];
  for (let i = 0; i < recentPosts.length; i += 3) {
    postChunks.push(recentPosts.slice(i, i + 3));
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Browse Recent Posts</h1>
  
      <div id="carouselPosts" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
       
          {postChunks.map((postChunk, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="row">
                {postChunk.map((post, idx) => (
                  <div key={idx} className="col-md-4 mb-4">
                    <div className="card11">
                      <img src={post.image} alt={post.title} className="card-img-top2" />
                      <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <ul className="card-text">
                          {post.description.split('\n').map((line, idx2) => (
                            <li key={idx2}>{line}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {recentPosts.length > 3 && (
          <>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselPosts" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselPosts" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePost;
