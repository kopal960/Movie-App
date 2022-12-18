import { ReactComponent as Logo} from './assets/logo.svg';
import { ReactComponent as SearchLogo} from './assets/search.svg';
import MovieList from './components/MovieList';
import {useEffect, useState} from 'react';

import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [imageBaseUrl, setImageBaseUrl] = useState("");
  const [posterSize, setPosterSize] = useState("");
  const [searchField, setSearchField] = useState("");
  const api_key = process.env.REACT_APP_API_KEY;


  useEffect(() => {
    getMovies();
  }, [movies]);
  function extractMovieDetails(response) {
    let newMovies = response.results.map((movie) => {
      //console.log(movie);
      return {
        "title": movie.title,
        "img" : imageBaseUrl+posterSize+movie.poster_path,
        "rating": movie.vote_average,
        "release_date": movie.release_date,
        "overview": movie.overview,
        "vote_count": movie.vote_count,
        "id": movie.id
      }
    });
    
    return newMovies;
  }

  async function getMovies() {
    try {
      let response;
      response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${api_key}`);
      response = await response.json();
      setImageBaseUrl(response.images.base_url);
      setPosterSize(response.images.poster_sizes[2]);

      if(searchField.length === 0) {
        response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=release_date.desc`);
      }
      else {
        response =  await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchField}`);
      }
      
      response = await response.json();
      let updated = extractMovieDetails(response);
      setMovies(updated); 
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSearchChange(event) {
    setSearchField(event.target.value.trim().replace(/ /g,"+"));
    console.log(event.target.value.trim().replace(/ /g,"+"));
  }

  return (
   <div className="root-container">
    <div className="container">
      <Logo/>
      <div className="search">
      <span className="searchLogo">
        <SearchLogo/>
      </span>
        <input onChange={handleSearchChange} className="searchInput" type="text" placeholder="Search for a movie"></input>
      </div>
    </div>

    <hr />

    <h4 className="fw-bold">{searchField.length ===0 ? "Most Recent Movies" : `Movies matching ${searchField}`}</h4>
    <MovieList movies = {movies} />

    <div class="fs-light mt-5 text-muted">
    <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" width="60px"></img>
      All data for this application is taken from themoviedb 
    </div>
   </div>
  );
}

export default App;
