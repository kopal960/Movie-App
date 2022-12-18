import '../assets/movieCard.css';
import { useEffect, useState } from 'react';

function MovieCard({movie, show, setShow}) {

    const handleShow = () => setShow(movie.id);
    const handleClose = () => setShow(-1);

    return(
        <>
            <div className="col-lg-3 col-md-4 col-sm-6">
                <div onClick={handleShow} className="movie-card btn">
                    <div className="movie-rating">{movie.rating}</div>
                    <div className="movie-img"><img src={movie.img} alt="Movie Poster"/></div> 
                    <div className="text-center text-wrap mb-0 movie-title">{movie.title}</div>
                </div>
            </div>
            
            {show?
            <div className="modal fade show" id={"movieModal"+movie.id} tabindex="-1" aria-labelledby={"movieModal"+movie.id+"Label"} aria-modal="true" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <p className="modal-title fw-bolder" id={"movieModal"+movie.id+"LiveLabel"}>{movie.title}</p>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                </div>
                <div className="modal-body row">
                  <div className='col-6'>
                    <div className="movie-img"><img src={movie.img} alt="Movie Poster"/></div> 
                  </div>
                  <div className='col-6'>
                    <div className='mb-3'>
                        <span className="fw-bold">Release Date:</span> {movie.release_date}
                    </div>
                    <div className='mb-3'>
                        {movie.overview}
                    </div>
                    <div className='mb-3'>
                    <span className="fw-bold">{movie.rating}</span>/10 ({movie.vote_count} total votes)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> : ""}

        </>
    )
}

export default MovieCard;