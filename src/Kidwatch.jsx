import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import FavoriteButton from "./FavoriteButton";

function Kidwatch() {
  const navigate = useNavigate();
  const [kid, setKid] = useState([]);
  

  const { id } = useParams();

  useEffect(() => {
    const getKid = async () => {
      try {
        const res = await axios.get("https://cineflex-backend.onrender.com/kidwatch");
        setKid(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getKid();
  }, []);

 const [kidId, setKidId] = useState([]);
 useEffect(() =>{
  const getkidId = async() =>{
    try {
      const res = await axios.get(`https://cineflex-backend.onrender.com/kidwatch/${id}`);
      setKidId(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  getkidId();
 },[id])

  // ✅ FIX: Compare _id instead of id
  const similarkids = kid.filter(
    (item) => item.genre === kidId.genre && item._id !== kidId._id
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
          <img src={kidId.img} alt={kidId.name} className="card-img-top" />
        </div>

        <div className="details">
          <h1>{kidId.name}</h1>
          <p>{kidId.description}</p>
          <p>
            {kidId.year} | {kidId.genre} | {kidId.language}
          </p>
          <p>IMDB: {kidId.imdbRating}</p>

          <div className="play">
              <button className="btn" onClick={handlePlay}>
                <i className="fa-solid fa-play"></i> Watch now
              </button>
            <FavoriteButton item={kidId} type="kids" />

          </div>
        </div>

        <div className="more">
          <h3>More like this in this genre</h3>
        </div>

        <div className="similar">
          {similarkids.length > 0 ? (
            similarkids.map((m) => (
              <Link key={m._id} to={`/kids/${m._id}`}>
                <div className="card">
                  <img src={m.img} className="card-img-top" alt={m.name} />
                </div>
              </Link>
            ))
          ) : (
            <p style={{ color: "gray" , marginLeft:"30px"}}>No similar kid show found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Kidwatch;
