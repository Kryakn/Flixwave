import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const watchlistService = {
  getWatchlist: async () => {
    const response = await axios.get(`${API_URL}/watchlist`);
    return response.data;
  },

  addToWatchlist: async (movie) => {
    const response = await axios.post(`${API_URL}/watchlist`, {
      movieId: movie.id,
      title: movie.title || movie.name,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
      overview: movie.overview,
      releaseDate: movie.release_date || movie.first_air_date,
      voteAverage: movie.vote_average,
      mediaType: movie.media_type || 'movie'
    });
    return response.data;
  },

  removeFromWatchlist: async (movieId) => {
    const response = await axios.delete(`${API_URL}/watchlist/${movieId}`);
    return response.data;
  },

  checkInWatchlist: async (movieId) => {
    const response = await axios.get(`${API_URL}/watchlist/check/${movieId}`);
    return response.data.inWatchlist;
  }
};

export const historyService = {
  getHistory: async (limit = 50) => {
    const response = await axios.get(`${API_URL}/history?limit=${limit}`);
    return response.data;
  },

  addToHistory: async (movie, progress = 0) => {
    const response = await axios.post(`${API_URL}/history`, {
      movieId: movie.id,
      title: movie.title || movie.name,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
      mediaType: movie.media_type || 'movie',
      progress
    });
    return response.data;
  },

  removeFromHistory: async (movieId) => {
    const response = await axios.delete(`${API_URL}/history/${movieId}`);
    return response.data;
  },

  clearHistory: async () => {
    const response = await axios.delete(`${API_URL}/history`);
    return response.data;
  }
};

export const userService = {
  getProfile: async () => {
    const response = await axios.get(`${API_URL}/users/profile`);
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await axios.put(`${API_URL}/users/profile`, data);
    return response.data;
  },

  updatePreferences: async (genres, language) => {
    const response = await axios.put(`${API_URL}/users/preferences`, {
      genres,
      language
    });
    return response.data;
  }
};
