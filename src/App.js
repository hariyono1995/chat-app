import React, { useEffect, useState } from "react";

import MovieCard from "MovieCard";
import searchIcon from "./search.svg";
import "./App.css";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=c88f7f37";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
    console.log("data", data.Search);
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, []);

  return (
    <div className="app">
      <h1>Search Movie</h1>

      <div className="search">
        <input
          placeholder="Search movie"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={searchIcon}
          alt="search icon"
          onClick={() => {
            fetchMovies(searchTerm);
          }}
        />
      </div>

      {movies?.length > 1 ? (
        movies.map((movie) => (
          <div className="container">
            <MovieCard movie={movie} />
          </div>
        ))
      ) : (
        <div className="empty">
          <h2>No movie found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
