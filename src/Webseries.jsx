import React, { useEffect, useState, useRef } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Webseries() {

  const [web, setWeb] = useState([]);
  const [filteredWeb, setFilteredWeb] = useState([]);
   const [query, setQuery] = useState('');
        const debounceTimeout = useRef(null);

  useEffect(() => {
    const getWeb = async () => {
      try {
        const res = await axios.get("https://cineflex-backend.onrender.com/webwatch");
        setWeb(res.data);
        setFilteredWeb(res.data); // initial load
      } catch (error) {
        console.log(error);
      }
    };
    getWeb();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredWeb(web);
      return;
    }

    const result = web.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.genre.toLowerCase().includes(query.toLowerCase()) ||
      item.language.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredWeb(result);
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
        <p className='write'>Binge the latest shows, trending series, and all-time favorites — all in one place.</p>
      </div>
      <div className='card-movies'>
        {filteredWeb.map(eachItem => (
          
          <Link to={`/webseries/${eachItem._id}`} key={eachItem._id}>
            <div className="card">
              <img src={eachItem.img} className="card-img-top" alt={eachItem.name} />
            </div>

          </Link>
        ))}
      </div>
      </div>
    </>
  );
}

export default Webseries;
