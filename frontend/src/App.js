import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MovieRow from './components/MovieRow';
import Footer from './components/Footer';
import { tmdbService } from './services/tmdb';
import './App.css';

function App() {
  useEffect(() => {
    // Scroll-based animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.movie-row');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <Navbar />
      
      <HeroBanner />
      
      <div className="content-rows">
        <MovieRow 
          title="Trending Now" 
          fetchUrl={tmdbService.getTrending}
        />
        
        <MovieRow 
          title="Top Rated" 
          fetchUrl={tmdbService.getTopRated}
        />
        
        <MovieRow 
          title="Action Movies" 
          fetchUrl={tmdbService.getActionMovies}
        />
        
        <MovieRow 
          title="Comedy Movies" 
          fetchUrl={tmdbService.getComedyMovies}
        />
        
        <MovieRow 
          title="Horror Movies" 
          fetchUrl={tmdbService.getHorrorMovies}
        />
        
        <MovieRow 
          title="Romance Movies" 
          fetchUrl={tmdbService.getRomanceMovies}
        />
        
        <MovieRow 
          title="Documentaries" 
          fetchUrl={tmdbService.getDocumentaries}
          isLargeRow
        />
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
