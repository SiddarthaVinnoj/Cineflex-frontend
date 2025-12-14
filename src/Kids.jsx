import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';


function Kids() {

  const [kid, setKid] = useState([]);
  const [filteredKids, setFilteredKids] = useState([]);
 const [query, setQuery] = useState('');
      const debounceTimeout = useRef(null);
    
  useEffect(() => {
    const getKid = async () => {
      try {
        const res = await axios.get("https://cineflex-backend.onrender.com/kidwatch");
        setKid(res.data);
        setFilteredKids(res.data);   // initial load
      } catch (error) {
        console.log(error);
      }
    };
    getKid();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredKids(kid);
      return;
    }

    const result = kid.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.genre.toLowerCase().includes(query.toLowerCase()) ||
      item.language.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredKids(result);
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
            <div className='movies-content'>
      <div className='header'>
        <p className='write'>Discover colorful worlds, playful characters, and amazing adventures every day.</p>
      </div>
      <div className="card-movies">
        {
          filteredKids.map((eachItem) => (
            <Link to={`/kids/${eachItem._id}`} key={eachItem._id}>
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

export default Kids;
