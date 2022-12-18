import MovieCard from './MovieCard'
import { useState } from 'react';

function MovieList({movies}) {
    const [showIndex, setShowIndex] = useState(-1);

    const arr = movies.map( (movie) =>
    { 
        return (
                <MovieCard  key= {movie.id} movie={movie} show={showIndex === movie.id} setShow={setShowIndex}/>
            )
        }
    );

    return(
        <div className="row gy-3 text-center">
            {arr}
        </div>
    )
}

export default MovieList;