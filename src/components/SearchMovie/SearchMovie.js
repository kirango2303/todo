import React, {useState} from "react";
import './SearchMovie.css';
import axios from "axios"
import { Link, useHistory } from 'react-router-dom'

function SearchMovie(){
    
    //states- input query, movies
    const [query, setQuery] = useState('');
    //create the state for movies, and update that state appropriate
    const [movies, setMovies] = useState([]);
    
    const searchMovie = async (e) => {
        e.preventDefault();
                
        const url = `https://api.themoviedb.org/3/search/movie?api_key=24a297524f81b409ac822769f6414485&query=${query}`;
        
        try {
            const res = await axios.get(url);
            
            setMovies(res.data.results);
            // console.log(movies);
        }catch(err){
            console.error(err);
        }
    }
    
    return (
        <>
        
        <h1>Search for movies</h1>
            <form onSubmit={searchMovie}>
                <input type="text" name="query"
                    placeholder="i.e. Harry Potter"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                    />
                <button className="ToDo-Add" type="submit">Search</button>
            </form>
           

            <div>
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <div className="card" key={movie.id}>
                        <img
                            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                            />
                            <div></div>
                        <div>
                            
                        <h3>{movie.title}</h3>
                        <p>{movie.release_date}</p>
                        <p>{movie.vote_average}/10</p>
                        <p>{movie.overview}</p>
                        </div>

                    </div>
                ))}
            </div>   
        </>
    );
}
export default SearchMovie;