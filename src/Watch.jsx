import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import FavoriteButton from "./FavoriteButton";

function Watch() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState({});

  useEffect(() => {
    axios
      .get("https://cineflex-backend.onrender.com/moviewatch")
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`https://cineflex-backend.onrender.com/moviewatch/${id}`)
      .then((res) => setMovieId(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const similarMovies = movies.filter(
    (item) => item.genre === movieId.genre && item._id !== movieId._id
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
          <img
            src={movieId.img}
            alt={movieId.name}
            className="card-img-top"
            style={{height:"370px"}}
          />
        </div>

        <div className="details">
          <h1>{movieId.name}</h1>
          <p>{movieId.description}</p>
          <p>
            {movieId.year} | {movieId.genre} | {movieId.language}
          </p>
          <p>IMDB: {movieId.imdbRating}</p>

          <div className="play">
            <button className="btn" onClick={handlePlay}>
              <i className="fa-solid fa-play"></i> Watch now
            </button>

            {/* ✅ Correct favorite item */}
            <FavoriteButton item={movieId} type="movie" />
          </div>
        </div>

        <div className="more">
          <h3>More like this in this genre</h3>
        </div>

        <div className="similar">
          {similarMovies.length > 0 ? (
            similarMovies.map((m) => (
              <Link to={`/movies/${m._id}`} key={m._id}>
                <div className="card">
                  <img
                    src={m.img}
                    className="card-img-top"
                    alt={m.name}
                  />
                </div>
              </Link>
            ))
          ) : (
            <p style={{ color: "gray", marginLeft: "30px" }}>
              No similar movies found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Watch;
