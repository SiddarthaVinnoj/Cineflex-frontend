import React , {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';

function Welcomepage() {
   const [movie, setMovie] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
  useEffect(() =>{
    const getMovie = async () => {
      try {
        const res = await axios.get("https://cineflex-backend.onrender.com/moviewatch")
        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMovie();
  }, [])
   const[kid, setKid] = useState([]);
  useEffect(() =>{
    const getkId = async() => {
      try {
        const res = await axios.get("https://cineflex-backend.onrender.com/kidwatch");
        setKid(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getkId();
  },[])
  const [web, setWeb] =useState([]);
  useEffect(() =>{
    const getWeb = async() => {
      try {
        const res = await axios.get("https://cineflex-backend.onrender.com/webwatch");
        setWeb(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getWeb();
  },[])
     

  return (
    <>
    <Navbar />
      <div id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"          // Auto slide
        data-bs-interval="6000"          // Change slide every 4 seconds
      >
        <div className="carousel-inner">

          {/* Slide 1 */}
          <div className="carousel-item active" style={{ position: "relative" }}>
            <video
              className="d-block w-100 video-size"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/video/bhahubali.mp4" type="video/mp4" />
            </video>
            <div className="carousel-caption">
        <h1>Baahubali</h1>
        <p>The story of a young man uncovering his royal lineage and his fight against tyranny. A visual spectacle with breathtaking sets and epic battles.</p>
        <p>2015 | Action, Drama | Telugu</p>
        <Link to ="movies/6932f2ceb755f627a952dab6">
         <button className="btn">
                <i className="fa-solid fa-play"></i> Watch now
              </button>
              </Link>
      </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item" style={{ position: "relative" }}>
            <video
              className="d-block w-100 video-size"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/video/moneyheist.mp4" type="video/mp4" />
            </video>
            <div className="carousel-caption">
        <h1>Money Heist</h1>
        <p>A criminal mastermind plans the biggest heist in recorded history—to print billions of euros in the Royal Mint of Spain.</p>
        <p>2017 | Action, Crime, Drama | Spanish</p>
          <Link to ="webseries/6932f2f9b755f627a952dada">
         <button className="btn">
                <i className="fa-solid fa-play"></i> Watch now
              </button>
              </Link>
      </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item" style={{ position: "relative" }}>
            <video
              className="d-block w-100 video-size"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/video/lionking.mp4" type="video/mp4" />
            </video>
            <div className="carousel-caption">
       <h1>The Lion King</h1>
        <p>Lion prince Simba flees his kingdom after the death of his father, only to learn the true meaning of responsibility and bravery.</p>
        <p>1994 | Animation, Adventure, Drama | English</p>
         <Link to ="kids/6932f286b755f627a952da42">
         <button className="btn">
                <i className="fa-solid fa-play"></i> Watch now
              </button>
              </Link>
      </div>
          </div>

        </div>

        {/* Buttons */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>

      {/* slider */}


      <div className="slider-container">
      <div className='pop'>
        <h2 className="slider-title">Popular Movies</h2><h5 className="slider-title">Slide for more...</h5>
      </div>

      <div className="slider">
        {/* Show only first 10 movies */}
        {movie.slice(0, 10).map((movie, index) => (
          <Link to={`/movies/${movie._id}`} key={movie._id} style={{textDecoration:"none"}}>
          <div className="movie-card" key={index}>
            <img src={movie.img} alt={movie.name} />
            <p>{movie.name}</p>
          </div>
          </Link>
        ))}

        {/* View All Card */}
        <Link to="/movies" className="view-all-card">
          <p>View All →</p>
        </Link>
      </div>
    </div>


{/*webseries */}

    <div className="slider-container">
      <div className='pop1'>
        <h2 className="slider-title">Popular Webseries</h2><h5 className="slider-title">Slide for more...</h5>
      </div>

      <div className="slider">
        {/* Show only first 10 movies */}
        {web.slice(0, 10).map((web, index) => (
          <Link to={`/webseries/${web._id}`} key={web._id} style={{textDecoration:"none"}}>
          <div className="movie-card" key={index}>
            <img src={web.img} alt={web.name} />
            <p>{web.name}</p>
          </div>
          </Link>
        ))}

        {/* View All Card */}
        <Link to="/webseries" className="view-all-card">
          <p>View All →</p>
        </Link>
      </div>
    </div>

    {/* kids */}
    
    <div className="slider-container">
      <div className='pop2'>
        <h2 className="slider-title">Popular Kids</h2><h5 className="slider-title">Slide for more...</h5>
      </div>
      <div className="slider">
        {/* Show only first 10 movies */}
        {kid.slice(0, 10).map((kid, index) => (
          <Link to={`/kids/${kid._id}`} key={kid._id} style={{textDecoration:"none"}}>
          <div className="movie-card" key={index}>
            <img src={kid.img} alt={kid.name} />
            <p>{kid.name}</p>
          </div>
          </Link>
        ))}

        {/* View All Card */}
        <Link to="/kids" className="view-all-card">
          <p>View All →</p>
        </Link>
      </div>
    </div>
    
      
    </>
  )
}

export default Welcomepage
