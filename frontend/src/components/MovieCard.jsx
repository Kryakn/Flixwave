import React, { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { tmdbService } from '../services/tmdb';
import './MovieCard.css';

const MovieCard = ({ movie, isLargeRow }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [details, setDetails] = useState(null);

  const imageUrl = tmdbService.getImageUrl(
    isLargeRow ? movie.poster_path : movie.backdrop_path,
    isLargeRow ? 'w500' : 'w780'
  );

  const handleMouseEnter = async () => {
    setIsHovered(true);
    
    // Delay preview to avoid triggering on quick hovers
    setTimeout(async () => {
      if (isHovered) {
        try {
          const movieDetails = movie.media_type === 'tv' || movie.first_air_date
            ? await tmdbService.getTVDetails(movie.id)
            : await tmdbService.getMovieDetails(movie.id);
          setDetails(movieDetails);
          setShowPreview(true);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      }
    }, 500);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowPreview(false);
  };

  const handlePlayClick = async () => {
    if (details && details.videos) {
      const trailerUrl = tmdbService.getYouTubeTrailer(details.videos);
      if (trailerUrl) {
        window.open(trailerUrl, '_blank');
      }
    }
  };

  if (!imageUrl) return null;

  return (
    <div 
      className={`movie-card ${isLargeRow ? 'movie-card-large' : ''} ${showPreview ? 'movie-card-preview' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={imageUrl} 
        alt={movie.title || movie.name}
        className="movie-card-image"
        loading="lazy"
      />
      
      {showPreview && (
        <div className="movie-card-overlay">
          <div className="movie-card-info">
            <div className="movie-card-actions">
              <button 
                className="movie-card-btn movie-card-btn-play"
                onClick={handlePlayClick}
              >
                <Play size={20} fill="#000" />
              </button>
              
              <button className="movie-card-btn movie-card-btn-icon">
                <Plus size={20} />
              </button>
              
              <button className="movie-card-btn movie-card-btn-icon">
                <ThumbsUp size={20} />
              </button>
              
              <button className="movie-card-btn movie-card-btn-icon movie-card-btn-more">
                <ChevronDown size={20} />
              </button>
            </div>
            
            <div className="movie-card-details">
              <div className="movie-card-meta">
                {details?.vote_average && (
                  <span className="movie-card-match">
                    {Math.round(details.vote_average * 10)}% Match
                  </span>
                )}
                {movie.release_date && (
                  <span className="movie-card-year">
                    {new Date(movie.release_date || movie.first_air_date).getFullYear()}
                  </span>
                )}
              </div>
              
              {details?.genres && (
                <div className="movie-card-genres">
                  {details.genres.slice(0, 3).map((genre, index) => (
                    <span key={genre.id}>
                      {genre.name}{index < Math.min(details.genres.length - 1, 2) ? ' • ' : ''}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
