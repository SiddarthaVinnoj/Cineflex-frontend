import React, { useState, useEffect } from "react";
import { useParams, Link , useNavigate} from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import FavoriteButton from "./FavoriteButton";
function Webwatch() {
  const navigate = useNavigate();
  const [web, setWeb] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getWeb = async () => {
      try {
        const res = await axios.get("https://cineflex-backend.onrender.com/webwatch");
        setWeb(res.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    getWeb();
  }, []);

 const [webid, setwebId] = useState([]);
 useEffect(() =>{
  const getwebId = async() =>{
    try {
      const res = await axios.get(`https://cineflex-backend.onrender.com/webwatch/${id}`);
      setwebId(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  getwebId();
 },[id])

  const similar = web.filter(
    (item) => item.genre === webid.genre && item._id !== webid._id
  );
const handlePlay = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login to watch this video");
      navigate("/login");
    } else {
      navigate(`/play/${id}`);
    }
  };
  return (
    <>
      <Navbar />

      <div className="movie-detail">
        <div className="single card" style={{backgroundColor:"black"}}>
          <img src={webid.img} alt={webid.name} className="card-img-top" />
        </div>

        <div className="details">
          <h1>{webid.name}</h1>
          <p>{webid.description}</p>
          <p>
            {webid.year} | {webid.genre} | {webid.language}
          </p>
          <p>IMDB: {webid.imdbRating}</p>

          <div className="play">
              <button className="btn" onClick={handlePlay}>
                <i className="fa-solid fa-play"></i> Watch now
              </button>
              <FavoriteButton item={webid} type="webseries" />

          </div>
        </div>

        <div className="more">
          <h3>More like this in this genre</h3>
        </div>

        <div className="similar">
          {similar.length > 0 ? (
            similar.map((m) => (
              <Link to={`/webseries/${m._id}`} key={m._id}>
                <div className="card">
                  <img src={m.img} className="card-img-top" alt={m.name} />
                </div>
              </Link>
            ))
          ) : (
            <p style={{ color: "gray" , marginLeft:"30px"}}>No similar webseries found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Webwatch;
