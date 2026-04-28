import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import './MovieRow.css';

const MovieRow = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchUrl();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [fetchUrl]);

  const scroll = (direction) => {
    const { current } = rowRef;
    const scrollAmount = direction === 'left' ? -window.innerWidth * 0.7 : window.innerWidth * 0.7;
    
    if (current) {
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      setTimeout(() => {
        checkArrows();
      }, 300);
    }
  };

  const checkArrows = () => {
    const { current } = rowRef;
    if (current) {
      setShowLeftArrow(current.scrollLeft > 0);
      setShowRightArrow(
        current.scrollLeft < current.scrollWidth - current.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const { current } = rowRef;
    if (current) {
      current.addEventListener('scroll', checkArrows);
      checkArrows();
      return () => current.removeEventListener('scroll', checkArrows);
    }
  }, [movies]);

  if (loading) {
    return (
      <div className="movie-row">
        <h2 className="movie-row-title">{title}</h2>
        <div className="movie-row-loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="movie-card-skeleton"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="movie-row">
      <h2 className="movie-row-title">{title}</h2>
      
      <div className="movie-row-container">
        {showLeftArrow && (
          <button 
            className="movie-row-arrow movie-row-arrow-left"
            onClick={() => scroll('left')}
          >
            <ChevronLeft size={40} />
          </button>
        )}
        
        <div className={`movie-row-posters ${isLargeRow ? 'large-row' : ''}`} ref={rowRef}>
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              isLargeRow={isLargeRow}
            />
          ))}
        </div>
        
        {showRightArrow && (
          <button 
            className="movie-row-arrow movie-row-arrow-right"
            onClick={() => scroll('right')}
          >
            <ChevronRight size={40} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieRow;
