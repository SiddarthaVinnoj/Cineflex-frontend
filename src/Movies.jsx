import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';


function Movies({search}) {

  const [movie, setMovie] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
     const [query, setQuery] = useState('');
      const debounceTimeout = useRef(null);
    
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("https://cineflex-backend.onrender.com/moviewatch");
        setMovie(res.data);
        setFilteredMovies(res.data);    // initially show all
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, []);
  const handleSearch = (query) => {
    if (!query) {
      setFilteredMovies(movie);
      return;
    }

    const result = movie.filter(movie =>
      movie.name.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.toLowerCase().includes(query.toLowerCase()) ||
      movie.language.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredMovies(result);
  };
 const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      handleSearch(value);
    }, 300); // 300ms debounce delay
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    handleSearch(query);
  };

  return (
    <>
      <Navbar />
       <div className="container-fluid search-wrapper">
  <form className="search-form" onSubmit={handleSubmit}>
    
    <i className="fa-solid fa-magnifying-glass search-icon"></i>

    <input
      type="search"
      placeholder="Search by title , genre , language...."
      value={query}
      onChange={handleChange}
      className="search-input"
    />

    <button className="search-btn" type="submit">
      Search
    </button>

  </form>
</div>
<div className="movies-content">
      <div className='header'>
        <p className='write'>Explore the latest blockbusters, timeless classics, and trending movies — all in one place.</p>
      </div>
      <div className="card-movies">
        {
          filteredMovies.map((eachItem) => (
            <Link to={`/movies/${eachItem._id}`} key={eachItem._id}>
              <div className="card">
                <img
                  src={eachItem.img}
                  className="card-img-top"
                  alt={eachItem.name}
                />
        
              </div>
            </Link>
          ))
        }
      </div>
      </div>
    </>
  );
}

export default Movies;
