import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { tmdbService } from '../services/tmdb';
import './HeroBanner.css';

const HeroBanner = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        const data = await tmdbService.getTrending();
        const randomMovie = data.results[
          Math.floor(Math.random() * data.results.length)
        ];
        setMovie(randomMovie);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hero movie:', error);
        setLoading(false);
      }
    };

    fetchHeroMovie();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  if (loading || !movie) {
    return <div className="hero-skeleton"></div>;
  }

  const backdropUrl = tmdbService.getImageUrl(movie.backdrop_path, 'original');

  return (
    <div 
      className="hero-banner"
      style={{
        backgroundImage: `url(${backdropUrl})`
      }}
    >
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h1 className="hero-title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        
        <div className="hero-buttons">
          <button className="hero-btn hero-btn-play">
            <Play size={24} fill="#000" />
            <span>Play</span>
          </button>
          
          <button className="hero-btn hero-btn-info">
            <Info size={24} />
            <span>More Info</span>
          </button>
        </div>
        
        <p className="hero-description">
          {truncate(movie.overview, 200)}
        </p>
      </div>
      
      <div className="hero-fade-bottom"></div>
    </div>
  );
};

export default HeroBanner;
